import { createServer } from "node:http";
import next from "next";
import { handleEnquiry } from "../lib/enquiry-handler";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const portArg = process.argv.indexOf("--port");
const port = Number(
  process.env.PORT || (portArg >= 0 ? process.argv[portArg + 1] : 3000),
);
const app = next({ dev: true, hostname: "0.0.0.0", port });
const handle = app.getRequestHandler();
await app.prepare();
createServer(async (req, res) => {
  if (req.url?.split("?")[0] === "/api/enquiry") {
    const chunks: Buffer[] = [];
    let length = 0;
    for await (const chunk of req) {
      length += chunk.length;
      if (length > 50000) {
        res.writeHead(413);
        res.end("Request too large");
        return;
      }
      chunks.push(chunk);
    }
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers))
      if (v) headers.set(k, Array.isArray(v) ? v.join(",") : v);
    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers,
      body: Buffer.concat(chunks),
    });
    const response = await handleEnquiry(request, {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      ENQUIRY_FROM: process.env.ENQUIRY_FROM,
      ENQUIRY_TO: process.env.ENQUIRY_TO,
    });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
    return;
  }
  await handle(req, res);
}).listen(port, "0.0.0.0", () =>
  console.log(`STAHLTECH dev listening on ${port}`),
);
