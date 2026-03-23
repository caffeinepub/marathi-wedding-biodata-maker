import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Biodata,
  ContactInfo,
  ExternalBlob,
  FamilyInfo,
  Horoscope,
  PersonalInfo,
} from "../backend";
import { useActor } from "./useActor";

export function useGetBiodata() {
  const { actor, isFetching } = useActor();
  return useQuery<Biodata | null>({
    queryKey: ["biodata"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBiodata();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateOrUpdateBiodata() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      personalInfo: PersonalInfo;
      familyInfo: FamilyInfo;
      horoscope: Horoscope;
      contactInfo: ContactInfo;
      photo: ExternalBlob | null;
      templatePreference: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.createOrUpdateBiodata(
        args.personalInfo,
        args.familyInfo,
        args.horoscope,
        args.contactInfo,
        args.photo,
        args.templatePreference,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["biodata"] });
    },
  });
}
