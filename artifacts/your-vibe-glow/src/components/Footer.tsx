import { useLocalStorage } from "@/hooks/useLocalStorage";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 18" fill="currentColor" className="w-4 h-4 inline-block">
      <path d="M10 16C10 16 1 10 1 5C1 2.5 3 1 5.5 1C7.2 1 8.8 2 10 3.2C11.2 2 12.8 1 14.5 1C17 1 19 2.5 19 5C19 10 10 16 10 16Z" />
    </svg>
  );
}

export function Footer() {
  const [vibeResult] = useLocalStorage("vibeResult", "");
  const isDark = vibeResult === "Dark Feminine";

  const bg = isDark
    ? "bg-[#1A0008] border-t border-white/10"
    : "bg-white border-t border-border/40";
  const headingColor = isDark ? "text-[#F5E6C8]" : "text-foreground";
  const textColor = isDark ? "text-[#D4A0B5]" : "text-muted-foreground";
  const accentColor = isDark ? "#C9A84C" : "#9B2555";
  const divider = isDark ? "border-white/10" : "border-border/40";
  const socialHover = isDark ? "hover:text-[#F5E6C8]" : "hover:text-primary";

  return (
    <footer className={`w-full ${bg}`}>
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand column */}
          <div className="space-y-4">
            <h3 className={`text-xl font-serif font-bold shimmer-text`}>Glow Era ✨</h3>
            <p className={`text-sm leading-relaxed ${textColor}`}>
              Your personal glow-up companion. Built for girls who are in their growth era and refuse to dim their shine.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 pt-1">
              <a
                href="https://instagram.com/glowera.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${textColor} ${socialHover}`}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://tiktok.com/@glowera.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${textColor} ${socialHover}`}
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://pinterest.com/glowera"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${textColor} ${socialHover}`}
                aria-label="Pinterest"
              >
                <PinterestIcon />
              </a>
            </div>
          </div>

          {/* Pages column */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-widest ${headingColor}`}>
              Pages
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Dashboard" },
                { href: "/tracker", label: "Glow Up Tracker" },
                { href: "/checkin", label: "Daily Check-In" },
                { href: "/journal", label: "My Journal" },
                { href: "/account", label: "Account" },
                { href: "/suggestions", label: "Suggestions" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`text-sm transition-colors ${textColor} ${socialHover}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-widest ${headingColor}`}>
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <p className={`text-xs uppercase tracking-wider mb-0.5 ${textColor} opacity-60`}>Email</p>
                <a
                  href="mailto:hello@glowera.app"
                  className={`text-sm transition-colors ${textColor} ${socialHover}`}
                >
                  hello@glowera.app
                </a>
              </li>
              <li>
                <p className={`text-xs uppercase tracking-wider mb-0.5 ${textColor} opacity-60`}>Instagram</p>
                <a
                  href="https://instagram.com/glowera.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${textColor} ${socialHover}`}
                >
                  @glowera.app
                </a>
              </li>
              <li>
                <p className={`text-xs uppercase tracking-wider mb-0.5 ${textColor} opacity-60`}>TikTok</p>
                <a
                  href="https://tiktok.com/@glowera.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${textColor} ${socialHover}`}
                >
                  @glowera.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-5 border-t ${divider} flex flex-col sm:flex-row items-center justify-between gap-2`}>
          <p className={`text-xs ${textColor}`}>
            © {new Date().getFullYear()} Glow Era. Made with{" "}
            <span style={{ color: accentColor }}>
              <HeartIcon />
            </span>{" "}
            for girls in their glow era.
          </p>
          <p className={`text-[10px] ${textColor} opacity-60`}>
            All data stays on your device. Your glow, your privacy. ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
