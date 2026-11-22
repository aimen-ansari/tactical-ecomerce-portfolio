import { test } from "node:test";
import assert from "node:assert/strict";
// Run after npm run build. These checks cover the actual deployable Worker.
const workerEntry = "../dist/server/index.js";
const { default: worker } = await import(workerEntry);
for (const encoding of ["gzip, deflate, br", "gzip", "identity"]) {
  test(`serves decoded HTML, CSS, JS and images for ${encoding}`, async () => {
    const home = await worker.fetch(
      new Request("https://example.com/", {
        headers: { "Accept-Encoding": encoding },
      }),
      {},
    );
    assert.equal(home.status, 200);
    assert.equal(home.headers.get("content-encoding"), null);
    const html = await home.text();
    assert.match(html, /^<!DOCTYPE html>/i);
    assert.match(html, /STAHLTECH/);
    const js = html.match(/src="([^\"]+\.js)"/)?.[1];
    const css = html.match(/href="([^\"]+\.css)"/)?.[1];
    assert.ok(js?.startsWith("/delivery-v2/_next/"));
    assert.ok(css?.startsWith("/delivery-v2/_next/"));
    for (const path of [js!, css!, "/images/security-hero.webp"]) {
      const response = await worker.fetch(
        new Request("https://example.com" + path, {
          headers: { "Accept-Encoding": encoding },
        }),
        {},
      );
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("content-encoding"), null);
      const bytes = new Uint8Array(await response.arrayBuffer());
      assert.notDeepEqual(Array.from(bytes.slice(0, 2)), [31, 139]);
      if (path.endsWith(".webp"))
        assert.equal(new TextDecoder().decode(bytes.slice(0, 4)), "RIFF");
      else assert.ok(bytes.length > 100);
    }
  });
}
test("HEAD uses the same content type without a body", async () => {
  const response = await worker.fetch(
    new Request("https://example.com/", {
      method: "HEAD",
      headers: { "Accept-Encoding": "gzip" },
    }),
    {},
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /text\/html/);
  assert.equal(await response.text(), "");
});
