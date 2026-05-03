import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [sparkles, setSparkles] = useState<{ id: number; left: number; top: number; delay: number; char: string }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      char: Math.random() > 0.5 ? "✨" : "⭐",
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex flex-col md:flex-row overflow-hidden">
      {/* Background container */}
      <div className="absolute inset-0 flex flex-col md:flex-row z-0">
        {/* Left half: Dark Feminine */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#1a0a05] dark-fem-card"></div>
        {/* Right half: Soft Girl */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#FDF8F3] soft-girl-card"></div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-float text-xl md:text-2xl opacity-50"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            {sparkle.char}
          </div>
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-[100dvh] p-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card p-8 md:p-12 rounded-3xl max-w-xl mx-auto shadow-2xl flex flex-col items-center gap-6"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
            <span className="shimmer-text">Step Into Your</span><br/>Glow Era ✨
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md">
            Your personal glow-up assistant that feels like your most supportive best friend. Let's find your vibe.
          </p>
          
          <Link href="/quiz">
            <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground gold-glow hover:scale-105 transition-all">
              Start your vibe, bestie 💕
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
