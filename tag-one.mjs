// tag-one.mjs — 1件だけ手で試すための入口。
import { tagReadme } from './tagger.mjs';

const readme = `
# SuperTool
A simple tool that helps you do things faster and better.
Easy to use and very powerful. Everyone loves it.
`;

const result = await tagReadme(readme);
console.log(result);
