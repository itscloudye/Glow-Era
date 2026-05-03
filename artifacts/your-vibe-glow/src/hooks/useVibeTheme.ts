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
    pageBg: "linear-gradient(150deg, #2A0616 0%, #3A0A1E 35%, #5A1030 70%, #9B2555 100%)",
    cardBg: "rgba(42,6,22,0.75)",
    cardBorder: "rgba(155,37,85,0.35)",
    accent: "#D4A0B5",
    text: "#F5E6C8",
    subtext: "#D4A0B5",
    buttonBg: "#9B2555",
    buttonText: "#F5E6C8",
    inputBg: "rgba(58,10,30,0.6)",
    divider: "rgba(155,37,85,0.3)",
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
    pageBg: "linear-gradient(150deg, #F8F5FF 0%, #EDE8F5 40%, #DDD0F0 100%)",
    cardBg: "rgba(248,245,255,0.92)",
    cardBorder: "rgba(201,184,232,0.4)",
    accent: "#9B7ACC",
    text: "#4A3570",
    subtext: "#7B6AA0",
    buttonBg: "#6B5AA0",
    buttonText: "#ffffff",
    inputBg: "rgba(237,232,245,0.7)",
    divider: "rgba(201,184,232,0.35)",
    isDark: false,
    vibe: "Balanced Muse",
  },
};

export function useVibeTheme(): VibeTheme {
  const [vibeResult] = useLocalStorage("vibeResult", "");
  return THEMES[vibeResult] ?? THEMES[""];
}
