import { useLocalStorage } from "./useLocalStorage";

export type VibeTheme = {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
  text: string;
  subtext: string;
  buttonBg: string;
  buttonText: string;
  inputBg: string;
  divider: string;
  isDark: boolean;
  vibe: string;
};

const THEMES: Record<string, VibeTheme> = {
  "": {
    pageBg: "#FAFAFA",
    cardBg: "rgba(255,255,255,0.95)",
    cardBorder: "rgba(200,200,200,0.4)",
    accent: "#9B2555",
    text: "#1a1a1a",
    subtext: "#6b7280",
    buttonBg: "#9B2555",
    buttonText: "#ffffff",
    inputBg: "rgba(255,255,255,0.85)",
    divider: "rgba(200,200,200,0.4)",
    isDark: false,
    vibe: "",
  },
  "Clean Girl": {
    pageBg: "linear-gradient(150deg, #FDF6EC 0%, #F5EBE0 40%, #EDD9BE 100%)",
    cardBg: "rgba(255,250,242,0.92)",
    cardBorder: "rgba(212,184,150,0.45)",
    accent: "#C49A60",
    text: "#5C3D1E",
    subtext: "#8B6340",
    buttonBg: "#9B7040",
    buttonText: "#ffffff",
    inputBg: "rgba(253,246,236,0.8)",
    divider: "rgba(212,184,150,0.35)",
    isDark: false,
    vibe: "Clean Girl",
  },
  "Dark Feminine": {
    pageBg: "linear-gradient(150deg, #1A0008 0%, #2D0010 35%, #4D0018 70%, #800020 100%)",
    cardBg: "rgba(29,0,16,0.78)",
    cardBorder: "rgba(128,0,32,0.4)",
    accent: "#D4A0B5",
    text: "#F5E6C8",
    subtext: "#D4A0B5",
    buttonBg: "#800020",
    buttonText: "#F5E6C8",
    inputBg: "rgba(45,0,16,0.65)",
    divider: "rgba(128,0,32,0.32)",
    isDark: true,
    vibe: "Dark Feminine",
  },
  "Soft Glow": {
    pageBg: "linear-gradient(150deg, #FFF5F8 0%, #FDE8EF 40%, #F8C8D4 100%)",
    cardBg: "rgba(255,248,252,0.92)",
    cardBorder: "rgba(244,168,192,0.4)",
    accent: "#E8809F",
    text: "#7D2547",
    subtext: "#B05575",
    buttonBg: "#9B2555",
    buttonText: "#ffffff",
    inputBg: "rgba(255,245,248,0.8)",
    divider: "rgba(244,168,192,0.35)",
    isDark: false,
    vibe: "Soft Glow",
  },
  "Balanced Muse": {
    pageBg: "linear-gradient(150deg, #F7F1FF 0%, #EEE5FB 42%, #E3D4F7 100%)",
    cardBg: "rgba(250,245,255,0.94)",
    cardBorder: "rgba(209,189,235,0.45)",
    accent: "#B89AE8",
    text: "#4E3A72",
    subtext: "#7E6A9E",
    buttonBg: "#8C73C6",
    buttonText: "#ffffff",
    inputBg: "rgba(241,234,251,0.8)",
    divider: "rgba(209,189,235,0.35)",
    isDark: false,
    vibe: "Balanced Muse",
  },
};

export function useVibeTheme(): VibeTheme {
  const [vibeResult] = useLocalStorage("vibeResult", "");
  return THEMES[vibeResult] ?? THEMES[""];
}
