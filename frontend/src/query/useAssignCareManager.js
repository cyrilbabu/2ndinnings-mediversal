/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { assignCareManager as assignCareManagerApi } from "../services/patient";

export function useAssignCareManager() {
  const queryClient = useQueryClient(); // Corrected function name
  const mutation = useMutation({
    mutationFn: (data) => assignCareManagerApi(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allPatient"] });
      toast.success("Assigned");
    },
    onError: (err) => {
      toast.error("Could Not Assign"); // Changed to toast.error for error handling
    },
  });

  const { mutate: assignCareManager, status } = mutation;
  const isLoading = status === "pending"; // Changed from "pending" to "loading"

  return { assignCareManager, isLoading };
}
