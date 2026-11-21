import { useState } from 'react';
import {
  Brain,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  MessageSquareText,
  Network,
  Palette,
  Server,
  Sparkles,
  Table2,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { PortfolioConfig, SkillIconKey } from '../config/portfolioConfig';
import { ResilientImage } from './ResilientImage';

interface SkillsProps {
  skillsSection: PortfolioConfig['skillsSection'];
}

const SKILL_ICON_MAP: Record<SkillIconKey, typeof Code2> = {
  html: Globe,
  css: Layers,
  javascript: Zap,
  react: Code2,
  design: Palette,
  node: Server,
  python: Terminal,
  database: Database,
  sql: Table2,
  api: Workflow,
  ai: Brain,
  ml: Cpu,
  nlp: MessageSquareText,
  tensorflow: Network,
  data: Sparkles,
};

export function Skills({ skillsSection }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'aiml'>('all');
  const [hoveredCategoryId, setHoveredCategoryId] = useState<'frontend' | 'backend' | 'aiml'>('frontend');

  const visibleCategories =
    selectedCategory === 'all'
      ? skillsSection.categories
      : skillsSection.categories.filter((cat) => cat.id === selectedCategory);

  const activeVisualId =
    selectedCategory === 'all' ? hoveredCategoryId : selectedCategory;

  const activeCategoryVisual =
    skillsSection.categories.find((cat) => cat.id === activeVisualId) ||
    skillsSection.categories[0];

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 bg-canvas border-b border-hairline transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {skillsSection.subtitle}
            </h2>
            <div className="w-14 h-1 bg-accent rounded-full" aria-hidden="true" />
            <p className="text-[15px] sm:text-base text-ink-muted leading-relaxed pt-1">
              {skillsSection.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-accent-text pt-1">
              {skillsSection.pillars.map((pillar, idx) => (
                <span key={pillar} className="inline-flex items-center gap-2">
                  {idx > 0 && <span aria-hidden="true" className="text-ink-muted/60">·</span>}
                  <span>{pillar}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Functional Segmented Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface border border-hairline rounded-xl self-start lg:self-end"
          >
            {[
              { id: 'all', label: 'All Skills' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'aiml', label: 'AI & ML' },
            ].map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() =>
                    setSelectedCategory(tab.id as 'all' | 'frontend' | 'backend' | 'aiml')
                  }
                  className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isSelected
                      ? 'bg-accent text-on-accent'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Signature 2-Column Skills Layout (Skill Bars Left + Aligned Visual Showcase Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Categorized Skill Bars */}
          <div className="lg:col-span-7 space-y-6">
            {visibleCategories.map((category) => {
              const isHighlighted = activeVisualId === category.id;
              return (
                <div
                  key={category.id}
                  onMouseEnter={() => setHoveredCategoryId(category.id)}
                  onFocus={() => setHoveredCategoryId(category.id)}
                  className={`bg-surface rounded-2xl p-6 sm:p-7 border transition-colors duration-200 ${
                    isHighlighted
                      ? 'border-accent/55 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                      : 'border-hairline'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                        {category.indexLabel}. {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-muted mt-1">
                        {category.caption}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => {
                      const IconComponent = SKILL_ICON_MAP[skill.icon] || Code2;
                      const clampedLevel = Math.max(0, Math.min(100, skill.level));
                      return (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <IconComponent
                                className="w-4 h-4 text-accent-text shrink-0"
                                aria-hidden="true"
                              />
                              <span className="text-sm font-semibold text-ink truncate">
                                {skill.name}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-semibold text-ink-muted tabular-nums shrink-0">
                              {clampedLevel}%
                            </span>
                          </div>

                          <div
                            className="h-2 w-full bg-track rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={clampedLevel}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${skill.name} proficiency ${clampedLevel}%`}
                          >
                            <div
                              className="h-full bg-accent rounded-full transition-transform duration-300 origin-left"
                              style={{ width: `${clampedLevel}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Domain Artwork Showcase (Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            {/* Active Spotlight Card */}
            <div className="bg-surface rounded-2xl border border-hairline overflow-hidden">
              <div className="aspect-[4/3] w-full bg-track overflow-hidden">
                <ResilientImage
                  src={activeCategoryVisual.image}
                  alt={activeCategoryVisual.imageAlt}
                  fallbackTitle={activeCategoryVisual.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-2">
                <p className="text-xs font-medium text-accent-text">
                  Domain Focus · {activeCategoryVisual.indexLabel}
                </p>
                <h3 className="font-display text-lg font-bold text-ink">
                  {activeCategoryVisual.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {activeCategoryVisual.caption}
                </p>
              </div>
            </div>

            {/* Domain Quick Switcher Thumbnails (Desktop) */}
            <div className="hidden lg:grid grid-cols-3 gap-3">
              {skillsSection.categories.map((cat) => {
                const isActive = activeVisualId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setHoveredCategoryId(cat.id);
                      if (selectedCategory !== 'all') {
                        setSelectedCategory(cat.id);
                      }
                    }}
                    className={`group text-left rounded-xl overflow-hidden border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      isActive
                        ? 'border-accent ring-2 ring-accent/20'
                        : 'border-hairline opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] w-full bg-track overflow-hidden">
                      <ResilientImage
                        src={cat.image}
                        alt={cat.imageAlt}
                        fallbackTitle={cat.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-2.5 py-2 bg-surface">
                      <p className="text-xs font-semibold text-ink truncate">
                        {cat.indexLabel}. {cat.title.split(' ')[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
