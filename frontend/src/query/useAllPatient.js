import { useQuery } from "@tanstack/react-query";
import { showAllPatient } from "../services/patient";

export function useAllPatient() {
  const { isLoading, data: allPatient } = useQuery({
    queryKey: ["allPatient"],
    queryFn: () => showAllPatient(),
  });

  return {
    isLoading,
    allPatient,
  };
}
