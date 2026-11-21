/**
 * ============================================================================
 * PORTFOLIO CONFIGURATION — EDIT THIS SINGLE FILE TO PERSONALIZE YOUR SITE
 * ============================================================================
 *
 * Replace the placeholder values below with your own personal information,
 * skills, project descriptions, and social media links.
 *
 * Tip: You can also click "Customize Template" in the website footer to edit
 * these fields live in your browser and copy the generated TypeScript code
 * straight back into this file.
 */

export type SkillIconKey =
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'design'
  | 'node'
  | 'python'
  | 'database'
  | 'sql'
  | 'api'
  | 'ai'
  | 'ml'
  | 'nlp'
  | 'tensorflow'
  | 'data';

export type ProjectCategory = 'AI & ML' | 'Full-Stack' | 'Computer Vision';

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  icon: SkillIconKey;
}

export interface SkillCategory {
  id: 'frontend' | 'backend' | 'aiml';
  indexLabel: string;
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  details: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface HighlightMetric {
  label: string;
  value: string;
  detail: string;
}

export type ThemePresetId =
  | 'cobalt'
  | 'emerald'
  | 'cinnabar'
  | 'obsidian'
  | 'graphite';

export interface ThemePresetMeta {
  id: ThemePresetId;
  name: string;
  mode: 'Light' | 'Dark';
  description: string;
  swatches: {
    canvas: string;
    surface: string;
    ink: string;
    accent: string;
  };
  cssVars: {
    canvas: string;
    surface: string;
    surfaceSubtle: string;
    track: string;
    ink: string;
    inkMuted: string;
    accent: string;
    accentHover: string;
    accentText: string;
    onAccent: string;
    hairline: string;
    borderStrong: string;
    footerBg: string;
    footerText: string;
    footerMuted: string;
    footerAccent: string;
  };
}

export const THEME_PRESETS: ThemePresetMeta[] = [
  {
    id: 'cobalt',
    name: 'Cobalt Classic',
    mode: 'Light',
    description: 'Crisp off-white canvas with deep navy ink and cobalt blue accents.',
    swatches: {
      canvas: '#F9FBFD',
      surface: '#FFFFFF',
      ink: '#0E2431',
      accent: '#3E6FF4',
    },
    cssVars: {
      canvas: '#F9FBFD',
      surface: '#FFFFFF',
      surfaceSubtle: '#F2F6FB',
      track: '#EAF0F8',
      ink: '#0E2431',
      inkMuted: '#4A6070',
      accent: '#3E6FF4',
      accentHover: '#2B59D9',
      accentText: '#2F5FE0',
      onAccent: '#FFFFFF',
      hairline: '#E2EAF2',
      borderStrong: '#D4E0EC',
      footerBg: '#0E2431',
      footerText: '#E2E8F0',
      footerMuted: '#94A3B8',
      footerAccent: '#7EA3FF',
    },
  },
  {
    id: 'emerald',
    name: 'Nordic Emerald',
    mode: 'Light',
    description: 'Cool alabaster canvas paired with deep pine ink and teal accents.',
    swatches: {
      canvas: '#F7FAF9',
      surface: '#FFFFFF',
      ink: '#0D241E',
      accent: '#0F766E',
    },
    cssVars: {
      canvas: '#F7FAF9',
      surface: '#FFFFFF',
      surfaceSubtle: '#EEF5F2',
      track: '#E2EFE9',
      ink: '#0D241E',
      inkMuted: '#46615A',
      accent: '#0F766E',
      accentHover: '#0B5D57',
      accentText: '#0F766E',
      onAccent: '#FFFFFF',
      hairline: '#DCE8E3',
      borderStrong: '#C5D9D1',
      footerBg: '#0D241E',
      footerText: '#E2ECE9',
      footerMuted: '#94AEA6',
      footerAccent: '#5EEAD4',
    },
  },
  {
    id: 'cinnabar',
    name: 'Editorial Cinnabar',
    mode: 'Light',
    description: 'Monochrome neutral paper surfaces with high-contrast crimson focus.',
    swatches: {
      canvas: '#FAFAFA',
      surface: '#FFFFFF',
      ink: '#141418',
      accent: '#C81E3A',
    },
    cssVars: {
      canvas: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceSubtle: '#F4F4F6',
      track: '#EAEAEF',
      ink: '#141418',
      inkMuted: '#52525E',
      accent: '#C81E3A',
      accentHover: '#A5162E',
      accentText: '#C81E3A',
      onAccent: '#FFFFFF',
      hairline: '#E4E4E9',
      borderStrong: '#D1D1DA',
      footerBg: '#141418',
      footerText: '#ECECEF',
      footerMuted: '#9E9EA9',
      footerAccent: '#FB7185',
    },
  },
  {
    id: 'obsidian',
    name: 'Midnight Cobalt',
    mode: 'Dark',
    description: 'Deep slate navy dark mode with elevated surfaces and luminous cobalt.',
    swatches: {
      canvas: '#0B111A',
      surface: '#111A27',
      ink: '#F1F5F9',
      accent: '#2F63EB',
    },
    cssVars: {
      canvas: '#0B111A',
      surface: '#111A27',
      surfaceSubtle: '#162233',
      track: '#1F2E45',
      ink: '#F1F5F9',
      inkMuted: '#9FB0C4',
      accent: '#2F63EB',
      accentHover: '#2452CC',
      accentText: '#7EA3FF',
      onAccent: '#FFFFFF',
      hairline: '#1F2D42',
      borderStrong: '#2E415E',
      footerBg: '#070B11',
      footerText: '#E2E8F0',
      footerMuted: '#94A3B8',
      footerAccent: '#7EA3FF',
    },
  },
  {
    id: 'graphite',
    name: 'Graphite & Ochre',
    mode: 'Dark',
    description: 'Architectural dark graphite surfaces paired with warm ochre gold.',
    swatches: {
      canvas: '#101114',
      surface: '#17191E',
      ink: '#F4F4F6',
      accent: '#EAB308',
    },
    cssVars: {
      canvas: '#101114',
      surface: '#17191E',
      surfaceSubtle: '#1E2128',
      track: '#282C36',
      ink: '#F4F4F6',
      inkMuted: '#A3A7B3',
      accent: '#EAB308',
      accentHover: '#CA9A04',
      accentText: '#FACC15',
      onAccent: '#101114',
      hairline: '#252831',
      borderStrong: '#363B48',
      footerBg: '#090A0C',
      footerText: '#E4E4E7',
      footerMuted: '#A1A1AA',
      footerAccent: '#FACC15',
    },
  },
];

export interface PortfolioThemeConfig {
  /** Active preset from THEME_PRESETS ('cobalt' | 'emerald' | 'cinnabar' | 'obsidian' | 'graphite') */
  preset: ThemePresetId;
  /** Optional custom hex override for --theme-accent (leave empty string "" to use preset default) */
  customAccent?: string;
}

export interface PortfolioConfig {
  theme: PortfolioThemeConfig;
  personal: {
    /** Full name shown in the navigation bar, footer, and page title */
    fullName: string;
    /** First name or nickname highlighted in the hero headline ("Hi, I'm ...") */
    shortName: string;
    /** Primary role/title shown in the hero headline */
    role: string;
    /** Short one-line tagline shown in the hero & footer */
    tagline: string;
    /** Your city / country */
    location: string;
    /** Degree, university, or current title */
    education: string;
    /** Core specialization summary */
    specialization: string;
    /** Availability text (e.g., "Open to Full-Time & Freelance Roles") */
    availability: string;
    /** Your public contact email */
    email: string;
    /** Optional link to your hosted resume PDF (leave empty string "" to hide) */
    resumeUrl: string;
    /** Hero portrait image path (replace with "/your-photo.jpg" in /public) */
    heroImage: string;
    /** About section workspace or second photo path */
    aboutImage: string;
    /** Bio paragraphs rendered in the About section */
    aboutParagraphs: string[];
  };
  /** 4 concise proof points shown in a clean row directly beneath the Hero */
  highlights: HighlightMetric[];
  social: {
    linkedin: string;
    github: string;
    twitter: string;
    email: string;
  };
  skillsSection: {
    subtitle: string;
    description: string;
    pillars: string[];
    categories: SkillCategory[];
  };
  projectsSection: {
    subtitle: string;
    description: string;
    pillars: string[];
    projects: ProjectItem[];
  };
  contactSection: {
    subtitle: string;
    description: string;
    /**
     * Create a free form at https://formspree.io and paste your endpoint below,
     * e.g. "https://formspree.io/f/yourFormId".
     * While left as the placeholder, the form runs in local preview mode.
     */
    formspreeEndpoint: string;
    successTitle: string;
    successMessage: string;
  };
  footer: {
    techStack: string[];
  };
}

export const DEFAULT_PORTFOLIO_CONFIG: PortfolioConfig = {
  theme: {
    preset: 'cobalt',
    customAccent: '',
  },
  personal: {
    fullName: 'Pratik Kumar Jena',
    shortName: 'Pratik',
    role: 'AI/ML Engineer & Full-Stack Developer',
    tagline: 'Building intelligent web applications and scalable software systems.',
    location: 'Your City, Country',
    education: 'B.Tech in Computer Science (Update in config)',
    specialization: 'Full-Stack Web & Applied AI',
    availability: 'Open to Software Engineering Opportunities',
    email: 'your.email@example.com',
    resumeUrl: '',
    heroImage: '/assets/aistudio/image_0ff103f2.png',
    aboutImage: '/src/assets/images/about_workspace_editorial_1795074341412.jpg',
    aboutParagraphs: [
      'I am a Computer Science undergraduate and software developer with hands-on experience in full-stack web development and applied artificial intelligence. Replace this paragraph in src/config/portfolioConfig.ts with your own story, background, and technical strengths.',
      'My recent work spans AI-powered products such as voice-enabled assistants, document OCR scanners, and sentiment analysis dashboards alongside responsive React, TypeScript, Node.js, and Python backend architectures.',
      'I enjoy collaborating with product-focused engineering teams where clean software architecture meets practical real-world problem solving.',
    ],
  },

  highlights: [
    {
      label: 'Featured Projects',
      value: '06+',
      detail: 'End-to-end web & AI applications',
    },
    {
      label: 'Core Disciplines',
      value: '03',
      detail: 'Frontend, Backend, and Applied AI',
    },
    {
      label: 'Primary Stack',
      value: 'React · Python',
      detail: 'TypeScript, Node.js, FastAPI, SQL',
    },
    {
      label: 'Current Focus',
      value: 'Open to Work',
      detail: 'Internships, full-time & freelance',
    },
  ],

  social: {
    linkedin: 'https://www.linkedin.com/in/your-linkedin-username',
    github: 'https://github.com/your-github-username',
    twitter: 'https://x.com/your-handle',
    email: 'mailto:your.email@example.com',
  },

  skillsSection: {
    subtitle: 'Professional Skills',
    description:
      'Proficient across the full software development lifecycle from architecture to production deployment. Update these skill names and proficiency levels inside src/config/portfolioConfig.ts.',
    pillars: ['Clean Architecture', 'Scalable Systems', 'Performance Focused'],
    categories: [
      {
        id: 'frontend',
        indexLabel: '01',
        title: 'Frontend Development',
        caption: 'Responsive interfaces, accessible design systems, and modern React architectures.',
        image: '/src/assets/images/skills_frontend_visual_1795074340636.jpg',
        imageAlt: 'Frontend interface architecture workspace',
        skills: [
          { name: 'HTML5 & Semantic Markup', level: 90, icon: 'html' },
          { name: 'CSS3 & Tailwind CSS', level: 85, icon: 'css' },
          { name: 'JavaScript (ES6+) / TypeScript', level: 82, icon: 'javascript' },
          { name: 'React & Component Architecture', level: 78, icon: 'react' },
          { name: 'UI/UX & Responsive Design', level: 75, icon: 'design' },
        ],
      },
      {
        id: 'backend',
        indexLabel: '02',
        title: 'Backend & Databases',
        caption: 'Reliable REST APIs, authentication pipelines, and relational/NoSQL data modeling.',
        image: '/src/assets/images/skills_backend_visual_1795074341149.jpg',
        imageAlt: 'Backend server and modular database architecture',
        skills: [
          { name: 'Node.js & Express', level: 78, icon: 'node' },
          { name: 'Python & FastAPI', level: 82, icon: 'python' },
          { name: 'MongoDB & Document Stores', level: 72, icon: 'database' },
          { name: 'SQL & PostgreSQL', level: 75, icon: 'sql' },
          { name: 'REST API Design', level: 80, icon: 'api' },
        ],
      },
      {
        id: 'aiml',
        indexLabel: '03',
        title: 'AI & Machine Learning',
        caption: 'Applied NLP, computer vision pipelines, data analysis, and model integration.',
        image: '/src/assets/images/skills_aiml_visual_1795074339917.jpg',
        imageAlt: 'Neural network geometry and optical data visualization',
        skills: [
          { name: 'Applied Artificial Intelligence', level: 72, icon: 'ai' },
          { name: 'Machine Learning', level: 68, icon: 'ml' },
          { name: 'Natural Language Processing', level: 65, icon: 'nlp' },
          { name: 'TensorFlow & Model Serving', level: 62, icon: 'tensorflow' },
          { name: 'Pandas & Data Processing', level: 76, icon: 'data' },
        ],
      },
    ],
  },

  projectsSection: {
    subtitle: 'Selected Projects',
    description:
      'A curated collection of placeholder projects based on the original portfolio template. Replace the titles, descriptions, tech stacks, and GitHub/Live URLs with your own work.',
    pillars: ['AI-Powered', 'Insightful', 'Production Ready'],
    projects: [
      {
        id: 'voice-assistant',
        title: 'AI Powered Voice Assistant',
        category: 'AI & ML',
        year: '2026',
        summary:
          'A voice-enabled personal assistant powered by NLP and speech recognition, capable of executing tasks, answering questions, and integrating with external APIs.',
        details:
          'Designed with a low-latency Python FastAPI backend and a clean browser interface, this project converts real-time speech into structured commands, performs intent classification, and returns natural spoken responses.',
        highlights: [
          'Real-time speech-to-text capture and intent routing',
          'Modular plugin design for weather, calendar, and search APIs',
          'Responsive web frontend with live transcript history',
        ],
        techStack: ['Python', 'NLP', 'Speech Recognition', 'FastAPI'],
        githubUrl: 'https://github.com/your-github-username/ai-voice-assistant',
        liveUrl: 'https://your-demo-link-1.vercel.app',
      },
      {
        id: 'bill-scanner',
        title: 'Intelligent Bill Scanner',
        category: 'Computer Vision',
        year: '2026',
        summary:
          'An OCR-based expense platform that scans receipts, extracts merchant and line-item data using computer vision, and builds monthly spending analytics.',
        details:
          'Uses OpenCV preprocessing (deskewing, adaptive thresholding) paired with OCR extraction to turn photographed paper receipts into categorized, exportable expense records.',
        highlights: [
          'Automated receipt image enhancement and boundary detection',
          'Structured extraction of vendor, date, tax, and totals',
          'Monthly spending breakdown and CSV export support',
        ],
        techStack: ['Python', 'OpenCV', 'Tesseract OCR', 'React'],
        githubUrl: 'https://github.com/your-github-username/intelligent-bill-scanner',
        liveUrl: 'https://your-demo-link-2.vercel.app',
      },
      {
        id: 'sentiment-analysis',
        title: 'Customer Sentiment Analyzer',
        category: 'AI & ML',
        year: '2025',
        summary:
          'An analytics dashboard that classifies customer reviews and support tickets into actionable sentiment trends, topic clusters, and priority alerts.',
        details:
          'Processes bulk CSV uploads or live feedback text using transformer-based NLP classification, visualizing positive, neutral, and negative momentum over time.',
        highlights: [
          'Batch CSV processing with confidence score breakdown',
          'Keyword and topic extraction for root-cause discovery',
          'Clean executive summary view for product teams',
        ],
        techStack: ['Python', 'Scikit-Learn', 'Pandas', 'React'],
        githubUrl: 'https://github.com/your-github-username/sentiment-analyzer',
        liveUrl: 'https://your-demo-link-3.vercel.app',
      },
      {
        id: 'smart-study-hub',
        title: 'Developer Task & Notes Workspace',
        category: 'Full-Stack',
        year: '2025',
        summary:
          'A minimalist full-stack productivity workspace combining markdown technical notes, sprint task boards, and instant keyboard-first search.',
        details:
          'Built for engineering students and solo developers to organize project specs, track daily milestones, and search across code snippets with minimal friction.',
        highlights: [
          'Fast markdown editor with live preview and syntax highlighting',
          'Filterable sprint task columns with keyboard shortcuts',
          'Responsive layout optimized for both desktop and mobile screens',
        ],
        techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        githubUrl: 'https://github.com/your-github-username/developer-workspace',
        liveUrl: 'https://your-demo-link-4.vercel.app',
      },
      {
        id: 'medical-management',
        title: 'Medical Management System',
        category: 'Full-Stack',
        year: '2025',
        summary:
          'A comprehensive healthcare management platform featuring patient records, appointment scheduling, and an operational dashboard for clinics.',
        details:
          'Provides role-separated views for doctors and administrative staff, enforcing clean validation, structured patient history timelines, and appointment conflict prevention.',
        highlights: [
          'Role-based dashboards for doctors, receptionists, and patients',
          'Interactive appointment scheduling with slot availability checks',
          'Structured medical history and prescription records',
        ],
        techStack: ['MERN Stack', 'MongoDB', 'React', 'Node.js'],
        githubUrl: 'https://github.com/your-github-username/medical-management-system',
        liveUrl: 'https://your-demo-link-5.vercel.app',
      },
      {
        id: 'ecommerce-platform',
        title: 'Full-Stack E-Commerce Platform',
        category: 'Full-Stack',
        year: '2025',
        summary:
          'A modern storefront with catalog filtering, user authentication, persistent shopping cart, checkout integration, and an inventory admin portal.',
        details:
          'Architected with reusable UI primitives, clean API separation, and responsive mobile checkout flows designed for fast page loads and clear conversion paths.',
        highlights: [
          'Category and price filtering with instant client-side transitions',
          'Persistent cart state and multi-step checkout validation',
          'Admin dashboard for product catalog and order tracking',
        ],
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        githubUrl: 'https://github.com/your-github-username/ecommerce-platform',
        liveUrl: 'https://your-demo-link-6.vercel.app',
      },
    ],
  },

  contactSection: {
    subtitle: "Let's Work Together",
    description:
      "I'm open to discussing new opportunities, collaborations, and engineering projects. Have a project in mind or want to connect? Send a message below.",
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORMSPREE_ID',
    successTitle: 'Message Sent Successfully',
    successMessage:
      "Thank you for reaching out. I've received your message and will get back to you within 24 hours.",
  },

  footer: {
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
};

/**
 * Adjusts a hex color brightness by a percentage (-100 to 100) for hover states.
 */
function adjustHexBrightness(hex: string, percent: number): string {
  const clean = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return hex;
  const num = parseInt(clean, 16);
  const delta = Math.round(2.55 * percent);
  const r = Math.max(0, Math.min(255, (num >> 16) + delta));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + delta));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + delta));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

/**
 * Computes legible foreground text color (#FFFFFF or #0E1726) for a given accent hex.
 */
function getReadableOnAccent(hex: string): string {
  const clean = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return '#FFFFFF';
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return luminance > 0.42 ? '#101114' : '#FFFFFF';
}

export function resolveThemeCssVars(theme: PortfolioThemeConfig) {
  const presetMeta =
    THEME_PRESETS.find((item) => item.id === theme.preset) || THEME_PRESETS[0];
  const base = { ...presetMeta.cssVars };
  const custom = theme.customAccent?.trim();

  if (custom && /^#[0-9a-fA-F]{6}$/.test(custom)) {
    base.accent = custom.toUpperCase();
    base.accentHover = adjustHexBrightness(custom, -12);
    base.accentText =
      presetMeta.mode === 'Dark' ? adjustHexBrightness(custom, 22) : custom.toUpperCase();
    base.onAccent = getReadableOnAccent(custom);
    base.footerAccent = adjustHexBrightness(custom, 24);
  }

  return { presetMeta, vars: base };
}

/**
 * Applies the selected theme by setting data-theme on <html> and updating
 * the --theme-* CSS variables defined in src/index.css.
 */
export function applyPortfolioTheme(theme: PortfolioThemeConfig): void {
  const root = document.documentElement;
  const { presetMeta, vars } = resolveThemeCssVars(theme);

  root.setAttribute('data-theme', presetMeta.id);

  const cssEntries: Record<string, string> = {
    '--theme-canvas': vars.canvas,
    '--theme-surface': vars.surface,
    '--theme-surface-subtle': vars.surfaceSubtle,
    '--theme-track': vars.track,
    '--theme-ink': vars.ink,
    '--theme-ink-muted': vars.inkMuted,
    '--theme-accent': vars.accent,
    '--theme-accent-hover': vars.accentHover,
    '--theme-accent-text': vars.accentText,
    '--theme-on-accent': vars.onAccent,
    '--theme-hairline': vars.hairline,
    '--theme-border-strong': vars.borderStrong,
    '--theme-footer-bg': vars.footerBg,
    '--theme-footer-text': vars.footerText,
    '--theme-footer-muted': vars.footerMuted,
    '--theme-footer-accent': vars.footerAccent,
  };

  Object.entries(cssEntries).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
}

/**
 * Generates a ready-to-paste :root CSS variable block for src/index.css.
 */
export function generateThemeCssSnippet(theme: PortfolioThemeConfig): string {
  const { presetMeta, vars } = resolveThemeCssVars(theme);
  return `/* Active Theme: ${presetMeta.name} (${presetMeta.mode}) — paste into :root in src/index.css */
:root {
  --theme-canvas: ${vars.canvas};
  --theme-surface: ${vars.surface};
  --theme-surface-subtle: ${vars.surfaceSubtle};
  --theme-track: ${vars.track};
  --theme-ink: ${vars.ink};
  --theme-ink-muted: ${vars.inkMuted};
  --theme-accent: ${vars.accent};
  --theme-accent-hover: ${vars.accentHover};
  --theme-accent-text: ${vars.accentText};
  --theme-on-accent: ${vars.onAccent};
  --theme-hairline: ${vars.hairline};
  --theme-border-strong: ${vars.borderStrong};
  --theme-footer-bg: ${vars.footerBg};
  --theme-footer-text: ${vars.footerText};
  --theme-footer-muted: ${vars.footerMuted};
  --theme-footer-accent: ${vars.footerAccent};
}
`;
}

/**
 * Generates a formatted TypeScript config file that users can copy directly
 * into src/config/portfolioConfig.ts after customizing values in the UI.
 */
export function generatePortfolioConfigSnippet(config: PortfolioConfig): string {
  return `// Paste this object into DEFAULT_PORTFOLIO_CONFIG in src/config/portfolioConfig.ts\nexport const DEFAULT_PORTFOLIO_CONFIG = ${JSON.stringify(
    config,
    null,
    2
  )};\n`;
}

