<div align="center">
  <h1>Installation</h1>
  <p>Subnect+のインストール手順</p>
</div>

<div align="center">
  <a href="#setup">開発環境のセットアップ</a> •
  <a href="#chrome">Chromeへのインストール</a>
</div>

<br>

<div id="setup">
  <h2>開発環境のセットアップ</h2>

  <div>
    <h3>1. リポジトリのクローン</h3>
    <pre><code>git clone https://github.com/nezumi0627/subnect-plus.git</code></pre>
  </div>

  <div>
    <h3>2. 依存関係のインストール</h3>
    <pre><code>deno cache src/content/main.ts</code></pre>
  </div>

  <div>
    <h3>3. ビルド</h3>
    <pre><code>deno task build</code></pre>
  </div>
</div>

<br>

<div id="chrome">
  <h2>Chromeへのインストール</h2>

  <div>
    <h3>手順</h3>
    <ol>
      <li>Chromeの拡張機能ページ（<code>chrome://extensions</code>）を開く</li>
      <li>デベロッパーモードを有効にする</li>
      <li>「パッケージ化されていない拡張機能を読み込む」をクリック</li>
      <li><code>dist</code>フォルダを選択</li>
    </ol>
  </div>

  <div align="center">
    <p><i>※ インストール後はChromeの再起動が必要な場合があります</i></p>
  </div>
</div>
