import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AV Parfums — Brumes Sweet Dreams, Honey Touch, Dziria" },
      {
        name: "description",
        content:
          "Brumes parfumées 250ml : Sweet Dreams, Honey Touch, Dziria et Afro Passion. Livraison partout en Algérie, paiement à la livraison.",
      },
      { property: "og:title", content: "AV Parfums — Brumes parfumées de luxe" },
      {
        property: "og:description",
        content:
          "Découvrez nos brumes : Sweet Dreams, Honey Touch, Dziria, Afro Passion. Paiement à la livraison en Algérie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Hero />;
}
