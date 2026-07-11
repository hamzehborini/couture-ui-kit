import { Link, useNavigate } from "@tanstack/react-router";

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="gold-divider mb-16" />
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl tracking-[0.28em]">ATELIER NOIR</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Bespoke tailoring, handmade by three generations of master cutters in the finest Italian and English cloth.
            </p>
          </div>
          <div>
            <p className="eyebrow">Maison</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/85">
              <li>
                <button onClick={() => navigate({ to: "/", hash: "about" })} className="hover:text-[var(--gold)]">
                  Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navigate({ to: "/", hash: "collection" })} className="hover:text-[var(--gold)]">
                  Collection
                </button>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[var(--gold)]">Cart</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Atelier</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/85">
              <li>14 Savile Row, London W1S 3PP</li>
              <li>By appointment only</li>
              <li>contact@ateliernoir.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs uppercase tracking-[0.24em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Atelier Noir</span>
          <span>Est. 1987 — Handmade in London &amp; Milan</span>
        </div>
      </div>
    </footer>
  );
}