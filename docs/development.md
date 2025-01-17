<div align="center">
  <h1>Development</h1>
  <p>Subnect+の開発情報</p>
</div>

<div align="center">
  <a href="#tech-stack">技術スタック</a> •
  <a href="#requirements">開発環境</a> •
  <a href="#structure">ディレクトリ構造</a>
</div>

<br>

<div id="tech-stack">
  <h2>技術スタック</h2>
  <p>開発には以下の技術を使用しています：</p>

<table>
    <tr>
      <th align="left">技術</th>
      <th align="left">バージョン</th>
      <th align="left">用途</th>
    </tr>
    <tr>
      <td>Deno</td>
      <td>1.38.5</td>
      <td>実行環境</td>
    </tr>
    <tr>
      <td>TypeScript</td>
      <td>Latest</td>
      <td>開発言語</td>
    </tr>
    <tr>
      <td>Chrome Extension</td>
      <td>Manifest V3</td>
      <td>拡張機能フレームワーク</td>
    </tr>
  </table>
</div>

<br>

<div id="requirements">
  <h2>開発環境の要件</h2>
  <p>開発には以下の環境が必要です：</p>

<ul>
    <li>Node.js 20以上</li>
    <li>Deno 2.1.4以上</li>
    <li>Chrome最新版</li>
  </ul>
</div>

<br>

<div id="structure">
  <h2>ディレクトリ構造</h2>
  <p>プロジェクトは以下の構造で構成されています：</p>

<pre><code>subnect-plus/
├── src/
│   ├── content/      # コンテンツスクリプト
│   ├── background/   # バックグラウンドスクリプト
│   └── types/        # 型定義
├── icons/            # アイコンファイル
├── styles/           # スタイルシート
└── docs/            # ドキュメント</code></pre>

<div align="center">
    <p><i>※ 各ディレクトリの詳細な説明は各READMEを参照してください</i></p>
  </div>
</div>
