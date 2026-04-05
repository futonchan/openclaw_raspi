# Night Dev Workflow Notes

## 最小運用フロー

1. ユーザーが `instruction-template.md` から今回の指示書を作る
2. 統括役が指示書を読み、`TASK_STATUS.md` を作る
3. 開発者が現在タスクを実装する
4. レビュアーが差分をレビューする
5. 必要なら revise を挟む
6. 最後に commit / push を行う
7. 統括役が最終サマリを残す

## 安全寄りの運用
- 夜間は commit まで自動
- 朝に人が push / merge

## バランス運用
- 夜間に push まで自動
- ただし push は最後の1回だけ

## 再発防止メモ
- 長い shell 一発は承認や失敗点の可視性で不利
- `write/edit -> git status -> commit -> push` を基本にする
- 実装完了と実ファイル反映を混同しない
