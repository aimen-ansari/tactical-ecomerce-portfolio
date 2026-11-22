import { enquirySchema, type Enquiry } from "./quote";
import { products } from "./products";
export type EmailEnv = {
  RESEND_API_KEY?: string;
  ENQUIRY_TO?: string;
  ENQUIRY_FROM?: string;
};
const attempts = new Map<string, { time: number; count: number }>();
const json = (message: string, status: number) =>
  Response.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    },
  );
// A single value never contains a newline once it leaves the schema, but strip
// them anyway so buyer input can never inject mail headers.
const headerSafe = (value: string) => value.replace(/[\r\n]+/g, " ");
const recipients = (value: string) =>
  value
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
const describeItems = (data: Enquiry) =>
  data.items.map((item) => {
    const product = products.find((p) => p.slug === item.slug);
    return `${product?.code ?? item.slug} | ${item.slug} | ${item.colour} | ${item.size} | Quantity: ${item.quantity} | Notes: ${item.notes}`;
  });
const buildText = (data: Enquiry) =>
  [
    "STAHLTECH BUSINESS ENQUIRY",
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Requirements:\n${data.requirements}`,
    data.items.length ? "Selected products:" : "Selected products: none",
    ...describeItems(data),
  ].join("\n\n");
const buildHtml = (data: Enquiry) => {
  const rows = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Country", data.country],
    ["Phone", data.phone || "Not provided"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111"><strong>${escapeHtml(value)}</strong></td></tr>`,
    )
    .join("");
  const items = data.items.length
    ? `<h3 style="font:600 15px/1.4 Arial,sans-serif;margin:24px 0 8px">Selected products</h3>
<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font:14px/1.5 Arial,sans-serif">
<tr style="background:#f3f3f3"><th align="left" style="padding:8px;border:1px solid #ddd">Code</th><th align="left" style="padding:8px;border:1px solid #ddd">Product</th><th align="left" style="padding:8px;border:1px solid #ddd">Colour</th><th align="left" style="padding:8px;border:1px solid #ddd">Size</th><th align="right" style="padding:8px;border:1px solid #ddd">Qty</th><th align="left" style="padding:8px;border:1px solid #ddd">Notes</th></tr>
${data.items
  .map((item) => {
    const product = products.find((p) => p.slug === item.slug);
    return `<tr><td style="padding:8px;border:1px solid #ddd">${escapeHtml(product?.code ?? "")}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(item.slug)}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(item.colour)}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(item.size)}</td><td align="right" style="padding:8px;border:1px solid #ddd">${item.quantity}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(item.notes)}</td></tr>`;
  })
  .join("")}
</table>`
    : `<p style="color:#555;font:14px/1.5 Arial,sans-serif">No products were selected from the quotation basket.</p>`;
  return `<!doctype html><html><body style="margin:0;background:#f6f6f4;padding:24px">
<div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e2e2df;padding:28px">
<p style="font:700 12px/1.4 Arial,sans-serif;letter-spacing:.14em;color:#b45309;margin:0 0 4px">STAHLTECH</p>
<h2 style="font:600 20px/1.3 Arial,sans-serif;margin:0 0 20px">New business enquiry</h2>
<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font:14px/1.5 Arial,sans-serif">${rows}</table>
<h3 style="font:600 15px/1.4 Arial,sans-serif;margin:24px 0 8px">Requirements</h3>
<p style="font:14px/1.6 Arial,sans-serif;color:#111;white-space:pre-wrap;margin:0">${escapeHtml(data.requirements)}</p>
${items}
<p style="font:12px/1.5 Arial,sans-serif;color:#777;margin:24px 0 0">Reply directly to this email to answer ${escapeHtml(data.name)}. Sent from the STAHLTECH website enquiry form.</p>
</div></body></html>`;
};
export async function handleEnquiry(
  request: Request,
  env: EmailEnv,
): Promise<Response> {
  if (request.method !== "POST") return json("Method not allowed.", 405);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json("Invalid request origin.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json("Send JSON data.", 415);
  const ip = request.headers.get("cf-connecting-ip") || "local";
  const now = Date.now();
  const prior = attempts.get(ip);
  if (prior && now - prior.time < 60000 && prior.count >= 5)
    return json("Too many attempts. Please wait a minute and try again.", 429);
  if (attempts.size > 10000) attempts.clear();
  attempts.set(ip, {
    time: prior && now - prior.time < 60000 ? prior.time : now,
    count: prior && now - prior.time < 60000 ? prior.count + 1 : 1,
  });
  let input;
  try {
    const raw = await request.text();
    if (raw.length > 50000) return json("The enquiry is too large.", 413);
    input = JSON.parse(raw);
  } catch {
    return json("Invalid request data.", 400);
  }
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    return json(
      "Please check your business details, requirements and product selections.",
      400,
    );
  const data = parsed.data;
  if (now - data.startedAt < 2500 || now - data.startedAt > 86400000)
    return json(
      "Please take a moment to review the form, then submit again. Refresh if the form has been open for a day.",
      400,
    );
  if (!env.RESEND_API_KEY || !env.ENQUIRY_FROM || !env.ENQUIRY_TO)
    return json(
      "Development mode: email delivery is not configured. Your enquiry has not been sent or stored. Your product selection remains in this browser.",
      503,
    );
  const to = recipients(env.ENQUIRY_TO);
  if (!to.length)
    return json(
      "Development mode: email delivery is not configured. Your enquiry has not been sent or stored. Your product selection remains in this browser.",
      503,
    );
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.ENQUIRY_FROM,
        to,
        reply_to: headerSafe(data.email),
        subject: `STAHLTECH — New business enquiry from ${headerSafe(data.company)}`,
        text: buildText(data),
        html: buildHtml(data),
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!result.ok) {
      // Keep the buyer-facing message generic, but log the provider reason so
      // configuration mistakes (unverified sender, bad key) are diagnosable.
      const detail = await result.text().catch(() => "");
      console.error(
        `Resend rejected the enquiry (HTTP ${result.status}): ${detail.slice(0, 600)}`,
      );
      return json(
        "The email service could not accept your enquiry. It has not been stored. Please try again later.",
        502,
      );
    }
    const receipt = (await result.json()) as { id?: string };
    if (!receipt.id)
      return json(
        "Delivery could not be confirmed. Please contact the business before resubmitting.",
        502,
      );
    return json(
      "Your enquiry has been accepted by our email service for delivery. Thank you — your product selection is still available in this browser.",
      200,
    );
  } catch {
    return json(
      "Delivery could not be confirmed. Your enquiry has not been stored. Please try again later.",
      502,
    );
  }
}
