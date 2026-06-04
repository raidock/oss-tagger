// fetch-one.mjs — 1つのリポジトリを GitHub から取ってきて表示する。
import { fetchRepo } from './github.mjs';

const data = await fetchRepo('grafana', 'grafana');

// README は長いので、最初の300文字だけ表示する。
console.log({
  ...data,
  readme: data.readme.slice(0, 300) + ' ...(以下省略)',
});
