# Subnect+

Subnectの機能を拡張するChrome拡張機能です。

## 機能

- ロゴをSubnect+に変更できます（青色のロゴに変更）
- その他の機能は順次追加予定

## インストール

1. このリポジトリをクローンまたはダウンロード
```bash
git clone https://github.com/nezumi0627/subnect-plus.git
cd subnect-plus
```

2. 依存関係のインストール
```bash
# Denoのインストール（未インストールの場合）
# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex

# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# 依存関係のキャッシュ
deno cache src/content/main.ts
```

3. ビルド
```bash
deno task build
```

4. Chrome拡張機能としてインストール
- Chromeで `chrome://extensions` を開く
- デベロッパーモードを有効にする
- 「パッケージ化されていない拡張機能を読み込む」をクリック
- `dist` ディレクトリを選択

## 開発

```bash
# 開発用ビルド（ファイル変更を監視）
deno task watch

# コードのフォーマット
deno task fmt

# リント
deno task lint

# 型チェック
deno task check
```

## 技術スタック

- [Deno](https://deno.land/) - TypeScriptランタイム
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/) - ブラウザ拡張機能
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング

## ライセンス

MIT

## 作者

nezumi0627 