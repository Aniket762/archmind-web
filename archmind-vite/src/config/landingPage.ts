import type { Level } from '@/types';

export interface HeroStat { value: string; label: string }
export interface Feature  { icon: string; title: string; description: string }
export interface ShowcaseProblem { title: string; level: Level; companies: string[]; solvedBy: number }
export interface Testimonial { name: string; role: string; avatar: string; text: string }
export interface FooterColumn { heading: string; items: string[] }

export const landingPage = {
  hero: {
    badge: 'AI-Powered Interview Prep',
    headline: 'Ace Every System Design Interview',
    subheadline:
      'Practice with real FAANG-level problems. Get instant AI feedback. Track your progress. Land the offer.',
    cta: { primary: 'Start Practicing Free', secondary: 'View Problems' },
    stats: [
      { value: '500+', label: 'Design Problems' },
      { value: '50K+', label: 'Engineers Trained' },
      { value: '94%',  label: 'Interview Success Rate' },
      { value: '200+', label: 'Companies Covered' },
    ] satisfies HeroStat[],
  },

  features: [
    { icon: '🧠', title: 'AI-Powered Evaluation',    description: 'Our AI scores your design against industry-standard rubrics used at top tech companies.' },
    { icon: '📊', title: 'Detailed Rubric Scoring',  description: 'Get granular feedback on scalability, reliability, API design, data modeling, and more.' },
    { icon: '🏗️', title: 'Real-World Problems',      description: 'Design URL shorteners, notification services, distributed caches, and more.' },
    { icon: '📈', title: 'Progress Analytics',       description: 'Track improvement with detailed analytics and personalised recommendations.' },
    { icon: '💬', title: 'Community Discussions',    description: 'Learn from expert solutions and discuss approaches with fellow engineers.' },
    { icon: '🎯', title: 'Company-Specific Prep',    description: 'Filter problems by company and practice the exact systems they build.' },
  ] satisfies Feature[],

  problems: [
    { title: 'Design Twitter',               level: 'HARD',   companies: ['Twitter/X', 'Meta'],    solvedBy: 12400 },
    { title: 'Design URL Shortener',         level: 'EASY',   companies: ['Google', 'Amazon'],      solvedBy: 45000 },
    { title: 'Design a Distributed Cache',   level: 'HARD',   companies: ['Netflix', 'Uber'],       solvedBy: 8200  },
    { title: 'Design Uber',                  level: 'HARD',   companies: ['Uber', 'Lyft'],          solvedBy: 18700 },
  ] satisfies ShowcaseProblem[],

  testimonials: [
    { name: 'Priya S.',  role: 'SWE @ Google',         avatar: 'P', text: "ArchMind's AI feedback was more detailed than any mock interview I had. Got my offer in 6 weeks." },
    { name: 'Marcus T.', role: 'Staff Engineer @ Meta', avatar: 'M', text: 'The rubric-based scoring showed me exactly what I was missing. Game changer for system design prep.' },
    { name: 'Lin C.',    role: 'Senior SWE @ Amazon',  avatar: 'L', text: 'I practiced 30 problems here before my loop. The AI caught gaps in my thinking I never noticed.' },
  ] satisfies Testimonial[],

  footer: {
    links: [
      { heading: 'Product',   items: ['Problems', 'Analytics', 'AI Feedback', 'Pricing'] },
      { heading: 'Resources', items: ['Blog', 'Cheat Sheets', 'Roadmap', 'Changelog'] },
      { heading: 'Company',   items: ['About', 'Careers', 'Privacy', 'Terms'] },
    ] satisfies FooterColumn[],
  },
} as const;