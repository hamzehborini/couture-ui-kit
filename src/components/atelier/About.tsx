import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "40+", label: "Years of Craft" },
  { value: "5,000+", label: "Suits Delivered" },
  { value: "100%", label: "Hand Finished" },
];

export function About() {
  return (
    <section id="about" className="relative bg-background py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="eyebrow">Our Heritage</p>
            <h2 className="serif-heading mt-5 text-4xl text-foreground sm:text-5xl lg:text-6xl">
              Three Generations
              <br />
              <span className="italic text-[var(--gold)]">of Mastery</span>
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                Founded above a Savile Row workshop in 1987, Atelier Noir has answered to a single standard for four decades: every jacket cut, canvassed and finished by the hands of a master. No shortcuts, no fused linings, no compromises.
              </p>
              <p>
                We work exclusively in Super 130&apos;s wool from Huddersfield, cloths from Cerruti and Guabello, and silks from the mills of Como. Each suit passes through eleven fittings before it earns the house label.
              </p>
              <p>
                The result is a garment quieter than any brand and more precise than any machine — the whisper of a gentleman&apos;s wardrobe, built to outlast the decade.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
              {stats.map((s, i) => (
                <div key={s.label} className={i > 0 ? "border-l border-[var(--gold-soft)] pl-6" : ""}>
                  <p className="serif-heading text-3xl text-[var(--gold)] sm:text-4xl">{s.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative order-first lg:order-last"
          >
            <div aria-hidden className="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border border-[var(--gold-soft)]" />
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=80"
                alt="A master tailor hand-stitching a suit lapel"
                className="h-[520px] w-full object-cover sm:h-[640px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}