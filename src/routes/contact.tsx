import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Grand Line Kicks" },
    { name: "description", content: "Contactez Grand Line Kicks pour une question sur un modèle, une pointure ou une commande." },
    { property: "og:title", content: "Contact — Grand Line Kicks" },
    { property: "og:description", content: "Une question sur votre modèle ou votre commande ? Notre équipe vous répond." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase text-muted-foreground">Nous contacter</p>
        <h1 className="mt-3 text-5xl font-bold uppercase sm:text-7xl" style={{ fontFamily: "Anton, sans-serif" }}>Une question ?</h1>
        <p className="mt-5 max-w-xl text-muted-foreground">Pour une pointure, une livraison ou une commande, choisissez le moyen de contact qui vous convient.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <a href="mailto:contact@grandlinekicks.dz" className="rounded-lg border border-border p-7 transition hover:bg-muted"><Mail size={28} /><h2 className="mt-5 font-bold">E-mail</h2><p className="mt-1 text-sm text-muted-foreground">contact@grandlinekicks.dz</p></a>
          <div className="rounded-lg border border-border p-7"><MessageCircle size={28} /><h2 className="mt-5 font-bold">Commande</h2><p className="mt-1 text-sm text-muted-foreground">Ajoutez votre paire au panier : notre équipe vous appellera pour confirmer.</p></div>
        </div>
      </div>
    </main>
  );
}