import { useRef, useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useVibeTheme } from "@/hooks/useVibeTheme";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, ImageIcon } from "lucide-react";

const COMPLIMENTS = [
  "gorgeous ✨",
  "obsessed with this 😍",
  "queen behavior 👑",
  "she's everything 🌹",
  "main character era 💫",
  "stunning bestie 🦋",
  "pure aesthetic 🌸",
  "this is so you 💕",
  "absolutely radiant 🌟",
  "iconic, actually 💎",
  "ethereal vibes 🤍",
  "that's giving everything 🔥",
];

type Photo = {
  id: string;
  src: string;
  compliment: string;
  caption: string;
};

type ToastCompliment = {
  id: string;
  text: string;
};

export default function Moodboard() {
  const [photos, setPhotos] = useLocalStorage<Photo[]>("moodboard_photos", []);
  const [boardTitle, setBoardTitle] = useLocalStorage("moodboard_title", "your pintrest board");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [toasts, setToasts] = useState<ToastCompliment[]>([]);
  const [dragging, setDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useVibeTheme();

  const fireCompliment = useCallback(() => {
    const text = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const readFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const compliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
        const newPhoto: Photo = {
          id: `photo_${Date.now()}_${Math.random()}`,
          src,
          compliment,
          caption: "",
        };
        setPhotos((prev) => [newPhoto, ...prev]);
        fireCompliment();
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    readFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    readFiles(e.dataTransfer.files);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, caption } : p)));
  };

  return (
    <div className="w-full min-h-screen" style={{ background: t.pageBg }}>

      {/* Floating compliment toasts */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl backdrop-blur-md"
              style={{
                background: t.isDark
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.92)",
                color: t.text,
                border: `1.5px solid ${t.accent}60`,
                boxShadow: `0 8px 32px ${t.accent}30`,
              }}
            >
              {toast.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
        <div className="mb-8 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="board-title-font text-xs uppercase tracking-[0.35em] mb-2" style={{ color: t.subtext }}>
                your pintrest board
              </p>
              {editingTitle ? (
                <input
                  autoFocus
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onBlur={() => {
                    if (titleInput.trim()) setBoardTitle(titleInput.trim());
                    setEditingTitle(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (titleInput.trim()) setBoardTitle(titleInput.trim());
                      setEditingTitle(false);
                    }
                    if (e.key === "Escape") setEditingTitle(false);
                  }}
                  className="board-title-font text-3xl md:text-4xl font-bold bg-transparent border-b-2 outline-none w-full"
                  style={{ color: t.text, borderColor: t.accent }}
                />
              ) : (
                <h1
                  className="board-title-font text-3xl md:text-4xl font-bold cursor-pointer hover:opacity-75 transition-opacity"
                  style={{ color: t.text }}
                  onClick={() => { setTitleInput(boardTitle); setEditingTitle(true); }}
                  title="Click to rename"
                >
                  {boardTitle}
                </h1>
              )}
              <p className="mt-1 text-sm" style={{ color: t.subtext }}>
                {photos.length === 0 ? "save and upload ideas to build your board" : `${photos.length} photo${photos.length === 1 ? "" : "s"} on your board`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-85 shrink-0"
                style={{ background: t.buttonBg, color: t.buttonText }}
              >
                <Plus className="w-4 h-4" />
                Add Photos
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["For you", "Beauty", "Outfits", "Travel", "Room inspo", "Glow up"].map((item, idx) => (
              <button
                key={item}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                style={{
                  background: idx === 0 ? t.buttonBg : `${t.accent}14`,
                  color: idx === 0 ? t.buttonText : t.text,
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Drop zone / empty state */}
        {photos.length === 0 ? (
          <motion.div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            animate={dragging ? { scale: 1.01 } : { scale: 1 }}
            className="flex flex-col items-center justify-center gap-6 cursor-pointer rounded-3xl border-2 border-dashed py-24 transition-all"
            style={{
              borderColor: dragging ? t.accent : `${t.accent}50`,
              background: dragging ? `${t.accent}08` : "transparent",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
              style={{ background: `${t.accent}18` }}
            >
              🌸
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold mb-1" style={{ color: t.text }}>
                start your glow board
              </p>
              <p className="text-sm" style={{ color: t.subtext }}>
                drag & drop photos or click to upload
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
              style={{ background: `${t.accent}20`, color: t.text }}
            >
              <Upload className="w-4 h-4" />
              Choose photos
            </div>
          </motion.div>
        ) : (
          <>
            {/* Drop zone strip */}
            <motion.div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              animate={dragging ? { scale: 1.01 } : { scale: 1 }}
              className="mb-6 flex items-center gap-3 cursor-pointer rounded-2xl border-2 border-dashed px-6 py-4 transition-all"
              style={{
                borderColor: dragging ? t.accent : `${t.accent}40`,
                background: dragging ? `${t.accent}08` : `${t.accent}04`,
              }}
            >
              <ImageIcon className="w-5 h-5 shrink-0" style={{ color: t.accent }} />
              <span className="text-sm" style={{ color: t.subtext }}>
                drag more photos here or click to add
              </span>
            </motion.div>

            {/* Pinterest home feed */}
            <div
              className="columns-2 md:columns-3 xl:columns-4 gap-4 space-y-4"
              style={{ columnGap: "16px" }}
            >
              {photos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx < 8 ? idx * 0.04 : 0, type: "spring", stiffness: 260, damping: 22 }}
                  className="break-inside-avoid mb-4 relative group rounded-[28px] overflow-hidden cursor-pointer bg-white"
                  onMouseEnter={() => setHoveredId(photo.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    boxShadow: hoveredId === photo.id
                      ? `0 12px 36px rgba(0,0,0,0.18)`
                      : `0 4px 16px rgba(0,0,0,0.10)`,
                    transition: "box-shadow 0.25s ease",
                  }}
                >
                  {/* Photo */}
                  <img
                    src={photo.src}
                    alt="moodboard photo"
                    className="w-full object-cover block"
                    style={{ borderRadius: "28px" }}
                    draggable={false}
                  />

                  {/* Hover overlay */}
                  <AnimatePresence>
                    {hoveredId === photo.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col justify-between p-3"
                        style={{
                          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)",
                          borderRadius: "28px",
                        }}
                      >
                        {/* Remove button */}
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => { e.stopPropagation(); removePhoto(photo.id); }}
                            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        {/* Compliment + caption at bottom */}
                        <div className="space-y-1">
                          <p className="text-white text-xs font-semibold drop-shadow-sm">
                            {photo.compliment}
                          </p>
                          <input
                            value={photo.caption}
                            onChange={(e) => updateCaption(photo.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="add a caption..."
                            maxLength={60}
                            className="w-full bg-transparent text-white text-xs placeholder:text-white/60 outline-none border-b border-white/30 pb-0.5"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Always-visible caption (non-hover) */}
                  {photo.caption && hoveredId !== photo.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-white font-medium truncate"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                        borderRadius: "0 0 16px 16px",
                      }}
                    >
                      {photo.caption}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
