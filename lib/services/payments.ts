import "server-only";
import { env } from "@/lib/env";
import { ServiceNotConfiguredError, type ServiceProvider } from "./types";

/**
 * Payments: a placeholder designed with Stripe in mind (Checkout Sessions +
 * signed webhooks), but expressed in our own types so the vendor can change.
 * Nothing here is implemented yet; see README → "Adding an integration".
 */

export type CheckoutRequest = {
  /** The vendor's price id for a plan in content/pages/prijzen.ts. */
  priceId: string;
  /** Seats, e.g. behandelaren on the Standaard plan. */
  quantity: number;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutSession = { id: string; url: string };

export type PaymentEvent =
  | { type: "checkout.completed"; sessionId: string; customerEmail?: string }
  | { type: "subscription.updated"; subscriptionId: string; status: string }
  | { type: "subscription.cancelled"; subscriptionId: string }
  | { type: "unhandled"; vendorType: string };

export interface PaymentsProvider extends ServiceProvider {
  createCheckoutSession(request: CheckoutRequest): Promise<CheckoutSession>;
  /** Verify the signature on a raw webhook body and map it to a PaymentEvent. */
  parseWebhook(rawBody: string, signature: string | null): Promise<PaymentEvent>;
}

/** Stripe-shaped stub. Replace the method bodies with the Stripe SDK when payments go live. */
class StripePayments implements PaymentsProvider {
  readonly name = "Stripe";

  isConfigured() {
    return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET);
  }

  private assertConfigured() {
    if (!this.isConfigured())
      throw new ServiceNotConfiguredError(this.name, ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"]);
  }

  async createCheckoutSession(request: CheckoutRequest): Promise<CheckoutSession> {
    this.assertConfigured();
    // TODO(integration): stripe.checkout.sessions.create({ mode: "subscription", line_items: [{ price: request.priceId, quantity: request.quantity }], … })
    void request;
    throw new Error("Payments are not implemented yet.");
  }

  async parseWebhook(rawBody: string, signature: string | null): Promise<PaymentEvent> {
    this.assertConfigured();
    // TODO(integration): stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET), then map the event type
    void rawBody;
    void signature;
    throw new Error("Payments are not implemented yet.");
  }
}

let provider: PaymentsProvider | undefined;

/** The active payments provider (a single instance per server). */
export function getPayments(): PaymentsProvider {
  provider ??= new StripePayments();
  return provider;
}
