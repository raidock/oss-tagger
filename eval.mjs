// eval.mjs — AI のタグ付けを模範解答と突き合わせて採点する。
import { tagReadme } from './tagger.mjs';
import { goldenSet } from './golden-set.mjs';

// 2つのタグ配列を比べる小道具。
function compare(predicted, expected) {
  const pred = new Set(predicted);
  const exp = new Set(expected);
  const correct = [...pred].filter((t) => exp.has(t)); // 当たり
  const wronglyAdded = [...pred].filter((t) => !exp.has(t)); // 余計に付けた
  const missed = [...exp].filter((t) => !pred.has(t)); // 付け忘れ
  const exact = wronglyAdded.length === 0 && missed.length === 0;
  return { correct, wronglyAdded, missed, exact };
}

let totalCorrect = 0,
  totalWronglyAdded = 0,
  totalMissed = 0,
  exactCount = 0;

for (const item of goldenSet) {
  const result = await tagReadme(item.readme);
  const predicted = result.tags;
  const { correct, wronglyAdded, missed, exact } = compare(predicted, item.expected);

  totalCorrect += correct.length;
  totalWronglyAdded += wronglyAdded.length;
  totalMissed += missed.length;
  if (exact) exactCount++;

  console.log(`\n■ ${item.name}  ${exact ? '✅ 完全一致' : '⚠️ ズレあり'}`);
  console.log(`  正解(模範): [${item.expected.join(', ')}]`);
  console.log(`  AI予測    : [${predicted.join(', ')}]`);
  if (wronglyAdded.length) console.log(`  余計に付けた: [${wronglyAdded.join(', ')}]`);
  if (missed.length) console.log(`  付け忘れ    : [${missed.join(', ')}]`);
}

const precision = totalCorrect / (totalCorrect + totalWronglyAdded || 1);
const recall = totalCorrect / (totalCorrect + totalMissed || 1);
const f1 = (2 * precision * recall) / (precision + recall || 1);

console.log('\n========== 通知表 ==========');
console.log(`完全一致: ${exactCount} / ${goldenSet.length} 件`);
console.log(`精度  (付けたタグの正しさ)    : ${(precision * 100).toFixed(0)}%`);
console.log(`再現率 (正解タグを拾えた割合)  : ${(recall * 100).toFixed(0)}%`);
console.log(`F1   (総合点)                : ${(f1 * 100).toFixed(0)}%`);
