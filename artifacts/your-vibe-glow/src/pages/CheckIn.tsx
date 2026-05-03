import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

const MOODS = ["😴", "🙂", "😊", "🥰", "💫", "😤", "😔"];

export default function CheckIn() {
  const [mood, setMood] = useLocalStorage("todayMood", "");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;
    setSubmitted(true);
    // Real app would save this to history
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl min-h-[80vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 rounded-3xl text-center space-y-6"
          >
            <div className="text-6xl">💖</div>
            <h2 className="text-3xl font-serif font-bold">proud of you bestie 💕</h2>
            <p className="text-xl text-muted-foreground">you showed up today and that's everything.</p>
            <Button variant="outline" className="mt-4 rounded-full" onClick={() => setSubmitted(false)}>
              log another entry
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card p-6 md:p-10 rounded-3xl border shadow-sm"
          >
            <h1 className="text-3xl font-serif font-bold mb-8 text-center">Daily Check-In ✨</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg">How are you feeling today?</Label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {MOODS.map((m) => (
                    <motion.button
                      key={m}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMood(m)}
                      className={`text-4xl p-3 rounded-full transition-colors ${
                        mood === m ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"
                      }`}
                    >
                      {m}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg">what's one thing you did for yourself today?</Label>
                <Input
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  placeholder="I took a nice long shower..."
                  className="text-base py-6 rounded-xl bg-background"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-lg">what made you smile?</Label>
                <Input
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  placeholder="A cute dog on my walk..."
                  className="text-base py-6 rounded-xl bg-background"
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
  );
}
