import videoBg from "@/assets/hero-bg-2.mp4.asset.json";

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`,
  );

export default function Hero() {
  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
        <video
          key={videoBg.url}
          src={videoBg.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, animation: "videoIn 1400ms cubic-bezier(0.4,0,0.2,1) both" }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            backgroundImage: `url("${GRAIN_SVG}")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
            opacity: 0.35,
          }}
        />
      </div>

      <style>{`
        @keyframes videoIn {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
