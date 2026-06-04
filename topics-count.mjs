// topics-count.mjs — data.json の github_topics を集計して頻出順に並べる。
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile('data.json', 'utf-8'));

const count = {};
for (const item of data) {
  for (const topic of item.github_topics ?? []) {
    count[topic] = (count[topic] ?? 0) + 1;
  }
}

// 多い順に並べて表示
const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
console.log('=== github_topics 頻出順 ===');
for (const [topic, n] of sorted) {
  console.log(`${n}  ${topic}`);
}
