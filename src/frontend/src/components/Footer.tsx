import { Link } from "@tanstack/react-router";
import { Flower2, Heart, Mail, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );
  return (
    <footer className="bg-maroon-dark text-amber-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-amber-200/20 flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-amber-200" />
              </div>
              <span className="font-serif-devanagari font-bold text-amber-100 text-xl">
                लग्नसेतू
              </span>
            </div>
            <p className="font-devanagari text-sm text-amber-200/80 leading-relaxed">
              सुंदर आणि पारंपारिक मराठी विवाह बायोडाटा तयार करण्याचे सर्वोत्तम ठिकाण.
            </p>
          </div>
          <div>
            <h3 className="font-devanagari font-semibold text-amber-200 mb-4">
              द्रुत दुवे
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-devanagari text-sm text-amber-100/70 hover:text-amber-200 transition-colors"
                  data-ocid="footer.link"
                >
                  होम
                </Link>
              </li>
              <li>
                <Link
                  to="/form"
                  className="font-devanagari text-sm text-amber-100/70 hover:text-amber-200 transition-colors"
                  data-ocid="footer.link"
                >
                  बायोडाटा तयार करा
                </Link>
              </li>
              <li>
                <a
                  href="#templates"
                  className="font-devanagari text-sm text-amber-100/70 hover:text-amber-200 transition-colors"
                  data-ocid="footer.link"
                >
                  टेम्पलेट्स
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-devanagari font-semibold text-amber-200 mb-4">
              संपर्क
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-amber-100/70">
                <Mail className="w-4 h-4" />
                <span>help@lagnasetu.in</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-amber-100/70">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber-200/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-200/60">
          <span className="font-devanagari">
            © {year} लग्नसेतू. सर्व हक्क राखीव.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-amber-200 transition-colors"
          >
            Built with <Heart className="w-3 h-3 fill-current" /> using
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
