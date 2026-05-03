import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarCheck, Flame, Sparkles, User, HeartHandshake, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { QuizModal } from "@/components/QuizModal";
import { JournalBook } from "@/components/JournalBook";
import { TrackerMini } from "@/components/TrackerMini";

const VIBE_THEMES: Record<string, {
  bg: string;
  card: string;
  accent: string;
  text: string;
  subtext: string;
  suggestionCard: string;
  border: string;
}> = {
  "": {
    bg: "bg-white",
    card: "bg-white border border-gray-100 shadow-sm",
    accent: "bg-gray-50",
    text: "text-gray-900",
    subtext: "text-gray-500",
    suggestionCard: "bg-gray-50 border border-gray-100",
    border: "border-gray-100",
  },
  "Clean Girl": {
    bg: "",
    card: "border shadow-sm",
    accent: "bg-[#F0E4D0]/60",
    text: "text-[#5C3D1E]",
    subtext: "text-[#8B6340]",
    suggestionCard: "bg-[#EDD9BE] border border-[#D4B896]",
    border: "border-[#D4B896]",
  },
  "Dark Feminine": {
    bg: "",
    card: "border shadow-sm",
    accent: "bg-[#800020]/10",
    text: "text-[#1A0008]",
    subtext: "text-[#6B1020]",
    suggestionCard: "dark-fem-card",
    border: "border-[#800020]/30",
  },
  "Soft Glow": {
    bg: "",
    card: "border shadow-sm",
    accent: "bg-[#FDE8EF]/60",
    text: "text-[#7D2547]",
    subtext: "text-[#B05575]",
    suggestionCard: "soft-girl-card",
    border: "border-[#F4A8C0]/40",
  },
  "Balanced Muse": {
    bg: "",
    card: "border shadow-sm",
    accent: "bg-[#EEE5FB]/70",
    text: "text-[#4E3A72]",
    subtext: "text-[#7E6A9E]",
    suggestionCard: "bg-[#F1EAFE] border border-[#D1BDEB]",
    border: "border-[#D1BDEB]",
  },
};

const VIBE_BG_STYLE: Record<string, React.CSSProperties> = {
  "": { background: "#ffffff" },
  "Clean Girl": { background: "linear-gradient(150deg, #FDF6EC 0%, #F5EBE0 40%, #EDD9BE 100%)" },
  "Dark Feminine": { background: "linear-gradient(150deg, #1A0008 0%, #2D0010 35%, #4D0018 70%, #800020 100%)" },
  "Soft Glow": { background: "linear-gradient(150deg, #FFF5F8 0%, #FDE8EF 40%, #F8C8D4 100%)" },
  "Balanced Muse": { background: "linear-gradient(150deg, #F7F1FF 0%, #EEE5FB 42%, #E3D4F7 100%)" },
};

const SUGGESTIONS: Record<string, string> = {
  "": "Take the vibe quiz to unlock your personalized glow suggestions ✨",
  "Clean Girl": "Start your morning with lemon water, a 10-min walk, and your fave podcast. You radiate that effortless glow, bestie.",
  "Dark Feminine": "Take a moment tonight for a dark red lip and your favorite candle. You're the main character and the story is yours.",
  "Soft Glow": "Light your vanilla candle, put on your cozy playlist, and romanticize doing your skincare. Angel energy activated.",
  "Balanced Muse": "Flow between worlds today — be soft when you need rest, be fierce when you need power. You contain multitudes.",
};

export default function Dashboard() {
  const [vibeResult] = useLocalStorage("vibeResult", "");
  const [streak] = useLocalStorage("streak", 3);
  const [glowLevel] = useLocalStorage("glowLevel", 42);
  const [todayMood] = useLocalStorage("todayMood", "✨");
  const [journalCover] = useLocalStorage("journal_cover", "burgundy");
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [nameInput, setNameInput] = useState("");
  const [quizOpen, setQuizOpen] = useState(false);
  const [hasSeenQuizAlert, setHasSeenQuizAlert] = useLocalStorage("hasSeenQuizAlert", false);

  const name = userName || "bestie";
  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed) setUserName(trimmed);
  };

  const today = format(new Date(), "EEEE, MMMM do");
  const theme = VIBE_THEMES[vibeResult] ?? VIBE_THEMES[""];
  const bgStyle = VIBE_BG_STYLE[vibeResult] ?? VIBE_BG_STYLE[""];
  const isDark = vibeResult === "Dark Feminine";
  const isBalanced = vibeResult === "Balanced Muse";
  const introBg = isDark
    ? "linear-gradient(135deg, rgba(45,0,16,0.92) 0%, rgba(75,12,34,0.88) 100%)"
    : "linear-gradient(135deg, rgba(42,10,24,0.88) 0%, rgba(82,20,45,0.82) 100%)";

  useEffect(() => {
    if (hasSeenQuizAlert) return;
    const timer = setTimeout(() => {
      setQuizOpen(true);
      setHasSeenQuizAlert(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasSeenQuizAlert, setHasSeenQuizAlert]);

  return (
    <div className="min-h-[100dvh] transition-all duration-700" style={bgStyle}>
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-4">
          <div className="w-full">
            <h1 className={`text-3xl md:text-4xl font-serif font-bold mb-1 ${isDark ? "text-[#F5E6C8]" : theme.text}`}>
              hey {name}, ready to glow today? ✨
            </h1>
            <p className={`font-medium text-lg ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>{today}</p>
            <div className="mt-4 w-full rounded-3xl backdrop-blur-md" style={{ background: introBg }}>
              <p className="w-full px-5 py-4 text-sm md:text-base leading-relaxed text-[#F5E6C8]/90">
                Glow Era is your little soft space to plan your routines, track your glow-ups, save your favorite Pinterest inspo, and check in with yourself daily.
                It’s made to help the girlies feel organized, inspired, and a little more confident every day.
              </p>
            </div>
          </div>
        </header>

        {/* Vibe badge */}
        {vibeResult && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${
              isDark ? "bg-[#9B2555]/30 text-[#F5E6C8]" : `${theme.accent} ${theme.text}`
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Your vibe: {vibeResult}
          </motion.div>
        )}

        {/* Name prompt — shown if no name set yet */}
        {!userName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4"
            style={{ background: "rgba(155,37,85,0.06)", border: "1px solid rgba(244,168,192,0.35)" }}
          >
            <div className="text-3xl shrink-0">🌸</div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-serif text-lg font-semibold text-foreground">what should we call you?</p>
              <p className="text-muted-foreground text-sm">so we can make this feel a little more personal ✨</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                placeholder="your name..."
                maxLength={24}
                className="rounded-full px-4 py-2 text-sm border border-border bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full sm:w-36"
                data-testid="input-user-name"
              />
              <Button
                onClick={handleSaveName}
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-white shrink-0"
                data-testid="button-save-name"
              >
                Save
              </Button>
            </div>
          </motion.div>
        )}

        {/* Prompt if no quiz taken */}
        {!vibeResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#3A0A1E]/5 to-[#F4A8C0]/20 border border-[#F4A8C0]/30 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="text-4xl">🌸</div>
            <div className="flex-1 text-center md:text-left">
              <p className="font-serif text-xl font-semibold text-foreground">find your glow vibe, {name} ✨</p>
              <p className="text-muted-foreground text-sm mt-1">Take the 5-question quiz to unlock your personalized aesthetic theme and glow suggestions</p>
            </div>
            <Button
              onClick={() => setQuizOpen(true)}
              className="rounded-full bg-primary hover:bg-primary/90 text-white shrink-0"
              data-testid="button-start-quiz-prompt"
            >
              Start Quiz ✨
            </Button>
          </motion.div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: <Sparkles className="w-5 h-5" />,
              iconColor: isDark ? "text-[#C9A84C]" : "text-primary",
              label: "Glow Level",
              value: `${glowLevel}%`,
              extra: <Progress value={glowLevel} className="h-1.5 mt-1" />,
            },
            {
              icon: <Flame className="w-5 h-5" />,
              iconColor: "text-orange-400",
              label: "Daily Streak",
              value: `${streak} days`,
              extra: <p className={`text-xs ${isDark ? "text-[#D4A0B5]" : "text-muted-foreground"}`}>keep it up 💕</p>,
            },
            {
              icon: <User className="w-5 h-5" />,
              iconColor: isDark ? "text-[#F5E6C8]" : "text-secondary-foreground",
              label: "Vibe Type",
              value: vibeResult || "—",
              extra: null,
            },
            {
              icon: <HeartHandshake className="w-5 h-5" />,
              iconColor: "text-pink-400",
              label: "Mood Today",
              value: <span className="text-3xl">{todayMood}</span>,
              extra: null,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-2xl flex flex-col gap-2 ${
                isDark
                  ? "bg-white/10 border border-white/15 backdrop-blur-sm"
                  : `${theme.card} ${theme.border}`
              }`}
            >
              <div className={`flex items-center gap-2 ${card.iconColor}`}>
                {card.icon}
                <span className={`font-medium text-sm ${isDark ? "text-[#F5E6C8]" : theme.text}`}>{card.label}</span>
              </div>
              <div className={`text-2xl font-bold ${isDark ? "text-white" : theme.text}`}>{card.value}</div>
              <div>{card.extra}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Access */}
        <h2 className={`text-2xl font-serif font-semibold mb-4 ${isDark ? "text-[#F5E6C8]" : theme.text}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Tracker */}
          <Link href="/tracker">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl flex items-center gap-5 cursor-pointer transition-all ${
                isDark ? "bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15" : `bg-card ${theme.border} border hover:border-primary/40`
              }`}
              data-testid="link-tracker"
            >
              <motion.div whileHover={{ rotateY: -8, scale: 1.05 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <TrackerMini accentColor={isDark ? "#D4A0B5" : isBalanced ? "#B89AE8" : "#9B2555"} />
              </motion.div>
              <div>
                <h3 className={`font-bold text-lg ${isDark ? "text-white" : theme.text}`}>Tracker</h3>
                <p className={`text-sm ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>Tick off your daily habits</p>
                <p className={`text-xs mt-1 opacity-70 ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>today's progress</p>
              </div>
            </motion.div>
          </Link>

          {/* Check-In */}
          <Link href="/checkin">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl flex items-center gap-5 cursor-pointer transition-all ${
                isDark ? "bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15" : `bg-card ${theme.border} border hover:border-primary/40`
              }`}
              data-testid="link-checkin"
            >
              <div className="relative shrink-0">
                <div className="w-14 h-18 rounded-2xl overflow-hidden shadow-md border border-white/30 bg-gradient-to-b from-[#FDE8EF] to-[#F8C8D4] flex items-center justify-center">
                  <div className="w-10 h-14 rounded-xl bg-white/70 flex items-center justify-center text-2xl">
                    ✨
                  </div>
                </div>
                <div className="absolute -right-1 top-1 w-3.5 h-3.5 rounded-full bg-[#C9A84C] border border-white/70" />
              </div>
              <div>
                <h3 className={`font-bold text-lg ${isDark ? "text-white" : theme.text}`}>Check-In</h3>
                <p className={`text-sm ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>Log your mood & thoughts</p>
                <p className={`text-xs mt-1 opacity-70 ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>mini photo card</p>
              </div>
            </motion.div>
          </Link>

          {/* Journal — shown as a real book */}
          <Link href="/journal">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl flex items-center gap-5 cursor-pointer transition-all ${
                isDark ? "bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15" : `bg-card ${theme.border} border hover:border-primary/40`
              }`}
              data-testid="link-journal"
            >
              <motion.div whileHover={{ rotateY: -8, scale: 1.05 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <JournalBook coverColor={journalCover} />
              </motion.div>
              <div>
                <h3 className={`font-bold text-lg ${isDark ? "text-white" : theme.text}`}>Journal</h3>
                <p className={`text-sm ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>Write it out, bestie</p>
                <p className={`text-xs mt-1 capitalize opacity-70 ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>
                  {journalCover.replace("-", " ")} cover
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Pinterest CTA */}
        <Link href="/moodboard">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`mb-8 p-6 rounded-2xl flex items-center gap-5 cursor-pointer transition-all ${
              isDark ? "bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15" : `bg-card ${theme.border} border hover:border-primary/40`
            }`}
            data-testid="link-moodboard"
          >
            <div className="relative shrink-0">
              <div className="w-14 h-18 rounded-2xl overflow-hidden shadow-md border border-white/30 bg-gradient-to-b from-[#F7F1FF] to-[#E3D4F7] flex items-center justify-center">
                <div className="w-10 h-14 rounded-xl bg-white/70 flex items-center justify-center text-2xl">
                  📍
                </div>
              </div>
              <div className="absolute -right-1 top-1 w-3.5 h-3.5 rounded-full bg-[#B89AE8] border border-white/70" />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${isDark ? "text-white" : theme.text}`}>ypur pintrest board</h3>
              <p className={`text-sm ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>build your inspo board with photos you love</p>
              <p className={`text-xs mt-1 opacity-70 ${isDark ? "text-[#D4A0B5]" : theme.subtext}`}>tap to open your board</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold shrink-0 ${isDark ? "bg-[#9B2555]/30 text-[#F5E6C8]" : "bg-[#F4A8C0]/25 text-[#7D2547]"}`}>
              Open
            </div>
          </motion.div>
        </Link>

        {/* Suggestion */}
        <motion.div
          whileHover={{ y: -2 }}
          className={`p-8 rounded-3xl ${theme.suggestionCard}`}
        >
          <h3 className={`text-2xl font-serif font-bold mb-2 ${isDark ? "text-[#F5E6C8]" : theme.text}`}>
            Today's Glow Suggestion ✨
          </h3>
          <p className={`text-lg leading-relaxed ${isDark ? "text-[#F0D0DC] opacity-90" : theme.subtext}`}>
            {SUGGESTIONS[vibeResult] ?? SUGGESTIONS[""]}
          </p>
        </motion.div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => setQuizOpen(true)}
            variant="outline"
            className={`rounded-full flex items-center gap-2 text-sm font-medium transition-all ${
              isDark
                ? "border-[#9B2555]/50 text-[#F5E6C8] hover:bg-[#9B2555]/20"
                : `${theme.border} ${theme.text} hover:bg-black/5`
            }`}
            data-testid="button-open-quiz"
          >
            <Wand2 className="w-4 h-4" />
            {vibeResult ? "Retake Vibe Quiz" : "Discover Your Vibe ✨"}
          </Button>
        </div>

      </div>

      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
