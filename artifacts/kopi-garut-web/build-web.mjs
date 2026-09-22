import { mkdir, rm, writeFile } from 'node:fs/promises';

const outputDir = new URL('./dist/public/', import.meta.url);
const basePath = (process.env.BASE_PATH || '/kopi-garut-web/').replace(/\/+$/, '');
const expoDomain = process.env.REPLIT_EXPO_DEV_DOMAIN || process.env.REPLIT_DEV_DOMAIN || '';

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const html = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kopi Garut</title>
  </head>
  <body>
    <script>
      (() => {
        const basePath = ${JSON.stringify(basePath)};
        const pathname = window.location.pathname.startsWith(basePath)
          ? window.location.pathname.slice(basePath.length) || "/"
          : window.location.pathname || "/";
        const target = ${JSON.stringify(expoDomain)};
        const destination = (target ? "https://" + target : "") +
          (pathname.startsWith("/") ? pathname : "/" + pathname) +
          window.location.search + window.location.hash;
        window.location.replace(destination);
      })();
    </script>
  </body>
</html>
`;

await writeFile(new URL('./index.html', outputDir), html);