import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 21729);
const targetPort = port + 1;
const basePath = (process.env.BASE_PATH || '/kopi-garut-web/').replace(/\/+$/, '');
const mobileDir = fileURLToPath(new URL('../kopi-garut-mobile/', import.meta.url));

const expoProcess = spawn(
  'pnpm',
  ['exec', 'expo', 'start', '--web', '--localhost', '--port', String(targetPort)],
  {
    cwd: mobileDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      CI: '1',
      EXPO_BASE_URL: basePath.replace(/^\/+/, ''),
      EXPO_PUBLIC_DOMAIN: '',
    },
  },
);

expoProcess.stdout?.on('data', (chunk) => process.stdout.write(`[Expo] ${chunk}`));
expoProcess.stderr?.on('data', (chunk) => process.stderr.write(`[Expo] ${chunk}`));

function stripBasePath(pathname) {
  if (pathname === basePath || pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length) || '/';
  }
  return pathname || '/';
}

function addBasePathToRootUrls(html) {
  const prefix = `${basePath}/`;
  return html
    .replaceAll('src="/', `src="${prefix}`)
    .replaceAll('href="/', `href="${prefix}`)
    .replaceAll('action="/', `action="${prefix}`);
}

function proxyRequest(request, response) {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const targetPath = `${stripBasePath(requestUrl.pathname)}${requestUrl.search}`;
  const proxy = http.request(
    {
      hostname: '127.0.0.1',
      port: targetPort,
      method: request.method,
      path: targetPath,
      headers: {
        ...request.headers,
        host: `127.0.0.1:${targetPort}`,
      },
    },
    (upstream) => {
      const headers = { ...upstream.headers };
      const contentType = String(headers['content-type'] || '');

      if (contentType.includes('text/html')) {
        const chunks = [];
        upstream.on('data', (chunk) => chunks.push(chunk));
        upstream.on('end', () => {
          const html = addBasePathToRootUrls(Buffer.concat(chunks).toString('utf8'));
          delete headers['content-length'];
          response.writeHead(upstream.statusCode || 200, headers);
          response.end(html);
        });
        return;
      }

      response.writeHead(upstream.statusCode || 200, headers);
      upstream.pipe(response);
    },
  );

  proxy.on('error', (error) => {
    if (!response.headersSent) response.writeHead(502, { 'content-type': 'text/plain' });
    response.end(`Expo web server unavailable: ${error.message}`);
  });

  request.pipe(proxy);
}

const server = http.createServer(proxyRequest);

const shutdown = () => {
  expoProcess.kill('SIGTERM');
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(port, '0.0.0.0', () => {
  console.log(`Kopi Garut web proxy listening on port ${port}`);
  console.log(`Proxying Expo Web on internal port ${targetPort} under ${basePath}/`);
});