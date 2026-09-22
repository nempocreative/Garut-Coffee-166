import http from 'node:http';

const port = Number(process.env.PORT || 3000);
const basePath = (process.env.BASE_PATH || '/kopi-garut-web/').replace(/\/+$/, '');

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const pathname = requestUrl.pathname.startsWith(basePath)
    ? requestUrl.pathname.slice(basePath.length) || '/'
    : requestUrl.pathname || '/';
  const path = `${pathname.startsWith('/') ? pathname : `/${pathname}`}${requestUrl.search}${requestUrl.hash}`;
  const expoDomain = process.env.REPLIT_EXPO_DEV_DOMAIN || process.env.REPLIT_DEV_DOMAIN;
  const destination = expoDomain ? `https://${expoDomain}${path}` : path;
  response.writeHead(307, {
    Location: destination,
    'Cache-Control': 'no-store',
  });
  response.end();
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Kopi Garut web alias listening on port ${port}`);
});