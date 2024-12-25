import { ensureDir } from 'https://deno.land/std@0.210.0/fs/ensure_dir.ts';
import { copy } from 'https://deno.land/std@0.210.0/fs/copy.ts';
import { join } from 'https://deno.land/std@0.210.0/path/mod.ts';

async function build() {
  try {
    // distディレクトリの作成
    await ensureDir('dist');
    await ensureDir('dist/content');
    await ensureDir('dist/background');

    // content scriptのバンドル
    const contentResult = await Deno.run({
      cmd: ['deno', 'bundle', 'src/content/main.ts', 'dist/content/main.js'],
      stdout: 'piped',
      stderr: 'piped',
    });

    // background scriptのバンドル
    const backgroundResult = await Deno.run({
      cmd: ['deno', 'bundle', 'src/background/main.ts', 'dist/background/main.js'],
      stdout: 'piped',
      stderr: 'piped',
    });

    // 静的ファイルのコピー
    await copy('icons', 'dist/icons', { overwrite: true });
    await copy('styles', 'dist/styles', { overwrite: true });
    await copy('manifest.json', 'dist/manifest.json', { overwrite: true });

    // 結果の確認
    const [contentStatus, backgroundStatus] = await Promise.all([
      contentResult.status(),
      backgroundResult.status(),
    ]);

    if (!contentStatus.success || !backgroundStatus.success) {
      throw new Error('ビルドに失敗しました');
    }

    console.log('ビルドが完了しました！');
  } catch (error) {
    console.error('ビルドエラー:', error);
    Deno.exit(1);
  }
}

await build(); 