import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function Line({
  children,
  className,
  strokeWidth = 1.8,
}: {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconLeaf({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M5 21C5 12 12 5 21 5c0 9-7 16-16 16z" />
      <path d="M5 21C9 17 13 13 17 9" />
    </Line>
  );
}

export function IconPaw({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <ellipse cx="7" cy="9.5" rx="1.9" ry="2.6" />
      <ellipse cx="12" cy="7.6" rx="2" ry="2.8" />
      <ellipse cx="17" cy="9.5" rx="1.9" ry="2.6" />
      <path d="M12 12c3 0 5.2 2.1 5.2 4.5 0 2-1.8 3-5.2 3s-5.2-1-5.2-3C6.8 14.1 9 12 12 12z" />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 3l7 3v5c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </Line>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 9.7V19h12V9.7" />
      <path d="M10 19v-5h4v5" />
    </Line>
  );
}

export function IconBook({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M6 4h11a1 1 0 0 1 1 1v15l-3-2-3 2-3-2-3 2V5a1 1 0 0 1 1-1z" />
      <path d="M9 8h6M9 11.5h4" />
    </Line>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      <path d="M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
    </svg>
  );
}

export function IconCamera({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 8h3l1.4-2h7.2L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13" r="3.3" />
    </Line>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 12.5l5 5L20 6.5" />
    </Line>
  );
}

export function IconRoute({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <path d="M8 16.5c3.5-1 6-3.5 8-7" strokeDasharray="0.1 3" />
    </Line>
  );
}

export function IconVideo({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3" y="6" width="12" height="12" rx="2.5" />
      <path d="M15 10l6-3v10l-6-3" />
    </Line>
  );
}
