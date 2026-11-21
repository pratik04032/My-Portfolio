import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, Send, X } from 'lucide-react';
import { PortfolioConfig } from '../config/portfolioConfig';

interface ContactProps {
  personal: PortfolioConfig['personal'];
  contactSection: PortfolioConfig['contactSection'];
}

export function Contact({ personal, contactSection }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [usedPreviewMode, setUsedPreviewMode] = useState(false);

  const isPlaceholderEndpoint =
    !contactSection.formspreeEndpoint ||
    contactSection.formspreeEndpoint.includes('YOUR_FORMSPREE_ID');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSuccessModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email address, and message.');
      return;
    }

    setSubmitting(true);

    try {
      if (isPlaceholderEndpoint) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setUsedPreviewMode(true);
        setShowSuccessModal(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const response = await fetch(contactSection.formspreeEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error('Unable to send message right now.');
        }

        setUsedPreviewMode(false);
        setShowSuccessModal(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch {
      setErrorMessage(
        `Could not deliver your message via the form endpoint. You can also reach out directly at ${personal.email}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-canvas transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Intro & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
                Get In Touch
              </h2>
              <div className="w-14 h-1 bg-accent rounded-full" aria-hidden="true" />
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xl font-bold text-ink">
                {contactSection.subtitle}
              </h3>
              <p className="text-[15px] sm:text-base text-ink-muted leading-relaxed">
                {contactSection.description}
              </p>
            </div>

            <div className="pt-4 border-t border-hairline space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-text mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-ink-muted">Email</p>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm sm:text-base font-semibold text-ink hover:text-accent-text transition-colors break-all"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-text mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-ink-muted">Location</p>
                  <p className="text-sm sm:text-base font-semibold text-ink">
                    {personal.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-surface rounded-2xl border border-hairline p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-ink"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    className="w-full min-h-[46px] px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/65 bg-canvas border border-border-strong rounded-lg focus:bg-surface focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-ink"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full min-h-[46px] px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/65 bg-canvas border border-border-strong rounded-lg focus:bg-surface focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-ink"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell me about your project, role, or inquiry..."
                  className="w-full px-4 py-3 text-sm text-ink placeholder:text-ink-muted/65 bg-canvas border border-border-strong rounded-lg focus:bg-surface focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors resize-y"
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                >
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover disabled:opacity-60 rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>

                {isPlaceholderEndpoint && (
                  <p className="text-xs text-ink-muted">
                    Add your Formspree URL in <code className="font-mono text-ink">portfolioConfig.ts</code> to receive live emails.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Confirmation Popup */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={() => setShowSuccessModal(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md bg-surface rounded-2xl border border-hairline shadow-2xl p-7 text-center">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close confirmation"
              className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 mb-4">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>

            <h3
              id="contact-success-title"
              className="font-display text-2xl font-bold text-ink"
            >
              {contactSection.successTitle}
            </h3>

            <p className="mt-2.5 text-sm text-ink-muted leading-relaxed">
              {contactSection.successMessage}
            </p>

            {usedPreviewMode && (
              <p className="mt-4 text-xs text-ink-muted bg-canvas border border-hairline rounded-lg px-3.5 py-2.5">
                Preview mode active: update <code className="font-mono text-ink">formspreeEndpoint</code> in{' '}
                <code className="font-mono text-ink">src/config/portfolioConfig.ts</code> to deliver submissions to your inbox.
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 inline-flex items-center justify-center min-h-[44px] px-7 py-2.5 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
