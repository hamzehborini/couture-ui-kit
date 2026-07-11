import { cn } from "@/lib/utils";
import type { SuitSize } from "@/types";

interface Props {
  sizes: SuitSize[];
  value: SuitSize | null;
  onChange: (s: SuitSize) => void;
}

export function SizeSelector({ sizes, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = s === value;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            aria-pressed={active}
            className={cn(
              "min-w-14 rounded-full border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition-all",
              active
                ? "border-[var(--gold)] bg-[var(--gold)] text-[#0a0a0b]"
                : "border-white/10 text-foreground/85 hover:border-[var(--gold-soft)] hover:text-[var(--gold)]",
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}