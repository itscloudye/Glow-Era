import { Link } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarCheck, Flame, Sparkles, User, NotebookPen, HeartHandshake } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const [vibeResult] = useLocalStorage("vibeResult", "Balanced Muse");
  const [streak] = useLocalStorage("streak", 3);
  const [glowLevel] = useLocalStorage("glowLevel", 42);
  const [todayMood] = useLocalStorage("todayMood", "✨");

  const today = format(new Date(), "EEEE, MMMM do");

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
          hey bestie, ready to glow today? ✨
        </h1>
        <p className="text-muted-foreground font-medium text-lg">{today}</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div whileHover={{ y: -2 }} className="glass-card p-4 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Glow Level</span>
          </div>
          <div className="text-2xl font-bold">{glowLevel}%</div>
          <Progress value={glowLevel} className="h-1.5" />
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="glass-card p-4 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-orange-500">
            <Flame className="w-5 h-5" />
            <span className="font-medium">Daily Streak</span>
          </div>
          <div className="text-2xl font-bold">{streak} days</div>
          <p className="text-xs text-muted-foreground">keep it up 💕</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="glass-card p-4 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary-foreground">
            <User className="w-5 h-5" />
            <span className="font-medium">Vibe Type</span>
          </div>
          <div className="text-xl font-bold">{vibeResult}</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="glass-card p-4 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-purple-500">
            <HeartHandshake className="w-5 h-5" />
            <span className="font-medium">Mood Today</span>
          </div>
          <div className="text-3xl">{todayMood}</div>
        </motion.div>
      </div>

      {/* Quick Access */}
      <h2 className="text-2xl font-serif font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/tracker">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-card border p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Tracker</h3>
              <p className="text-sm text-muted-foreground">Tick off your daily habits</p>
            </div>
          </motion.div>
        </Link>

        <Link href="/checkin">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-card border p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-2xl">
              ✨
            </div>
            <div>
              <h3 className="font-bold text-lg">Check-In</h3>
              <p className="text-sm text-muted-foreground">Log your mood & thoughts</p>
            </div>
          </motion.div>
        </Link>

        <Link href="/journal">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-card border p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center">
              <NotebookPen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Journal</h3>
              <p className="text-sm text-muted-foreground">Write it out, bestie</p>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Suggestion Card */}
      <motion.div whileHover={{ y: -2 }} className={`p-8 rounded-3xl ${vibeResult === 'Dark Feminine' ? 'dark-fem-card' : 'soft-girl-card'}`}>
        <h3 className="text-2xl font-serif font-bold mb-2">Today's Glow Suggestion ✨</h3>
        <p className="text-lg opacity-90">
          {vibeResult === 'Dark Feminine' 
            ? "Take a moment tonight for a dark red lip and a glass of wine. You're the main character."
            : "Light your favorite vanilla candle and romanticize doing your skincare routine tonight."}
        </p>
      </motion.div>
    </div>
  );
}
