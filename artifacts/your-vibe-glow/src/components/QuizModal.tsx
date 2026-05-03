import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { X } from "lucide-react";

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

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
}

export function QuizModal({ open, onClose }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [, setVibeResult] = useLocalStorage("vibeResult", "");
  const [userName] = useLocalStorage("userName", "");
  const name = userName || "bestie";

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
    setResult("");
    setShowIntro(true);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const startQuiz = () => {
    setShowIntro(false);
  };

  const handleOptionClick = (vibe: string) => {
    const newAnswers = [...answers, vibe];
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 280);
    } else {
      const counts: Record<string, number> = {};
      newAnswers.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
      const finalResult = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
      setVibeResult(finalResult);
      setResult(finalResult);
      window.dispatchEvent(new Event("glow-vibe-updated"));
      setTimeout(() => {
        setShowResult(true);
      }, 280);
    }
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const currentQ = QUESTIONS[step];

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(58,10,30,0.55)", backdropFilter: "blur(8px)" }}
          data-testid="quiz-modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-6"
            style={{ border: "1px solid rgba(155,37,85,0.18)" }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-close-quiz"
            >
              <X className="w-5 h-5" />
            </button>

            {!showResult ? (
              showIntro ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-5 text-center py-2"
                >
                  <div className="text-5xl">✨</div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-serif font-bold text-foreground">welcome to your glow quiz</h2>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      this page helps you discover your vibe and get personalized glow ideas based on your style
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full text-base mt-2"
                    onClick={startQuiz}
                    data-testid="button-start-quiz-intro"
                  >
                    start quiz →
                  </Button>
                </motion.div>
              ) : (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-muted-foreground font-medium">
                    <span>Question {step + 1} of {QUESTIONS.length}</span>
                    <span className="shimmer-text font-semibold">Your Vibe Quiz ✨</span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-foreground">
                      {currentQ.question}
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                      {currentQ.options.map((opt) => (
                        <motion.button
                          key={opt.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleOptionClick(opt.vibe)}
                          className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-2xl hover:border-primary/60 transition-all gap-2 shadow-sm hover:shadow-md"
                          data-testid={`quiz-option-${opt.id}`}
                        >
                          <span className="text-3xl">{opt.emoji}</span>
                          <span className="font-medium text-foreground text-sm text-center">{opt.text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-5 text-center py-2"
              >
                <div className="text-5xl">{VIBE_RESULTS[result]?.emoji}</div>
                <h2 className="text-3xl font-serif font-bold text-foreground">
                  You are: <span className="shimmer-text">{result}</span>
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">{VIBE_RESULTS[result]?.desc}</p>
                <p className="text-primary font-semibold text-sm">proud of you 💕 step into your glow era ✨</p>
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full text-base mt-2"
                  onClick={handleClose}
                  data-testid="button-enter-dashboard"
                >
                  enter your glow dashboard →
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
