import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const goToCollection = () => {
    if (pathname !== "/") {
      navigate({ to: "/", hash: "collection" });
    } else {
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToAbout = () => {
    if (pathname !== "/") {
      navigate({ to: "/", hash: "about" });
    } else {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl"
            : "bg-gradient-to-b from-black/40 to-transparent",
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
          <Link
            to="/"
            className="font-serif text-xl tracking-[0.28em] text-foreground sm:text-2xl"
            aria-label="Atelier Noir — Home"
          >
            ATELIER NOIR
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <button
              onClick={goToCollection}
              className="text-xs font-medium uppercase tracking-[0.28em] text-foreground/85 transition-colors hover:text-[var(--gold)]"
            >
              Suits
            </button>
            <button
              onClick={goToAbout}
              className="text-xs font-medium uppercase tracking-[0.28em] text-foreground/85 transition-colors hover:text-[var(--gold)]"
            >
              Heritage
            </button>
            <Link
              to="/cart"
              aria-label={`Cart with ${count} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground transition-colors hover:border-[var(--gold-soft)] hover:text-[var(--gold)]"
            >
              <ShoppingCart className="h-4 w-4" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-semibold text-[#0a0a0b]">
                  {count}
                </span>
              ) : null}
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/cart"
              aria-label={`Cart with ${count} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
            >
              <ShoppingCart className="h-4 w-4" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-semibold text-[#0a0a0b]">
                  {count}
                </span>
              ) : null}
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#050505]/98 backdrop-blur-xl"
            role="dialog"
            aria-modal
            aria-label="Navigation"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl tracking-[0.28em]">ATELIER NOIR</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-8">
                {[
                  { label: "Home", action: () => navigate({ to: "/" }) },
                  { label: "Suits", action: () => navigate({ to: "/", hash: "collection" }) },
                  { label: "Heritage", action: () => navigate({ to: "/", hash: "about" }) },
                  { label: "Cart", action: () => navigate({ to: "/cart" }) },
                ].map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => {
                      item.action();
                      setOpen(false);
                    }}
                    className="serif-heading block text-left text-5xl text-foreground transition-colors hover:text-[var(--gold)]"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}