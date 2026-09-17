import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/boutique")({
  head: () => ({ meta: [
    { title: "Boutique Air Max Plus — Grand Line Kicks" },
    { name: "description", content: "Explorez toutes les Air Max Plus Grand Line Kicks et commandez votre pointure en Algérie." },
    { property: "og:title", content: "Boutique — Grand Line Kicks" },
    { property: "og:description", content: "Trois éditions limitées inspirées des fruits du démon." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: BoutiquePage,
});

function BoutiquePage() {
  return (
    <main className="min-h-screen bg-background px-5 pb-20 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase text-muted-foreground">Éditions limitées</p>
        <h1 className="mt-2 text-5xl font-bold uppercase sm:text-7xl" style={{ fontFamily: "Anton, sans-serif" }}>La boutique</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Trois pouvoirs. Trois identités. Choisis la paire qui racontera ton aventure.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </main>
  );
}