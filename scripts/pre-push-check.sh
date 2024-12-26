#!/bin/bash

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# 結果を保存するディレクトリを作成
TEST_DIR="$ROOT_DIR/.wt-pre-push-test"
mkdir -p "$TEST_DIR"

# ログファイルをクリア
LOG_FILE="$TEST_DIR/check-results.log"
> "$LOG_FILE"

echo "🔍 Running pre-push checks..."

# コミットメッセージの@pre-pushチェック
echo "📝 Checking @pre-push tag..."
if ! git log -1 --pretty=%B | grep -q "@pre-push"; then
    error_message="❌ Error: Commit message must include @pre-push tag"
    echo "$error_message"
    echo "$error_message" >> "$LOG_FILE"
    exit 1
fi
echo "✅ @pre-push tag check passed" >> "$LOG_FILE"

# Markdownファイルのフォーマットチェック
echo "📝 Checking Markdown formatting..."
cd "$ROOT_DIR"
if ! deno fmt --check 2>&1; then
    error_message="❌ Error: Markdown format check failed"
    echo "$error_message"
    echo "$error_message" >> "$LOG_FILE"
    exit 1
fi
echo "✅ Markdown format check passed" >> "$LOG_FILE"

# すべてのチェックがパスした場合
echo "✅ All checks passed! Ready to push."
cat "$LOG_FILE"
exit 0 