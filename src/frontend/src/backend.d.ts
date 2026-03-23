import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface FamilyInfo {
    familyType: string;
    nativePlace: string;
    motherOccupation: string;
    motherName: string;
    fatherName: string;
    fatherOccupation: string;
    siblingsInfo: string;
}
export interface Biodata {
    contactInfo: ContactInfo;
    templatePreference: string;
    photo?: ExternalBlob;
    personalInfo: PersonalInfo;
    horoscope: Horoscope;
    familyInfo: FamilyInfo;
}
export interface Horoscope {
    gan: string;
    nadi: string;
    charan: string;
    nakshatra: string;
    planetaryPositions: Array<string>;
    rashi: string;
}
export interface PersonalInfo {
    occupation: string;
    height: string;
    complexion: string;
    placeOfBirth: string;
    dateOfBirth: string;
    caste: string;
    name: string;
    education: string;
    manglikStatus: boolean;
    timeOfBirth: string;
    income: string;
    gotra: string;
    religion: string;
}
export interface ContactInfo {
    email: string;
    address: string;
    phone: string;
}
export interface backendInterface {
    createOrUpdateBiodata(personalInfo: PersonalInfo, familyInfo: FamilyInfo, horoscope: Horoscope, contactInfo: ContactInfo, photo: ExternalBlob | null, templatePreference: string): Promise<void>;
    deleteBiodata(): Promise<void>;
    getAllBiodatas(): Promise<Array<Biodata>>;
    getBiodata(): Promise<Biodata | null>;
    getBiodataByPrincipal(principal: Principal): Promise<Biodata>;
    getPhoto(): Promise<ExternalBlob | null>;
    getPhotoByPrincipal(principal: Principal): Promise<ExternalBlob | null>;
    searchBiodatasByCriteria(religion: string | null, caste: string | null, gotra: string | null, manglikStatus: boolean | null): Promise<Array<Biodata>>;
    searchBiodatasByName(name: string): Promise<Array<Biodata>>;
    uploadPhoto(blob: ExternalBlob): Promise<void>;
}
