import { ExternalLink } from 'lucide-react';
import { PortfolioConfig } from '../config/portfolioConfig';
import { ResilientImage } from './ResilientImage';

interface AboutProps {
  personal: PortfolioConfig['personal'];
  social: PortfolioConfig['social'];
}

export function About({ personal, social }: AboutProps) {
  const quickFacts = [
    { label: 'Location', value: personal.location },
    { label: 'Education', value: personal.education },
    { label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, '')}` },
    { label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  ];

  const codingProfiles = [
    { label: 'LeetCode', href: social.leetcode },
    { label: 'CodeChef', href: social.codechef },
    { label: 'HackerRank', href: social.hackerrank },
    { label: 'GitHub', href: social.github },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

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
          {/* Left Column: Portrait Visual */}
          <div className="lg:col-span-5">
            <div className="h-full min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-hairline bg-surface-subtle">
              <ResilientImage
                src={personal.aboutImage}
                alt={`Portrait of ${personal.fullName}`}
                fallbackTitle={personal.fullName}
                className="w-full h-full object-cover object-top"
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
            <div className="space-y-6 pt-6 border-t border-hairline">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="space-y-1">
                    <dt className="text-xs font-medium text-ink-muted">{fact.label}</dt>
                    <dd className="text-sm sm:text-[15px] font-semibold text-ink break-words">
                      {fact.href ? (
                        <a
                          href={fact.href}
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

              {codingProfiles.length > 0 && (
                <div className="pt-4 border-t border-hairline flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-ink-muted">
                  <span className="text-ink">Coding Profiles:</span>
                  {codingProfiles.map((profile, idx) => (
                    <span key={profile.label} className="inline-flex items-center gap-3">
                      {idx > 0 && <span aria-hidden="true" className="text-ink-muted/50">·</span>}
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent-text hover:underline"
                      >
                        <span>{profile.label}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
