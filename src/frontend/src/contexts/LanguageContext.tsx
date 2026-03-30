import type React from "react";
import { createContext, useContext, useState } from "react";

export type SiteLang = "marathi" | "hindi" | "english" | "kannada" | "urdu";

interface LanguageContextType {
  language: SiteLang;
  setLanguage: (lang: SiteLang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "marathi",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SiteLang>(() => {
    try {
      return (localStorage.getItem("siteLang") as SiteLang) || "marathi";
    } catch {
      return "marathi";
    }
  });

  const setLanguage = (lang: SiteLang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("siteLang", lang);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useSiteLang() {
  return useContext(LanguageContext);
}
