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

type Entry = {
  id: string;
  date: string;
  prompt: string;
  content: string;
};

export default function Journal() {
  const [entries, setEntries] = useLocalStorage<Entry[]>("journal_entries", []);
  const [coverColor, setCoverColor] = useLocalStorage("journal_cover", "brown");
  const [fontStyle, setFontStyle] = useLocalStorage("journal_font", "Clean");
  
  const [content, setContent] = useState("");
  // Select a random prompt on load
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);

  const handleSave = () => {
    if (!content.trim()) return;
    const newEntry: Entry = {
      id: Date.now().toString(),
      date: format(new Date(), "PPpp"),
      prompt,
      content,
    };
    setEntries([newEntry, ...entries].slice(0, 10)); // Keep max 10
    setContent("");
  };

  const getCoverClass = () => {
    switch (coverColor) {
      case "beige": return "bg-[#F5EBE0]";
      case "pink": return "bg-[#F8C8D4]";
      case "black": return "bg-[#1a1a1a]";
      case "brown":
      default: return "leather-texture";
    }
  };

  const getFontClass = () => {
    switch (fontStyle) {
      case "Handwritten": return "font-['Dancing_Script'] text-2xl";
      case "Elegant": return "font-serif text-lg";
      case "Clean":
      default: return "font-sans text-base";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Controls */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-card p-6 rounded-2xl border space-y-4">
            <h3 className="font-serif font-bold text-xl">Journal Style</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Color</label>
              <div className="flex gap-2">
                {["brown", "beige", "pink", "black"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCoverColor(c)}
                    className={`w-8 h-8 rounded-full border-2 ${coverColor === c ? 'border-primary' : 'border-transparent'} ${
                      c === 'brown' ? 'bg-[#5C3317]' : 
                      c === 'beige' ? 'bg-[#F5EBE0]' : 
                      c === 'pink' ? 'bg-[#F8C8D4]' : 'bg-[#1a1a1a]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Font Style</label>
              <Select value={fontStyle} onValueChange={setFontStyle}>
                <SelectTrigger>
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

        {/* The Journal */}
        <div className="flex-grow flex justify-center">
          <div className={`relative w-full max-w-2xl rounded-r-3xl rounded-l-md shadow-2xl p-2 md:p-4 ${getCoverClass()}`}>
            {/* Spine styling */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-black/20 rounded-l-md border-r border-black/30"></div>
            
            {/* Paper */}
            <div className="relative ml-6 md:ml-10 bg-[#FFFAFA] h-[600px] rounded-r-2xl rounded-l-sm shadow-inner p-6 md:p-10 flex flex-col">
              <div className="text-center mb-6 border-b-2 border-primary/20 pb-4">
                <h2 className="text-xl md:text-2xl font-serif text-primary/80 italic">{prompt}</h2>
                <p className="text-sm text-muted-foreground mt-2">{format(new Date(), "MMMM do, yyyy")}</p>
              </div>

              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing here..."
                className={`flex-grow resize-none border-none bg-transparent shadow-none focus-visible:ring-0 text-[#2C1810] leading-relaxed placeholder:text-muted-foreground/50 bg-[linear-gradient(transparent_95%,rgba(0,0,0,0.05)_100%)] bg-[length:100%_2rem] ${getFontClass()}`}
                style={{ lineHeight: '2rem' }}
              />

              <div className="mt-4 flex justify-end">
                <Button onClick={handleSave} className="rounded-full bg-[#5C3317] hover:bg-[#3D1C02] text-white">
                  Save entry ✨
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
