import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const outputDir = fileURLToPath(new URL('./dist/public/', import.meta.url));
const mobileDir = fileURLToPath(new URL('../kopi-garut-mobile/', import.meta.url));
const basePath = (process.env.BASE_PATH || '/kopi-garut-web').replace(/\/+$/, '') || '/';

await rm(outputDir, { recursive: true, force: true });

async function patchExportedHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      await patchExportedHtml(entryPath);
      return;
    }

    if (!entry.name.endsWith('.html')) return;

    const html = await readFile(entryPath, 'utf8');
    const scrollableExpoReset = '<style id="expo-reset">html{height:100%;min-height:100%;overflow-y:auto}body{margin:0;min-height:100%;height:auto;overflow-x:clip;overflow-y:visible;-webkit-overflow-scrolling:touch}#root{display:flex;min-height:100dvh;height:auto}</style>';
    const patchedReset = html.replace(
      /<style id="expo-reset">#root,body,html\{height:100%\}body\{overflow:hidden\}#root\{display:flex\}<\/style>/,
      scrollableExpoReset,
    );
    const standaloneMeta = [
      '<meta name="mobile-web-app-capable" content="yes"/>',
      '<meta name="apple-mobile-web-app-capable" content="yes"/>',
      '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>',
      '<meta name="theme-color" content="#f6f0e8"/>',
    ].join('');
    const patchedHtml = patchedReset.includes('apple-mobile-web-app-capable')
      ? patchedReset
      : patchedReset.replace('</head>', `${standaloneMeta}</head>`);

    if (patchedHtml !== html) {
      await writeFile(entryPath, patchedHtml);
    }
  }));
}

const exportProcess = spawn(
  'pnpm',
  ['exec', 'expo', 'export', '--platform', 'web', '--output-dir', outputDir, '--clear'],
  {
    cwd: mobileDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      EXPO_WEB_BASE_PATH: basePath,
    },
  },
);

exportProcess.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  if (code !== 0) {
    process.exit(code ?? 1);
    return;
  }

  patchExportedHtml(outputDir)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to prepare the web export for document scrolling:', error);
      process.exit(1);
    });
});