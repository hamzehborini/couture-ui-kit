import { useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/types";
import { SectionHeading } from "./SectionHeading";
import { SuitCard } from "./SuitCard";
import { ProductModal } from "./ProductModal";

export function SuitGrid() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section id="collection" className="relative bg-[#050505] py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="The Collection"
          title="Signature Suits"
          subtitle="Eight silhouettes drawn from the house archive — each one made to order, each one finished entirely by hand."
        />

        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {products.map((p, i) => (
            <SuitCard key={p.id} product={p} index={i} onSelect={setActive} />
          ))}
        </div>
      </div>

      <ProductModal
        product={active}
        open={active !== null}
        onOpenChange={(v) => !v && setActive(null)}
      />
    </section>
  );
}