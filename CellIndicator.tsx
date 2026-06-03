import type { CellOverride } from "@/lib/questionnaires/types";
import { cn } from "@/lib/utils";

const faceMap = {
  great: { emoji: "🙂", color: "text-tone-positive" },
  ok: { emoji: "😐", color: "text-tone-neutral" },
  meh: { emoji: "🙁", color: "text-tone-warning" },
  bad: { emoji: "☹️", color: "text-tone-negative" },
  worst: { emoji: "😣", color: "text-tone-negative" },
} as const;

const runnerMap = {
  ok: "🏃",
  slow: "🏃‍♂️",
  walk: "🚶",
  tired: "🚶‍♂️",
  stop: "🛑",
} as const;

export function Battery({ level }: { level: 0 | 25 | 50 | 75 | 100 }) {
  const fillColor =
    level >= 75 ? "var(--tone-positive)" :
    level >= 50 ? "var(--tone-warning)" :
    "var(--tone-negative)";
  return (
    <span className="inline-flex items-center" aria-label={`Bateria ${level}%`}>
      <span className="relative inline-block h-3.5 w-7 rounded-[3px] border-2 border-foreground/70">
        <span
          className="absolute inset-y-0 left-0 rounded-[1px]"
          style={{ width: `${level}%`, background: fillColor }}
        />
      </span>
      <span className="ml-0.5 inline-block h-2 w-1 rounded-r-sm bg-foreground/70" />
    </span>
  );
}

export function CellIndicator({ cell }: { cell?: CellOverride }) {
  if (!cell) return null;
  if (cell.empty) return <span className="text-2xl text-muted-foreground/40">—</span>;
  return (
    <div className="flex flex-col items-center gap-1.5">
      {cell.label && (
        <span className="text-center text-[11px] font-semibold uppercase leading-tight tracking-wide text-foreground sm:text-xs">
          {cell.label}
        </span>
      )}
      {cell.face && (
        <span className={cn("text-2xl leading-none", faceMap[cell.face].color)} aria-hidden>
          {faceMap[cell.face].emoji}
        </span>
      )}
      {cell.battery !== undefined && <Battery level={cell.battery} />}
      {cell.runner && (
        <span className="text-xl leading-none" aria-hidden>{runnerMap[cell.runner]}</span>
      )}
    </div>
  );
}