import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import honeyTouch from "@/assets/honey-touch.png.asset.json";
import sweetDreams from "@/assets/sweet-dreams.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const IMAGES = [
  { src: honeyTouch.url, bg: "#D9A25A", panel: "#E6B978" },
  { src: sweetDreams.url, bg: "#E88BB0", panel: "#F0A6C4" },
  { src: honeyTouch.url, bg: "#C98A44", panel: "#DAA35C" },
  { src: sweetDreams.url, bg: "#D97AA0", panel: "#E89BB8" },
];

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`
  );

type Role = "center" | "left" | "right" | "back";

function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverDiscover, setHoverDiscover] = useState(false);
  const [hoverBtn, setHoverBtn] = useState<"prev" | "next" | null>(null);

  useEffect(() => {
    IMAGES.forEach((i) => {
      const img = new Image();
      img.src = i.src;
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
    setActiveIndex((p) => (dir === "next" ? (p + 1) % 4 : (p + 3) % 4));
    window.setTimeout(() => setIsAnimating(false), 650);
  };

  const roleFor = (i: number): Role => {
    if (i === activeIndex) return "center";
    if (i === (activeIndex + 3) % 4) return "left";
    if (i === (activeIndex + 1) % 4) return "right";
    return "back";
  };

  const roleStyle = (role: Role): React.CSSProperties => {
    switch (role) {
      case "center":
        return {
          left: "50%",
          bottom: isMobile ? "22%" : 0,
          height: isMobile ? "60%" : "92%",
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
        };
      case "left":
        return {
          left: isMobile ? "20%" : "30%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        };
      case "right":
        return {
          left: isMobile ? "80%" : "70%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        };
      case "back":
        return {
          left: "50%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "13%" : "22%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
        };
    }
  };

  const transition =
    "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
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

        {/* Ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: "18%" }}
        >
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(90px, 28vw, 380px)",
              fontWeight: 900,
              color: "#ffffff",
              opacity: 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            3D SHAPE
          </h1>
        </div>

        {/* Brand */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
          style={{ zIndex: 60, color: "#fff", opacity: 0.9, letterSpacing: "0.18em" }}
        >
          TOONHUB
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((img, i) => {
            const role = roleFor(i);
            const s = roleStyle(role);
            return (
              <div
                key={img.src}
                style={{
                  position: "absolute",
                  aspectRatio: "0.6 / 1",
                  transition,
                  willChange: "transform, filter, opacity",
                  ...s,
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                  }}
                />
              </div>
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
            style={{ color: "#fff", opacity: 0.95, letterSpacing: "0.02em" }}
          >
            TOONHUB FIGURINES
          </h2>
          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: "#fff", opacity: 0.85, lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
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
    </div>
  );
}
