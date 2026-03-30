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
import { useSiteLang } from "@/contexts/LanguageContext";
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
type LanguageType = "marathi" | "hindi" | "english" | "kannada" | "urdu";

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
    photoUploadInstruction:
      "बायोडाटावर दाखवण्यासाठी एक स्पष्ट फोटो अपलोड करा. JPG, PNG फॉर्मेट चालेल.",
    photoSelectBtn: "फोटो निवडा",
    photoRemoveBtn: "फोटो काढा",
    photoLabel: "फोटो",
    photoUploadTitle: "फोटो अपलोड करा",
    customizeToggle: "⚙️ फील्ड कस्टमाइज करा",
    customizeHint: "हवे ते फील्ड निवडा — अनावश्यक फील्ड काढू शकता",
    siblingEmptyHint: "भाऊ/बहिणींची माहिती जोडण्यासाठी वरील बटण दाबा",
    allTemplatesAvail: "फक्त ₹४९ मध्ये सर्व टेम्प्लेट्स उपलब्ध",
    templateSelected: "✓ निवडले",
    selectPlaceholder: "निवडा",
    rashiPlaceholder: "राशी निवडा",
    nakshatraPlaceholder: "नक्षत्र निवडा",
    religionPlaceholder: "धर्म निवडा",
    phoneNumber: "फोन नंबर टाका",
    planetPlaceholder: "ग्रह",
    sibling_bro: "भाऊ",
    sibling_sis: "बहीण",
    sibling_num: "क्र.",
    placeOfBirth_placeholder: "उदा. पुणे",
    height_placeholder: "उदा. ५ फूट",
    education_placeholder: "उदा. B.E. Computer",
    occupation_placeholder: "उदा. Software Engineer",
    income_placeholder: "उदा. ₹50,000",
    caste_placeholder: "उदा. ब्राह्मण",
    gotra_placeholder: "उदा. कश्यप",
    fatherOcc_placeholder: "उदा. सरकारी नोकरी",
    motherOcc_placeholder: "उदा. गृहिणी",
    mama_placeholder: "उदा. राम पाटील, शेती",
    kaka_placeholder: "उदा. सुरेश देशमुख, व्यापार",
    atya_placeholder: "उदा. सुनीता जोशी, गृहिणी",
    pahune_placeholder: "उदा. विजय कुलकर्णी, डॉक्टर",
    nativePlaceholder: "उदा. सातारा",
    charan_placeholder: "उदा. ३",
    address_placeholder: "उदा. १२३, मोहन नगर, पुणे - ४११०२१",
    denomination_placeholder: "उदा. Catholic, Protestant",
    panth_placeholder_muslim: "सुन्नी / शिया",
    panth_placeholder_buddhist: "उदा. नवयान, थेरवाद",
    sibName_placeholder: "नाव",
    sibOcc_placeholder: "व्यवसाय",
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
    photoUploadInstruction:
      "बायोडेटा पर दिखाने के लिए एक स्पष्ट फ़ोटो अपलोड करें. JPG, PNG फ़ॉर्मेट चलेगा.",
    photoSelectBtn: "फ़ोटो चुनें",
    photoRemoveBtn: "फ़ोटो हटाएं",
    photoLabel: "फ़ोटो",
    photoUploadTitle: "फ़ोटो अपलोड करें",
    customizeToggle: "⚙️ फ़ील्ड कस्टमाइज़ करें",
    customizeHint: "जो फ़ील्ड चाहिए चुनें — अनावश्यक फ़ील्ड हटा सकते हैं",
    siblingEmptyHint: "भाई/बहनों की जानकारी जोड़ने के लिए ऊपर बटन दबाएं",
    allTemplatesAvail: "सिर्फ ₹४९ में सभी टेम्पलेट उपलब्ध",
    templateSelected: "✓ चुना",
    selectPlaceholder: "चुनें",
    rashiPlaceholder: "राशि चुनें",
    nakshatraPlaceholder: "नक्षत्र चुनें",
    religionPlaceholder: "धर्म चुनें",
    phoneNumber: "फ़ोन नंबर डालें",
    planetPlaceholder: "ग्रह",
    sibling_bro: "भाई",
    sibling_sis: "बहन",
    sibling_num: "क्र.",
    placeOfBirth_placeholder: "उदा. पुणे",
    height_placeholder: "उदा. ५ फुट",
    education_placeholder: "उदा. B.E. Computer",
    occupation_placeholder: "उदा. Software Engineer",
    income_placeholder: "उदा. ₹50,000",
    caste_placeholder: "उदा. ब्राह्मण",
    gotra_placeholder: "उदा. कश्यप",
    fatherOcc_placeholder: "उदा. सरकारी नौकरी",
    motherOcc_placeholder: "उदा. गृहिणी",
    mama_placeholder: "उदा. राम पाटील, खेती",
    kaka_placeholder: "उदा. सुरेश देशमुख, व्यापार",
    atya_placeholder: "उदा. सुनीता जोशी, गृहिणी",
    pahune_placeholder: "उदा. विजय कुलकर्णी, डॉक्टर",
    nativePlaceholder: "उदा. सातारा",
    charan_placeholder: "उदा. ३",
    address_placeholder: "उदा. १२३, मोहन नगर, पुणे - ४११०२१",
    denomination_placeholder: "उदा. Catholic, Protestant",
    panth_placeholder_muslim: "सुन्नी / शिया",
    panth_placeholder_buddhist: "उदा. नवयान, थेरवाद",
    sibName_placeholder: "नाम",
    sibOcc_placeholder: "व्यवसाय",
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
    photoUploadInstruction:
      "Upload a clear photo for your biodata. JPG, PNG format accepted.",
    photoSelectBtn: "Choose Photo",
    photoRemoveBtn: "Remove Photo",
    photoLabel: "Photo",
    photoUploadTitle: "Upload Photo",
    customizeToggle: "⚙️ Customize Fields",
    customizeHint: "Select fields you need — remove unnecessary ones",
    siblingEmptyHint: "Press the button above to add sibling information",
    allTemplatesAvail: "All templates available for just ₹49",
    templateSelected: "✓ Selected",
    selectPlaceholder: "Select",
    rashiPlaceholder: "Select Rashi",
    nakshatraPlaceholder: "Select Nakshatra",
    religionPlaceholder: "Select Religion",
    phoneNumber: "Enter phone number",
    planetPlaceholder: "Planet",
    sibling_bro: "Brother",
    sibling_sis: "Sister",
    sibling_num: "No.",
    placeOfBirth_placeholder: "e.g. Pune",
    height_placeholder: "e.g. 5 feet",
    education_placeholder: "e.g. B.E. Computer",
    occupation_placeholder: "e.g. Software Engineer",
    income_placeholder: "e.g. ₹50,000",
    caste_placeholder: "e.g. Brahmin",
    gotra_placeholder: "e.g. Kashyap",
    fatherOcc_placeholder: "e.g. Government Service",
    motherOcc_placeholder: "e.g. Homemaker",
    mama_placeholder: "e.g. Ram Patil, Farming",
    kaka_placeholder: "e.g. Suresh Deshmukh, Business",
    atya_placeholder: "e.g. Sunita Joshi, Homemaker",
    pahune_placeholder: "e.g. Vijay Kulkarni, Doctor",
    nativePlaceholder: "e.g. Satara",
    charan_placeholder: "e.g. 3",
    address_placeholder: "e.g. 123, Mohan Nagar, Pune - 411021",
    denomination_placeholder: "e.g. Catholic, Protestant",
    panth_placeholder_muslim: "Sunni / Shia",
    panth_placeholder_buddhist: "e.g. Navayan, Theravada",
    sibName_placeholder: "Name",
    sibOcc_placeholder: "Occupation",
    planetaryPositions: "Planetary Positions",
  },
  kannada: {
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
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
    siblings: "ಒಡಹುಟ್ಟಿದವರ ಮಾಹಿತಿ",
    familyType: "ಕುಟುಂಬ ಪ್ರಕಾರ",
    nativePlace: "ಮೂಲ ಊರು",
    mama: "ಮಾವ",
    kaka: "ಚಿಕ್ಕಪ್ಪ",
    atya: "ಅತ್ತೆ",
    pahune: "ಅಳಿಯ/ಸೊಸೆ",
    phone: "ಫೋನ್ ನಂಬರ್",
    email: "ಇಮೇಲ್",
    address: "ವಿಳಾಸ",
    photo: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    denomination: "ಪಂಥ",
    panth: "ಪಂಥ",
    selectReligion: "ಧರ್ಮ ಆಯ್ಕೆ ಮಾಡಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
    selectFont: "ಫಾಂಟ್ ಆಯ್ಕೆ ಮಾಡಿ",
    selectTemplate: "ಟೆಂಪ್ಲೇಟ್ ಆಯ್ಕೆ ಮಾಡಿ",
    addSibling: "ಒಡಹುಟ್ಟಿದವರನ್ನು ಸೇರಿಸಿ",
    type: "ಪ್ರಕಾರ",
    name: "ಹೆಸರು",
    maritalStatus: "ವೈವಾಹಿಕ ಸ್ಥಿತಿ",
    workPost: "ಕೆಲಸ/ಹುದ್ದೆ",
    next: "ಮುಂದೆ",
    prev: "ಹಿಂದೆ",
    submit: "ಬಯೋಡೇಟಾ ತಯಾರಿಸಿ ✓",
    saving: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    customize: "⚙️ ಕ್ಷೇತ್ರಗಳನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ",
    rashi: "ರಾಶಿ",
    nakshatra: "ನಕ್ಷತ್ರ",
    gan: "ಗಣ",
    nadi: "ನಾಡಿ",
    charan: "ಚರಣ",
    planetaryPos: "ಗ್ರಹ ಸ್ಥಾನ",
    timeOfBirth: "ಹುಟ್ಟಿದ ಸಮಯ",
    manglikStatus: "ಮಾಂಗಲಿಕ",
    siblingsInfo: "ಒಡಹುಟ್ಟಿದವರ ಮಾಹಿತಿ",
    mamaInfo: "ಮಾವ",
    kakaInfo: "ಚಿಕ್ಕಪ್ಪ",
    atyaInfo: "ಅತ್ತೆ",
    pahuneInfo: "ಅಳಿಯ/ಸೊಸೆ",
    photoUploadInstruction: "ಬಯೋಡೇಟಾಕ್ಕಾಗಿ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. JPG, PNG ಸ್ವರೂಪ ಸ್ವೀಕಾರ್ಯ.",
    photoSelectBtn: "ಫೋಟೋ ಆಯ್ಕೆ ಮಾಡಿ",
    photoRemoveBtn: "ಫೋಟೋ ತೆಗೆದುಹಾಕಿ",
    photoLabel: "ಫೋಟೋ",
    photoUploadTitle: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    customizeToggle: "⚙️ ಕ್ಷೇತ್ರಗಳನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ",
    customizeHint: "ಬೇಕಾದ ಕ್ಷೇತ್ರಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    siblingEmptyHint: "ಒಡಹುಟ್ಟಿದವರ ಮಾಹಿತಿ ಸೇರಿಸಲು ಮೇಲಿನ ಗುಂಡಿ ಒತ್ತಿ",
    allTemplatesAvail: "ಕೇವಲ ₹೪೯ ರಲ್ಲಿ ಎಲ್ಲಾ ಟೆಂಪ್ಲೇಟ್‌ಗಳು ಲಭ್ಯ",
    templateSelected: "✓ ಆಯ್ಕೆಯಾಗಿದೆ",
    selectPlaceholder: "ಆಯ್ಕೆ ಮಾಡಿ",
    rashiPlaceholder: "ರಾಶಿ ಆಯ್ಕೆ ಮಾಡಿ",
    nakshatraPlaceholder: "ನಕ್ಷತ್ರ ಆಯ್ಕೆ ಮಾಡಿ",
    religionPlaceholder: "ಧರ್ಮ ಆಯ್ಕೆ ಮಾಡಿ",
    phoneNumber: "ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ",
    planetPlaceholder: "ಗ್ರಹ",
    sibling_bro: "ಅಣ್ಣ/ತಮ್ಮ",
    sibling_sis: "ಅಕ್ಕ/ತಂಗಿ",
    sibling_num: "ಕ್ರ.",
    placeOfBirth_placeholder: "ಉದಾ. ಬೆಂಗಳೂರು",
    height_placeholder: "ಉದಾ. ೫ ಅಡಿ",
    education_placeholder: "ಉದಾ. B.E. Computer",
    occupation_placeholder: "ಉದಾ. Software Engineer",
    income_placeholder: "ಉದಾ. ₹50,000",
    caste_placeholder: "ಉದಾ. ಬ್ರಾಹ್ಮಣ",
    gotra_placeholder: "ಉದಾ. ಕಶ್ಯಪ",
    fatherOcc_placeholder: "ಉದಾ. ಸರ್ಕಾರಿ ನೌಕರಿ",
    motherOcc_placeholder: "ಉದಾ. ಗೃಹಿಣಿ",
    mama_placeholder: "ಉದಾ. ರಾಮ ಪಾಟೀಲ, ಕೃಷಿ",
    kaka_placeholder: "ಉದಾ. ಸುರೇಶ ದೇಶಮುಖ, ವ್ಯಾಪಾರ",
    atya_placeholder: "ಉದಾ. ಸುನೀತಾ ಜೋಶಿ, ಗೃಹಿಣಿ",
    pahune_placeholder: "ಉದಾ. ವಿಜಯ ಕುಲಕರ್ಣಿ, ಡಾಕ್ಟರ್",
    nativePlaceholder: "ಉದಾ. ಧಾರವಾಡ",
    charan_placeholder: "ಉದಾ. ೩",
    address_placeholder: "ಉದಾ. ೧೨೩, ಮೋಹನ ನಗರ, ಬೆಂಗಳೂರು",
    denomination_placeholder: "ಉದಾ. Catholic, Protestant",
    panth_placeholder_muslim: "ಸುನ್ನಿ / ಶಿಯಾ",
    panth_placeholder_buddhist: "ಉದಾ. ನವಯಾನ, ಥೇರವಾದ",
    sibName_placeholder: "ಹೆಸರು",
    sibOcc_placeholder: "ವೃತ್ತಿ",
    planetaryPositions: "ಗ್ರಹ ಸ್ಥಾನ",
  },
  urdu: {
    fullName: "پورا نام",
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
    siblings: "بہن بھائی کی معلومات",
    familyType: "خاندان کی قسم",
    nativePlace: "آبائی شہر",
    mama: "ماموں",
    kaka: "چچا",
    atya: "پھوپھی",
    pahune: "داماد/بہو",
    phone: "فون نمبر",
    email: "ای میل",
    address: "پتہ",
    photo: "فوٹو اپلوڈ کریں",
    denomination: "فرقہ",
    panth: "فرقہ",
    selectReligion: "مذہب منتخب کریں",
    selectLanguage: "زبان منتخب کریں",
    selectFont: "فونٹ منتخب کریں",
    selectTemplate: "ٹیمپلیٹ منتخب کریں",
    addSibling: "بہن/بھائی شامل کریں",
    type: "قسم",
    name: "نام",
    maritalStatus: "ازدواجی حیثیت",
    workPost: "کام/عہدہ",
    next: "آگے",
    prev: "پیچھے",
    submit: "بایوڈیٹا بنائیں ✓",
    saving: "محفوظ ہو رہا ہے...",
    customize: "⚙️ فیلڈز کسٹمائز کریں",
    rashi: "برج",
    nakshatra: "ستارہ",
    gan: "گن",
    nadi: "نادی",
    charan: "چرن",
    planetaryPos: "گرہوں کی پوزیشن",
    timeOfBirth: "وقت پیدائش",
    manglikStatus: "مانگلک",
    siblingsInfo: "بہن بھائی کی معلومات",
    mamaInfo: "ماموں",
    kakaInfo: "چچا",
    atyaInfo: "پھوپھی",
    pahuneInfo: "داماد/بہو",
    photoUploadInstruction:
      "بایوڈیٹا کے لیے واضح فوٹو اپلوڈ کریں۔ JPG, PNG فارمیٹ قبول ہے۔",
    photoSelectBtn: "فوٹو منتخب کریں",
    photoRemoveBtn: "فوٹو ہٹائیں",
    photoLabel: "فوٹو",
    photoUploadTitle: "فوٹو اپلوڈ کریں",
    customizeToggle: "⚙️ فیلڈز کسٹمائز کریں",
    customizeHint: "مطلوبہ فیلڈز منتخب کریں",
    siblingEmptyHint:
      "بہن بھائی کی معلومات شامل کرنے کے لیے اوپر کا بٹن دبائیں",
    allTemplatesAvail: "صرف ₹۴۹ میں تمام ٹیمپلیٹس دستیاب",
    templateSelected: "✓ منتخب",
    selectPlaceholder: "منتخب کریں",
    rashiPlaceholder: "برج منتخب کریں",
    nakshatraPlaceholder: "ستارہ منتخب کریں",
    religionPlaceholder: "مذہب منتخب کریں",
    phoneNumber: "فون نمبر درج کریں",
    planetPlaceholder: "گرہ",
    sibling_bro: "بھائی",
    sibling_sis: "بہن",
    sibling_num: "نمبر",
    placeOfBirth_placeholder: "مثلاً پونے",
    height_placeholder: "مثلاً ۵ فٹ",
    education_placeholder: "مثلاً B.E. Computer",
    occupation_placeholder: "مثلاً Software Engineer",
    income_placeholder: "مثلاً ₹50,000",
    caste_placeholder: "مثلاً شیخ",
    gotra_placeholder: "مثلاً کشیپ",
    fatherOcc_placeholder: "مثلاً سرکاری ملازمت",
    motherOcc_placeholder: "مثلاً گھریلو خاتون",
    mama_placeholder: "مثلاً رام پاٹل، کاشتکاری",
    kaka_placeholder: "مثلاً سریش دیشمکھ، تجارت",
    atya_placeholder: "مثلاً سنیتا جوشی، گھریلو خاتون",
    pahune_placeholder: "مثلاً وجے کلکرنی، ڈاکٹر",
    nativePlaceholder: "مثلاً پونے",
    charan_placeholder: "مثلاً ۳",
    address_placeholder: "مثلاً ۱۲۳، موہن نگر، پونے",
    denomination_placeholder: "مثلاً سنی، شیعہ",
    panth_placeholder_muslim: "سنی / شیعہ",
    panth_placeholder_buddhist: "مثلاً نوایان، تھیراوادا",
    sibName_placeholder: "نام",
    sibOcc_placeholder: "پیشہ",
    planetaryPositions: "گرہوں کی پوزیشن",
  },
};

function getPlaceholderName(language: string, religion: string): string {
  const map: Record<string, Record<string, string>> = {
    marathi: {
      हिंदू: "राधा देशपांडे",
      जैन: "प्रिया जैन",
      बौद्ध: "प्रिया कांबळे",
      लिंगायत: "प्रिया पाटील",
      ख्रिश्चन: "मेरी फर्नांडिस",
      मुस्लीम: "आयेशा शेख",
    },
    hindi: {
      हिंदू: "राधा शर्मा",
      जैन: "प्रिया जैन",
      बौद्ध: "प्रिया कुमारी",
      लिंगायत: "प्रिया पाटिल",
      ख्रिश्चन: "मेरी फर्नांडीज",
      मुस्लीम: "आयशा खान",
    },
    english: {
      हिंदू: "Radha Kulkarni",
      जैन: "Priya Jain",
      बौद्ध: "Priya Kamble",
      लिंगायत: "Priya Patil",
      ख्रिश्चन: "Mary Fernandes",
      मुस्लीम: "Aisha Sheikh",
    },
    kannada: {
      हिंदू: "ರಾಧಾ ದೇಶಪಾಂಡೆ",
      जैन: "ಪ್ರಿಯಾ ಜೈನ್",
      बौद्ध: "ಪ್ರಿಯಾ ಕಾಂಬ್ಳೆ",
      लिंगायत: "ಪ್ರಿಯಾ ಪಾಟೀಲ್",
      ख्रिश्चन: "ಮೇರಿ ಫರ್ನಾಂಡಿಸ್",
      मुस्लीम: "ಆಯಿಶಾ ಶೇಖ್",
    },
    urdu: {
      हिंदू: "رادھا دیشپانڈے",
      जैन: "پریا جین",
      बौद्ध: "پریا کامبلے",
      लिंगायत: "پریا پاٹل",
      ख्रिश्चन: "مریم فرنانڈیس",
      मुस्लीम: "عائشہ شیخ",
    },
  };
  return (
    (map[language] || map.marathi)[religion] ||
    (map[language] || map.marathi).हिंदू
  );
}

function getPlaceholderFatherName(language: string, religion: string): string {
  const map: Record<string, Record<string, string>> = {
    marathi: {
      हिंदू: "सुरेश देशपांडे",
      जैन: "सुरेश जैन",
      बौद्ध: "सुरेश कांबळे",
      लिंगायत: "सुरेश पाटील",
      ख्रिश्चन: "थॉमस फर्नांडिस",
      मुस्लीम: "रहीम शेख",
    },
    hindi: {
      हिंदू: "सुरेश शर्मा",
      जैन: "सुरेश जैन",
      बौद्ध: "सुरेश कुमार",
      लिंगायत: "सुरेश पाटिल",
      ख्रिश्चन: "थॉमस फर्नांडीज",
      मुस्लीम: "रहीम खान",
    },
    english: {
      हिंदू: "Suresh Deshmukh",
      जैन: "Suresh Jain",
      बौद्ध: "Suresh Kamble",
      लिंगायत: "Suresh Patil",
      ख्रिश्चन: "Thomas Fernandes",
      मुस्लीम: "Rahim Sheikh",
    },
    kannada: {
      हिंदू: "ಸುರೇಶ ದೇಶಪಾಂಡೆ",
      जैन: "ಸುರೇಶ ಜೈನ್",
      बौद्ध: "ಸುರೇಶ ಕಾಂಬ್ಳೆ",
      लिंगायत: "ಸುರೇಶ ಪಾಟೀಲ್",
      ख्रिश्चन: "ಥಾಮಸ್ ಫರ್ನಾಂಡಿಸ್",
      मुस्लीम: "ರಹೀಮ್ ಶೇಖ್",
    },
    urdu: {
      हिंदू: "سریش دیشمکھ",
      जैन: "سریش جین",
      बौद्ध: "سریش کامبلے",
      लिंगायत: "سریش پاٹل",
      ख्रिश्चन: "تھامس فرنانڈیس",
      मुस्लीम: "رحیم شیخ",
    },
  };
  return (
    (map[language] || map.marathi)[religion] ||
    (map[language] || map.marathi).हिंदू
  );
}

function getPlaceholderMotherName(language: string, religion: string): string {
  const map: Record<string, Record<string, string>> = {
    marathi: {
      हिंदू: "सुमित्रा देशपांडे",
      जैन: "सुमित्रा जैन",
      बौद्ध: "सुमित्रा कांबळे",
      लिंगायत: "सुमित्रा पाटील",
      ख्रिश्चन: "मेरी फर्नांडिस",
      मुस्लीम: "रुखसाना शेख",
    },
    hindi: {
      हिंदू: "सुमित्रा शर्मा",
      जैन: "सुमित्रा जैन",
      बौद्ध: "सुमित्रा कुमारी",
      लिंगायत: "सुमित्रा पाटिल",
      ख्रिश्चन: "मेरी फर्नांडीज",
      मुस्लीम: "रुखसाना खान",
    },
    english: {
      हिंदू: "Sumitra Deshmukh",
      जैन: "Sumitra Jain",
      बौद्ध: "Sumitra Kamble",
      लिंगायत: "Sumitra Patil",
      ख्रिश्चन: "Mary Fernandes",
      मुस्लीम: "Rukhsana Sheikh",
    },
    kannada: {
      हिंदू: "ಸುಮಿತ್ರಾ ದೇಶಪಾಂಡೆ",
      जैन: "ಸುಮಿತ್ರಾ ಜೈನ್",
      बौद्ध: "ಸುಮಿತ್ರಾ ಕಾಂಬ್ಳೆ",
      लिंगायत: "ಸುಮಿತ್ರಾ ಪಾಟೀಲ್",
      ख्रिश्चन: "ಮೇರಿ ಫರ್ನಾಂಡಿಸ್",
      मुस्लीम: "ರುಕ್ಸಾನಾ ಶೇಖ್",
    },
    urdu: {
      हिंदू: "سمترا دیشمکھ",
      जैन: "سمترا جین",
      बौद्ध: "سمترا کامبلے",
      लिंगायत: "سمترا پاٹل",
      ख्रिश्चन: "مریم فرنانڈیس",
      मुस्लीम: "رخسانہ شیخ",
    },
  };
  return (
    (map[language] || map.marathi)[religion] ||
    (map[language] || map.marathi).हिंदू
  );
}

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
          {FORM_LABELS[language]?.customizeToggle ||
            FORM_LABELS.marathi.customizeToggle}
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
            {FORM_LABELS[language]?.customizeHint ||
              FORM_LABELS.marathi.customizeHint}
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
  const { setLanguage: setSiteLang } = useSiteLang();
  const selectedPlan = "basic";
  const [form, setForm] = useState<FormState>(() => ({
    ...defaultState,
    language: (localStorage.getItem("siteLang") as LanguageType) || "marathi",
  }));
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
                          <SelectValue
                            placeholder={FL_LABELS.religionPlaceholder}
                          />
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
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            ["marathi", "मराठी"],
                            ["hindi", "हिंदी"],
                            ["english", "English"],
                            ["kannada", "ಕನ್ನಡ"],
                            ["urdu", "اردو"],
                          ] as [LanguageType, string][]
                        ).map(([val, label]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, language: val }));
                              setSiteLang(val);
                            }}
                            data-ocid={`form.language.${val}.toggle`}
                            dir={val === "urdu" ? "rtl" : undefined}
                            className={`flex-1 min-w-[60px] py-2 rounded-lg border-2 text-sm font-semibold transition-all ${form.language === val ? "border-maroon bg-maroon text-amber-50" : "border-border text-foreground hover:border-maroon/50"}`}
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
                        {FL_LABELS.allTemplatesAvail}
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
                                    {FL_LABELS.templateSelected}
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
                              {FL_LABELS.photoLabel}
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
                          {FL_LABELS.photoUploadTitle}
                        </div>
                        <p className="font-devanagari text-xs text-muted-foreground leading-relaxed">
                          {FL_LABELS.photoUploadInstruction}
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
                            {FL_LABELS.photoRemoveBtn}
                          </button>
                        )}
                        {!form.photoPreview && (
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="inline-flex items-center gap-1.5 font-devanagari text-xs font-semibold text-maroon border border-maroon/30 rounded-lg px-3 py-1.5 hover:bg-maroon/5 transition-colors"
                          >
                            <Upload className="w-3 h-3" />{" "}
                            {FL_LABELS.photoSelectBtn}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.fullName} />
                        <Input
                          placeholder={getPlaceholderName(
                            form.language,
                            form.religion,
                          )}
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
                            placeholder={FL_LABELS.placeOfBirth_placeholder}
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
                          placeholder={FL_LABELS.placeOfBirth_placeholder}
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
                          placeholder={FL_LABELS.height_placeholder}
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
                              <SelectValue
                                placeholder={FL_LABELS.selectPlaceholder}
                              />
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
                          placeholder={FL_LABELS.education_placeholder}
                          value={form.personal.education}
                          onChange={(e) => upP("education", e.target.value)}
                          data-ocid="personal.education.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <FL label={FL_LABELS.occupation} />
                        <Input
                          placeholder={FL_LABELS.occupation_placeholder}
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
                          placeholder={FL_LABELS.income_placeholder}
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
                            placeholder={FL_LABELS.caste_placeholder}
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
                            placeholder={FL_LABELS.gotra_placeholder}
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
                          placeholder={FL_LABELS.denomination_placeholder}
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
                              ? FL_LABELS.panth_placeholder_muslim
                              : FL_LABELS.panth_placeholder_buddhist
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
                          placeholder={getPlaceholderFatherName(
                            form.language,
                            form.religion,
                          )}
                          value={form.family.fatherName}
                          onChange={(e) => upF("fatherName", e.target.value)}
                          data-ocid="family.father_name.input"
                        />
                      </div>
                      {!hiddenFields.has("fatherOccupation") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.fatherOccupation} />
                          <Input
                            placeholder={FL_LABELS.fatherOcc_placeholder}
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
                          placeholder={getPlaceholderMotherName(
                            form.language,
                            form.religion,
                          )}
                          value={form.family.motherName}
                          onChange={(e) => upF("motherName", e.target.value)}
                          data-ocid="family.mother_name.input"
                        />
                      </div>
                      {!hiddenFields.has("motherOccupation") && (
                        <div className="space-y-1.5">
                          <FL label={FL_LABELS.motherOccupation} />
                          <Input
                            placeholder={FL_LABELS.motherOcc_placeholder}
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
                            {FL_LABELS.siblingEmptyHint}
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
                                  {FL_LABELS.sibling_num} {idx + 1}
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
                                    {(["भाऊ", "बहीण"] as const).map(
                                      (val, i) => {
                                        const label =
                                          i === 0
                                            ? FL_LABELS.sibling_bro
                                            : FL_LABELS.sibling_sis;
                                        return (
                                          <button
                                            key={val}
                                            type="button"
                                            onClick={() =>
                                              updateSibling(sib.id, "type", val)
                                            }
                                            className={`flex-1 text-xs py-1 px-2 rounded border transition-colors ${sib.type === val ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-muted"}`}
                                          >
                                            {label}
                                          </button>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs text-muted-foreground">
                                    {FL_LABELS.name}
                                  </span>
                                  <Input
                                    placeholder={FL_LABELS.sibName_placeholder}
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
                                    placeholder={FL_LABELS.sibOcc_placeholder}
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
                            placeholder={FL_LABELS.mama_placeholder}
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
                            placeholder={FL_LABELS.kaka_placeholder}
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
                            placeholder={FL_LABELS.atya_placeholder}
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
                            placeholder={FL_LABELS.pahune_placeholder}
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
                            placeholder={FL_LABELS.nativePlaceholder}
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
                            <SelectValue
                              placeholder={FL_LABELS.rashiPlaceholder}
                            />
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
                            <SelectValue
                              placeholder={FL_LABELS.nakshatraPlaceholder}
                            />
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
                            <SelectValue
                              placeholder={FL_LABELS.selectPlaceholder}
                            />
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
                            <SelectValue
                              placeholder={FL_LABELS.selectPlaceholder}
                            />
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
                          placeholder={FL_LABELS.charan_placeholder}
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
                                placeholder={FL_LABELS.planetPlaceholder}
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
                        placeholder={FL_LABELS.phoneNumber}
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
                          placeholder={FL_LABELS.address_placeholder}
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
