import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login as loginApi } from "../services/auth";

export function useLogin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => loginApi(data),

    onSuccess: (data) => {
      console.log(data);
      toast.success("User Login Successfully");

      // Store the data in the React Query cache under the key "user"
      queryClient.setQueryData(["user"], data);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided employee ID or password are incorrect");
    },
  });

  const { mutate: login, status } = mutation;
  const isLoading = status === "pending";

  return { login, isLoading };
}
