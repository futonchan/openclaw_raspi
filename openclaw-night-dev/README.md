# OpenClaw Night Dev Kit

OpenClaw で「指示書だけ渡して寝る」ための最小運用テンプレートです。

## 構成

- `instruction-template.md` — ユーザーが書く指示書テンプレート
- `orchestrator-prompt.md` — 統括 Codex 用プロンプト
- `developer-prompt.md` — 開発者 Codex 用プロンプト
- `reviewer-prompt.md` — レビュアー Codex 用プロンプト
- `workflow-notes.md` — 実運用手順
- `TASK_STATUS_TEMPLATE.md` — 共有進捗テンプレート
- `REVIEW_NOTES_TEMPLATE.md` — レビュー記録テンプレート

## 基本思想

- 統括 1人が唯一の意思決定窓口
- 開発者 1人が実装
- レビュアー 1人が差分レビュー
- 小分け実行、最後に commit / push
- push は最終段だけに寄せる

## 推奨運用

1. `instruction-template.md` をコピーして今回の依頼を書く
2. 統括 Codex に指示書 + `orchestrator-prompt.md` を渡す
3. 統括がまず大タスクを切り、必要なら小タスクにも分解する
4. 統括が開発者とレビュアーを順に回す
5. 小タスクごとに実変更を確認する
6. 最後に `TASK_STATUS.md` と `REVIEW_NOTES.md` を成果として残す

## 注意

OpenClaw 本体の plugin 依存が不安定な時は、長い shell 一発実行を避けて、
`write/edit -> git status -> add/commit -> push` の順で進めること。
