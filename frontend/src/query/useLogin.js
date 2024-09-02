/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login as loginApi } from "../services/auth";

export function useLogin() {
  const mutation = useMutation({
    mutationFn: (data) => loginApi(data),

    onSuccess: (data) => {
      toast.success("User Login Successfully");
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
