import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import { QuantitySelector } from "./QuantitySelector";

const DOT: Record<string, string> = {
  Black: "bg-[#0a0a0b] border-white/40",
  Silver: "bg-[#c0c0c6]",
  Gold: "bg-[#c6a15b]",
};

export function CartItem({ item }: { item: CartItemType }) {
  const { remove, setQty } = useCart();
  const { product, color, size, quantity } = item;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, transition: { duration: 0.35 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 border-b border-white/5 py-8 sm:flex-row sm:items-center"
    >
      <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-black sm:h-36 sm:w-28">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            const img = e.currentTarget;
            img.onerror = null;
            img.src = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&h=280&q=80";
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{product.fabricMill}</p>
        <h3 className="font-serif text-xl text-foreground">{product.name}</h3>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full border border-white/10 ${DOT[color] ?? ""}`}
              aria-hidden
            />
            {color}
          </span>
          <span className="text-white/20">·</span>
          <span>Size {size}</span>
        </div>
        <p className="mt-2 font-serif text-lg text-[var(--gold)]">{formatPrice(product.price)}</p>
      </div>

      <div className="flex flex-col items-start gap-4 sm:items-end">
        <QuantitySelector value={quantity} onChange={(n) => setQty(product.id, color, size, n)} />
        <p className="font-serif text-lg text-foreground">{formatPrice(product.price * quantity)}</p>
        <button
          onClick={() => remove(product.id, color, size)}
          aria-label={`Remove ${product.name}`}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-[var(--gold)]"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </button>
      </div>
    </motion.div>
  );
}