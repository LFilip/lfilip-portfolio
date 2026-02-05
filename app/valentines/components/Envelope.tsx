import WaxSeal from "./WaxSeal";
import CardContent from "./CardContent";
import HexOverlay from "./HexOverlay";

interface EnvelopeProps {
  isOpen: boolean;
  onSealClick: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
}

export default function Envelope({ isOpen, onSealClick, onSkip, showSkip = false }: EnvelopeProps) {
  return (
    <div className="relative" style={{ perspective: "1000px" }}>
      {/* Envelope body */}
      <div
        className={`relative bg-zinc-900 border w-96 h-64 rounded-lg shadow-2xl overflow-hidden transition-all duration-500 ${
          showSkip
            ? "border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-pulse-glow"
            : "border-zinc-800"
        }`}
      >
        {/* Inner shadow/texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/20 to-transparent rounded-lg" />

        {/* Hexagon pattern overlay - visual hint */}
        <HexOverlay />

        {/* Bottom flap (decorative) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "180px solid transparent",
            borderRight: "180px solid transparent",
            borderBottom: "100px solid rgb(24 24 27)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Top flap with 3D animation */}
      <div
        className={`absolute top-0 left-0 w-96 transition-transform duration-800 ease-in-out ${
          isOpen ? "envelope-flap-open" : ""
        }`}
        style={{
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          transform: isOpen ? "rotateX(-180deg)" : "rotateX(0deg)",
          transition: "transform 800ms ease-in-out",
        }}
        data-testid="envelope-flap"
      >
        {/* Flap front */}
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "192px solid transparent",
            borderRight: "192px solid transparent",
            borderTop: "120px solid rgb(39 39 42)",
            backfaceVisibility: "hidden",
          }}
        />
        {/* Flap back (visible when opened) */}
        <div
          className="absolute top-0 left-0 w-0 h-0"
          style={{
            borderLeft: "192px solid transparent",
            borderRight: "192px solid transparent",
            borderTop: "120px solid rgb(24 24 27)",
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* Wax seal - centered on envelope */}
      {!isOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <WaxSeal onClick={onSealClick} />
        </div>
      )}

      {/* Card content - appears when open */}
      {isOpen && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pt-4 z-10">
          <CardContent isVisible={isOpen} />
        </div>
      )}

      {/* Skip to quilt button - centered on envelope with purple glow */}
      {showSkip && onSkip && (
        <button
          onClick={onSkip}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-6 py-3 text-purple-300 font-medium rounded-lg bg-purple-950/80 border border-purple-500/50 hover:bg-purple-900/80 hover:border-purple-400/60 transition-all duration-300 animate-fade-in shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          aria-label="Skip to memory quilt"
        >
          See Memories
        </button>
      )}
    </div>
  );
}
