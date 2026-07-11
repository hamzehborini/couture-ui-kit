import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/atelier/VisuallyHidden";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import type { Product, SuitColor, SuitSize } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: Props) {
  const { add } = useCart();
  const [imageIdx, setImageIdx] = useState(0);
  const [color, setColor] = useState<SuitColor | null>(null);
  const [size, setSize] = useState<SuitSize | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product) {
      setImageIdx(0);
      setColor(product.colors[0]);
      setSize(null);
      setQty(1);
      setSizeError(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (!size || !color) {
      setSizeError(true);
      return;
    }
    add(product, color, size, qty);
    toast.success("Added to your cart", {
      description: `${product.name} — ${color}, ${size}`,
    });
    onOpenChange(false);
  };

  const cycle = (dir: 1 | -1) =>
    setImageIdx((i) => (i + dir + product.images.length) % product.images.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[95vh] w-[95vw] max-w-[1100px] gap-0 overflow-y-auto border border-white/10 bg-[#121214] p-0 text-foreground sm:rounded-2xl"
      >
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </VisuallyHidden>

        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-foreground backdrop-blur transition-transform duration-500 hover:rotate-90 hover:text-[var(--gold)]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative bg-[#0a0a0b] p-4 sm:p-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIdx}
                  src={product.images[imageIdx]}
                  alt={`${product.name} view ${imageIdx + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <button
                onClick={() => cycle(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-foreground backdrop-blur hover:text-[var(--gold)]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => cycle(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-foreground backdrop-blur hover:text-[var(--gold)]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto lg:mt-6">
              {product.images.map((src, i) => {
                const active = i === imageIdx;
                return (
                  <button
                    key={src + i}
                    onClick={() => setImageIdx(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={cn(
                      "relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border transition-all",
                      active ? "border-[var(--gold)]" : "border-white/10 opacity-60 hover:opacity-100",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-7 p-6 sm:p-10">
            <div>
              <p className="eyebrow">{product.fabricMill}</p>
              <h2 className="serif-heading mt-3 text-3xl text-foreground sm:text-4xl">{product.name}</h2>
              <p className="mt-3 font-serif text-2xl text-[var(--gold)]">{formatPrice(product.price)}</p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description} Constructed in the house atelier, each garment is hand-canvassed, pick-stitched and finished to your specification.
            </p>

            <div className="gold-divider" />

            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Fabric</p>
              <p className="mt-2 text-sm text-foreground">{product.fabric}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Colour</p>
              <div className="mt-3">
                {color ? <ColorSelector colors={product.colors} value={color} onChange={setColor} /> : null}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Size</p>
                {sizeError && !size ? (
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold)]">Please select a size</p>
                ) : null}
              </div>
              <div className="mt-3">
                <SizeSelector
                  sizes={product.sizes}
                  value={size}
                  onChange={(s) => {
                    setSize(s);
                    setSizeError(false);
                  }}
                />
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Quantity</p>
              <div className="mt-3">
                <QuantitySelector value={qty} onChange={setQty} />
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--gold)] px-6 py-4 text-xs font-medium uppercase tracking-[0.28em] text-[#0a0a0b] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_var(--gold)] active:translate-y-0"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}