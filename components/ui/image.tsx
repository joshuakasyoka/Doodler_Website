import { cva, type VariantProps } from "class-variance-authority";
import NextImage from "next/image";
import type { Image as ImageData } from "@/lib/content";

const image = cva("", {
  variants: {
    layout: {
      /** sized by its own width/height, scaling down to its container */
      intrinsic: "h-auto w-full",
      /** fills a positioned parent */
      fill: "",
      /** a small photo on a white mount with a soft shadow (the manifest pages) */
      polaroid: "aspect-polaroid w-polaroid max-w-full rounded-sm bg-surface shadow-photo",
      /** partner logos, sized by height */
      "logo-sm": "h-partner-sm w-auto max-w-full md:h-partner-sm-lg",
      "logo-md": "h-partner-md w-auto max-w-full md:h-partner-md-lg",
      "logo-lg": "h-partner-lg w-auto max-w-full md:h-partner-lg-lg",
    },
    fit: { cover: "object-cover", contain: "object-contain" },
    radius: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-pill",
      bottom: "rounded-b-md",
    },
    tone: { default: "", ink: "brightness-0", placeholder: "opacity-0" },
  },
  defaultVariants: { layout: "intrinsic", fit: "cover", radius: "none", tone: "default" },
});

const placeholderBox = cva("block bg-placeholder", {
  variants: {
    layout: {
      intrinsic: "w-full",
      polaroid: "",
      fill: "absolute inset-0",
      "logo-sm": "",
      "logo-md": "",
      "logo-lg": "",
    },
    radius: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-pill",
      bottom: "rounded-b-md",
    },
  },
});

type ImageProps = Omit<VariantProps<typeof image>, "tone"> & {
  image: ImageData;
  /** How wide the image renders at each breakpoint, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes: string;
  /** Only for the page's largest above-the-fold image (LCP). */
  priority?: boolean;
  /** "portrait" re-encodes at a higher quality, so faces stay crisp. */
  quality?: "default" | "portrait";
  /** Render in the text colour (logos). */
  ink?: boolean;
  /** Site-wide photosHidden setting, passed down from the page. */
  photosHidden?: boolean;
};

/** Every image on the site: next/image with reserved dimensions, AVIF/WebP and a blur placeholder. */
export function Image({ image: img, sizes, priority, ink, photosHidden, layout, fit, radius, quality }: ImageProps) {
  const placeholder = photosHidden && img.hideable;
  const tone = placeholder ? "placeholder" : ink ? "ink" : "default";
  const className = image({ layout, fit, radius, tone });
  const common = {
    src: img.src,
    alt: img.decorative ? "" : img.alt,
    sizes,
    className,
    quality: quality === "portrait" ? 90 : 75,
    preload: priority,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : undefined,
    // the LCP image paints in the first frame instead of waiting behind hydration
    decoding: priority ? ("sync" as const) : ("async" as const),
    placeholder:
      img.blurDataURL && !placeholder && !ink && !priority ? ("blur" as const) : ("empty" as const),
    blurDataURL: img.blurDataURL,
  };
  const element =
    layout === "fill" ? (
      <NextImage {...common} fill />
    ) : (
      <NextImage {...common} width={img.width} height={img.height} />
    );
  // photosHidden: keep the space and the alt text, show a grey block instead of the photo
  if (placeholder) return <span className={placeholderBox({ layout, radius })}>{element}</span>;
  return element;
}
