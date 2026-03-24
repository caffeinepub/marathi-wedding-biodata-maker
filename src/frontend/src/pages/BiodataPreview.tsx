import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Download, Printer } from "lucide-react";
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
  template: "traditional",
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

function InfoRow({
  label,
  value,
}: { label: string; value: string | boolean | undefined | null }) {
  const display =
    value === undefined || value === null || value === ""
      ? null
      : typeof value === "boolean"
        ? value
          ? "होय"
          : "नाही"
        : value;
  if (display === null) return null;
  return (
    <div className="flex gap-2 text-sm mb-1.5">
      <span className="font-devanagari text-gray-500 min-w-[130px] shrink-0">
        {label}:
      </span>
      <span className="font-devanagari font-semibold text-gray-900">
        {display}
      </span>
    </div>
  );
}

function PhotoBox({
  src,
  size,
  shape,
}: { src: string | null; size: string; shape: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt="Profile"
        className={`${size} ${shape} object-cover`}
      />
    );
  }
  return (
    <div
      className={`${size} ${shape} bg-gray-100 border-2 border-gray-300 flex items-center justify-center text-4xl`}
    >
      👤
    </div>
  );
}

// ─── TEMPLATE 1: Traditional (पारंपारिक) ────────────────────────────────────
function TemplateTraditional({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  return (
    <div className="border-4 border-double border-amber-800 bg-amber-50 font-devanagari">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 p-5 text-center">
        <p className="font-serif-devanagari text-amber-200 text-xs tracking-widest mb-1">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <h1 className="font-serif-devanagari font-bold text-2xl text-amber-100">
          ✦ विवाह बायोडाटा ✦
        </h1>
        <p className="text-amber-300 text-xs mt-1">Vivah Biodata</p>
      </div>
      {/* Name + Photo */}
      <div className="flex items-center gap-5 px-6 pt-5 pb-3 border-b-2 border-amber-700">
        <div className="flex-1">
          <h2 className="font-serif-devanagari font-bold text-2xl text-red-900">
            {data.personal.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {!hidden.has("manglikStatus") && (
              <>
                मांगलिक: <b>
                  {data.personal.manglikStatus ? "होय" : "नाही"}
                </b>{" "}
              </>
            )}
            {!hidden.has("religion") && (
              <>
                धर्म: <b>{data.personal.religion}</b>{" "}
              </>
            )}
            {!hidden.has("caste") && (
              <>
                जात: <b>{data.personal.caste}</b>
              </>
            )}
          </p>
        </div>
        <PhotoBox
          src={data.photoPreview}
          size="w-24 h-28"
          shape="rounded-xl border-4 border-amber-700 shadow"
        />
      </div>
      {/* Two-column body */}
      <div className="grid md:grid-cols-2 gap-0 divide-x divide-amber-300">
        <div className="p-5">
          <p className="font-serif-devanagari font-bold text-red-900 border-b border-amber-700 pb-1 mb-3">
            ✦ वैयक्तिक माहिती
          </p>
          <InfoRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
          {!hidden.has("timeOfBirth") && (
            <InfoRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
          )}
          <InfoRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
          <InfoRow label="उंची" value={data.personal.height} />
          {!hidden.has("complexion") && (
            <InfoRow label="रंग" value={data.personal.complexion} />
          )}
          <InfoRow label="शिक्षण" value={data.personal.education} />
          <InfoRow label="व्यवसाय" value={data.personal.occupation} />
          {!hidden.has("income") && (
            <InfoRow label="मासिक उत्पन्न" value={data.personal.income} />
          )}
          {!hidden.has("gotra") && (
            <InfoRow label="गोत्र" value={data.personal.gotra} />
          )}
        </div>
        <div className="p-5">
          <p className="font-serif-devanagari font-bold text-red-900 border-b border-amber-700 pb-1 mb-3">
            ✦ कौटुंबिक माहिती
          </p>
          <InfoRow label="वडिलांचे नाव" value={data.family.fatherName} />
          {!hidden.has("fatherOccupation") && (
            <InfoRow
              label="वडिलांचा व्यवसाय"
              value={data.family.fatherOccupation}
            />
          )}
          <InfoRow label="आईचे नाव" value={data.family.motherName} />
          {!hidden.has("motherOccupation") && (
            <InfoRow label="आईचा व्यवसाय" value={data.family.motherOccupation} />
          )}
          {!hidden.has("siblingsInfo") && sibs
            ? sibs.map((s, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                <InfoRow
                  key={s.name || i}
                  label={i === 0 ? "भाऊ-बहीण" : ""}
                  value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                />
              ))
            : !hidden.has("siblingsInfo") && (
                <InfoRow label="भाऊ-बहीण" value={data.family.siblingsInfo} />
              )}
          {!hidden.has("familyType") && (
            <InfoRow label="कुटुंब प्रकार" value={data.family.familyType} />
          )}
          {!hidden.has("nativePlace") && (
            <InfoRow label="मूळ गाव" value={data.family.nativePlace} />
          )}
        </div>
      </div>
      {/* Horoscope */}
      <div className="px-5 pb-2 pt-1">
        <p className="font-serif-devanagari font-bold text-red-900 border-b border-amber-700 pb-1 mb-3">
          ✦ कुंडली / जन्मपत्रिका
        </p>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {(["राशी", "नक्षत्र", "गण", "नाडी", "चरण"] as const).map((lbl, i) => {
            const keys = [null, null, "gan", "nadi", "charan"];
            const vals = [
              data.horoscope.rashi,
              data.horoscope.nakshatra,
              data.horoscope.gan,
              data.horoscope.nadi,
              data.horoscope.charan,
            ];
            if (keys[i] && hidden.has(keys[i] as string)) return null;
            return (
              <div
                key={lbl}
                className="text-center bg-white border border-amber-400 rounded p-1.5"
              >
                <div className="text-[10px] text-gray-500">{lbl}</div>
                <div className="font-bold text-sm text-red-900">
                  {vals[i] || "—"}
                </div>
              </div>
            );
          })}
        </div>
        {!hidden.has("planetaryPositions") && (
          <div className="grid grid-cols-4 gap-1.5">
            {HOUSES_MR.map((house, i) => (
              <div
                key={house}
                className="rounded border border-amber-400 bg-white/70 p-1.5"
              >
                <div className="text-[9px] text-gray-500">
                  {i + 1}. {house}
                </div>
                <div className="text-xs font-semibold text-red-900">
                  {data.horoscope.planetaryPositions[i] || "—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Contact */}
      <div className="px-5 pb-4 pt-2">
        <p className="font-serif-devanagari font-bold text-red-900 border-b border-amber-700 pb-1 mb-3">
          ✦ संपर्क माहिती
        </p>
        {data.contact.phone && (
          <InfoRow label="फोन" value={data.contact.phone} />
        )}
        {!hidden.has("email") && data.contact.email && (
          <InfoRow label="ईमेल" value={data.contact.email} />
        )}
        {!hidden.has("address") && (
          <InfoRow label="पत्ता" value={data.contact.address} />
        )}
      </div>
      <div className="text-center py-3 bg-gradient-to-r from-amber-100 to-amber-200 border-t-2 border-amber-700">
        <span className="font-serif-devanagari text-sm text-red-900 font-semibold">
          ✦ लग्नसेतू — LagnaSetu ✦
        </span>
      </div>
    </div>
  );
}

// ─── TEMPLATE 2: Modern (आधुनिक) ─────────────────────────────────────────────
function TemplateModern({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  return (
    <div className="border-2 border-amber-400 bg-white">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-5 flex items-center gap-5">
        <PhotoBox
          src={data.photoPreview}
          size="w-20 h-24"
          shape="rounded-lg border-2 border-amber-400"
        />
        <div className="flex-1">
          <h1 className="font-serif-devanagari font-bold text-2xl text-white">
            {data.personal.name}
          </h1>
          <p className="text-amber-300 text-xs uppercase tracking-widest mt-1">
            Vivah Biodata — LagnaSetu
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {!hidden.has("manglikStatus") && (
              <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded px-2 py-0.5">
                मांगलिक: {data.personal.manglikStatus ? "होय" : "नाही"}
              </span>
            )}
            {!hidden.has("religion") && (
              <span className="text-xs bg-slate-700 text-slate-300 rounded px-2 py-0.5">
                {data.personal.religion}
              </span>
            )}
            {!hidden.has("caste") && (
              <span className="text-xs bg-slate-700 text-slate-300 rounded px-2 py-0.5">
                {data.personal.caste}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
      {/* Body */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">
            Personal Information
          </p>
          <InfoRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
          {!hidden.has("timeOfBirth") && (
            <InfoRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
          )}
          <InfoRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
          <InfoRow label="उंची" value={data.personal.height} />
          {!hidden.has("complexion") && (
            <InfoRow label="रंग" value={data.personal.complexion} />
          )}
          <InfoRow label="शिक्षण" value={data.personal.education} />
          <InfoRow label="व्यवसाय" value={data.personal.occupation} />
          {!hidden.has("income") && (
            <InfoRow label="मासिक उत्पन्न" value={data.personal.income} />
          )}
          {!hidden.has("gotra") && (
            <InfoRow label="गोत्र" value={data.personal.gotra} />
          )}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">
            Family
          </p>
          <InfoRow label="वडिलांचे नाव" value={data.family.fatherName} />
          {!hidden.has("fatherOccupation") && (
            <InfoRow
              label="वडिलांचा व्यवसाय"
              value={data.family.fatherOccupation}
            />
          )}
          <InfoRow label="आईचे नाव" value={data.family.motherName} />
          {!hidden.has("motherOccupation") && (
            <InfoRow label="आईचा व्यवसाय" value={data.family.motherOccupation} />
          )}
          {!hidden.has("siblingsInfo") && sibs
            ? sibs.map((s, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                <InfoRow
                  key={s.name || i}
                  label={i === 0 ? "भाऊ-बहीण" : ""}
                  value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                />
              ))
            : !hidden.has("siblingsInfo") && (
                <InfoRow label="भाऊ-बहीण" value={data.family.siblingsInfo} />
              )}
          {!hidden.has("familyType") && (
            <InfoRow label="कुटुंब प्रकार" value={data.family.familyType} />
          )}
          {!hidden.has("nativePlace") && (
            <InfoRow label="मूळ गाव" value={data.family.nativePlace} />
          )}
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4 mb-3 border-b border-slate-200 pb-1">
            Horoscope
          </p>
          <div className="flex gap-2 flex-wrap">
            {(["राशी", "नक्षत्र", "गण", "नाडी", "चरण"] as const).map((lbl, i) => {
              const keys = [null, null, "gan", "nadi", "charan"];
              const vals = [
                data.horoscope.rashi,
                data.horoscope.nakshatra,
                data.horoscope.gan,
                data.horoscope.nadi,
                data.horoscope.charan,
              ];
              if (keys[i] && hidden.has(keys[i] as string)) return null;
              return (
                <span
                  key={lbl}
                  className="text-xs bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1 text-slate-700"
                >
                  {lbl}: <b>{vals[i] || "—"}</b>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/* Contact */}
      {(data.contact.phone ||
        (!hidden.has("email") && data.contact.email) ||
        !hidden.has("address")) && (
        <div className="px-6 pb-5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">
            Contact
          </p>
          {data.contact.phone && (
            <InfoRow label="फोन" value={data.contact.phone} />
          )}
          {!hidden.has("email") && data.contact.email && (
            <InfoRow label="ईमेल" value={data.contact.email} />
          )}
          {!hidden.has("address") && (
            <InfoRow label="पत्ता" value={data.contact.address} />
          )}
        </div>
      )}
      <div className="text-center py-2.5 bg-slate-800">
        <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold">
          ✦ LAGNASETU.IN ✦
        </span>
      </div>
    </div>
  );
}

// ─── TEMPLATE 3: Royal (राजेशाही) ────────────────────────────────────────────
function TemplateRoyal({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  return (
    <div className="border-4 border-yellow-700 bg-yellow-50 font-devanagari">
      <div
        style={{
          background: "linear-gradient(135deg, #78350f, #92400e, #78350f)",
        }}
        className="px-6 py-5 text-center"
      >
        <p className="text-yellow-300 text-xs tracking-widest mb-1">
          ॥ शुभ विवाह ॥
        </p>
        <h1 className="font-serif-devanagari font-bold text-3xl text-yellow-100">
          ✦ विवाह बायोडाटा ✦
        </h1>
      </div>
      {/* Centered photo + name */}
      <div className="flex flex-col items-center py-5 border-b-2 border-yellow-600">
        <PhotoBox
          src={data.photoPreview}
          size="w-28 h-32"
          shape="rounded-2xl border-4 border-yellow-600 shadow-lg"
        />
        <h2 className="font-serif-devanagari font-bold text-2xl text-yellow-900 mt-3">
          {data.personal.name}
        </h2>
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          {!hidden.has("religion") && (
            <span className="text-xs bg-yellow-200 text-yellow-900 border border-yellow-500 rounded-full px-3 py-0.5">
              {data.personal.religion}
            </span>
          )}
          {!hidden.has("caste") && (
            <span className="text-xs bg-yellow-200 text-yellow-900 border border-yellow-500 rounded-full px-3 py-0.5">
              {data.personal.caste}
            </span>
          )}
          {!hidden.has("manglikStatus") && (
            <span className="text-xs bg-yellow-200 text-yellow-900 border border-yellow-500 rounded-full px-3 py-0.5">
              मांगलिक: {data.personal.manglikStatus ? "होय" : "नाही"}
            </span>
          )}
        </div>
      </div>
      {/* Data cards */}
      <div className="grid md:grid-cols-2 gap-4 p-5">
        <div className="bg-white border border-yellow-400 rounded-xl p-4 shadow-sm">
          <p className="font-serif-devanagari font-bold text-yellow-900 text-base mb-3 pb-1 border-b border-yellow-300">
            वैयक्तिक माहिती
          </p>
          <InfoRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
          {!hidden.has("timeOfBirth") && (
            <InfoRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
          )}
          <InfoRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
          <InfoRow label="उंची" value={data.personal.height} />
          {!hidden.has("complexion") && (
            <InfoRow label="रंग" value={data.personal.complexion} />
          )}
          <InfoRow label="शिक्षण" value={data.personal.education} />
          <InfoRow label="व्यवसाय" value={data.personal.occupation} />
          {!hidden.has("income") && (
            <InfoRow label="मासिक उत्पन्न" value={data.personal.income} />
          )}
          {!hidden.has("gotra") && (
            <InfoRow label="गोत्र" value={data.personal.gotra} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-yellow-400 rounded-xl p-4 shadow-sm">
            <p className="font-serif-devanagari font-bold text-yellow-900 text-base mb-3 pb-1 border-b border-yellow-300">
              कौटुंबिक माहिती
            </p>
            <InfoRow label="वडिलांचे नाव" value={data.family.fatherName} />
            {!hidden.has("fatherOccupation") && (
              <InfoRow
                label="वडिलांचा व्यवसाय"
                value={data.family.fatherOccupation}
              />
            )}
            <InfoRow label="आईचे नाव" value={data.family.motherName} />
            {!hidden.has("motherOccupation") && (
              <InfoRow
                label="आईचा व्यवसाय"
                value={data.family.motherOccupation}
              />
            )}
            {!hidden.has("siblingsInfo") && sibs
              ? sibs.map((s, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                  <InfoRow
                    key={s.name || i}
                    label={i === 0 ? "भाऊ-बहीण" : ""}
                    value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                  />
                ))
              : !hidden.has("siblingsInfo") && (
                  <InfoRow label="भाऊ-बहीण" value={data.family.siblingsInfo} />
                )}
            {!hidden.has("familyType") && (
              <InfoRow label="कुटुंब प्रकार" value={data.family.familyType} />
            )}
            {!hidden.has("nativePlace") && (
              <InfoRow label="मूळ गाव" value={data.family.nativePlace} />
            )}
          </div>
          <div className="bg-yellow-100 border-2 border-yellow-500 rounded-xl p-4 shadow-sm">
            <p className="font-serif-devanagari font-bold text-yellow-900 text-base mb-3 pb-1 border-b border-yellow-400">
              कुंडली माहिती
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {(["राशी", "नक्षत्र", "गण", "नाडी", "चरण"] as const).map(
                (lbl, i) => {
                  const keys = [null, null, "gan", "nadi", "charan"];
                  const vals = [
                    data.horoscope.rashi,
                    data.horoscope.nakshatra,
                    data.horoscope.gan,
                    data.horoscope.nadi,
                    data.horoscope.charan,
                  ];
                  if (keys[i] && hidden.has(keys[i] as string)) return null;
                  return (
                    <div
                      key={lbl}
                      className="bg-white rounded-lg p-1.5 border border-yellow-300 text-center"
                    >
                      <div className="text-[10px] text-gray-500">{lbl}</div>
                      <div className="font-bold text-sm text-yellow-900">
                        {vals[i] || "—"}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Contact */}
      {(data.contact.phone ||
        (!hidden.has("email") && data.contact.email) ||
        !hidden.has("address")) && (
        <div className="mx-5 mb-4 bg-white border border-yellow-400 rounded-xl p-4 shadow-sm">
          <p className="font-serif-devanagari font-bold text-yellow-900 text-base mb-3 pb-1 border-b border-yellow-300">
            संपर्क माहिती
          </p>
          {data.contact.phone && (
            <InfoRow label="फोन" value={data.contact.phone} />
          )}
          {!hidden.has("email") && data.contact.email && (
            <InfoRow label="ईमेल" value={data.contact.email} />
          )}
          {!hidden.has("address") && (
            <InfoRow label="पत्ता" value={data.contact.address} />
          )}
        </div>
      )}
      <div className="text-center py-3 border-t-2 border-yellow-600">
        <span className="font-serif-devanagari text-sm text-yellow-900 font-semibold">
          ✦ लग्नसेतू — LagnaSetu ✦
        </span>
      </div>
    </div>
  );
}

// ─── TEMPLATE 4: Floral (पुष्पलता) ───────────────────────────────────────────
function TemplateFloral({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  return (
    <div className="border-2 border-pink-400 bg-pink-50 font-devanagari">
      <div className="bg-gradient-to-r from-rose-700 to-pink-600 px-6 py-4 text-center">
        <p className="text-pink-200 text-xs tracking-widest">
          🌸 विवाह बायोडाटा 🌸
        </p>
        <p className="text-white text-xs mt-0.5">Vivah Biodata</p>
      </div>
      {/* Photo + Personal side by side */}
      <div className="flex items-start gap-5 p-5 border-b border-pink-300">
        <div className="shrink-0 flex flex-col items-center gap-2">
          <PhotoBox
            src={data.photoPreview}
            size="w-28 h-32"
            shape="rounded-full border-4 border-pink-400 shadow-lg"
          />
          {!hidden.has("manglikStatus") && (
            <span className="text-[10px] bg-pink-200 text-pink-900 border border-pink-400 rounded-full px-2.5 py-0.5 font-semibold">
              मांगलिक: {data.personal.manglikStatus ? "होय" : "नाही"}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-serif-devanagari font-bold text-2xl text-rose-800 mb-1">
            {data.personal.name}
          </h2>
          <div className="flex gap-2 mb-3 flex-wrap">
            {!hidden.has("religion") && (
              <span className="text-xs bg-rose-100 text-rose-800 border border-rose-300 rounded-full px-2 py-0.5">
                {data.personal.religion}
              </span>
            )}
            {!hidden.has("caste") && (
              <span className="text-xs bg-rose-100 text-rose-800 border border-rose-300 rounded-full px-2 py-0.5">
                {data.personal.caste}
              </span>
            )}
          </div>
          <InfoRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
          {!hidden.has("timeOfBirth") && (
            <InfoRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
          )}
          <InfoRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
          <InfoRow label="उंची" value={data.personal.height} />
          {!hidden.has("complexion") && (
            <InfoRow label="रंग" value={data.personal.complexion} />
          )}
          <InfoRow label="शिक्षण" value={data.personal.education} />
          <InfoRow label="व्यवसाय" value={data.personal.occupation} />
          {!hidden.has("income") && (
            <InfoRow label="मासिक उत्पन्न" value={data.personal.income} />
          )}
          {!hidden.has("gotra") && (
            <InfoRow label="गोत्र" value={data.personal.gotra} />
          )}
        </div>
      </div>
      {/* Family + Horoscope cards */}
      <div className="grid md:grid-cols-2 gap-4 p-5">
        <div className="bg-white border border-pink-300 rounded-2xl p-4 shadow-sm">
          <p className="font-serif-devanagari font-bold text-rose-800 mb-3 pb-1 border-b border-pink-300">
            🌺 कौटुंबिक माहिती
          </p>
          <InfoRow label="वडिलांचे नाव" value={data.family.fatherName} />
          {!hidden.has("fatherOccupation") && (
            <InfoRow
              label="वडिलांचा व्यवसाय"
              value={data.family.fatherOccupation}
            />
          )}
          <InfoRow label="आईचे नाव" value={data.family.motherName} />
          {!hidden.has("motherOccupation") && (
            <InfoRow label="आईचा व्यवसाय" value={data.family.motherOccupation} />
          )}
          {!hidden.has("siblingsInfo") && sibs
            ? sibs.map((s, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                <InfoRow
                  key={s.name || i}
                  label={i === 0 ? "भाऊ-बहीण" : ""}
                  value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                />
              ))
            : !hidden.has("siblingsInfo") && (
                <InfoRow label="भाऊ-बहीण" value={data.family.siblingsInfo} />
              )}
          {!hidden.has("familyType") && (
            <InfoRow label="कुटुंब प्रकार" value={data.family.familyType} />
          )}
          {!hidden.has("nativePlace") && (
            <InfoRow label="मूळ गाव" value={data.family.nativePlace} />
          )}
        </div>
        <div className="bg-white border border-pink-300 rounded-2xl p-4 shadow-sm">
          <p className="font-serif-devanagari font-bold text-rose-800 mb-3 pb-1 border-b border-pink-300">
            🌸 कुंडली माहिती
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(["राशी", "नक्षत्र", "गण", "नाडी", "चरण"] as const).map((lbl, i) => {
              const keys = [null, null, "gan", "nadi", "charan"];
              const vals = [
                data.horoscope.rashi,
                data.horoscope.nakshatra,
                data.horoscope.gan,
                data.horoscope.nadi,
                data.horoscope.charan,
              ];
              if (keys[i] && hidden.has(keys[i] as string)) return null;
              return (
                <div
                  key={lbl}
                  className="text-center bg-pink-50 rounded-lg p-2 border border-pink-200"
                >
                  <div className="text-[10px] text-gray-500">{lbl}</div>
                  <div className="font-bold text-sm text-rose-800">
                    {vals[i] || "—"}
                  </div>
                </div>
              );
            })}
          </div>
          {(data.contact.phone ||
            (!hidden.has("email") && data.contact.email) ||
            !hidden.has("address")) && (
            <div className="mt-3 pt-3 border-t border-pink-200">
              <p className="font-serif-devanagari font-bold text-rose-800 mb-2 text-sm">
                🌺 संपर्क
              </p>
              {data.contact.phone && (
                <InfoRow label="फोन" value={data.contact.phone} />
              )}
              {!hidden.has("email") && data.contact.email && (
                <InfoRow label="ईमेल" value={data.contact.email} />
              )}
              {!hidden.has("address") && (
                <InfoRow label="पत्ता" value={data.contact.address} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="text-center py-3 bg-gradient-to-r from-rose-100 to-pink-100 border-t border-pink-300">
        <span className="font-serif-devanagari text-sm text-rose-800 font-semibold">
          🌸 लग्नसेतू — LagnaSetu 🌸
        </span>
      </div>
    </div>
  );
}

// ─── TEMPLATE 5: Elegant (श्रेष्ठ) — PREMIUM ────────────────────────────────
// Two-column: narrow left sidebar (photo + key stats) | wider right content
// Palette: ivory background, muted gold accents, clean serif headings
function TemplateElegant({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  const gold = "#8B6914";
  const goldLight = "#f5e9c8";

  const SectionHeading = ({ title }: { title: string }) => (
    <div className="mb-3">
      <p
        className="text-[11px] font-bold uppercase tracking-[0.15em]"
        style={{ color: gold }}
      >
        {title}
      </p>
      <div
        style={{ height: 1, background: gold, opacity: 0.35, marginTop: 4 }}
      />
    </div>
  );

  const ElegantRow = ({
    label,
    value,
  }: { label: string; value: string | boolean | undefined | null }) => {
    const display =
      value === undefined || value === null || value === ""
        ? null
        : typeof value === "boolean"
          ? value
            ? "होय"
            : "नाही"
          : value;
    if (display === null) return null;
    return (
      <div
        className="flex gap-2 text-sm mb-2 pl-3"
        style={{ borderLeft: `2px solid ${goldLight}` }}
      >
        <span className="text-gray-500 shrink-0" style={{ minWidth: 120 }}>
          {label}
        </span>
        <span className="font-semibold text-gray-800">{display}</span>
      </div>
    );
  };

  return (
    <div
      style={{
        background: "#fdfaf4",
        border: `1px solid ${goldLight}`,
        fontFamily: "inherit",
      }}
    >
      {/* Top gold rule */}
      <div style={{ height: 3, background: gold }} />

      {/* Header */}
      <div
        className="px-8 py-5 text-center"
        style={{ borderBottom: `1px solid ${goldLight}` }}
      >
        <p
          className="text-xs tracking-[0.2em] uppercase mb-1"
          style={{ color: gold }}
        >
          विवाह बायोडाटा
        </p>
        <h1 className="font-serif-devanagari font-bold text-2xl text-gray-900">
          {data.personal.name}
        </h1>
        <div
          className="mx-auto mt-2"
          style={{ width: 48, height: 1, background: gold }}
        />
      </div>

      {/* Body: sidebar + main */}
      <div className="flex">
        {/* Left sidebar */}
        <div
          className="w-40 shrink-0 flex flex-col items-center gap-4 py-6 px-4"
          style={{ background: goldLight, borderRight: "1px solid #e8d9a8" }}
        >
          <PhotoBox
            src={data.photoPreview}
            size="w-24 h-28"
            shape="rounded object-cover"
          />
          <div className="w-full flex flex-col gap-2">
            {[
              ["राशी", data.horoscope.rashi],
              ["नक्षत्र", data.horoscope.nakshatra],
              ...(!hidden.has("gan") ? [["गण", data.horoscope.gan]] : []),
              ...(!hidden.has("nadi") ? [["नाडी", data.horoscope.nadi]] : []),
            ].map(([lbl, val]) =>
              val ? (
                <div key={lbl} className="w-full">
                  <div className="text-[9px] uppercase tracking-wider text-gray-500">
                    {lbl}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: gold }}
                  >
                    {val}
                  </div>
                </div>
              ) : null,
            )}
            {!hidden.has("manglikStatus") && (
              <div className="w-full">
                <div className="text-[9px] uppercase tracking-wider text-gray-500">
                  मांगलिक
                </div>
                <div className="text-sm font-semibold" style={{ color: gold }}>
                  {data.personal.manglikStatus ? "होय" : "नाही"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 p-6 grid md:grid-cols-2 gap-6">
          {/* Personal */}
          <div>
            <SectionHeading title="वैयक्तिक माहिती" />
            <ElegantRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
            {!hidden.has("timeOfBirth") && (
              <ElegantRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
            )}
            <ElegantRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
            <ElegantRow label="उंची" value={data.personal.height} />
            {!hidden.has("complexion") && (
              <ElegantRow label="रंग" value={data.personal.complexion} />
            )}
            <ElegantRow label="शिक्षण" value={data.personal.education} />
            <ElegantRow label="व्यवसाय" value={data.personal.occupation} />
            {!hidden.has("income") && (
              <ElegantRow label="मासिक उत्पन्न" value={data.personal.income} />
            )}
            {!hidden.has("religion") && (
              <ElegantRow label="धर्म" value={data.personal.religion} />
            )}
            {!hidden.has("caste") && (
              <ElegantRow label="जात" value={data.personal.caste} />
            )}
            {!hidden.has("gotra") && (
              <ElegantRow label="गोत्र" value={data.personal.gotra} />
            )}
          </div>

          {/* Family + Contact */}
          <div>
            <SectionHeading title="कौटुंबिक माहिती" />
            <ElegantRow label="वडिलांचे नाव" value={data.family.fatherName} />
            {!hidden.has("fatherOccupation") && (
              <ElegantRow
                label="वडिलांचा व्यवसाय"
                value={data.family.fatherOccupation}
              />
            )}
            <ElegantRow label="आईचे नाव" value={data.family.motherName} />
            {!hidden.has("motherOccupation") && (
              <ElegantRow
                label="आईचा व्यवसाय"
                value={data.family.motherOccupation}
              />
            )}
            {!hidden.has("siblingsInfo") &&
              (sibs
                ? sibs.map((s, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                    <ElegantRow
                      key={s.name || i}
                      label={i === 0 ? "भाऊ-बहीण" : ""}
                      value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                    />
                  ))
                : data.family.siblingsInfo && (
                    <ElegantRow
                      label="भाऊ-बहीण"
                      value={data.family.siblingsInfo}
                    />
                  ))}
            {!hidden.has("familyType") && (
              <ElegantRow label="कुटुंब प्रकार" value={data.family.familyType} />
            )}
            {!hidden.has("nativePlace") && (
              <ElegantRow label="मूळ गाव" value={data.family.nativePlace} />
            )}

            {(data.contact.phone ||
              (!hidden.has("email") && data.contact.email) ||
              !hidden.has("address")) && (
              <>
                <div className="mt-4">
                  <SectionHeading title="संपर्क माहिती" />
                </div>
                {data.contact.phone && (
                  <ElegantRow label="फोन" value={data.contact.phone} />
                )}
                {!hidden.has("email") && data.contact.email && (
                  <ElegantRow label="ईमेल" value={data.contact.email} />
                )}
                {!hidden.has("address") && (
                  <ElegantRow label="पत्ता" value={data.contact.address} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer rule */}
      <div style={{ height: 3, background: gold }} />
    </div>
  );
}

// ─── TEMPLATE 6: Divine (दैवी) — PREMIUM ─────────────────────────────────────
// Single layout: large name header, then two-column info below
// Palette: white bg, deep indigo (#4C3B8A) accents, ALL-CAPS section labels
function TemplateDivine({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  const indigo = "#4C3B8A";
  const indigoLight = "#ede9ff";

  const DivineLabel = ({ title }: { title: string }) => (
    <div className="mb-3">
      <p
        className="text-[10px] font-bold tracking-[0.18em] uppercase"
        style={{ color: indigo }}
      >
        {title}
      </p>
      <div style={{ height: 2, width: 32, background: indigo, marginTop: 3 }} />
    </div>
  );

  const DivineRow = ({
    label,
    value,
  }: { label: string; value: string | boolean | undefined | null }) => {
    const display =
      value === undefined || value === null || value === ""
        ? null
        : typeof value === "boolean"
          ? value
            ? "होय"
            : "नाही"
          : value;
    if (display === null) return null;
    return (
      <div className="flex gap-2 text-sm mb-2">
        <span
          className="shrink-0 font-medium"
          style={{ color: indigo, minWidth: 130 }}
        >
          {label}
        </span>
        <span className="text-gray-800">{display}</span>
      </div>
    );
  };

  return (
    <div style={{ background: "#ffffff", fontFamily: "inherit" }}>
      {/* Header bar */}
      <div className="px-8 py-6" style={{ background: indigo }}>
        <p
          className="text-xs tracking-[0.2em] uppercase mb-1"
          style={{ color: "#c4b8ff" }}
        >
          विवाह बायोडाटा
        </p>
        <h1 className="font-serif-devanagari font-bold text-3xl text-white">
          {data.personal.name}
        </h1>
        <div className="flex gap-4 mt-3 flex-wrap">
          {!hidden.has("religion") && data.personal.religion && (
            <span className="text-sm" style={{ color: "#c4b8ff" }}>
              {data.personal.religion}
            </span>
          )}
          {!hidden.has("caste") && data.personal.caste && (
            <span className="text-sm" style={{ color: "#c4b8ff" }}>
              {data.personal.caste}
            </span>
          )}
          {data.personal.education && (
            <span className="text-sm" style={{ color: "#c4b8ff" }}>
              {data.personal.education}
            </span>
          )}
        </div>
      </div>

      {/* Photo + key info strip */}
      <div
        className="flex items-center gap-6 px-8 py-4"
        style={{ background: indigoLight, borderBottom: "1px solid #d4caff" }}
      >
        <PhotoBox
          src={data.photoPreview}
          size="w-20 h-24"
          shape="rounded object-cover"
        />
        <div className="flex gap-8 flex-wrap">
          {[
            ["राशी", data.horoscope.rashi],
            ["नक्षत्र", data.horoscope.nakshatra],
            ...(!hidden.has("gan") ? [["गण", data.horoscope.gan]] : []),
            ...(!hidden.has("nadi") ? [["नाडी", data.horoscope.nadi]] : []),
            ...(!hidden.has("manglikStatus")
              ? [["मांगलिक", data.personal.manglikStatus ? "होय" : "नाही"]]
              : []),
          ].map(([lbl, val]) =>
            val ? (
              <div key={lbl}>
                <div
                  className="text-[9px] uppercase tracking-wider"
                  style={{ color: indigo }}
                >
                  {lbl}
                </div>
                <div className="font-bold text-gray-900 text-sm">{val}</div>
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Two-column content */}
      <div className="grid md:grid-cols-2 gap-8 p-8">
        <div>
          <DivineLabel title="वैयक्तिक माहिती" />
          <DivineRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
          {!hidden.has("timeOfBirth") && (
            <DivineRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
          )}
          <DivineRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
          <DivineRow label="उंची" value={data.personal.height} />
          {!hidden.has("complexion") && (
            <DivineRow label="रंग" value={data.personal.complexion} />
          )}
          <DivineRow label="व्यवसाय" value={data.personal.occupation} />
          {!hidden.has("income") && (
            <DivineRow label="मासिक उत्पन्न" value={data.personal.income} />
          )}
          {!hidden.has("gotra") && (
            <DivineRow label="गोत्र" value={data.personal.gotra} />
          )}

          <div className="mt-6">
            <DivineLabel title="कुंडली माहिती" />
            {!hidden.has("charan") && (
              <DivineRow label="चरण" value={data.horoscope.charan} />
            )}
          </div>
        </div>

        <div>
          <DivineLabel title="कौटुंबिक माहिती" />
          <DivineRow label="वडिलांचे नाव" value={data.family.fatherName} />
          {!hidden.has("fatherOccupation") && (
            <DivineRow
              label="वडिलांचा व्यवसाय"
              value={data.family.fatherOccupation}
            />
          )}
          <DivineRow label="आईचे नाव" value={data.family.motherName} />
          {!hidden.has("motherOccupation") && (
            <DivineRow
              label="आईचा व्यवसाय"
              value={data.family.motherOccupation}
            />
          )}
          {!hidden.has("siblingsInfo") &&
            (sibs
              ? sibs.map((s, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                  <DivineRow
                    key={s.name || i}
                    label={i === 0 ? "भाऊ-बहीण" : ""}
                    value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                  />
                ))
              : data.family.siblingsInfo && (
                  <DivineRow
                    label="भाऊ-बहीण"
                    value={data.family.siblingsInfo}
                  />
                ))}
          {!hidden.has("familyType") && (
            <DivineRow label="कुटुंब प्रकार" value={data.family.familyType} />
          )}
          {!hidden.has("nativePlace") && (
            <DivineRow label="मूळ गाव" value={data.family.nativePlace} />
          )}

          {(data.contact.phone ||
            (!hidden.has("email") && data.contact.email) ||
            !hidden.has("address")) && (
            <div className="mt-6">
              <DivineLabel title="संपर्क माहिती" />
              {data.contact.phone && (
                <DivineRow label="फोन" value={data.contact.phone} />
              )}
              {!hidden.has("email") && data.contact.email && (
                <DivineRow label="ईमेल" value={data.contact.email} />
              )}
              {!hidden.has("address") && (
                <DivineRow label="पत्ता" value={data.contact.address} />
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className="text-center py-2 text-xs tracking-widest"
        style={{ background: indigo, color: "#c4b8ff" }}
      >
        LagnaSetu — लग्नसेतू
      </div>
    </div>
  );
}

// ─── TEMPLATE 7: Vibrant (उत्सव) — PREMIUM ───────────────────────────────────
// Photo centered top, name below, then three-column info grid
// Palette: white bg, teal (#0D9488) accents, card sections
function TemplateVibrant({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  const teal = "#0D9488";
  const tealLight = "#f0fdfa";

  const VibrantSection = ({
    title,
    children,
  }: { title: string; children: React.ReactNode }) => (
    <div
      className="rounded-lg p-4"
      style={{ background: tealLight, border: "1px solid #99f6e4" }}
    >
      <p
        className="text-[11px] font-bold uppercase tracking-widest mb-3"
        style={{ color: teal }}
      >
        {title}
      </p>
      {children}
    </div>
  );

  const VibrantRow = ({
    label,
    value,
  }: { label: string; value: string | boolean | undefined | null }) => {
    const display =
      value === undefined || value === null || value === ""
        ? null
        : typeof value === "boolean"
          ? value
            ? "होय"
            : "नाही"
          : value;
    if (display === null) return null;
    return (
      <div className="text-sm mb-1.5">
        <span className="text-gray-500 text-xs">{label}: </span>
        <span className="font-semibold text-gray-800">{display}</span>
      </div>
    );
  };

  return (
    <div style={{ background: "#ffffff", fontFamily: "inherit" }}>
      <div style={{ height: 4, background: teal }} />

      {/* Centered photo + name */}
      <div
        className="flex flex-col items-center py-6"
        style={{ borderBottom: "1px solid #ccfbf1" }}
      >
        <PhotoBox
          src={data.photoPreview}
          size="w-24 h-28"
          shape="rounded-full border-4 object-cover"
        />
        <h1 className="font-serif-devanagari font-bold text-2xl text-gray-900 mt-3">
          {data.personal.name}
        </h1>
        <p className="text-sm mt-1" style={{ color: teal }}>
          {data.personal.education}
          {data.personal.occupation ? ` · ${data.personal.occupation}` : ""}
        </p>
      </div>

      {/* Three-column grid */}
      <div className="grid md:grid-cols-3 gap-3 p-5">
        {/* Column 1: Personal */}
        <VibrantSection title="वैयक्तिक">
          <VibrantRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
          {!hidden.has("timeOfBirth") && (
            <VibrantRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
          )}
          <VibrantRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
          <VibrantRow label="उंची" value={data.personal.height} />
          {!hidden.has("complexion") && (
            <VibrantRow label="रंग" value={data.personal.complexion} />
          )}
          {!hidden.has("income") && (
            <VibrantRow label="मासिक उत्पन्न" value={data.personal.income} />
          )}
          {!hidden.has("religion") && (
            <VibrantRow label="धर्म" value={data.personal.religion} />
          )}
          {!hidden.has("caste") && (
            <VibrantRow label="जात" value={data.personal.caste} />
          )}
          {!hidden.has("gotra") && (
            <VibrantRow label="गोत्र" value={data.personal.gotra} />
          )}
        </VibrantSection>

        {/* Column 2: Family */}
        <VibrantSection title="कौटुंबिक">
          <VibrantRow label="वडिलांचे नाव" value={data.family.fatherName} />
          {!hidden.has("fatherOccupation") && (
            <VibrantRow
              label="वडिलांचा व्यवसाय"
              value={data.family.fatherOccupation}
            />
          )}
          <VibrantRow label="आईचे नाव" value={data.family.motherName} />
          {!hidden.has("motherOccupation") && (
            <VibrantRow
              label="आईचा व्यवसाय"
              value={data.family.motherOccupation}
            />
          )}
          {!hidden.has("siblingsInfo") &&
            (sibs
              ? sibs.map((s, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                  <VibrantRow
                    key={s.name || i}
                    label={i === 0 ? "भाऊ-बहीण" : ""}
                    value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                  />
                ))
              : data.family.siblingsInfo && (
                  <VibrantRow
                    label="भाऊ-बहीण"
                    value={data.family.siblingsInfo}
                  />
                ))}
          {!hidden.has("familyType") && (
            <VibrantRow label="कुटुंब प्रकार" value={data.family.familyType} />
          )}
          {!hidden.has("nativePlace") && (
            <VibrantRow label="मूळ गाव" value={data.family.nativePlace} />
          )}
        </VibrantSection>

        {/* Column 3: Horoscope + Contact */}
        <div className="flex flex-col gap-3">
          <VibrantSection title="कुंडली">
            <VibrantRow label="राशी" value={data.horoscope.rashi} />
            <VibrantRow label="नक्षत्र" value={data.horoscope.nakshatra} />
            {!hidden.has("gan") && (
              <VibrantRow label="गण" value={data.horoscope.gan} />
            )}
            {!hidden.has("nadi") && (
              <VibrantRow label="नाडी" value={data.horoscope.nadi} />
            )}
            {!hidden.has("charan") && (
              <VibrantRow label="चरण" value={data.horoscope.charan} />
            )}
            {!hidden.has("manglikStatus") && (
              <VibrantRow
                label="मांगलिक"
                value={data.personal.manglikStatus ? "होय" : "नाही"}
              />
            )}
          </VibrantSection>

          {(data.contact.phone ||
            (!hidden.has("email") && data.contact.email) ||
            !hidden.has("address")) && (
            <VibrantSection title="संपर्क">
              {data.contact.phone && (
                <VibrantRow label="फोन" value={data.contact.phone} />
              )}
              {!hidden.has("email") && data.contact.email && (
                <VibrantRow label="ईमेल" value={data.contact.email} />
              )}
              {!hidden.has("address") && (
                <VibrantRow label="पत्ता" value={data.contact.address} />
              )}
            </VibrantSection>
          )}
        </div>
      </div>

      <div style={{ height: 4, background: teal }} />
    </div>
  );
}

// ─── TEMPLATE 8: Shubh (शुभ) — PREMIUM ──────────────────────────────────────
// Traditional feel, clean layout: saffron header, sections with left border
// Palette: saffron (#D97706), warm amber background
function TemplateShubh({
  data,
  hidden,
}: { data: SavedData; hidden: Set<string> }) {
  const sibs = parseSiblings(data.family.siblingsInfo);
  const saffron = "#D97706";

  const ShubhSection = ({
    title,
    children,
  }: { title: string; children: React.ReactNode }) => (
    <div className="mb-5 pl-4" style={{ borderLeft: `3px solid ${saffron}` }}>
      <p
        className="font-serif-devanagari font-bold text-base mb-3"
        style={{ color: saffron }}
      >
        {title}
      </p>
      {children}
    </div>
  );

  return (
    <div
      style={{
        background: "#fffbeb",
        fontFamily: "inherit",
        border: "1px solid #fde68a",
      }}
    >
      {/* Saffron header */}
      <div className="px-8 py-5" style={{ background: saffron }}>
        <p className="text-xs tracking-[0.2em] uppercase mb-1 text-amber-200">
          शुभ विवाह — विवाह बायोडाटा
        </p>
        <h1 className="font-serif-devanagari font-bold text-2xl text-white">
          {data.personal.name}
        </h1>
      </div>

      {/* Photo + highlights */}
      <div
        className="flex items-center gap-5 px-8 py-4"
        style={{ background: "#fef3c7", borderBottom: "1px solid #fde68a" }}
      >
        <PhotoBox
          src={data.photoPreview}
          size="w-20 h-24"
          shape="rounded object-cover"
        />
        <div className="grid grid-cols-2 gap-x-8 gap-y-0.5">
          <InfoRow label="जन्म तारीख" value={data.personal.dateOfBirth} />
          <InfoRow label="उंची" value={data.personal.height} />
          <InfoRow label="शिक्षण" value={data.personal.education} />
          <InfoRow label="व्यवसाय" value={data.personal.occupation} />
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ShubhSection title="वैयक्तिक माहिती">
              {!hidden.has("timeOfBirth") && (
                <InfoRow label="जन्म वेळ" value={data.personal.timeOfBirth} />
              )}
              <InfoRow label="जन्म ठिकाण" value={data.personal.placeOfBirth} />
              {!hidden.has("complexion") && (
                <InfoRow label="रंग" value={data.personal.complexion} />
              )}
              {!hidden.has("income") && (
                <InfoRow label="मासिक उत्पन्न" value={data.personal.income} />
              )}
              {!hidden.has("religion") && (
                <InfoRow label="धर्म" value={data.personal.religion} />
              )}
              {!hidden.has("caste") && (
                <InfoRow label="जात" value={data.personal.caste} />
              )}
              {!hidden.has("gotra") && (
                <InfoRow label="गोत्र" value={data.personal.gotra} />
              )}
            </ShubhSection>

            <ShubhSection title="कुंडली माहिती">
              <InfoRow label="राशी" value={data.horoscope.rashi} />
              <InfoRow label="नक्षत्र" value={data.horoscope.nakshatra} />
              {!hidden.has("gan") && (
                <InfoRow label="गण" value={data.horoscope.gan} />
              )}
              {!hidden.has("nadi") && (
                <InfoRow label="नाडी" value={data.horoscope.nadi} />
              )}
              {!hidden.has("charan") && (
                <InfoRow label="चरण" value={data.horoscope.charan} />
              )}
              {!hidden.has("manglikStatus") && (
                <InfoRow
                  label="मांगलिक"
                  value={data.personal.manglikStatus ? "होय" : "नाही"}
                />
              )}
            </ShubhSection>
          </div>

          <div>
            <ShubhSection title="कौटुंबिक माहिती">
              <InfoRow label="वडिलांचे नाव" value={data.family.fatherName} />
              {!hidden.has("fatherOccupation") && (
                <InfoRow
                  label="वडिलांचा व्यवसाय"
                  value={data.family.fatherOccupation}
                />
              )}
              <InfoRow label="आईचे नाव" value={data.family.motherName} />
              {!hidden.has("motherOccupation") && (
                <InfoRow
                  label="आईचा व्यवसाय"
                  value={data.family.motherOccupation}
                />
              )}
              {!hidden.has("siblingsInfo") &&
                (sibs
                  ? sibs.map((s, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable preview
                      <InfoRow
                        key={s.name || i}
                        label={i === 0 ? "भाऊ-बहीण" : ""}
                        value={`${s.type}: ${s.name} — ${s.maritalStatus}${s.occupation ? `, ${s.occupation}` : ""}`}
                      />
                    ))
                  : data.family.siblingsInfo && (
                      <InfoRow
                        label="भाऊ-बहीण"
                        value={data.family.siblingsInfo}
                      />
                    ))}
              {!hidden.has("familyType") && (
                <InfoRow label="कुटुंब प्रकार" value={data.family.familyType} />
              )}
              {!hidden.has("nativePlace") && (
                <InfoRow label="मूळ गाव" value={data.family.nativePlace} />
              )}
            </ShubhSection>

            {(data.contact.phone ||
              (!hidden.has("email") && data.contact.email) ||
              !hidden.has("address")) && (
              <ShubhSection title="संपर्क माहिती">
                {data.contact.phone && (
                  <InfoRow label="फोन" value={data.contact.phone} />
                )}
                {!hidden.has("email") && data.contact.email && (
                  <InfoRow label="ईमेल" value={data.contact.email} />
                )}
                {!hidden.has("address") && (
                  <InfoRow label="पत्ता" value={data.contact.address} />
                )}
              </ShubhSection>
            )}
          </div>
        </div>
      </div>

      <div
        className="text-center py-2 text-xs"
        style={{ background: "#fde68a", color: saffron }}
      >
        लग्नसेतू — LagnaSetu
      </div>
    </div>
  );
}

function renderTemplate(data: SavedData, hidden: Set<string>) {
  switch (data.template) {
    case "traditional":
      return <TemplateTraditional data={data} hidden={hidden} />;
    case "modern":
      return <TemplateModern data={data} hidden={hidden} />;
    case "royal":
      return <TemplateRoyal data={data} hidden={hidden} />;
    case "floral":
      return <TemplateFloral data={data} hidden={hidden} />;
    case "elegant":
      return <TemplateElegant data={data} hidden={hidden} />;
    case "divine":
      return <TemplateDivine data={data} hidden={hidden} />;
    case "vibrant":
      return <TemplateVibrant data={data} hidden={hidden} />;
    case "shubh":
      return <TemplateShubh data={data} hidden={hidden} />;
    default:
      return <TemplateTraditional data={data} hidden={hidden} />;
  }
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

      <div className="print-area max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-card-hover">
        {renderTemplate(data, hiddenFields)}
      </div>

      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
