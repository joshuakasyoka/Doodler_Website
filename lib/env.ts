import { z } from "zod";

/**
 * Typed, validated environment. Imported by next.config.ts, so a bad value
 * fails `next build` immediately. Every variable is documented in .env.example.
 */
const schema = z.object({
  /** Canonical origin, used for canonical URLs, sitemap and OG tags. */
  NEXT_PUBLIC_SITE_URL: z.url().default("https://doodler.app"),
  /** Optional image CDN base URL; when set, next/image uses lib/images/loader.ts. */
  NEXT_PUBLIC_IMAGE_CDN_URL: z.url().optional(),
  /** Analytics provider id (slot only; nothing loads until consent is given). */
  NEXT_PUBLIC_ANALYTICS_ID: z.string().min(1).optional(),
  /** Payments (server only). Stub provider until a real key is configured. */
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").optional(),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NEXT_PUBLIC_IMAGE_CDN_URL: process.env.NEXT_PUBLIC_IMAGE_CDN_URL || undefined,
  NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || undefined,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || undefined,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || undefined,
});

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
  throw new Error(`Invalid environment variables:\n${issues}\nSee .env.example.`);
}

export const env = parsed.data;
