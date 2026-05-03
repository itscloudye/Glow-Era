import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { motion } from "framer-motion";

const PROMPTS = [
  "what made you feel pretty today?",
  "one small win today was...",
  "i'm grateful for...",
  "something that made me glow was...",
  "i'm proud of myself for...",
];

export const COVER_OPTIONS = [
  { id: "black",       label: "Black",       bg: "#111111", spine: "#000000", text: "#C9A84C" },
  { id: "white",       label: "White",       bg: "#FAFAFA", spine: "#E0E0E0", text: "#9B2555" },
  { id: "burgundy",    label: "Burgundy",    bg: "#6D1A36", spine: "#3A0A1E", text: "#C9A84C" },
  { id: "light-pink",  label: "Light Pink",  bg: "#F8C8D4", spine: "#E8809F", text: "#6D1A36" },
  { id: "deep-purple", label: "Deep Purple", bg: "#3D1A5C", spine: "#220C38", text: "#E8D5F5" },
];

type Entry = {
  id: string;
  date: string;
  prompt: string;
  content: string;
};

export default function Journal() {
  const [entries, setEntries] = useLocalStorage<Entry[]>("journal_entries", []);
  const [coverColor, setCoverColor] = useLocalStorage("journal_cover", "burgundy");
  const [fontStyle, setFontStyle] = useLocalStorage("journal_font", "Clean");
  const [content, setContent] = useState("");
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);

  const cover = COVER_OPTIONS.find((c) => c.id === coverColor) ?? COVER_OPTIONS[2];

  const handleSave = () => {
    if (!content.trim()) return;
    const newEntry: Entry = {
      id: Date.now().toString(),
      date: format(new Date(), "PPpp"),
      prompt,
      content,
    };
    setEntries([newEntry, ...entries].slice(0, 10));
    setContent("");
  };

  const getFontClass = () => {
    switch (fontStyle) {
      case "Handwritten": return "font-['Dancing_Script'] text-2xl";
      case "Elegant": return "font-serif text-lg";
      default: return "font-sans text-base";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Controls */}
        <div className="w-full md:w-64 space-y-6 shrink-0">
          <div className="bg-card p-6 rounded-2xl border space-y-5">
            <h3 className="font-serif font-bold text-xl">Journal Style</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Cover Color</label>
              <div className="flex gap-2 flex-wrap">
                {COVER_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCoverColor(c.id)}
                    title={c.label}
                    data-testid={`cover-color-${c.id}`}
                    className="relative w-9 h-9 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: c.bg,
                      border: coverColor === c.id ? `3px solid ${c.spine}` : "3px solid transparent",
                      outline: coverColor === c.id ? `2px solid ${c.bg}` : "none",
                      boxShadow: coverColor === c.id ? `0 0 0 3px ${c.spine}` : "0 1px 4px rgba(0,0,0,0.18)",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground capitalize">{cover.label}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Font Style</label>
              <Select value={fontStyle} onValueChange={setFontStyle}>
                <SelectTrigger data-testid="select-font-style">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clean">Clean (Sans)</SelectItem>
                  <SelectItem value="Elegant">Elegant (Serif)</SelectItem>
                  <SelectItem value="Handwritten">Handwritten</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border">
            <h3 className="font-serif font-bold text-xl mb-4">Previous Entries</h3>
            <div className="space-y-3">
              {entries.length === 0 ? (
                <p className="text-sm text-muted-foreground">No entries yet, start writing bestie! ✨</p>
              ) : (
                entries.map((entry) => (
                  <div key={entry.id} className="text-sm p-3 bg-background rounded-xl border">
                    <p className="text-xs text-muted-foreground mb-1">{entry.date}</p>
                    <p className="line-clamp-2 italic">"{entry.content}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* The Journal Book */}
        <div className="flex-grow flex justify-center items-start">
          <motion.div
            layout
            className="relative w-full max-w-2xl shadow-2xl"
            style={{ borderRadius: "4px 24px 24px 4px" }}
          >
            {/* Spine */}
            <div
              className="absolute left-0 top-0 bottom-0 w-10 md:w-14 rounded-l-sm z-10 flex flex-col items-center justify-center gap-1"
              style={{
                background: `linear-gradient(to right, ${cover.spine}, ${cover.bg})`,
                borderRight: `1px solid rgba(0,0,0,0.15)`,
              }}
            >
              <div className="w-px h-full absolute left-2 top-0" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="w-px h-full absolute left-4 top-0" style={{ background: "rgba(0,0,0,0.12)" }} />
            </div>

            {/* Cover + Page area */}
            <div
              className="relative ml-10 md:ml-14 rounded-r-3xl overflow-hidden"
              style={{ background: cover.bg, minHeight: 640 }}
            >
              {/* Cover decorations */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,0,0,0.06) 30px, rgba(0,0,0,0.06) 31px)`,
                }}
              />
              <div
                className="absolute top-4 left-4 right-4 bottom-4 rounded-2xl pointer-events-none"
                style={{ border: `1px solid ${cover.text}22` }}
              />

              {/* Paper */}
              <div className="relative bg-[#FFFDF8] mx-6 my-5 rounded-r-2xl rounded-l-sm shadow-inner min-h-[580px] flex flex-col"
                style={{ borderLeft: `1px solid rgba(0,0,0,0.06)` }}
              >
                {/* Lined paper effect */}
                <div
                  className="absolute inset-0 rounded-r-2xl pointer-events-none opacity-40"
                  style={{
                    backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #e5d0c0 31px, #e5d0c0 32px)`,
                    backgroundPosition: "0 48px",
                  }}
                />

                <div className="relative z-10 p-6 md:p-8 flex flex-col flex-grow">
                  {/* Prompt header */}
                  <div className="text-center mb-6 pb-4" style={{ borderBottom: `1px solid ${cover.bg}60` }}>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
                      {format(new Date(), "MMMM do, yyyy")}
                    </p>
                    <h2 className="text-lg md:text-xl font-serif text-primary/80 italic">{prompt}</h2>
                  </div>

                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing here..."
                    className={`flex-grow resize-none border-none bg-transparent shadow-none focus-visible:ring-0 text-[#2C1810] leading-8 placeholder:text-muted-foreground/40 ${getFontClass()}`}
                    style={{ lineHeight: "2rem", minHeight: 320 }}
                    data-testid="textarea-journal"
                  />

                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={handleSave}
                      className="rounded-full text-white px-6"
                      style={{ background: cover.spine === "#E0E0E0" ? "#9B2555" : cover.spine }}
                      data-testid="button-save-entry"
                    >
                      Save entry ✨
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
