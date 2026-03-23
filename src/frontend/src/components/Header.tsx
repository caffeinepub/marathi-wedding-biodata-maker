import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
          <div className="w-9 h-9 rounded-lg bg-maroon flex items-center justify-center">
            <Flower2 className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="font-serif-devanagari font-bold text-maroon text-lg leading-tight">
              लग्नसेतू
            </div>
            <div className="font-display text-xs text-muted-foreground leading-none tracking-wide">
              LagnaSetu
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
          >
            होम
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
          >
            कसे काम करते
          </a>
          <a
            href="#templates"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
          >
            टेम्पलेट्स
          </a>
        </nav>
        <Link
          to="/form"
          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-devanagari font-semibold bg-maroon text-amber-50 hover:opacity-90 transition-opacity shadow-sm"
          data-ocid="header.primary_button"
        >
          बायोडाटा तयार करा
        </Link>
      </div>
    </header>
  );
}
