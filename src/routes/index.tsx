import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  description: string;
  bottle: string;
  bg: string;
  tint: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Sweet Dreams",
    tagline: "Zhūhūr · Fawākih · Inti‘āsh",
    description:
      "Brume parfumée florale — pétales de rose, fruits rouges et une touche de musc pour une signature enveloppante.",
    bottle: sweetBottle.url,
    bg: sweetBg.url,
    tint: "#E88BB0",
  },
  {
    name: "Honey Touch",
    tagline: "Vanilla · Honey · Warmth",
    description:
      "Un sillage chaud et gourmand — miel doré, vanille bourbon et bois précieux pour une aura solaire.",
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
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverDiscover, setHoverDiscover] = useState(false);
  const [hoverBtn, setHoverBtn] = useState<"prev" | "next" | null>(null);
  const [ctaHover, setCtaHover] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wheelLock = useRef(false);
  const touchStartX = useRef<number | null>(null);

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
    setDirection(dir === "next" ? 1 : -1);
    setIsAnimating(true);
    setActiveIndex((p) =>
      dir === "next"
        ? (p + 1) % PRODUCTS.length
        : (p + PRODUCTS.length - 1) % PRODUCTS.length,
    );
    window.setTimeout(() => setIsAnimating(false), 850);
  };

  // Wheel navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20 && Math.abs(e.deltaX) < 20) return;
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      navigate(delta > 0 ? "next" : "prev");
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 900);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isAnimating]);

  // Touch / swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    navigate(dx < 0 ? "next" : "prev");
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate("next");
      else if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAnimating]);

  const easing = "cubic-bezier(0.4,0,0.2,1)";
  const active = PRODUCTS[activeIndex];

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: active.tint,
        transition: `background-color 800ms ${easing}`,
        fontFamily: "Inter, sans-serif",
        touchAction: "pan-y",
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
          style={{ zIndex: 3, top: isMobile ? "6%" : "10%" }}
        >
          <h1
            key={active.name + "-ghost"}
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: isMobile ? "clamp(56px, 22vw, 120px)" : "clamp(70px, 16vw, 240px)",
              fontWeight: 900,
              color: "#ffffff",
              opacity: isMobile ? 0.16 : 0.22,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
              margin: 0,
              textShadow: "0 8px 30px rgba(0,0,0,0.15)",
              animation: `ghostIn 700ms ${easing} both`,
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
            const enterFrom = direction === 1 ? 80 : -80;
            return (
              <img
                key={p.bottle}
                src={p.bottle}
                alt={p.name}
                draggable={false}
                className={isActive ? "floating-bottle" : ""}
                style={{
                  position: "absolute",
                  height: isMobile ? "55%" : "85%",
                  width: "auto",
                  objectFit: "contain",
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "translateY(0) scale(1)"
                    : `translateX(${enterFrom}px) translateY(20px) scale(0.9)`,
                  transition: `opacity 650ms ${easing}, transform 850ms ${easing}`,
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
          className="absolute left-4 right-4 bottom-6 sm:right-auto sm:bottom-20 sm:left-24 text-center sm:text-left"
          style={{ zIndex: 60, maxWidth: isMobile ? undefined : 320 }}
        >
          <h2
            className="mb-2 sm:mb-3 text-base sm:text-[22px] font-bold uppercase tracking-widest"
            style={{ color: "#fff", opacity: 0.95, letterSpacing: "0.08em" }}
          >
            {active.name}
          </h2>
          <p
            className="text-xs sm:text-sm mb-4 sm:mb-5 mx-auto sm:mx-0 max-w-xs sm:max-w-none"
            style={{ color: "#fff", opacity: 0.85, lineHeight: 1.6 }}
          >
            {active.description}
          </p>
          <div className="flex gap-3 justify-center sm:justify-start">
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
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: hovered ? active.tint : "transparent",
                    border: "2px solid #fff",
                    color: "#fff",
                    transform: hovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 200ms, background-color 250ms, box-shadow 250ms",
                    boxShadow: hovered ? `0 10px 30px ${active.tint}80` : "none",
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
          className="hidden sm:block absolute sm:bottom-20 sm:right-10"
          style={{ zIndex: 60, bottom: 24, right: 16 }}
        >
          <a
            href="#"
            onMouseEnter={() => setHoverDiscover(true)}
            onMouseLeave={() => setHoverDiscover(false)}
            className="flex items-center group"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(20px, 4vw, 56px)",
              fontWeight: 400,
              color: hoverDiscover ? active.tint : "#fff",
              opacity: hoverDiscover ? 1 : 0.95,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 200ms, color 250ms",
              textShadow: hoverDiscover ? "0 6px 24px rgba(0,0,0,0.35)" : "none",
            }}
          >
            DISCOVER IT
            <ArrowRight
              className="w-5 h-5 sm:w-8 sm:h-8 ml-2"
              strokeWidth={2.25}
              style={{
                transform: hoverDiscover ? "translateX(6px)" : "translateX(0)",
                transition: "transform 250ms",
              }}
            />
          </a>
        </div>

        {/* Mobile CTA */}
        <div
          className="sm:hidden absolute left-0 right-0 flex justify-center"
          style={{ zIndex: 60, bottom: 200 }}
        >
          <button
            onTouchStart={() => setCtaHover(true)}
            onTouchEnd={() => setCtaHover(false)}
            className="px-6 py-3 rounded-full text-xs uppercase font-semibold tracking-widest"
            style={{
              backgroundColor: ctaHover ? active.tint : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: "1.5px solid rgba(255,255,255,0.5)",
              color: "#fff",
              transition: `background-color 250ms ${easing}`,
              boxShadow: `0 8px 24px ${active.tint}50`,
            }}
          >
            Discover it →
          </button>
        </div>

        {/* Pagination dots */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex gap-2"
          style={{ zIndex: 60, top: 24 }}
        >
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                if (i === activeIndex || isAnimating) return;
                setDirection(i > activeIndex ? 1 : -1);
                setIsAnimating(true);
                setActiveIndex(i);
                window.setTimeout(() => setIsAnimating(false), 850);
              }}
              className="rounded-full"
              style={{
                width: i === activeIndex ? 28 : 8,
                height: 8,
                backgroundColor: i === activeIndex ? "#fff" : "rgba(255,255,255,0.5)",
                transition: `width 350ms ${easing}, background-color 350ms`,
              }}
            />
          ))}
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
        @keyframes ghostIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: var(--ghost-opacity, 0.22); transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
