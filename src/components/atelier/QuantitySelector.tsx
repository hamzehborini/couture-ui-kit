import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
}

export function QuantitySelector({ value, onChange, min = 1 }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="inline-flex h-10 w-10 items-center justify-center rounded-l-full text-foreground/85 transition-colors hover:text-[var(--gold)] disabled:opacity-40"
        disabled={value <= min}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-10 text-center text-sm tabular-nums text-foreground">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-r-full text-foreground/85 transition-colors hover:text-[var(--gold)]"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}