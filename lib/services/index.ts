/**
 * Service registry: one accessor per integration. Add new providers here
 * (README → "Adding an integration").
 */
export { getPayments } from "./payments";
export type { CheckoutRequest, CheckoutSession, PaymentEvent, PaymentsProvider } from "./payments";
export { ServiceNotConfiguredError, type ServiceProvider } from "./types";
