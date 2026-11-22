// Sends one test enquiry through Resend using the same settings the Worker uses.
// Usage:
//   npm run email:test
//   npm run email:test -- --to=someone@example.com
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

const key = (process.env.RESEND_API_KEY || "").trim();
const from = (process.env.ENQUIRY_FROM || "").trim();
const to = (process.env.ENQUIRY_TO || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const override = process.argv.find((arg) => arg.startsWith("--to="));

const fail = (message) => {
  // stdout keeps the message readable in PowerShell; the exit code still fails CI.
  console.log(`\n✖ ${message}\n`);
  process.exit(1);
};

if (!key) fail("RESEND_API_KEY is not set in .env.local");
if (key.includes("PASTE_YOUR"))
  fail(
    "RESEND_API_KEY is still the placeholder in .env.local.\n  Create a key at https://resend.com/api-keys and paste it in place of re_PASTE_YOUR_RESEND_API_KEY_HERE.",
  );
if (!key.startsWith("re_")) console.warn("! RESEND_API_KEY does not start with \"re_\". Check you copied the full key.");
if (!from) fail("ENQUIRY_FROM is not set in .env.local");
const recipients = override ? [override.slice(5)] : to;
if (!recipients.length) fail("ENQUIRY_TO is not set in .env.local");

const masking = key.length > 8 ? `${key.slice(0, 5)}…${key.slice(-4)}` : "(short)";
console.log(`\nSending test enquiry\n  key:  ${masking}\n  from: ${from}\n  to:   ${recipients.join(", ")}\n`);

let response;
try {
  response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: "test-buyer@example.com",
      subject: "STAHLTECH — Resend test enquiry",
      text: [
        "This is a test of the STAHLTECH website enquiry form.",
        "If you received it, Resend delivery is configured correctly.",
        "",
        "Name: Test Buyer",
        "Company: Resend Setup Check",
        "Requirements: This message confirms the contact form can reach the business inbox.",
      ].join("\n"),
      html: '<div style="font:15px/1.6 Arial,sans-serif"><p><strong>STAHLTECH</strong> — Resend test enquiry</p><p>If you received this, the website contact form can deliver to this inbox.</p><p style="color:#666">Name: Test Buyer<br>Company: Resend Setup Check</p></div>',
    }),
    signal: AbortSignal.timeout(15000),
  });
} catch (error) {
  fail(`Could not reach api.resend.com (${error instanceof Error ? error.message : "network error"}). Check your internet connection.`);
}

const body = await response.text();
if (!response.ok) {
  let hint = "";
  if (response.status === 401) hint = "The API key is invalid or revoked. Create a new one at https://resend.com/api-keys.";
  else if (response.status === 403) hint = "The sending domain is not verified, or the test sender may only deliver to the Resend account owner's address. Verify a domain at https://resend.com/domains.";
  else if (response.status === 422) hint = "Resend rejected a field. ENQUIRY_FROM usually needs the form \"Name <address@verified-domain>\".";
  else if (response.status === 429) hint = "Rate limited by Resend. Wait a minute and retry.";
  fail(`Resend returned HTTP ${response.status}.\n  ${body.slice(0, 400)}${hint ? `\n\n  ${hint}` : ""}`);
}

const receipt = JSON.parse(body);
console.log(`✔ Accepted by Resend. Message id: ${receipt.id}`);
console.log(`  Check ${recipients.join(", ")} (and spam) in a few seconds.\n`);
