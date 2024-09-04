import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAssignementDetails as updateAssignementDetailsApi } from "../services/assignement";

export function useUpdateAssessment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => updateAssignementDetailsApi(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AllAssignment"] });
      toast.success("Done");
    },
    onError: (err) => {
      toast.error("Not Done");
    },
  });

  const { mutate: updateAssignementDetails, status } = mutation;
  const isLoading = status === "pending";

  return { updateAssignementDetails, isLoading };
}
