# 実行手順: スロット風目覚ましアプリ

## 役割
- 統括: 指示書を読み、計画・委任・統合・最終確認を行う
- 開発者: `slot-alarm/` アプリを実装する
- レビュアー: 差分と動作要件をレビューする

## 事前準備
1. 対象 repo を clean な状態にする
2. `openclaw-night-dev/` のテンプレを確認する
3. `TASK_STATUS.md` と `REVIEW_NOTES.md` の作業用コピーを作る

## 実行フロー
1. 統括役に `slot-alarm-instruction.md` と `orchestrator-prompt.md` を渡す
2. 統括役はタスク分解して `TASK_STATUS.md` を更新する
3. 開発者へ `developer-prompt.md` + 現在タスクだけを渡す
4. 実装後、変更ファイル一覧・確認結果を受け取る
5. レビュアーへ `reviewer-prompt.md` + 変更要約を渡す
6. Verdict が `REVISE` なら統括が差し戻す
7. Verdict が `ACCEPT` なら最終 commit / push を行う
8. 統括役が最終サマリを残す

## OpenClaw運用上の注意
- 長い shell 一発実行を避ける
- まずファイルを書き、次に `git status` を見る
- commit と push は最後に分けて行う
- approval が要る操作はまとめすぎない
- 実際に反映されたかを `git status` で確認する

## 期待される成果物
- `slot-alarm/` ディレクトリ
- 必要な README / 操作説明
- commit 履歴
- 最終 push
