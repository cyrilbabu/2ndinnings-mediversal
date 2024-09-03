import { useQuery } from "@tanstack/react-query";
import { getAllStaff } from "../services/staff";

export function useAllStaff() {
  const { isLoading, data: allStaff } = useQuery({
    queryKey: ["allStaff"],
    queryFn: () => getAllStaff(),
  });

  return {
    isLoading,
    allStaff,
  };
}
