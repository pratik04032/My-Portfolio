import { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail, SlidersHorizontal, Twitter } from 'lucide-react';
import { PortfolioConfig } from '../config/portfolioConfig';

interface FooterProps {
  config: PortfolioConfig;
  onOpenCustomizer: () => void;
}

export function Footer({ config, onOpenCustomizer }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 360);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialItems = [
    { label: 'LinkedIn', href: config.social.linkedin, icon: Linkedin },
    { label: 'GitHub', href: config.social.github, icon: Github },
    { label: 'X / Twitter', href: config.social.twitter, icon: Twitter },
    { label: 'Email', href: config.social.email, icon: Mail },
  ].filter((item) => Boolean(item.href && item.href.trim() !== ''));

  return (
    <footer className="bg-footer-bg text-footer-text pt-16 pb-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-xl font-bold text-white tracking-tight">
              {config.personal.fullName}
            </p>
            <p className="text-sm font-medium text-footer-accent">
              {config.personal.role}
            </p>
            <p className="text-sm text-footer-text/80 leading-relaxed max-w-sm">
              {config.personal.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-bold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-footer-text/80">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#work' },
                { label: 'Experience', href: '#experience' },
                { label: 'Education & Certs', href: '#credentials' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display text-sm font-bold text-white">
              Let&apos;s Connect
            </h3>
            <ul className="space-y-2.5 text-sm text-footer-text/80">
              {socialItems.map((item) => {
                const Icon = item.icon;
                const isExternal = item.href.startsWith('http');
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2.5 hover:text-white transition-colors py-0.5"
                    >
                      <Icon className="w-4 h-4 text-footer-accent" aria-hidden="true" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-footer-muted">
              {config.social.leetcode && (
                <a
                  href={config.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LeetCode
                </a>
              )}
              {config.social.codechef && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={config.social.codechef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    CodeChef
                  </a>
                </>
              )}
              {config.social.hackerrank && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={config.social.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    HackerRank
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright, Tech Stack & Live Template Customizer Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-footer-muted">
          <div className="space-y-1">
            <p>
              &copy; {currentYear} {config.personal.fullName}. All rights reserved.
            </p>
            <p className="text-footer-muted">
              Built with {config.footer.techStack.join(' · ')}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-footer-accent"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Customize Placeholders &amp; Theme</span>
          </button>
        </div>
      </div>

      {/* Smooth Back-to-Top Control */}
      {showBackToTop && (
        <a
          href="#home"
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent hover:bg-accent-hover text-on-accent shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </a>
      )}
    </footer>
  );
}
