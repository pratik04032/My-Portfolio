import { PortfolioConfig } from '../config/portfolioConfig';
import { ResilientImage } from './ResilientImage';

interface AboutProps {
  personal: PortfolioConfig['personal'];
}

export function About({ personal }: AboutProps) {
  const quickFacts = [
    { label: 'Location', value: personal.location },
    { label: 'Education', value: personal.education },
    { label: 'Specialization', value: personal.specialization },
    { label: 'Email', value: personal.email, isEmail: true },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-surface border-b border-hairline transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 lg:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            About Me
          </h2>
          <div className="mt-3 w-14 h-1 bg-accent rounded-full" aria-hidden="true" />
        </div>

        {/* Balanced 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Editorial Workspace Visual */}
          <div className="lg:col-span-5">
            <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-hairline bg-surface-subtle">
              <ResilientImage
                src={personal.aboutImage}
                alt={`Workspace of ${personal.fullName}`}
                fallbackTitle="Developer Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Narrative & Unboxed Key Facts */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <h3 className="font-display text-2xl sm:text-[1.65rem] font-bold text-ink tracking-tight">
                I&apos;m {personal.shortName}
              </h3>

              <div className="space-y-4 text-[15px] sm:text-base text-ink-muted leading-relaxed max-w-[68ch]">
                {personal.aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Clean Typographic Metadata Grid (No Pill Boxes) */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-6 border-t border-hairline">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="space-y-1">
                  <dt className="text-xs font-medium text-ink-muted">{fact.label}</dt>
                  <dd className="text-sm sm:text-[15px] font-semibold text-ink break-words">
                    {fact.isEmail ? (
                      <a
                        href={`mailto:${fact.value}`}
                        className="text-accent-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
