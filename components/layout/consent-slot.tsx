import { env } from "@/lib/env";

/**
 * Extension point: analytics and cookie consent.
 *
 * Nothing renders today. To add analytics:
 *   1. pick a provider and set NEXT_PUBLIC_ANALYTICS_ID (.env.example),
 *   2. render a consent banner here (a small client component),
 *   3. load the provider's script with next/script ONLY after consent.
 * The original site had no tracking, so no banner is needed until then.
 */
export function ConsentSlot() {
  if (!env.NEXT_PUBLIC_ANALYTICS_ID) return null;
  return null; // TODO(integration): consent banner + analytics loader
}
