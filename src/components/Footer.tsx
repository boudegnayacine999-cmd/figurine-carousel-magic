import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-3 px-6 py-10 text-sm">
          {[
            { Icon: Truck, t: "Livraison 58 wilayas", d: "Expédition sous 24-48h" },
            { Icon: ShieldCheck, t: "Paiement à la livraison", d: "Vous payez à la réception" },
            { Icon: RotateCcw, t: "Échange 7 jours", d: "Taille non adaptée ? On échange" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex items-start gap-3">
              <Icon size={22} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">{t}</p>
                <p className="text-white/60">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-4 px-6 py-12 text-sm">
        <div className="sm:col-span-2">
          <p className="font-bold uppercase tracking-[0.28em]">Grand Line Kicks</p>
          <p className="mt-3 max-w-sm text-white/60 leading-relaxed">
            Sneakers Air Max Plus en éditions limitées inspirées des fruits du démon.
            Livraison partout en Algérie, paiement à la livraison.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
              <Facebook size={18} />
            </a>
            <a href="tel:+213000000000" aria-label="Téléphone" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
              <Phone size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold uppercase tracking-widest text-xs text-white/50">Modèles</p>
          <ul className="mt-4 space-y-2">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link to="/produit/$slug" params={{ slug: p.id }} className="text-white/75 hover:text-white transition">
                  {p.fruit}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold uppercase tracking-widest text-xs text-white/50">Navigation</p>
          <ul className="mt-4 space-y-2">
            <li><Link to="/boutique" className="text-white/75 hover:text-white transition">Boutique</Link></li>
            <li><Link to="/a-propos" className="text-white/75 hover:text-white transition">À propos</Link></li>
            <li><Link to="/contact" className="text-white/75 hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Grand Line Kicks. Éditions non officielles inspirées de l'univers pirate.
      </div>
    </footer>
  );
}
