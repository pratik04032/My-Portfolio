import { useEffect, useState } from 'react';
import { Check, Copy, Download, Palette, RotateCcw, X } from 'lucide-react';
import {
  generatePortfolioConfigSnippet,
  generateThemeCssSnippet,
  PortfolioConfig,
  ProjectItem,
  resolveThemeCssVars,
  THEME_PRESETS,
  ThemePresetId,
} from '../config/portfolioConfig';

interface CustomizeDrawerProps {
  isOpen: boolean;
  config: PortfolioConfig;
  onClose: () => void;
  onChange: (next: PortfolioConfig) => void;
  onReset: () => void;
}

type DrawerTab = 'theme' | 'personal' | 'social' | 'projects';

export function CustomizeDrawer({
  isOpen,
  config,
  onClose,
  onChange,
  onReset,
}: CustomizeDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>('theme');
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const { vars: activeCssVars } = resolveThemeCssVars(config.theme);

  function updateThemePreset(preset: ThemePresetId) {
    onChange({
      ...config,
      theme: {
        preset,
        customAccent: '',
      },
    });
  }

  function updateCustomAccent(hex: string) {
    onChange({
      ...config,
      theme: {
        ...config.theme,
        customAccent: hex,
      },
    });
  }

  function updatePersonal<K extends keyof PortfolioConfig['personal']>(
    field: K,
    value: PortfolioConfig['personal'][K]
  ) {
    onChange({
      ...config,
      personal: {
        ...config.personal,
        [field]: value,
      },
    });
  }

  function updateSocial<K extends keyof PortfolioConfig['social']>(
    field: K,
    value: string
  ) {
    onChange({
      ...config,
      social: {
        ...config.social,
        [field]: value,
      },
    });
  }

  function updateProject(index: number, patch: Partial<ProjectItem>) {
    const nextProjects = config.projectsSection.projects.map((proj, idx) =>
      idx === index ? { ...proj, ...patch } : proj
    );
    onChange({
      ...config,
      projectsSection: {
        ...config.projectsSection,
        projects: nextProjects,
      },
    });
  }

  async function handleCopyConfig() {
    const snippet = generatePortfolioConfigSnippet(config);
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2200);
    } catch {
      setCopiedConfig(false);
    }
  }

  async function handleCopyCssVariables() {
    const cssSnippet = generateThemeCssSnippet(config.theme);
    try {
      await navigator.clipboard.writeText(cssSnippet);
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2200);
    } catch {
      setCopiedCss(false);
    }
  }

  function handleDownloadConfig() {
    const snippet = generatePortfolioConfigSnippet(config);
    const blob = new Blob([snippet], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioConfig.snippet.ts';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl h-full bg-surface text-ink shadow-2xl border-l border-hairline flex flex-col">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-hairline flex items-center justify-between gap-4">
          <div>
            <h2
              id="customizer-title"
              className="font-display text-lg font-bold text-ink"
            >
              Customize Portfolio &amp; Theme
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Preview color themes &amp; placeholders live, then copy into your config or{' '}
              <code className="font-mono text-ink">index.css</code>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="px-6 py-3 border-b border-hairline bg-canvas overflow-x-auto">
          <div className="inline-flex items-center gap-1 p-1 bg-surface border border-hairline rounded-lg">
            {[
              { id: 'theme', label: 'Color Theme' },
              { id: 'personal', label: 'Personal Info' },
              { id: 'social', label: 'Social & Contact' },
              { id: 'projects', label: 'Projects' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as DrawerTab)}
                className={`min-h-[36px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-accent text-on-accent'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Fields */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-display text-sm font-bold text-ink">
                    Color Theme Presets
                  </h3>
                  <span className="text-xs text-ink-muted">
                    Updates CSS variables in <code className="font-mono text-ink">index.css</code>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = config.theme.preset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => updateThemePreset(preset.id)}
                        aria-pressed={isSelected}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          isSelected
                            ? 'bg-surface-subtle border-accent ring-2 ring-accent/20'
                            : 'bg-canvas border-hairline hover:border-border-strong'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-xs text-ink-muted">
                              <span className="font-display text-sm font-bold text-ink">
                                {preset.name}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{preset.mode}</span>
                            </div>
                            <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                              {preset.description}
                            </p>
                          </div>

                          {/* 4-Swatch Palette Preview */}
                          <div
                            className="flex items-center gap-1.5 shrink-0"
                            aria-hidden="true"
                          >
                            {[
                              preset.swatches.canvas,
                              preset.swatches.surface,
                              preset.swatches.ink,
                              preset.swatches.accent,
                            ].map((swatch, idx) => (
                              <span
                                key={idx}
                                className="w-5 h-5 rounded-full border border-black/15"
                                style={{ backgroundColor: swatch }}
                              />
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Custom Accent Override */}
              <div className="pt-5 border-t border-hairline space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-accent-text" aria-hidden="true" />
                    <h3 className="font-display text-sm font-bold text-ink">
                      Fine-Tune Accent Variable
                    </h3>
                  </div>

                  {config.theme.customAccent && (
                    <button
                      type="button"
                      onClick={() => updateCustomAccent('')}
                      className="text-xs font-semibold text-accent-text hover:underline"
                    >
                      Use Preset Accent
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    aria-label="Pick custom accent color"
                    value={activeCssVars.accent}
                    onChange={(e) => updateCustomAccent(e.target.value)}
                    className="w-11 h-11 rounded-lg border border-border-strong bg-canvas p-1 cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    aria-label="Custom accent hex code"
                    placeholder="#3E6FF4"
                    value={config.theme.customAccent || activeCssVars.accent}
                    onChange={(e) => updateCustomAccent(e.target.value)}
                    className="flex-1 min-h-[42px] px-3.5 py-2 text-sm font-mono text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                  />
                </div>
                <p className="text-xs text-ink-muted">
                  Automatically updates <code className="font-mono text-ink">--theme-accent</code>,{' '}
                  <code className="font-mono text-ink">--theme-accent-hover</code>, and button foreground contrast.
                </p>
              </div>

              {/* Live index.css Variables Preview + Copy Button */}
              <div className="pt-5 border-t border-hairline space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm font-bold text-ink">
                    Active <code className="font-mono">index.css</code> Variables
                  </h3>
                  <button
                    type="button"
                    onClick={handleCopyCssVariables}
                    className="inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1.5 text-xs font-semibold text-ink bg-canvas border border-border-strong hover:border-accent rounded-lg transition-colors whitespace-nowrap"
                  >
                    {copiedCss ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                        <span>Copied CSS</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy CSS Variables</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-canvas border border-hairline text-[11px] font-mono text-ink-muted overflow-x-auto leading-relaxed">
                  {generateThemeCssSnippet(config.theme)}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-ink">Full Name</span>
                  <input
                    type="text"
                    value={config.personal.fullName}
                    onChange={(e) => updatePersonal('fullName', e.target.value)}
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-ink">Hero Short Name</span>
                  <input
                    type="text"
                    value={config.personal.shortName}
                    onChange={(e) => updatePersonal('shortName', e.target.value)}
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">Role / Headline</span>
                <input
                  type="text"
                  value={config.personal.role}
                  onChange={(e) => updatePersonal('role', e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">Hero Tagline</span>
                <input
                  type="text"
                  value={config.personal.tagline}
                  onChange={(e) => updatePersonal('tagline', e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-ink">Location</span>
                  <input
                    type="text"
                    value={config.personal.location}
                    onChange={(e) => updatePersonal('location', e.target.value)}
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-ink">Education / Degree</span>
                  <input
                    type="text"
                    value={config.personal.education}
                    onChange={(e) => updatePersonal('education', e.target.value)}
                    className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">
                  About Bio (First Paragraph)
                </span>
                <textarea
                  rows={4}
                  value={config.personal.aboutParagraphs[0] || ''}
                  onChange={(e) => {
                    const updated = [...config.personal.aboutParagraphs];
                    updated[0] = e.target.value;
                    updatePersonal('aboutParagraphs', updated);
                  }}
                  className="w-full px-3.5 py-2.5 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>
            </>
          )}

          {activeTab === 'social' && (
            <>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">Public Email</span>
                <input
                  type="email"
                  value={config.personal.email}
                  onChange={(e) => {
                    updatePersonal('email', e.target.value);
                    updateSocial('email', `mailto:${e.target.value}`);
                  }}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">LinkedIn URL</span>
                <input
                  type="url"
                  value={config.social.linkedin}
                  onChange={(e) => updateSocial('linkedin', e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">GitHub URL</span>
                <input
                  type="url"
                  value={config.social.github}
                  onChange={(e) => updateSocial('github', e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">X / Twitter URL</span>
                <input
                  type="url"
                  value={config.social.twitter}
                  onChange={(e) => updateSocial('twitter', e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">
                  Resume PDF URL (Optional)
                </span>
                <input
                  type="url"
                  placeholder="https://example.com/resume.pdf"
                  value={config.personal.resumeUrl}
                  onChange={(e) => updatePersonal('resumeUrl', e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-ink">
                  Formspree Endpoint URL
                </span>
                <input
                  type="url"
                  value={config.contactSection.formspreeEndpoint}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      contactSection: {
                        ...config.contactSection,
                        formspreeEndpoint: e.target.value,
                      },
                    })
                  }
                  className="w-full min-h-[42px] px-3.5 py-2 text-sm font-mono text-ink bg-canvas border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                />
              </label>
            </>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {config.projectsSection.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="p-4 rounded-xl border border-hairline bg-canvas space-y-3"
                >
                  <p className="text-xs font-semibold text-accent-text">
                    Project {String(index + 1).padStart(2, '0')}
                  </p>
                  <input
                    type="text"
                    aria-label={`Project ${index + 1} title`}
                    value={project.title}
                    onChange={(e) => updateProject(index, { title: e.target.value })}
                    className="w-full min-h-[40px] px-3 py-1.5 text-sm font-semibold text-ink bg-surface border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    aria-label={`Project ${index + 1} summary`}
                    value={project.summary}
                    onChange={(e) => updateProject(index, { summary: e.target.value })}
                    className="w-full px-3 py-2 text-xs text-ink bg-surface border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="url"
                      placeholder="GitHub Repo URL"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(index, { githubUrl: e.target.value })}
                      className="w-full min-h-[38px] px-3 py-1.5 text-xs text-ink bg-surface border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                    />
                    <input
                      type="url"
                      placeholder="Live Demo URL"
                      value={project.liveUrl}
                      onChange={(e) => updateProject(index, { liveUrl: e.target.value })}
                      className="w-full min-h-[38px] px-3 py-1.5 text-xs text-ink bg-surface border border-border-strong rounded-lg focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="px-6 py-4 border-t border-hairline bg-canvas flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-ink-muted hover:text-ink transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadConfig}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold text-ink bg-surface border border-border-strong hover:border-ink rounded-lg transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download .ts</span>
            </button>

            <button
              type="button"
              onClick={handleCopyConfig}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap"
            >
              {copiedConfig ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copied Config</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Config</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
