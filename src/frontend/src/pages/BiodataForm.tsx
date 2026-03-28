import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrUpdateBiodata } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Flower2,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type {
  ContactInfo,
  ExternalBlob,
  FamilyInfo,
  Horoscope,
  PersonalInfo,
} from "../backend";

interface ExtFamilyInfo extends FamilyInfo {
  mamaInfo: string;
  kakaInfo: string;
  atyaInfo: string;
  pahuneInfo: string;
}

const STEP_TITLES = [
  { mr: "प्लान निवडा", en: "Select Plan" },
  { mr: "वैयक्तिक माहिती", en: "Personal Info" },
  { mr: "कौटुंबिक माहिती", en: "Family Info" },
  { mr: "कुंडली / जन्मपत्रिका", en: "Horoscope" },
  { mr: "संपर्क व फोटो", en: "Contact & Photo" },
];

const TEMPLATES_CONFIG = [
  {
    id: "classic",
    name: "क्लासिक",
    emoji: "📜",
    color: "#8B1A1A",
    plan: "basic",
    desc: "पारंपारिक मराठी",
  },
  {
    id: "aadhunik",
    name: "आधुनिक",
    emoji: "🔷",
    color: "#1a1a2e",
    plan: "basic",
    desc: "स्वच्छ आधुनिक",
  },
  {
    id: "floral",
    name: "फुलांचा",
    emoji: "🌸",
    color: "#9B4400",
    plan: "basic",
    desc: "फुलांची सजावट",
  },
  {
    id: "rajeshahi",
    name: "राजेशाही",
    emoji: "♛",
    color: "#8B0000",
    plan: "basic",
    desc: "शाही लाल",
  },
  {
    id: "shreshtha",
    name: "श्रेष्ठ",
    emoji: "✨",
    color: "#8B6914",
    plan: "basic",
    desc: "सोनेरी",
  },
  {
    id: "daivi",
    name: "दैवी",
    emoji: "🕉️",
    color: "#0A1628",
    plan: "basic",
    desc: "दैवी नील",
  },
];

const RASHIS = [
  "मेष",
  "वृषभ",
  "मिथुन",
  "कर्क",
  "सिंह",
  "कन्या",
  "तूळ",
  "वृश्चिक",
  "धनु",
  "मकर",
  "कुंभ",
  "मीन",
];
const NAKSHATRAS = [
  "अश्विनी",
  "भरणी",
  "कृत्तिका",
  "रोहिणी",
  "मृगशीर्ष",
  "आर्द्रा",
  "पुनर्वसु",
  "पुष्य",
  "आश्लेषा",
  "मघा",
  "पूर्वा फाल्गुनी",
  "उत्तरा फाल्गुनी",
  "हस्त",
  "चित्रा",
  "स्वाती",
  "विशाखा",
  "अनुराधा",
  "ज्येष्ठा",
  "मूळ",
  "पूर्वाषाढा",
  "उत्तराषाढा",
  "श्रवण",
  "धनिष्ठा",
  "शतभिषा",
  "पूर्वाभाद्रपदा",
  "उत्तराभाद्रपदा",
  "रेवती",
];
const GANS = ["देव", "मनुष्य", "राक्षस"];
const NADIS = ["आदि", "मध्य", "अंत्य"];
const HOUSES = [
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

interface SiblingEntry {
  id: string;
  type: "भाऊ" | "बहीण";
  name: string;
  maritalStatus: "विवाहित" | "अविवाहित";
  occupation: string;
}

type ReligionType = "हिंदू" | "जैन" | "बौद्ध" | "लिंगायत" | "ख्रिश्चन" | "मुस्लीम";
type LanguageType = "marathi" | "hindi" | "english";

interface FormState {
  personal: PersonalInfo;
  family: ExtFamilyInfo;
  horoscope: Horoscope;
  contact: ContactInfo;
  template: string;
  photoFile: File | null;
  photoPreview: string | null;
  religion: ReligionType;
  language: LanguageType;
  selectedFont: string;
}

const defaultState: FormState = {
  personal: {
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    height: "",
    complexion: "",
    education: "",
    occupation: "",
    income: "",
    religion: "हिंदू",
    caste: "",
    gotra: "",
    manglikStatus: false,
  },
  religion: "हिंदू",
  language: "marathi",
  selectedFont: "Laila",
  family: {
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblingsInfo: "",
    mamaInfo: "",
    kakaInfo: "",
    atyaInfo: "",
    pahuneInfo: "",
    familyType: "एकत्र",
    nativePlace: "",
  },
  horoscope: {
    rashi: "",
    nakshatra: "",
    gan: "",
    nadi: "",
    charan: "",
    planetaryPositions: Array(12).fill(""),
  },
  contact: { email: "", phone: "", address: "" },
  template: "classic",
  photoFile: null,
  photoPreview: null,
};

const FORM_LABELS: Record<string, Record<string, string>> = {
  marathi: {
    fullName: "पूर्ण नाव",
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
    siblings: "भाऊ-बहीण माहिती",
    familyType: "कुटुंब प्रकार",
    nativePlace: "मूळ गाव",
    mama: "मामा",
    kaka: "काका",
    atya: "आत्या",
    pahune: "पाहुणे",
    phone: "फोन नंबर",
    email: "ईमेल",
    address: "पत्ता",
    photo: "फोटो अपलोड करा",
    denomination: "denomination (पंथ)",
    panth: "पंथ",
    selectReligion: "धर्म निवडा",
    selectLanguage: "भाषा निवडा",
    selectFont: "फॉन्ट निवडा",
    selectTemplate: "टेम्प्लेट निवडा",
    addSibling: "भाऊ/बहीण जोडा",
    type: "प्रकार",
    name: "नाव",
    maritalStatus: "वैवाहिक स्थिती",
    workPost: "काम/पोस्ट",
    next: "पुढे",
    prev: "मागे",
    submit: "बायोडाटा तयार करा ✓",
    saving: "जतन करत आहे...",
    customize: "⚙️ फील्ड कस्टमाइज करा",
    rashi: "राशी",
    nakshatra: "नक्षत्र",
    gan: "गण",
    nadi: "नाडी",
    charan: "चरण",
    planetaryPos: "ग्रह स्थिती",
    timeOfBirth: "जन्म वेळ",
    manglikStatus: "मांगलिक",
    siblingsInfo: "भाऊ-बहीण माहिती",
    mamaInfo: "मामा",
    kakaInfo: "काका",
    atyaInfo: "आत्या",
    pahuneInfo: "पाहुणे",
    planetaryPositions: "ग्रह स्थिती",
  },
  hindi: {
    fullName: "पूरा नाम",
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
    siblings: "भाई-बहन जानकारी",
    familyType: "परिवार प्रकार",
    nativePlace: "मूल स्थान",
    mama: "मामा",
    kaka: "चाचा",
    atya: "बुआ",
    pahune: "समधी",
    phone: "फ़ोन नंबर",
    email: "ईमेल",
    address: "पता",
    photo: "फ़ोटो अपलोड करें",
    denomination: "denomination (पंथ)",
    panth: "पंथ",
    selectReligion: "धर्म चुनें",
    selectLanguage: "भाषा चुनें",
    selectFont: "फ़ॉन्ट चुनें",
    selectTemplate: "टेम्पलेट चुनें",
    addSibling: "भाई/बहन जोड़ें",
    type: "प्रकार",
    name: "नाम",
    maritalStatus: "वैवाहिक स्थिति",
    workPost: "काम/पद",
    next: "आगे",
    prev: "पीछे",
    submit: "बायोडाटा बनाएं ✓",
    saving: "सहेज रहे हैं...",
    customize: "⚙️ फ़ील्ड कस्टमाइज़ करें",
    rashi: "राशि",
    nakshatra: "नक्षत्र",
    gan: "गण",
    nadi: "नाड़ी",
    charan: "चरण",
    planetaryPos: "ग्रह स्थिति",
    timeOfBirth: "जन्म समय",
    manglikStatus: "मांगलिक",
    siblingsInfo: "भाई-बहन जानकारी",
    mamaInfo: "मामा",
    kakaInfo: "चाचा",
    atyaInfo: "बुआ",
    pahuneInfo: "समधी",
    planetaryPositions: "ग्रह स्थिति",
  },
  english: {
    fullName: "Full Name",
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
    siblings: "Siblings Info",
    familyType: "Family Type",
    nativePlace: "Native Place",
    mama: "Maternal Uncle",
    kaka: "Paternal Uncle",
    atya: "Aunt",
    pahune: "In-laws",
    phone: "Phone Number",
    email: "Email",
    address: "Address",
    photo: "Upload Photo",
    denomination: "Denomination",
    panth: "Sect/Panth",
    selectReligion: "Select Religion",
    selectLanguage: "Select Language",
    selectFont: "Select Font",
    selectTemplate: "Select Template",
    addSibling: "Add Sibling",
    type: "Type",
    name: "Name",
    maritalStatus: "Marital Status",
    workPost: "Occupation/Post",
    next: "Next",
    prev: "Back",
    submit: "Create Biodata ✓",
    saving: "Saving...",
    customize: "⚙️ Customize Fields",
    rashi: "Rashi",
    nakshatra: "Nakshatra",
    gan: "Gan",
    nadi: "Nadi",
    charan: "Charan",
    planetaryPos: "Planetary Positions",
    timeOfBirth: "Time of Birth",
    manglikStatus: "Manglik Status",
    siblingsInfo: "Siblings Info",
    mamaInfo: "Maternal Uncle",
    kakaInfo: "Paternal Uncle",
    atyaInfo: "Aunt",
    pahuneInfo: "In-laws",
    planetaryPositions: "Planetary Positions",
  },
};

function getOptionalFieldsForStep(
  step: number,
  lang: string,
): { key: string; label: string }[] {
  const L = FORM_LABELS[lang] || FORM_LABELS.marathi;
  const fields: Record<number, { key: string; label: string }[]> = {
    1: [
      { key: "timeOfBirth", label: L.tob },
      { key: "complexion", label: L.complexion },
      { key: "income", label: L.income },
      { key: "religion", label: L.religion },
      { key: "caste", label: L.caste },
      { key: "gotra", label: L.gotra },
      { key: "manglikStatus", label: L.manglik },
    ],
    2: [
      { key: "fatherOccupation", label: L.fatherOccupation },
      { key: "motherOccupation", label: L.motherOccupation },
      { key: "siblingsInfo", label: L.siblings },
      { key: "mamaInfo", label: L.mama },
      { key: "kakaInfo", label: L.kaka },
      { key: "atyaInfo", label: L.atya },
      { key: "pahuneInfo", label: L.pahune },
      { key: "familyType", label: L.familyType },
      { key: "nativePlace", label: L.nativePlace },
    ],
    3: [
      { key: "gan", label: L.gan },
      { key: "nadi", label: L.nadi },
      { key: "charan", label: L.charan },
      { key: "planetaryPositions", label: L.planetaryPos },
    ],
    4: [
      { key: "email", label: L.email },
      { key: "address", label: L.address },
    ],
  };
  return fields[step] || [];
}

function FL({ label }: { label: string }) {
  return (
    <Label className="flex items-baseline gap-1.5">
      <span className="font-devanagari font-semibold text-foreground">
        {label}
      </span>
    </Label>
  );
}

function FieldCustomizer({
  step,
  hiddenFields,
  onToggle,
  language,
}: {
  step: number;
  hiddenFields: Set<string>;
  onToggle: (key: string) => void;
  language: string;
}) {
  const [open, setOpen] = useState(false);
  const fields = getOptionalFieldsForStep(step, language);
  if (!fields) return null;
  return (
    <div className="mb-5 rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 transition-colors"
        data-ocid="form.customize.toggle"
      >
        <span className="font-devanagari text-sm font-semibold text-foreground">
          ⚙️ फील्ड कस्टमाइज करा
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {open && (
        <div className="px-4 py-3 bg-card">
          <p className="font-devanagari text-xs text-muted-foreground mb-3">
            हवे ते फील्ड निवडा — अनावश्यक फील्ड काढू शकता
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {fields.map((f) => (
              <label
                key={f.key}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={!hiddenFields.has(f.key)}
                  onChange={() => onToggle(f.key)}
                  className="w-4 h-4 accent-maroon rounded"
                />
                <span className="font-devanagari text-sm">{f.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BiodataForm() {
  const [step, setStep] = useState(0);
  const selectedPlan = "basic";
  const [form, setForm] = useState<FormState>(defaultState);
  const FL_LABELS = FORM_LABELS[form.language] || FORM_LABELS.marathi;
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());
  const [siblings, setSiblings] = useState<SiblingEntry[]>(() => {
    try {
      const parsed = JSON.parse(form.family.siblingsInfo || "[]");
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [];
  });

  const addSibling = () => {
    const newSib: SiblingEntry = {
      id: Date.now().toString(),
      type: "भाऊ",
      name: "",
      maritalStatus: "अविवाहित",
      occupation: "",
    };
    const updated = [...siblings, newSib];
    setSiblings(updated);
    upF("siblingsInfo", JSON.stringify(updated));
  };

  const removeSibling = (id: string) => {
    const updated = siblings.filter((s) => s.id !== id);
    setSiblings(updated);
    upF("siblingsInfo", JSON.stringify(updated));
  };

  const updateSibling = (
    id: string,
    field: keyof SiblingEntry,
    value: string,
  ) => {
    const updated = siblings.map((s) =>
      s.id === id ? { ...s, [field]: value } : s,
    );
    setSiblings(updated);
    upF("siblingsInfo", JSON.stringify(updated));
  };

  useEffect(() => {
    const fonts = ["Laila", "Hind", "Noto+Sans+Devanagari", "Mukta"];
    for (const font of fonts) {
      const id = `gfont-${font}`;
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${font}:wght@400;600;700&display=swap`;
        document.head.appendChild(link);
      }
    }
  }, []);

  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const mutation = useCreateOrUpdateBiodata();

  const toggleField = (key: string) => {
    setHiddenFields((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const upP = (k: keyof PersonalInfo, v: string | boolean) =>
    setForm((f) => ({ ...f, personal: { ...f.personal, [k]: v } }));
  const upF = (k: keyof ExtFamilyInfo, v: string) =>
    setForm((f) => ({ ...f, family: { ...f.family, [k]: v } }));
  const upH = (k: keyof Horoscope, v: string | string[]) =>
    setForm((f) => ({ ...f, horoscope: { ...f.horoscope, [k]: v } }));
  const upC = (k: keyof ContactInfo, v: string) =>
    setForm((f) => ({ ...f, contact: { ...f.contact, [k]: v } }));
  const upPlanet = (idx: number, val: string) =>
    setForm((f) => {
      const pp = [...f.horoscope.planetaryPositions];
      pp[idx] = val;
      return { ...f, horoscope: { ...f.horoscope, planetaryPositions: pp } };
    });

  function selectTemplate(tid: string) {
    setForm((f) => ({ ...f, template: tid }));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({
      ...f,
      photoFile: file,
      photoPreview: URL.createObjectURL(file),
    }));
  }

  async function handleSubmit() {
    sessionStorage.setItem("selectedPlan", selectedPlan || "basic");
    sessionStorage.setItem(
      "hiddenFields",
      JSON.stringify(Array.from(hiddenFields)),
    );
    try {
      let photo: ExternalBlob | null = null;
      if (form.photoFile) {
        try {
          const bytes = new Uint8Array(await form.photoFile.arrayBuffer());
          const mod = (await import("../backend")) as any;
          if (mod.ExternalBlob?.fromBytes)
            photo = mod.ExternalBlob.fromBytes(bytes);
        } catch {
          /* skip photo */
        }
      }
      await mutation.mutateAsync({
        personalInfo: form.personal,
        familyInfo: form.family,
        horoscope: form.horoscope,
        contactInfo: form.contact,
        photo,
        templatePreference: form.template,
      });
    } catch {
      /* proceed anyway */
    }
    sessionStorage.setItem("biodataLanguage", form.language);
    sessionStorage.setItem("biodataFont", form.selectedFont);
    sessionStorage.setItem("biodataReligion", form.religion);
    sessionStorage.setItem(
      "biodataFormData",
      JSON.stringify({
        personal: { ...form.personal, religion: form.religion },
        family: form.family,
        horoscope: form.horoscope,
        contact: form.contact,
        template: form.template,
        photoPreview: form.photoPreview,
      }),
    );
    toast.success("बायोडाटा तयार झाला!");
    navigate({ to: "/preview" });
  }

  const progress = ((step + 1) / STEP_TITLES.length) * 100;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flower2 className="w-5 h-5 text-maroon" />
            <span className="font-serif-devanagari font-bold text-maroon text-xl">
              लग्नसेतू
            </span>
          </div>
          <h1 className="font-serif-devanagari font-bold text-maroon text-2xl mb-1">
            बायोडाटा तयार करा
          </h1>
          <p className="font-devanagari text-sm text-muted-foreground">
            Create Your Wedding Biodata
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEP_TITLES.map((t, i) => (
              <div key={t.mr} className="flex-1 text-center">
                <div
                  className={`w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    i < step
                      ? "bg-maroon border-maroon text-amber-50"
                      : i === step
                        ? "border-maroon text-maroon bg-amber-50"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="font-devanagari text-[10px] hidden sm:block text-muted-foreground">
                  {t.mr}
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
          <div className="bg-maroon px-6 py-4">
            <h2 className="font-serif-devanagari font-bold text-amber-100 text-xl">
              {STEP_TITLES[step].mr}
            </h2>
            <p className="text-amber-200/70 text-sm">{STEP_TITLES[step].en}</p>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 0 - Plan + Template Selection */}
                {step === 0 && (
                  <div className="space-y-6">
                    {/* Religion Selector */}
                    <div className="space-y-2">
                      <p className="font-devanagari font-semibold text-foreground text-sm">
                        {FL_LABELS.selectReligion}{" "}
                        <span className="text-xs text-muted-foreground font-normal">
                          (Select Religion)
                        </span>
                      </p>
                      <Select
                        value={form.religion}
                        onValueChange={(v) =>
                          setForm((f) => ({
                            ...f,
                            religion: v as ReligionType,
                            personal: { ...f.personal, religion: v },
                          }))
                        }
                      >
                        <SelectTrigger
                          data-ocid="form.religion.select"
                          className="font-devanagari"
                        >
                          <SelectValue placeholder="धर्म निवडा" />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            [
                              "हिंदू",
                              "जैन",
                              "बौद्ध",
                              "लिंगायत",
                              "ख्रिश्चन",
                              "मुस्लीम",
                            ] as ReligionType[]
                          ).map((r) => (
                            <SelectItem
                              key={r}
                              value={r}
                              className="font-devanagari"
                            >
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language Selector */}
                    <div className="space-y-2">
                      <p className="font-devanagari font-semibold text-foreground text-sm">
                        {FL_LABELS.selectLanguage}{" "}
                        <span className="text-xs text-muted-foreground font-normal">
                          (Select Language)
                        </span>
                      </p>
                      <div className="flex gap-2">
                        {(
                          [
                            ["marathi", "मराठी"],
                            ["hindi", "हिंदी"],
                            ["english", "English"],
                          ] as [LanguageType, string][]
                        ).map(([val, label]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() =>
                              setForm((f) => ({ ...f, language: val }))
                            }
                            data-ocid={`form.language.${val}.toggle`}
                            className={`flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${form.language === val ? "border-maroon bg-maroon text-amber-50" : "border-border text-foreground hover:border-maroon/50"}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font Selector */}
                    <div className="space-y-2">
                      <p className="font-devanagari font-semibold text-foreground text-sm">
                        {FL_LABELS.selectFont}{" "}
                        <span className="text-xs text-muted-foreground font-normal">
                          (Select Font)
                        </span>
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            "Laila",
                            "Hind",
                            "Noto Sans Devanagari",
                            "Mukta",
                          ] as string[]
                        ).map((font) => (
                          <button
                            key={font}
                            type="button"
                            onClick={() =>
                              setForm((f) => ({ ...f, selectedFont: font }))
                            }
                            data-ocid={`form.font.${font.replace(/\s+/g, "-")}.toggle`}
                            className={`py-2.5 px-3 rounded-lg border-2 text-sm transition-all ${form.selectedFont === font ? "border-maroon bg-maroon/5" : "border-border hover:border-maroon/50"}`}
                            style={{ fontFamily: `'${font}', sans-serif` }}
                          >
                            <span
                              style={{ fontFamily: `'${font}', sans-serif` }}
                            >
                              {font === "Noto Sans Devanagari" ? "Noto" : font}
                            </span>
                            <span
                              className="text-xs text-muted-foreground ml-1.5"
                              style={{ fontFamily: `'${font}', sans-serif` }}
                            >
                              अ
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Template selector */}
                    <div>
                      <p className="font-devanagari text-center text-maroon font-semibold text-sm mb-4">
                        फक्त ₹४९ मध्ये सर्व टेम्प्लेट्स उपलब्ध
                      </p>
                      <div className="border-t border-border pt-5">
                        <p className="font-devanagari font-semibold text-foreground text-sm mb-3">
                          {FL_LABELS.selectTemplate}{" "}
                          <span className="text-xs text-muted-foreground font-normal">
                            (Select Template)
                          </span>
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {TEMPLATES_CONFIG.map((t) => {
                            const isSelected = form.template === t.id;
                            return (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => {
                                  selectTemplate(t.id);
                                }}
                                data-ocid={`template.select.${t.id}`}
                                className={`relative flex flex-col gap-2 p-3 rounded-xl border-2 text-left transition-all ${
                                  isSelected
                                    ? "border-2 shadow-md"
                                    : "border-border hover:border-gray-300"
                                }`}
                                style={{
                                  borderColor: isSelected ? t.color : undefined,
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    style={{
                                      width: 28,
                                      height: 28,
                                      background: t.color,
                                      borderRadius: 6,
                                      flexShrink: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: 14,
                                    }}
                                  >
                                    {t.emoji}
                                  </div>
                                  <div>
                                    <div className="font-devanagari font-semibold text-sm text-foreground">
                                      {t.name}
                                    </div>
                                    <div className="font-devanagari text-xs text-muted-foreground">
                                      {t.desc}
                                    </div>
                                  </div>
                                </div>
                                {isSelected && (
                                  <div
                                    className="text-xs font-devanagari font-semibold"
                                    style={{ color: t.color }}
                                  >
                                    ✓ निवडले
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1 - Personal Info */}
                {step === 1 && (
                  <div className="space-y-5">
                    <FieldCustomizer
                      step={1}
                      hiddenFields={hiddenFields}
                      onToggle={toggleField}
                      language={form.language}
                    />

                    {/* Photo Upload */}
                    <div className="flex items-start gap-5 p-4 bg-muted/50 rounded-xl border border-border">
                      <button
                        type="button"
                        className="relative cursor-pointer flex-shrink-0"
                        onClick={() => fileRef.current?.click()}
                      >
                        {form.photoPreview ? (
                          <img
                            src={form.photoPreview}
                            alt="Profile"
                            className="w-24 h-28 object-cover rounded-lg border-2 border-maroon shadow"
                          />
                        ) : (
                          <div className="w-24 h-28 rounded-lg border-2 border-dashed border-maroon/40 bg-amber-50 flex flex-col items-center justify-center gap-1 hover:border-maroon transition-colors">
                            <Upload className="w-6 h-6 text-maroon/50" />
                            <span className="font-devanagari text-[10px] text-muted-foreground text-center px-1">
                              फोटो
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileRef}
                          onChange={handlePhoto}
                          data-ocid="personal.photo.upload_button"
                        />
                      </button>
                      <div className="flex-1 space-y-1.5">
                        <div className="font-devanagari font-semibold text-sm text-foreground">
                          फोटो अपलोड करा{" "}
                          <span className="text-xs text-muted-foreground font-normal">
                            (Upload Photo)
                          </span>
                        </div>
                        <p className="font-devanagari text-xs text-muted-foreground leading-relaxed">
                          बायोडाटावर दाखवण्यासाठी एक स्पष्ट फोटो अपलोड करा. JPG,
                          PNG फॉर्मेट चालेल.
                        </p>
                        {form.photoPreview && (
                          <button
                            type="button"
                            onClick={() =>
                              setForm((f) => ({
                                ...f,
                                photoFile: null,
                                photoPreview: null,
                              }))
                            }
                            className="font-devanagari text-xs text-red-500 hover:text-red-700 underline"
                          >
                            फोटो काढा
                          </button>
                        )}
                        {!form.photoPreview && (
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="inline-flex items-center gap-1.5 font-devanagari text-xs font-semibold text-maroon border border-maroon/30 rounded-lg px-3 py-1.5 hover:bg-maroon/5 transition-colors"
                          >
                            <Upload className="w-3 h-3" /> फोटो निवडा
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.fullName} />
                        <Input
                          placeholder="उदा. राधा देशपांडे"
                          value={form.personal.name}
                          onChange={(e) => upP("name", e.target.value)}
                          data-ocid="personal.name.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.dob} />
                        <Input
                          type="date"
                          value={form.personal.dateOfBirth}
                          onChange={(e) => upP("dateOfBirth", e.target.value)}
                          data-ocid="personal.dob.input"
                        />
                      </div>
                    </div>
                    {!hiddenFields.has("timeOfBirth") && (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.tob} />
                          <Input
                            type="time"
                            value={form.personal.timeOfBirth}
                            onChange={(e) => upP("timeOfBirth", e.target.value)}
                            data-ocid="personal.tob.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.pob} />
                          <Input
                            placeholder="उदा. पुणे"
                            value={form.personal.placeOfBirth}
                            onChange={(e) =>
                              upP("placeOfBirth", e.target.value)
                            }
                            data-ocid="personal.pob.input"
                          />
                        </div>
                      </div>
                    )}
                    {hiddenFields.has("timeOfBirth") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.pob} />
                        <Input
                          placeholder="उदा. पुणे"
                          value={form.personal.placeOfBirth}
                          onChange={(e) => upP("placeOfBirth", e.target.value)}
                          data-ocid="personal.pob.input"
                        />
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.height} />
                        <Input
                          placeholder="उदा. ५ फूट"
                          value={form.personal.height}
                          onChange={(e) => upP("height", e.target.value)}
                          data-ocid="personal.height.input"
                        />
                      </div>
                      {!hiddenFields.has("complexion") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.complexion} />
                          <Select
                            value={form.personal.complexion}
                            onValueChange={(v) => upP("complexion", v)}
                          >
                            <SelectTrigger data-ocid="personal.complexion.select">
                              <SelectValue placeholder="निवडा" />
                            </SelectTrigger>
                            <SelectContent>
                              {["गोरा", "सावळा", "गहू वर्ण", "श्याम"].map((c) => (
                                <SelectItem
                                  key={c}
                                  value={c}
                                  className="font-devanagari"
                                >
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.education} />
                        <Input
                          placeholder="उदा. B.E. Computer"
                          value={form.personal.education}
                          onChange={(e) => upP("education", e.target.value)}
                          data-ocid="personal.education.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.occupation} />
                        <Input
                          placeholder="उदा. Software Engineer"
                          value={form.personal.occupation}
                          onChange={(e) => upP("occupation", e.target.value)}
                          data-ocid="personal.occupation.input"
                        />
                      </div>
                    </div>
                    {!hiddenFields.has("income") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.income} />
                        <Input
                          placeholder="उदा. ₹50,000"
                          value={form.personal.income}
                          onChange={(e) => upP("income", e.target.value)}
                          data-ocid="personal.income.input"
                        />
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {!hiddenFields.has("religion") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.religion} />
                          <div className="h-10 px-3 flex items-center rounded-md border border-input bg-muted font-devanagari text-sm">
                            {form.religion}
                          </div>
                        </div>
                      )}
                      {!hiddenFields.has("caste") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.caste} />
                          <Input
                            placeholder="उदा. ब्राह्मण"
                            value={form.personal.caste}
                            onChange={(e) => upP("caste", e.target.value)}
                            data-ocid="personal.caste.input"
                          />
                        </div>
                      )}
                    </div>
                    {!hiddenFields.has("gotra") &&
                      !["बौद्ध", "ख्रिश्चन", "मुस्लीम"].includes(form.religion) && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.gotra} />
                          <Input
                            placeholder="उदा. कश्यप"
                            value={form.personal.gotra}
                            onChange={(e) => upP("gotra", e.target.value)}
                            data-ocid="personal.gotra.input"
                          />
                        </div>
                      )}
                    {!hiddenFields.has("manglikStatus") &&
                      !["ख्रिश्चन", "मुस्लीम", "बौद्ध"].includes(form.religion) && (
                        <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                          <Switch
                            checked={form.personal.manglikStatus}
                            onCheckedChange={(v) => upP("manglikStatus", v)}
                            data-ocid="personal.manglik.switch"
                          />
                          <span className="font-devanagari font-semibold text-sm">
                            मांगलिक{" "}
                            <span className="text-xs text-muted-foreground font-sans">
                              (Manglik Status)
                            </span>
                          </span>
                        </div>
                      )}

                    {/* Denomination for Christian */}
                    {form.religion === "ख्रिश्चन" && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.denomination} />
                        <Input
                          placeholder="उदा. Catholic, Protestant"
                          value={(form.personal as any).denomination || ""}
                          onChange={(e) =>
                            upP("denomination" as any, e.target.value)
                          }
                          data-ocid="personal.denomination.input"
                        />
                      </div>
                    )}

                    {/* Panth for Buddhist / Muslim */}
                    {(form.religion === "बौद्ध" ||
                      form.religion === "मुस्लीम") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.panth} />
                        <Input
                          placeholder={
                            form.religion === "मुस्लीम"
                              ? "सुन्नी / शिया"
                              : "उदा. नवयान, थेरवाद"
                          }
                          value={(form.personal as any).denomination || ""}
                          onChange={(e) =>
                            upP("denomination" as any, e.target.value)
                          }
                          data-ocid="personal.panth.input"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2 - Family Info */}
                {step === 2 && (
                  <div className="space-y-5">
                    <FieldCustomizer
                      step={2}
                      hiddenFields={hiddenFields}
                      onToggle={toggleField}
                      language={form.language}
                    />
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.fatherName} />
                        <Input
                          placeholder="उदा. सुरेश देशपांडे"
                          value={form.family.fatherName}
                          onChange={(e) => upF("fatherName", e.target.value)}
                          data-ocid="family.father_name.input"
                        />
                      </div>
                      {!hiddenFields.has("fatherOccupation") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.fatherOccupation} />
                          <Input
                            placeholder="उदा. सरकारी नोकरी"
                            value={form.family.fatherOccupation}
                            onChange={(e) =>
                              upF("fatherOccupation", e.target.value)
                            }
                            data-ocid="family.father_occ.input"
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.motherName} />
                        <Input
                          placeholder="उदा. सुमित्रा देशपांडे"
                          value={form.family.motherName}
                          onChange={(e) => upF("motherName", e.target.value)}
                          data-ocid="family.mother_name.input"
                        />
                      </div>
                      {!hiddenFields.has("motherOccupation") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.motherOccupation} />
                          <Input
                            placeholder="उदा. गृहिणी"
                            value={form.family.motherOccupation}
                            onChange={(e) =>
                              upF("motherOccupation", e.target.value)
                            }
                            data-ocid="family.mother_occ.input"
                          />
                        </div>
                      )}
                    </div>
                    {!hiddenFields.has("siblingsInfo") && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <FL label={FL_LABELS.siblings} />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={addSibling}
                            data-ocid="family.siblings.button"
                            className="text-xs h-7 px-2"
                          >
                            ➕ {FL_LABELS.addSibling}
                          </Button>
                        </div>
                        {siblings.length === 0 && (
                          <p
                            className="text-sm text-muted-foreground italic"
                            data-ocid="family.siblings.empty_state"
                          >
                            भाऊ/बहिणींची माहिती जोडण्यासाठी वरील बटण दाबा
                          </p>
                        )}
                        <div className="space-y-3">
                          {siblings.map((sib, idx) => (
                            <div
                              key={sib.id}
                              className="border rounded-lg p-3 bg-muted/30 space-y-2"
                              data-ocid={`family.siblings.item.${idx + 1}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">
                                  क्र. {idx + 1}
                                </span>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeSibling(sib.id)}
                                  data-ocid={`family.siblings.delete_button.${idx + 1}`}
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                >
                                  ✕
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <div className="space-y-1">
                                  <span className="text-xs text-muted-foreground">
                                    {FL_LABELS.type}
                                  </span>
                                  <div className="flex gap-1">
                                    {(["भाऊ", "बहीण"] as const).map((t) => (
                                      <button
                                        key={t}
                                        type="button"
                                        onClick={() =>
                                          updateSibling(sib.id, "type", t)
                                        }
                                        className={`flex-1 text-xs py-1 px-2 rounded border transition-colors ${sib.type === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-muted"}`}
                                      >
                                        {t}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs text-muted-foreground">
                                    नाव
                                  </span>
                                  <Input
                                    placeholder="नाव"
                                    value={sib.name}
                                    onChange={(e) =>
                                      updateSibling(
                                        sib.id,
                                        "name",
                                        e.target.value,
                                      )
                                    }
                                    className="h-8 text-sm"
                                    data-ocid={`family.siblings.input.${idx + 1}`}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs text-muted-foreground">
                                    {FL_LABELS.maritalStatus}
                                  </span>
                                  <Select
                                    value={sib.maritalStatus}
                                    onValueChange={(v) =>
                                      updateSibling(sib.id, "maritalStatus", v)
                                    }
                                  >
                                    <SelectTrigger
                                      className="h-8 text-sm"
                                      data-ocid={`family.siblings.select.${idx + 1}`}
                                    >
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="अविवाहित">
                                        अविवाहित
                                      </SelectItem>
                                      <SelectItem value="विवाहित">
                                        विवाहित
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs text-muted-foreground">
                                    {FL_LABELS.workPost}
                                  </span>
                                  <Input
                                    placeholder="व्यवसाय"
                                    value={sib.occupation}
                                    onChange={(e) =>
                                      updateSibling(
                                        sib.id,
                                        "occupation",
                                        e.target.value,
                                      )
                                    }
                                    className="h-8 text-sm"
                                    data-ocid={`family.siblings.input.${idx + 1}`}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* मामा, काका, आत्या, पाहुणे */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {!hiddenFields.has("mamaInfo") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.mama} />
                          <Input
                            placeholder="उदा. राम पाटील, शेती"
                            value={form.family.mamaInfo}
                            onChange={(e) => upF("mamaInfo", e.target.value)}
                            data-ocid="family.mama.input"
                          />
                        </div>
                      )}
                      {!hiddenFields.has("kakaInfo") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.kaka} />
                          <Input
                            placeholder="उदा. सुरेश देशमुख, व्यापार"
                            value={form.family.kakaInfo}
                            onChange={(e) => upF("kakaInfo", e.target.value)}
                            data-ocid="family.kaka.input"
                          />
                        </div>
                      )}
                      {!hiddenFields.has("atyaInfo") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.atya} />
                          <Input
                            placeholder="उदा. सुनीता जोशी, गृहिणी"
                            value={form.family.atyaInfo}
                            onChange={(e) => upF("atyaInfo", e.target.value)}
                            data-ocid="family.atya.input"
                          />
                        </div>
                      )}
                      {!hiddenFields.has("pahuneInfo") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.pahune} />
                          <Input
                            placeholder="उदा. विजय कुलकर्णी, डॉक्टर"
                            value={form.family.pahuneInfo}
                            onChange={(e) => upF("pahuneInfo", e.target.value)}
                            data-ocid="family.pahune.input"
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {!hiddenFields.has("familyType") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.familyType} />
                          <Select
                            value={form.family.familyType}
                            onValueChange={(v) => upF("familyType", v)}
                          >
                            <SelectTrigger data-ocid="family.type.select">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["एकत्र", "विभक्त"].map((t) => (
                                <SelectItem
                                  key={t}
                                  value={t}
                                  className="font-devanagari"
                                >
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {!hiddenFields.has("nativePlace") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.nativePlace} />
                          <Input
                            placeholder="उदा. सातारा"
                            value={form.family.nativePlace}
                            onChange={(e) => upF("nativePlace", e.target.value)}
                            data-ocid="family.native.input"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3 - Horoscope */}
                {step === 3 && (
                  <div className="space-y-5">
                    <FieldCustomizer
                      step={3}
                      hiddenFields={hiddenFields}
                      onToggle={toggleField}
                      language={form.language}
                    />
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.rashi} />
                        <Select
                          value={form.horoscope.rashi}
                          onValueChange={(v) => upH("rashi", v)}
                        >
                          <SelectTrigger data-ocid="horoscope.rashi.select">
                            <SelectValue placeholder="राशी निवडा" />
                          </SelectTrigger>
                          <SelectContent>
                            {RASHIS.map((r) => (
                              <SelectItem
                                key={r}
                                value={r}
                                className="font-devanagari"
                              >
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.nakshatra} />
                        <Select
                          value={form.horoscope.nakshatra}
                          onValueChange={(v) => upH("nakshatra", v)}
                        >
                          <SelectTrigger data-ocid="horoscope.nakshatra.select">
                            <SelectValue placeholder="नक्षत्र निवडा" />
                          </SelectTrigger>
                          <SelectContent className="max-h-48">
                            {NAKSHATRAS.map((n) => (
                              <SelectItem
                                key={n}
                                value={n}
                                className="font-devanagari"
                              >
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {!hiddenFields.has("gan") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.gan} />
                        <Select
                          value={form.horoscope.gan}
                          onValueChange={(v) => upH("gan", v)}
                        >
                          <SelectTrigger data-ocid="horoscope.gan.select">
                            <SelectValue placeholder="निवडा" />
                          </SelectTrigger>
                          <SelectContent>
                            {GANS.map((g) => (
                              <SelectItem
                                key={g}
                                value={g}
                                className="font-devanagari"
                              >
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {!hiddenFields.has("nadi") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.nadi} />
                        <Select
                          value={form.horoscope.nadi}
                          onValueChange={(v) => upH("nadi", v)}
                        >
                          <SelectTrigger data-ocid="horoscope.nadi.select">
                            <SelectValue placeholder="निवडा" />
                          </SelectTrigger>
                          <SelectContent>
                            {NADIS.map((n) => (
                              <SelectItem
                                key={n}
                                value={n}
                                className="font-devanagari"
                              >
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {!hiddenFields.has("charan") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.charan} />
                        <Input
                          placeholder="उदा. ३"
                          value={form.horoscope.charan}
                          onChange={(e) => upH("charan", e.target.value)}
                          data-ocid="horoscope.charan.input"
                        />
                      </div>
                    )}
                    {!hiddenFields.has("planetaryPositions") && (
                      <div>
                        <p className="font-devanagari font-semibold text-foreground mb-3">
                          {FL_LABELS.planetaryPos}{" "}
                          <span className="text-xs font-sans text-muted-foreground">
                            (Planetary Positions)
                          </span>
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {HOUSES.map((house, i) => (
                            <div key={house} className="space-y-1">
                              <span className="font-devanagari text-xs text-muted-foreground">
                                {i + 1}. {house}
                              </span>
                              <Input
                                placeholder="ग्रह"
                                value={
                                  form.horoscope.planetaryPositions[i] || ""
                                }
                                onChange={(e) => upPlanet(i, e.target.value)}
                                className="text-xs"
                                data-ocid={`horoscope.house.input.${i + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4 - Contact & Photo */}
                {step === 4 && (
                  <div className="space-y-5">
                    <FieldCustomizer
                      step={4}
                      hiddenFields={hiddenFields}
                      onToggle={toggleField}
                      language={form.language}
                    />
                    <div className="space-y-1.5">
                      <FL label={FL_LABELS.phone} />
                      <Input
                        placeholder="फोन नंबर टाका"
                        value={form.contact.phone}
                        onChange={(e) => upC("phone", e.target.value)}
                        data-ocid="contact.phone.input"
                      />
                    </div>
                    {!hiddenFields.has("email") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.email} />
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          value={form.contact.email}
                          onChange={(e) => upC("email", e.target.value)}
                          data-ocid="contact.email.input"
                        />
                      </div>
                    )}
                    {!hiddenFields.has("address") && (
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.address} />
                        <Textarea
                          placeholder="उदा. १२३, मोहन नगर, पुणे - ४११०२१"
                          value={form.contact.address}
                          onChange={(e) => upC("address", e.target.value)}
                          rows={3}
                          data-ocid="contact.address.textarea"
                        />
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-6 md:px-8 pb-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const skipHoroscope = ["ख्रिश्चन", "मुस्लीम"].includes(
                  form.religion,
                );
                const prevStep =
                  skipHoroscope && step === 4 ? 2 : Math.max(0, step - 1);
                setStep(prevStep);
              }}
              disabled={step === 0}
              className="font-devanagari gap-2"
              data-ocid="form.prev.button"
            >
              <ChevronLeft className="w-4 h-4" /> {FL_LABELS.prev}
            </Button>
            {step === 0 ? (
              <Button
                onClick={() => {
                  if (!selectedPlan) {
                    toast.error("कृपया प्लान निवडा");
                    return;
                  }
                  sessionStorage.setItem("selectedPlan", selectedPlan);
                  setStep(1);
                }}
                className="font-devanagari gap-2 bg-maroon hover:opacity-90"
                data-ocid="form.next.button"
              >
                {FL_LABELS.next} <ChevronRight className="w-4 h-4" />
              </Button>
            ) : step < STEP_TITLES.length - 1 ? (
              <Button
                onClick={() => {
                  const skipHoroscope = ["ख्रिश्चन", "मुस्लीम"].includes(
                    form.religion,
                  );
                  const nextStep = skipHoroscope && step === 2 ? 4 : step + 1;
                  setStep(nextStep);
                }}
                className="font-devanagari gap-2 bg-maroon hover:opacity-90"
                data-ocid="form.next.button"
              >
                {FL_LABELS.next} <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="font-devanagari gap-2 bg-maroon hover:opacity-90"
                data-ocid="form.submit_button"
              >
                {mutation.isPending ? FL_LABELS.saving : FL_LABELS.submit}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
