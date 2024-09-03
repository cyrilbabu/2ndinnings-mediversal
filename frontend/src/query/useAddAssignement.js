import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addAssignement as addAssignementApi } from "../services/assignement";

export function useAddAssignement() {
  const mutation = useMutation({
    mutationFn: (data) => addAssignementApi(data),

    onSuccess: (data) => {
      toast.success("Assigned");
    },
    onError: (err) => {
      toast.error("Not Assigned");
    },
  });

  const { mutate: addAssignement, status } = mutation;
  const isLoading = status === "pending";

  return { addAssignement, isLoading };
}
