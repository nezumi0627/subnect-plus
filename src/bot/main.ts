import { Octokit } from 'https://esm.sh/octokit';

const octokit = new Octokit({
  auth: Deno.env.get('GITHUB_TOKEN'),
});

// イベントの種類を取得
const eventName = Deno.env.get('GITHUB_EVENT_NAME');
const eventPath = Deno.env.get('GITHUB_EVENT_PATH');

// イベントデータを読み込み
const event = JSON.parse(await Deno.readTextFile(eventPath));

async function handleIssueOpened(issue: any) {
  const { owner, repo } = event.repository;
  const issueNumber = issue.number;

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: `こんにちは！Nezumaidです。\nIssueを確認しました。担当者が対応するまでお待ちください。\n\n不明な点がありましたら、お気軽にコメントしてください。`,
  });

  // ラベルの自動付与
  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels: ['triage'],
  });
}

async function handlePullRequestOpened(pr: any) {
  const { owner, repo } = event.repository;
  const prNumber = pr.number;

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: `こんにちは！Nezumaidです。\nPull Requestを確認しました。\n\nレビューアーが確認するまでお待ちください。`,
  });

  // レビュアーの自動アサイン
  await octokit.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number: prNumber,
    reviewers: ['nezumi0627'],
  });
}

// イベントに応じた処理
switch (eventName) {
  case 'issues':
    if (event.action === 'opened') {
      await handleIssueOpened(event.issue);
    }
    break;

  case 'pull_request':
    if (event.action === 'opened') {
      await handlePullRequestOpened(event.pull_request);
    }
    break;
} 