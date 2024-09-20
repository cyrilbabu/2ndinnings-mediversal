import { useMutation } from "@tanstack/react-query";
import { patientRegister } from "../services/patient";
import { toast } from "react-hot-toast";

export function useRegisterPatient() {
  const { mutate: registerPatient, isLoading} = useMutation({
    mutationFn: patientRegister,
    onSuccess: () => {
      toast.success("Patient successfully registered");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Registration failed!";
      toast.error(errorMessage);
    },
  });

  return { registerPatient, isLoading};
}
