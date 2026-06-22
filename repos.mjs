// repos.mjs — ディレクトリに載せたい OSS の一覧（手動キュレーションの入口）。
// owner と repo は GitHub の URL から取れる。例: github.com/grafana/grafana → owner:"grafana", repo:"grafana"
//
// categories（任意）: 人間が確定させたいカテゴリ。指定するとAIの分類より優先される。
//   国内SaaS連携(payment/accounting/business-app)はキュレーション軸なので明示する。
//   省略すると build.mjs がAIの分類結果をそのまま採用する。
export const repos = [
  // 鉄板5件
  { owner: 'stripe', repo: 'stripe-node', categories: ['payment'] },
  { owner: 'stripe', repo: 'stripe-js', categories: ['payment'] },
  { owner: 'freee', repo: 'freee-api-schema', categories: ['accounting'] },
  { owner: 'kintone', repo: 'js-sdk', categories: ['business-app'] },
  { owner: 'kintone', repo: 'cli-kintone', categories: ['business-app'] },
];
