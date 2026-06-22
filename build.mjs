// build.mjs — repos.mjs の一覧を処理して data.json に保存する。
// 冪等対応: 前回の data.json を読み、last_pushed が変わっていない repo は AI 呼び出しをスキップする。
import { writeFile, readFile } from 'node:fs/promises';
import { fetchRepo } from './github.mjs';
import { tagReadme } from './tagger.mjs';
import { repos } from './repos.mjs';

// 前回の data.json を読み込む（無ければ空）。full_name をキドにした辞書にする。
async function loadPrevious() {
  try {
    const arr = JSON.parse(await readFile('data.json', 'utf-8'));
    const map = {};
    for (const item of arr) map[item.full_name] = item;
    return map;
  } catch {
    return {}; // 初回は data.json が無いので空でOK
  }
}

const previous = await loadPrevious();

// 1件分を処理する（AI呼び出しを含む）。
// categories を渡すと手動優先（AIの分類より優先）。省略時はAIの結果を使う。
async function buildOne({ owner, repo, categories }) {
  const data = await fetchRepo(owner, repo);
  const tagResult = await tagReadme(data.readme.slice(0, 6000));
  return {
    full_name: data.full_name,
    description: data.description,
    url: data.url,
    stars: data.stars,
    forks: data.forks,
    language: data.language,
    license: data.license,
    github_topics: data.github_topics,
    last_pushed: data.last_pushed,
    summary: tagResult.summary,
    categories: categories ?? tagResult.categories, // 手動指定があれば優先
    attributes: tagResult.attributes,
    dropped_tags: tagResult.dropped,
  };
}

const results = [];
const failures = [];
let reused = 0,
  processed = 0;

for (const r of repos) {
  const label = `${r.owner}/${r.repo}`;
  try {
    // まず GitHub の軽い情報だけ取って、変わったかどうか判定する。
    const fresh = await fetchRepo(r.owner, r.repo);
    const prev = previous[fresh.full_name];

    // ★ 冪等性の判定: 前回があり、last_pushed が同じなら、前回の結果を使い回す。
    if (prev && prev.last_pushed === fresh.last_pushed) {
      results.push(prev); // AI を呼ばず前回ぶんを再利用
      reused++;
      console.log(`♻️  再利用: ${label}（変更なし）`);
      continue;
    }

    // 変わっている or 初回 → AI も含めて処理する。
    process.stdout.write(`🔄 処理中: ${label} ... `);
    const tagResult = await tagReadme(fresh.readme.slice(0, 6000));
    // 手動指定(repos.mjs)があれば優先。保存値とログ表示の両方でこの finalCategories を使う。
    const finalCategories = r.categories ?? tagResult.categories;
    const isManualCat = r.categories != null; // 手動指定か（ログ表示用）
    results.push({
      full_name: fresh.full_name,
      description: fresh.description,
      url: fresh.url,
      stars: fresh.stars,
      forks: fresh.forks,
      language: fresh.language,
      license: fresh.license,
      github_topics: fresh.github_topics,
      last_pushed: fresh.last_pushed,
      summary: tagResult.summary,
      categories: finalCategories,
      attributes: tagResult.attributes,
      dropped_tags: tagResult.dropped,
    });
    processed++;
    console.log(`✅ cat=[${finalCategories.join(', ')}]${isManualCat ? '（手動）' : ''} attr=[${tagResult.attributes.join(', ')}]`);
  } catch (err) {
    failures.push({ repo: label, error: err.message });
    console.log(`❌ 失敗: ${err.message}`);
  }
}

await writeFile('data.json', JSON.stringify(results, null, 2), 'utf-8');

console.log(`\n========== 完了 ==========`);
console.log(`AI処理: ${processed} 件 / 再利用: ${reused} 件 / 失敗: ${failures.length} 件`);
console.log(`→ data.json に ${results.length} 件を保存`);
if (failures.length) console.log(failures);
