# Contributing to Subnect+

## ブランチ戦略

```
main (安定版)
└── develop (開発用メイン)
    └── feature/* (機能開発)
```

### ブランチの役割

- `main`: プロダクション用の安定版コード
- `develop`: 開発用のメインブランチ
- `feature/*`: 新機能開発用のブランチ

## 開発フロー

1. 新機能の開発を始める場合：
```bash
# developブランチから最新をプル
git checkout develop
git pull origin develop

# 機能開発用のブランチを作成
git checkout -b feature/機能名
```

2. 開発が完了したら：
```bash
# 変更をコミット
git add .
git commit -m "feat: 機能の説明"

# developブランチにマージ
git checkout develop
git merge feature/機能名
```

3. リリース準備：
```bash
# developブランチからmainにマージ
git checkout main
git merge develop

# バージョンタグを付ける
git tag -a v1.0.0 -m "バージョン1.0.0"
```

## コミットメッセージの規則

以下のプレフィックスを使用：

- `feat:` - 新機能
- `fix:` - バグ修正
- `docs:` - ドキュメントのみの変更
- `style:` - コードの意味に影響しない変更（空白、フォーマット等）
- `refactor:` - バグ修正や機能追加を含まないコードの変更
- `test:` - テストの追加や修正
- `chore:` - ビルドプロセスやツールの変更

## 初期セットアップ手順

1. リポジトリのクローン：
```bash
git clone https://github.com/nezumi0627/subnect-plus.git
cd subnect-plus
```

2. ブランチのセットアップ：
```bash
# mainブランチの作成
git branch -M main

# developブランチの作成
git checkout -b develop

# 機能開発用ブランチの作成
git checkout -b feature/initial-setup
```

3. リモートへのプッシュ：
```bash
git remote add origin https://github.com/nezumi0627/subnect-plus.git
git push -u origin main
git push -u origin develop
git push -u origin feature/initial-setup
```
