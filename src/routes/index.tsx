import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Les Brumes — Brumes parfumées" },
      {
        name: "description",
        content:
          "Découvrez quatre brumes parfumées aux univers uniques, livrées partout en Algérie.",
      },
      { property: "og:title", content: "Les Brumes — Collection parfumée" },
      {
        property: "og:description",
        content:
          "Découvrez Sweet Dreams, Honey Touch, Dziria et Afro Passion. Paiement à la livraison en Algérie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <Hero />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">La collection</p>
            <h2 className="mt-2 text-3xl font-bold uppercase sm:text-5xl" style={{ fontFamily: "Anton, sans-serif" }}>
              Trouve ta brume
            </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
