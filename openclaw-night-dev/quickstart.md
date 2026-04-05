# OpenClaw Night Dev Quickstart

最短で夜間自動開発を始めるための1枚メモ。

## 1. 指示書を作る
- `instruction-template.md` をコピーして今回の依頼を書く
- 完了条件、非スコープ、push可否を必ず書く

## 2. 3役で回す
- 統括: `orchestrator-prompt.md`
- 開発者: `developer-prompt.md`
- レビュアー: `reviewer-prompt.md`

## 3. 小タスクに分ける
- 大きい機能はまず大タスクへ
- さらに必要なら小タスクへ分解する
- 小タスクごとに実変更を確認する

## 4. 共通成果物
- `TASK_STATUS.md`
- `REVIEW_NOTES.md`
- 最終 summary

## 5. 実行の基本ルール
- 長い shell 一発を避ける
- `write/edit -> git status -> commit -> push`
- 予定と反映済みを混同しない
- push は最後の1回に寄せる

## 6. まず見るファイル
- `launch-checklist.md`
- `completion-checklist.md`
- `handoff-template.md`
- `first-run-example.md`

## 7. 実例
- `examples/slot-alarm-instruction.md`
- `examples/slot-alarm-runbook.md`
