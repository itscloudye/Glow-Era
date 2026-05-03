import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const QUESTIONS = [
  {
    question: "what's your vibe today, bestie? 💕",
    options: [
      { id: "a", text: "cozy & quiet", emoji: "☕", vibe: "Soft Glow" },
      { id: "b", text: "getting things done", emoji: "✨", vibe: "Clean Girl" },
      { id: "c", text: "mysterious & alluring", emoji: "🥀", vibe: "Dark Feminine" },
      { id: "d", text: "a little bit of everything", emoji: "☯️", vibe: "Balanced Muse" },
    ],
  },
  {
    question: "okay but what do you reach for first?",
    options: [
      { id: "a", text: "my favorite sweater", emoji: "🧶", vibe: "Soft Glow" },
      { id: "b", text: "my planner", emoji: "📅", vibe: "Clean Girl" },
      { id: "c", text: "my signature perfume", emoji: "🖤", vibe: "Dark Feminine" },
      { id: "d", text: "my headphones", emoji: "🎧", vibe: "Balanced Muse" },
    ],
  },
  {
    question: "your ideal saturday looks like...",
    options: [
      { id: "a", text: "baking & reading in bed", emoji: "📖", vibe: "Soft Glow" },
      { id: "b", text: "farmer's market & pilates", emoji: "🌿", vibe: "Clean Girl" },
      { id: "c", text: "late dinner in the city", emoji: "🍷", vibe: "Dark Feminine" },
      { id: "d", text: "going wherever the wind takes me", emoji: "🌬️", vibe: "Balanced Muse" },
    ],
  },
  {
    question: "your energy is more...",
    options: [
      { id: "a", text: "warm & inviting", emoji: "🌅", vibe: "Soft Glow" },
      { id: "b", text: "bright & focused", emoji: "☀️", vibe: "Clean Girl" },
      { id: "c", text: "deep & magnetic", emoji: "🌙", vibe: "Dark Feminine" },
      { id: "d", text: "flowy & adaptable", emoji: "🌊", vibe: "Balanced Muse" },
    ],
  },
  {
    question: "when you look in the mirror, you feel...",
    options: [
      { id: "a", text: "cute & loved", emoji: "🎀", vibe: "Soft Glow" },
      { id: "b", text: "put together", emoji: "💧", vibe: "Clean Girl" },
      { id: "c", text: "powerful & gorgeous", emoji: "👑", vibe: "Dark Feminine" },
      { id: "d", text: "like my truest self", emoji: "🦋", vibe: "Balanced Muse" },
    ],
  },
];

const VIBE_RESULTS: Record<string, { desc: string; emoji: string }> = {
  "Soft Glow": { desc: "You are giving pure angel energy. Warm, comforting, and so so sweet.", emoji: "☁️🎀" },
  "Clean Girl": { desc: "You are the blueprint. Organized, fresh, and glowing from the inside out.", emoji: "✨💧" },
  "Dark Feminine": { desc: "Main character energy. You are magnetic, confident, and utterly unforgettable.", emoji: "🥀🖤" },
  "Balanced Muse": { desc: "You have it all. Perfectly balanced, adaptable, and uniquely you.", emoji: "☯️🦋" },
};

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [, setVibeResult] = useLocalStorage("vibeResult", "");

  const handleOptionClick = (vibe: string) => {
    const newAnswers = [...answers, vibe];
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 300);
    } else {
      // Calculate result
      const counts: Record<string, number> = {};
      newAnswers.forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
      });
      const result = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
      setVibeResult(result);
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  if (showResult) {
    // We know answers has 5 items, so we can calculate result again if needed, but we rely on local storage.
    // For now we recalculate quickly for display.
    const counts: Record<string, number> = {};
    answers.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
    const result = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    const resultData = VIBE_RESULTS[result];

    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 text-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl max-w-md w-full border flex flex-col items-center gap-6"
        >
          <div className="text-6xl">{resultData.emoji}</div>
          <h2 className="text-3xl font-serif font-bold text-foreground">You are: {result}</h2>
          <p className="text-muted-foreground text-lg">{resultData.desc}</p>
          <p className="text-primary font-medium">proud of you bestie 💕 step into your glow era ✨</p>
          <Button
            size="lg"
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-white rounded-full text-lg"
            onClick={() => setLocation("/dashboard")}
          >
            enter your glow dashboard →
          </Button>
        </motion.div>
      </div>
    );
  }

  const currentQ = QUESTIONS[step];

  return (
    <div className="flex flex-col items-center justify-start min-h-[100dvh] p-6 bg-background pt-12">
      <div className="w-full max-w-xl mb-12 flex flex-col gap-2">
        <div className="flex justify-between text-sm text-muted-foreground font-medium">
          <span>Question {step + 1}</span>
          <span>of {QUESTIONS.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10 text-foreground">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {currentQ.options.map((opt) => (
              <motion.button
                key={opt.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionClick(opt.vibe)}
                className="flex flex-col items-center justify-center p-6 bg-card border border-card-border rounded-2xl hover:border-primary/50 transition-colors gap-3 shadow-sm hover:shadow-md"
              >
                <span className="text-4xl">{opt.emoji}</span>
                <span className="font-medium text-foreground text-lg">{opt.text}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
