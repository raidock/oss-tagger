// schema.mjs — データの形を1か所で定義。タグを「カテゴリ(種類)」と「属性」の2軸に分ける。
import { z } from 'zod';

// (A) カテゴリ＝「それが何であるか」。絞り込みの主役。1つのOSSに1〜2個が目安。
export const CATEGORIES = [
  'database',
  'cms',
  'monitoring',
  'analytics',
  'developer-tools',
  'automation',
  'security',
  'communication',
  'api', // 今日のデータ(PostgREST, n8n)を見て追加
  'backup',
];

// (B) 属性＝「それがどういう性質を持つか」。カテゴリとは別の軸で重ねて絞る。
export const ATTRIBUTES = [
  'self-hosted', // 自分のサーバーで動かせる
  'ai', // AI機能を持つ
  'cloud', // クラウド/ホスティング提供あり
];

export const TaggingSchema = z.object({
  summary: z.string().describe('このOSSが何かを1〜2文の日本語で'),
  categories: z
    .array(z.string())
    .describe('このOSSの「種類」。できるだけ次から選ぶ（1〜2個が目安）: ' + CATEGORIES.join(', ')),
  attributes: z
    .array(z.string())
    .describe('このOSSの「性質」。当てはまるものだけ。次から選ぶ: ' + ATTRIBUTES.join(', ')),
});

// AIが出した候補を、それぞれの許可リスト内だけに整える共通関数。
function filterBy(allowed, raw) {
  const allow = new Set(allowed);
  const kept = [];
  const dropped = [];
  for (const t of raw ?? []) {
    if (allow.has(t)) {
      if (!kept.includes(t)) kept.push(t);
    } else {
      dropped.push(t);
    }
  }
  return { kept, dropped };
}

// カテゴリと属性をそれぞれ整形して返す。
export function cleanTags(raw) {
  const cat = filterBy(CATEGORIES, raw.categories);
  const attr = filterBy(ATTRIBUTES, raw.attributes);
  return {
    categories: cat.kept.slice(0, 3),
    attributes: attr.kept,
    dropped: [...cat.dropped, ...attr.dropped], // 語彙の不足候補（記録用）
  };
}
