import { motion } from "motion/react";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="serif-heading mt-4 text-4xl text-foreground sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}