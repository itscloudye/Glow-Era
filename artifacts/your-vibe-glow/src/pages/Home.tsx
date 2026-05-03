import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
  size: number;
  duration: number;
  rotation: number;
}

function SparkleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path d="M12 0 C12 0 12.8 5.5 14.5 7.5 C16.2 9.5 22 10 22 10 C22 10 16.2 10.5 14.5 12.5 C12.8 14.5 12 20 12 20 C12 20 11.2 14.5 9.5 12.5 C7.8 10.5 2 10 2 10 C2 10 7.8 9.5 9.5 7.5 C11.2 5.5 12 0 12 0 Z" />
      <path
        d="M20 2 C20 2 20.4 4 21.2 4.8 C22 5.6 24 6 24 6 C24 6 22 6.4 21.2 7.2 C20.4 8 20 10 20 10 C20 10 19.6 8 18.8 7.2 C18 6.4 16 6 16 6 C16 6 18 5.6 18.8 4.8 C19.6 4 20 2 20 2 Z"
        opacity="0.7"
      />
      <path
        d="M4 16 C4 16 4.3 17.5 4.9 18.1 C5.5 18.7 7 19 7 19 C7 19 5.5 19.3 4.9 19.9 C4.3 20.5 4 22 4 22 C4 22 3.7 20.5 3.1 19.9 C2.5 19.3 1 19 1 19 C1 19 2.5 18.7 3.1 18.1 C3.7 17.5 4 16 4 16 Z"
        opacity="0.6"
      />
    </svg>
  );
}

export default function Home() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      size: 28 + Math.random() * 28,
      duration: 5 + Math.random() * 4,
      rotation: Math.random() * 360,
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[100dvh] flex flex-col md:flex-row overflow-hidden">
      {/* Background — unified burgundy-to-pink gradient */}
      <div className="absolute inset-0 z-0 combined-bg" />

      {/* Real SVG Sparkles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {sparkles.map((sparkle) => {
          const isDark = sparkle.left < 50;
          const color = isDark
            ? `rgba(201,168,76,${0.5 + Math.random() * 0.4})`
            : `rgba(201,168,76,${0.4 + Math.random() * 0.4})`;
          return (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                rotate: sparkle.rotation,
              }}
              animate={{
                y: [0, -8, 0],
                rotate: [sparkle.rotation, sparkle.rotation + 5, sparkle.rotation],
                opacity: [0.55, 0.85, 0.55],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <SparkleIcon size={sparkle.size} color={color} />
            </motion.div>
          );
        })}
      </div>

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-[100dvh] p-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card p-8 md:p-12 rounded-3xl max-w-xl mx-auto shadow-2xl flex flex-col items-center gap-6"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            <span className="shimmer-text">Step Into Your</span>
            <br />
            Glow Era
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md">
            Your personal glow-up assistant that feels like your most supportive best friend. Let's find your vibe.
          </p>
          <Link href="/quiz">
            <Button
              size="lg"
              className="rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground gold-glow hover:scale-105 transition-all"
              data-testid="button-start-vibe"
            >
              Start your vibe, bestie 💕
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
