import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useVibeTheme } from "@/hooks/useVibeTheme";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const MOODS = [
  { emoji: "💀", label: "dead rn" },
  { emoji: "🌸", label: "soft era" },
  { emoji: "✨", label: "that girl" },
  { emoji: "🥰", label: "main character" },
  { emoji: "😤", label: "not it rn" },
];

export default function CheckIn() {
  const [mood, setMood] = useLocalStorage("todayMood", "");
  const [userName] = useLocalStorage("userName", "");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const name = userName || "bestie";
  const t = useVibeTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col" style={{ background: t.pageBg }}>
      <div className="container mx-auto p-4 md:p-8 max-w-2xl flex flex-col justify-center py-16">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl text-center space-y-6 shadow-sm"
              style={{ background: t.cardBg, border: `1.5px solid ${t.cardBorder}` }}
            >
              <div className="text-6xl">💖</div>
              <h2 className="text-3xl font-serif font-bold" style={{ color: t.text }}>
                proud of you, {name} 💕
              </h2>
              <p className="text-xl" style={{ color: t.subtext }}>
                you showed up today and that's everything.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ borderColor: t.accent, color: t.accent, background: "transparent" }}
              >
                log another entry
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 md:p-10 rounded-3xl shadow-sm"
              style={{ background: t.cardBg, border: `1.5px solid ${t.cardBorder}` }}
            >
              <h1 className="text-3xl font-serif font-bold mb-8 text-center" style={{ color: t.text }}>
                Daily Check-In ✨
              </h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-base font-medium" style={{ color: t.subtext }}>
                    how are you feeling today?
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {MOODS.map((m) => {
                      const selected = mood === m.emoji;
                      return (
                        <motion.button
                          key={m.emoji}
                          type="button"
                          whileHover={{ scale: 1.07 }}
                          whileTap={{ scale: 0.93 }}
                          onClick={() => setMood(m.emoji)}
                          className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all"
                          style={{
                            background: selected ? `${t.accent}22` : t.inputBg,
                            border: `2px solid ${selected ? t.accent : "transparent"}`,
                            boxShadow: selected ? `0 2px 8px ${t.accent}30` : "none",
                          }}
                        >
                          <span className="text-4xl leading-none">{m.emoji}</span>
                          <span
                            className="text-xs font-medium text-center leading-tight"
                            style={{ color: selected ? t.accent : t.subtext }}
                          >
                            {m.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-base font-medium" style={{ color: t.subtext }}>
                    what's one thing you did for yourself today?
                  </label>
                  <input
                    type="text"
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                    placeholder="I took a nice long shower..."
                    className="w-full rounded-xl px-4 py-3.5 text-base border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: t.inputBg,
                      borderColor: t.cardBorder,
                      color: t.text,
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-base font-medium" style={{ color: t.subtext }}>
                    what made you smile?
                  </label>
                  <input
                    type="text"
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                    placeholder="A cute dog on my walk..."
                    className="w-full rounded-xl px-4 py-3.5 text-base border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: t.inputBg,
                      borderColor: t.cardBorder,
                      color: t.text,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!mood}
                  className="w-full py-4 text-lg rounded-xl font-semibold transition-all disabled:opacity-40"
                  style={{ background: t.buttonBg, color: t.buttonText }}
                >
                  log my glow ✨
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
