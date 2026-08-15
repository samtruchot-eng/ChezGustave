import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Base commune : trait fin, couleur héritée, taille pilotée par les classes. */
function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconPlatform(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
      <path d="m3 12 9 4.5L21 12" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </Base>
  );
}

export function IconExtranet(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M8.4 6h7.2M7.2 8.1 10.8 16M16.8 8.1 13.2 16" />
    </Base>
  );
}

export function IconIntranet(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V6.5a1 1 0 0 1 .6-.92l6-2.5a1 1 0 0 1 1.4.92V21" />
      <path d="M13 21V9.8l5.4 1.9a1 1 0 0 1 .6.94V21" />
      <path d="M8 8.5h1.5M8 12h1.5M8 15.5h1.5M16 14.5h.01M16 17.5h.01" />
    </Base>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </Base>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v5.4c0 4.3-2.9 8.2-7 9.6-4.1-1.4-7-5.3-7-9.6V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

export function IconSwiss(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M12 8.2v7.6M8.2 12h7.6" strokeWidth={2.1} />
    </Base>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m4.5 12.5 5 5 10-11" strokeWidth={1.9} />
    </Base>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Base>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6 18 18M18 6 6 18" />
    </Base>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7 7.3 5.2a1.6 1.6 0 0 0 1.8 0L20.2 7" />
    </Base>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7.5 3.5h-2A2.5 2.5 0 0 0 3 6.2C3 14 10 21 17.8 21a2.5 2.5 0 0 0 2.7-2.5v-2l-4-1.6-2 2.2a13.6 13.6 0 0 1-5.6-5.6l2.2-2-1.6-4Z" />
    </Base>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Base>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 1.8" />
    </Base>
  );
}

export function IconSparkles(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.7 10.4 12.2 5 10.6 10.4 9 12 3.5Z" />
      <path d="M18.5 16.5 19.2 18.8 21.5 19.5 19.2 20.2 18.5 22.5 17.8 20.2 15.5 19.5 17.8 18.8 18.5 16.5Z" />
    </Base>
  );
}

export function IconDocument(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="M8.5 13h7M8.5 16.5h4.5" />
    </Base>
  );
}

export function IconChart(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6M12.5 20V8.5M17 20v-9" />
    </Base>
  );
}

export function IconLock(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      <path d="M12 14v2.5" />
    </Base>
  );
}

export function IconCode(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m8.5 8.5-4 3.5 4 3.5" />
      <path d="m15.5 8.5 4 3.5-4 3.5" />
      <path d="m13.5 5-3 14" />
    </Base>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M16.5 5.4a3.2 3.2 0 0 1 0 6.2" />
      <path d="M17.5 14.6a6 6 0 0 1 3 5.4" />
    </Base>
  );
}

export function IconRocket(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13.5 4.2c3.5-1.4 6.3-1 6.3-1s.4 2.8-1 6.3c-1 2.5-3.3 5-5.6 6.6l-3.3-3.3c1.6-2.3 4.1-4.6 6.6-5.6" />
      <path d="m10 12.8-3.3-.6a.8.8 0 0 1-.4-1.3l2.3-2.4a2 2 0 0 1 1.5-.6h2.4" />
      <path d="m11.2 14 .6 3.3a.8.8 0 0 0 1.3.4l2.4-2.3a2 2 0 0 0 .6-1.5v-2.4" />
      <path d="M6.5 17.5 4 20" />
    </Base>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4.5h-4.5" />
    </Base>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11ZM9.5 9.5h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76v5.69h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.31-2.02 2.66v5.14h-4v-11Z" />
    </svg>
  );
}
