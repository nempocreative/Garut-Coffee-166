import { existsSync, readFileSync, statSync, watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const artifactDir = fileURLToPath(new URL('./', import.meta.url));
const mobileDir = resolve(artifactDir, '../kopi-garut-mobile');
const publicDir = resolve(artifactDir, 'dist/public');
const basePath = (process.env.BASE_PATH || '/kopi-garut-web/').replace(/\/+$/, '');
const port = Number(process.env.PORT || 21729);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function runBuild() {
  return new Promise((resolveBuild, rejectBuild) => {
    const build = spawn('pnpm', ['run', 'build'], {
      cwd: artifactDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        EXPO_WEB_BASE_PATH: basePath,
      },
    });

    build.once('error', rejectBuild);
    build.once('exit', (code, signal) => {
      if (signal) {
        rejectBuild(new Error(`Expo web export stopped by ${signal}`));
      } else if (code === 0) {
        resolveBuild();
      } else {
        rejectBuild(new Error(`Expo web export failed with exit code ${code}`));
      }
    });
  });
}

function startSourceWatcher() {
  let rebuildTimer;
  let buildInProgress = false;
  let rebuildQueued = false;

  const requestRebuild = () => {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(async () => {
      if (buildInProgress) {
        rebuildQueued = true;
        return;
      }

      buildInProgress = true;
      console.log('Mobile source changed; rebuilding the web export...');
      try {
        await runBuild();
        console.log('Web export updated from the mobile source.');
      } catch (error) {
        console.error('Web export rebuild failed:', error);
      } finally {
        buildInProgress = false;
        if (rebuildQueued) {
          rebuildQueued = false;
          requestRebuild();
        }
      }
    }, 250);
  };

  watch(mobileDir, { recursive: true }, (_eventType, filename) => {
    const changedPath = String(filename || '');
    if (
      changedPath.includes('node_modules')
      || changedPath.includes('.expo')
      || changedPath.includes('.git')
      || changedPath.endsWith('.tsbuildinfo')
    ) {
      return;
    }
    requestRebuild();
  });

  console.log(`Watching ${mobileDir} for web parity updates.`);
}

function routeToFile(pathname) {
  const withoutBase =
    pathname === basePath || pathname.startsWith(`${basePath}/`)
      ? pathname.slice(basePath.length) || '/'
      : pathname;
  const routePath = decodeURIComponent(withoutBase || '/');
  const cleanRoute = routePath.replace(/^\/+/, '');

  if (cleanRoute === '') return 'index.html';

  const directPath = join(publicDir, cleanRoute);
  if (existsSync(directPath) && statSync(directPath).isFile()) {
    return cleanRoute;
  }

  const htmlPath = join(publicDir, `${cleanRoute}.html`);
  if (existsSync(htmlPath) && statSync(htmlPath).isFile()) {
    return `${cleanRoute}.html`;
  }

  const dynamicRouteMatch = cleanRoute.match(/^(farmer|product|region)\/[^/]+$/);
  if (dynamicRouteMatch) {
    const dynamicPath = `${dynamicRouteMatch[1]}/[id].html`;
    if (existsSync(join(publicDir, dynamicPath))) return dynamicPath;
  }

  return '+not-found.html';
}

function safeFilePath(relativePath) {
  const filePath = resolve(publicDir, relativePath);
  const rel = relative(publicDir, filePath);
  return rel.startsWith('..') || rel.includes(`..${'/'}`) ? null : filePath;
}

function serve(request, response) {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const relativePath = routeToFile(requestUrl.pathname);
  const filePath = safeFilePath(relativePath);

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
    return;
  }

  const contentType = mimeTypes[relativePath.slice(relativePath.lastIndexOf('.')).toLowerCase()]
    || 'application/octet-stream';
  const content = readFileSync(filePath);
  response.writeHead(200, {
    'cache-control': relativePath.endsWith('.html')
      ? 'no-store'
      : 'public, max-age=31536000, immutable',
    'content-length': content.byteLength,
    'content-type': contentType,
  });
  response.end(request.method === 'HEAD' ? undefined : content);
}

async function start() {
  if (process.argv.includes('--build')) {
    await runBuild();
  }

  if (!existsSync(join(publicDir, 'index.html'))) {
    throw new Error(`Expo web export is missing at ${publicDir}`);
  }

  const server = createServer(serve);
  server.listen(port, '0.0.0.0', () => {
    console.log(`Serving Garut Beans G-Beans Expo Web export on port ${port} under ${basePath}/`);
    if (process.argv.includes('--build')) {
      startSourceWatcher();
    }
  });
}

start().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});