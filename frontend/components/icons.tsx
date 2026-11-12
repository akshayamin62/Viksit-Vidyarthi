import type { ReactNode } from "react";

export function Ico({ children, className = "size-5 shrink-0" }: { children: ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Arrow() {
  return (
    <Ico>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Ico>
  );
}

export function Check() {
  return (
    <Ico>
      <path d="M5 12.5 10 17 19 7.5" />
    </Ico>
  );
}
