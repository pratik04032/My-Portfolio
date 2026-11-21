import { FormEvent, useCallback, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  AlertTriangle,
  CheckCircle2,
  Inbox,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import { PortfolioConfig } from '../config/portfolioConfig';
import {
  GmailMessageSummary,
  listRecentGmailMessages,
  sendGmailMessage,
  trashGmailMessage,
} from '../services/gmailApi';
import {
  getAccessToken,
  googleSignIn,
  initAuth,
  logout,
} from '../services/googleAuth';
import { GoogleSignInButton } from './GoogleSignInButton';

interface ContactProps {
  personal: PortfolioConfig['personal'];
  contactSection: PortfolioConfig['contactSection'];
}

type ContactTab = 'compose' | 'inbox';

interface PendingGmailSend {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}

export function Contact({ personal, contactSection }: ContactProps) {
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'gmail' | 'formspree' | 'preview'>('preview');

  // Gmail OAuth & Inbox state
  const [activeTab, setActiveTab] = useState<ContactTab>('compose');
  const [needsAuth, setNeedsAuth] = useState(true);
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [gmailError, setGmailError] = useState<string | null>(null);

  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [loadingInbox, setLoadingInbox] = useState(false);
  const [inboxQuery, setInboxQuery] = useState('');

  // Mandatory confirmation dialogs before mutating Gmail data
  const [pendingSend, setPendingSend] = useState<PendingGmailSend | null>(null);
  const [pendingTrash, setPendingTrash] = useState<GmailMessageSummary | null>(null);
  const [mutatingGmail, setMutatingGmail] = useState(false);

  const isPlaceholderEndpoint =
    !contactSection.formspreeEndpoint ||
    contactSection.formspreeEndpoint.includes('YOUR_FORMSPREE_ID');

  const fetchInbox = useCallback(async (queryText?: string) => {
    const token = await getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      return;
    }

    setLoadingInbox(true);
    setGmailError(null);
    try {
      const items = await listRecentGmailMessages(token, {
        maxResults: 6,
        query: queryText,
      });
      setMessages(items);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Unable to load Gmail messages.';
      setGmailError(msg);
      if (msg.includes('(401)')) {
        setNeedsAuth(true);
      }
    } finally {
      setLoadingInbox(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setGoogleUser(user);
        setNeedsAuth(false);
        setName((prev) => prev || user.displayName || '');
        setEmail((prev) => prev || user.email || '');
      },
      () => {
        setGoogleUser(null);
        setNeedsAuth(true);
        setMessages([]);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!needsAuth && activeTab === 'inbox') {
      fetchInbox(inboxQuery);
    }
  }, [needsAuth, activeTab, fetchInbox]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSuccessModal(false);
        setPendingSend(null);
        setPendingTrash(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  async function handleGoogleLogin() {
    setIsLoggingIn(true);
    setGmailError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setNeedsAuth(false);
        if (!name && result.user.displayName) {
          setName(result.user.displayName);
        }
        if (!email && result.user.email) {
          setEmail(result.user.email);
        }
        if (activeTab === 'inbox') {
          await fetchInbox(inboxQuery);
        }
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Google sign-in was cancelled or could not be completed.';
      setGmailError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleGoogleLogout() {
    await logout();
    setGoogleUser(null);
    setNeedsAuth(true);
    setMessages([]);
    setGmailError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email address, and message.');
      return;
    }

    // If signed in with Gmail, require explicit user confirmation before sending via Gmail API
    const accessToken = await getAccessToken();
    if (!needsAuth && accessToken) {
      const finalSubject =
        subject.trim() || `Portfolio Inquiry from ${name.trim()}`;
      const finalBody = `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`;
      setPendingSend({
        to: personal.email,
        subject: finalSubject,
        body: finalBody,
        replyTo: email.trim(),
      });
      return;
    }

    // Standard Formspree / local preview flow when not signed in with Google
    setSubmitting(true);
    try {
      if (isPlaceholderEndpoint) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setDeliveryMethod('preview');
        setShowSuccessModal(true);
        setName('');
        setEmail('');
        setSubject('');
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
            subject: subject.trim() || `Portfolio Inquiry from ${name.trim()}`,
            message: message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error('Unable to send message right now.');
        }

        setDeliveryMethod('formspree');
        setShowSuccessModal(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch {
      setErrorMessage(
        `Could not deliver your message via the form endpoint. You can also sign in with Google to send via Gmail or email ${personal.email}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmSendViaGmail() {
    if (!pendingSend) return;
    const accessToken = await getAccessToken();
    if (!accessToken) {
      setPendingSend(null);
      setNeedsAuth(true);
      setErrorMessage('Your Google session expired. Please sign in again to send via Gmail.');
      return;
    }

    setMutatingGmail(true);
    setErrorMessage(null);
    try {
      await sendGmailMessage(accessToken, pendingSend);
      setPendingSend(null);
      setDeliveryMethod('gmail');
      setShowSuccessModal(true);
      setSubject('');
      setMessage('');
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Failed to send email via Gmail.';
      setErrorMessage(msg);
      setPendingSend(null);
    } finally {
      setMutatingGmail(false);
    }
  }

  async function confirmTrashMessage() {
    if (!pendingTrash) return;
    const accessToken = await getAccessToken();
    if (!accessToken) {
      setPendingTrash(null);
      setNeedsAuth(true);
      return;
    }

    setMutatingGmail(true);
    setGmailError(null);
    try {
      await trashGmailMessage(accessToken, pendingTrash.id);
      setMessages((prev) => prev.filter((m) => m.id !== pendingTrash.id));
      setPendingTrash(null);
    } catch (err) {
      setGmailError(
        err instanceof Error ? err.message : 'Unable to move message to Trash.'
      );
      setPendingTrash(null);
    } finally {
      setMutatingGmail(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-canvas transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Intro, Contact Details & Gmail Sign-In */}
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

              {personal.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent-text mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-ink-muted">Phone</p>
                    <a
                      href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-semibold text-ink hover:text-accent-text transition-colors tabular-nums"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>
              )}

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

            {/* Gmail Connection Panel */}
            <div className="pt-5 border-t border-hairline space-y-3">
              <p className="text-xs font-semibold text-ink">Gmail Integration</p>
              {needsAuth ? (
                <div className="space-y-3">
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Sign in with Google to send messages directly through Gmail or browse your recent inbox messages.
                  </p>
                  <GoogleSignInButton
                    onClick={handleGoogleLogin}
                    disabled={isLoggingIn}
                    label={isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                  />
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-surface border border-hairline">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-ink truncate">
                      {googleUser?.displayName || 'Connected to Gmail'}
                    </p>
                    <p className="text-xs text-ink-muted truncate">
                      {googleUser?.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleLogout}
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs font-semibold text-ink-muted hover:text-ink border border-border-strong rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}

              {gmailError && (
                <p
                  role="alert"
                  className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
                >
                  {gmailError}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form & Gmail Inbox Workspace */}
          <div className="lg:col-span-7 space-y-4">
            {/* Functional Segmented Switcher: Send Message vs Gmail Inbox */}
            <div
              role="tablist"
              aria-label="Contact and Gmail views"
              className="inline-flex items-center gap-1 p-1 bg-surface border border-hairline rounded-xl"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'compose'}
                onClick={() => setActiveTab('compose')}
                className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'compose'
                    ? 'bg-accent text-on-accent'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                }`}
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{needsAuth ? 'Send Message' : 'Send via Gmail'}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'inbox'}
                onClick={() => setActiveTab('inbox')}
                className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'inbox'
                    ? 'bg-accent text-on-accent'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-subtle'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Gmail Inbox</span>
              </button>
            </div>

            {activeTab === 'compose' ? (
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
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold text-ink"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Project opportunity, internship, or collaboration"
                    className="w-full min-h-[46px] px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/65 bg-canvas border border-border-strong rounded-lg focus:bg-surface focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"
                  />
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
                        <span>{needsAuth ? 'Send Message' : 'Review & Send via Gmail'}</span>
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  {!needsAuth ? (
                    <p className="text-xs text-ink-muted">
                      Sending as <span className="font-medium text-ink">{googleUser?.email}</span> to {personal.email}
                    </p>
                  ) : (
                    isPlaceholderEndpoint && (
                      <p className="text-xs text-ink-muted">
                        Sign in with Google to send live via Gmail, or configure Formspree in{' '}
                        <code className="font-mono text-ink">portfolioConfig.ts</code>.
                      </p>
                    )
                  )}
                </div>
              </form>
            ) : (
              <div className="bg-surface rounded-2xl border border-hairline p-6 sm:p-8 space-y-5">
                {needsAuth ? (
                  <div className="py-8 text-center space-y-4">
                    <Inbox className="w-10 h-10 text-accent-text mx-auto" aria-hidden="true" />
                    <div className="space-y-1.5 max-w-md mx-auto">
                      <h3 className="font-display text-lg font-bold text-ink">
                        Connect Your Gmail Inbox
                      </h3>
                      <p className="text-sm text-ink-muted leading-relaxed">
                        Sign in with Google to search and view recent emails directly inside this workspace.
                      </p>
                    </div>
                    <div className="pt-1 flex justify-center">
                      <GoogleSignInButton
                        onClick={handleGoogleLogin}
                        disabled={isLoggingIn}
                        label={isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Search & Refresh Controls */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        fetchInbox(inboxQuery);
                      }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <div className="relative flex-1">
                        <Search
                          className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          type="text"
                          value={inboxQuery}
                          onChange={(e) => setInboxQuery(e.target.value)}
                          placeholder="Search Gmail (e.g. from:recruiter or is:unread)"
                          className="w-full min-h-[42px] pl-10 pr-4 py-2 text-sm text-ink placeholder:text-ink-muted/65 bg-canvas border border-border-strong rounded-lg focus:bg-surface focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          disabled={loadingInbox}
                          className="min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover rounded-lg transition-colors whitespace-nowrap"
                        >
                          Search
                        </button>
                        <button
                          type="button"
                          onClick={() => fetchInbox(inboxQuery)}
                          disabled={loadingInbox}
                          aria-label="Refresh Gmail messages"
                          className="inline-flex items-center justify-center w-10 h-[42px] text-ink bg-canvas border border-border-strong hover:border-accent rounded-lg transition-colors shrink-0"
                        >
                          <RefreshCw
                            className={`w-4 h-4 ${loadingInbox ? 'animate-spin' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </form>

                    {/* Messages List */}
                    {loadingInbox ? (
                      <div className="py-12 flex items-center justify-center gap-2.5 text-sm text-ink-muted">
                        <Loader2 className="w-4 h-4 animate-spin text-accent-text" aria-hidden="true" />
                        <span>Loading recent messages...</span>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="py-10 text-center rounded-xl bg-canvas border border-hairline">
                        <p className="text-sm font-semibold text-ink">No matching messages found</p>
                        <p className="text-xs text-ink-muted mt-1">
                          Try clearing the search query or refreshing your inbox.
                        </p>
                      </div>
                    ) : (
                      <ul className="divide-y divide-hairline border border-hairline rounded-xl overflow-hidden bg-canvas">
                        {messages.map((item) => (
                          <li
                            key={item.id}
                            className="p-4 hover:bg-surface transition-colors flex items-start justify-between gap-4"
                          >
                            <div className="min-w-0 space-y-1">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-muted">
                                <span className="font-semibold text-ink truncate max-w-[260px]">
                                  {item.from}
                                </span>
                                {item.unread && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="text-accent-text font-semibold">Unread</span>
                                  </>
                                )}
                              </div>
                              <p className="text-sm font-bold text-ink truncate">
                                {item.subject}
                              </p>
                              <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                                {item.snippet}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => setPendingTrash(item)}
                              aria-label={`Move "${item.subject}" to Trash`}
                              title="Move to Trash"
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-ink-muted hover:text-red-600 hover:bg-red-500/10 transition-colors shrink-0"
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog: Send Email via Gmail (MANDATORY before mutating Gmail) */}
      {pendingSend && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-gmail-send-title"
        >
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={() => !mutatingGmail && setPendingSend(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-lg bg-surface rounded-2xl border border-hairline shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 text-accent-text shrink-0">
                  <Send className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    id="confirm-gmail-send-title"
                    className="font-display text-lg font-bold text-ink"
                  >
                    Send Email via Gmail?
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Review the details below before sending from your Gmail account.
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={mutatingGmail}
                onClick={() => setPendingSend(null)}
                aria-label="Cancel sending email"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl bg-canvas border border-hairline p-4 space-y-2.5 text-sm">
              <p className="text-ink-muted">
                <span className="font-semibold text-ink">To:</span> {pendingSend.to}
              </p>
              <p className="text-ink-muted">
                <span className="font-semibold text-ink">Subject:</span> {pendingSend.subject}
              </p>
              <div className="pt-2 border-t border-hairline">
                <p className="text-xs font-semibold text-ink mb-1">Message Preview</p>
                <p className="text-xs text-ink-muted whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
                  {pendingSend.body}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                disabled={mutatingGmail}
                onClick={() => setPendingSend(null)}
                className="min-h-[42px] px-5 py-2 text-sm font-semibold text-ink bg-surface border border-border-strong hover:border-ink rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={mutatingGmail}
                onClick={confirmSendViaGmail}
                className="inline-flex items-center justify-center gap-2 min-h-[42px] px-5 py-2 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hover disabled:opacity-60 rounded-lg transition-colors"
              >
                {mutatingGmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Confirm &amp; Send</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Move Gmail Message to Trash (MANDATORY before destructive action) */}
      {pendingTrash && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-gmail-trash-title"
        >
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={() => !mutatingGmail && setPendingTrash(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md bg-surface rounded-2xl border border-hairline shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/15 text-red-600 shrink-0">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3
                  id="confirm-gmail-trash-title"
                  className="font-display text-lg font-bold text-ink"
                >
                  Move Email to Trash?
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Are you sure you want to move <span className="font-semibold text-ink">&ldquo;{pendingTrash.subject}&rdquo;</span> from{' '}
                  <span className="font-semibold text-ink">{pendingTrash.from}</span> to your Gmail Trash?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                disabled={mutatingGmail}
                onClick={() => setPendingTrash(null)}
                className="min-h-[42px] px-5 py-2 text-sm font-semibold text-ink bg-surface border border-border-strong hover:border-ink rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={mutatingGmail}
                onClick={confirmTrashMessage}
                className="inline-flex items-center justify-center gap-2 min-h-[42px] px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded-lg transition-colors"
              >
                {mutatingGmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Moving...</span>
                  </>
                ) : (
                  <span>Move to Trash</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
              {deliveryMethod === 'gmail'
                ? `Your email has been sent directly via Gmail to ${personal.email}.`
                : contactSection.successMessage}
            </p>

            {deliveryMethod === 'preview' && (
              <p className="mt-4 text-xs text-ink-muted bg-canvas border border-hairline rounded-lg px-3.5 py-2.5">
                Preview mode active: sign in with Google to send live emails through Gmail, or update{' '}
                <code className="font-mono text-ink">formspreeEndpoint</code> in{' '}
                <code className="font-mono text-ink">src/config/portfolioConfig.ts</code>.
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
