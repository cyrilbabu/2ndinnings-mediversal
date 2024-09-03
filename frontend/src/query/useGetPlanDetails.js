import { useQuery } from "@tanstack/react-query";
import { getPlanDetails } from "../services/plans";

export function useGetPlanDetails() {
  const { isLoading, data: plans} = useQuery({
    queryKey: ["plan"],
    queryFn: () => getPlanDetails(),
  });
 

  return {
    isLoading,
    plans,
  };
}
