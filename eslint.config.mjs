import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

/** Tailwind arbitrary values (`w-[37px]`, `bg-[#fff]`) — every value must come from styles/tokens.css. */
const arbitraryValue = String.raw`/(^|\s|:)-?[a-z][a-z0-9-]*-\[[^\]]+\]/`;
const noArbitrary = [
  {
    selector: `Literal[value=${arbitraryValue}]`,
    message: "Arbitrary Tailwind value: add a token to styles/tokens.css instead.",
  },
  {
    selector: `TemplateElement[value.raw=${arbitraryValue}]`,
    message: "Arbitrary Tailwind value: add a token to styles/tokens.css instead.",
  },
  {
    selector: "JSXAttribute[name.name='style']",
    message: "No inline styles: use a token-backed utility or a primitive variant.",
  },
];

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      // our <Image> primitive takes an `image` object whose alt the content schema enforces
      "jsx-a11y/alt-text": ["error", { elements: ["img", "object", "area"], img: [] }],
    },
  },
  {
    files: ["components/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
    rules: { "no-restricted-syntax": ["error", ...noArbitrary] },
  },
  {
    // The hero animation computes transforms per frame from its clock; those
    // values are runtime data, not design values. Documented in README.
    files: ["components/ui/prompt-draw/**/*.tsx", "app/**/opengraph-image.tsx", "lib/og.tsx"],
    rules: { "no-restricted-syntax": "off" },
  },
  {
    // Sections compose primitives only.
    files: ["components/sections/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...noArbitrary,
        {
          selector: "JSXOpeningElement[name.name=/^(button|img|a|h[1-6]|svg|video|picture|iframe)$/]",
          message:
            "Sections must use primitives from @/components/ui (Button, Heading, Image, Link, Icon, Video…).",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^(?!@/components/ui(/|$)|@/lib(/|$)|react$|\\./|\\.\\./).*",
              message: "Sections may import only from @/components/ui and @/lib (and their own folder).",
            },
            {
              regex: "^(@/content|(\\.\\./)+content)(/|$)",
              message: "Components never import content: it arrives as props from @/lib/content.",
            },
          ],
        },
      ],
    },
  },
  {
    // UI primitives never reach up into sections or content.
    files: ["components/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/sections", "@/components/sections/*"],
              message: "Primitives must not import sections.",
            },
            { group: ["@/content", "@/content/*"], message: "Components never import content directly." },
          ],
        },
      ],
    },
  },
  {
    files: ["components/layout/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [{ group: ["@/content", "@/content/*"], message: "Read content through @/lib/content." }],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "test-results/**",
    "playwright-report/**",
    "assets-source/**",
  ]),
]);
