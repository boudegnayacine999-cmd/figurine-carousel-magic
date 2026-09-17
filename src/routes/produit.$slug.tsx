import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";
import ProductPurchase from "@/components/ProductPurchase";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, formatDA, getProduct } from "@/data/products";

export const Route = createFileRoute("/produit/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} — Grand Line Kicks` : "Produit introuvable — Grand Line Kicks" },
    { name: "description", content: loaderData?.description ?? "Ce modèle Grand Line Kicks est introuvable." },
    { property: "og:title", content: loaderData ? `${loaderData.name} — Grand Line Kicks` : "Produit introuvable" },
    { property: "og:description", content: loaderData?.tagline ?? "Découvrez la collection Grand Line Kicks." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const related = PRODUCTS.filter((item) => item.id !== product.id).slice(0, 2);

  return (
    <main className="min-h-screen bg-background pb-20 pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <Link to="/boutique" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Retour à la boutique</Link>
        <div className="mt-7 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-lg" style={{ backgroundColor: `${product.tint}18` }}>
            <img src={product.bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <img src={product.image} alt={`Air Max Plus ${product.name}`} className="relative z-10 h-full w-full object-contain p-8 sm:p-14" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">Inspirée de {product.character} · {product.volume}</p>
            <h1 className="mt-3 text-4xl font-bold uppercase sm:text-6xl" style={{ fontFamily: "Anton, sans-serif" }}>{product.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl font-bold">{formatDA(product.price)}</span>
              {product.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatDA(product.oldPrice)}</span>}
            </div>
            <p className="mt-6 leading-7 text-muted-foreground">{product.description}</p>
            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              {product.details.map((detail) => <li key={detail} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0" />{detail}</li>)}
            </ul>
            <ProductPurchase product={product} />
            <div className="mt-6 flex flex-wrap gap-5 border-t border-border pt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><Truck size={17} /> Livraison 58 wilayas</span>
              <span className="flex items-center gap-2"><ShieldCheck size={17} /> Paiement à la livraison</span>
            </div>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="text-3xl font-bold uppercase" style={{ fontFamily: "Anton, sans-serif" }}>Tu aimeras aussi</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </section>
      </div>
    </main>
  );
}

function ProductNotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center"><h1 className="text-4xl font-bold">Modèle introuvable</h1><Link to="/boutique" className="mt-5 underline">Voir la boutique</Link></main>;
}