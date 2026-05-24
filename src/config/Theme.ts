export interface ThemeConfig {
  defaultMode: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: number;
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  gradients: {
    primary: string;
    hero: string;
    card: string;
  };
}

export const themeConfig:ThemeConfig = {
  defaultMode: "dark",
  primaryColor: "#6C63FF",
  secondaryColor: "#00D4AA",
  accentColor: "#FF6B6B",
  borderRadius: 10,
  fontFamily: {
    heading: "'DM Sans', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  gradients: {
    primary: "linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)",
    hero: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 50%, #16213E 100%)",
    card: "linear-gradient(135deg, rgba(108,99,255,0.1) 0%, rgba(0,212,170,0.05) 100%)",
  },
} as const;