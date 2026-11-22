import { z } from "zod";
import { products } from "./products";
export type QuoteItem = {
  key: string;
  slug: string;
  colour: string;
  size: string;
  quantity: number;
  notes: string;
};
export const itemSchema = z
  .object({
    slug: z.string().max(100),
    colour: z.string().max(40),
    size: z.string().max(20),
    quantity: z.number().int().min(1).max(100000),
    notes: z.string().max(1000).default(""),
  })
  .superRefine((v, ctx) => {
    const p = products.find((p) => p.slug === v.slug);
    if (!p || !p.colours.includes(v.colour) || !p.sizes.includes(v.size))
      ctx.addIssue({ code: "custom", message: "Invalid product or variant" });
  });
export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(160),
  email: z.email().max(254),
  country: z.string().trim().min(2).max(100),
  phone: z.string().max(50).default(""),
  requirements: z.string().trim().min(10).max(8000),
  items: z.array(itemSchema).max(50).default([]),
  consent: z.literal(true),
  website: z.string().max(0).default(""),
  startedAt: z.number(),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function parseStoredQuote(value: string | null): QuoteItem[] {
  try {
    const raw = JSON.parse(value || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.slice(0, 50).flatMap((v) => {
      const result = itemSchema.safeParse(v);
      return result.success
        ? [
            {
              ...result.data,
              key: `${result.data.slug}|${result.data.colour}|${result.data.size}`,
            },
          ]
        : [];
    });
  } catch {
    return [];
  }
}
