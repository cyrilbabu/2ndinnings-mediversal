import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateStaff as updateStaffApi } from "../services/patient";

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => updateStaffApi(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Failed!.");
    },
  });

  const { mutate: updateStaff, status } = mutation;
  const isLoading = status === "pending";

  return { updateStaff, isLoading };
}
