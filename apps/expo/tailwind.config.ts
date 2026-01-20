import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";
import { hairlineWidth } from "nativewind/theme";

import baseConfig from "@acme/tailwind-config/native";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "hsl(var(--dark))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "primary-green": {
          "50": "#f5f8f5",
          "100": "#e7f1e9",
          "200": "#d0e2d2",
          "300": "#abcaaf",
          "400": "#7fa985",
          "500": "#5c8b63",
          "600": "#48714e",
          "700": "#3b5a40",
          "800": "#324936",
          "900": "#2a3d2e",
          "950": "#141f16",
        },
        "primary-gold": {
          "50": "#f8f6ee",
          "100": "#ede8d4",
          "200": "#dcd0ac",
          "300": "#c8b37c",
          "400": "#b79958",
          "500": "#a08047",
          "600": "#906b3e",
          "700": "#745334",
          "800": "#624531",
          "900": "#553b2e",
          "950": "#301f18",
        },
        "secondary-gold": {
          "50": "#fbf9f1",
          "100": "#f6f1de",
          "200": "#ecdfbc",
          "300": "#e6d3a6",
          "400": "#d3ab64",
          "500": "#c99546",
          "600": "#bb803b",
          "700": "#9c6532",
          "800": "#7d512f",
          "900": "#664428",
          "950": "#362214",
        },
        "primary-red": {
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d",
          "950": "#450a0a",
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
} satisfies Config;
