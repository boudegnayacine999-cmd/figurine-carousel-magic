import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [
    { title: "Notre univers — Grand Line Kicks" },
    { name: "description", content: "Découvrez l'univers et la vision de Grand Line Kicks." },
    { property: "og:title", content: "Notre univers — Grand Line Kicks" },
    { property: "og:description", content: "Des sneakers qui transforment les pouvoirs légendaires en couleurs et détails uniques." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-5 pb-24 pt-32 text-white sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase text-white/55">Notre univers</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold uppercase leading-none sm:text-8xl" style={{ fontFamily: "Anton, sans-serif" }}>Chaque paire porte un pouvoir.</h1>
        <div className="mt-14 grid gap-8 text-white/70 md:grid-cols-2 md:text-lg">
          <p>Grand Line Kicks imagine des éditions limitées où les couleurs, les matières et les détails racontent l’énergie d’un personnage et de son fruit du démon.</p>
          <p>Notre collection réunit trois identités fortes : l’élasticité de Luffy, le feu d’Ace et la précision de Law.</p>
        </div>
        <Button asChild className="mt-12 h-12 rounded-full px-7 uppercase"><Link to="/boutique">Découvrir la collection <ArrowRight /></Link></Button>
      </div>
    </main>
  );
}