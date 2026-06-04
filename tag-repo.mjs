// tag-repo.mjs — GitHub の実物 README を AI にタグ付けさせる。
import { fetchRepo } from './github.mjs';
import { tagReadme } from './tagger.mjs';

const data = await fetchRepo('grafana', 'grafana');
const tagResult = await tagReadme(data.readme.slice(0, 6000));

console.log({
  full_name: data.full_name,
  stars: data.stars,
  language: data.language, // ← GitHub の確定情報
  license: data.license, // ← GitHub の確定情報
  github_topics: data.github_topics,
  ai_summary: tagResult.summary, // ← AI 生成
  ai_tags: tagResult.tags, // ← 許可リスト内に整えたタグ
  dropped_tags: tagResult.dropped, // ← AIが出したが許可リスト外だったもの（語彙の不足候補）
});
