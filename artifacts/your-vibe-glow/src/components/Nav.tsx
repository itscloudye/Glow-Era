import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show nav on home or quiz
  if (location === "/" || location === "/quiz") return null;

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tracker", label: "Tracker" },
    { href: "/checkin", label: "Check-In" },
    { href: "/journal", label: "Journal" },
    { href: "/suggestions", label: "Suggestions" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-serif font-semibold shimmer-text">
          Glow Era ✨
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </Button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden glass-card absolute top-16 left-0 w-full flex flex-col p-4 border-t">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`py-3 px-4 text-base font-medium rounded-md mb-2 ${
                location === link.href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-foreground"
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
