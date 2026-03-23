import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Download,
  Flower2,
  Printer,
} from "lucide-react";
import { useEffect, useState } from "react";
import type {
  ContactInfo,
  FamilyInfo,
  Horoscope,
  PersonalInfo,
} from "../backend";

interface SavedData {
  personal: PersonalInfo;
  family: FamilyInfo;
  horoscope: Horoscope;
  contact: ContactInfo;
  template: string;
  photoPreview: string | null;
}

const HOUSES_MR = [
  "लग्न",
  "धन",
  "सहज",
  "सुख",
  "पुत्र",
  "रिपु",
  "सप्तम",
  "मृत्यू",
  "धर्म",
  "कर्म",
  "लाभ",
  "व्यय",
];

const STYLES: Record<
  string,
  { headerBg: string; accent: string; bg: string; border: string }
> = {
  traditional: {
    headerBg: "bg-gradient-to-r from-red-900 to-red-800",
    accent: "text-red-900",
    bg: "bg-amber-50",
    border: "border-4 border-double border-amber-800",
  },
  modern: {
    headerBg: "bg-gradient-to-r from-slate-800 to-slate-700",
    accent: "text-slate-800",
    bg: "bg-white",
    border: "border-2 border-amber-400",
  },
  royal: {
    headerBg: "bg-gradient-to-r from-yellow-900 to-amber-900",
    accent: "text-yellow-900",
    bg: "bg-yellow-50",
    border: "border-4 border-yellow-700",
  },
  floral: {
    headerBg: "bg-gradient-to-r from-rose-700 to-pink-700",
    accent: "text-rose-800",
    bg: "bg-pink-50",
    border: "border-2 border-pink-400",
  },
};

const DEFAULT: SavedData = {
  personal: {
    name: "राधा सुरेश देशपांडे",
    dateOfBirth: "1999-05-14",
    timeOfBirth: "06:30",
    placeOfBirth: "पुणे",
    height: "५'४\"",
    complexion: "गोरा",
    education: "B.E. Computer Science",
    occupation: "Software Engineer",
    income: "₹60,000",
    religion: "हिंदू",
    caste: "ब्राह्मण",
    gotra: "कश्यप",
    manglikStatus: false,
  },
  family: {
    fatherName: "सुरेश विठ्ठल देशपांडे",
    fatherOccupation: "सरकारी अधिकारी (निवृत्त)",
    motherName: "सुमित्रा सुरेश देशपांडे",
    motherOccupation: "गृहिणी",
    siblingsInfo: "एक मोठा भाऊ - विवाहित",
    familyType: "एकत्र",
    nativePlace: "सातारा",
  },
  horoscope: {
    rashi: "कर्क",
    nakshatra: "पुष्य",
    gan: "देव",
    nadi: "आदि",
    charan: "२",
    planetaryPositions: [
      "रवि, बुध",
      "शुक्र",
      "",
      "चंद्र",
      "",
      "मंगळ",
      "गुरू",
      "",
      "शनि",
      "",
      "राहू",
      "केतू",
    ],
  },
  contact: {
    phone: "",
    email: "",
    address: "१२३, शांती नगर, पुणे - ४११०२१",
  },
  template: "traditional",
  photoPreview: null,
};

function Row({ label, value }: { label: string; value: string | boolean }) {
  return (
    <div className="flex gap-2 text-sm mb-1.5">
      <span className="font-devanagari text-gray-600 min-w-[140px] shrink-0">
        {label}:
      </span>
      <span className="font-devanagari font-medium text-gray-900">
        {typeof value === "boolean" ? (value ? "होय" : "नाही") : value || "—"}
      </span>
    </div>
  );
}

function SectionHead({ title, accent }: { title: string; accent: string }) {
  return (
    <div
      className={`flex items-center gap-2 mb-3 pb-1 border-b ${accent.replace("text-", "border-")}`}
    >
      <span className={`font-serif-devanagari font-bold text-base ${accent}`}>
        ✦ {title}
      </span>
    </div>
  );
}

export default function BiodataPreview() {
  const [data, setData] = useState<SavedData>(DEFAULT);
  const [showPayment, setShowPayment] = useState(false);
  const [paidPlan, setPaidPlan] = useState<string | null>(null);
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = sessionStorage.getItem("biodataFormData");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        /* use default */
      }
    }
    const plan = sessionStorage.getItem("biodataPaidPlan");
    if (plan) setPaidPlan(plan);
    const hf = sessionStorage.getItem("hiddenFields");
    if (hf) {
      try {
        setHiddenFields(new Set(JSON.parse(hf) as string[]));
      } catch {
        /* ignore */
      }
    }
  }, []);

  function handleDownloadClick() {
    if (paidPlan) {
      window.print();
    } else {
      setShowPayment(true);
    }
  }

  function handlePaymentSuccess(planId: string) {
    setPaidPlan(planId);
    setTimeout(() => window.print(), 300);
  }

  const st = STYLES[data.template] || STYLES.traditional;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="no-print max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <Link to="/form" data-ocid="preview.back.link">
          <Button variant="outline" className="font-devanagari gap-2">
            <ArrowLeft className="w-4 h-4" /> बायोडाटा संपादित करा
          </Button>
        </Link>
        <div className="flex gap-3 items-center">
          {paidPlan && (
            <span className="inline-flex items-center gap-1 font-devanagari text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <BadgeCheck className="w-3.5 h-3.5" /> भरले आहे
            </span>
          )}
          <Button
            onClick={() => window.print()}
            className="font-devanagari gap-2 bg-maroon text-amber-50 hover:opacity-90"
            data-ocid="preview.print.button"
          >
            <Printer className="w-4 h-4" /> प्रिंट करा
          </Button>
          <Button
            onClick={handleDownloadClick}
            variant="outline"
            className="font-devanagari gap-2 border-maroon text-maroon"
            data-ocid="preview.download.button"
          >
            <Download className="w-4 h-4" /> डाउनलोड
          </Button>
        </div>
      </div>

      <div
        className={`print-area max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-card-hover ${st.border} ${st.bg}`}
      >
        <div className={`${st.headerBg} p-6 text-center`}>
          <div className="font-serif-devanagari font-bold text-2xl mb-1 text-amber-100">
            ✦ विवाह बायोडाटा ✦
          </div>
          <div className="font-display text-sm opacity-80 text-amber-200">
            Vivah Biodata
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <div className="flex-1 text-center sm:text-left">
              <h1
                className={`font-serif-devanagari font-bold text-3xl mb-1 ${st.accent}`}
              >
                {data.personal.name}
              </h1>
              <p className="font-devanagari text-gray-600 text-sm">
                {!hiddenFields.has("manglikStatus") && (
                  <>मांगलिक: {data.personal.manglikStatus ? "होय" : "नाही"} | </>
                )}
                {!hiddenFields.has("religion") && (
                  <>धर्म: {data.personal.religion} | </>
                )}
                {!hiddenFields.has("caste") && <>जात: {data.personal.caste}</>}
              </p>
            </div>
            <div className="shrink-0">
              {data.photoPreview ? (
                <img
                  src={data.photoPreview}
                  alt="Profile"
                  className={`w-28 h-32 object-cover rounded-xl border-4 shadow-md ${st.border}`}
                />
              ) : (
                <div
                  className={`w-28 h-32 rounded-xl border-4 flex items-center justify-center text-5xl ${st.border} ${st.bg}`}
                >
                  👤
                </div>
              )}
            </div>
          </div>

          <div
            className={`h-0.5 w-full mb-6 ${st.accent.replace("text-", "bg-")}`}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <SectionHead title="वैयक्तिक माहिती" accent={st.accent} />
              <Row label="जन्म तारीख" value={data.personal.dateOfBirth} />
              {!hiddenFields.has("timeOfBirth") && (
                <Row label="जन्म वेळ" value={data.personal.timeOfBirth} />
              )}
              <Row label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
              <Row label="उंची" value={data.personal.height} />
              {!hiddenFields.has("complexion") && (
                <Row label="रंग" value={data.personal.complexion} />
              )}
              <Row label="शिक्षण" value={data.personal.education} />
              <Row label="व्यवसाय" value={data.personal.occupation} />
              {!hiddenFields.has("income") && (
                <Row label="मासिक उत्पन्न" value={data.personal.income} />
              )}
              {!hiddenFields.has("gotra") && (
                <Row label="गोत्र" value={data.personal.gotra} />
              )}
            </div>
            <div>
              <SectionHead title="कौटुंबिक माहिती" accent={st.accent} />
              <Row label="वडिलांचे नाव" value={data.family.fatherName} />
              {!hiddenFields.has("fatherOccupation") && (
                <Row
                  label="वडिलांचा व्यवसाय"
                  value={data.family.fatherOccupation}
                />
              )}
              <Row label="आईचे नाव" value={data.family.motherName} />
              {!hiddenFields.has("motherOccupation") && (
                <Row label="आईचा व्यवसाय" value={data.family.motherOccupation} />
              )}
              {!hiddenFields.has("siblingsInfo") && (
                <Row label="भाऊ-बहीण" value={data.family.siblingsInfo} />
              )}
              {!hiddenFields.has("familyType") && (
                <Row label="कुटुंब प्रकार" value={data.family.familyType} />
              )}
              {!hiddenFields.has("nativePlace") && (
                <Row label="मूळ गाव" value={data.family.nativePlace} />
              )}
            </div>
          </div>

          <div className="mt-6">
            <SectionHead title="कुंडली / जन्मपत्रिका" accent={st.accent} />
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
              {(
                [
                  ["राशी", data.horoscope.rashi, null],
                  ["नक्षत्र", data.horoscope.nakshatra, null],
                  ["गण", data.horoscope.gan, "gan"],
                  ["नाडी", data.horoscope.nadi, "nadi"],
                  ["चरण", data.horoscope.charan, "charan"],
                ] as [string, string, string | null][]
              ).map(([label, val, fieldKey]) =>
                fieldKey && hiddenFields.has(fieldKey) ? null : (
                  <div
                    key={label}
                    className="text-center p-2 rounded-lg bg-white/60 border border-border"
                  >
                    <div className="font-devanagari text-xs text-gray-500">
                      {label}
                    </div>
                    <div
                      className={`font-serif-devanagari font-bold text-sm ${st.accent}`}
                    >
                      {val || "—"}
                    </div>
                  </div>
                ),
              )}
            </div>
            {!hiddenFields.has("planetaryPositions") && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {HOUSES_MR.map((house, i) => (
                  <div
                    key={house}
                    className="rounded-lg border border-border bg-white/60 p-2"
                  >
                    <div className="font-devanagari text-[10px] text-gray-500 mb-0.5">
                      {i + 1}. {house}
                    </div>
                    <div
                      className={`font-devanagari text-xs font-semibold ${st.accent}`}
                    >
                      {data.horoscope.planetaryPositions[i] || "—"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6">
            <SectionHead title="संपर्क माहिती" accent={st.accent} />
            {data.contact.phone && (
              <Row label="फोन" value={data.contact.phone} />
            )}
            {!hiddenFields.has("email") && data.contact.email && (
              <Row label="ईमेल" value={data.contact.email} />
            )}
            {!hiddenFields.has("address") && (
              <Row label="पत्ता" value={data.contact.address} />
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <div className="flex items-center justify-center gap-2">
              <Flower2 className="w-4 h-4 text-maroon" />
              <span className="font-serif-devanagari text-sm text-maroon font-semibold">
                लग्नसेतू - LagnaSetu
              </span>
              <Flower2 className="w-4 h-4 text-maroon" />
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
