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
  Lock,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type {
  ContactInfo,
  ExternalBlob,
  FamilyInfo,
  Horoscope,
  PersonalInfo,
} from "../backend";

const STEP_TITLES = [
  { mr: "प्लान निवडा", en: "Select Plan" },
  { mr: "वैयक्तिक माहिती", en: "Personal Info" },
  { mr: "कौटुंबिक माहिती", en: "Family Info" },
  { mr: "कुंडली / जन्मपत्रिका", en: "Horoscope" },
  { mr: "संपर्क व फोटो", en: "Contact & Photo" },
];

const PLANS = [
  {
    id: "basic",
    name: "बेसिक",
    price: "₹20",
    templates: ["traditional"],
    features: ["पारंपारिक टेम्पलेट", "PDF डाउनलोड", "सर्व माहिती"],
  },
  {
    id: "standard",
    name: "स्टँडर्ड",
    price: "₹50",
    templates: ["traditional", "modern"],
    features: ["२ टेम्पलेट्स", "PDF डाउनलोड", "सर्व माहिती", "कस्टम फील्ड्स"],
    popular: true,
  },
  {
    id: "premium",
    name: "प्रीमियम",
    price: "₹90",
    templates: ["traditional", "modern", "royal", "floral"],
    features: [
      "सर्व ४ टेम्पलेट्स",
      "PDF डाउनलोड",
      "सर्व माहिती",
      "कस्टम फील्ड्स",
      "प्राधान्य सहाय्य",
    ],
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
const TEMPLATES_LIST = [
  { id: "traditional", label: "पारंपारिक" },
  { id: "modern", label: "आधुनिक" },
  { id: "royal", label: "राजेशाही" },
  { id: "floral", label: "पुष्पलता" },
];

// Optional fields config per step
const OPTIONAL_FIELDS: Record<number, { key: string; label: string }[]> = {
  1: [
    { key: "timeOfBirth", label: "जन्म वेळ" },
    { key: "complexion", label: "रंग" },
    { key: "income", label: "मासिक उत्पन्न" },
    { key: "religion", label: "धर्म" },
    { key: "caste", label: "जात" },
    { key: "gotra", label: "गोत्र" },
    { key: "manglikStatus", label: "मांगलिक" },
  ],
  2: [
    { key: "fatherOccupation", label: "वडिलांचा व्यवसाय" },
    { key: "motherOccupation", label: "आईचा व्यवसाय" },
    { key: "siblingsInfo", label: "भाऊ-बहीण माहिती" },
    { key: "familyType", label: "कुटुंब प्रकार" },
    { key: "nativePlace", label: "मूळ गाव" },
  ],
  3: [
    { key: "gan", label: "गण" },
    { key: "nadi", label: "नाडी" },
    { key: "charan", label: "चरण" },
    { key: "planetaryPositions", label: "ग्रह स्थिती" },
  ],
  4: [
    { key: "email", label: "ईमेल" },
    { key: "address", label: "पत्ता" },
  ],
};

interface FormState {
  personal: PersonalInfo;
  family: FamilyInfo;
  horoscope: Horoscope;
  contact: ContactInfo;
  template: string;
  photoFile: File | null;
  photoPreview: string | null;
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
  family: {
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblingsInfo: "",
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
  template: "traditional",
  photoFile: null,
  photoPreview: null,
};

function FL({ mr, en }: { mr: string; en: string }) {
  return (
    <Label className="flex items-baseline gap-1.5">
      <span className="font-devanagari font-semibold text-foreground">
        {mr}
      </span>
      <span className="text-xs text-muted-foreground">({en})</span>
    </Label>
  );
}

function FieldCustomizer({
  step,
  hiddenFields,
  onToggle,
}: {
  step: number;
  hiddenFields: Set<string>;
  onToggle: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const fields = OPTIONAL_FIELDS[step];
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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultState);
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());
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
  const upF = (k: keyof FamilyInfo, v: string) =>
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

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({
      ...f,
      photoFile: file,
      photoPreview: URL.createObjectURL(file),
    }));
  }

  const planTemplates = PLANS.find((p) => p.id === selectedPlan)?.templates || [
    "traditional",
  ];

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
          if (mod.ExternalBlob?.fromBytes) {
            photo = mod.ExternalBlob.fromBytes(bytes);
          }
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
    sessionStorage.setItem(
      "biodataFormData",
      JSON.stringify({
        personal: form.personal,
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
                {/* Step 0 - Plan Selection */}
                {step === 0 && (
                  <div className="space-y-4">
                    <p className="font-devanagari text-center text-muted-foreground text-sm mb-6">
                      आपल्या गरजेनुसार प्लान निवडा
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {PLANS.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                            selectedPlan === plan.id
                              ? "border-maroon bg-maroon/5 shadow-md"
                              : "border-border hover:border-maroon/40"
                          }`}
                          data-ocid={`plan.select.${plan.id}`}
                        >
                          {plan.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maroon text-amber-50 text-xs font-devanagari px-3 py-0.5 rounded-full">
                              लोकप्रिय
                            </span>
                          )}
                          <div className="font-serif-devanagari font-bold text-xl text-maroon mb-1">
                            {plan.price}
                          </div>
                          <div className="font-devanagari font-semibold text-foreground mb-3">
                            {plan.name}
                          </div>
                          <ul className="space-y-1">
                            {plan.features.map((f) => (
                              <li
                                key={f}
                                className="font-devanagari text-xs text-muted-foreground flex items-center gap-1.5"
                              >
                                <span className="text-green-600">✓</span> {f}
                              </li>
                            ))}
                          </ul>
                          {selectedPlan === plan.id && (
                            <div className="mt-3 text-center text-xs font-devanagari font-semibold text-maroon">
                              ✓ निवडले
                            </div>
                          )}
                        </button>
                      ))}
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
                    />
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL mr="पूर्ण नाव" en="Full Name" />
                        <Input
                          placeholder="उदा. राधा देशपांडे"
                          value={form.personal.name}
                          onChange={(e) => upP("name", e.target.value)}
                          data-ocid="personal.name.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <FL mr="जन्म तारीख" en="Date of Birth" />
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
                          <FL mr="जन्म वेळ" en="Time of Birth" />
                          <Input
                            type="time"
                            value={form.personal.timeOfBirth}
                            onChange={(e) => upP("timeOfBirth", e.target.value)}
                            data-ocid="personal.tob.input"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <FL mr="जन्म ठिकाण" en="Place of Birth" />
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
                        <FL mr="जन्म ठिकाण" en="Place of Birth" />
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
                        <FL mr="उंची" en="Height" />
                        <Input
                          placeholder="उदा. ५ फूट"
                          value={form.personal.height}
                          onChange={(e) => upP("height", e.target.value)}
                          data-ocid="personal.height.input"
                        />
                      </div>
                      {!hiddenFields.has("complexion") && (
                        <div className="space-y-1.5">
                          <FL mr="रंग" en="Complexion" />
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
                        <FL mr="शिक्षण" en="Education" />
                        <Input
                          placeholder="उदा. B.E. Computer"
                          value={form.personal.education}
                          onChange={(e) => upP("education", e.target.value)}
                          data-ocid="personal.education.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <FL mr="व्यवसाय" en="Occupation" />
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
                        <FL mr="मासिक उत्पन्न" en="Monthly Income" />
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
                          <FL mr="धर्म" en="Religion" />
                          <Input
                            value={form.personal.religion}
                            onChange={(e) => upP("religion", e.target.value)}
                            data-ocid="personal.religion.input"
                          />
                        </div>
                      )}
                      {!hiddenFields.has("caste") && (
                        <div className="space-y-1.5">
                          <FL mr="जात" en="Caste" />
                          <Input
                            placeholder="उदा. ब्राह्मण"
                            value={form.personal.caste}
                            onChange={(e) => upP("caste", e.target.value)}
                            data-ocid="personal.caste.input"
                          />
                        </div>
                      )}
                    </div>
                    {!hiddenFields.has("gotra") && (
                      <div className="space-y-1.5">
                        <FL mr="गोत्र" en="Gotra" />
                        <Input
                          placeholder="उदा. कश्यप"
                          value={form.personal.gotra}
                          onChange={(e) => upP("gotra", e.target.value)}
                          data-ocid="personal.gotra.input"
                        />
                      </div>
                    )}
                    {!hiddenFields.has("manglikStatus") && (
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
                  </div>
                )}

                {/* Step 2 - Family Info */}
                {step === 2 && (
                  <div className="space-y-5">
                    <FieldCustomizer
                      step={2}
                      hiddenFields={hiddenFields}
                      onToggle={toggleField}
                    />
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL mr="वडिलांचे नाव" en="Father's Name" />
                        <Input
                          placeholder="उदा. सुरेश देशपांडे"
                          value={form.family.fatherName}
                          onChange={(e) => upF("fatherName", e.target.value)}
                          data-ocid="family.father_name.input"
                        />
                      </div>
                      {!hiddenFields.has("fatherOccupation") && (
                        <div className="space-y-1.5">
                          <FL mr="वडिलांचा व्यवसाय" en="Father's Occupation" />
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
                        <FL mr="आईचे नाव" en="Mother's Name" />
                        <Input
                          placeholder="उदा. सुमित्रा देशपांडे"
                          value={form.family.motherName}
                          onChange={(e) => upF("motherName", e.target.value)}
                          data-ocid="family.mother_name.input"
                        />
                      </div>
                      {!hiddenFields.has("motherOccupation") && (
                        <div className="space-y-1.5">
                          <FL mr="आईचा व्यवसाय" en="Mother's Occupation" />
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
                      <div className="space-y-1.5">
                        <FL mr="भाऊ-बहीण माहिती" en="Siblings Info" />
                        <Textarea
                          placeholder="उदा. एक मोठा भाऊ - विवाहित, एक लहान बहीण - अविवाहित"
                          value={form.family.siblingsInfo}
                          onChange={(e) => upF("siblingsInfo", e.target.value)}
                          rows={3}
                          data-ocid="family.siblings.textarea"
                        />
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {!hiddenFields.has("familyType") && (
                        <div className="space-y-1.5">
                          <FL mr="कुटुंब प्रकार" en="Family Type" />
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
                          <FL mr="मूळ गाव" en="Native Place" />
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
                    />
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL mr="राशी" en="Rashi" />
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
                        <FL mr="नक्षत्र" en="Nakshatra" />
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
                        <FL mr="गण" en="Gan" />
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
                        <FL mr="नाडी" en="Nadi" />
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
                        <FL mr="चरण" en="Charan" />
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
                          ग्रह स्थिती{" "}
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
                    />
                    <div className="space-y-1.5">
                      <FL mr="फोन नंबर" en="Phone" />
                      <Input
                        placeholder="उदा. 9876543210"
                        value={form.contact.phone}
                        onChange={(e) => upC("phone", e.target.value)}
                        data-ocid="contact.phone.input"
                      />
                    </div>
                    {!hiddenFields.has("email") && (
                      <div className="space-y-1.5">
                        <FL mr="ईमेल" en="Email" />
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
                        <FL mr="पत्ता" en="Address" />
                        <Textarea
                          placeholder="उदा. १२३, मोहन नगर, पुणे - ४११०२१"
                          value={form.contact.address}
                          onChange={(e) => upC("address", e.target.value)}
                          rows={3}
                          data-ocid="contact.address.textarea"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <FL mr="फोटो अपलोड करा" en="Upload Photo" />
                      <div
                        className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-maroon transition-colors"
                        onClick={() => fileRef.current?.click()}
                        onKeyDown={(e) =>
                          e.key === "Enter" && fileRef.current?.click()
                        }
                        data-ocid="contact.dropzone"
                      >
                        {form.photoPreview ? (
                          <div className="flex flex-col items-center gap-2">
                            <img
                              src={form.photoPreview}
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover border-2"
                              style={{ borderColor: "oklch(var(--gold))" }}
                            />
                            <p className="font-devanagari text-sm text-muted-foreground">
                              बदलण्यासाठी क्लिक करा
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            <p className="font-devanagari text-sm text-muted-foreground">
                              फोटो अपलोड करण्यासाठी क्लिक करा
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG (max 5MB)
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhoto}
                        data-ocid="contact.upload_button"
                      />
                    </div>
                    <div className="space-y-2">
                      <FL mr="टेम्पलेट निवडा" en="Choose Template" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {TEMPLATES_LIST.map((tmpl) => {
                          const isLocked = !planTemplates.includes(tmpl.id);
                          return (
                            <button
                              type="button"
                              key={tmpl.id}
                              onClick={() => {
                                if (!isLocked)
                                  setForm((f) => ({ ...f, template: tmpl.id }));
                              }}
                              className={`relative rounded-xl border-2 p-2 text-center transition-all ${
                                isLocked
                                  ? "border-border opacity-60 cursor-not-allowed"
                                  : form.template === tmpl.id
                                    ? "border-maroon bg-maroon/5"
                                    : "border-border hover:border-maroon/50"
                              }`}
                              data-ocid={`template.select.${tmpl.id}`}
                            >
                              <img
                                src={`/assets/generated/template-${tmpl.id}.dim_400x560.jpg`}
                                alt={tmpl.label}
                                className="w-full aspect-[3/4] object-cover rounded-lg mb-1"
                              />
                              <span className="font-devanagari text-xs font-semibold text-foreground">
                                {tmpl.label}
                              </span>
                              {isLocked && (
                                <div className="absolute inset-0 rounded-xl bg-black/30 flex flex-col items-center justify-center gap-1">
                                  <Lock className="w-5 h-5 text-white" />
                                  <span className="font-devanagari text-[10px] text-white font-semibold">
                                    प्रीमियम आवश्यक
                                  </span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-6 md:px-8 pb-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="font-devanagari gap-2"
              data-ocid="form.prev.button"
            >
              <ChevronLeft className="w-4 h-4" /> मागे
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
                पुढे <ChevronRight className="w-4 h-4" />
              </Button>
            ) : step < STEP_TITLES.length - 1 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                className="font-devanagari gap-2 bg-maroon hover:opacity-90"
                data-ocid="form.next.button"
              >
                पुढे <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="font-devanagari gap-2 bg-maroon hover:opacity-90"
                data-ocid="form.submit_button"
              >
                {mutation.isPending ? "जतन करत आहे..." : "बायोडाटा तयार करा ✓"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
