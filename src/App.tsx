/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Credentials } from './components/Credentials';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import {
  applyPortfolioTheme,
  DEFAULT_PORTFOLIO_CONFIG,
  PortfolioConfig,
} from './config/portfolioConfig';

const STORAGE_KEY = 'portfolio_custom_config_v2';
const LEGACY_STORAGE_KEY = 'portfolio_custom_config_v1';
const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'work',
  'experience',
  'credentials',
  'contact',
];

function loadSavedConfig(): PortfolioConfig {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Carry forward previously chosen color theme from v1 if present
      const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw) as Partial<PortfolioConfig>;
        if (legacy.theme) {
          return {
            ...DEFAULT_PORTFOLIO_CONFIG,
            theme: {
              ...DEFAULT_PORTFOLIO_CONFIG.theme,
              ...legacy.theme,
            },
          };
        }
      }
      return DEFAULT_PORTFOLIO_CONFIG;
    }

    const parsed = JSON.parse(raw) as Partial<PortfolioConfig>;
    return {
      ...DEFAULT_PORTFOLIO_CONFIG,
      ...parsed,
      theme: {
        ...DEFAULT_PORTFOLIO_CONFIG.theme,
        ...(parsed.theme || {}),
      },
      personal: {
        ...DEFAULT_PORTFOLIO_CONFIG.personal,
        ...(parsed.personal || {}),
        aboutImage:
          !parsed.personal?.aboutImage ||
          parsed.personal.aboutImage.includes('about_workspace_editorial')
            ? DEFAULT_PORTFOLIO_CONFIG.personal.aboutImage
            : parsed.personal.aboutImage,
      },
      social: {
        ...DEFAULT_PORTFOLIO_CONFIG.social,
        ...(parsed.social || {}),
      },
      experienceSection: {
        ...DEFAULT_PORTFOLIO_CONFIG.experienceSection,
        ...(parsed.experienceSection || {}),
      },
      skillsSection: {
        ...DEFAULT_PORTFOLIO_CONFIG.skillsSection,
        ...(parsed.skillsSection || {}),
      },
      projectsSection: {
        ...DEFAULT_PORTFOLIO_CONFIG.projectsSection,
        ...(parsed.projectsSection || {}),
      },
      credentialsSection: {
        ...DEFAULT_PORTFOLIO_CONFIG.credentialsSection,
        ...(parsed.credentialsSection || {}),
      },
      contactSection: {
        ...DEFAULT_PORTFOLIO_CONFIG.contactSection,
        ...(parsed.contactSection || {}),
      },
      footer: {
        ...DEFAULT_PORTFOLIO_CONFIG.footer,
        ...(parsed.footer || {}),
      },
    };
  } catch {
    return DEFAULT_PORTFOLIO_CONFIG;
  }
}

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(() => loadSavedConfig());
  const [activeSection, setActiveSection] = useState<string>('home');
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Sync active color theme CSS variables on :root (defined in src/index.css)
  useEffect(() => {
    applyPortfolioTheme(config.theme);
  }, [config.theme]);

  // Keep page <title> synced with the customized fullName & role
  useEffect(() => {
    document.title = `${config.personal.fullName} — ${config.personal.role}`;
  }, [config.personal.fullName, config.personal.role]);

  // Scroll-spy for active navigation underline
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
        const sectionEl = document.getElementById(SECTION_IDS[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(SECTION_IDS[i]);
          return;
        }
      }
      setActiveSection('home');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleUpdateConfig(nextConfig: PortfolioConfig) {
    setConfig(nextConfig);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }

  function handleResetConfig() {
    setConfig(DEFAULT_PORTFOLIO_CONFIG);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col transition-colors duration-200">
      <Header
        brandName={config.personal.fullName}
        activeSection={activeSection}
      />

      <main className="flex-1">
        <Hero
          personal={config.personal}
          social={config.social}
          highlights={config.highlights}
        />

        <About personal={config.personal} social={config.social} />

        <Skills skillsSection={config.skillsSection} />

        <Projects projectsSection={config.projectsSection} />

        <Experience experienceSection={config.experienceSection} />

        <Credentials credentialsSection={config.credentialsSection} />

        <Contact
          personal={config.personal}
          contactSection={config.contactSection}
        />
      </main>

      <Footer
        config={config}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      <CustomizeDrawer
        isOpen={customizerOpen}
        config={config}
        onClose={() => setCustomizerOpen(false)}
        onChange={handleUpdateConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
