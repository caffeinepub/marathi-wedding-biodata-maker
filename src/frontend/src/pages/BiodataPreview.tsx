import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Download,
  FileImage,
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
    siblingsInfo: JSON.stringify([
      {
        id: "1",
        type: "भाऊ",
        name: "राहुल देशपांडे",
        maritalStatus: "विवाहित",
        occupation: "सरकारी नोकरी",
      },
    ]),
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
  template: "single",
  photoPreview: null,
};

type SiblingEntry = {
  type: string;
  name: string;
  maritalStatus: string;
  occupation: string;
};

function parseSiblings(raw: string): SiblingEntry[] | null {
  try {
    const p = JSON.parse(raw || "");
    if (Array.isArray(p)) return p as SiblingEntry[];
  } catch {
    /* */
  }
  return null;
}

// ─── Single Professional Template ─────────────────────────────────────────────
const maroon = "#8B1A1A";
const maroonLight = "#f5e8e8";

function SectionHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        borderBottom: `2px solid ${maroon}`,
        marginBottom: 10,
        marginTop: 18,
        paddingBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 4,
          height: 18,
          background: maroon,
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: maroon,
          fontWeight: 700,
          fontSize: 14,
          fontFamily: "inherit",
          letterSpacing: "0.03em",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function Row({
  label,
  value,
}: { label: string; value?: string | boolean | null }) {
  if (value === undefined || value === null || value === "") return null;
  const display = typeof value === "boolean" ? (value ? "होय" : "नाही") : value;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: "4px 12px",
        marginBottom: 5,
        alignItems: "start",
      }}
    >
      <span
        style={{
          color: "#666",
          fontSize: 12,
          fontFamily: "inherit",
          paddingTop: 1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#1a1a1a",
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "inherit",
        }}
      >
        {display}
      </span>
    </div>
  );
}

export function TemplateSingle({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  const hasPlanetary = data.horoscope.planetaryPositions?.some(
    (p) => p.trim() !== "",
  );

  // Format date
  let dob = data.personal.dateOfBirth;
  if (dob) {
    try {
      const d = new Date(dob);
      dob = d.toLocaleDateString("mr-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      /* keep original */
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "32px 36px",
        boxSizing: "border-box" as const,
        minHeight: 1123,
        position: "relative" as const,
      }}
    >
      {/* Top mantra */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span
          style={{
            color: maroon,
            fontSize: 11,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          borderTop: `3px solid ${maroon}`,
          borderBottom: `3px solid ${maroon}`,
          padding: "10px 0",
          marginBottom: 20,
          background: maroonLight,
        }}
      >
        <h1
          style={{
            color: maroon,
            fontSize: 22,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.08em",
            fontFamily: "inherit",
          }}
        >
          विवाह बायोडाटा
        </h1>
      </div>

      {/* Name + Photo row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: "1px solid #e2c8c8",
        }}
      >
        <div>
          <h2
            style={{
              color: "#1a1a1a",
              fontSize: 24,
              fontWeight: 800,
              margin: 0,
              fontFamily: "inherit",
            }}
          >
            {data.personal.name}
          </h2>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 6,
              flexWrap: "wrap" as const,
            }}
          >
            {!hidden.has("religion") && data.personal.religion && (
              <span
                style={{
                  background: maroonLight,
                  color: maroon,
                  fontSize: 10,
                  padding: "2px 10px",
                  borderRadius: 99,
                  border: "1px solid #e2c8c8",
                  fontWeight: 600,
                }}
              >
                {data.personal.religion}
              </span>
            )}
            {!hidden.has("caste") && data.personal.caste && (
              <span
                style={{
                  background: maroonLight,
                  color: maroon,
                  fontSize: 10,
                  padding: "2px 10px",
                  borderRadius: 99,
                  border: "1px solid #e2c8c8",
                  fontWeight: 600,
                }}
              >
                {data.personal.caste}
              </span>
            )}
          </div>
        </div>
        {data.photoPreview && (
          <img
            src={data.photoPreview}
            alt="Profile"
            style={{
              width: 90,
              height: 110,
              objectFit: "cover" as const,
              border: `3px solid ${maroon}`,
              borderRadius: 6,
            }}
          />
        )}
        {!data.photoPreview && (
          <div
            style={{
              width: 90,
              height: 110,
              background: maroonLight,
              border: "3px solid #e2c8c8",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              color: "#ccc",
            }}
          >
            👤
          </div>
        )}
      </div>

      {/* Personal Info */}
      <SectionHeader title="वैयक्तिक माहिती" />
      <div style={{ columns: 2, columnGap: 24 }}>
        {!hidden.has("dateOfBirth") && <Row label="जन्म तारीख" value={dob} />}
        {!hidden.has("timeOfBirth") && (
          <Row label="जन्म वेळ" value={data.personal.timeOfBirth} />
        )}
        {!hidden.has("placeOfBirth") && (
          <Row label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
        )}
        {!hidden.has("height") && (
          <Row label="उंची" value={data.personal.height} />
        )}
        {!hidden.has("complexion") && (
          <Row label="रंग" value={data.personal.complexion} />
        )}
        {!hidden.has("education") && (
          <Row label="शिक्षण" value={data.personal.education} />
        )}
        {!hidden.has("occupation") && (
          <Row label="व्यवसाय" value={data.personal.occupation} />
        )}
        {!hidden.has("income") && (
          <Row label="मासिक उत्पन्न" value={data.personal.income} />
        )}
        {!hidden.has("gotra") && (
          <Row label="गोत्र" value={data.personal.gotra} />
        )}
        {!hidden.has("manglikStatus") && (
          <Row label="मांगलिक" value={data.personal.manglikStatus} />
        )}
      </div>

      {/* Family Info */}
      <SectionHeader title="कौटुंबिक माहिती" />
      <div style={{ columns: 2, columnGap: 24 }}>
        {!hidden.has("fatherName") && (
          <Row label="वडिलांचे नाव" value={data.family.fatherName} />
        )}
        {!hidden.has("fatherOccupation") && (
          <Row label="वडिलांचा व्यवसाय" value={data.family.fatherOccupation} />
        )}
        {!hidden.has("motherName") && (
          <Row label="आईचे नाव" value={data.family.motherName} />
        )}
        {!hidden.has("motherOccupation") && (
          <Row label="आईचा व्यवसाय" value={data.family.motherOccupation} />
        )}
        {!hidden.has("familyType") && (
          <Row label="कुटुंब प्रकार" value={data.family.familyType} />
        )}
        {!hidden.has("nativePlace") && (
          <Row label="मूळ गाव" value={data.family.nativePlace} />
        )}
      </div>
      {!hidden.has("siblingsInfo") && sibs && sibs.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <span
            style={{
              color: "#666",
              fontSize: 12,
              display: "block",
              marginBottom: 6,
            }}
          >
            भाऊ-बहीण:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
            {sibs.map((s, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable order
                key={`sib-${i}`}
                style={{
                  background: maroonLight,
                  border: "1px solid #e2c8c8",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 11,
                  fontFamily: "inherit",
                }}
              >
                <span style={{ fontWeight: 700, color: maroon }}>
                  {s.type}:{" "}
                </span>
                <span style={{ color: "#1a1a1a" }}>{s.name}</span>
                {s.maritalStatus && (
                  <span style={{ color: "#666" }}> · {s.maritalStatus}</span>
                )}
                {s.occupation && (
                  <span style={{ color: "#666" }}> · {s.occupation}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {!hidden.has("siblingsInfo") && !sibs && data.family.siblingsInfo && (
        <Row label="भाऊ-बहीण" value={data.family.siblingsInfo} />
      )}

      {/* Horoscope */}
      <SectionHeader title="कुंडली / जन्मपत्रिका" />
      <div style={{ columns: 2, columnGap: 24, marginBottom: 10 }}>
        {!hidden.has("rashi") && (
          <Row label="राशी" value={data.horoscope.rashi} />
        )}
        {!hidden.has("nakshatra") && (
          <Row label="नक्षत्र" value={data.horoscope.nakshatra} />
        )}
        {!hidden.has("gan") && <Row label="गण" value={data.horoscope.gan} />}
        {!hidden.has("nadi") && (
          <Row label="नाडी" value={data.horoscope.nadi} />
        )}
        {!hidden.has("charan") && (
          <Row label="चरण" value={data.horoscope.charan} />
        )}
      </div>

      {!hidden.has("planetaryPositions") && hasPlanetary && (
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              border: "1px solid #ccc",
              borderRadius: 6,
              overflow: "hidden",
              fontSize: 11,
            }}
          >
            {data.horoscope.planetaryPositions.map((planet, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable house positions
                key={`house-${i}`}
                style={{
                  borderRight: i % 4 !== 3 ? "1px solid #ccc" : "none",
                  borderBottom: i < 8 ? "1px solid #ccc" : "none",
                  padding: "6px 8px",
                  minHeight: 40,
                  background: i % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <div
                  style={{
                    color: "#999",
                    fontSize: 9,
                    marginBottom: 2,
                    fontFamily: "inherit",
                  }}
                >
                  {HOUSES_MR[i]}
                </div>
                <div
                  style={{
                    color: "#1a1a1a",
                    fontWeight: 600,
                    fontFamily: "inherit",
                  }}
                >
                  {planet}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <SectionHeader title="संपर्क माहिती" />
      <div style={{ columns: 2, columnGap: 24 }}>
        {!hidden.has("phone") && data.contact.phone && (
          <Row label="फोन" value={data.contact.phone} />
        )}
        {!hidden.has("email") && data.contact.email && (
          <Row label="ईमेल" value={data.contact.email} />
        )}
        {!hidden.has("address") && (
          <Row label="पत्ता" value={data.contact.address} />
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute" as const,
          bottom: 24,
          left: 0,
          right: 0,
          textAlign: "center",
          borderTop: "1px solid #e2c8c8",
          paddingTop: 10,
          margin: "0 36px",
        }}
      >
        <span
          style={{
            color: maroon,
            fontSize: 11,
            letterSpacing: "0.15em",
            fontWeight: 500,
          }}
        >
          ॥ शुभमंगल सावधान ॥
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BiodataPreview() {
  const [data, setData] = useState<SavedData>(DEFAULT);
  const [showPayment, setShowPayment] = useState(false);
  const [paidPlan, setPaidPlan] = useState<string | null>(null);
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());
  const [jpgLoading, setJpgLoading] = useState(false);

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

  function handleDownloadPDFClick() {
    if (paidPlan) {
      window.print();
    } else {
      setShowPayment(true);
    }
  }

  async function handleDownloadJPG() {
    if (!paidPlan) {
      setShowPayment(true);
      return;
    }
    setJpgLoading(true);
    try {
      // Dynamically load html2canvas from CDN
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      const el = document.getElementById("biodata-print-area");
      if (!el) return;
      // biome-ignore lint/suspicious/noExplicitAny: dynamic CDN load
      const h2c = (window as any).html2canvas;
      const canvas = await h2c(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "biodata.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    } catch {
      window.print();
    } finally {
      setJpgLoading(false);
    }
  }

  function handlePaymentSuccess(planId: string) {
    setPaidPlan(planId);
    setTimeout(() => window.print(), 300);
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="no-print max-w-3xl mx-auto mb-6 flex items-center justify-between flex-wrap gap-3">
        <Link to="/form" data-ocid="preview.back.link">
          <Button variant="outline" className="font-devanagari gap-2">
            <ArrowLeft className="w-4 h-4" /> बायोडाटा संपादित करा
          </Button>
        </Link>
        <div className="flex gap-2 items-center flex-wrap">
          {paidPlan && (
            <span className="inline-flex items-center gap-1 font-devanagari text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <BadgeCheck className="w-3.5 h-3.5" /> भरले आहे
            </span>
          )}
          <Button
            onClick={() => window.print()}
            className="font-devanagari gap-2"
            variant="outline"
            data-ocid="preview.print.button"
          >
            <Printer className="w-4 h-4" /> प्रिंट करा
          </Button>
          <Button
            onClick={handleDownloadPDFClick}
            className="font-devanagari gap-2 bg-red-800 text-white hover:bg-red-900"
            data-ocid="preview.pdf.download.button"
          >
            <Download className="w-4 h-4" /> PDF डाउनलोड
          </Button>
          <Button
            onClick={handleDownloadJPG}
            disabled={jpgLoading}
            variant="outline"
            className="font-devanagari gap-2 border-orange-500 text-orange-600 hover:bg-orange-50"
            data-ocid="preview.jpg.download.button"
          >
            <FileImage className="w-4 h-4" />
            {jpgLoading ? "तयार होत आहे..." : "JPG डाउनलोड"}
          </Button>
        </div>
      </div>

      <div
        id="biodata-print-area"
        className="print-area max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-card-hover"
      >
        <TemplateSingle data={data} hidden={hiddenFields} />
      </div>

      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
