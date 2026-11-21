import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  brandName: string;
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Education' },
];

export function Header({ brandName, activeSection }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md border-b border-hairline'
          : 'bg-canvas/90 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-ink hover:text-accent-text transition-colors whitespace-nowrap shrink-0 truncate max-w-[200px] sm:max-w-[260px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {brandName}
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  isActive
                    ? 'text-accent-text'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-accent transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Desktop) & Mobile Menu Button */}
        <div className="flex items-center shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get In Touch
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-ink hover:bg-track transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 flex justify-end">
          <div
            className="fixed inset-0 top-16 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            aria-label="Mobile Navigation"
            className="relative w-72 max-w-[82vw] h-[calc(100vh-4rem)] bg-footer-bg text-footer-text px-6 py-8 flex flex-col justify-between shadow-xl overflow-y-auto"
          >
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center min-h-[46px] px-4 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-accent text-on-accent'
                          : 'text-footer-text hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="pt-6 border-t border-white/15">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full min-h-[46px] px-5 py-3 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
