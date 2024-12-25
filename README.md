<div align="center">
  <img src=".github/assets/banner.svg" alt="Subnect+ Banner" />
</div>

# Subnect+

Subnectをより使いやすくするChrome拡張機能

## 実装済み機能

### [2024/12/25] Setting Button
- 設定ページに拡張機能の設定を追加
- 設定メニューからSubnect+の設定にアクセス可能

### [2024/12/25] Change Logo Subnect+
- Subnectのロゴを「Subnect+」に変更
- ロゴの色を青色に変更

## 開発環境

- Deno 1.38.5
- TypeScript
- Chrome Extension Manifest V3

## インストール方法

1. このリポジトリをクローン
```bash
git clone https://github.com/nezumi0627/subnect-plus.git
```

2. 依存関係をインストール
```bash
deno cache src/content/main.ts
```

3. ビルド
```bash
deno task build
```

4. Chromeの拡張機能ページ（`chrome://extensions`）を開く
5. デベロッパーモードを有効にする
6. 「パッケージ化されていない拡張機能を読み込む」をクリック
7. `dist`フォルダを選択

## 開発への参加

1. このリポジトリをフォーク
2. 機能追加やバグ修正を実装
3. プルリクエストを作成

詳しくは[CONTRIBUTING.md](CONTRIBUTING.md)を参照してください。

## ライセンス

MIT License 