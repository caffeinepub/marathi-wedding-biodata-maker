import { type SiteLang, useSiteLang } from "@/contexts/LanguageContext";
import { SITE_T } from "@/i18n/siteTranslations";
import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { useState } from "react";

const LANG_OPTIONS: [SiteLang, string][] = [
  ["marathi", "मराठी"],
  ["hindi", "हिंदी"],
  ["english", "EN"],
  ["kannada", "ಕನ್ನಡ"],
  // ["urdu", "اردو"], // TODO: re-enable Muslim/Urdu
];

export default function Header() {
  const { language, setLanguage } = useSiteLang();
  const T = SITE_T[language];
  const [langOpen, setLangOpen] = useState(false);
  // TODO: re-enable Muslim/Urdu — isRtl was used for urdu RTL layout
  // const isRtl = language === "urdu";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
          <img
            src="/assets/generated/lagnasetu-logo-transparent.dim_200x200.png"
            alt="लग्नसेतू"
            className="h-9 w-9 object-contain"
            onError={(e) => {
              // Fallback to flower icon if image not found
              const parent = e.currentTarget.parentElement;
              if (parent) {
                e.currentTarget.style.display = "none";
                const fallback = document.createElement("div");
                fallback.className =
                  "w-9 h-9 rounded-lg bg-maroon flex items-center justify-center";
                fallback.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#fde68a' stroke-width='2' class='w-5 h-5'><path d='M12 22c-4.97 0-9-2.69-9-6 0-2 1.5-4 4-5.5S12 8 12 8s1.5 2 5 2.5S21 14 21 16c0 3.31-4.03 6-9 6z'/><path d='M12 22V8'/></svg>`;
                parent.insertBefore(fallback, e.currentTarget);
              }
            }}
          />
          <div>
            <div className="font-serif-devanagari font-bold text-maroon text-lg leading-tight">
              लग्नसेतू
            </div>
            <div className="font-display text-xs text-muted-foreground leading-none tracking-wide">
              LagnaSetu
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
          >
            {T.nav_home}
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
          >
            {T.nav_howItWorks}
          </a>
          <a
            href="#templates"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
          >
            {T.nav_templates}
          </a>

          {/* Language pills — desktop */}
          <div className="flex items-center gap-1 ml-1">
            {LANG_OPTIONS.map(([lang, label]) => (
              <button
                type="button"
                key={lang}
                onClick={() => setLanguage(lang)}
                data-ocid={`header.lang.${lang}.toggle`}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition-all border ${
                  language === lang
                    ? "bg-maroon text-amber-50 border-maroon"
                    : "bg-transparent text-muted-foreground border-border hover:border-maroon/50 hover:text-maroon"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Right: CTA + mobile lang toggle */}
        <div className="flex items-center gap-2">
          {/* Mobile language dropdown */}
          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              data-ocid="header.lang.toggle"
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-maroon hover:border-maroon/50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{LANG_OPTIONS.find(([l]) => l === language)?.[1]}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-card z-50 py-1 min-w-[110px]">
                {LANG_OPTIONS.map(([lang, label]) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangOpen(false);
                    }}
                    data-ocid={`header.lang.${lang}.toggle`}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-amber-50 transition-colors ${
                      language === lang ? "text-maroon" : "text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/form"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-devanagari font-semibold bg-maroon text-amber-50 hover:opacity-90 transition-opacity shadow-sm"
            data-ocid="header.primary_button"
          >
            {T.header_cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
