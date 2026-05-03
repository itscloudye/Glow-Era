import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useVibeTheme } from "@/hooks/useVibeTheme";
import { motion } from "framer-motion";
import { Shirt, Heart, CheckCircle2 } from "lucide-react";

const SUGGESTIONS_DATA: Record<string, { outfits: string[]; selfCare: string[]; tasks: string[] }> = {
  "Soft Glow": {
    outfits: [
      "Oversized cream knit sweater with a silk slip skirt",
      "Pastel pink matching lounge set with fluffy socks",
      "Floral midi dress with a delicate cardigan",
    ],
    selfCare: [
      "Take a warm bath with lavender bath bombs",
      "Bake your favorite cookies while listening to acoustic music",
      "Read a romance book wrapped in a soft blanket",
    ],
    tasks: [
      "Buy fresh flowers for your room",
      "Clean your makeup brushes",
      "Text a friend you love them",
    ],
  },
  "Clean Girl": {
    outfits: [
      "Crisp white button-down with straight leg jeans",
      "Matching neutral workout set with a slicked back bun",
      "Beige blazer over a white tee with gold hoops",
    ],
    selfCare: [
      "Do a full 10-step skincare routine",
      "Deep clean your space and light a fresh linen candle",
      "Go for a hot girl walk with a podcast",
    ],
    tasks: [
      "Organize your calendar for the week",
      "Drink 3 liters of water today",
      "Meal prep some healthy snacks",
    ],
  },
  "Dark Feminine": {
    outfits: [
      "Black silk slip dress with dark red lipstick",
      "Fitted black turtleneck with tailored trousers",
      "Burgundy velvet top with delicate gold jewelry",
    ],
    selfCare: [
      "Do a deep tissue massage and apply scented body oil",
      "Journal your manifestations with a glass of red wine",
      "Listen to dark R&B in dim lighting",
    ],
    tasks: [
      "Update your vision board",
      "Read 10 pages of a self-development book",
      "Practice your confident posture",
    ],
  },
  "Balanced Muse": {
    outfits: [
      "Your favorite comfy jeans with a cute statement top",
      "A flowy maxi skirt with a simple fitted tee",
      "Layered neutral tones with fun, colorful accessories",
    ],
    selfCare: [
      "Spend 15 minutes stretching or doing yoga",
      "Try a new recipe for dinner",
      "Watch an inspiring documentary or movie",
    ],
    tasks: [
      "Declutter one small area of your room",
      "Write down 3 things you're grateful for",
      "Spend 30 minutes offline",
    ],
  },
};

const SECTION_ICONS = [Shirt, Heart, CheckCircle2];
const SECTION_LABELS = ["Outfit Ideas", "Self-Care", "Tasks This Week"];
const SECTION_KEYS = ["outfits", "selfCare", "tasks"] as const;

export default function Suggestions() {
  const [vibeResult] = useLocalStorage("vibeResult", "Balanced Muse");
  const t = useVibeTheme();
  const data = SUGGESTIONS_DATA[vibeResult] || SUGGESTIONS_DATA["Balanced Muse"];

  return (
    <div className="w-full" style={{ background: t.pageBg }}>
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4" style={{ color: t.text }}>
            Curated for{" "}
            <span style={{ color: t.accent }} className="italic">
              {vibeResult || "You"}
            </span>{" "}
            ✨
          </h1>
          <p className="font-medium text-lg max-w-2xl mx-auto" style={{ color: t.subtext }}>
            Here are some ideas tailored perfectly to your energy. Take what resonates, leave what doesn't.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SECTION_KEYS.map((key, si) => {
            const Icon = SECTION_ICONS[si];
            return (
              <section key={key} className="space-y-4">
                <div
                  className="flex items-center gap-2 text-2xl font-serif font-bold mb-6 pb-2"
                  style={{
                    color: t.text,
                    borderBottom: `2px solid ${t.accent}40`,
                  }}
                >
                  <Icon size={22} style={{ color: t.accent }} />
                  {SECTION_LABELS[si]}
                </div>
                {data[key].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
                    style={{
                      background: t.cardBg,
                      border: `1.5px solid ${t.cardBorder}`,
                    }}
                  >
                    <p className="text-base font-medium" style={{ color: t.text }}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </section>
            );
          })}
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
