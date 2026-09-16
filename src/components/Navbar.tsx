import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/boutique", label: "Boutique" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const { count, toggleCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-black/25 border-b border-white/15"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 h-14 sm:h-16">
        <Link
          to="/"
          className="text-white font-bold uppercase tracking-[0.28em] text-xs sm:text-sm"
        >
          Grand Line Kicks
        </Link>

        <div className="hidden md:flex items-center gap-8 text-white/90 text-sm uppercase tracking-widest">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-white font-semibold" }}
              className="hover:text-white transition"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleCart}
            aria-label="Ouvrir le panier"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition"
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {count > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-[11px] font-bold flex items-center justify-center bg-white text-black"
                style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-md">
          <div className="flex flex-col px-6 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-white/90 text-sm uppercase tracking-widest"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
