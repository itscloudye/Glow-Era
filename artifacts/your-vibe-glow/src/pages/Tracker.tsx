import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { format } from "date-fns";

type Habit = {
  id: string;
  name: string;
  completed: boolean;
};

const DEFAULT_HABITS = {
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
    { id: "c4", name: "Mood board update", completed: false },
  ],
  Spiritual: [
    { id: "sp1", name: "Morning prayer", completed: false },
    { id: "sp2", name: "Gratitude reflection", completed: false },
    { id: "sp3", name: "Quiet time", completed: false },
    { id: "sp4", name: "Affirmations", completed: false },
  ],
};

export default function Tracker() {
  const todayKey = `tracker_${format(new Date(), "yyyy-MM-dd")}`;
  const [habitsData, setHabitsData] = useLocalStorage<Record<string, Habit[]>>(todayKey, DEFAULT_HABITS);

  // Recalculate glow score
  let total = 0;
  let completed = 0;
  Object.values(habitsData).forEach((list) => {
    list.forEach((h) => {
      total++;
      if (h.completed) completed++;
    });
  });
  const glowScore = Math.round((completed / total) * 100) || 0;

  // Sync to general glow level
  const [, setGlowLevel] = useLocalStorage("glowLevel", 0);
  useEffect(() => {
    setGlowLevel(glowScore);
  }, [glowScore, setGlowLevel]);

  const toggleHabit = (category: string, habitId: string) => {
    setHabitsData((prev) => {
      const copy = { ...prev };
      const catList = [...copy[category]];
      const index = catList.findIndex((h) => h.id === habitId);
      if (index !== -1) {
        catList[index].completed = !catList[index].completed;
        copy[category] = catList;
      }
      return copy;
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Glow Up Tracker ✨
          </h1>
          <p className="text-muted-foreground font-medium text-lg">
            Small steps every day, bestie 💕
          </p>
        </div>
        <div className="flex items-center gap-4 bg-card px-6 py-4 rounded-2xl border">
          <div className="text-right">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Today's Score</div>
            <div className="text-3xl font-bold text-primary">{glowScore}%</div>
          </div>
          <div className="relative w-16 h-16 rounded-full border-4 border-muted flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border-4 border-primary transition-all duration-500 ease-out"
              style={{ clipPath: `polygon(0 0, 100% 0, 100% ${glowScore}%, 0 ${glowScore}%)` }}
            ></div>
            <span className="relative z-10 text-xl">✨</span>
          </div>
        </div>
      </header>

      <Tabs defaultValue="Hair" className="w-full">
        <TabsList className="w-full flex overflow-x-auto h-auto p-2 bg-card border rounded-2xl mb-6 justify-start scrollbar-hide">
          {Object.keys(habitsData).map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="px-6 py-3 rounded-xl text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              {cat === "Hair" && "💇‍♀️ "}
              {cat === "Skin" && "🧴 "}
              {cat === "Health" && "🧘‍♀️ "}
              {cat === "Creativity" && "🎨 "}
              {cat === "Spiritual" && "🕌 "}
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(habitsData).map(([category, habits]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                  habit.completed ? "bg-primary/5 border-primary/20" : "bg-card"
                }`}
              >
                <Checkbox
                  id={habit.id}
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit(category, habit.id)}
                  className="w-6 h-6 rounded-full"
                />
                <label
                  htmlFor={habit.id}
                  className={`flex-grow text-lg font-medium cursor-pointer transition-colors ${
                    habit.completed ? "text-primary/70 line-through" : "text-foreground"
                  }`}
                >
                  {habit.name}
                </label>
                {habit.completed && <span className="text-xl animate-in zoom-in duration-300">✨</span>}
              </motion.div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
