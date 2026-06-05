# CLAUDE.md

このファイルは Claude Code（Cursor 上の Claude）にプロジェクトの背景を伝えるためのものです。
コードを読むだけでは分からない「目的・方針・なぜそうしているか」を記載しています。

---

## プロジェクトの目的

**国内SaaS連携OSSディレクトリ**（日本語で読める）を作る。
国内SaaS（freee / マネーフォワード / kintone / SmartHR / PayPay 等）と連携・関連するOSSを中心に、
カテゴリーやタグで検索・フィルターできる、日本語要約付きのディレクトリサイト。

- 種別: 個人プロジェクト（学習・ポートフォリオ + 段階的にマネタイズ）
- 公開: 他の人にも使ってもらう想定
- 重視点: 収益化と「設計・実装・見せ方」の質の両立。採用担当に評価される完成度を目指す。

## 差別化のニッチ（確定）

**「国内SaaS連携 × 日本語で読める」OSSディレクトリ。**
- 海外の主要OSSディレクトリは英語前提で、国内SaaS連携OSSをまず扱わない＝明確な穴。
- 強みフィット: 日本語ネイティブ（要約が日本語で読める）。`data.json` の `summary` は既に全て日本語。
- 掲載OSSの選定軸: 国内SaaS連携系（決済・会計・勤怠・労務・CRM連携など）/ 国内SaaSのAPIを叩くライブラリ・サンプル / 日本製OSS全般。
  - ※ ランダムに人気OSSを足すのではなく、この軸で選ぶ。ディレクトリの芯。
- カテゴリ設計も将来この文脈に寄せる余地あり（例: 決済連携 / 会計連携 / 勤怠・労務）。件数が増えてから検討。
- ※ Three.js / WebGL / クリエイティブコーディング特化は「別のプライベートリポジトリ」で扱う構想。本プロジェクトに混ぜない。

## マネタイズ方針（開発と並走）

開発で書いたコードがそのまま在庫・集客動線になる設計。着手順は「資産ゼロでも成立するもの」から。
- **初手の本命: テンプレート/有料レシピ販売（候補2）** — 「PayPay決済をNext.jsに組む完全テンプレ」「kintoneカスタマイズ実装集」等を Zenn有料 / Gumroad / BOOTH で販売。一度作れば売れ続ける＝在庫化。まず質重視で1本完成させる。
- **候補1（実装代行/相談）は時間を売るので主軸にしない** — CTA設置（MENTA / TimeTicket等）にとどめ、開発時間を圧迫しない範囲で。
- **候補3（国内SaaSアフィリエイト/紹介）は並行で仕込む** — freee/マネフォ/SmartHR/kintone/各種決済の紹介制度に早めに申請（審査に時間がかかる）。審査が通らない時期も想定し収益の軸は候補2に置く。
- **候補4（求人ボード）/ 5（スポンサー枠）は後期** — PV・信頼という資産が前提。今やると空振りするので保留。
- **信頼の生命線: 中立な紹介とアフィリンクを誠実に区別する** — 「PR」「アフィリエイトリンクを含む」を明示。OSSディレクトリの価値は中立性への信頼。
- **テンプレのコード品質 = 実力の証明** — 買った人が直接実力を判断する。最初の1本は件数より質。

## 大事な前提（開発スタンスに直結）

- 作者は**学習しながら作る初心者**。専門用語は噛み砕いた説明を添えること。
- 主目的は「**ディレクトリを完成させる手段として AI エージェントを使う**」こと。
  エージェント設計そのものの学習が目的ではないので、**過剰設計は避け、最小で動くものを優先**する。
- 提案は本ファイルの設計方針からズレないこと。方針変更が必要なら、その理由を明示して相談する。
- **一度に複数のことを変えない**（初心者がデバッグで混乱するため）。1ステップ＝1テーマで進める。
- **エラーが取れないときは、確実に動くと分かっている全文に入れ替える**（部分編集での消し残しを防ぐ）。

---

## 全体の設計方針

### データ戦略：手動キュレーション + 自動取得のハイブリッド
- **手動**: 掲載する OSS の選定（国内SaaS連携軸）、カテゴリー体系の設計、推薦コメント。
- **自動**: README からの要約・分類（AI）、スター数・言語・ライセンス・topics（GitHub）。
- 役割分担の原則: **硬い事実は GitHub から、やわらかい判断は AI から**。
  - 例: 主要言語は GitHub の `language`（正確）を採用。AI には言語を推測させない。

### タグ付けの設計（重要・実装で確定した方針）
**タグは「2軸」に分ける。1軸（フラットな tags）には戻さない。**
- **categories（種類）**: 「それが何であるか」。1 OSS あたり 1〜2 個が目安。
  - 現在: database, cms, monitoring, analytics, developer-tools, automation, security, communication, api, backup
- **attributes（属性）**: 「どういう性質を持つか」。category とは別軸で重ねて絞る。
  - 現在: self-hosted, ai, cloud
- なぜ分けるか: `self-hosted` のような属性を種類と同じ箱に入れると、ほぼ全 OSS に付いて**フィルターとして機能しなくなる**ため。
  サイトのフィルターは「カテゴリで絞る × 属性で絞る」の 2 セクション（ファセット検索: グループ内OR・グループ間AND）。
- 確定リストは `schema.mjs` の `CATEGORIES` / `ATTRIBUTES` が唯一の正解。

**AI には enum で縛らず、自由に候補を出させ、コード側の `cleanTags()` で許可リスト内に整形する。**
- 理由: SDK + Zod では `z.enum()` の制約が API へ「説明文」として渡るだけで強制力がなく、
  リスト外の値が返ると Zod 検証で例外が出てスクリプトが停止してしまうため。
  → `z.array(z.string())` で受け、`cleanTags()` で許可リスト内だけ採用、リスト外は `dropped` として記録。
- **`dropped`（捨てた語）と GitHub の `topics` は「カテゴリ体系を育てるヒント」**。頻出語を見て追加を判断（`topics-count.mjs`）。

**保留中の宿題（実データが増えてから判断）**
- `developer-tools` の線引きが広め。基準の言語化は件数が増えてから。今は触らない。
- 国内SaaS文脈のカテゴリ（決済連携・会計連携 等）の追加も件数が増えてから検討。

### エージェントは「ビルド時」に動かす
- LLM はリクエストごとに呼ばず、**ビルド時のバッチ処理**で動かし、結果を静的 JSON に焼き込む。
- AI 出力は信用しきらず、**コードで検査・整形してから保存**する（`cleanTags`）。
- バッチは 1 件ずつ try/catch で囲み、**1 件失敗しても全体を止めない**（`build.mjs`）。
- 冪等性: 前回 `data.json` の `last_pushed` と比較し、変更がない repo は AI 呼び出しをスキップ。

### 技術スタック
- パイプライン: 素の JavaScript（.mjs）+ `@anthropic-ai/sdk` + `zod` + `dotenv`。
- サイト本体: **Astro**（`site/` サブフォルダ。素のJSで実装中、TypeScriptは未使用）。
  - データは `site/` の 1つ上の `data.json` を `readFileSync` でビルド時に読み込む。
  - フィルターはブラウザ上の素のJS。Astro の `<script is:inline>` を使う（esbuild変換を避けるため）。
- クライアント検索: **MiniSearch**（今後キーワード検索を足すとき。インデックスはビルド時生成）。
- ホスティング: **Cloudflare Pages**（公開は最後の仕上げ。data.json をビルドにどう渡すかが論点）。
- データ更新: **GitHub Actions の cron**（毎日 UTC21:00 = JST6:00。`.github/workflows/update-data.yml`）。

---

## 進め方（ロードマップ）と現在地

1. **【完了】** SDK + 構造化出力で「README → 分類 JSON」の単発呼び出し
2. **【完了】** スキーマを Zod 化し `schema.mjs` に一元化
3. **【完了】** golden set で eval（採点）の仕組み（※2軸化で現在未対応・要改修）
4. **【完了】** 本番パイプライン化（GitHub取得・バッチ・冪等性・2軸カテゴリ・GitHub Actions自動化）
5. **【完了】** Astro サイトで data.json をカード表示 + カテゴリ/属性フィルター
6. **【次】** ニッチ確定を受けた充実フェーズ（おすすめ順）
   - 6-1 掲載OSSを「国内SaaS連携」軸で増やす（最優先・効果が全体に波及）
   - 6-2 キーワード検索（名前・説明文）を追加（MiniSearch）
   - 6-3 デザインの作り込み
   - 6-4 Cloudflare Pages で公開
   - 6-5 マネタイズ初手: テンプレ1本（候補2）/ アフィリエイト申請（候補3）を並行
7. 【発展・任意】eval の 2軸対応改修、自然言語検索 等

→ 現在は **5 まで完了。6-1（国内SaaS連携軸でOSSを増やす）に着手する段階**。

---

## 現在のファイル構成

```
oss-tagger/
├─ schema.mjs        # データの形(Zod) + CATEGORIES/ATTRIBUTES + cleanTags()。設計の中心。
├─ tagger.mjs        # tagReadme(readme): AIで分類し cleanTags で整形（categories/attributes）
├─ github.mjs        # fetchRepo(owner, repo): GitHub から repo 情報と README を取得
├─ repos.mjs         # 掲載したい OSS の一覧（手動キュレーションの入口。国内SaaS連携軸で増やす）
├─ build.mjs         # repos を順次処理し data.json に保存（try/catch + 冪等性）
├─ topics-count.mjs  # data.json の github_topics を頻出順に集計（カテゴリ候補発掘用）
├─ tag-repo.mjs      # 1件分「GitHub取得 → AI分類」の結合テスト
├─ tag-one.mjs       # README を手で渡して 1件試す入口
├─ fetch-one.mjs     # GitHub 取得だけを 1件試す入口
├─ eval.mjs          # golden set と突き合わせ採点（※2軸未対応・要改修）
├─ golden-set.mjs    # 手動の正解集（※旧1軸形式のまま・要改修）
├─ data.json         # 出力。サイトが読む静的データ（build.mjs が生成。Git管理対象）
├─ site/             # Astro サイト（src/pages/index.astro が一覧+フィルター）
├─ .github/workflows/update-data.yml  # 毎日自動実行のワークフロー
├─ .env              # APIキー類（ANTHROPIC_API_KEY, GITHUB_TOKEN）。Git 管理外。
├─ .gitignore        # .env / node_modules/ 等を除外
├─ package.json
└─ CLAUDE.md         # このファイル
```

---

## 開発時の約束ごと

- **API キー・トークンは `.env`（`ANTHROPIC_API_KEY` / `GITHUB_TOKEN`）。コードに直書きしない。**
  - GitHub Actions 側は Secrets を使い、データ取得用トークンは `GH_TOKEN_FETCH`（`GITHUB_` 始まりは予約のため不可）。
  - `github.mjs` は `process.env.GH_TOKEN_FETCH || process.env.GITHUB_TOKEN` の順で読む（ローカルとActions両対応）。
- **Anthropic API は従量課金**で claude.ai 購読とは別。分類モデルは安価な **`claude-haiku-4-5-20251001`** を既定。
- 構造化出力は SDK の `zodOutputFormat()` + `client.messages.parse()`。結果は `message.parsed_output`。
- **分類は categories / attributes の 2軸**。enum で縛らず `cleanTags()` で整形。1軸に戻さない。
- **主要言語は GitHub の `language` を採用**（AI には推測させない）。
- README は長いので **冒頭のみ（現状 6000 文字）を AI に渡す**。
- GitHub API レート制限: トークンありで 5000 回/時。バッチは 1件ずつ順次処理。
- ライセンスの `NOASSERTION` は「判定不能」。フィルタ・表示時は「不明」扱い（サイトでは非表示にしている）。
- **コミットメッセージは日本語**（`feat:` `fix:` 等の種類ラベルは英語のまま + 日本語説明）。
- 自動化により bot もコミットするため、**作業前に `git pull` する習慣**（枝分かれ防止）。
- Astro の `npm run dev` は `site/` フォルダで実行。`node build.mjs` や git 操作は本体フォルダで実行。

---

## メモ
- 設計の根拠になった調査結果（既存サービス分析・API 比較・UI パターン等）は別途リサーチ済み。
  方針に迷ったら、まずこの CLAUDE.md の設計方針を基準に判断する。
- eval は「実戦で出た失敗を golden set に足して育てる」方針。2軸対応への改修は後回しの宿題。