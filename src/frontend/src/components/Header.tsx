import { type SiteLang, useSiteLang } from "@/contexts/LanguageContext";
import { SITE_T } from "@/i18n/siteTranslations";
import { Link } from "@tanstack/react-router";
import { Flower2, Globe } from "lucide-react";
import { useState } from "react";

const LANG_OPTIONS: [SiteLang, string][] = [
  ["marathi", "मराठी"],
  ["hindi", "हिंदी"],
  ["english", "EN"],
  ["kannada", "ಕನ್ನಡ"],
  ["urdu", "اردو"],
];

export default function Header() {
  const { language, setLanguage } = useSiteLang();
  const T = SITE_T[language];
  const [langOpen, setLangOpen] = useState(false);
  const isRtl = language === "urdu";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
            dir={isRtl ? "rtl" : undefined}
          >
            {T.nav_home}
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
            dir={isRtl ? "rtl" : undefined}
          >
            {T.nav_howItWorks}
          </a>
          <a
            href="#templates"
            className="text-sm font-devanagari text-foreground hover:text-maroon transition-colors"
            data-ocid="nav.link"
            dir={isRtl ? "rtl" : undefined}
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
                dir={lang === "urdu" ? "rtl" : undefined}
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
              <span dir={isRtl ? "rtl" : undefined}>
                {LANG_OPTIONS.find(([l]) => l === language)?.[1]}
              </span>
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
                    dir={lang === "urdu" ? "rtl" : undefined}
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
            dir={isRtl ? "rtl" : undefined}
          >
            {T.header_cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
