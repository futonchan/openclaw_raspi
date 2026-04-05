# First Run Example

slot-alarm を題材にした最初の流し方の例。

## 1. 指示書を用意
- `examples/slot-alarm-instruction.md`

## 2. 統括役へ渡すもの
- `orchestrator-prompt.md`
- `examples/slot-alarm-instruction.md`
- `examples/slot-alarm-TASK_STATUS.md`
- `examples/slot-alarm-orchestrator-notes.md`

## 3. 開発者へ渡すもの
- `developer-prompt.md`
- `examples/slot-alarm-developer-handoff.md`

## 4. レビュアーへ渡すもの
- `reviewer-prompt.md`
- `examples/slot-alarm-reviewer-handoff.md`

## 5. 統括役の流れ
1. 指示書を要約
2. Task を確認
3. 開発者へ Task 1〜2 を依頼
4. レビュー結果を受ける
5. accept なら次タスクへ
6. 最後に commit / push と summary

## 6. 朝に見るもの
- `TASK_STATUS.md`
- `REVIEW_NOTES.md`
- `git log --oneline -n 5`
- `git status`
