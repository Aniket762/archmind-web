export interface Branding {
  appName: string;
  appTagline: string;
  appDescription: string;
  logoText: string;
  company: string;
  logoIcon: string| null,
  supportEmail: string;
  twitter: string;
  github: string;
  linkedin: string;
  favicon: string;
}

export const branding: Branding = {
  appName: "ArchMind",
  appTagline: "Master System Design with ArchMind",
  appDescription:"The premier AI-powered platform for practicing system design interviews. Get rubric-based feedback from an AI coach training in-progress",
  logoText: "AM",
  logoIcon: null, 
  company: "ArchDesign Inc.",
  supportEmail: "",
  twitter: "",
  github: "",
  linkedin: "",
  favicon: "/favicon.ico",
} as const;