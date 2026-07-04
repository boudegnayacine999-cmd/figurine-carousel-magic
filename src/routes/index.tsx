import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import honeyBottle from "@/assets/honey-touch-bottle.png.asset.json";
import sweetBottle from "@/assets/sweet-dreams-bottle.png.asset.json";
import honeyBg from "@/assets/honey-touch-bg.jpg.asset.json";
import sweetBg from "@/assets/sweet-dreams-bg.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

type Product = {
  name: string;
  tagline: string;
  bottle: string;
  bg: string;
  tint: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Sweet Dreams",
    tagline: "Zhūhūr · Fawākih · Inti‘āsh",
    bottle: sweetBottle.url,
    bg: sweetBg.url,
    tint: "#E88BB0",
  },
  {
    name: "Honey Touch",
    tagline: "Vanilla · Honey · Warmth",
    bottle: honeyBottle.url,
    bg: honeyBg.url,
    tint: "#D9A25A",
  },
];

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`
  );

function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverDiscover, setHoverDiscover] = useState(false);
  const [hoverBtn, setHoverBtn] = useState<"prev" | "next" | null>(null);

  useEffect(() => {
    PRODUCTS.forEach((p) => {
      [p.bottle, p.bg].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = (dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((p) =>
      dir === "next"
        ? (p + 1) % PRODUCTS.length
        : (p + PRODUCTS.length - 1) % PRODUCTS.length,
    );
    window.setTimeout(() => setIsAnimating(false), 800);
  };

  const easing = "cubic-bezier(0.4,0,0.2,1)";
  const active = PRODUCTS[activeIndex];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: active.tint,
        transition: `background-color 800ms ${easing}`,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
        {/* Full-screen background layers (crossfade) */}
        {PRODUCTS.map((p, i) => (
          <div
            key={p.bg}
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${p.bg}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === activeIndex ? 1 : 0,
              transform: i === activeIndex ? "scale(1)" : "scale(1.06)",
              transition: `opacity 800ms ${easing}, transform 1200ms ${easing}`,
              zIndex: 1,
            }}
          />
        ))}

        {/* Vignette for legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: `url("${GRAIN_SVG}")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            opacity: 0.4,
          }}
        />

        {/* Ghost product name */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 3, top: "10%" }}
        >
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(70px, 16vw, 240px)",
              fontWeight: 900,
              color: "#ffffff",
              opacity: 0.22,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
              margin: 0,
              textShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            {active.name}
          </h1>
        </div>

        {/* Brand */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
          style={{ zIndex: 60, color: "#fff", opacity: 0.95, letterSpacing: "0.28em" }}
        >
          AV · PARFUMS
        </div>

        {/* Foreground floating bottles (crossfade) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20 }}
        >
          {PRODUCTS.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <img
                key={p.bottle}
                src={p.bottle}
                alt={p.name}
                draggable={false}
                className="floating-bottle"
                style={{
                  position: "absolute",
                  height: isMobile ? "62%" : "85%",
                  width: "auto",
                  objectFit: "contain",
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.92)",
                  transition: `opacity 700ms ${easing}, transform 800ms ${easing}`,
                  filter:
                    "drop-shadow(0 40px 40px rgba(0,0,0,0.35)) drop-shadow(0 15px 20px rgba(0,0,0,0.25))",
                  willChange: "transform, opacity",
                }}
              />
            );
          })}
        </div>

        {/* Bottom-left text + nav */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <h2
            className="mb-2 sm:mb-3 text-base sm:text-[22px] font-bold uppercase tracking-widest"
            style={{ color: "#fff", opacity: 0.95, letterSpacing: "0.08em" }}
          >
            {active.name}
          </h2>
          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: "#fff", opacity: 0.85, lineHeight: 1.6 }}
          >
            Brume parfumée — 200ml. {active.tagline}. Une signature olfactive
            enveloppante à porter comme un souvenir.
          </p>
          <div className="flex gap-3">
            {(["prev", "next"] as const).map((dir) => {
              const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
              const hovered = hoverBtn === dir;
              return (
                <button
                  key={dir}
                  aria-label={dir === "prev" ? "Previous" : "Next"}
                  onClick={() => navigate(dir)}
                  onMouseEnter={() => setHoverBtn(dir)}
                  onMouseLeave={() => setHoverBtn(null)}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: hovered ? "rgba(255,255,255,0.12)" : "transparent",
                    border: "2px solid #fff",
                    color: "#fff",
                    transform: hovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 150ms, background-color 150ms",
                  }}
                >
                  <Icon size={26} strokeWidth={2.25} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom-right discover */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10"
          style={{ zIndex: 60 }}
        >
          <a
            href="#"
            onMouseEnter={() => setHoverDiscover(true)}
            onMouseLeave={() => setHoverDiscover(false)}
            className="flex items-center"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(20px, 4vw, 56px)",
              fontWeight: 400,
              color: "#fff",
              opacity: hoverDiscover ? 1 : 0.95,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 200ms",
            }}
          >
            DISCOVER IT
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 ml-2" strokeWidth={2.25} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes floatBottle {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -14px; }
        }
        .floating-bottle {
          animation: floatBottle 5.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
