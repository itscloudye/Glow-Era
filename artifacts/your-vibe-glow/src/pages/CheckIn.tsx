import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "#F5F0E8" }}
    >
      <div className="container mx-auto p-4 md:p-8 max-w-2xl flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl text-center space-y-6"
              style={{ background: "#FFF8F0", border: "1px solid rgba(155,37,85,0.15)" }}
            >
              <div className="text-6xl">💖</div>
              <h2 className="text-3xl font-serif font-bold">proud of you, {name} 💕</h2>
              <p className="text-xl text-muted-foreground">you showed up today and that's everything.</p>
              <Button
                variant="outline"
                className="mt-4 rounded-full"
                onClick={() => setSubmitted(false)}
              >
                log another entry
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 md:p-10 rounded-3xl shadow-sm"
              style={{ background: "#FFF8F0", border: "1px solid rgba(155,37,85,0.12)" }}
            >
              <h1 className="text-3xl font-serif font-bold mb-8 text-center">Daily Check-In ✨</h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-lg">how are you feeling today?</Label>
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
                            background: selected ? "rgba(155,37,85,0.12)" : "rgba(255,255,255,0.7)",
                            border: selected
                              ? "2px solid rgba(155,37,85,0.5)"
                              : "2px solid transparent",
                            boxShadow: selected ? "0 2px 8px rgba(155,37,85,0.1)" : "none",
                          }}
                        >
                          <span className="text-4xl leading-none">{m.emoji}</span>
                          <span
                            className="text-xs font-medium text-center leading-tight"
                            style={{ color: selected ? "#9B2555" : "#888" }}
                          >
                            {m.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg">what's one thing you did for yourself today?</Label>
                  <Input
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                    placeholder="I took a nice long shower..."
                    className="text-base py-6 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.85)" }}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-lg">what made you smile?</Label>
                  <Input
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                    placeholder="A cute dog on my walk..."
                    className="text-base py-6 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.85)" }}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={!mood}
                  className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white"
                >
                  log my glow ✨
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
