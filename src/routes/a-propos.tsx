import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [
    { title: "Notre univers — Les Brumes" },
    { name: "description", content: "Découvrez l'univers et la vision de Les Brumes." },
    { property: "og:title", content: "Notre univers — Les Brumes" },
    { property: "og:description", content: "Quatre brumes et quatre ambiances : florale, dorée, solaire et tropicale." },
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
        <h1 className="mt-3 max-w-4xl text-5xl font-bold uppercase leading-none sm:text-8xl" style={{ fontFamily: "Anton, sans-serif" }}>À chaque brume, son univers.</h1>
        <div className="mt-14 grid gap-8 text-white/70 md:grid-cols-2 md:text-lg">
          <p>Des univers parfumés pour accompagner vos envies : la douceur des fleurs, la chaleur du miel, la lumière d’Alger ou l’évasion tropicale.</p>
          <p>Notre collection réunit Sweet Dreams, Honey Touch, Dziria et Afro Passion.</p>
        </div>
        <Button asChild className="mt-12 h-12 rounded-full px-7 uppercase"><Link to="/boutique">Découvrir la collection <ArrowRight /></Link></Button>
      </div>
    </main>
  );
}