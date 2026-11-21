import { PortfolioConfig } from '../config/portfolioConfig';

interface ExperienceProps {
  experienceSection: PortfolioConfig['experienceSection'];
}

export function Experience({ experienceSection }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="py-16 sm:py-20 lg:py-24 bg-canvas border-b border-hairline transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 lg:mb-14 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            {experienceSection.subtitle}
          </h2>
          <div className="w-14 h-1 bg-accent rounded-full" aria-hidden="true" />
          <p className="text-[15px] sm:text-base text-ink-muted leading-relaxed pt-1">
            {experienceSection.description}
          </p>
        </div>

        {/* Clean Single-Elevation Experience List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {experienceSection.items.map((item, index) => (
            <article
              key={item.id}
              className="bg-surface rounded-2xl border border-hairline p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Quiet Unboxed Editorial Metadata */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-muted">
                  <span className="font-mono text-accent-text tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{item.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.mode}</span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-ink leading-snug">
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold text-accent-text mt-1">
                    {item.company}
                  </p>
                </div>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <ul className="pt-4 border-t border-hairline space-y-2.5 text-sm text-ink-muted leading-relaxed">
                {item.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs font-semibold text-accent-text mt-1 shrink-0 tabular-nums"
                    >
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
