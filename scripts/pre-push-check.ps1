# 結果を保存するディレクトリを作成
if (!(Test-Path ".wt-pre-push-test")) {
    New-Item -ItemType Directory -Path ".wt-pre-push-test"
}

# ログファイルをクリア
"" | Out-File ".wt-pre-push-test/check-results.log"

Write-Host "🔍 Running pre-push checks..." -ForegroundColor Blue

# コミットメッセージの@pre-pushチェック
Write-Host "📝 Checking @pre-push tag..." -ForegroundColor Blue
$lastCommitMessage = git log -1 --pretty=%B
if (!($lastCommitMessage -match "@pre-push")) {
    $errorMessage = "❌ Error: Commit message must include @pre-push tag"
    Write-Host $errorMessage -ForegroundColor Red
    $errorMessage | Out-File -Append ".wt-pre-push-test/check-results.log"
    exit 1
}
"✅ @pre-push tag check passed" | Out-File -Append ".wt-pre-push-test/check-results.log"

# Markdownファイルのフォーマットチェック
Write-Host "📝 Checking Markdown formatting..." -ForegroundColor Blue
$denoFmtOutput = deno fmt --check 2>&1
if ($LASTEXITCODE -ne 0) {
    $errorMessage = "❌ Error: Markdown format check failed`n$denoFmtOutput"
    Write-Host $errorMessage -ForegroundColor Red
    $errorMessage | Out-File -Append ".wt-pre-push-test/check-results.log"
    exit 1
}
"✅ Markdown format check passed" | Out-File -Append ".wt-pre-push-test/check-results.log"

# すべてのチェックがパスした場合
Write-Host "✅ All checks passed! Ready to push." -ForegroundColor Green
Get-Content ".wt-pre-push-test/check-results.log"
exit 0 