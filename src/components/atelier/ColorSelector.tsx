import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SuitColor } from "@/types";

const SWATCH: Record<SuitColor, string> = {
  Black: "bg-[#0a0a0b]",
  Silver: "bg-[#c0c0c6]",
  Gold: "bg-[#c6a15b]",
};

interface Props {
  colors: SuitColor[];
  value: SuitColor;
  onChange: (c: SuitColor) => void;
}

export function ColorSelector({ colors, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      {colors.map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-label={`Select colour ${c}`}
            aria-pressed={active}
            className={cn(
              "relative inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 transition-all",
              active && "ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[#121214]",
            )}
          >
            <span className={cn("h-7 w-7 rounded-full border border-white/10", SWATCH[c])} />
            {active ? (
              <Check
                className={cn(
                  "absolute h-3.5 w-3.5",
                  c === "Silver" || c === "Gold" ? "text-[#0a0a0b]" : "text-[var(--gold)]",
                )}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}