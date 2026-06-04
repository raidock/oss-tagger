// golden-set.mjs — 手動で「正解のタグ」を付けた模範解答集。
// ここが採点の基準になる。正解はあなたの判断で自由に直してよい。
export const goldenSet = [
  {
    name: 'PostgreSQL',
    readme:
      'PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development.',
    expected: ['database'],
  },
  {
    name: 'Grafana',
    readme:
      'Grafana is an open source analytics and monitoring solution. Query, visualize, and alert on metrics and logs from many data sources.',
    expected: ['monitoring', 'analytics'],
  },
  {
    name: 'Mattermost',
    readme:
      'Mattermost is an open source, self-hostable online chat service designed as an internal messaging platform for teams.',
    expected: ['communication', 'self-hosted'],
  },
  {
    name: 'n8n',
    readme: 'n8n is a workflow automation tool. Connect anything to everything. You can self-host it for free.',
    expected: ['automation', 'self-hosted'],
  },
  {
    name: 'VeggieRecipes',
    readme:
      'A collection of vegetarian recipes from around the world. Browse by ingredient, cuisine, and cooking time.',
    expected: [],
  },
];
