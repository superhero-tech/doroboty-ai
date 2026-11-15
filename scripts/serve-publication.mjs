import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("publish");
const port = Number(process.env.PUBLICATION_PORT || 3015);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".csv": "text/csv",
};
createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405);
      response.end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + path.sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const bytes = await readFile(file);
    response.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
    response.setHeader("Cache-Control", "no-store");
    response.end(request.method === "HEAD" ? undefined : bytes);
  } catch {
    response.writeHead(404);
    response.end("Nie znaleziono strony.");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`DoRoboty.ai publication: http://127.0.0.1:${port}/`),
);
