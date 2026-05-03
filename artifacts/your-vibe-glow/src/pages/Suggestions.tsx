import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";
import { Sparkles, Shirt, Heart, CheckCircle2 } from "lucide-react";

const SUGGESTIONS_DATA: Record<string, any> = {
  "Soft Glow": {
    outfits: [
      "Oversized cream knit sweater with a silk slip skirt",
      "Pastel pink matching lounge set with fluffy socks",
      "Floral midi dress with a delicate cardigan"
    ],
    selfCare: [
      "Take a warm bath with lavender bath bombs",
      "Bake your favorite cookies while listening to acoustic music",
      "Read a romance book wrapped in a soft blanket"
    ],
    tasks: [
      "Buy fresh flowers for your room",
      "Clean your makeup brushes",
      "Text a friend you love them"
    ]
  },
  "Clean Girl": {
    outfits: [
      "Crisp white button-down with straight leg jeans",
      "Matching neutral workout set with a slicked back bun",
      "Beige blazer over a white tee with gold hoops"
    ],
    selfCare: [
      "Do a full 10-step skincare routine",
      "Deep clean your space and light a fresh linen candle",
      "Go for a hot girl walk with a podcast"
    ],
    tasks: [
      "Organize your calendar for the week",
      "Drink 3 liters of water today",
      "Meal prep some healthy snacks"
    ]
  },
  "Dark Feminine": {
    outfits: [
      "Black silk slip dress with dark red lipstick",
      "Fitted black turtleneck with tailored trousers",
      "Burgundy velvet top with delicate gold jewelry"
    ],
    selfCare: [
      "Do a deep tissue massage and apply scented body oil",
      "Journal your manifestations with a glass of red wine",
      "Listen to dark R&B in dim lighting"
    ],
    tasks: [
      "Update your vision board",
      "Read 10 pages of a self-development book",
      "Practice your confident posture"
    ]
  },
  "Balanced Muse": {
    outfits: [
      "Your favorite comfy jeans with a cute statement top",
      "A flowy maxi skirt with a simple fitted tee",
      "Layered neutral tones with fun, colorful accessories"
    ],
    selfCare: [
      "Spend 15 minutes stretching or doing yoga",
      "Try a new recipe for dinner",
      "Watch an inspiring documentary or movie"
    ],
    tasks: [
      "Declutter one small area of your room",
      "Write down 3 things you're grateful for",
      "Spend 30 minutes offline"
    ]
  }
};

export default function Suggestions() {
  const [vibeResult] = useLocalStorage("vibeResult", "Balanced Muse");
  
  const data = SUGGESTIONS_DATA[vibeResult] || SUGGESTIONS_DATA["Balanced Muse"];

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Curated for <span className="text-primary italic">{vibeResult}</span> ✨
        </h1>
        <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
          Here are some ideas tailored perfectly to your energy today. Take what resonates, leave what doesn't.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Outfits */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold text-foreground mb-6 pb-2 border-b-2 border-primary/20">
            <Shirt className="text-primary" /> Outfit Ideas
          </div>
          {data.outfits.map((item: string, i: number) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
            >
              <p className="text-lg font-medium">{item}</p>
            </motion.div>
          ))}
        </section>

        {/* Self Care */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold text-foreground mb-6 pb-2 border-b-2 border-primary/20">
            <Heart className="text-pink-500" /> Self-Care
          </div>
          {data.selfCare.map((item: string, i: number) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-lg font-medium">{item}</p>
            </motion.div>
          ))}
        </section>

        {/* Action Items */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold text-foreground mb-6 pb-2 border-b-2 border-primary/20">
            <CheckCircle2 className="text-green-500" /> Tasks This Week
          </div>
          {data.tasks.map((item: string, i: number) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex items-start gap-3"
            >
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-lg font-medium">{item}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
