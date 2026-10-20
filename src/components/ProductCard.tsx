import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { formatDA } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
      <Link
        to="/produit/$slug"
        params={{ slug: product.id }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
        
      >
        <img
          src={product.image}
          alt={`Brume ${product.name}`}
          loading="lazy"
          className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase backdrop-blur">
          {product.volume}
        </span>
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase text-muted-foreground">{product.tagline}</p>
        <Link to="/produit/$slug" params={{ slug: product.id }} className="mt-1 block text-xl font-bold uppercase">
          {product.name}
        </Link>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-bold">{formatDA(product.price)}</p>
            {product.oldPrice && <p className="text-xs text-muted-foreground line-through">{formatDA(product.oldPrice)}</p>}
          </div>
          <Button
            onClick={() => add(product)}
            className="h-10 rounded-full px-4 text-xs font-bold uppercase"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <Plus /> Ajouter
          </Button>
        </div>

      </div>
    </article>
  );
}