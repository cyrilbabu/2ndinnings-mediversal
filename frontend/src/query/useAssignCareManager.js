/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { assignCareManager as assignCareManagerApi } from "../services/patient";

export function useAssignCareManager() {
  const mutation = useMutation({
    mutationFn: (data) => assignCareManagerApi(data),

    onSuccess: (data) => {
      toast.success(response.data.message);
    },
    onError: (err) => {
      console.log(err);
      toast.error(response.data.message);
    },
  });

  const { mutate: assignCareManager, status } = mutation;
  const isLoading = status === "pending";

  return { assignCareManager, isLoading };
}
