import { cn } from "@/lib/utils";
import type { Ambiance, Animal } from "@/lib/constants";

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

export function IconSearch({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </Line>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 21s-6.5-5.3-6.5-10a6.5 6.5 0 0 1 13 0c0 4.7-6.5 10-6.5 10z" />
      <circle cx="12" cy="11" r="2.3" />
    </Line>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </Line>
  );
}

export function IconGift({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 11h16v9H4z" />
      <path d="M12 11v9M3 7.5h18V11H3zM12 7.5S9 3.5 7 5.5 9 7.5 12 7.5zM12 7.5s3-4 5-2-2 2-5 2z" />
    </Line>
  );
}

export function IconHeart({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </Line>
  );
}

export function IconBell({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5H3.5S6 15 6 9z" />
      <path d="M10.2 20a2 2 0 0 0 3.6 0" />
    </Line>
  );
}

export function IconInbox({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 13l2.5-7h11L20 13v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M4 13h4a2 2 0 0 0 4 0h4" transform="translate(0,0)" />
    </Line>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.8-.9L3 20.5l1.5-4.2A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" />
    </Line>
  );
}

export function IconCrown({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 8l3.5 3L12 5l4.5 6L20 8l-1.5 10h-13z" />
    </Line>
  );
}

export function IconWave({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3 9c2.2-2 4.3-2 6.5 0S14 11 16 9s4.3-2 5 0" />
      <path d="M3 15c2.2-2 4.3-2 6.5 0S14 17 16 15s4.3-2 5 0" />
    </Line>
  );
}

export function IconMountain({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3 19l6-11 4 6.5 2-3 6 7.5z" />
    </Line>
  );
}

export function IconCat({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M5 9V4l3.5 3h7L19 4v5c0 4-3 8-7 8s-7-4-7-8z" />
      <path d="M9.5 12h.01M14.5 12h.01M12 14l-1 1h2z" />
    </Line>
  );
}

export function IconHorse({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M6 20c0-5 2-8 5-9l1-4 3 2c3 1 4 4 4 7" />
      <path d="M12 7c-3 0-5 2-6 4M8.5 9.5h.01" />
    </Line>
  );
}

export function IconLogout({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3" />
      <path d="M10 12h9M16 8l4 4-4 4" />
    </Line>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M9 6l6 6-6 6" />
    </Line>
  );
}

// Passeport du chien
export function IconHeartPulse({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 1-.3 2-.7 2.8" />
      <path d="M8 12h2l1.5-2 2 4 1-2h3" />
    </Line>
  );
}

export function IconBowl({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3 11h18a9 9 0 0 1-18 0z" />
      <path d="M8 8c0-1.5 1-2.5 1-4M12 8c0-1.5 1-2.5 1-4M16 8c0-1.5 1-2.5 1-4" />
    </Line>
  );
}

export function IconBulb({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3z" />
    </Line>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </Line>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6M17.5 13.6A5.5 5.5 0 0 1 20.5 19" />
    </Line>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </Line>
  );
}

export function IconGraduation({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 4l10 5-10 5L2 9z" />
      <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
    </Line>
  );
}

const AMBIANCE_ICONS: Record<Ambiance, (p: IconProps) => React.ReactElement> = {
  lac: IconWave,
  campagne: IconLeaf,
  montagne: IconMountain,
};

export function AmbianceIcon({
  value,
  className,
}: {
  value: Ambiance;
  className?: string;
}) {
  const C = AMBIANCE_ICONS[value] ?? IconLeaf;
  return <C className={className} />;
}

const ANIMAL_ICONS: Record<Animal, (p: IconProps) => React.ReactElement> = {
  chiens: IconPaw,
  chats: IconCat,
  chevaux: IconHorse,
};

export function AnimalIcon({
  value,
  className,
}: {
  value: Animal;
  className?: string;
}) {
  const C = ANIMAL_ICONS[value] ?? IconPaw;
  return <C className={className} />;
}

