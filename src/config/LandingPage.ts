export interface StatItem {
  value: string;
  label: string;
}

export interface HeroConfig {
  badge: string;
  headline: string;
  subheadline: string;
  cta: {
    primary: string;
    secondary: string;
  };
  stats: StatItem[];
}

export interface FeatureItem {
  icon: string; 
  title: string;
  description: string;
}

export interface ProblemItem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  solvedBy: number;
}

export interface TestimonialItem {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

export interface FooterLinkGroup {
  heading: string;
  items: string[];
}

export interface LandingPageConfig {
  hero: HeroConfig;
  features: FeatureItem[];
  problems: ProblemItem[];
  testimonials: TestimonialItem[];
  footer: {
    links: FooterLinkGroup[];
  };
}

export const landingPage: LandingPageConfig = {
  hero: {
    badge: "AI-Powered Interview Prep",
    headline: "Ace Every System Design Interview",
    subheadline:
      "Practice with real problems. Get instant AI feedback. Track your progress. Land the offer.",
    cta: { primary: "Start Practicing Free", secondary: "View Problems" },
    stats: [
      { value: "500+", label: "Design Problems" },
      { value: "50K+", label: "Engineers Trained" },
      { value: "94%", label: "Interview Success Rate" },
      { value: "200+", label: "Companies Covered" },
    ],
  },
  features: [
    {
      icon: "🧠",
      title: "AI-Powered Evaluation",
      description:
        "Our AI evaluates your system design against industry-standard rubrics used at top tech companies.",
    },
    {
      icon: "📊",
      title: "Detailed Rubric Scoring",
      description:
        "Get granular feedback on scalability, reliability, API design, data modeling, and more.",
    },
    {
      icon: "🏗️",
      title: "Real-World Problems",
      description:
        "Practice designing systems like URL shorteners, notification services, distributed caches, and more.",
    },
    {
      icon: "📈",
      title: "Progress Analytics",
      description:
        "Track your improvement over time with detailed analytics and personalized recommendations.",
    },
    {
      icon: "💬",
      title: "Community Discussions",
      description:
        "Learn from expert solutions and discuss approaches with a community of engineers.",
    },
    {
      icon: "🎯",
      title: "Company-Specific Prep",
      description:
        "Filter problems by company and practice the exact types of systems they build.",
    },
  ],
  problems: [
    {
      title: "Design Twitter",
      difficulty: "Hard",
      companies: ["Twitter", "Meta"],
      solvedBy: 12400,
    },
    {
      title: "Design URL Shortener",
      difficulty: "Easy",
      companies: ["Google", "Amazon"],
      solvedBy: 45000,
    },
    {
      title: "Design a Distributed Cache",
      difficulty: "Hard",
      companies: ["Netflix", "Uber"],
      solvedBy: 8200,
    },
    {
      title: "Design Uber",
      difficulty: "Hard",
      companies: ["Uber", "Lyft"],
      solvedBy: 18700,
    },
  ],
  testimonials: [
    {
      name: "User 1",
      role: "Company 1",
      avatar: "U1",
      text: "ArchDesign's AI feedback was more detailed than any mock interview I had. Got my offer in 6 weeks.",
    },
    {
      name: "User 2",
      role: "Company 2",
      avatar: "U2",
      text: "The rubric-based scoring showed me exactly what I was missing. Game changer for system design prep.",
    },
    {
      name: "User 3",
      role: "Company 3",
      avatar: "U3",
      text: "I practiced 30 problems here before my loop. The AI caught gaps in my thinking I didn't even notice.",
    },
  ],
  footer: {
    links: [
      {
        heading: "Product",
        items: ["Problems", "Analytics", "AI Feedback", "Pricing"],
      },
      {
        heading: "Resources",
        items: ["Blog", "Cheat Sheets", "Roadmap", "Changelog"],
      },
      {
        heading: "Company",
        items: ["About", "Careers", "Privacy", "Terms"],
      },
    ],
  },
};