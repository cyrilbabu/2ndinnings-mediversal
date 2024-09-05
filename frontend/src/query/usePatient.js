import { useQuery } from "@tanstack/react-query";
import { getAllStaff } from "../services/staff";
import { showPatientById } from "../services/patient";

export function usePatient(id) {
  const { isLoading, data: patient } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => showPatientById(id),
  });

  return {
    isLoading,
    patient,
  };
}
