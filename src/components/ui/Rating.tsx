import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm", className)}>
      <span aria-hidden="true" className="text-gold">
        ★
      </span>
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {typeof count === "number" && (
        <span className="text-muted">({count})</span>
      )}
    </span>
  );
}
