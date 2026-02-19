"use client";

/**
 * TrackedLink — anchor tag wrapper that fires trackEvent on click.
 * Use this in server components where onClick can't be attached directly.
 */

import { trackEvent } from "@/lib/track";

interface TrackedLinkProps {
  href: string;
  event: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export default function TrackedLink({
  href,
  event,
  className,
  target,
  rel,
  children,
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => trackEvent(event)}
    >
      {children}
    </a>
  );
}
