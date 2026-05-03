import { COVER_OPTIONS } from "@/pages/Journal";

interface JournalBookProps {
  coverColor: string;
  className?: string;
}

export function JournalBook({ coverColor, className = "" }: JournalBookProps) {
  const cover = COVER_OPTIONS.find((c) => c.id === coverColor) ?? COVER_OPTIONS[2];

  return (
    <div className={`relative flex ${className}`} style={{ width: 72, height: 92 }}>
      {/* Spine */}
      <div
        className="rounded-l-sm shrink-0 relative overflow-hidden"
        style={{
          width: 14,
          background: `linear-gradient(to right, ${cover.spine}, ${cover.bg}cc)`,
          boxShadow: "inset -1px 0 2px rgba(0,0,0,0.18)",
        }}
      >
        <div className="absolute left-1 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
      </div>

      {/* Front cover */}
      <div
        className="flex-grow rounded-r-lg flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${cover.bg}ee 0%, ${cover.bg} 100%)`,
          boxShadow: "2px 3px 12px rgba(0,0,0,0.22)",
        }}
      >
        {/* Texture lines */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,0,0,0.15) 6px, rgba(0,0,0,0.15) 7px)`,
          }}
        />
        {/* Inner border */}
        <div
          className="absolute inset-1.5 rounded pointer-events-none"
          style={{ border: `1px solid ${cover.text}30` }}
        />
        {/* Title */}
        <div className="relative z-10 flex flex-col items-center gap-0.5">
          <span className="text-xs" style={{ color: cover.text }}>✦</span>
          <span
            className="font-serif text-[10px] font-semibold text-center leading-tight px-1"
            style={{ color: cover.text }}
          >
            My<br />Journal
          </span>
          <span className="text-xs" style={{ color: cover.text }}>✦</span>
        </div>
      </div>

      {/* Page edges (right side stacked pages effect) */}
      <div
        className="absolute right-0 top-1 bottom-1 flex flex-col justify-between"
        style={{ width: 3 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-1 mx-px" style={{ background: "#f5f0e8", opacity: 0.9 - i * 0.1 }} />
        ))}
      </div>
    </div>
  );
}
