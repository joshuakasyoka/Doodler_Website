import { cva, type VariantProps } from "class-variance-authority";

const input = cva("h-pill w-full min-w-0 flex-1 font-body", {
  variants: {
    tone: {
      default:
        "rounded-sm border border-border bg-surface px-md text-body text-text placeholder:text-text-muted",
      /** on a photo: transparent, white text (the banner's email pill) */
      media: "bg-transparent px-sm text-small text-text-on-media placeholder:text-text-on-media",
    },
  },
  defaultVariants: { tone: "default" },
});

type InputProps = VariantProps<typeof input> & {
  id: string;
  /** Omit to keep the value out of the submitted form. */
  name?: string;
  type: "email" | "text";
  label: string;
  placeholder?: string;
  autoComplete?: string;
};

/** A text field with a visually hidden label. */
export function Input({ id, name, type, label, placeholder, autoComplete, tone }: InputProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={input({ tone })}
      />
    </>
  );
}
