// github.mjs — GitHub から実在のリポジトリ情報と README を取ってくる。
import 'dotenv/config';

// ローカルでは .env の GITHUB_TOKEN、Actions では Secrets の GH_TOKEN_FETCH を読む。
const token = process.env.GH_TOKEN_FETCH || process.env.GITHUB_TOKEN;

// 共通ヘッダー。トークンがあれば認証付き(5000回/時)、なければ未認証(60回/時)。
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'oss-tagger', // GitHub は User-Agent を必須にしている
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

export async function fetchRepo(owner, repo) {
  // (1) リポジトリの基本情報（スター数・言語・ライセンス・topics など）
  const metaRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!metaRes.ok) {
    throw new Error(`リポジトリ情報の取得に失敗: ${metaRes.status} ${metaRes.statusText}`);
  }
  const meta = await metaRes.json();

  // (2) README の中身。raw 指定で、デコード不要のテキストとして受け取る。
  const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { ...headers, Accept: 'application/vnd.github.raw' },
  });
  const readme = readmeRes.ok ? await readmeRes.text() : '';

  // 必要な項目だけ取り出して、きれいな形に整える。
  return {
    full_name: meta.full_name,
    description: meta.description,
    url: meta.html_url,
    stars: meta.stargazers_count,
    forks: meta.forks_count,
    language: meta.language, // GitHub が判定した主要言語（信頼できる）
    license: meta.license?.spdx_id ?? null, // 例: "MIT"
    github_topics: meta.topics ?? [], // 作者が付けた GitHub のトピック
    last_pushed: meta.pushed_at,
    readme,
  };
}
