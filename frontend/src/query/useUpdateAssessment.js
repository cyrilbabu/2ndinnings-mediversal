import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAssignmentDetails as updateAssignementApi } from "../services/assignement";

export function useUpdateAssessment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData) => updateAssignementApi(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllAssignment"] });
      toast.success("Assessment updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update assessment.");
    },
  });

  const { mutate: updateAssignementDetails, status } = mutation;
  const isLoading = status === "pending";

  return { updateAssignementDetails, isLoading };
}
