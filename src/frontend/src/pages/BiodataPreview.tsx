import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
function getReligionBlessing(religion: string, language = "marathi"): string {
  if (religion === "हिंदू") {
    if (language === "hindi") return "॥ श्री गणेशाय नमः ॥";
    if (language === "english") return "॥ Shri Ganeshaya Namah ॥";
    if (language === "kannada") return "॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥";
    if (language === "urdu") return "॥ شری گنیشا نماہ ॥";
    return "॥ श्री गणेशाय नमः ॥";
  }
  if (religion === "जैन") {
    if (language === "hindi") return "॥ णमो अरिहंताणं ॥";
    if (language === "english") return "॥ Namo Arihantanam ॥";
    if (language === "kannada") return "॥ ನಮೋ ಅರಿಹಂತಾಣಂ ॥";
    if (language === "urdu") return "॥ نمو اریہنتانم ॥";
    return "॥ णमो अरिहंताणं ॥";
  }
  if (religion === "बौद्ध") {
    if (language === "hindi") return "॥ नमो बुद्धाय ॥";
    if (language === "english") return "॥ Namo Buddhaya ॥";
    if (language === "kannada") return "॥ ನಮೋ ಬುದ್ಧಾಯ ॥";
    if (language === "urdu") return "॥ نمو بدھائے ॥";
    return "॥ नमो बुद्धाय ॥";
  }
  if (religion === "लिंगायत") {
    if (language === "hindi") return "॥ ओम नमः शिवाय ॥";
    if (language === "english") return "॥ Om Namah Shivaya ॥";
    if (language === "kannada") return "॥ ಓಂ ನಮಃ ಶಿವಾಯ ॥";
    if (language === "urdu") return "॥ اوم نمہ شواے ॥";
    return "॥ ओम नमः शिवाय ॥";
  }
  if (religion === "ख्रिश्चन") {
    if (language === "english") return "✝ God Bless ✝";
    if (language === "hindi") return "✝ ईश्वर आपको आशीर्वाद दे ✝";
    if (language === "kannada") return "✝ ದೇವರ ಆಶೀರ್ವಾದ ✝";
    if (language === "urdu") return "✝ خدا آپ کو برکت دے ✝";
    return "✝ देव तुम्हाला आशीर्वाद देवो ✝";
  }
  if (religion === "मुस्लीम") {
    if (language === "hindi") return "॥ बिस्मिल्लाह ॥";
    if (language === "english") return "॥ Bismillah ॥";
    if (language === "kannada") return "॥ ಬಿಸ್ಮಿಲ್ಲಾ ॥";
    if (language === "urdu") return "॥ بسم اللہ ॥";
    return "॥ बिस्मिल्लाह ॥";
  }
  return "॥ श्री गणेशाय नमः ॥";
}

function getFooterText(religion: string, language: string): string {
  if (religion === "हिंदू") {
    if (language === "hindi") return "॥ शुभमंगल सावधान ॥";
    if (language === "english") return "॥ Shubh Mangal Savdhan ॥";
    if (language === "kannada") return "॥ ಶುಭಮಂಗಲ ಸಾವಧಾನ ॥";
    if (language === "urdu") return "॥ شبھ منگل ساودھان ॥";
    return "॥ शुभमंगल सावधान ॥";
  }
  if (religion === "जैन") {
    if (language === "hindi") return "॥ जय जिनेन्द्र ॥";
    if (language === "english") return "॥ Jai Jinendra ॥";
    if (language === "kannada") return "॥ ಜಯ ಜಿನೇಂದ್ರ ॥";
    if (language === "urdu") return "॥ جے جنیندر ॥";
    return "॥ जय जिनेंद्र ॥";
  }
  if (religion === "बौद्ध") {
    if (language === "hindi") return "॥ बुद्धं शरणं गच्छामि ॥";
    if (language === "english") return "॥ Buddham Saranam Gacchami ॥";
    if (language === "kannada") return "॥ ಬುದ್ಧಂ ಶರಣಂ ಗಚ್ಛಾಮಿ ॥";
    if (language === "urdu") return "॥ بدھم شرنم گچھامی ॥";
    return "॥ बुद्धं शरणं गच्छामि ॥";
  }
  if (religion === "लिंगायत") {
    if (language === "hindi") return "॥ ओम नमः शिवाय ॥";
    if (language === "english") return "॥ Om Namah Shivaya ॥";
    if (language === "kannada") return "॥ ಓಂ ನಮಃ ಶಿವಾಯ ॥";
    if (language === "urdu") return "॥ اوم نمہ شواے ॥";
    return "॥ ओम नमः शिवाय ॥";
  }
  if (religion === "ख्रिश्चन") {
    if (language === "english") return "✝ God Bless ✝";
    if (language === "hindi") return "✝ ईश्वर आपको आशीर्वाद दे ✝";
    if (language === "kannada") return "✝ ದೇವರ ಆಶೀರ್ವಾದ ✝";
    if (language === "urdu") return "✝ خدا آپ کو برکت دے ✝";
    return "✝ देव तुम्हाला आशीर्वाद देवो ✝";
  }
  if (religion === "मुस्लीम") {
    if (language === "hindi") return "॥ बिस्मिल्लाह ॥";
    if (language === "english") return "॥ Bismillah ॥";
    if (language === "kannada") return "॥ ಬಿಸ್ಮಿಲ್ಲಾ ॥";
    if (language === "urdu") return "॥ بسم اللہ ॥";
    return "॥ बिस्मिल्लाह ॥";
  }
  // Other religions - no shubhmangal
  if (language === "english") return "॥ Best Wishes ॥";
  if (language === "hindi") return "॥ शुभकामनाएँ ॥";
  if (language === "kannada") return "॥ ಶುಭಾಶಯಗಳು ॥";
  if (language === "urdu") return "॥ نیک خواہشات ॥";
  return "॥ शुभेच्छा ॥";
}

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

interface DesignOptions {
  colorTheme: string;
  borderStyle: "single" | "double" | "dotted" | "floral";
  photoFrame: "square" | "rounded" | "circle" | "decorative";
  photoPosition: "right" | "left" | "center";
}

const DEFAULT_DESIGN: DesignOptions = {
  colorTheme: "default",
  borderStyle: "single",
  photoFrame: "square",
  photoPosition: "right",
};

interface SavedData {
  personal: PersonalInfo;
  family: ExtFamilyInfo;
  horoscope: Horoscope;
  contact: ContactInfo;
  template: string;
  photoPreview: string | null;
  designOptions?: DesignOptions;
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

// Language translations for biodata labels
const TRANSLATIONS: Record<string, Record<string, string>> = {
  marathi: {
    personalInfo: "वैयक्तिक माहिती",
    familyInfo: "कौटुंबिक माहिती",
    horoscope: "कुंडली / जन्मपत्रिका",
    contactInfo: "संपर्क माहिती",
    name: "पूर्ण नाव",
    dob: "जन्म तारीख",
    tob: "जन्म वेळ",
    pob: "जन्म ठिकाण",
    height: "उंची",
    complexion: "रंग",
    education: "शिक्षण",
    occupation: "व्यवसाय",
    income: "मासिक उत्पन्न",
    religion: "धर्म",
    caste: "जात",
    gotra: "गोत्र",
    manglik: "मांगलिक",
    fatherName: "वडिलांचे नाव",
    fatherOccupation: "वडिलांचा व्यवसाय",
    motherName: "आईचे नाव",
    motherOccupation: "आईचा व्यवसाय",
    siblings: "भाऊ-बहीण",
    familyType: "कुटुंब प्रकार",
    nativePlace: "मूळ गाव",
    rashi: "राशी",
    nakshatra: "नक्षत्र",
    gan: "गण",
    nadi: "नाडी",
    charan: "चरण",
    phone: "फोन",
    email: "ईमेल",
    address: "पत्ता",
    mama: "मामा",
    kaka: "काका",
    atya: "आत्या",
    pahune: "पाहुणे",
    yes: "होय",
    no: "नाही",
  },
  hindi: {
    personalInfo: "व्यक्तिगत जानकारी",
    familyInfo: "पारिवारिक जानकारी",
    horoscope: "कुंडली / जन्मपत्री",
    contactInfo: "संपर्क जानकारी",
    name: "पूरा नाम",
    dob: "जन्म तिथि",
    tob: "जन्म समय",
    pob: "जन्म स्थान",
    height: "ऊंचाई",
    complexion: "रंग",
    education: "शिक्षा",
    occupation: "व्यवसाय",
    income: "मासिक आय",
    religion: "धर्म",
    caste: "जाति",
    gotra: "गोत्र",
    manglik: "मांगलिक",
    fatherName: "पिता का नाम",
    fatherOccupation: "पिता का व्यवसाय",
    motherName: "माता का नाम",
    motherOccupation: "माता का व्यवसाय",
    siblings: "भाई-बहन",
    familyType: "परिवार प्रकार",
    nativePlace: "मूल स्थान",
    rashi: "राशि",
    nakshatra: "नक्षत्र",
    gan: "गण",
    nadi: "नाड़ी",
    charan: "चरण",
    phone: "फ़ोन",
    email: "ईमेल",
    address: "पता",
    mama: "मामा",
    kaka: "काका",
    atya: "बुआ",
    pahune: "मेहमान",
    yes: "हाँ",
    no: "नहीं",
  },
  english: {
    personalInfo: "Personal Information",
    familyInfo: "Family Information",
    horoscope: "Horoscope",
    contactInfo: "Contact Information",
    name: "Full Name",
    dob: "Date of Birth",
    tob: "Time of Birth",
    pob: "Place of Birth",
    height: "Height",
    complexion: "Complexion",
    education: "Education",
    occupation: "Occupation",
    income: "Monthly Income",
    religion: "Religion",
    caste: "Caste",
    gotra: "Gotra",
    manglik: "Manglik Status",
    fatherName: "Father's Name",
    fatherOccupation: "Father's Occupation",
    motherName: "Mother's Name",
    motherOccupation: "Mother's Occupation",
    siblings: "Siblings",
    familyType: "Family Type",
    nativePlace: "Native Place",
    rashi: "Rashi",
    nakshatra: "Nakshatra",
    gan: "Gan",
    nadi: "Nadi",
    charan: "Charan",
    phone: "Phone",
    email: "Email",
    address: "Address",
    mama: "Maternal Uncle",
    kaka: "Paternal Uncle",
    atya: "Aunt",
    pahune: "In-laws",
    yes: "Yes",
    no: "No",
  },
  kannada: {
    personalInfo: "ವ್ಯಕ್ತಿಗತ ಮಾಹಿತಿ",
    familyInfo: "ಕೌಟುಂಬಿಕ ಮಾಹಿತಿ",
    horoscope: "ಜಾತಕ / ಜನ್ಮಪತ್ರಿಕೆ",
    contactInfo: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
    name: "ಪೂರ್ಣ ಹೆಸರು",
    dob: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
    tob: "ಹುಟ್ಟಿದ ಸಮಯ",
    pob: "ಹುಟ್ಟಿದ ಸ್ಥಳ",
    height: "ಎತ್ತರ",
    complexion: "ಬಣ್ಣ",
    education: "ವಿದ್ಯಾಭ್ಯಾಸ",
    occupation: "ವೃತ್ತಿ",
    income: "ಮಾಸಿಕ ಆದಾಯ",
    religion: "ಧರ್ಮ",
    caste: "ಜಾತಿ",
    gotra: "ಗೋತ್ರ",
    manglik: "ಮಾಂಗಲಿಕ",
    fatherName: "ತಂದೆಯ ಹೆಸರು",
    fatherOccupation: "ತಂದೆಯ ವೃತ್ತಿ",
    motherName: "ತಾಯಿಯ ಹೆಸರು",
    motherOccupation: "ತಾಯಿಯ ವೃತ್ತಿ",
    siblings: "ಒಡಹುಟ್ಟಿದವರು",
    familyType: "ಕುಟುಂಬ ಪ್ರಕಾರ",
    nativePlace: "ಮೂಲ ಊರು",
    rashi: "ರಾಶಿ",
    nakshatra: "ನಕ್ಷತ್ರ",
    gan: "ಗಣ",
    nadi: "ನಾಡಿ",
    charan: "ಚರಣ",
    phone: "ಫೋನ್",
    email: "ಇಮೇಲ್",
    address: "ವಿಳಾಸ",
    mama: "ಮಾವ",
    kaka: "ಚಿಕ್ಕಪ್ಪ",
    atya: "ಅತ್ತೆ",
    pahune: "ಅಳಿಯ/ಸೊಸೆ",
    yes: "ಹೌದು",
    no: "ಇಲ್ಲ",
  },
  urdu: {
    personalInfo: "ذاتی معلومات",
    familyInfo: "خاندانی معلومات",
    horoscope: "زائچہ / جنم پتری",
    contactInfo: "رابطہ معلومات",
    name: "پورا نام",
    dob: "تاریخ پیدائش",
    tob: "وقت پیدائش",
    pob: "جائے پیدائش",
    height: "قد",
    complexion: "رنگ",
    education: "تعلیم",
    occupation: "پیشہ",
    income: "ماہانہ آمدنی",
    religion: "مذہب",
    caste: "برادری",
    gotra: "گوترا",
    manglik: "مانگلک",
    fatherName: "والد کا نام",
    fatherOccupation: "والد کا پیشہ",
    motherName: "والدہ کا نام",
    motherOccupation: "والدہ کا پیشہ",
    siblings: "بہن بھائی",
    familyType: "خاندان کی قسم",
    nativePlace: "آبائی شہر",
    rashi: "برج",
    nakshatra: "ستارہ",
    gan: "گن",
    nadi: "نادی",
    charan: "چرن",
    phone: "فون",
    email: "ای میل",
    address: "پتہ",
    mama: "ماموں",
    kaka: "چچا",
    atya: "پھوپھی",
    pahune: "داماد/بہو",
    yes: "ہاں",
    no: "نہیں",
  },
};

// Get religion-aware relative labels
function getRelativeLabels(
  religion: string,
  T: Record<string, string>,
): { mama: string; kaka: string; atya: string; pahune: string } {
  const isEnglish = T.yes === "Yes";
  const isHindi = T.yes === "हाँ";
  const isKannada = T.yes === "ಹೌದು";
  const isUrdu = T.yes === "ہاں";
  if (religion === "मुस्लीम") {
    if (isEnglish)
      return {
        mama: "Maternal Uncle",
        kaka: "Uncle (Chacha)",
        atya: "Aunt (Fuphi)",
        pahune: "Guest",
      };
    if (isHindi)
      return { mama: "मामू", kaka: "चाचा", atya: "फुफी", pahune: "मेहमान" };
    if (isKannada)
      return { mama: "ಮಾಮಾ", kaka: "ಚಾಚಾ", atya: "ಫೂಫಿ", pahune: "ಅತಿಥಿ" };
    if (isUrdu)
      return { mama: "ماموں", kaka: "چچا", atya: "پھوپھی", pahune: "مہمان" };
    return { mama: "मामू", kaka: "चाचा", atya: "फुफी", pahune: "मेहमान" };
  }
  if (religion === "ख्रिश्चन") {
    if (isKannada)
      return { mama: "ಮಾವ", kaka: "ಚಿಕ್ಕಪ್ಪ", atya: "ಅತ್ತೆ", pahune: "ಅತಿಥಿ" };
    if (isUrdu)
      return { mama: "ماموں", kaka: "چچا", atya: "خالہ", pahune: "مہمان" };
    // For marathi, hindi, english — use T (current language translations)
    return {
      mama: T.mama || "मामा",
      kaka: T.kaka || "काका",
      atya: T.atya || "आत्या",
      pahune: T.pahune || "पाहुणे",
    };
  }
  return {
    mama: T.mama || "मामा",
    kaka: T.kaka || "काका",
    atya: T.atya || "आत्या",
    pahune: T.pahune || "पाहुणे",
  };
}

// Get manglik display string
function getManglikDisplay(
  value: boolean | string | null | undefined,
  T: Record<string, string>,
): string | null {
  if (value === null || value === undefined || value === "") return null;
  const boolVal = value === true || value === "true";
  return boolVal ? T.yes || "होय" : T.no || "नाही";
}

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
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  photoFrame?: "square" | "rounded" | "circle" | "decorative";
  photoPosition?: "right" | "left" | "center";
}

function BiodataContent({
  data,
  hidden,
  theme,
  hideNamePhoto,
  translations,
  fontFamily: propFont,
  qrDataUrl,
  photoFrame: propPhotoFrame,
  photoPosition: propPhotoPosition,
}: ContentProps) {
  // Read design options from data if not passed explicitly
  const photoFrame =
    propPhotoFrame ?? data.designOptions?.photoFrame ?? "square";
  const photoPosition =
    propPhotoPosition ?? data.designOptions?.photoPosition ?? "right";
  const T = translations || TRANSLATIONS.marathi;
  const _religion = (data.personal as any)?.religion || "हिंदू";
  const _noGotra = ["बौद्ध", "ख्रिश्चन", "मुस्लीम"].includes(_religion);
  const _noManglik = ["बौद्ध", "ख्रिश्चन", "मुस्लीम"].includes(_religion);
  const _relLabels = getRelativeLabels(_religion, T);
  const fontFamilyStr = propFont
    ? `'${propFont}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
    : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif";
  const sibs = parseSiblings(data.family.siblingsInfo);
  const hasPlanetary = data.horoscope.planetaryPositions?.some(
    (p) => p.trim() !== "",
  );
  const dob = formatDOB(data.personal.dateOfBirth);
  const { sectionColor, labelColor, textColor, accentBg, borderColor } = theme;

  // Photo frame style helper
  function getPhotoFrameStyle(): React.CSSProperties {
    const base: React.CSSProperties = {
      objectFit: "cover" as const,
      border: `3px solid ${sectionColor}`,
    };
    if (photoFrame === "rounded") return { ...base, borderRadius: 8 };
    if (photoFrame === "circle")
      return {
        ...base,
        borderRadius: "50%",
        aspectRatio: "1/1",
        objectFit: "cover" as const,
      };
    if (photoFrame === "decorative")
      return {
        ...base,
        borderRadius: 4,
        outline: `2px solid ${sectionColor}`,
        outlineOffset: 3,
      };
    return { ...base, borderRadius: 6 }; // square default
  }

  const photoFrameStyle = getPhotoFrameStyle();
  const isPhotoCenter = photoPosition === "center";
  const isPhotoLeft = photoPosition === "left";

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
        fontFamily: fontFamilyStr,
      }}
    >
      {/* Name + Photo */}
      {!hideNamePhoto && (
        <div
          className="print-section"
          style={{
            display: "flex",
            flexDirection: isPhotoCenter ? "column" : "row",
            justifyContent: isPhotoCenter ? "center" : "space-between",
            alignItems: isPhotoCenter ? "center" : "center",
            marginBottom: 14,
            paddingBottom: 12,
            borderBottom: `1px solid ${borderColor}`,
            gap: isPhotoCenter ? 8 : 0,
          }}
        >
          {/* Photo – shown first if position is left, or after text if right, or center (handled by flex-direction col) */}
          {(isPhotoCenter || isPhotoLeft) &&
            (data.photoPreview ? (
              <img
                src={data.photoPreview}
                alt="Profile"
                style={{
                  width: isPhotoCenter ? 90 : 85,
                  height: isPhotoCenter ? 112 : 105,
                  ...photoFrameStyle,
                }}
              />
            ) : (
              <div
                style={{
                  width: isPhotoCenter ? 90 : 85,
                  height: isPhotoCenter ? 112 : 105,
                  background: accentBg,
                  border: `3px solid ${borderColor}`,
                  borderRadius:
                    photoFrame === "circle"
                      ? "50%"
                      : photoFrame === "rounded"
                        ? 8
                        : 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: "#ccc",
                }}
              >
                👤
              </div>
            ))}
          <div style={isPhotoCenter ? { textAlign: "center" } : {}}>
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
                justifyContent: isPhotoCenter ? "center" : "flex-start",
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
          {/* Photo on right (default) */}
          {!isPhotoCenter &&
            !isPhotoLeft &&
            (data.photoPreview ? (
              <img
                src={data.photoPreview}
                alt="Profile"
                style={{
                  width: 85,
                  height: 105,
                  ...photoFrameStyle,
                }}
              />
            ) : (
              <div
                style={{
                  width: 85,
                  height: 105,
                  background: accentBg,
                  border: `3px solid ${borderColor}`,
                  borderRadius:
                    photoFrame === "circle"
                      ? "50%"
                      : photoFrame === "rounded"
                        ? 8
                        : 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: "#ccc",
                }}
              >
                👤
              </div>
            ))}
        </div>
      )}

      {/* Personal */}
      <div className="print-section">
        <SH title={T.personalInfo} />
        <div style={{ columns: 2, columnGap: 20 }}>
          {!hidden.has("dateOfBirth") && <R label={T.dob} value={dob} />}
          {!hidden.has("timeOfBirth") && (
            <R label={T.tob} value={data.personal.timeOfBirth} />
          )}
          {!hidden.has("placeOfBirth") && (
            <R label={T.pob} value={data.personal.placeOfBirth} />
          )}
          {!hidden.has("height") && (
            <R label={T.height} value={data.personal.height} />
          )}
          {!hidden.has("complexion") && (
            <R label={T.complexion} value={data.personal.complexion} />
          )}
          {!hidden.has("education") && (
            <R label={T.education} value={data.personal.education} />
          )}
          {!hidden.has("occupation") && (
            <R label={T.occupation} value={data.personal.occupation} />
          )}
          {!hidden.has("income") && (
            <R label={T.income} value={data.personal.income} />
          )}
          {!hidden.has("gotra") && !_noGotra && (
            <R label={T.gotra} value={data.personal.gotra} />
          )}
          {!hidden.has("manglikStatus") &&
            !_noManglik &&
            getManglikDisplay(data.personal.manglikStatus, T) !== null && (
              <R
                label={T.manglik}
                value={getManglikDisplay(data.personal.manglikStatus, T)}
              />
            )}
        </div>
      </div>

      {/* Family */}
      <div className="print-section">
        <SH title={T.familyInfo} />
        <div style={{ columns: 2, columnGap: 20 }}>
          {!hidden.has("fatherName") && (
            <R label={T.fatherName} value={data.family.fatherName} />
          )}
          {!hidden.has("fatherOccupation") && (
            <R
              label={T.fatherOccupation}
              value={data.family.fatherOccupation}
            />
          )}
          {!hidden.has("motherName") && (
            <R label={T.motherName} value={data.family.motherName} />
          )}
          {!hidden.has("motherOccupation") && (
            <R
              label={T.motherOccupation}
              value={data.family.motherOccupation}
            />
          )}
          {!hidden.has("familyType") && (
            <R label={T.familyType} value={data.family.familyType} />
          )}
          {!hidden.has("nativePlace") && (
            <R label={T.nativePlace} value={data.family.nativePlace} />
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
          <R label={T.siblings} value={data.family.siblingsInfo} />
        )}
        {!hidden.has("mamaInfo") && data.family.mamaInfo && (
          <R label={_relLabels.mama} value={data.family.mamaInfo} />
        )}
        {!hidden.has("kakaInfo") && data.family.kakaInfo && (
          <R label={_relLabels.kaka} value={data.family.kakaInfo} />
        )}
        {!hidden.has("atyaInfo") && data.family.atyaInfo && (
          <R label={_relLabels.atya} value={data.family.atyaInfo} />
        )}
        {!hidden.has("pahuneInfo") && data.family.pahuneInfo && (
          <R label={_relLabels.pahune} value={data.family.pahuneInfo} />
        )}
      </div>

      {/* Horoscope */}
      <div className="print-section">
        <SH title={T.horoscope} />
        <div style={{ columns: 2, columnGap: 20, marginBottom: 8 }}>
          {!hidden.has("rashi") && (
            <R label={T.rashi} value={data.horoscope.rashi} />
          )}
          {!hidden.has("nakshatra") && (
            <R label={T.nakshatra} value={data.horoscope.nakshatra} />
          )}
          {!hidden.has("gan") && <R label={T.gan} value={data.horoscope.gan} />}
          {!hidden.has("nadi") && (
            <R label={T.nadi} value={data.horoscope.nadi} />
          )}
          {!hidden.has("charan") && (
            <R label={T.charan} value={data.horoscope.charan} />
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
        <SH title={T.contactInfo} />
        <div style={{ columns: 2, columnGap: 20 }}>
          {!hidden.has("phone") && data.contact.phone && (
            <R label={T.phone} value={data.contact.phone} />
          )}
          {!hidden.has("email") && data.contact.email && (
            <R label={T.email} value={data.contact.email} />
          )}
          {!hidden.has("address") && (
            <R label={T.address} value={data.contact.address} />
          )}
        </div>
      </div>
      {/* QR Code */}
      {qrDataUrl && (
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={qrDataUrl}
              alt="QR Code"
              style={{
                width: 60,
                height: 60,
                border: `1px solid ${theme.borderColor}`,
                borderRadius: 4,
              }}
            />
            <div style={{ fontSize: 8, color: theme.labelColor, marginTop: 2 }}>
              Scan to Contact
            </div>
          </div>
        </div>
      )}
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
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
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
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
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
      <BiodataContent
        data={data}
        hidden={hidden}
        theme={classicTheme}
        translations={translations}
        fontFamily={fontFamily}
        qrDataUrl={qrDataUrl}
      />
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
          {getFooterText(data.personal?.religion || "हिंदू", language)}
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
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
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
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
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
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
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
      <BiodataContent
        data={data}
        hidden={hidden}
        theme={floralTheme}
        translations={translations}
        fontFamily={fontFamily}
        qrDataUrl={qrDataUrl}
      />
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
          {getFooterText(data.personal?.religion || "हिंदू", language)}
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
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  const dots = Array.from({ length: 18 });
  return (
    <div
      style={{
        background: "#8B0000",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
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
            {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
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
        <BiodataContent
          data={data}
          hidden={hidden}
          theme={rajTheme}
          translations={translations}
          fontFamily={fontFamily}
          qrDataUrl={qrDataUrl}
        />
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
            {getFooterText(data.personal?.religion || "हिंदू", language)}
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
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
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
          translations={translations}
          fontFamily={fontFamily}
          qrDataUrl={qrDataUrl}
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
            {getFooterText(data.personal?.religion || "हिंदू", language)}
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
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  return (
    <div
      style={{
        background: "#FAFAF0",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
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
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
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
      <BiodataContent
        data={data}
        hidden={hidden}
        theme={shresthaTheme}
        translations={translations}
        fontFamily={fontFamily}
        qrDataUrl={qrDataUrl}
      />
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
          {getFooterText(data.personal?.religion || "हिंदू", language)}
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
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  return (
    <div
      style={{
        background: "#0A1628",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
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
            {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
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
        <BiodataContent
          data={data}
          hidden={hidden}
          theme={daiviTheme}
          translations={translations}
          fontFamily={fontFamily}
          qrDataUrl={qrDataUrl}
        />
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
            {getFooterText(data.personal?.religion || "हिंदू", language)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Template 7: पारंपारिक ────────────────────────────────────────────────────
const paramparikTheme: ThemeConfig = {
  bg: "#FFFDF5",
  textColor: "#2a1a00",
  sectionColor: "#B8860B",
  labelColor: "#7a5c00",
  accentBg: "#FFF8DC",
  borderColor: "#D4A017",
};

function TemplateParamparik({
  data,
  hidden,
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  return (
    <div
      style={{
        background: "#FFFDF5",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "28px 30px 24px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      {/* Outer double border */}
      <div
        style={{
          border: "3px double #B8860B",
          position: "absolute" as const,
          inset: 6,
          pointerEvents: "none" as const,
        }}
      />
      <div
        style={{
          border: "1px solid #D4A017",
          position: "absolute" as const,
          inset: 12,
          pointerEvents: "none" as const,
        }}
      />
      {/* Corner ornaments */}
      {(["tl", "tr", "bl", "br"] as const).map((pos) => {
        const style: React.CSSProperties = {
          position: "absolute",
          fontSize: 18,
          color: "#B8860B",
          pointerEvents: "none",
          lineHeight: 1,
          ...(pos === "tl"
            ? { top: 8, left: 10 }
            : pos === "tr"
              ? { top: 8, right: 10 }
              : pos === "bl"
                ? { bottom: 8, left: 10 }
                : { bottom: 8, right: 10 }),
        };
        return (
          <span key={pos} style={style}>
            ✦
          </span>
        );
      })}
      <div style={{ textAlign: "center", marginBottom: 6, marginTop: 4 }}>
        <span
          style={{
            color: "#B8860B",
            fontSize: 11,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          marginBottom: 16,
          position: "relative" as const,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #B8860B, #D4A017, #B8860B)",
            padding: "10px 20px",
            marginBottom: 6,
          }}
        >
          <h1
            style={{
              color: "#FFFDF5",
              fontSize: 20,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "0.12em",
              fontFamily: "inherit",
            }}
          >
            ॥ विवाह बायोडाटा ॥
          </h1>
        </div>
        <div
          style={{
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #B8860B 20%, #D4A017 50%, #B8860B 80%, transparent)",
          }}
        />
      </div>
      <BiodataContent
        data={data}
        hidden={hidden}
        theme={paramparikTheme}
        translations={translations}
        fontFamily={fontFamily}
        qrDataUrl={qrDataUrl}
      />
      <div
        style={{
          textAlign: "center",
          paddingTop: 8,
          marginTop: 14,
          borderTop: "2px double #B8860B",
        }}
      >
        <span
          style={{
            color: "#B8860B",
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          {getFooterText(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
    </div>
  );
}

// ─── Template 8: मनोहर ────────────────────────────────────────────────────────
const manoharTheme: ThemeConfig = {
  bg: "#F0FAF5",
  textColor: "#0d2b1e",
  sectionColor: "#1B6B5A",
  labelColor: "#3a7a65",
  accentBg: "#D4F0E5",
  borderColor: "#5BAF96",
};

function TemplateManohar({
  data,
  hidden,
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  return (
    <div
      style={{
        background: "#F0FAF5",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "0 0 20px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
        border: "2px solid #5BAF96",
        borderRadius: 4,
        overflow: "hidden" as const,
      }}
    >
      {/* Header band */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1B6B5A 0%, #2E9B82 60%, #1B6B5A 100%)",
          padding: "16px 28px 14px",
          marginBottom: 0,
          position: "relative" as const,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <span
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 10,
              letterSpacing: "0.22em",
              fontWeight: 500,
            }}
          >
            {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
          </span>
        </div>
        <h1
          style={{
            color: "#fff",
            fontSize: 21,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.1em",
            textAlign: "center",
            fontFamily: "inherit",
          }}
        >
          🌿 विवाह बायोडाटा 🌿
        </h1>
        {/* Wave bottom */}
        <div
          style={{
            position: "absolute" as const,
            bottom: -1,
            left: 0,
            right: 0,
            height: 12,
            background: "#F0FAF5",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />
      </div>
      <div style={{ padding: "6px 28px 0" }}>
        <BiodataContent
          data={data}
          hidden={hidden}
          theme={manoharTheme}
          translations={translations}
          fontFamily={fontFamily}
          qrDataUrl={qrDataUrl}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "8px 28px 4px",
          borderTop: "2px solid #5BAF96",
          marginTop: 10,
        }}
      >
        <span
          style={{
            color: "#1B6B5A",
            fontSize: 11,
            letterSpacing: "0.15em",
            fontWeight: 600,
          }}
        >
          {getFooterText(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
    </div>
  );
}

// ─── Template 9: सौंदर्य ──────────────────────────────────────────────────────
const saundaryaTheme: ThemeConfig = {
  bg: "#FFF5F8",
  textColor: "#2d0a1a",
  sectionColor: "#AD1457",
  labelColor: "#8c3a5a",
  accentBg: "#FCE4EC",
  borderColor: "#F48FB1",
};

function TemplateSaundarya({
  data,
  hidden,
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
}) {
  return (
    <div
      style={{
        background: "#FFF5F8",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "24px 30px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      {/* Outer border with inner accent */}
      <div
        style={{
          border: "2px solid #F48FB1",
          position: "absolute" as const,
          inset: 6,
          pointerEvents: "none" as const,
          borderRadius: 6,
        }}
      />
      <div
        style={{
          border: "1px solid #FCB8D0",
          position: "absolute" as const,
          inset: 11,
          pointerEvents: "none" as const,
          borderRadius: 4,
        }}
      />
      {/* Corner roses */}
      {(["tl", "tr", "bl", "br"] as const).map((pos) => {
        const style: React.CSSProperties = {
          position: "absolute",
          fontSize: 20,
          pointerEvents: "none",
          lineHeight: 1,
          opacity: 0.7,
          ...(pos === "tl"
            ? { top: 7, left: 9 }
            : pos === "tr"
              ? { top: 7, right: 9 }
              : pos === "bl"
                ? { bottom: 7, left: 9 }
                : { bottom: 7, right: 9 }),
        };
        return (
          <span key={pos} style={style}>
            🌹
          </span>
        );
      })}
      <div style={{ textAlign: "center", marginBottom: 4, marginTop: 2 }}>
        <span
          style={{
            color: "#AD1457",
            fontSize: 10.5,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 30px",
            background: "linear-gradient(135deg, #FCE4EC, #F8BBD0, #FCE4EC)",
            border: "1px solid #F48FB1",
            borderRadius: 30,
          }}
        >
          <h1
            style={{
              color: "#AD1457",
              fontSize: 19,
              fontWeight: 800,
              margin: 0,
              letterSpacing: "0.09em",
              fontFamily: "inherit",
            }}
          >
            ❀ विवाह बायोडाटा ❀
          </h1>
        </div>
        <div
          style={{
            height: 1.5,
            background:
              "linear-gradient(90deg, transparent, #F48FB1, transparent)",
            marginTop: 8,
          }}
        />
      </div>
      <BiodataContent
        data={data}
        hidden={hidden}
        theme={saundaryaTheme}
        translations={translations}
        fontFamily={fontFamily}
        qrDataUrl={qrDataUrl}
      />
      <div
        style={{
          textAlign: "center",
          paddingTop: 8,
          marginTop: 12,
          borderTop: "1px solid #F48FB1",
        }}
      >
        <span
          style={{
            color: "#AD1457",
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          {getFooterText(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
    </div>
  );
}

// ─── Template 10: मयूर (Peacock) ─────────────────────────────────────────────
const mayurTheme: ThemeConfig = {
  bg: "#E0F7FA",
  textColor: "#001F3F",
  sectionColor: "#006064",
  labelColor: "#00838F",
  accentBg: "#E0F7FA",
  borderColor: "#006064",
};

function TemplateMayur({
  data,
  hidden,
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
  colorOverride,
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
  colorOverride?: string;
}) {
  const theme = colorOverride
    ? { ...mayurTheme, sectionColor: colorOverride, borderColor: colorOverride }
    : mayurTheme;
  return (
    <div
      style={{
        background: "#f0fafc",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "0 0 24px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${theme.sectionColor}, ${theme.labelColor})`,
          padding: "20px 30px 16px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 11,
            letterSpacing: "0.2em",
            marginBottom: 6,
            position: "relative",
          }}
        >
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
        </div>
        <h1
          style={{
            color: "#ffffff",
            fontSize: 21,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.06em",
            fontFamily: "inherit",
            position: "relative",
          }}
        >
          🦚 विवाह बायोडाटा 🦚
        </h1>
      </div>
      <div style={{ padding: "16px 30px 0" }}>
        <BiodataContent
          data={data}
          hidden={hidden}
          theme={theme}
          translations={translations}
          fontFamily={fontFamily}
          qrDataUrl={qrDataUrl}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: 8,
          marginTop: 12,
          borderTop: `1px solid ${theme.borderColor}`,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <span
          style={{
            color: theme.sectionColor,
            fontSize: 11,
            letterSpacing: "0.15em",
            fontWeight: 500,
          }}
        >
          {getFooterText(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
    </div>
  );
}

// ─── Template 11: उगवत्या सूर्याचा (Sunrise) ──────────────────────────────────
const ugawatayaTheme: ThemeConfig = {
  bg: "#FFF3E0",
  textColor: "#1a1a1a",
  sectionColor: "#E65100",
  labelColor: "#FF6D00",
  accentBg: "#FFF3E0",
  borderColor: "#FF8F00",
};

function TemplateUgawatya({
  data,
  hidden,
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
  colorOverride,
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
  colorOverride?: string;
}) {
  const theme = colorOverride
    ? {
        ...ugawatayaTheme,
        sectionColor: colorOverride,
        borderColor: colorOverride,
      }
    : ugawatayaTheme;
  return (
    <div
      style={{
        background: "#FFFBF5",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "0 0 24px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      <div
        style={{
          background: `linear-gradient(180deg, ${theme.sectionColor} 0%, ${theme.labelColor} 100%)`,
          padding: "20px 30px 28px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: 11,
            letterSpacing: "0.2em",
            marginBottom: 6,
          }}
        >
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
        </div>
        <h1
          style={{
            color: "#fff8f0",
            fontSize: 21,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.06em",
            fontFamily: "inherit",
          }}
        >
          ☀️ विवाह बायोडाटा ☀️
        </h1>
      </div>
      <div style={{ padding: "8px 30px 0" }}>
        <BiodataContent
          data={data}
          hidden={hidden}
          theme={theme}
          translations={translations}
          fontFamily={fontFamily}
          qrDataUrl={qrDataUrl}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: 8,
          marginTop: 12,
          borderTop: `1px solid ${theme.borderColor}`,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <span
          style={{
            color: theme.sectionColor,
            fontSize: 11,
            letterSpacing: "0.15em",
            fontWeight: 500,
          }}
        >
          {getFooterText(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
    </div>
  );
}

// ─── Template 12: कमळ (Lotus) ─────────────────────────────────────────────────
const kamalTheme: ThemeConfig = {
  bg: "#FCE4EC",
  textColor: "#1a1a1a",
  sectionColor: "#C2185B",
  labelColor: "#E91E63",
  accentBg: "#FCE4EC",
  borderColor: "#C2185B",
};

function TemplateKamal({
  data,
  hidden,
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
  colorOverride,
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
  colorOverride?: string;
}) {
  const theme = colorOverride
    ? { ...kamalTheme, sectionColor: colorOverride, borderColor: colorOverride }
    : kamalTheme;
  const lotusCorners = ["🪷", "🌸", "🪷", "🌸"];
  return (
    <div
      style={{
        background: "#FFF5F8",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "28px 30px 24px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
        border: `2px solid ${theme.borderColor}`,
      }}
    >
      {lotusCorners.map((lc, i) => {
        const positions = [
          { top: 4, left: 4 },
          { top: 4, right: 4 },
          { bottom: 4, left: 4 },
          { bottom: 4, right: 4 },
        ] as const;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static corner positions
            key={i}
            style={{
              position: "absolute" as const,
              ...positions[i],
              fontSize: 20,
              opacity: 0.6,
              pointerEvents: "none" as const,
            }}
          >
            {lc}
          </div>
        );
      })}
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <span
          style={{
            color: theme.sectionColor,
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <h1
          style={{
            color: theme.sectionColor,
            fontSize: 20,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.06em",
            fontFamily: "inherit",
          }}
        >
          🌺 विवाह बायोडाटा 🌺
        </h1>
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${theme.sectionColor}, transparent)`,
            marginTop: 6,
          }}
        />
      </div>
      <BiodataContent
        data={data}
        hidden={hidden}
        theme={theme}
        translations={translations}
        fontFamily={fontFamily}
        qrDataUrl={qrDataUrl}
      />
      <div
        style={{
          textAlign: "center",
          paddingTop: 8,
          marginTop: 12,
          borderTop: `1px solid ${theme.borderColor}`,
        }}
      >
        <span
          style={{
            color: theme.sectionColor,
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 500,
          }}
        >
          {getFooterText(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
    </div>
  );
}

// ─── Template 13: रजत (Silver) ─────────────────────────────────────────────────
const rajatTheme: ThemeConfig = {
  bg: "#F5F5F5",
  textColor: "#1a1a1a",
  sectionColor: "#424242",
  labelColor: "#616161",
  accentBg: "#F5F5F5",
  borderColor: "#616161",
};

function TemplateRajat({
  data,
  hidden,
  translations,
  fontFamily,
  qrDataUrl,
  language = "marathi",
  colorOverride,
}: {
  data: SavedData;
  hidden: Set<string>;
  translations?: Record<string, string>;
  fontFamily?: string;
  qrDataUrl?: string;
  language?: string;
  colorOverride?: string;
}) {
  const theme = colorOverride
    ? { ...rajatTheme, sectionColor: colorOverride, borderColor: colorOverride }
    : rajatTheme;
  return (
    <div
      style={{
        background: "#ffffff",
        fontFamily: fontFamily
          ? `'${fontFamily}', 'Noto Sans Devanagari', 'Hind', Arial, sans-serif`
          : "'Noto Sans Devanagari', 'Hind', Arial, sans-serif",
        maxWidth: 794,
        margin: "0 auto",
        padding: "0 0 24px",
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${theme.sectionColor}, ${theme.labelColor})`,
          padding: "20px 30px 16px",
          textAlign: "center",
          borderBottom: "3px solid #9E9E9E",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 11,
            letterSpacing: "0.2em",
            marginBottom: 6,
          }}
        >
          {getReligionBlessing(data.personal?.religion || "हिंदू", language)}
        </div>
        <h1
          style={{
            color: "#ffffff",
            fontSize: 21,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "0.06em",
            fontFamily: "inherit",
          }}
        >
          ✦ विवाह बायोडाटा ✦
        </h1>
      </div>
      <div style={{ padding: "16px 30px 0" }}>
        <BiodataContent
          data={data}
          hidden={hidden}
          theme={theme}
          translations={translations}
          fontFamily={fontFamily}
          qrDataUrl={qrDataUrl}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: 8,
          marginTop: 12,
          borderTop: `1px solid ${theme.borderColor}`,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <span
          style={{
            color: theme.sectionColor,
            fontSize: 11,
            letterSpacing: "0.15em",
            fontWeight: 500,
          }}
        >
          {getFooterText(data.personal?.religion || "हिंदू", language)}
        </span>
      </div>
    </div>
  );
}

// ─── Template map ─────────────────────────────────────────────────────────────
const templateMap: Record<
  string,
  React.ComponentType<{
    data: SavedData;
    hidden: Set<string>;
    translations?: Record<string, string>;
    fontFamily?: string;
    qrDataUrl?: string;
    language?: string;
    colorOverride?: string;
  }>
> = {
  classic: TemplateClassic,
  floral: TemplateFloral,
  rajeshahi: TemplateRajeshahi,
  aadhunik: TemplateAadhunik,
  shreshtha: TemplateShreshtha,
  daivi: TemplateDaivi,
  paramparik: TemplateParamparik,
  manohar: TemplateManohar,
  saundarya: TemplateSaundarya,
  mayur: TemplateMayur,
  ugawatya: TemplateUgawatya,
  kamal: TemplateKamal,
  rajat: TemplateRajat,
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
  { id: "paramparik", name: "पारंपारिक", emoji: "✦", color: "#B8860B" },
  { id: "manohar", name: "मनोहर", emoji: "🌿", color: "#1B6B5A" },
  { id: "saundarya", name: "सौंदर्य", emoji: "🌹", color: "#AD1457" },
  { id: "mayur", name: "मयूर", emoji: "🦚", color: "#006064" },
  { id: "ugawatya", name: "उगवत्या सूर्याचा", emoji: "☀️", color: "#E65100" },
  { id: "kamal", name: "कमळ", emoji: "🌺", color: "#C2185B" },
  { id: "rajat", name: "रजत", emoji: "✦", color: "#424242" },
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
  const [language, setLanguage] = useState<string>("marathi");
  const [selectedFont, setSelectedFont] = useState<string>("Laila");
  const [selectedFontSize, setSelectedFontSize] = useState<string>("medium");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [colorOverride, setColorOverride] = useState<string | null>(null);
  const [showRevisionBanner, setShowRevisionBanner] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);
  const [designOptions, setDesignOptions] =
    useState<DesignOptions>(DEFAULT_DESIGN);

  useEffect(() => {
    const stored = sessionStorage.getItem("biodataFormData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SavedData;
        setData(parsed);
        if (parsed.template) setActiveTemplate(parsed.template);
        if (parsed.designOptions) {
          setDesignOptions((prev) => ({ ...prev, ...parsed.designOptions }));
          // Sync colorOverride from designOptions
          if (
            parsed.designOptions.colorTheme &&
            parsed.designOptions.colorTheme !== "default"
          ) {
            const colorMap: Record<string, string> = {
              saffron: "#FF6B00",
              rose: "#E91E63",
              teal: "#009688",
              purple: "#7B1FA2",
              blue: "#1976D2",
              green: "#388E3C",
              maroon: "#880E4F",
              gold: "#F9A825",
              orange: "#F57C00",
              indigo: "#303F9F",
              brown: "#5D4037",
              slate: "#455A64",
            };
            setColorOverride(colorMap[parsed.designOptions.colorTheme] || null);
          }
        }
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
    const lang = sessionStorage.getItem("biodataLanguage");
    if (lang) setLanguage(lang);
    const font = sessionStorage.getItem("biodataFont");
    if (font) setSelectedFont(font);
    const fontSize = sessionStorage.getItem("biodataFontSize");
    if (fontSize) setSelectedFontSize(fontSize);
  }, []);

  // Load selected Google font
  useEffect(() => {
    if (!selectedFont) return;
    const fontParam = selectedFont.replace(/ /g, "+");
    const id = `gfont-prev-${fontParam}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fontParam}:wght@400;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }, [selectedFont]);

  // Generate QR code from contact info
  useEffect(() => {
    const phone = data.contact?.phone;
    const email = data.contact?.email;
    const name = data.personal?.name;
    if (!name && !phone && !email) {
      setQrDataUrl("");
      return;
    }
    const contactText = [name, phone, email].filter(Boolean).join("\n");
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(contactText)}&color=1a1a1a&bgcolor=ffffff&margin=1`;
    setQrDataUrl(qrApiUrl);
  }, [data.contact?.phone, data.contact?.email, data.personal?.name]);

  const T = TRANSLATIONS[language] || TRANSLATIONS.marathi;

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
      // Show revision upsell banner
      setShowRevisionBanner(true);
      setTimeout(() => setShowRevisionBanner(false), 6000);
    }, 500);
  }

  const TemplateToRender = templateMap[activeTemplate] || TemplateClassic;

  function handlePaymentSuccess() {
    sessionStorage.setItem("biodataPaidPlan", "paid");
    setIsPaid(true);
    setShowPaymentModal(false);
    // small delay then print
    setTimeout(() => handleDownloadPDFClick(), 600);
  }

  return (
    <>
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        onSuccess={handlePaymentSuccess}
        biodataName={data.personal?.name}
        selectedTemplate={activeTemplate}
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
            {isPaid && (
              <Button
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      language === "english"
                        ? "I created my Marathi wedding biodata on lagnasetu.caffeine.xyz! Create yours too - only ₹49 🙏"
                        : language === "hindi"
                          ? "मैंने lagnasetu.caffeine.xyz पर अपना बायोडेटा बनाया! आप भी बनाएं - केवल ₹49 🙏"
                          : "मी lagnasetu.caffeine.xyz वर माझा मराठी बायोडाटा तयार केला! तुम्हीही बनवा - फक्त ₹49 मध्ये 🙏",
                    )}`,
                    "_blank",
                  )
                }
                className="font-devanagari gap-2 bg-green-600 text-white hover:bg-green-700"
                data-ocid="preview.whatsapp.share.button"
              >
                📲{" "}
                {language === "english"
                  ? "Share with friends"
                  : language === "hindi"
                    ? "दोस्तों को बताएं"
                    : "मित्रांना सांगा"}
              </Button>
            )}
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

        {/* Color Customization */}
        <div className="no-print max-w-3xl mx-auto mb-4">
          <p className="text-sm font-devanagari text-muted-foreground mb-2">
            रंग निवडा:
          </p>
          <div className="flex gap-2 flex-wrap items-center">
            {[
              { color: null, label: "मूळ" },
              { color: "#8B1A1A", label: "मरून" },
              { color: "#1B6B5A", label: "हिरवा" },
              { color: "#1a1a2e", label: "नेव्ही" },
              { color: "#AD1457", label: "गुलाबी" },
              { color: "#B8860B", label: "सोनेरी" },
              { color: "#4A235A", label: "जांभळा" },
              { color: "#1A5276", label: "निळा" },
              { color: "#006064", label: "मोरपंखी" },
            ].map(({ color, label }) => (
              <button
                type="button"
                key={color ?? "default"}
                title={label}
                data-ocid={`preview.color.${color ? color.replace("#", "") : "default"}.toggle`}
                onClick={() => setColorOverride(color)}
                className="relative w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  background: color ?? "#ffffff",
                  borderColor:
                    colorOverride === color
                      ? "#374151"
                      : color
                        ? color
                        : "#d1d5db",
                  boxShadow:
                    colorOverride === color
                      ? "0 0 0 2px rgba(55,65,81,0.4)"
                      : "none",
                }}
              >
                {!color && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-500">
                    ✗
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Watermark preview notice */}
        <div className="no-print max-w-3xl mx-auto mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm font-devanagari text-amber-800">
          हे नमुना बायोडाटा आहे. PDF / JPG डाउनलोड करण्यासाठी खालील बटण वापरा.
        </div>

        {/* Revision upsell banner */}
        {showRevisionBanner && (
          <div
            className="no-print max-w-3xl mx-auto mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm font-devanagari text-green-800 flex items-start justify-between gap-2"
            data-ocid="preview.revision.toast"
          >
            <span>
              ✅{" "}
              {language === "english"
                ? "Biodata downloaded! To make changes, click 'Edit Biodata'."
                : language === "hindi"
                  ? "बायोडेटा डाउनलोड हुआ! बदलाव के लिए 'बायोडेटा संपादित करें' पर क्लिक करें।"
                  : "बायोडाटा download झाला! बदल करायचे असल्यास 'बायोडाटा संपादित करा' वर क्लिक करा."}
            </span>
            <button
              type="button"
              onClick={() => setShowRevisionBanner(false)}
              className="shrink-0 text-green-600 hover:text-green-800 font-bold text-base leading-none"
              data-ocid="preview.revision.close_button"
            >
              ×
            </button>
          </div>
        )}

        {/* Referral section */}
        {isPaid && data.personal?.name && (
          <div className="no-print max-w-3xl mx-auto mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <p className="font-devanagari text-sm font-semibold text-amber-900 mb-2">
              🎁{" "}
              {language === "english"
                ? "Share with friends & family"
                : language === "hindi"
                  ? "दोस्तों और रिश्तेदारों को शेयर करें"
                  : "तुमच्या मित्रांना/नातेवाइकांना हा link पाठवा"}
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={`https://lagnasetu.caffeine.xyz/?ref=${encodeURIComponent(data.personal?.name || "friend")}`}
                className="flex-1 text-xs font-mono bg-white border border-amber-200 rounded px-2 py-1.5 text-amber-700 truncate"
                data-ocid="preview.referral.input"
              />
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 font-devanagari text-xs border-amber-300 text-amber-800 hover:bg-amber-100"
                data-ocid="preview.referral.copy_button"
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `https://lagnasetu.caffeine.xyz/?ref=${encodeURIComponent(data.personal?.name || "friend")}`,
                    )
                    .then(() => {
                      setReferralCopied(true);
                      setTimeout(() => setReferralCopied(false), 2500);
                    })
                    .catch(() => {});
                }}
              >
                {referralCopied
                  ? language === "english"
                    ? "Copied!"
                    : "कॉपी झाले!"
                  : language === "english"
                    ? "Copy"
                    : "कॉपी"}
              </Button>
            </div>
          </div>
        )}

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
            style={(() => {
              const accentColor = colorOverride || "#8B1A1A";
              const bStyle = designOptions.borderStyle;
              let borderStyle: React.CSSProperties = {};
              if (bStyle === "double") {
                borderStyle = {
                  border: `3px double ${accentColor}`,
                  outline: `2px solid ${accentColor}`,
                  outlineOffset: "3px",
                };
              } else if (bStyle === "dotted") {
                borderStyle = { border: `3px dotted ${accentColor}` };
              } else if (bStyle === "floral") {
                borderStyle = {
                  border: `3px solid ${accentColor}`,
                  boxShadow: `0 0 0 6px ${accentColor}22, 0 0 0 7px ${accentColor}44`,
                };
              } else {
                // single (default)
                borderStyle = { border: `2px solid ${accentColor}20` };
              }
              return {
                width: "794px",
                maxWidth: "100%",
                margin: "0 auto",
                background: "#fff",
                boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
                borderRadius: 8,
                position: "relative" as const,
                userSelect: "none" as const,
                ...borderStyle,
              };
            })()}
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
            <div
              style={{
                fontSize:
                  selectedFontSize === "small"
                    ? "88%"
                    : selectedFontSize === "large"
                      ? "113%"
                      : "100%",
              }}
            >
              <TemplateToRender
                data={{ ...data, designOptions: designOptions }}
                hidden={new Set<string>()}
                translations={T}
                fontFamily={selectedFont}
                qrDataUrl={qrDataUrl}
                language={language}
                colorOverride={colorOverride || undefined}
              />
            </div>
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
