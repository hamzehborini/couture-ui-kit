import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";

interface Props {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function SuitCard({ product, index, onSelect }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(product)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: EASE }}
      className="group relative block w-full text-left"
      aria-label={`View ${product.name}`}
    >
      <div className="overflow-hidden rounded-xl border border-white/5 transition-colors duration-500 group-hover:border-[var(--gold-soft)]">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-black/40 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--gold)] backdrop-blur">
              View Details
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
        <div className="space-y-2 p-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{product.fabricMill}</p>
          <h3 className="font-serif text-xl text-foreground transition-colors duration-300 group-hover:text-[var(--gold)]">{product.name}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">{product.description}</p>
          <p className="pt-2 font-serif text-lg tracking-wide text-[var(--gold)]">{formatPrice(product.price)}</p>
        </div>
      </div>
    </motion.button>
  );
}