import OrnateCorner from "./OrnateCorner";

interface CardContentProps {
  isVisible: boolean;
}

export default function CardContent({ isVisible }: CardContentProps) {
  return (
    <div
      className={`relative bg-zinc-900 border-2 border-purple-900/50 rounded-lg p-8 w-80 min-h-96 transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{
        boxShadow: "0 0 30px rgba(126, 34, 206, 0.2)",
      }}
    >
      {/* Ornate corners */}
      <OrnateCorner position="top-left" />
      <OrnateCorner position="top-right" />
      <OrnateCorner position="bottom-left" />
      <OrnateCorner position="bottom-right" />

      {/* Card content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6 py-8">
        <h2 className="text-2xl font-serif text-purple-400">My Dearest</h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-700 to-transparent" />
        <p className="text-zinc-300 leading-relaxed font-light italic px-4">
          Through shadows deep and moonlit nights,
          <br />
          My heart beats only for your light.
          <br />
          In darkness, you&apos;re my guiding star,
          <br />
          My love for you knows no bounds, near or far.
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-700 to-transparent" />
        <p className="text-purple-500 font-serif text-lg">Forever Yours</p>
      </div>
    </div>
  );
}
