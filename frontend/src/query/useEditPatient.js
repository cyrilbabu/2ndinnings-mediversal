import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPatient as editPatientApi } from "../services/patient";

export function useEditPatient() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => editPatientApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      toast.success("Availed");
    },
    onError: () => {
      toast.error(null);
    },
  });

  const { mutate: editPatient, status } = mutation;
  const isLoading = status === "pending";

  return { editPatient, isLoading };
}
