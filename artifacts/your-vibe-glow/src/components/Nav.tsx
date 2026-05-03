import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function Nav() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [vibeResult] = useLocalStorage("vibeResult", "");

  const isDark = vibeResult === "Dark Feminine";

  const navBg = isDark
    ? "bg-[#2D0010]/85 border-b border-white/10 backdrop-blur-md"
    : "glass-card border-b border-border/40";

  const textColor = isDark ? "text-[#F5E6C8]" : "text-foreground";
  const mutedColor = isDark ? "text-[#D4A0B5]" : "text-muted-foreground";
  const activeColor = isDark ? "text-[#F5E6C8] border-[#C9A84C]" : "text-primary border-primary";

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/tracker", label: "Tracker" },
    { href: "/checkin", label: "Check-In" },
    { href: "/journal", label: "Journal" },
    { href: "/moodboard", label: "ypur pintrest board" },
    { href: "/suggestions", label: "Suggestions" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full ${navBg}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className={`text-xl font-serif font-semibold shimmer-text`}>
          Glow Era ✨
        </Link>

        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                location === link.href
                  ? `${activeColor} border-b-2 pb-0.5`
                  : `${mutedColor} hover:${textColor}`
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${textColor}`}
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className={`md:hidden absolute top-16 left-0 w-full flex flex-col p-4 border-t ${navBg}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`py-3 px-4 text-base font-medium rounded-md mb-1 transition-colors ${
                location === link.href
                  ? isDark ? "bg-[#800020]/40 text-[#F5E6C8]" : "bg-primary/10 text-primary"
                  : isDark ? "text-[#D4A0B5] hover:bg-white/5" : "hover:bg-muted text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
