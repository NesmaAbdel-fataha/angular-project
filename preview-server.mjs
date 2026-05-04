import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const port = Number(process.env.PORT ?? 4173);
const root = join(process.cwd(), 'dist', 'angular2', 'browser');

const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function getFilePath(url) {
  const cleanUrl = decodeURIComponent(url.split('?')[0]);
  const requestedPath = normalize(cleanUrl === '/' ? '/index.html' : cleanUrl);

  if (requestedPath.includes('..')) {
    return null;
  }

  return join(root, requestedPath);
}

const server = createServer(async (req, res) => {
  const filePath = getFilePath(req.url ?? '/');

  try {
    const body = await readFile(filePath ?? '');
    const contentType = contentTypes[extname(filePath ?? '')] ?? 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(body);
  } catch {
    const body = await readFile(join(root, 'index.html'));

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(body);
  }
});

server.listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});
