import { useEffect } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";
import { Navbar } from "@/components/atelier/Navbar";
import { Footer } from "@/components/atelier/Footer";
import { Hero } from "@/components/atelier/Hero";
import { About } from "@/components/atelier/About";
import { SuitGrid } from "@/components/atelier/SuitGrid";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
    }
  }, [hash]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <About />
          <SuitGrid />
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </div>
    </CartProvider>
  );
}
