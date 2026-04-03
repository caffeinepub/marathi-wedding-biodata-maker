import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSiteLang } from "@/contexts/LanguageContext";
import { SITE_T } from "@/i18n/siteTranslations";
import { Link } from "@tanstack/react-router";
import { CheckCircle, ChevronRight, Download, Edit3, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LandingPage() {
  const { language } = useSiteLang();
  const T = SITE_T[language];
  // const isRtl = language === "urdu"; // TODO: re-enable Muslim/Urdu
  const isRtl = false;

  // Handle referral query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      const msg =
        language === "english"
          ? "Your friend suggested LagnaSetu! Let's create your biodata."
          : language === "hindi"
            ? "आपके मित्र ने लग्नसेतू suggest किया! बायोडेटा बनाना शुरू करें।"
            : "आपल्या मित्रांनी तुम्हाला suggest केले! बायोडाटा बनवायला सुरुवात करूया.";
      toast(msg, { duration: 5000 });
    }
  }, [language]);

  const STEPS = [
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: T.step1_title,
      subtitle: T.step1_subtitle,
      desc: T.step1_desc,
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: T.step2_title,
      subtitle: T.step2_subtitle,
      desc: T.step2_desc,
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: T.step3_title,
      subtitle: T.step3_subtitle,
      desc: T.step3_desc,
    },
  ];

  const TESTIMONIALS = [
    { name: T.t1_name, location: T.t1_loc, quote: T.t1_quote, rating: 5 },
    { name: T.t2_name, location: T.t2_loc, quote: T.t2_quote, rating: 5 },
    { name: T.t3_name, location: T.t3_loc, quote: T.t3_quote, rating: 5 },
  ];

  const TEMPLATES = [
    {
      id: "classic",
      name: T.tpl_classic_name,
      desc: T.tpl_classic_desc,
      bg: "#fff",
      border: "#8B1A1A",
      header: "#8B1A1A",
      headerText: "#fff8f0",
      accent: "#f5e8e8",
    },
    {
      id: "floral",
      name: T.tpl_floral_name,
      desc: T.tpl_floral_desc,
      bg: "#FDF6EE",
      border: "#C8956A",
      header: "#9B4400",
      headerText: "#fff8f0",
      accent: "#fce8d4",
    },
    {
      id: "rajeshahi",
      name: T.tpl_rajeshahi_name,
      desc: T.tpl_rajeshahi_desc,
      bg: "#8B0000",
      border: "#8B0000",
      header: "#8B0000",
      headerText: "#fff8f0",
      accent: "#fffaf8",
    },
    {
      id: "aadhunik",
      name: T.tpl_aadhunik_name,
      desc: T.tpl_aadhunik_desc,
      bg: "#fff",
      border: "#1a1a2e",
      header: "#1a1a2e",
      headerText: "#ffffff",
      accent: "#f3f4f6",
    },
    {
      id: "shreshtha",
      name: T.tpl_shreshtha_name,
      desc: T.tpl_shreshtha_desc,
      bg: "#FAFAF0",
      border: "#C9A84C",
      header: "#8B6914",
      headerText: "#FAFAF0",
      accent: "#fdf5dc",
    },
    {
      id: "daivi",
      name: T.tpl_daivi_name,
      desc: T.tpl_daivi_desc,
      bg: "#0A1628",
      border: "#C9A84C",
      header: "#0A1628",
      headerText: "#ffd700",
      accent: "#112240",
    },
    {
      id: "paramparik",
      name: T.tpl_paramparik_name,
      desc: T.tpl_paramparik_desc,
      bg: "#FFFDF5",
      border: "#B8860B",
      header: "#B8860B",
      headerText: "#FFFDF5",
      accent: "#FFF8DC",
    },
    {
      id: "manohar",
      name: T.tpl_manohar_name,
      desc: T.tpl_manohar_desc,
      bg: "#F0FAF5",
      border: "#1B6B5A",
      header: "#1B6B5A",
      headerText: "#ffffff",
      accent: "#D4F0E5",
    },
    {
      id: "saundarya",
      name: T.tpl_saundarya_name,
      desc: T.tpl_saundarya_desc,
      bg: "#FFF5F8",
      border: "#AD1457",
      header: "#AD1457",
      headerText: "#FFF5F8",
      accent: "#FCE4EC",
    },
    {
      id: "mayur",
      name: (T as any).tpl_mayur_name || "मयूर",
      desc: (T as any).tpl_mayur_desc || "मोराचा",
      bg: "#E0F7FA",
      border: "#006064",
      header: "#006064",
      headerText: "#ffffff",
      accent: "#B2EBF2",
    },
    {
      id: "ugawatya",
      name: (T as any).tpl_ugawatya_name || "उगवत्या सूर्याचा",
      desc: (T as any).tpl_ugawatya_desc || "केशरी",
      bg: "#FFF3E0",
      border: "#E65100",
      header: "#E65100",
      headerText: "#fff8f0",
      accent: "#FFE0B2",
    },
    {
      id: "kamal",
      name: (T as any).tpl_kamal_name || "कमळ",
      desc: (T as any).tpl_kamal_desc || "गुलाबी कमळ",
      bg: "#FFF5F8",
      border: "#C2185B",
      header: "#C2185B",
      headerText: "#FFF5F8",
      accent: "#FCE4EC",
    },
    {
      id: "rajat",
      name: (T as any).tpl_rajat_name || "रजत",
      desc: (T as any).tpl_rajat_desc || "रुपेरी",
      bg: "#F5F5F5",
      border: "#424242",
      header: "#424242",
      headerText: "#ffffff",
      accent: "#EEEEEE",
    },
  ];

  const PRICING_FEATURES = [
    T.pricing_f1,
    T.pricing_f2,
    T.pricing_f3,
    T.pricing_f4,
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? "rtl" : undefined}>
      <Header />

      {/* Hero */}
      <section className="pt-[70px] hero-gradient overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 md:order-1"
            >
              <p
                className="font-devanagari text-sm font-semibold text-gold tracking-wide uppercase mb-3"
                dir={isRtl ? "rtl" : undefined}
              >
                {T.hero_badge}
              </p>
              <h1
                className="font-serif-devanagari font-bold text-maroon leading-tight mb-4"
                style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}
                dir={isRtl ? "rtl" : undefined}
              >
                {T.hero_title1}
                <br />
                <span className="text-gold">{T.hero_title2}</span>
                {T.hero_title3 ? <> {T.hero_title3}</> : null}
              </h1>
              <p
                className="font-devanagari text-muted-foreground text-base md:text-lg leading-relaxed mb-8"
                dir={isRtl ? "rtl" : undefined}
              >
                {T.hero_desc}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-maroon text-xs font-devanagari font-semibold border border-amber-200">
                    ✅ {T.trust_badge}
                  </span>
                </div>
                <Link
                  to="/form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-devanagari font-semibold text-base bg-maroon text-amber-50 hover:opacity-90 transition-opacity shadow-card"
                  data-ocid="hero.primary_button"
                >
                  {T.hero_cta} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 md:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="w-64 md:w-72 bg-white rounded-[2.5rem] shadow-card-hover p-3 border-4 border-maroon/20">
                  <div className="bg-maroon rounded-[2rem] overflow-hidden">
                    <div className="h-8 flex items-center justify-center">
                      <div className="w-16 h-1.5 bg-amber-200/50 rounded-full" />
                    </div>
                    <div className="bg-amber-50 mx-2 mb-2 rounded-xl p-3">
                      <div className="text-center mb-2">
                        <div className="font-serif-devanagari text-maroon font-bold text-xs">
                          {T.mock_title}
                        </div>
                      </div>
                      <div className="flex justify-center mb-2">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center border-2 border-gold text-2xl">
                          👤
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="font-serif-devanagari font-bold text-maroon text-sm">
                          {T.mock_name}
                        </div>
                        <div className="font-devanagari text-xs text-muted-foreground">
                          {T.mock_age_height}
                        </div>
                        <div className="font-devanagari text-xs text-muted-foreground">
                          {T.mock_edu}
                        </div>
                      </div>
                      <div className="mt-2 border-t border-gold/30 pt-2 space-y-0.5">
                        {[T.mock_father, T.mock_rashi].map((t) => (
                          <div
                            key={t}
                            className="font-devanagari text-[10px] text-foreground/70"
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gold/20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-maroon/10 blur-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-devanagari text-sm font-semibold text-gold tracking-widest uppercase mb-2">
              {T.steps_badge}
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              {T.steps_title}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-2xl p-7 shadow-card text-center hover:shadow-card-hover transition-shadow border border-border"
              >
                <div className="w-16 h-16 rounded-2xl bg-maroon/10 flex items-center justify-center text-maroon mx-auto mb-4">
                  {step.icon}
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-3"
                  style={{ backgroundColor: "oklch(var(--gold))" }}
                >
                  {i + 1}
                </div>
                <h3 className="font-serif-devanagari font-bold text-maroon text-xl mb-1">
                  {step.title}
                </h3>
                <p className="font-devanagari text-xs font-semibold mb-3 text-gold">
                  {step.subtitle}
                </p>
                <p className="font-devanagari text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-devanagari text-sm font-semibold text-gold tracking-widest uppercase mb-2">
              {T.testimonials_badge}
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              {T.testimonials_title}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-card rounded-2xl p-7 shadow-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={`ts-${t.name}-${si}`}
                      className="w-4 h-4 fill-current"
                      style={{ color: "oklch(var(--gold))" }}
                    />
                  ))}
                </div>
                <p
                  className="font-devanagari text-foreground/80 text-sm leading-relaxed mb-5"
                  dir={isRtl ? "rtl" : undefined}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center font-serif-devanagari font-bold text-maroon">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-devanagari font-semibold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="font-devanagari text-xs text-muted-foreground">
                      {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-20 bg-amber-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-devanagari text-sm font-semibold text-gold tracking-widest uppercase mb-2">
              {T.templates_badge}
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              {T.templates_title}
            </h2>
            <p className="font-devanagari text-muted-foreground mt-3 text-sm">
              {T.templates_desc}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {TEMPLATES.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                data-ocid={`templates.${tpl.id}.card`}
                className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 cursor-pointer border-2"
                style={{ borderColor: tpl.border }}
              >
                <div style={{ background: tpl.bg }} className="p-3">
                  <div
                    style={{ background: tpl.header }}
                    className="rounded-lg px-2 py-2 mb-2 text-center"
                  >
                    <div
                      style={{
                        color: tpl.headerText,
                        fontSize: 8,
                        letterSpacing: "0.15em",
                        opacity: 0.8,
                      }}
                      className="font-devanagari"
                    >
                      ।। श्री गणेशाय नमः ।।
                    </div>
                    <div
                      style={{
                        color: tpl.headerText,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                      className="font-serif-devanagari"
                    >
                      विवाह बायोडाटा
                    </div>
                  </div>
                  <div
                    style={{ background: tpl.accent }}
                    className="rounded-lg p-2"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        style={{
                          width: 28,
                          height: 32,
                          background: tpl.border,
                          borderRadius: 4,
                          opacity: 0.3,
                          flexShrink: 0,
                        }}
                      />
                      <div className="flex-1">
                        <div
                          style={{
                            height: 7,
                            background: tpl.header,
                            borderRadius: 3,
                            opacity: 0.7,
                            width: "80%",
                          }}
                          className="mb-1"
                        />
                        <div
                          style={{
                            height: 5,
                            background: tpl.border,
                            borderRadius: 3,
                            opacity: 0.3,
                            width: "50%",
                          }}
                        />
                      </div>
                    </div>
                    {[
                      { w: 0.6, k: "r1" },
                      { w: 0.4, k: "r2" },
                      { w: 0.5, k: "r3" },
                    ].map(({ w, k }) => (
                      <div
                        key={k}
                        style={{
                          height: 4,
                          background: tpl.border,
                          borderRadius: 3,
                          opacity: 0.2,
                          width: `${w * 100}%`,
                          marginBottom: 4,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div
                  style={{ background: tpl.header }}
                  className="px-3 py-2 flex items-center justify-between"
                >
                  <span
                    style={{ color: tpl.headerText }}
                    className="font-serif-devanagari font-bold text-sm"
                  >
                    {tpl.name}
                  </span>
                  <span
                    style={{ color: tpl.headerText, opacity: 0.7 }}
                    className="font-devanagari text-xs"
                  >
                    {tpl.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/form"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-devanagari font-semibold text-sm bg-maroon text-amber-50 hover:opacity-90 transition-opacity shadow-card"
              data-ocid="templates.cta.button"
            >
              <ChevronRight className="w-4 h-4" /> {T.templates_cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-amber-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-devanagari text-sm font-semibold text-gold tracking-widest uppercase mb-2">
              {T.pricing_badge}
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              {T.pricing_title}
            </h2>
            <p className="font-devanagari text-muted-foreground mt-3 text-sm">
              {T.pricing_desc}
            </p>
          </motion.div>

          <div className="max-w-sm mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border-2 border-maroon bg-white shadow-card-hover p-8 flex flex-col gap-5"
              data-ocid="pricing.basic.card"
            >
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-maroon mb-1">
                  {T.pricing_price}
                </div>
                <div className="font-devanagari text-sm text-muted-foreground">
                  {T.pricing_sub}
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                {PRICING_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-maroon" />
                    <span className="font-devanagari text-sm text-foreground/80">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/form"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-devanagari font-semibold text-sm bg-maroon text-amber-50 hover:opacity-90 shadow-card transition-opacity"
                data-ocid="pricing.basic.button"
              >
                {T.pricing_cta} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <p className="text-center font-devanagari text-xs text-muted-foreground mt-8">
            {T.pricing_secure}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-maroon">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-serif-devanagari font-bold text-amber-100 text-2xl md:text-3xl mb-3"
              dir={isRtl ? "rtl" : undefined}
            >
              {T.cta_title}
            </h2>
            <p
              className="font-devanagari text-amber-200/80 text-base mb-7"
              dir={isRtl ? "rtl" : undefined}
            >
              {T.cta_desc}
            </p>
            <Link
              to="/form"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-devanagari font-semibold text-base bg-amber-100 text-maroon hover:bg-amber-200 transition-colors shadow-lg"
              data-ocid="cta.primary_button"
            >
              <CheckCircle className="w-5 h-5" />
              {T.cta_btn}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
