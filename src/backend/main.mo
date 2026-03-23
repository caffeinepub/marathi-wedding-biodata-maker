import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type PersonalInfo = {
    name : Text;
    dateOfBirth : Text;
    timeOfBirth : Text;
    placeOfBirth : Text;
    height : Text;
    complexion : Text;
    education : Text;
    occupation : Text;
    income : Text;
    religion : Text;
    caste : Text;
    gotra : Text;
    manglikStatus : Bool;
  };

  type FamilyInfo = {
    fatherName : Text;
    fatherOccupation : Text;
    motherName : Text;
    motherOccupation : Text;
    siblingsInfo : Text;
    familyType : Text;
    nativePlace : Text;
  };

  type Horoscope = {
    rashi : Text;
    nakshatra : Text;
    gan : Text;
    nadi : Text;
    charan : Text;
    planetaryPositions : [Text];
  };

  type ContactInfo = {
    address : Text;
    phone : Text;
    email : Text;
  };

  type Biodata = {
    personalInfo : PersonalInfo;
    familyInfo : FamilyInfo;
    horoscope : Horoscope;
    contactInfo : ContactInfo;
    photo : ?Storage.ExternalBlob;
    templatePreference : Text;
  };

  module Biodata {
    public func compare(biodata1 : Biodata, biodata2 : Biodata) : Order.Order {
      Text.compare(biodata1.personalInfo.name, biodata2.personalInfo.name);
    };
  };

  let biodatas = Map.empty<Principal, Biodata>();

  public shared ({ caller }) func createOrUpdateBiodata(
    personalInfo : PersonalInfo,
    familyInfo : FamilyInfo,
    horoscope : Horoscope,
    contactInfo : ContactInfo,
    photo : ?Storage.ExternalBlob,
    templatePreference : Text,
  ) : async () {
    let biodata : Biodata = {
      personalInfo;
      familyInfo;
      horoscope;
      contactInfo;
      photo;
      templatePreference;
    };
    biodatas.add(caller, biodata);
  };

  public query ({ caller }) func getBiodata() : async ?Biodata {
    biodatas.get(caller);
  };

  public query ({ caller }) func getBiodataByPrincipal(principal : Principal) : async Biodata {
    switch (biodatas.get(principal)) {
      case (null) { Runtime.trap("Biodata not found") };
      case (?biodata) { biodata };
    };
  };

  public query ({ caller }) func getAllBiodatas() : async [Biodata] {
    biodatas.values().toArray().sort();
  };

  public query ({ caller }) func searchBiodatasByName(name : Text) : async [Biodata] {
    biodatas.values().toArray().filter(
      func(biodata) {
        biodata.personalInfo.name.contains(#text(name));
      }
    );
  };

  public shared ({ caller }) func deleteBiodata() : async () {
    if (not biodatas.containsKey(caller)) {
      Runtime.trap("Biodata does not exist");
    };
    biodatas.remove(caller);
  };

  public shared ({ caller }) func uploadPhoto(blob : Storage.ExternalBlob) : async () {
    switch (biodatas.get(caller)) {
      case (null) { Runtime.trap("Biodata does not exist") };
      case (?biodata) {
        let updatedBiodata = {
          biodata with
          photo = ?blob;
        };
        biodatas.add(caller, updatedBiodata);
      };
    };
  };

  public query ({ caller }) func getPhoto() : async ?Storage.ExternalBlob {
    switch (biodatas.get(caller)) {
      case (null) { Runtime.trap("Biodata does not exist") };
      case (?biodata) { biodata.photo };
    };
  };

  public query ({ caller }) func getPhotoByPrincipal(principal : Principal) : async ?Storage.ExternalBlob {
    switch (biodatas.get(principal)) {
      case (null) { Runtime.trap("Biodata does not exist") };
      case (?biodata) { biodata.photo };
    };
  };

  public query ({ caller }) func searchBiodatasByCriteria(
    religion : ?Text,
    caste : ?Text,
    gotra : ?Text,
    manglikStatus : ?Bool,
  ) : async [Biodata] {
    let filtered = List.empty<Biodata>();

    for (biodata in biodatas.values()) {
      var match = true;

      switch (religion) {
        case (?r) { match := match and (biodata.personalInfo.religion == r) };
        case (null) {};
      };

      switch (caste) {
        case (?c) { match := match and (biodata.personalInfo.caste == c) };
        case (null) {};
      };

      switch (gotra) {
        case (?g) { match := match and (biodata.personalInfo.gotra == g) };
        case (null) {};
      };

      switch (manglikStatus) {
        case (?m) { match := match and (biodata.personalInfo.manglikStatus == m) };
        case (null) {};
      };

      if (match) {
        filtered.add(biodata);
      };
    };

    filtered.toArray();
  };
};
