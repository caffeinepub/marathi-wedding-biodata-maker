import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
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

const TEMPLATES = [
  {
    name: "पारंपारिक",
    eng: "Traditional",
    img: "/assets/generated/template-traditional.dim_400x560.jpg",
    id: "traditional",
  },
  {
    name: "आधुनिक",
    eng: "Modern",
    img: "/assets/generated/template-modern.dim_400x560.jpg",
    id: "modern",
  },
  {
    name: "राजेशाही",
    eng: "Royal",
    img: "/assets/generated/template-royal.dim_400x560.jpg",
    id: "royal",
  },
  {
    name: "पुष्पलता",
    eng: "Floral",
    img: "/assets/generated/template-floral.dim_400x560.jpg",
    id: "floral",
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

const PRICING_PLANS = [
  {
    id: "basic",
    name: "बेसिक",
    nameEng: "Basic",
    price: 20,
    features: ["पारंपारिक टेम्पलेट", "बायोडाटा डाउनलोड", "प्रिंट सुविधा"],
    popular: false,
  },
  {
    id: "standard",
    name: "स्टँडर्ड",
    nameEng: "Standard",
    price: 50,
    features: [
      "पारंपारिक टेम्पलेट",
      "आधुनिक टेम्पलेट",
      "बायोडाटा डाउनलोड",
      "प्रिंट सुविधा",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "प्रीमियम",
    nameEng: "Premium",
    price: 90,
    features: [
      "सर्व ४ टेम्पलेट्स",
      "पारंपारिक + आधुनिक",
      "राजेशाही + पुष्पलता",
      "बायोडाटा डाउनलोड",
      "प्रिंट सुविधा",
    ],
    popular: false,
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
                <a
                  href="#templates"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-devanagari font-semibold text-base border-2 border-maroon text-maroon bg-transparent hover:bg-maroon/5 transition-colors"
                  data-ocid="hero.secondary_button"
                >
                  टेम्पलेट्स पहा
                </a>
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
                          "संपर्क: +91 98765 43210",
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

      <section id="templates" className="py-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="font-devanagari text-sm font-semibold text-gold tracking-widest uppercase mb-2">
              ✦ आमचे डिझाइन्स ✦
            </p>
            <h2
              className="font-serif-devanagari font-bold text-amber-50"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              आमचे लोकप्रिय डिझाइन्स
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATES.map((tmpl, i) => (
              <motion.div
                key={tmpl.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
                data-ocid={`templates.item.${i + 1}`}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg mb-3 aspect-[5/7]">
                  <img
                    src={tmpl.img}
                    alt={`${tmpl.name} बायोडाटा टेम्पलेट`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/20 transition-colors duration-300 rounded-xl" />
                </div>
                <div className="text-center">
                  <div className="font-serif-devanagari font-semibold text-amber-100 text-sm mb-1">
                    {tmpl.name}
                  </div>
                  <div className="text-amber-200/60 text-xs font-display mb-3">
                    {tmpl.eng}
                  </div>
                  <Link
                    to="/form"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-devanagari font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "oklch(var(--gold))" }}
                    data-ocid={`templates.button.${i + 1}`}
                  >
                    हे निवडा
                  </Link>
                </div>
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

          <div className="grid sm:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-2xl border-2 p-7 flex flex-col gap-4 ${
                  plan.popular
                    ? "border-maroon bg-white shadow-card-hover"
                    : "border-border bg-card shadow-card"
                }`}
                data-ocid={`pricing.${plan.id}.card`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-maroon text-amber-50 font-devanagari text-xs px-4 py-1 shadow">
                    ⭐ सर्वात लोकप्रिय
                  </Badge>
                )}

                <div>
                  <div className="font-serif-devanagari font-bold text-maroon text-xl mb-0.5">
                    {plan.name}
                  </div>
                  <div className="font-display text-xs text-muted-foreground">
                    {plan.nameEng}
                  </div>
                </div>

                <div className="flex items-end gap-1">
                  <span className="font-display text-4xl font-bold text-maroon">
                    ₹{plan.price}
                  </span>
                  <span className="font-devanagari text-sm text-muted-foreground mb-1">
                    /एकदा
                  </span>
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-maroon shrink-0" />
                      <span className="font-devanagari text-sm text-foreground/80">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/form"
                  className={`mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-devanagari font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-maroon text-amber-50 hover:opacity-90 shadow-card"
                      : "border-2 border-maroon text-maroon bg-transparent hover:bg-maroon/5"
                  }`}
                  data-ocid={`pricing.${plan.id}.button`}
                >
                  आत्ता सुरू करा <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
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
