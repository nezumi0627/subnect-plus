# スクリプトのディレクトリを取得
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPath = Split-Path -Parent $scriptPath

# 結果を保存するディレクトリを作成
$testDir = Join-Path $rootPath ".wt-pre-push-test"
if (!(Test-Path $testDir)) {
    New-Item -ItemType Directory -Path $testDir
}

# ログファイルをクリア
$logFile = Join-Path $testDir "check-results.log"
"" | Out-File $logFile

Write-Host "🔍 Running pre-push checks..." -ForegroundColor Blue

# コミットメッセージの@pre-pushチェック
Write-Host "📝 Checking @pre-push tag..." -ForegroundColor Blue
$lastCommitMessage = git log -1 --pretty=%B
if (!($lastCommitMessage -match "@pre-push")) {
    $errorMessage = "❌ Error: Commit message must include @pre-push tag"
    Write-Host $errorMessage -ForegroundColor Red
    $errorMessage | Out-File -Append $logFile
    exit 1
}
"✅ @pre-push tag check passed" | Out-File -Append $logFile

# Markdownファイルのフォーマットチェック
Write-Host "📝 Checking Markdown formatting..." -ForegroundColor Blue
Set-Location $rootPath
$denoFmtOutput = deno fmt --check 2>&1
if ($LASTEXITCODE -ne 0) {
    $errorMessage = "❌ Error: Markdown format check failed`n$denoFmtOutput"
    Write-Host $errorMessage -ForegroundColor Red
    $errorMessage | Out-File -Append $logFile
    exit 1
}
"✅ Markdown format check passed" | Out-File -Append $logFile

# すべてのチェックがパスした場合
Write-Host "✅ All checks passed! Ready to push." -ForegroundColor Green
Get-Content $logFile
exit 0 