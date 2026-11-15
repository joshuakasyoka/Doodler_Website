/**
 * Integration contract. Every third-party service (payments, forms, CRM,
 * email, analytics…) is wrapped in a provider that implements this, so pages
 * and route handlers depend on the interface, never on a vendor SDK.
 */
export interface ServiceProvider {
  /** Human-readable name, for logs and errors. */
  readonly name: string;
  /** True when the env vars the provider needs are present. */
  isConfigured(): boolean;
}

/** Thrown when a feature is used before its provider is configured. */
export class ServiceNotConfiguredError extends Error {
  override name = "ServiceNotConfiguredError";
  constructor(service: string, missing: string[]) {
    super(`${service} is not configured. Set ${missing.join(", ")} (see .env.example).`);
  }
}
