import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const outputDir = fileURLToPath(new URL('./dist/public/', import.meta.url));
const mobileDir = fileURLToPath(new URL('../kopi-garut-mobile/', import.meta.url));

await rm(outputDir, { recursive: true, force: true });

const exportProcess = spawn(
  'pnpm',
  ['exec', 'expo', 'export', '--platform', 'web', '--output-dir', outputDir, '--clear'],
  {
    cwd: mobileDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      EXPO_BASE_URL: 'kopi-garut-web',
    },
  },
);

exportProcess.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});