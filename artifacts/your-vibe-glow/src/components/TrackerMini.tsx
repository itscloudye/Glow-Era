import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format } from "date-fns";

type Habit = { id: string; name: string; completed: boolean };

const CATEGORY_EMOJIS: Record<string, string> = {
  Hair: "💇‍♀️",
  Skin: "🧴",
  Health: "🧘‍♀️",
  Creativity: "🎨",
  Spiritual: "🕊️",
};

const DEFAULT_HABITS: Record<string, Habit[]> = {
  Hair:       [{ id:"h1",name:"",completed:false},{id:"h2",name:"",completed:false},{id:"h3",name:"",completed:false},{id:"h4",name:"",completed:false}],
  Skin:       [{ id:"s1",name:"",completed:false},{id:"s2",name:"",completed:false},{id:"s3",name:"",completed:false},{id:"s4",name:"",completed:false}],
  Health:     [{ id:"he1",name:"",completed:false},{id:"he2",name:"",completed:false},{id:"he3",name:"",completed:false},{id:"he4",name:"",completed:false}],
  Creativity: [{ id:"c1",name:"",completed:false},{id:"c2",name:"",completed:false},{id:"c3",name:"",completed:false},{id:"c4",name:"",completed:false}],
  Spiritual:  [{ id:"sp1",name:"",completed:false},{id:"sp2",name:"",completed:false},{id:"sp3",name:"",completed:false},{id:"sp4",name:"",completed:false}],
};

function MiniHeart({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg viewBox="0 0 20 18" width="8" height="7" aria-hidden="true">
      <path
        d="M10 16 C10 16 1 10 1 5 C1 2.5 3 1 5.5 1 C7.2 1 8.8 2 10 3.2 C11.2 2 12.8 1 14.5 1 C17 1 19 2.5 19 5 C19 10 10 16 10 16Z"
        fill={filled ? color : "none"}
        stroke={filled ? color : "#d1d5db"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

interface TrackerMiniProps {
  accentColor?: string;
  className?: string;
}

export function TrackerMini({ accentColor = "#9B2555", className = "" }: TrackerMiniProps) {
  const todayKey = `tracker_${format(new Date(), "yyyy-MM-dd")}`;
  const [habitsData] = useLocalStorage<Record<string, Habit[]>>(todayKey, DEFAULT_HABITS);

  const categories = Object.keys(CATEGORY_EMOJIS);

  // Compute per-row fill ratio
  const rows = categories.map((cat) => {
    const list = habitsData[cat] ?? [];
    const done = list.filter((h) => h.completed).length;
    const total = list.length || 4;
    return { cat, done, total };
  });

  const totalHabits = rows.reduce((s, r) => s + r.total, 0);
  const totalDone = rows.reduce((s, r) => s + r.done, 0);
  const pct = Math.round((totalDone / totalHabits) * 100) || 0;

  return (
    <div className={`relative flex flex-col ${className}`} style={{ width: 72, height: 92 }}>
      {/* Clipboard clip */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 rounded-b-sm"
        style={{
          top: -5,
          width: 22,
          height: 10,
          background: accentColor,
          opacity: 0.85,
          borderRadius: "3px 3px 2px 2px",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 rounded-full"
        style={{
          top: -2,
          width: 10,
          height: 10,
          background: "#fff",
          border: `2px solid ${accentColor}`,
        }}
      />

      {/* Notepad body */}
      <div
        className="flex-1 rounded-b-lg rounded-t-sm flex flex-col overflow-hidden shadow-md"
        style={{
          background: "linear-gradient(160deg, #fff9fb 0%, #fff4f7 100%)",
          border: `1.5px solid ${accentColor}30`,
          marginTop: 4,
        }}
      >
        {/* Lined paper effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 rounded-b-lg"
          style={{
            backgroundImage: `repeating-linear-gradient(transparent, transparent 11px, #f0c0cc 11px, #f0c0cc 12px)`,
            backgroundPosition: "0 20px",
          }}
        />

        {/* Title bar */}
        <div
          className="relative z-10 flex items-center justify-center py-1.5"
          style={{ borderBottom: `1px solid ${accentColor}25` }}
        >
          <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
            Tracker
          </span>
        </div>

        {/* Category rows */}
        <div className="relative z-10 flex flex-col justify-around flex-1 px-2 py-1">
          {rows.map(({ cat, done, total }) => (
            <div key={cat} className="flex items-center gap-1">
              <span className="text-[9px] leading-none w-4">{CATEGORY_EMOJIS[cat]}</span>
              <div className="flex gap-0.5 flex-wrap">
                {Array.from({ length: total }).map((_, i) => (
                  <MiniHeart key={i} filled={i < done} color={accentColor} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Score bar */}
        <div className="relative z-10 px-2 pb-2">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${accentColor}20` }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: accentColor }}
            />
          </div>
          <div className="text-right mt-0.5">
            <span className="text-[8px] font-semibold" style={{ color: accentColor }}>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
