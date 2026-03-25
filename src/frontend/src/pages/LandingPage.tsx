import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "@tanstack/react-router";
import { CheckCircle, ChevronRight, Download, Edit3, Star } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    icon: <Edit3 className="w-8 h-8" />,
    title: "माहिती भरा",
    subtitle: "Fill Details",
    desc: "आपली वैयक्तिक, कौटुंबिक आणि कुंडली माहिती सोप्या फॉर्ममध्ये भरा.",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "डिझाइन निवडा",
    subtitle: "Choose Design",
    desc: "आमच्या सुंदर पारंपारिक टेम्पलेट्समधून आपल्या पसंतीचे डिझाइन निवडा.",
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "डाउनलोड करा",
    subtitle: "Download",
    desc: "आपला तयार बायोडाटा पीडीएफ स्वरूपात डाउनलोड करा किंवा प्रिंट करा.",
  },
];

const TESTIMONIALS = [
  {
    name: "प्रिया देशमुख",
    location: "पुणे, महाराष्ट्र",
    quote:
      "लग्नसेतूवर बायोडाटा तयार करणे खूप सोपे होते. फक्त काही मिनिटांत सुंदर बायोडाटा तयार झाला!",
    rating: 5,
  },
  {
    name: "राहुल जोशी",
    location: "नागपूर, महाराष्ट्र",
    quote: "पारंपारिक डिझाइन बघून खूप आनंद झाला. आमच्या संपूर्ण कुटुंबाला हे आवडले.",
    rating: 5,
  },
  {
    name: "स्नेहा पाटील",
    location: "मुंबई, महाराष्ट्र",
    quote: "कुंडली माहिती आणि फोटो एकत्र सुंदर पद्धतीने मांडली जाते. खूप उपयुक्त आहे!",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-[70px] hero-gradient overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 md:order-1"
            >
              <p className="font-devanagari text-sm font-semibold text-gold tracking-wide uppercase mb-3">
                ✦ मराठी विवाह बायोडाटा ✦
              </p>
              <h1
                className="font-serif-devanagari font-bold text-maroon leading-tight mb-4"
                style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}
              >
                तुमचा विवाह बायोडाटा
                <br />
                <span className="text-gold">सुंदर पद्धतीने</span> तयार करा
              </h1>
              <p className="font-devanagari text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                पारंपारिक मराठी बायोडाटा आता डिजिटल पद्धतीने — कुंडली, कौटुंबिक माहिती
                आणि फोटोसह सहज तयार करा.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-devanagari font-semibold text-base bg-maroon text-amber-50 hover:opacity-90 transition-opacity shadow-card"
                  data-ocid="hero.primary_button"
                >
                  बायोडाटा तयार करा <ChevronRight className="w-4 h-4" />
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
                          ✦ विवाह बायोडाटा ✦
                        </div>
                      </div>
                      <div className="flex justify-center mb-2">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center border-2 border-gold text-2xl">
                          👤
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="font-serif-devanagari font-bold text-maroon text-sm">
                          राधा देशपांडे
                        </div>
                        <div className="font-devanagari text-xs text-muted-foreground">
                          वय: २५ वर्षे | उंची: ५'४"
                        </div>
                        <div className="font-devanagari text-xs text-muted-foreground">
                          शिक्षण: B.E. (Computer)
                        </div>
                      </div>
                      <div className="mt-2 border-t border-gold/30 pt-2 space-y-0.5">
                        {[
                          "वडिलांचे नाव: सुरेश देशपांडे",
                          "राशी: कर्क | नक्षत्र: पुष्य",
                        ].map((t) => (
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
              ✦ सोप्या पायऱ्या ✦
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              फक्त ३ पायऱ्यांमध्ये तयार करा
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
              ✦ अनुभव ✦
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              वापरकर्त्याचे अनुभव
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
                <p className="font-devanagari text-foreground/80 text-sm leading-relaxed mb-5">
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

      {/* Templates Section */}
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
              ✦ डिझाइन्स ✦
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              आमचे टेम्प्लेट्स
            </h2>
            <p className="font-devanagari text-muted-foreground mt-3 text-sm">
              ₹२९ मध्ये सर्व ६ सुंदर डिझाइन्स उपलब्ध
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                id: "classic",
                name: "क्लासिक",
                desc: "पारंपारिक",
                bg: "#fff",
                border: "#8B1A1A",
                header: "#8B1A1A",
                headerText: "#fff8f0",
                accent: "#f5e8e8",
              },
              {
                id: "floral",
                name: "फुलांचा",
                desc: "फुलांची सजावट",
                bg: "#FDF6EE",
                border: "#C8956A",
                header: "#9B4400",
                headerText: "#fff8f0",
                accent: "#fce8d4",
              },
              {
                id: "rajeshahi",
                name: "राजेशाही",
                desc: "शाही लाल",
                bg: "#8B0000",
                border: "#8B0000",
                header: "#8B0000",
                headerText: "#fff8f0",
                accent: "#fffaf8",
              },
              {
                id: "aadhunik",
                name: "आधुनिक",
                desc: "स्वच्छ आधुनिक",
                bg: "#fff",
                border: "#1a1a2e",
                header: "#1a1a2e",
                headerText: "#ffffff",
                accent: "#f3f4f6",
              },
              {
                id: "shreshtha",
                name: "श्रेष्ठ",
                desc: "सोनेरी",
                bg: "#FAFAF0",
                border: "#C9A84C",
                header: "#8B6914",
                headerText: "#FAFAF0",
                accent: "#fdf5dc",
              },
              {
                id: "daivi",
                name: "दैवी",
                desc: "दैवी नील",
                bg: "#0A1628",
                border: "#C9A84C",
                header: "#0A1628",
                headerText: "#ffd700",
                accent: "#112240",
              },
            ].map((tpl, i) => (
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
                {/* Mini biodata preview */}
                <div style={{ background: tpl.bg }} className="p-3">
                  {/* Header bar */}
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
                      ॥ श्री गणेशाय नमः ॥
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
                  {/* Content area */}
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
                {/* Template name footer */}
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
              <ChevronRight className="w-4 h-4" /> सर्व टेम्प्लेट्स पाहा
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
              ✦ किंमत ✦
            </p>
            <h2
              className="font-serif-devanagari font-bold text-maroon"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              साधी व परवडणारी किंमत
            </h2>
            <p className="font-devanagari text-muted-foreground mt-3 text-sm">
              एकदा पेमेंट करा — आयुष्यभर वापरा
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
                  ₹२९
                </div>
                <div className="font-devanagari text-sm text-muted-foreground">
                  एकदाच पेमेंट - सर्व ६ टेम्प्लेट्स
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "सर्व टेम्पलेट्स",
                  "PDF डाउनलोड",
                  "JPG डाउनलोड",
                  "सर्व माहिती",
                  "कस्टम फील्ड्स",
                  "प्रिंट सुविधा",
                ].map((f) => (
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
                आत्ता सुरू करा <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <p className="text-center font-devanagari text-xs text-muted-foreground mt-8">
            🔒 Razorpay द्वारे सुरक्षित पेमेंट — UPI, Credit/Debit Card, Net Banking
          </p>
        </div>
      </section>

      <section className="py-16 bg-maroon">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif-devanagari font-bold text-amber-100 text-2xl md:text-3xl mb-3">
              आजच तुमचा बायोडाटा तयार करा!
            </h2>
            <p className="font-devanagari text-amber-200/80 text-base mb-7">
              मोफत आणि सोपे — फक्त काही मिनिटांत.
            </p>
            <Link
              to="/form"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-devanagari font-semibold text-base bg-amber-100 text-maroon hover:bg-amber-200 transition-colors shadow-lg"
              data-ocid="cta.primary_button"
            >
              <CheckCircle className="w-5 h-5" />
              आत्ता सुरू करा
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
