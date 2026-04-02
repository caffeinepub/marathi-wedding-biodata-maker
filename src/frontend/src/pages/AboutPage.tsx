import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSiteLang } from "@/contexts/LanguageContext";
import { Heart, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function AboutPage() {
  const { language } = useSiteLang();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[70px]">
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="font-devanagari text-sm font-semibold text-gold tracking-widest uppercase mb-2">
                ✦ आमच्याबद्दल ✦
              </p>
              <h1
                className="font-serif-devanagari font-bold text-maroon"
                style={{ fontSize: "clamp(1.9rem, 5vw, 2.8rem)" }}
              >
                लग्नसेतू
              </h1>
              <p className="font-display text-sm text-muted-foreground mt-1">
                LagnaSetu
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-card rounded-2xl shadow-card border border-border p-8 md:p-10 space-y-6"
            >
              <div className="space-y-3">
                <h2 className="font-serif-devanagari font-bold text-maroon text-xl">
                  {language === "english"
                    ? "About Us"
                    : language === "hindi"
                      ? "हमारे बारे में"
                      : language === "kannada"
                        ? "ನಮ್ಮ ಬಗ್ಗೆ"
                        : "आमच्याबद्दल"}
                </h2>
                <p className="font-devanagari text-foreground/80 leading-relaxed">
                  {language === "english"
                    ? "LagnaSetu is a simple and beautiful tool for creating Marathi wedding biodata. In just a few minutes, create a professional PDF biodata with your personal details, family information, horoscope, and photo."
                    : language === "hindi"
                      ? "लग्नसेतू मराठी विवाह बायोडेटा बनाने के लिए एक सरल और सुंदर साधन है। कुछ ही मिनटों में अपनी व्यक्तिगत जानकारी, पारिवारिक विवरण, कुंडली और फोटो के साथ एक पेशेवर PDF बायोडेटा बनाएं।"
                      : language === "kannada"
                        ? "LagnaSetu ಮರಾಠಿ ವಿವಾಹ ಬಯೋಡೇಟಾ ತಯಾರಿಸಲು ಒಂದು ಸರಳ ಮತ್ತು ಸುಂದರ ಸಾಧನ. ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ, ಕೌಟುಂಬಿಕ ವಿವರ, ಜಾತಕ ಮತ್ತು ಫೋಟೋ ಸಹಿತ ವೃತ್ತಿಪರ PDF ಬಯೋಡೇಟಾ ತಯಾರಿಸಿ."
                        : "लग्नसेतू हे मराठी विवाह बायोडाटा तयार करण्यासाठी एक सोपे आणि सुंदर साधन आहे. फक्त काही मिनिटांत आपली वैयक्तिक माहिती, कौटुंबिक विवरण, कुंडली आणि फोटोसह एक व्यावसायिक PDF बायोडाटा तयार करा."}
                </p>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <h2 className="font-serif-devanagari font-bold text-maroon text-xl">
                  {language === "english"
                    ? "Features"
                    : language === "hindi"
                      ? "विशेषताएं"
                      : language === "kannada"
                        ? "ವೈಶಿಷ್ಟ್ಯಗಳು"
                        : "वैशिष्ट्ये"}
                </h2>
                <ul className="space-y-2">
                  {(language === "english"
                    ? [
                        "6 beautiful professionally designed templates",
                        "Support for multiple religions and languages",
                        "Photo upload with crop facility",
                        "One-time payment of ₹49 — no subscription",
                        "Secure payment via Razorpay (UPI, Cards, Net Banking)",
                        "A4 sized single-page PDF download",
                      ]
                    : language === "hindi"
                      ? [
                          "6 सुंदर और पेशेवर टेम्पलेट",
                          "कई धर्मों और भाषाओं का समर्थन",
                          "क्रॉप सुविधा के साथ फोटो अपलोड",
                          "₹49 एकमुश्त भुगतान — कोई सदस्यता नहीं",
                          "Razorpay के माध्यम से सुरक्षित भुगतान",
                          "A4 आकार का एकल-पृष्ठ PDF डाउनलोड",
                        ]
                      : language === "kannada"
                        ? [
                            "6 ಸುಂದರ ವೃತ್ತಿಪರ ಟೆಂಪ್ಲೇಟ್‌ಗಳು",
                            "ಅನೇಕ ಧರ್ಮಗಳು ಮತ್ತು ಭಾಷೆಗಳ ಬೆಂಬಲ",
                            "ಕ್ರಾಪ್ ಸೌಲಭ್ಯದೊಂದಿಗೆ ಫೋಟೋ ಅಪ್‌ಲೋಡ್",
                            "₹49 ಒಂದು ಬಾರಿ ಪಾವತಿ — ಚಂದಾದಾರಿಕೆ ಇಲ್ಲ",
                            "Razorpay ಮೂಲಕ ಸುರಕ್ಷಿತ ಪಾವತಿ",
                            "A4 ಗಾತ್ರದ ಒಂದೇ-ಪಾನ PDF ಡೌನ್‌ಲೋಡ",
                          ]
                        : [
                            "6 सुंदर आणि व्यावसायिक टेम्पलेट",
                            "अनेक धर्म आणि भाषांचा आधार",
                            "Crop सुविधेसह फोटो अपलोड",
                            "₹49 एकदाच पेमेंट — कोणतीही subscription नाही",
                            "Razorpay द्वारे सुरक्षित पेमेंट (UPI, Cards, Net Banking)",
                            "A4 आकाराचा एकाच page PDF डाउनलोड",
                          ]
                  ).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-maroon mt-0.5">✦</span>
                      <span className="font-devanagari text-foreground/80 text-sm leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <h2 className="font-serif-devanagari font-bold text-maroon text-xl">
                  {language === "english"
                    ? "Contact"
                    : language === "hindi"
                      ? "संपर्क"
                      : language === "kannada"
                        ? "ಸಂಪರ್ಕ"
                        : "संपर्क"}
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Mail className="w-4 h-4 text-maroon shrink-0" />
                    <a
                      href="mailto:help@lagnasetu.in"
                      className="font-mono hover:text-maroon transition-colors"
                    >
                      help@lagnasetu.in
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <MapPin className="w-4 h-4 text-maroon shrink-0" />
                    <span className="font-devanagari">Maharashtra, India</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 text-center">
                <p className="font-devanagari text-muted-foreground text-sm flex items-center justify-center gap-1.5">
                  Made with{" "}
                  <Heart className="w-4 h-4 fill-maroon text-maroon" /> for
                  Maharashtra
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
