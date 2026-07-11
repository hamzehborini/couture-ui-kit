import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider, useCart } from "@/hooks/useCart";
import { Navbar } from "@/components/atelier/Navbar";
import { Footer } from "@/components/atelier/Footer";
import { CartItem } from "@/components/atelier/CartItem";
import { CartSummary } from "@/components/atelier/CartSummary";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — Atelier Noir" },
      { name: "description", content: "Review your selected garments from the Atelier Noir collection." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pb-24 pt-32">
          <CartContent />
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </div>
    </CartProvider>
  );
}

function CartContent() {
  const { items, count } = useCart();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="text-center">
        <p className="eyebrow">Your Selection</p>
        <h1 className="serif-heading mt-4 text-5xl text-foreground sm:text-6xl">Shopping Cart</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {count === 0
            ? "No garments selected"
            : `${count} garment${count > 1 ? "s" : ""} awaiting your review`}
        </p>
      </div>

      <div className="mt-16">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-md rounded-2xl border border-white/8 bg-[#121214] px-8 py-20 text-center"
          >
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold-soft)] text-[var(--gold)]">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <h2 className="serif-heading mt-8 text-3xl text-foreground">Your cart is empty</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Explore our signature collection and select the pieces to be made in your measure.
            </p>
            <button
              onClick={() => navigate({ to: "/", hash: "collection" })}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-4 text-xs font-medium uppercase tracking-[0.28em] text-[#0a0a0b] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_var(--gold)]"
            >
              Browse Collection
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItem key={`${item.product.id}-${item.color}-${item.size}`} item={item} />
                ))}
              </AnimatePresence>
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}