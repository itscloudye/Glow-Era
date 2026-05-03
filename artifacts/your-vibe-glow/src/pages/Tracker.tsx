import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useVibeTheme } from "@/hooks/useVibeTheme";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Plus, X, Lightbulb } from "lucide-react";

type Habit = {
  id: string;
  name: string;
  completed: boolean;
  custom?: boolean;
};

type CategoryConfig = {
  emoji: string;
  tip: string;
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  Hair: {
    emoji: "💇‍♀️",
    tip: "Deep conditioning once a week keeps your strands silky and strong — try leaving it on for 30 mins under a shower cap!",
  },
  Skin: {
    emoji: "🧴",
    tip: "Never skip SPF — even on cloudy days. It's the #1 anti-aging secret your future self will thank you for.",
  },
  Health: {
    emoji: "🧘‍♀️",
    tip: "Even 10 minutes of movement counts. A walk, stretching, dancing in your room — your body loves it all.",
  },
  Creativity: {
    emoji: "🎨",
    tip: "Creativity feeds the soul. Even 5 minutes of doodling in a notebook can spark something beautiful.",
  },
  Spiritual: {
    emoji: "🕊️",
    tip: "Starting your morning with 5 minutes of quiet gratitude shifts your entire day's energy.",
  },
};

const DEFAULT_HABITS: Record<string, Habit[]> = {
  Hair: [
    { id: "h1", name: "Deep condition", completed: false },
    { id: "h2", name: "Silk wrap at night", completed: false },
    { id: "h3", name: "Scalp massage", completed: false },
    { id: "h4", name: "No heat day", completed: false },
  ],
  Skin: [
    { id: "s1", name: "Double cleanse", completed: false },
    { id: "s2", name: "SPF application", completed: false },
    { id: "s3", name: "Sheet mask", completed: false },
    { id: "s4", name: "Stay hydrated", completed: false },
  ],
  Health: [
    { id: "he1", name: "8 glasses water", completed: false },
    { id: "he2", name: "30 min movement", completed: false },
    { id: "he3", name: "8 hours sleep", completed: false },
    { id: "he4", name: "5 min meditation", completed: false },
  ],
  Creativity: [
    { id: "c1", name: "Sketch or journal", completed: false },
    { id: "c2", name: "Watch inspo content", completed: false },
    { id: "c3", name: "Practice a skill", completed: false },
    { id: "c4", name: "ypur pintrest board update", completed: false },
  ],
  Spiritual: [
    { id: "sp1", name: "Morning prayer", completed: false },
    { id: "sp2", name: "Gratitude reflection", completed: false },
    { id: "sp3", name: "Quiet time", completed: false },
    { id: "sp4", name: "Affirmations", completed: false },
  ],
};

function HeartSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <path
        d="M60 95 C60 95 10 60 10 30 C10 15 22 5 35 5 C45 5 54 11 60 18 C66 11 75 5 85 5 C98 5 110 15 110 30 C110 60 60 95 60 95Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

function HeartCard({
  category,
  habits,
  config,
  accent,
  cardBg,
  cardBorder,
  text,
  subtext,
  inputBg,
  isDark,
  onToggle,
  onAdd,
  onRemove,
  index,
}: {
  category: string;
  habits: Habit[];
  config: CategoryConfig;
  accent: string;
  cardBg: string;
  cardBorder: string;
  text: string;
  subtext: string;
  inputBg: string;
  isDark: boolean;
  onToggle: (id: string) => void;
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  index: number;
}) {
  const [inputVal, setInputVal] = useState("");
  const [showTip, setShowTip] = useState(false);
  const completed = habits.filter((h) => h.completed).length;
  const total = habits.length;

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputVal("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.07 }}
      className="relative rounded-3xl overflow-hidden shadow-sm"
      style={{ background: cardBg, border: `1.5px solid ${cardBorder}` }}
    >
      {/* Decorative heart watermark */}
      <div className="absolute -top-4 right-6 w-28 h-28 pointer-events-none opacity-15 select-none">
        <HeartSVG color={accent} />
      </div>

      {/* Card header */}
      <div className="relative px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0">
              <HeartSVG color={accent} />
            </div>
            <span className="relative z-10 text-xl leading-none">{config.emoji}</span>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold" style={{ color: text }}>{category}</h2>
            <p className="text-sm" style={{ color: subtext }}>{completed}/{total} done</p>
          </div>
        </div>

        {/* Heart progress indicators */}
        <div className="flex gap-1 flex-wrap justify-end max-w-[120px]">
          {habits.map((h) => (
            <div key={h.id} className="w-4 h-4 transition-all duration-300">
              <HeartSVG color={h.completed ? accent : isDark ? "#ffffff22" : "#E5E5E5"} />
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px mb-5" style={{ background: `${accent}40` }} />

      {/* Checklist */}
      <div className="px-6 space-y-3">
        {habits.map((habit, i) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 + 0.1 }}
            className="flex items-center gap-3 group"
          >
            <button
              type="button"
              onClick={() => onToggle(habit.id)}
              className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
              style={{
                borderColor: habit.completed ? accent : isDark ? "#ffffff40" : "#D1D5DB",
                background: habit.completed ? accent : "transparent",
              }}
            >
              {habit.completed && (
                <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} viewBox="0 0 12 10" fill="none" className="w-3.5 h-3.5">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              )}
            </button>

            <span
              className="flex-1 text-base font-medium transition-all duration-200"
              style={{
                color: habit.completed ? subtext : text,
                textDecoration: habit.completed ? "line-through" : "none",
                opacity: habit.completed ? 0.65 : 1,
              }}
            >
              {habit.name}
            </span>

            <button
              type="button"
              onClick={() => onRemove(habit.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full"
              style={{ color: subtext }}
              aria-label={`Delete goal ${habit.name}`}
            >
              <X size={14} />
            </button>

            {habit.completed && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-base">✨</motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add custom goal */}
      <div className="px-6 mt-5">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="add your own goal..."
            maxLength={60}
            className="flex-1 rounded-full px-4 py-2.5 text-sm border focus:outline-none focus:ring-2 transition-all"
            style={{ background: inputBg, borderColor: `${accent}40`, color: text }}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!inputVal.trim()}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
            style={{ background: accent }}
          >
            <Plus size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Tip toggle */}
      <div className="px-6 pb-6 mt-4">
        <button
          type="button"
          onClick={() => setShowTip(!showTip)}
          className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75"
          style={{ color: accent }}
        >
          <Lightbulb size={15} />
          {showTip ? "hide tip" : "glow tip ✨"}
        </button>

        {showTip && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 text-sm leading-relaxed italic pl-5 border-l-2"
            style={{ color: subtext, borderColor: accent }}
          >
            {config.tip}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default function Tracker() {
  const todayKey = `tracker_${format(new Date(), "yyyy-MM-dd")}`;
  const [habitsData, setHabitsData] = useLocalStorage<Record<string, Habit[]>>(todayKey, DEFAULT_HABITS);
  const t = useVibeTheme();

  let total = 0;
  let completedCount = 0;
  Object.values(habitsData).forEach((list) => {
    list.forEach((h) => {
      total++;
      if (h.completed) completedCount++;
    });
  });
  const glowScore = Math.round((completedCount / total) * 100) || 0;

  const [, setGlowLevel] = useLocalStorage("glowLevel", 0);
  useEffect(() => {
    setGlowLevel(glowScore);
  }, [glowScore, setGlowLevel]);

  const toggleHabit = (category: string, habitId: string) => {
    setHabitsData((prev) => ({
      ...prev,
      [category]: prev[category].map((h) =>
        h.id === habitId ? { ...h, completed: !h.completed } : h
      ),
    }));
  };

  const addHabit = (category: string, name: string) => {
    setHabitsData((prev) => ({
      ...prev,
      [category]: [
        ...prev[category],
        { id: `${category}_custom_${Date.now()}`, name, completed: false, custom: true },
      ],
    }));
  };

  const removeHabit = (category: string, habitId: string) => {
    setHabitsData((prev) => ({
      ...prev,
      [category]: prev[category].filter((h) => h.id !== habitId),
    }));
  };

  return (
    <div className="w-full" style={{ background: t.pageBg }}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-serif font-bold mb-1" style={{ color: t.text }}>
            Glow Up Tracker ✨
          </h1>
          <p style={{ color: t.subtext }}>Small steps every day 💕</p>

          <div
            className="inline-flex items-center gap-3 mt-5 px-6 py-3 rounded-2xl shadow-sm"
            style={{ background: t.cardBg, border: `1.5px solid ${t.cardBorder}` }}
          >
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke={`${t.accent}30`} strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke={t.accent} strokeWidth="3"
                  strokeDasharray={`${(glowScore / 100) * 94.2} 94.2`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: t.accent }}>
                {glowScore}%
              </span>
            </div>
            <div className="text-left">
              <div className="text-sm" style={{ color: t.subtext }}>today's glow score</div>
              <div className="text-lg font-bold" style={{ color: t.accent }}>
                {glowScore === 100 ? "iconic 👑" : glowScore >= 60 ? "glowing 🌟" : glowScore >= 30 ? "building ✨" : "starting 🌱"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Heart cards */}
        <div className="space-y-8">
          {Object.entries(habitsData).map(([category, habits], index) => {
            const config = CATEGORY_CONFIG[category] ?? { emoji: "⭐", tip: "You're doing amazing — keep going!" };
            return (
              <HeartCard
                key={category}
                category={category}
                habits={habits}
                config={config}
                index={index}
                accent={t.accent}
                cardBg={t.cardBg}
                cardBorder={t.cardBorder}
                text={t.text}
                subtext={t.subtext}
                inputBg={t.inputBg}
                isDark={t.isDark}
                onToggle={(id) => toggleHabit(category, id)}
                onAdd={(name) => addHabit(category, name)}
                onRemove={(id) => removeHabit(category, id)}
              />
            );
          })}
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
