import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";

export function CartSummary() {
  const { subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 2000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <aside className="sticky top-28 rounded-2xl border border-white/8 bg-[#121214] p-8">
      <p className="eyebrow">Order Summary</p>
      <h2 className="serif-heading mt-3 text-2xl text-foreground">Your Total</h2>

      <dl className="mt-8 space-y-4 text-sm">
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-serif text-base text-foreground">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className={shipping === 0 ? "font-serif text-base text-[var(--gold)]" : "font-serif text-base text-foreground"}>
            {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">Tax (8%)</dt>
          <dd className="font-serif text-base text-foreground">{formatPrice(tax)}</dd>
        </div>
      </dl>

      <div className="gold-divider my-8" />

      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Total</span>
        <span className="serif-heading text-3xl text-[var(--gold)]">{formatPrice(total)}</span>
      </div>

      <button
        onClick={() =>
          toast.info("Checkout is not available in this demo", {
            description: "This is a design showcase.",
          })
        }
        className="mt-8 w-full rounded-full bg-[var(--gold)] px-6 py-4 text-xs font-medium uppercase tracking-[0.28em] text-[#0a0a0b] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_var(--gold)]"
      >
        Proceed to Checkout
      </button>
      <button
        onClick={() => navigate({ to: "/", hash: "collection" })}
        className="mt-3 w-full rounded-full border border-white/10 px-6 py-4 text-xs font-medium uppercase tracking-[0.28em] text-foreground transition-all duration-500 hover:border-[var(--gold-soft)] hover:text-[var(--gold)]"
      >
        Continue Shopping
      </button>
    </aside>
  );
}