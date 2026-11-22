import {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { build } from "esbuild";
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });
const assets = {};
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
};
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else {
      const url = "/" + path.relative("out", file).replaceAll("\\", "/");
      assets[url] = [
        mime[path.extname(file)] || "application/octet-stream",
        gzipSync(readFileSync(file)).toString("base64"),
      ];
    }
  }
}
walk("out");
const source = `import {handleEnquiry} from './lib/enquiry-handler';
const assets=${JSON.stringify(assets)};
export default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/api/enquiry'||url.pathname==='/api/enquiry/')return handleEnquiry(request,env);if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{return new Response('Bad URL',{status:400});}if(pathname.startsWith('/delivery-v2/_next/'))pathname=pathname.slice('/delivery-v2'.length);let file=assets[pathname]||assets[pathname.replace(/\\/$/,'')+'/index.html'];const status=file?200:404;file=file||assets['/404.html'];if(!file)return new Response('Not found',{status:404});const bytes=Uint8Array.from(atob(file[1]),c=>c.charCodeAt(0));const headers={'Content-Type':file[0],'Cache-Control':pathname.startsWith('/_next/static/')?'public, max-age=31536000, immutable':'public, max-age=0, must-revalidate','Vary':'Accept-Encoding','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'SAMEORIGIN','Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=()','Cross-Origin-Opener-Policy':'same-origin'};const body=request.method==='HEAD'?null:await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();return new Response(body,{status,headers});}};`;
writeFileSync(".worker-entry.ts", source);
await build({
  entryPoints: [".worker-entry.ts"],
  outfile: "dist/server/index.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
});
rmSync(".worker-entry.ts");
if (existsSync(".openai/hosting.json")) {
  copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");
} else {
  console.log("No .openai/hosting.json found; skipping hosting manifest copy.");
}
console.log("Packaged Next.js prerendered pages + server-side enquiry Worker.");
