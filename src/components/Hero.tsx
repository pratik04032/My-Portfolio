import { ArrowRight, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { HighlightMetric, PortfolioConfig } from '../config/portfolioConfig';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  personal: PortfolioConfig['personal'];
  social: PortfolioConfig['social'];
  highlights: HighlightMetric[];
}

export function Hero({ personal, social, highlights }: HeroProps) {
  const socialLinks = [
    {
      label: 'LinkedIn',
      href: social.linkedin,
      icon: Linkedin,
    },
    {
      label: 'GitHub',
      href: social.github,
      icon: Github,
    },
    {
      label: 'X / Twitter',
      href: social.twitter,
      icon: Twitter,
    },
    {
      label: 'Email',
      href: social.email,
      icon: Mail,
    },
  ].filter((item) => Boolean(item.href && item.href.trim() !== ''));

  return (
    <section
      id="home"
      className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24 bg-canvas border-b border-hairline transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            <p className="text-sm font-medium text-accent-text tracking-tight">
              {personal.availability}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-ink leading-[1.12] [text-wrap:balance]">
              Hi, I&apos;m{' '}
              <span className="text-accent-text">{personal.shortName}</span>
              <span className="block mt-2 text-ink font-bold text-2xl sm:text-3xl lg:text-[2.15rem] leading-snug">
                {personal.role}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl">
              {personal.tagline}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-7 py-3 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center min-h-[46px] px-6 py-3 text-sm font-semibold text-ink bg-surface border border-border-strong hover:border-accent hover:text-accent-text rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View Projects
              </a>

              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 text-sm font-medium text-ink-muted hover:text-ink transition-colors whitespace-nowrap shrink-0"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Media Links */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const isExternal = link.href.startsWith('http');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-surface border border-border-strong text-ink hover:border-accent hover:bg-accent hover:text-on-accent transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Studio Portrait Container (Responsive on Mobile & Desktop) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-[390px] lg:h-[390px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent scale-[1.04]"
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-surface shadow-[0_20px_50px_rgba(0,0,0,0.14)] bg-track">
                <ResilientImage
                  src={personal.heroImage}
                  alt={`${personal.fullName} portrait`}
                  fallbackTitle={personal.fullName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Highlights Strip Directly Below the Hero Split */}
        <div className="mt-14 lg:mt-20 pt-8 border-t border-hairline grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-medium text-ink-muted">{item.label}</p>
              <p className="font-display text-xl sm:text-2xl font-bold text-ink tabular-nums tracking-tight">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-ink-muted leading-snug">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
