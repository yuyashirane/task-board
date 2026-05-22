# task-board

## プロジェクト概要

学習用のサンプル / 練習プロジェクト。
Claude Code を使った開発フローを身につけることを主目的とする、タスクボード（Kanban風）の習作。

- **位置づけ**: 学習用（本番運用を想定しない）
- **技術スタック**: React + Vite（詳細は「技術スタック」セクション参照）
- **データ保存**: ブラウザの localStorage

## デプロイ先

公開URL: **https://yuyashirane.github.io/task-board/**

- ホスティング: GitHub Pages
- デプロイ方式: GitHub Actions（`.github/workflows/deploy.yml`）
- トリガー: `main` ブランチへの push で自動実行
- ベースパス: `/task-board/`（リポジトリ名に合わせて `vite.config.js` の `base` で指定）

## 技術スタック

| 区分 | 採用技術 | バージョン |
| --- | --- | --- |
| UI フレームワーク | React | 18.3 |
| ビルドツール | Vite | 5.4 |
| 言語 | JavaScript (JSX) | — |
| スタイル | プレーン CSS | — |
| 状態管理 | React 標準フック（`useState` / `useEffect`） | — |
| 永続化 | ブラウザ `localStorage` | — |
| CI / デプロイ | GitHub Actions + GitHub Pages | — |
| パッケージ管理 | npm | — |

採用しない（学習スコープ外）: TypeScript / CSS Modules・Tailwind 等のスタイル抽象化 / Redux 等の状態管理ライブラリ / ルーティングライブラリ / テストランナー。

必要になったタイミングで段階的に導入する方針。導入時は本セクションを更新すること。

## ディレクトリ構成（グローバル標準に準拠）

```
task-board/
├── CLAUDE.md                ← 本ファイル（プロジェクトの憲法）
├── .claude/
│   └── skills/              ← 手順書
├── src/                     ← 実装コード
├── references/              ← 知識・ルール
├── templates/               ← 出力の型
├── docs/                    ← 設計説明
├── tests/                   ← テスト
├── logs/                    ← 処理ログ（.gitignore対象）
└── tmp/                     ← 一時ファイル（.gitignore対象）
```

迷ったら：手順 → `.claude/skills/` / 知識 → `references/` / 実装 → `src/`

## 命名規約

### ファイル名

| 種類 | 規則 | 例 |
| --- | --- | --- |
| React コンポーネント | **PascalCase + `.jsx`** | `App.jsx`, `TaskList.jsx` |
| コンポーネント専用CSS | コンポーネントと**同名**で `.css` | `App.css`（`App.jsx` 用） |
| エントリポイント | 小文字 | `main.jsx` |
| グローバルCSS | 小文字 | `index.css` |

- 1ファイル = 1コンポーネントを基本とする
- コンポーネントとそのスタイルは**同名ペア**で並べる（`App.jsx` ⇔ `App.css`）

### コード内の識別子

| 対象 | 規則 | 例 |
| --- | --- | --- |
| React コンポーネント | PascalCase（ファイル名と一致） | `function App()` |
| 変数・関数 | camelCase | `tasks`, `loadTasks` |
| イベントハンドラ | **動詞 + 名詞**の camelCase | `addTask`, `toggleTask`, `deleteTask` |
| state セッター | `set` + state名 | `setTasks`, `setInput` |
| 定数（モジュールスコープ） | UPPER_SNAKE_CASE | `STORAGE_KEY` |

### localStorage キー

- 形式: `'task-board:<用途>'`（プロジェクト名 + コロン + 用途）
- 例: `'task-board:tasks'`
- 他アプリと衝突しないよう必ずプレフィックスを付ける

### CSS クラス名

| 規則 | 例 |
| --- | --- |
| **kebab-case** | `.task-form`, `.task-item`, `.delete-btn` |
| 状態の修飾は別クラスで重ね掛け | `.task-item.done`（完了状態） |
| ボタンは用途を表す suffix `-btn` | `.delete-btn` |

クラス名は HTML 構造ではなく**役割**を表す名前にする（例: `.red-text` ではなく `.task-text` + `.done`）。

## 設計原則

- 学習目的なので「動くこと」より「理解できること」を優先する
- 新しい概念を導入したら、`docs/` に短い解説メモを残す
- 過剰な抽象化・将来予測の設計は避ける（YAGNI）
- コメントは「なぜ」を書く。「何を」はコード自身に語らせる

## Git 運用ルール

### 基本方針

- **コードを変更するたびに、必ず GitHub にプッシュする**
  - 1 つの意味のある変更単位（機能追加・修正・リファクタ等）ごとに `git add` → `git commit` → `git push` を一連で行う
  - 「あとでまとめてプッシュ」はしない。学習履歴を GitHub 上に残すことを優先する
  - プッシュは Claude が自動で行ってよい（このプロジェクト限定で、グローバルルールの「push は人間が行う」を上書き）

### ブランチ運用

- 学習プロジェクトのため、原則 `main` ブランチに直接コミット & プッシュで OK
- ただし、複数ステップにまたがる大きな変更を試す場合は `feature/<内容>` ブランチを切る
- ブランチで作業した場合も、こまめに push する（push し忘れ防止）

### コミットメッセージ

- 日本語で簡潔に。先頭に種別プレフィックスを付ける
  - `feat: ` 新機能
  - `fix: ` バグ修正
  - `docs: ` ドキュメント
  - `refactor: ` リファクタ
  - `chore: ` 設定・雑務
- 例: `feat: タスクカードの追加機能を実装`

### 安全策

- ファイル変更前に `git status` で現状確認
- 大きな変更の前に「これから XX をします」と宣言してから実行
- `git reset --hard` / `git rebase` / force push は人間が行う（Claude は実行しない）
- `.env` などの秘密情報を含むファイルは `.gitignore` に必ず追加してからコミット

### 初回セットアップ手順（リポジトリ未作成のため）

1. `git init` でローカルリポジトリを初期化
2. `.gitignore` を作成（`logs/`, `tmp/`, `.env`, `node_modules/` 等）
3. GitHub 上にリモートリポジトリを作成（`gh repo create` または Web UI）
4. `git remote add origin <URL>` でリモート登録
5. 初回コミット → `git push -u origin main`

## 作業の進め方

- 1 セッション = 1 つの目的に絞る（複数タスクを混ぜない）
- 30 分以上進捗が無い場合は一旦止めて状況を報告する
- 教材を進めるごとに、学んだことを `docs/learning-notes.md`（仮称）に追記していく
