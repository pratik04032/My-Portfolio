/**
 * ============================================================================
 * PORTFOLIO CONFIGURATION — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * Populated from Pratik Kumar Jena's resume. Edit any field below or click
 * "Customize Placeholders & Theme" in the footer to preview changes live.
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

export type ProjectCategory = 'Data Analytics' | 'AI & ML' | 'Computer Vision';

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

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  mode: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  period: string;
  grade: string;
  coursework: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
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
  preset: ThemePresetId;
  customAccent?: string;
}

export interface PortfolioConfig {
  theme: PortfolioThemeConfig;
  personal: {
    fullName: string;
    shortName: string;
    role: string;
    tagline: string;
    location: string;
    education: string;
    specialization: string;
    availability: string;
    email: string;
    phone: string;
    resumeUrl: string;
    heroImage: string;
    aboutImage: string;
    aboutParagraphs: string[];
  };
  highlights: HighlightMetric[];
  social: {
    linkedin: string;
    github: string;
    twitter: string;
    email: string;
    leetcode?: string;
    codechef?: string;
    hackerrank?: string;
  };
  experienceSection: {
    subtitle: string;
    description: string;
    items: ExperienceItem[];
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
  credentialsSection: {
    education: EducationItem[];
    certifications: CertificationItem[];
  };
  contactSection: {
    subtitle: string;
    description: string;
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
    role: 'Frontend Web Developer & AI/ML Engineer',
    tagline:
      'Computer Science (AI & ML) undergraduate crafting responsive web applications, interactive Power BI & Streamlit dashboards, and applied machine learning systems.',
    location: 'Balasore / Bhubaneswar, Odisha, India',
    education: 'B.Tech in Computer Science (AI & ML) — Trident Academy of Technology (CGPA: 7.32)',
    specialization: 'Frontend Web Development, Data Analytics & Applied AI/ML',
    availability: 'B.Tech CSE (AI & ML) · Open to Frontend, Data & AI/ML Roles',
    email: 'pratikkumarjena04@gmail.com',
    phone: '+91 8456053237',
    resumeUrl: '/assets/aistudio/Jena_Pratik_Kumar_e05fdd4a.pdf',
    heroImage: '/assets/aistudio/image_0ff103f2.png',
    aboutImage: '/assets/aistudio/image_0ff103f2.png',
    aboutParagraphs: [
      'I am Pratik Kumar Jena, a B.Tech Computer Science (AI & ML) undergraduate at Trident Academy of Technology, Bhubaneswar (Dec 2022 – May 2026, CGPA 7.32), focused on Frontend Web Development, Data Analytics, and Applied Machine Learning.',
      'Across internships at BLUESTOCK.in and Cognifyz Technologies, I have delivered responsive HTML/CSS/JavaScript interfaces with live API integration, interactive Power BI investment dashboards, and modular C/C++ console software.',
      'My technical projects span financial ETL analytics comparing crypto, oil, and stock markets, global literacy research, forest cover and diamond market ML modeling, and deep-learning aerial object detection using CNNs and YOLOv8.',
    ],
  },

  highlights: [
    {
      label: 'Internships',
      value: '04',
      detail: 'Data Analyst, Power BI, Frontend & C/C++',
    },
    {
      label: 'Projects Built',
      value: '05',
      detail: 'Data Analytics, ML & Computer Vision',
    },
    {
      label: 'Certifications',
      value: '05',
      detail: 'NIELIT, Infosys, Cognitive Classes & HackerRank',
    },
    {
      label: 'Academic CGPA',
      value: '7.32',
      detail: 'B.Tech CSE (AI & ML), 2022–2026',
    },
  ],

  social: {
    linkedin: 'https://www.linkedin.com/in/pratik-kumar-jena-1823b3242/',
    github: 'https://github.com/pratik04032',
    twitter: '',
    email: 'mailto:pratikkumarjena04@gmail.com',
    leetcode: 'https://leetcode.com/u/J1M63OBc03/',
    codechef: 'https://www.codechef.com/dashboard',
    hackerrank: 'https://www.hackerrank.com/profile/guddubhaiya',
  },

  experienceSection: {
    subtitle: 'Work Experience & Internships',
    description:
      'Hands-on industry internships across data analytics, business intelligence visualization, responsive frontend engineering, and core C/C++ programming.',
    items: [
      {
        id: 'bluestock-data-analyst',
        role: 'Data Analyst',
        company: 'BLUESTOCK.in',
        mode: 'Remote (WFH)',
        period: 'April 2026 – May 2026',
        summary:
          'Remote data analytics engagement focused on financial dataset exploration, structured reporting, and actionable market insights.',
        highlights: [
          'Analyzed structured financial datasets to surface trends and performance metrics for decision support.',
          'Applied Python, SQL, and dashboarding workflows to clean, validate, and communicate analytical findings.',
        ],
      },
      {
        id: 'cognifyz-powerbi',
        role: 'Power BI Developer',
        company: 'Cognifyz Technologies',
        mode: 'Work From Home',
        period: 'June 2025 – August 2025',
        summary:
          'Built end-to-end interactive Power BI dashboards and performed statistical exploration on investment behavior datasets.',
        highlights: [
          'Performed data exploration and statistical analysis using Power BI to uncover investment trends and user behavior patterns.',
          'Designed interactive KPI dashboards with dynamic charts and filters for gender-based and objective-driven analysis.',
          'Analyzed investment duration, frequency, decision factors, and financial information sources to deliver executive reports and project showcases.',
        ],
      },
      {
        id: 'cognifyz-frontend',
        role: 'Front-end Developer',
        company: 'Cognifyz Technologies',
        mode: 'Work From Home',
        period: 'August 2024 – September 2024',
        summary:
          'Developed responsive, interactive websites with semantic HTML, modular CSS/Sass, Bootstrap, JavaScript DOM workflows, and external APIs.',
        highlights: [
          'Built foundational responsive pages using semantic HTML5, external stylesheets, CSS media queries, Bootstrap, and Sass preprocessing.',
          'Implemented interactive UI controls, DOM manipulation, and external API integration to render real-time data dynamically.',
          'Designed accessible forms with client-side validation to improve user experience and ensure data integrity.',
        ],
      },
      {
        id: 'cognifyz-cpp',
        role: 'C/C++ Developer',
        company: 'Cognifyz Technologies',
        mode: 'Work From Home',
        period: 'January 2024 – February 2024',
        summary:
          'Built modular console-based applications in C/C++ strengthening core algorithms, memory pointers, and file I/O fundamentals.',
        highlights: [
          'Implemented string reversal, palindrome checking, Fibonacci generation, calculator utilities, and a file copy utility.',
          'Developed array-based sorting algorithms (bubble and selection sort), a grade calculator, Rock-Paper-Scissors, and a console inventory system.',
          'Applied arrays, pointers, functions, and structured control flows for clean, maintainable code.',
        ],
      },
    ],
  },

  skillsSection: {
    subtitle: 'Technical Skills',
    description:
      'Core competencies across frontend web engineering, programming languages, SQL databases, data analytics, and deep learning workflows.',
    pillars: ['Responsive Frontend', 'Data & SQL Analytics', 'Applied AI & ML'],
    categories: [
      {
        id: 'frontend',
        indexLabel: '01',
        title: 'Languages & Frontend',
        caption: 'Semantic web interfaces, React components, responsive styling, and foundational languages.',
        image: '/src/assets/images/skills_frontend_visual_1795074340636.jpg',
        imageAlt: 'Frontend interface architecture workspace',
        skills: [
          { name: 'HTML5, CSS3, Sass & Bootstrap', level: 92, icon: 'html' },
          { name: 'JavaScript (ES6+)', level: 86, icon: 'javascript' },
          { name: 'React', level: 82, icon: 'react' },
          { name: 'Python', level: 88, icon: 'python' },
          { name: 'C / C++ & Java', level: 80, icon: 'design' },
        ],
      },
      {
        id: 'backend',
        indexLabel: '02',
        title: 'Databases, Platforms & Security',
        caption: 'Relational SQL analytics, cloud deployment platforms, networking, and security practices.',
        image: '/src/assets/images/skills_backend_visual_1795074341149.jpg',
        imageAlt: 'Backend server and modular database architecture',
        skills: [
          { name: 'SQL & MySQL', level: 85, icon: 'sql' },
          { name: 'Power BI & Streamlit Dashboards', level: 88, icon: 'data' },
          { name: 'GitHub, Netlify & Vercel', level: 84, icon: 'api' },
          { name: 'Computer Networking & Log Analysis', level: 76, icon: 'node' },
          { name: 'Web Security Fundamentals', level: 74, icon: 'database' },
        ],
      },
      {
        id: 'aiml',
        indexLabel: '03',
        title: 'AI, Machine Learning & Data Science',
        caption: 'End-to-end EDA, predictive modeling, clustering, CNN transfer learning, and YOLOv8 vision.',
        image: '/src/assets/images/skills_aiml_visual_1795074339917.jpg',
        imageAlt: 'Neural network geometry and optical data visualization',
        skills: [
          { name: 'Data Analysis (Pandas & NumPy)', level: 90, icon: 'data' },
          { name: 'Scikit-Learn, XGBoost & SMOTE', level: 84, icon: 'ml' },
          { name: 'TensorFlow / Keras & PyTorch', level: 78, icon: 'tensorflow' },
          { name: 'Computer Vision (CNN & YOLOv8)', level: 80, icon: 'ai' },
          { name: 'Visualization (Matplotlib, Seaborn, Plotly)', level: 86, icon: 'nlp' },
        ],
      },
    ],
  },

  projectsSection: {
    subtitle: 'Projects & Open-Source',
    description:
      'End-to-end data analytics, machine learning, and computer vision applications built with Python, SQL, Power BI, TensorFlow, PyTorch, and Streamlit.',
    pillars: ['ETL & SQL Analytics', 'Machine Learning', 'Deep Learning Vision'],
    projects: [
      {
        id: 'cross-market-analysis',
        title: 'Cross Market Analysis: Crypto, Oil & Stocks',
        category: 'Data Analytics',
        year: '2026',
        summary:
          'A financial BI and analytics platform comparing cryptocurrencies, oil prices, and stock market indices via live API ETL pipelines, SQL queries, and Streamlit.',
        details:
          'Collects cryptocurrency metrics from CoinGecko API, stock data via Yahoo Finance API, and historical oil price CSV datasets. Transforms data with Pandas into a normalized relational SQL database (MySQL/PostgreSQL/SQLite) for trend, volatility, and cross-market join analysis.',
        highlights: [
          'Built end-to-end ETL pipeline integrating CoinGecko API, Yahoo Finance API, and oil market CSV datasets',
          'Designed relational database schemas with keys, joins, and query optimization for volatility and trend analytics',
          'Deployed an interactive Streamlit dashboard enabling dynamic filters, SQL exploration, and price comparison charts',
        ],
        techStack: ['Python', 'SQL', 'Streamlit', 'Pandas', 'CoinGecko API', 'Yahoo Finance API'],
        githubUrl: 'https://github.com/pratik04032',
        liveUrl: 'https://drive.google.com/drive/folders/1S0dO3SjbFba6WEUcrZheYxzThQ-DmEnH',
      },
      {
        id: 'global-literacy-trends',
        title: 'Global Literacy & Education Trends',
        category: 'Data Analytics',
        year: '2025',
        summary:
          'An analytical study investigating global literacy rates against socio-economic indicators like GDP and years of schooling across countries.',
        details:
          'Combines Python data processing, MySQL analytical queries, Power BI dashboards, and Streamlit web views to surface educational disparities, regional patterns, and policy-relevant correlations.',
        highlights: [
          'Cleaned and merged global literacy, GDP, and schooling datasets with Pandas and NumPy',
          'Authored SQL analytical queries in MySQL to uncover cross-country correlations and regional gaps',
          'Delivered interactive visual narratives using Power BI, Plotly, Seaborn, Matplotlib, and Streamlit',
        ],
        techStack: ['Python', 'MySQL', 'Power BI', 'Streamlit', 'Pandas', 'Plotly'],
        githubUrl: 'https://github.com/pratik04032',
        liveUrl: 'https://drive.google.com/drive/folders/1S0dO3SjbFba6WEUcrZheYxzThQ-DmEnH',
      },
      {
        id: 'ecotype-forest-cover',
        title: 'EcoType: Forest Cover Classification',
        category: 'AI & ML',
        year: '2025',
        summary:
          'A multi-class machine learning classification system predicting forest cover types from geographical and environmental features like elevation, soil type, and slope.',
        details:
          'Evaluates Random Forest, Decision Tree, Logistic Regression, KNN, and XGBoost classifiers with SMOTE class-imbalance handling, serialized via Pickle/Joblib and served through a Streamlit interface for ecological and wildfire planning.',
        highlights: [
          'Handled imbalanced environmental classes using Imbalanced-learn (SMOTE) and targeted feature engineering',
          'Benchmarked Random Forest, Decision Tree, Logistic Regression, KNN, and XGBoost classifiers',
          'Persisted best-performing pipelines with Pickle/Joblib and deployed interactive predictions on Streamlit',
        ],
        techStack: ['Python', 'Scikit-learn', 'XGBoost', 'SMOTE', 'Pandas', 'Streamlit'],
        githubUrl: 'https://github.com/pratik04032',
        liveUrl: 'https://drive.google.com/drive/folders/1S0dO3SjbFba6WEUcrZheYxzThQ-DmEnH',
      },
      {
        id: 'diamond-dynamics',
        title: 'Diamond Dynamics: Price & Market Segmentation',
        category: 'AI & ML',
        year: '2025',
        summary:
          'A dual regression and clustering platform that predicts diamond prices from carat, cut, color, clarity, and dimensions while segmenting market tiers.',
        details:
          'Combines EDA, outlier handling, feature selection, Artificial Neural Networks (TensorFlow/Keras), and ensemble regressors evaluated on MAE/MSE/RMSE/R², alongside K-Means, DBSCAN/Hierarchical clustering, and PCA dimensionality reduction.',
        highlights: [
          'Trained Linear Regression, Random Forest, Decision Tree, XGBoost, KNN, and an ANN for high-accuracy price estimation',
          'Segmented diamonds into actionable market tiers using K-Means, DBSCAN, and PCA visualization',
          'Deployed a Streamlit app where users enter diamond specs to receive instant price estimates and market segment labels',
        ],
        techStack: ['Python', 'TensorFlow / Keras', 'Scikit-learn', 'XGBoost', 'K-Means & PCA', 'Streamlit'],
        githubUrl: 'https://github.com/pratik04032',
        liveUrl: 'https://drive.google.com/drive/folders/1S0dO3SjbFba6WEUcrZheYxzThQ-DmEnH',
      },
      {
        id: 'aerial-object-detection',
        title: 'Aerial Object Classification & Detection',
        category: 'Computer Vision',
        year: '2026',
        summary:
          'A deep-learning computer vision system classifying aerial images as Bird or Drone with optional real-time YOLOv8 bounding-box localization.',
        details:
          'Preprocesses and augments aerial datasets (rotation, flipping, zooming, brightness) to train a custom CNN alongside transfer-learning backbones (ResNet50, MobileNet, EfficientNet) with EarlyStopping and ModelCheckpoint callbacks.',
        highlights: [
          'Trained custom CNN and transfer learning architectures (ResNet50, MobileNet, EfficientNet) in TensorFlow/Keras and PyTorch',
          'Integrated optional YOLOv8 object detection for real-time bounding boxes alongside confusion matrix & F1-score evaluation',
          'Deployed an interactive Streamlit web app returning Bird vs. Drone predictions with confidence scores',
        ],
        techStack: ['Python', 'PyTorch', 'TensorFlow / Keras', 'YOLOv8', 'Transfer Learning', 'Streamlit'],
        githubUrl: 'https://github.com/pratik04032',
        liveUrl: 'https://drive.google.com/drive/folders/1S0dO3SjbFba6WEUcrZheYxzThQ-DmEnH',
      },
    ],
  },

  credentialsSection: {
    education: [
      {
        id: 'trident-btech',
        institution: 'Trident Academy of Technology',
        degree: 'B.Tech in Computer Science (AI & ML)',
        location: 'Bhubaneswar, Odisha',
        period: 'December 2022 – May 2026',
        grade: 'CGPA: 7.32',
        coursework: [
          'Artificial Intelligence & Machine Learning',
          'Data Analysis & Database Systems (SQL / MySQL)',
          'Web Development & Frontend Engineering',
          'Computer Networking & Web Security',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-micropython',
        title: 'Micro Python for Beginners',
        issuer: 'NIELIT, Calicut',
        category: 'Python & Embedded',
      },
      {
        id: 'cert-infosys-ai',
        title: 'Artificial Intelligence: Types of Artificial Intelligence',
        issuer: 'Infosys Springboard',
        category: 'Artificial Intelligence',
      },
      {
        id: 'cert-prompt-eng',
        title: 'Prompt Engineering for Everyone',
        issuer: 'Cognitive Classes',
        category: 'Generative AI',
      },
      {
        id: 'cert-java-basic',
        title: 'Java (Basic)',
        issuer: 'HackerRank',
        category: 'Programming',
      },
      {
        id: 'cert-js-basic',
        title: 'JavaScript (Basic)',
        issuer: 'HackerRank',
        category: 'Web Development',
      },
    ],
  },

  contactSection: {
    subtitle: "Let's Work Together",
    description:
      "I'm open to frontend engineering, data analytics, and AI/ML opportunities, internships, and collaborative projects. Feel free to reach out directly or send a message below.",
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
 * Computes legible foreground text color (#FFFFFF or #101114) for a given accent hex.
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
