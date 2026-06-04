// tagger.mjs — README を渡すとタグ付け結果を返す。
import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { CATEGORIES, ATTRIBUTES, TaggingSchema, cleanTags } from './schema.mjs';

const client = new Anthropic();

export async function tagReadme(readme) {
  const message = await client.messages.parse({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system:
      'あなたはOSSディレクトリの分類担当です。READMEを読み、スキーマに従って分類してください。' +
      'categories は「それが何であるか（種類）」、attributes は「どういう性質か」です。' +
      'それぞれできるだけ許可リストから選び、当てはまらなければ空配列にしてください。' +
      `カテゴリ候補: ${CATEGORIES.join(', ')} / 属性候補: ${ATTRIBUTES.join(', ')}`,
    messages: [{ role: 'user', content: `次のREADMEを分類してください:\n\n${readme}` }],
    output_config: { format: zodOutputFormat(TaggingSchema) },
  });

  const raw = message.parsed_output;
  const { categories, attributes, dropped } = cleanTags(raw);
  return { summary: raw.summary, categories, attributes, dropped };
}
