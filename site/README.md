# Astro スターターキット: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **熟練のAstro (宇宙飛行士の方へ) :** このファイルは削除して構いません。お楽しみください！

## 🚀 プロジェクト構成

Astro プロジェクトの中には、以下のフォルダとファイルがあります:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro は `src/pages/` ディレクトリ内の `.astro` または `.md` ファイルを探します。各ページはファイル名に基づいたルートとして公開されます。

`src/components/` に特別な役割はありませんが、Astro/React/Vue/Svelte/Preact のコンポーネントを置く場所として使っています。

画像などの静的アセットは `public/` ディレクトリに配置できます。

## 🧞 コマンド

すべてのコマンドは、ターミナルからプロジェクトのルートで実行します:

| コマンド                  | 動作                                             |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 依存パッケージをインストールする                 |
| `npm run dev`             | `localhost:4321` でローカル開発サーバーを起動する |
| `npm run build`           | 本番用サイトを `./dist/` にビルドする            |
| `npm run preview`         | デプロイ前にビルドをローカルでプレビューする     |
| `npm run astro ...`       | `astro add` や `astro check` などの CLI コマンドを実行する |
| `npm run astro -- --help` | Astro CLI のヘルプを表示する                     |

## 👀 もっと知りたいですか？

[公式ドキュメント](https://docs.astro.build) を参照するか、[Discord サーバー](https://astro.build/chat) に参加してみてください。