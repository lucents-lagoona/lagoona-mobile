import type { Config } from "tailwindcss";

import base from "./base";

export default {
  content: base.content,
  presets: [base],
  theme: {
    extend: {
      fontFamily: {
        "sans-regular": ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
        "sans-extra-bold": ["Inter_800ExtraBold"],
        "sans-black": ["Inter_900Black"],
        "serif-regular": ["Lora_400Regular"],
        "serif-medium": ["Lora_500Medium"],
        "serif-semibold": ["Lora_600SemiBold"],
        "serif-bold": ["Lora_700Bold"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        beige: {
          DEFAULT: "hsl(var(--beige))",
          foreground: "hsl(var(--beige-foreground))",
          "50": "hsl(var(--beige-50))",
          "100": "hsl(var(--beige-100))",
          "200": "hsl(var(--beige-200))",
          "300": "hsl(var(--beige-300))",
          "400": "hsl(var(--beige-400))",
          "500": "hsl(var(--beige-500))",
          "600": "hsl(var(--beige-600))",
          "700": "hsl(var(--beige-700))",
          "800": "hsl(var(--beige-800))",
          "900": "hsl(var(--beige-900))",
          "950": "hsl(var(--beige-950))",
        },
      },
    },
  },
} satisfies Config;
