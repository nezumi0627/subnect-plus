#!/bin/bash

# 結果を保存するディレクトリを作成
mkdir -p .wt-pre-push-test

# ログファイルをクリア
> .wt-pre-push-test/check-results.log

echo "🔍 Running pre-push checks..."

# コミットメッセージの@pre-pushチェック
echo "📝 Checking @pre-push tag..."
if ! git log -1 --pretty=%B | grep -q "@pre-push"; then
    error_message="❌ Error: Commit message must include @pre-push tag"
    echo "$error_message"
    echo "$error_message" >> .wt-pre-push-test/check-results.log
    exit 1
fi
echo "✅ @pre-push tag check passed" >> .wt-pre-push-test/check-results.log

# Markdownファイルのフォーマットチェック
echo "📝 Checking Markdown formatting..."
if ! deno fmt --check 2>&1; then
    error_message="❌ Error: Markdown format check failed"
    echo "$error_message"
    echo "$error_message" >> .wt-pre-push-test/check-results.log
    exit 1
fi
echo "✅ Markdown format check passed" >> .wt-pre-push-test/check-results.log

# すべてのチェックがパスした場合
echo "✅ All checks passed! Ready to push."
cat .wt-pre-push-test/check-results.log
exit 0 