"use client";
/* eslint-disable react-hooks/set-state-in-effect -- The product query is read from the browser only after static hydration. */
import { useEffect, useState } from "react";
import { ArrowUpRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { company } from "@/lib/config";
import { useQuote } from "./quote-provider";
export function EnquiryForm({ custom = false }: { custom?: boolean }) {
  const { items } = useQuote();
  const [startedAt] = useState(() => Date.now());
  const [requirements, setRequirements] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const [message, setMessage] = useState("");
  // Hydrate the product query from the browser after static server rendering.
  useEffect(() => {
    const product = new URLSearchParams(location.search).get("product");
    if (product) setRequirements(`I would like to enquire about ${product}.\n`);
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const details = custom
      ? ["Branding", "Colours", "Sizing", "Packaging", "Quantity"]
          .map((k) => `${k}: ${data.get(k) || "To discuss"}`)
          .join("\n")
      : "";
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          country: data.get("country"),
          phone: data.get("phone") || "",
          requirements:
            requirements +
            (details ? "\n\nCustom requirements:\n" + details : ""),
          consent: data.get("consent") === "on",
          website: data.get("website") || "",
          startedAt,
          items: items.map(({ key: _key, ...item }) => item),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.message || "The enquiry could not be sent. Please try again.",
        );
      setState("success");
      setMessage(result.message);
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Connection unavailable. Your enquiry has not been sent.",
      );
    }
  }
  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="form-title">
        <p className="eyebrow">BUSINESS ENQUIRY</p>
        <h2>
          {custom
            ? "Tell us what you have in mind."
            : "Let’s discuss your requirements."}
        </h2>
        <p>Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        {[
          ["name", "Your name", "text"],
          ["company", "Company name", "text"],
          ["email", "Business email", "email"],
          ["country", "Country", "text"],
          ["phone", "Phone (optional)", "tel"],
        ].map(([name, label, type]) => (
          <label key={name}>
            {label}
            {name !== "phone" && " *"}
            <input
              name={name}
              type={type}
              required={name !== "phone"}
              minLength={name === "phone" ? undefined : 2}
              maxLength={
                name === "email"
                  ? 254
                  : name === "phone"
                    ? 50
                    : name === "company"
                      ? 160
                      : 100
              }
              autoComplete={
                name === "name"
                  ? "name"
                  : name === "company"
                    ? "organization"
                    : name === "phone"
                      ? "tel"
                      : name === "country"
                        ? "country-name"
                        : "email"
              }
            />
          </label>
        ))}
        {custom &&
          ["Branding", "Colours", "Sizing", "Packaging", "Quantity"].map(
            (k) => (
              <label key={k}>
                {k} preferences
                <input
                  name={k}
                  maxLength={300}
                  placeholder={
                    k === "Quantity"
                      ? "Indicative bulk quantity"
                      : "Optional — tell us your preference"
                  }
                />
              </label>
            ),
          )}
      </div>
      <label>
        Requirements *
        <textarea
          name="requirements"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Products, quantities, preferred specifications, destination and any questions…"
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="selected-summary">
        {items.length
          ? `${items.length} product variant${items.length === 1 ? "" : "s"} from your quotation basket will be included.`
          : "No basket selection? Describe the products you need above."}{" "}
        <Link href="/quote/">Review selection ↗</Link>
      </p>
      <label className="consent">
        <input type="checkbox" name="consent" required />{" "}
        <span>
          I have read the <Link href="/privacy/">draft privacy notice</Link> and
          agree to be contacted about this enquiry. *
        </span>
      </label>
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending enquiry…" : "Submit enquiry"}
        <ArrowUpRight size={18} />
      </button>
      {message && (
        <div
          role={state === "error" ? "alert" : "status"}
          className={`form-feedback ${state}`}
        >
          {state === "error" ? (
            <AlertCircle size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}
          <span>{message}</span>
        </div>
      )}
      {company.sampleCatalogue && (
        <p className="small muted">
          Development mode: email delivery must be configured before enquiries
          can be sent. An unconfigured submission will report an error.
        </p>
      )}
    </form>
  );
}
