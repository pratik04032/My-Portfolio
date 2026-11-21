import { Award, GraduationCap } from 'lucide-react';
import { PortfolioConfig } from '../config/portfolioConfig';

interface CredentialsProps {
  credentialsSection: PortfolioConfig['credentialsSection'];
}

export function Credentials({ credentialsSection }: CredentialsProps) {
  return (
    <section
      id="credentials"
      className="py-16 sm:py-20 lg:py-24 bg-surface border-b border-hairline transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 lg:mb-14 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Education &amp; Certifications
          </h2>
          <div className="w-14 h-1 bg-accent rounded-full" aria-hidden="true" />
          <p className="text-[15px] sm:text-base text-ink-muted leading-relaxed pt-1">
            Academic foundation in Computer Science (AI &amp; ML) complemented by verified certifications in Python, AI, prompt engineering, Java, and JavaScript.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Education */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-accent-text shrink-0" aria-hidden="true" />
              <h3 className="font-display text-xl font-bold text-ink">Education</h3>
            </div>

            {credentialsSection.education.map((edu) => (
              <article
                key={edu.id}
                className="bg-canvas rounded-2xl border border-hairline p-6 sm:p-7 space-y-5"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-muted">
                    <span className="font-mono tabular-nums">{edu.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{edu.location}</span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-ink leading-snug">
                    {edu.institution}
                  </h4>

                  <p className="text-sm font-semibold text-accent-text">
                    {edu.degree}
                  </p>

                  <p className="font-mono text-sm font-semibold text-ink tabular-nums pt-1">
                    {edu.grade}
                  </p>
                </div>

                <div className="pt-4 border-t border-hairline space-y-2.5">
                  <p className="text-xs font-semibold text-ink">Core Focus Areas</p>
                  <ul className="space-y-2 text-sm text-ink-muted">
                    {edu.coursework.map((course) => (
                      <li key={course} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-accent-text mt-0.5 shrink-0"
                        >
                          —
                        </span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-accent-text shrink-0" aria-hidden="true" />
              <h3 className="font-display text-xl font-bold text-ink">
                Certifications
              </h3>
            </div>

            <div className="bg-canvas rounded-2xl border border-hairline divide-y divide-hairline">
              {credentialsSection.certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <span className="font-mono text-xs font-semibold text-accent-text tabular-nums mt-1 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-base font-bold text-ink leading-snug">
                        {cert.title}
                      </h4>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-muted">
                        <span className="font-medium text-ink-muted">{cert.issuer}</span>
                        <span aria-hidden="true">·</span>
                        <span>{cert.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
