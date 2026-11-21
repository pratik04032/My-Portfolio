import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-surface-subtle text-ink-muted p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-8 h-8 mb-2 text-accent-text/75" aria-hidden="true" />
        <p className="text-sm font-medium text-ink">{fallbackTitle || alt}</p>
        <p className="text-xs text-ink-muted mt-1">Update image path in portfolioConfig.ts</p>
      </div>
    );
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const resolvedSrc =
    src.startsWith('/') && baseUrl !== '/'
      ? `${baseUrl.replace(/\/$/, '')}${src}`
      : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
