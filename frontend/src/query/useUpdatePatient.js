import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePatient as updatePatientApi } from "../services/patient";

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => updatePatientApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Failed!.");
    },
  });

  const { mutate: updatePatient, status } = mutation;
  const isLoading = status === "pending";

  return { updatePatient, isLoading };
}
