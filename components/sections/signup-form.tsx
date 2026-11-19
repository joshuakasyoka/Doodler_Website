"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SignupFormProps = {
  id: string;
  label: string;
  placeholder: string;
  button: string;
  /** The form (a Typeform) the visitor goes on to: the pilot report download. */
  action: string;
};

/**
 * The banner's email pill: it opens the pilot report form in a new tab with the address passed along as
 * the Typeform hidden field `email` (#email=…), so the visitor doesn't type it twice. Without
 * JavaScript the browser sends it as ?email=… instead.
 */
export function SignupForm({ id, label, placeholder, button, action }: SignupFormProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email")?.toString().trim() ?? "";
    const url = email ? `${action}#email=${encodeURIComponent(email)}` : action;
    // a blocked new tab falls back to this one
    if (!window.open(url, "_blank", "noopener")) window.location.href = url;
  };
  return (
    <form
      action={action}
      method="get"
      target="_blank"
      onSubmit={onSubmit}
      className="mt-2xs flex w-full max-w-signup items-center gap-2xs rounded-field border border-on-media-line p-2xs"
    >
      <Input
        id={id}
        name="email"
        type="email"
        tone="media"
        label={label}
        placeholder={placeholder}
        autoComplete="email"
      />
      <Button type="submit" label={button} variant="light" size="md" scribble={false} />
    </form>
  );
}
