import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2000&q=80"
          alt="A tailor at work in the Atelier Noir workshop"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="eyebrow"
        >
          Bespoke Tailoring — Since 1987
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          className="serif-heading mt-6 max-w-4xl text-6xl text-foreground sm:text-7xl lg:text-8xl"
        >
          Crafted for
          <br />
          <span className="italic text-[var(--gold)]">Gentlemen</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--silver)]"
        >
          Each suit hand-stitched over 80 hours in the finest Italian and English cloth — a quiet mastery three generations in the making.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("collection")}
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-4 text-xs font-medium uppercase tracking-[0.28em] text-[#0a0a0b] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_var(--gold)]"
          >
            Browse Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-xs font-medium uppercase tracking-[0.28em] text-foreground transition-all duration-500 hover:-translate-y-0.5 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            Our Heritage
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 1.4, delay: 1.4 },
          y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-foreground/70 hover:text-[var(--gold)]"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}