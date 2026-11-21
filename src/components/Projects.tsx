import { useEffect, useState } from 'react';
import { ArrowUpRight, Code2, ExternalLink, X } from 'lucide-react';
import { PortfolioConfig, ProjectCategory, ProjectItem } from '../config/portfolioConfig';

interface ProjectsProps {
  projectsSection: PortfolioConfig['projectsSection'];
}

const FILTER_OPTIONS: Array<'All' | ProjectCategory> = [
  'All',
  'Data Analytics',
  'AI & ML',
  'Computer Vision',
];

export function Projects({ projectsSection }: ProjectsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    selectedFilter === 'All'
      ? projectsSection.projects
      : projectsSection.projects.filter((project) => project.category === selectedFilter);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  return (
    <section
      id="work"
      className="py-16 sm:py-20 lg:py-24 bg-surface border-b border-hairline transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {projectsSection.subtitle}
            </h2>
            <div className="w-14 h-1 bg-accent rounded-full" aria-hidden="true" />
            <p className="text-[15px] sm:text-base text-ink-muted leading-relaxed pt-1">
              {projectsSection.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-accent-text pt-1">
              {projectsSection.pillars.map((pillar, idx) => (
                <span key={pillar} className="inline-flex items-center gap-2">
                  {idx > 0 && <span aria-hidden="true" className="text-ink-muted/60">·</span>}
                  <span>{pillar}</span>
                </span>
              ))}
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by domain"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-canvas border border-hairline rounded-xl self-start lg:self-end"
          >
            {FILTER_OPTIONS.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedFilter(filter)}
                  className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isSelected
                      ? 'bg-accent text-on-accent'
                      : 'text-ink-muted hover:text-ink hover:bg-surface'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-hairline bg-canvas p-12 text-center">
            <p className="text-base font-semibold text-ink">
              No projects in this category yet.
            </p>
            <button
              type="button"
              onClick={() => setSelectedFilter('All')}
              className="mt-4 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const displayIndex = String(index + 1).padStart(2, '0');
              return (
                <article
                  key={project.id}
                  className="group flex flex-col justify-between bg-canvas hover:bg-surface rounded-2xl p-6 sm:p-7 border border-hairline hover:border-accent/55 transition-all duration-200"
                >
                  <div>
                    {/* Quiet Unboxed Editorial Metadata */}
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-ink-muted mb-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-accent-text tabular-nums">
                          {displayIndex}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{project.year}</span>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display text-xl font-bold text-ink group-hover:text-accent-text transition-colors leading-snug">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {project.title}
                      </button>
                    </h3>

                    {/* Summary */}
                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tech Stack as Clean Unboxed Text with Separators */}
                    <div className="mt-5 pt-4 border-t border-hairline flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-muted">
                      {project.techStack.map((tech, idx) => (
                        <span key={tech} className="inline-flex items-center gap-2">
                          {idx > 0 && <span aria-hidden="true" className="text-ink-muted/60">·</span>}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="mt-6 pt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-ink bg-surface border border-border-strong hover:border-ink rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Code2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>View Code</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="w-full min-h-[40px] px-3 py-2 text-xs font-semibold text-ink-muted hover:text-accent-text transition-colors text-center"
                    >
                      Read Project Overview
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={() => setActiveProject(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface rounded-2xl border border-hairline shadow-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-accent-text">
                  {activeProject.category} · {activeProject.year}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1"
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-[15px] text-ink-muted leading-relaxed">
              <p>{activeProject.summary}</p>
              <p>{activeProject.details}</p>

              <div className="pt-4 border-t border-hairline">
                <h4 className="font-display text-sm font-bold text-ink mb-3">
                  Key Highlights
                </h4>
                <ul className="space-y-2.5 text-sm text-ink-muted">
                  {activeProject.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-semibold text-accent-text mt-0.5 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-hairline">
                <h4 className="font-display text-sm font-bold text-ink mb-2">
                  Technology Stack
                </h4>
                <p className="text-sm font-medium text-ink-muted">
                  {activeProject.techStack.join(' · ')}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-hairline flex flex-wrap items-center justify-end gap-3">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-ink bg-surface border border-border-strong hover:border-ink rounded-lg transition-colors whitespace-nowrap"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" />
                <span>Source Code</span>
              </a>
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Open Live Demo</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
