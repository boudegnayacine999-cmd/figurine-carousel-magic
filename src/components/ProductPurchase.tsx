import { useState } from "react";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes.includes(42) ? 42 : product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (next: number) => setQuantity(Math.max(1, Math.floor(next || 1)));

  return (
    <div className="mt-8 space-y-6">
      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase">Choisir la pointure</legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((value) => (
            <Button
              key={value}
              type="button"
              variant={size === value ? "default" : "outline"}
              onClick={() => setSize(value)}
              className="h-11 min-w-11"
              aria-pressed={size === value}
            >
              {value}
            </Button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 w-full items-center overflow-hidden rounded-md border border-input sm:w-36">
          <Button type="button" variant="ghost" size="icon" className="h-12 w-12 shrink-0" onClick={() => updateQuantity(quantity - 1)} aria-label="Diminuer la quantité">
            <Minus />
          </Button>
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => updateQuantity(Number(event.target.value))}
            aria-label="Quantité"
            className="h-12 min-w-0 border-0 px-1 text-center shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button type="button" variant="ghost" size="icon" className="h-12 w-12 shrink-0" onClick={() => updateQuantity(quantity + 1)} aria-label="Augmenter la quantité">
            <Plus />
          </Button>
        </div>
        <Button onClick={() => add(product, size, quantity)} className="h-12 flex-1 rounded-full font-bold uppercase">
          <ShoppingBag /> Ajouter au panier
        </Button>
      </div>

      <Button onClick={() => add(product, size, quantity)} variant="outline" className="h-12 w-full rounded-full font-bold uppercase">
        <Zap /> Acheter maintenant
      </Button>
    </div>
  );
}