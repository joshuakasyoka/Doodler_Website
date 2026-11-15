/**
 * POST /api/webhooks/payments — the server-side extension point.
 *
 * The one Route Handler on an otherwise static site, and the pattern for any
 * future server work (payments, form submissions, CRM webhooks):
 *   1. read the raw request,
 *   2. hand it to a provider from lib/services (never a vendor SDK directly),
 *   3. answer with a status the sender understands.
 *
 * Until the payments provider is configured it answers 501 Not Implemented.
 * Runs on the default Node.js runtime; nothing Vercel-specific.
 */
import { getPayments, ServiceNotConfiguredError } from "@/lib/services";

export async function POST(request: Request): Promise<Response> {
  const payments = getPayments();
  if (!payments.isConfigured()) {
    return Response.json({ error: `${payments.name} is not configured` }, { status: 501 });
  }
  try {
    const event = await payments.parseWebhook(await request.text(), request.headers.get("stripe-signature"));
    // TODO(integration): act on the event (provision seats, send receipts…)
    return Response.json({ received: true, type: event.type });
  } catch (error) {
    if (error instanceof ServiceNotConfiguredError)
      return Response.json({ error: error.message }, { status: 501 });
    return Response.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
