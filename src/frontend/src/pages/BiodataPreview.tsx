import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type {
  ContactInfo,
  FamilyInfo,
  Horoscope,
  PersonalInfo,
} from "../backend";

interface ExtFamilyInfo extends FamilyInfo {
  mamaInfo?: string;
  kakaInfo?: string;
  atyaInfo?: string;
  pahuneInfo?: string;
}

interface SavedData {
  personal: PersonalInfo;
  family: ExtFamilyInfo;
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
  contact: { phone: "", email: "", address: "१२३, शांती नगर, पुणे - ४११०२१" },
  template: "classic",
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

function formatDOB(dob: string): string {
  if (!dob) return "";
  try {
    return new Date(dob).toLocaleDateString("mr-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dob;
  }
}

// ─── Shared row/section renderers ─────────────────────────────────────────────
function InfoRow({
  label,
  value,
  labelColor,
  valueColor,
}: {
  label: string;
  value?: string | boolean | null;
  labelColor?: string;
  valueColor?: string;
}) {
  if (value === undefined || value === null || value === "") return null;
  const display = typeof value === "boolean" ? (value ? "होय" : "नाही") : value;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "130px 1fr",
        gap: "3px 10px",
        marginBottom: 5,
        alignItems: "start",
      }}
    >
      <span
        style={{
          color: labelColor || "#666",
          fontSize: 11.5,
          fontFamily: "inherit",
          paddingTop: 1,
          textDecoration: "none",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: valueColor || "#1a1a1a",
          fontSize: 11.5,
          fontWeight: 600,
          fontFamily: "inherit",
          textDecoration: "none",
        }}
      >
        {display}
      </span>
    </div>
  );
}

interface ThemeConfig {
  bg: string;
  textColor: string;
  sectionColor: string;
  labelColor: string;
  accentBg: string;
  borderColor: string;
}

interface ContentProps {
  data: SavedData;
  hidden: Set<string>;
  theme: ThemeConfig;
  hideNamePhoto?: boolean;
}

function BiodataContent({ data, hidden, theme, hideNamePhoto }: ContentProps) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  const hasPlanetary = data.horoscope.planetaryPositions?.some(
    (p) => p.trim() !== "",
  );
  const dob = formatDOB(data.personal.dateOfBirth);
  const { sectionColor, labelColor, textColor, accentBg, borderColor } = theme;

  function SH({ title }: { title: string }) {
    return (
      <div
        className="print-section"
        style={{
          borderBottom: `2px solid ${sectionColor}`,
          marginBottom: 8,
          marginTop: 16,
          paddingBottom: 3,
        }}
      >
        <span
          style={{
            color: sectionColor,
            fontWeight: 700,
            fontSize: 13,
            fontFamily: "inherit",
            letterSpacing: "0.03em",
          }}
        >
          {title}
        </span>
      </div>
    );
  }

  function R({
    label,
    value,
  }: { label: string; value?: string | boolean | null }) {
    return (
      <InfoRow
        label={label}
        value={value}
        labelColor={labelColor}
        valueColor={textColor}
      />
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
      }}
    >
      {/* Name + Photo */}
      {!hideNamePhoto && (
        <div
          className="print-section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            paddingBottom: 12,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <div>
            <h2
              style={{
                color: textColor,
                fontSize: 22,
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
                gap: 6,
                marginTop: 5,
                flexWrap: "wrap" as const,
              }}
            >
              {!hidden.has("religion") && data.personal.religion && (
                <span
                  style={{
                    background: accentBg,
                    color: sectionColor,
                    fontSize: 10,
                    padding: "2px 10px",
                    borderRadius: 99,
                    border: `1px solid ${borderColor}`,
                    fontWeight: 600,
                  }}
                >
                  {data.personal.religion}
                </span>
              )}
              {!hidden.has("caste") && data.personal.caste && (
                <span
                  style={{
                    background: accentBg,
                    color: sectionColor,
                    fontSize: 10,
                    padding: "2px 10px",
                    borderRadius: 99,
                    border: `1px solid ${borderColor}`,
                    fontWeight: 600,
                  }}
                >
                  {data.personal.caste}
                </span>
              )}
            </div>
          </div>
          {data.photoPreview ? (
            <img
              src={data.photoPreview}
              alt="Profile"
              style={{
                width: 85,
                height: 105,
                objectFit: "cover" as const,
                border: `3px solid ${sectionColor}`,
                borderRadius: 6,
              }}
            />
          ) : (
            <div
              style={{
                width: 85,
                height: 105,
                background: accentBg,
                border: `3px solid ${borderColor}`,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                color: "#ccc",
              }}
            >
              👤
            </div>
          )}
        </div>
      )}

      {/* Personal */}
      <div className="print-section">
        <SH title="वैयक्तिक माहिती" />
        <div style={{ columns: 2, columnGap: 20 }}>
          {!hidden.has("dateOfBirth") && <R label="जन्म तारीख" value={dob} />}
          {!hidden.has("timeOfBirth") && (
            <R label="जन्म वेळ" value={data.personal.timeOfBirth} />
          )}
          {!hidden.has("placeOfBirth") && (
            <R label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
          )}
          {!hidden.has("height") && (
            <R label="उंची" value={data.personal.height} />
          )}
          {!hidden.has("complexion") && (
            <R label="रंग" value={data.personal.complexion} />
          )}
          {!hidden.has("education") && (
            <R label="शिक्षण" value={data.personal.education} />
          )}
          {!hidden.has("occupation") && (
            <R label="व्यवसाय" value={data.personal.occupation} />
          )}
          {!hidden.has("income") && (
            <R label="मासिक उत्पन्न" value={data.personal.income} />
          )}
          {!hidden.has("gotra") && (
            <R label="गोत्र" value={data.personal.gotra} />
          )}
          {!hidden.has("manglikStatus") && (
            <R label="मांगलिक" value={data.personal.manglikStatus} />
          )}
        </div>
      </div>

      {/* Family */}
      <div className="print-section">
        <SH title="कौटुंबिक माहिती" />
        <div style={{ columns: 2, columnGap: 20 }}>
          {!hidden.has("fatherName") && (
            <R label="वडिलांचे नाव" value={data.family.fatherName} />
          )}
          {!hidden.has("fatherOccupation") && (
            <R label="वडिलांचा व्यवसाय" value={data.family.fatherOccupation} />
          )}
          {!hidden.has("motherName") && (
            <R label="आईचे नाव" value={data.family.motherName} />
          )}
          {!hidden.has("motherOccupation") && (
            <R label="आईचा व्यवसाय" value={data.family.motherOccupation} />
          )}
          {!hidden.has("familyType") && (
            <R label="कुटुंब प्रकार" value={data.family.familyType} />
          )}
          {!hidden.has("nativePlace") && (
            <R label="मूळ गाव" value={data.family.nativePlace} />
          )}
        </div>
        {!hidden.has("siblingsInfo") && sibs && sibs.length > 0 && (
          <div style={{ marginTop: 6 }}>
            <span
              style={{
                color: labelColor,
                fontSize: 11.5,
                display: "block",
                marginBottom: 5,
              }}
            >
              भाऊ-बहीण:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {sibs.map((s, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable sibling order
                  key={`sib-${i}`}
                  style={{
                    background: accentBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontWeight: 700, color: sectionColor }}>
                    {s.type}:{" "}
                  </span>
                  <span style={{ color: textColor }}>{s.name}</span>
                  {s.maritalStatus && (
                    <span style={{ color: labelColor }}>
                      {" "}
                      · {s.maritalStatus}
                    </span>
                  )}
                  {s.occupation && (
                    <span style={{ color: labelColor }}> · {s.occupation}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {!hidden.has("siblingsInfo") && !sibs && data.family.siblingsInfo && (
          <R label="भाऊ-बहीण" value={data.family.siblingsInfo} />
        )}
        {!hidden.has("mamaInfo") && data.family.mamaInfo && (
          <R label="मामा" value={data.family.mamaInfo} />
        )}
        {!hidden.has("kakaInfo") && data.family.kakaInfo && (
          <R label="काका" value={data.family.kakaInfo} />
        )}
        {!hidden.has("atyaInfo") && data.family.atyaInfo && (
          <R label="आत्या" value={data.family.atyaInfo} />
        )}
        {!hidden.has("pahuneInfo") && data.family.pahuneInfo && (
          <R label="पाहुणे" value={data.family.pahuneInfo} />
        )}
      </div>

      {/* Horoscope */}
      <div className="print-section">
        <SH title="कुंडली / जन्मपत्रिका" />
        <div style={{ columns: 2, columnGap: 20, marginBottom: 8 }}>
          {!hidden.has("rashi") && (
            <R label="राशी" value={data.horoscope.rashi} />
          )}
          {!hidden.has("nakshatra") && (
            <R label="नक्षत्र" value={data.horoscope.nakshatra} />
          )}
          {!hidden.has("gan") && <R label="गण" value={data.horoscope.gan} />}
          {!hidden.has("nadi") && (
            <R label="नाडी" value={data.horoscope.nadi} />
          )}
          {!hidden.has("charan") && (
            <R label="चरण" value={data.horoscope.charan} />
          )}
        </div>
        {!hidden.has("planetaryPositions") && hasPlanetary && (
          <div style={{ marginTop: 6 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                border: `1px solid ${borderColor}`,
                borderRadius: 5,
                overflow: "hidden",
                fontSize: 10.5,
              }}
            >
              {data.horoscope.planetaryPositions.map((planet, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable house positions
                  key={`house-${i}`}
                  style={{
                    borderRight:
                      i % 4 !== 3 ? `1px solid ${borderColor}` : "none",
                    borderBottom: i < 8 ? `1px solid ${borderColor}` : "none",
                    padding: "5px 7px",
                    minHeight: 38,
                    background: i % 2 === 0 ? accentBg : "transparent",
                  }}
                >
                  <div
                    style={{
                      color: labelColor,
                      fontSize: 9,
                      marginBottom: 2,
                      fontFamily: "inherit",
                    }}
                  >
                    {HOUSES_MR[i]}
                  </div>
                  <div
                    style={{
                      color: textColor,
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
      </div>

      {/* Contact */}
      <div className="print-section">
        <SH title="संपर्क माहिती" />
        <div style={{ columns: 2, columnGap: 20 }}>
          {!hidden.has("phone") && data.contact.phone && (
            <R label="फोन" value={data.contact.phone} />
          )}
          {!hidden.has("email") && data.contact.email && (
            <R label="ईमेल" value={data.contact.email} />
          )}
          {!hidden.has("address") && (
            <R label="पत्ता" value={data.contact.address} />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Template 1: क्लासिक ──────────────────────────────────────────────────────
const classicTheme: ThemeConfig = {
  bg: "#ffffff",
  textColor: "#1a1a1a",
  sectionColor: "#8B1A1A",
  labelColor: "#666",
  accentBg: "#f5e8e8",
  borderColor: "#e2c8c8",
};

function CornerPx({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const top = pos[0] === "t" ? 8 : undefined;
  const bottom = pos[0] === "b" ? 8 : undefined;
  const left = pos[1] === "l" ? 8 : undefined;
  const right = pos[1] === "r" ? 8 : undefined;
  const c = "#8B1A1A";
  const sq = (s: number, t: number, l: number) => ({
    position: "absolute" as const,
    background: c,
    width: s,
    height: s,
    top: t,
    left: l,
  });
  const cells =
    pos === "tl"
      ? [
          [4, 0, 0],
          [4, 0, 8],
          [4, 4, 0],
          [4, 8, 0],
          [4, 8, 8],
        ]
      : pos === "tr"
        ? [
            [4, 0, 8],
            [4, 0, 0],
            [4, 4, 8],
            [4, 8, 0],
            [4, 8, 8],
          ]
        : pos === "bl"
          ? [
              [4, 8, 0],
              [4, 8, 8],
              [4, 4, 0],
              [4, 0, 0],
              [4, 0, 8],
            ]
          : [
              [4, 8, 8],
              [4, 8, 0],
              [4, 4, 8],
              [4, 0, 0],
              [4, 0, 8],
            ];
  return (
    <div
      style={{
        position: "absolute" as const,
        top,
        bottom,
        left,
        right,
        width: 20,
        height: 20,
      }}
    >
      {cells.map(([s, t, l], i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed decoration cells
        <div key={i} style={sq(s, t, l)} />
      ))}
    </div>
  );
}

export function TemplateClassic({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  return (
    <div
      style={{
        background: "#fff",
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "24px 28px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      <CornerPx pos="tl" />
      <CornerPx pos="tr" />
      <CornerPx pos="bl" />
      <CornerPx pos="br" />
      <div
        style={{
          border: "2px solid #8B1A1A",
          position: "absolute" as const,
          inset: 6,
          pointerEvents: "none" as const,
        }}
      />
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span
          style={{
            color: "#8B1A1A",
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          borderTop: "3px solid #8B1A1A",
          borderBottom: "3px solid #8B1A1A",
          padding: "9px 0",
          marginBottom: 18,
          background: "#f5e8e8",
        }}
      >
        <h1
          style={{
            color: "#8B1A1A",
            fontSize: 20,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.08em",
            fontFamily: "inherit",
          }}
        >
          विवाह बायोडाटा
        </h1>
      </div>
      <BiodataContent data={data} hidden={hidden} theme={classicTheme} />
      <div
        style={{
          position: "relative" as const,
          textAlign: "center",
          borderTop: "1px solid #e2c8c8",
          paddingTop: 8,
          marginTop: 16,
          margin: "16px 40px 0",
        }}
      >
        <span
          style={{
            color: "#8B1A1A",
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

// Keep backward compat
export const TemplateSingle = TemplateClassic;

// ─── Template 2: फुलांचा ──────────────────────────────────────────────────────
const floralTheme: ThemeConfig = {
  bg: "#FDF6EE",
  textColor: "#2d1a0e",
  sectionColor: "#9B4400",
  labelColor: "#7a5535",
  accentBg: "#fce8d4",
  borderColor: "#C8956A",
};

function TemplateFloral({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const flowers: Array<{
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  }> = [
    { top: 0, left: 0 },
    { top: 0, right: 0 },
    { bottom: 0, left: 0 },
    { bottom: 0, right: 0 },
  ];
  return (
    <div
      style={{
        background: "#FDF6EE",
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "28px 30px 24px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      {flowers.map((pos, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static corner positions
          key={i}
          style={{
            position: "absolute" as const,
            ...pos,
            fontSize: 44,
            lineHeight: 1,
            pointerEvents: "none" as const,
            opacity: 0.75,
          }}
        >
          🌸
        </div>
      ))}
      <div
        style={{
          border: "2px solid #C8956A",
          position: "absolute" as const,
          inset: 10,
          pointerEvents: "none" as const,
        }}
      />
      <div
        style={{
          border: "1px solid #C8956A",
          position: "absolute" as const,
          inset: 14,
          pointerEvents: "none" as const,
        }}
      />
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span
          style={{
            color: "#9B4400",
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </span>
      </div>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <h1
          style={{
            color: "#9B4400",
            fontSize: 20,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.06em",
            fontFamily: "inherit",
          }}
        >
          ✿ विवाह बायोडाटा ✿
        </h1>
        <div
          style={{
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #C8956A, transparent)",
            marginTop: 6,
          }}
        />
      </div>
      <BiodataContent data={data} hidden={hidden} theme={floralTheme} />
      <div
        style={{
          position: "relative" as const,
          textAlign: "center",
          paddingTop: 8,
          marginTop: 16,
          margin: "16px 44px 0",
          borderTop: "1px solid #C8956A",
        }}
      >
        <span
          style={{
            color: "#9B4400",
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

// ─── Template 3: राजेशाही ─────────────────────────────────────────────────────
const rajTheme: ThemeConfig = {
  bg: "#fff8f5",
  textColor: "#1a0a0a",
  sectionColor: "#8B0000",
  labelColor: "#6b3333",
  accentBg: "#fff0ee",
  borderColor: "#d4aaaa",
};

function TemplateRajeshahi({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const dots = Array.from({ length: 18 });
  return (
    <div
      style={{
        background: "#8B0000",
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "14px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      {/* Left dots */}
      <div
        style={{
          position: "absolute" as const,
          left: 6,
          top: 20,
          bottom: 20,
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "space-around",
          alignItems: "center",
          gap: 0,
        }}
      >
        {dots.map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed dot decorations
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(255,220,150,0.6)",
            }}
          />
        ))}
      </div>
      {/* Right dots */}
      <div
        style={{
          position: "absolute" as const,
          right: 6,
          top: 20,
          bottom: 20,
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {dots.map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed dot decorations
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(255,220,150,0.6)",
            }}
          />
        ))}
      </div>
      {/* Inner cream box */}
      <div
        style={{
          background: "#fffaf8",
          borderRadius: 8,
          padding: "18px 22px",
          border: "1px solid #d4aaaa",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <span
            style={{
              color: "#8B0000",
              fontSize: 11,
              letterSpacing: "0.18em",
              fontWeight: 500,
            }}
          >
            ॥ श्री गणेशाय नमः ॥
          </span>
        </div>
        <div
          style={{
            textAlign: "center",
            background: "#8B0000",
            padding: "10px 0",
            borderRadius: 4,
            marginBottom: 18,
          }}
        >
          <h1
            style={{
              color: "#fff8f0",
              fontSize: 20,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "0.08em",
              fontFamily: "inherit",
            }}
          >
            विवाह बायोडाटा
          </h1>
        </div>
        <BiodataContent data={data} hidden={hidden} theme={rajTheme} />
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            borderTop: "1px solid #d4aaaa",
            paddingTop: 8,
          }}
        >
          <span
            style={{
              color: "#8B0000",
              fontSize: 11,
              letterSpacing: "0.15em",
              fontWeight: 500,
            }}
          >
            ॥ शुभमंगल सावधान ॥
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Template 4: आधुनिक ──────────────────────────────────────────────────────
const aadhunikTheme: ThemeConfig = {
  bg: "#ffffff",
  textColor: "#111827",
  sectionColor: "#1a1a2e",
  labelColor: "#6b7280",
  accentBg: "#f3f4f6",
  borderColor: "#e5e7eb",
};

function TemplateAadhunik({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  return (
    <div
      style={{
        background: "#fff",
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        boxSizing: "border-box" as const,
        position: "relative" as const,
        display: "flex",
      }}
    >
      {/* Left stripe */}
      <div style={{ width: 8, background: "#1a1a2e", flexShrink: 0 }} />
      <div style={{ flex: 1, padding: "20px 24px 28px 18px" }}>
        {/* Header */}
        <div
          className="print-section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: "#6b7280",
                letterSpacing: "0.15em",
                marginBottom: 4,
                textTransform: "uppercase" as const,
              }}
            >
              VIVAH BIODATA · विवाह बायोडाटा
            </div>
            <h1
              style={{
                color: "#1a1a2e",
                fontSize: 26,
                fontWeight: 800,
                margin: 0,
                fontFamily: "inherit",
              }}
            >
              {data.personal.name}
            </h1>
            <div
              style={{
                width: 48,
                height: 3,
                background: "#1a1a2e",
                marginTop: 6,
                borderRadius: 2,
              }}
            />
          </div>
          {data.photoPreview ? (
            <img
              src={data.photoPreview}
              alt="Profile"
              style={{
                width: 80,
                height: 96,
                objectFit: "cover" as const,
                borderRadius: "50%",
                border: "3px solid #1a1a2e",
              }}
            />
          ) : (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#f3f4f6",
                border: "3px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: "#ccc",
              }}
            >
              👤
            </div>
          )}
        </div>
        {/* Religion/caste chips */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 20,
            flexWrap: "wrap" as const,
          }}
        >
          {!hidden.has("religion") && data.personal.religion && (
            <span
              style={{
                background: "#1a1a2e",
                color: "#fff",
                fontSize: 10,
                padding: "2px 12px",
                borderRadius: 99,
                fontWeight: 600,
              }}
            >
              {data.personal.religion}
            </span>
          )}
          {!hidden.has("caste") && data.personal.caste && (
            <span
              style={{
                background: "#f3f4f6",
                color: "#1a1a2e",
                fontSize: 10,
                padding: "2px 12px",
                borderRadius: 99,
                border: "1px solid #e5e7eb",
                fontWeight: 600,
              }}
            >
              {data.personal.caste}
            </span>
          )}
        </div>
        <BiodataContent
          data={data}
          hidden={new Set([...hidden, "religion", "caste"])}
          theme={aadhunikTheme}
          hideNamePhoto={true}
        />
        <div
          style={{
            position: "absolute" as const,
            bottom: 16,
            left: 36,
            right: 36,
            textAlign: "center",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 8,
          }}
        >
          <span
            style={{
              color: "#1a1a2e",
              fontSize: 11,
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            ॥ शुभमंगल सावधान ॥
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Template 5: श्रेष्ठ ─────────────────────────────────────────────────────
const shresthaTheme: ThemeConfig = {
  bg: "#FAFAF0",
  textColor: "#1a1500",
  sectionColor: "#8B6914",
  labelColor: "#7a6a35",
  accentBg: "#fdf5dc",
  borderColor: "#C9A84C",
};

function GoldCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const top = pos[0] === "t" ? 16 : undefined;
  const bottom = pos[0] === "b" ? 16 : undefined;
  const left = pos[1] === "l" ? 16 : undefined;
  const right = pos[1] === "r" ? 16 : undefined;
  const bTop = pos[0] === "t" ? "4px solid #C9A84C" : "none";
  const bBottom = pos[0] === "b" ? "4px solid #C9A84C" : "none";
  const bLeft = pos[1] === "l" ? "4px solid #C9A84C" : "none";
  const bRight = pos[1] === "r" ? "4px solid #C9A84C" : "none";
  return (
    <div
      style={{
        position: "absolute" as const,
        top,
        bottom,
        left,
        right,
        width: 26,
        height: 26,
        borderTop: bTop,
        borderBottom: bBottom,
        borderLeft: bLeft,
        borderRight: bRight,
        pointerEvents: "none" as const,
      }}
    />
  );
}

function TemplateShreshtha({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  return (
    <div
      style={{
        background: "#FAFAF0",
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "24px 28px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      <div
        style={{
          border: "4px solid #C9A84C",
          position: "absolute" as const,
          inset: 8,
          pointerEvents: "none" as const,
        }}
      />
      <div
        style={{
          border: "1px solid #C9A84C",
          position: "absolute" as const,
          inset: 14,
          pointerEvents: "none" as const,
        }}
      />
      <GoldCorner pos="tl" />
      <GoldCorner pos="tr" />
      <GoldCorner pos="bl" />
      <GoldCorner pos="br" />
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <span
          style={{
            color: "#8B6914",
            fontSize: 11,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid #C9A84C",
          paddingBottom: 10,
          marginBottom: 18,
        }}
      >
        <h1
          style={{
            color: "#8B6914",
            fontSize: 22,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.08em",
            fontFamily: "inherit",
          }}
        >
          ✦ विवाह बायोडाटा ✦
        </h1>
        {data.personal.name && (
          <div
            style={{
              color: "#5c4600",
              fontSize: 18,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            {data.personal.name}
          </div>
        )}
      </div>
      <BiodataContent data={data} hidden={hidden} theme={shresthaTheme} />
      <div
        style={{
          textAlign: "center",
          borderTop: "1px solid #C9A84C",
          paddingTop: 8,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <span
          style={{
            color: "#8B6914",
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          ॥ शुभमंगल सावधान ॥
        </span>
      </div>
    </div>
  );
}

// ─── Template 6: दैवी ─────────────────────────────────────────────────────────
const daiviTheme: ThemeConfig = {
  bg: "#0D1F3C",
  textColor: "#f0d980",
  sectionColor: "#f0d980",
  labelColor: "#b8a060",
  accentBg: "rgba(240,217,128,0.08)",
  borderColor: "rgba(240,217,128,0.3)",
};

function TemplateDaivi({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  return (
    <div
      style={{
        background: "#0A1628",
        fontFamily: "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "14px",
        boxSizing: "border-box" as const,
      }}
    >
      <div
        style={{
          background: "#0D1F3C",
          borderRadius: 8,
          padding: "18px 22px",
          border: "1px solid rgba(240,217,128,0.25)",
          position: "relative" as const,
          overflow: "hidden",
        }}
      >
        {/* OM watermark */}
        <div
          style={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 280,
            color: "rgba(240,217,128,0.04)",
            fontFamily: "inherit",
            pointerEvents: "none" as const,
            userSelect: "none" as const,
            lineHeight: 1,
          }}
        >
          ॐ
        </div>
        {/* Gold top border line */}
        <div
          style={{
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #f0d980, transparent)",
            marginBottom: 16,
            borderRadius: 2,
          }}
        />
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <span
            style={{
              color: "#f0d980",
              fontSize: 12,
              letterSpacing: "0.2em",
              fontWeight: 500,
            }}
          >
            ॥ श्री गणेशाय नमः ॥
          </span>
        </div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h1
            style={{
              color: "#f0d980",
              fontSize: 22,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "0.08em",
              fontFamily: "inherit",
            }}
          >
            ✦ विवाह बायोडाटा ✦
          </h1>
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(240,217,128,0.5), transparent)",
              marginTop: 8,
            }}
          />
        </div>
        <BiodataContent data={data} hidden={hidden} theme={daiviTheme} />
        {/* Gold bottom border line */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(240,217,128,0.5), transparent)",
            marginTop: 20,
          }}
        />
        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <span
            style={{
              color: "#f0d980",
              fontSize: 11,
              letterSpacing: "0.18em",
              fontWeight: 500,
            }}
          >
            ॥ शुभमंगल सावधान ॥
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Template map ─────────────────────────────────────────────────────────────
const templateMap: Record<
  string,
  React.ComponentType<{ data: SavedData; hidden: Set<string> }>
> = {
  classic: TemplateClassic,
  floral: TemplateFloral,
  rajeshahi: TemplateRajeshahi,
  aadhunik: TemplateAadhunik,
  shreshtha: TemplateShreshtha,
  daivi: TemplateDaivi,
  // backward compat
  single: TemplateClassic,
};

const _TEMPLATE_LIST = [
  {
    id: "classic",
    name: "क्लासिक",
    emoji: "📜",
    color: "#8B1A1A",
  },
  {
    id: "aadhunik",
    name: "आधुनिक",
    emoji: "🔵",
    color: "#1a1a2e",
  },
  {
    id: "floral",
    name: "फुलांचा",
    emoji: "🌸",
    color: "#9B4400",
  },
  {
    id: "rajeshahi",
    name: "राजेशाही",
    emoji: "♛",
    color: "#8B0000",
  },
  {
    id: "shreshtha",
    name: "श्रेष्ठ",
    emoji: "✨",
    color: "#8B6914",
  },
  { id: "daivi", name: "दैवी", emoji: "🕉️", color: "#0A1628" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const _WATERMARK_KEYS = Array.from({ length: 30 }, (_, i) => `wm-tile-${i}`);

export default function BiodataPreview() {
  const [data, setData] = useState<SavedData>(DEFAULT);
  const [_hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());
  const [activeTemplate, setActiveTemplate] = useState<string>("classic");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaid, setIsPaid] = useState(
    () => !!sessionStorage.getItem("biodataPaidPlan"),
  );

  useEffect(() => {
    const stored = sessionStorage.getItem("biodataFormData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SavedData;
        setData(parsed);
        if (parsed.template) setActiveTemplate(parsed.template);
      } catch {
        /* use default */
      }
    }
    const hf = sessionStorage.getItem("hiddenFields");
    if (hf) {
      try {
        setHiddenFields(new Set(JSON.parse(hf) as string[]));
      } catch {
        /* ignore */
      }
    }
  }, []);

  function handleTemplateSelect(tid: string) {
    setActiveTemplate(tid);
    const updated = { ...data, template: tid };
    setData(updated);
    sessionStorage.setItem("biodataFormData", JSON.stringify(updated));
  }

  function handleDownloadPDFClick() {
    if (!isPaid) {
      setShowPaymentModal(true);
      return;
    }
    const el = document.getElementById(
      "biodata-print-area",
    ) as HTMLElement | null;
    if (el) {
      const a4HeightPx = 1123;
      const contentHeight = el.scrollHeight;
      if (contentHeight > a4HeightPx) {
        const scale = a4HeightPx / contentHeight;
        el.style.zoom = String(scale);
      } else {
        el.style.zoom = "";
      }
    }
    window.print();
    setTimeout(() => {
      const el2 = document.getElementById(
        "biodata-print-area",
      ) as HTMLElement | null;
      if (el2) {
        el2.style.zoom = "";
      }
    }, 500);
  }

  const TemplateToRender = templateMap[activeTemplate] || TemplateClassic;

  function handlePaymentSuccess() {
    sessionStorage.setItem("biodataPaidPlan", "paid");
    setIsPaid(true);
    setShowPaymentModal(false);
    // small delay then print
    setTimeout(() => handleDownloadPDFClick(), 100);
  }

  return (
    <>
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        onSuccess={handlePaymentSuccess}
      />
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="no-print max-w-3xl mx-auto mb-6 flex items-center justify-between flex-wrap gap-3">
          <Link to="/form" data-ocid="preview.back.link">
            <Button variant="outline" className="font-devanagari gap-2">
              <ArrowLeft className="w-4 h-4" /> बायोडाटा संपादित करा
            </Button>
          </Link>
          <div className="flex gap-2 items-center flex-wrap">
            <Button
              onClick={handleDownloadPDFClick}
              className="font-devanagari gap-2 bg-red-800 text-white hover:bg-red-900"
              data-ocid="preview.pdf.download.button"
            >
              <Download className="w-4 h-4" /> PDF डाउनलोड
            </Button>
          </div>
        </div>

        {/* Template Selector */}
        <div className="no-print max-w-3xl mx-auto mb-6">
          <p className="text-sm font-devanagari text-muted-foreground mb-2">
            टेम्प्लेट निवडा:
          </p>
          <div className="flex gap-2 flex-wrap">
            {_TEMPLATE_LIST.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => handleTemplateSelect(t.id)}
                data-ocid={`preview.template.${t.id}.tab`}
                className={`px-3 py-1.5 rounded-full text-sm font-devanagari border transition-colors ${
                  activeTemplate === t.id
                    ? "bg-red-800 text-white border-red-800"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Watermark preview notice */}
        <div className="no-print max-w-3xl mx-auto mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm font-devanagari text-amber-800">
          हे नमुना बायोडाटा आहे. PDF / JPG डाउनलोड करण्यासाठी खालील बटण वापरा.
        </div>

        {/* Biodata Print Area */}
        <div
          className="max-w-3xl mx-auto"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={
            {
              userSelect: "none",
              WebkitUserSelect: "none",
            } as React.CSSProperties
          }
        >
          <div
            id="biodata-print-area"
            style={{
              width: "794px",
              maxWidth: "100%",
              margin: "0 auto",
              background: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
              borderRadius: 8,
              position: "relative",
              userSelect: "none",
            }}
          >
            {/* Tiled Watermark Overlay */}
            <div
              className="no-print"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 10,
                pointerEvents: "none",
                userSelect: "none",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                overflow: "hidden",
              }}
            >
              {_WATERMARK_KEYS.map((k) => (
                <span
                  key={k}
                  style={{
                    display: "inline-block",
                    width: "33.33%",
                    textAlign: "center",
                    padding: "28px 4px",
                    transform: "rotate(-30deg)",
                    fontSize: 22,
                    fontWeight: 900,
                    color:
                      activeTemplate === "daivi"
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(180,0,0,0.13)",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    letterSpacing: 2,
                  }}
                >
                  नमुना बायोडाटा
                </span>
              ))}
            </div>
            <TemplateToRender data={data} hidden={new Set<string>()} />
          </div>
        </div>

        <div className="no-print max-w-3xl mx-auto mt-6 text-center text-xs text-muted-foreground font-devanagari">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </>
  );
}
