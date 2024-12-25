<div align="center">
  <img src=".github/assets/banner.svg" alt="Subnect+ Banner" width="800" />

<h1>Subnect+</h1>
  <p><i>pre-Alpha 0.1.0</i></p>

<p><b>Enhance Your Subnect Experience</b></p>

<p>
    <a href="docs/features.md">Features</a> •
    <a href="docs/development.md">Development</a> •
    <a href="docs/installation.md">Installation</a> •
    <a href="CONTRIBUTING.md">Contributing</a> •
    <a href="LICENSE">License</a>
  </p>

<p>
    <a href="https://github.com/nezumi0627/subnect-plus/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
    </a>
    &nbsp;
    <a href="https://deno.land">
      <img src="https://img.shields.io/badge/deno-1.38.5-informational.svg" alt="Deno: 1.38.5">
    </a>
    &nbsp;
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white" alt="TypeScript">
    </a>
  </p>
</div>

## 概要

Subnect+は、Subnectをより使いやすくするChrome拡張機能です。
設定の追加やUIの改善など、様々な機能拡張を提供します。

## 主な機能

- [設定ページ](docs/features.md#setting-button)の追加
- [ロゴデザイン](docs/features.md#change-logo-subnect)の刷新
- その他の機能改善

詳しい機能については[機能一覧](docs/features.md)を参照してください。

## クイックスタート

1. このリポジトリをクローン

```bash
git clone https://github.com/nezumi0627/subnect-plus.git
```

2. 依存関係をインストールしてビルド

```bash
deno cache src/content/main.ts
deno task build
```

詳しいインストール手順は[インストールガイド](docs/installation.md)を参照してください。

## バージョン情報

現在のバージョン: pre-Alpha 0.1.0

詳しいバージョン履歴は[バージョン履歴](docs/version-history.md)を参照してください。

## ライセンス

このプロジェクトは[MIT License](LICENSE)の下で公開されています。

## コントリビュータ

<div align="center">
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
    <linearGradient id="border-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" style="stop-color:#60a5fa"/>
      <stop offset="100%" style="stop-color:#818cf8"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feFlood flood-color="#60a5fa" flood-opacity="0.2" result="color"/>
      <feComposite operator="in" in="color" in2="blur" result="glow"/>
      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="avatar-clip-1">
      <circle cx="200" cy="100" r="40"/>
    </clipPath>
    <clipPath id="avatar-clip-2">
      <circle cx="400" cy="100" r="40"/>
    </clipPath>
  </defs>

  <style>
    @keyframes borderPulse {
      0%, 100% { stroke-width: 2; stroke-opacity: 0.8; }
      50% { stroke-width: 3; stroke-opacity: 1; }
    }
    .container { 
      fill: url(#bg-gradient);
    }
    .border {
      fill: none;
      stroke: url(#border-gradient);
      stroke-width: 1.5;
      opacity: 0.8;
    }
    .text { 
      fill: #ffffff; 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .username {
      font-size: 16px;
      font-weight: 500;
      opacity: 0.9;
    }
    .label {
      font-size: 18px;
      fill: #94a3b8;
      letter-spacing: 0.3em;
      font-weight: 600;
      text-transform: uppercase;
    }
    .avatar-circle {
      fill: none;
      stroke: url(#border-gradient);
      stroke-width: 2;
      filter: url(#glow);
      animation: borderPulse 3s ease-in-out infinite;
    }
    .avatar-container {
      filter: saturate(1.1) brightness(1.05);
    }
  </style>

  <g>
    <!-- Container with rounded corners -->
    <path class="container" d="M25 0H575C588.807 0 600 11.1929 600 25V175C600 188.807 588.807 200 575 200H25C11.1929 200 0 188.807 0 175V25C0 11.1929 11.1929 0 25 0Z"/>
    <path class="border" d="M25 1H575C588.807 1 599 11.1929 599 25V175C599 188.807 588.807 199 575 199H25C11.1929 199 1 188.807 1 175V25C1 11.1929 11.1929 1 25 1Z"/>
    
    <!-- Title -->
    <text class="text label" x="300" y="50" text-anchor="middle">Contributors</text>

    <!-- First Contributor -->
    <g class="avatar-container">
      <img src="https://avatars.githubusercontent.com/MocA-Love?size=160"/>
      <circle class="avatar-circle" cx="200" cy="100" r="40"/>
    </g>
    <text class="text username" x="200" y="160" text-anchor="middle">@MocA-Love</text>

    <!-- Second Contributor -->
    <g class="avatar-container">
      <img src="https://avatars.githubusercontent.com/akku1139?size=160"/>
      <circle class="avatar-circle" cx="400" cy="100" r="40"/>
    </g>
    <text class="text username" x="400" y="160" text-anchor="middle">@akku1139</text>
  </g>
</svg> 

</div>
