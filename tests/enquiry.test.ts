import { test } from "node:test";
import assert from "node:assert/strict";
import { enquirySchema, parseStoredQuote } from "../lib/quote";
import { handleEnquiry } from "../lib/enquiry-handler";
import { products } from "../lib/products";
const p = products[0];
const item = {
  slug: p.slug,
  colour: p.colours[0],
  size: p.sizes[0],
  quantity: 5,
  notes: "",
};
const valid = {
  name: "Test Buyer",
  company: "Buyer Company",
  email: "buyer@example.com",
  country: "France",
  phone: "",
  requirements: "Please confirm the product specifications.",
  items: [item],
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
};
const request = (body: unknown, ip: string) =>
  new Request("https://example.com/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://example.com",
      "cf-connecting-ip": ip,
    },
    body: JSON.stringify(body),
  });
test("server validation rejects altered variants, invalid quantities and spam", () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
  for (const patch of [
    { email: "bad" },
    { consent: false },
    { website: "bot" },
    { requirements: "short" },
    { items: [{ ...item, quantity: 0 }] },
    { items: [{ ...item, colour: "Invented" }] },
    { items: [{ ...item, slug: "missing" }] },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
});
test("stored quote handles malformed data and keeps valid selection", () => {
  assert.deepEqual(parseStoredQuote("invalid"), []);
  assert.deepEqual(parseStoredQuote("{}"), []);
  assert.equal(
    parseStoredQuote(JSON.stringify([item, { ...item, quantity: -1 }])).length,
    1,
  );
});
test("unconfigured delivery truthfully returns 503", async () => {
  const r = await handleEnquiry(request(valid, "unconfigured"), {});
  assert.equal(r.status, 503);
  assert.match((await r.json()).message, /not been sent or stored/);
});
test("cross-origin and too-fast submissions rejected", async () => {
  const cross = new Request("https://example.com/api/enquiry", {
    method: "POST",
    headers: { Origin: "https://other.example" },
  });
  assert.equal((await handleEnquiry(cross, {})).status, 403);
  assert.equal(
    (
      await handleEnquiry(
        request({ ...valid, startedAt: Date.now() }, "timing"),
        {},
      )
    ).status,
    400,
  );
});
test("provider acceptance required for success", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () =>
      Response.json({ message: "Failed" }, { status: 500 });
    assert.equal(
      (
        await handleEnquiry(request(valid, "provider-fail"), {
          RESEND_API_KEY: "test",
          ENQUIRY_FROM: "test@example.com",
          ENQUIRY_TO: "test@example.com",
        })
      ).status,
      502,
    );
    globalThis.fetch = async () => Response.json({ id: "mock-receipt" });
    assert.equal(
      (
        await handleEnquiry(request(valid, "provider-success"), {
          RESEND_API_KEY: "test",
          ENQUIRY_FROM: "test@example.com",
          ENQUIRY_TO: "test@example.com",
        })
      ).status,
      200,
    );
  } finally {
    globalThis.fetch = original;
  }
});
