"use client";
/* eslint-disable react-hooks/set-state-in-effect -- The product query is read from the browser only after static hydration. */
import { useEffect, useState } from "react";
import { ArrowUpRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { company } from "@/lib/config";
import { fill } from "@/lib/i18n/format";
import { useI18n } from "@/lib/i18n/client";
import { useQuote } from "./quote-provider";

export function EnquiryForm({ custom = false }: { custom?: boolean }) {
  const { items } = useQuote();
  const { t, href } = useI18n();
  const [startedAt] = useState(() => Date.now());
  const [requirements, setRequirements] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const customFields = [
    { name: "Branding", label: t.form.branding },
    { name: "Colours", label: t.form.colours },
    { name: "Sizing", label: t.form.sizing },
    { name: "Packaging", label: t.form.packaging },
    { name: "Quantity", label: t.form.quantityLabel },
  ];
  // Hydrate the product query from the browser after static server rendering.
  useEffect(() => {
    const product = new URLSearchParams(location.search).get("product");
    if (product)
      setRequirements(`${fill(t.form.productPrefill, { product })}\n`);
  }, [t.form.productPrefill]);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const details = custom
      ? customFields
          .map(({ name, label }) => `${label}: ${data.get(name) || t.form.toDiscuss}`)
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
            (details ? `\n\n${t.form.customDetails}:\n` + details : ""),
          consent: data.get("consent") === "on",
          website: data.get("website") || "",
          startedAt,
          items: items.map(({ key: _key, ...item }) => item),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || t.form.genericError);
      setState("success");
      setMessage(result.message);
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : t.form.connectionError,
      );
    }
  }
  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="form-title">
        <p className="eyebrow">{t.form.eyebrow}</p>
        <h2>{custom ? t.form.customTitle : t.form.title}</h2>
        <p>{t.form.requiredNote}</p>
      </div>
      <div className="form-grid">
        {[
          ["name", t.form.name, "text"],
          ["company", t.form.company, "text"],
          ["email", t.form.email, "email"],
          ["country", t.form.country, "text"],
          ["phone", t.form.phone, "tel"],
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
          customFields.map(({ name, label }) => (
            <label key={name}>
              {label} {t.form.preferences}
              <input
                name={name}
                maxLength={300}
                placeholder={
                  name === "Quantity"
                    ? t.form.quantityPlaceholder
                    : t.form.preferencePlaceholder
                }
              />
            </label>
          ))}
      </div>
      <label>
        {t.form.requirements} *
        <textarea
          name="requirements"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder={t.form.requirementsPlaceholder}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          {t.form.honeypot}
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="selected-summary">
        {items.length
          ? fill(
              items.length === 1
                ? t.form.basketSummaryOne
                : t.form.basketSummary,
              { count: items.length },
            )
          : t.form.noBasket}{" "}
        <Link href={href("/quote/")}>{t.form.reviewSelection} ↗</Link>
      </p>
      <label className="consent">
        <input type="checkbox" name="consent" required />{" "}
        <span>
          {t.form.consentBefore}
          <Link href={href("/privacy/")}>{t.form.consentLink}</Link>
          {t.form.consentAfter}
        </span>
      </label>
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? t.form.sending : t.form.submit}
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
        <p className="small muted">{t.form.devNote}</p>
      )}
    </form>
  );
}
