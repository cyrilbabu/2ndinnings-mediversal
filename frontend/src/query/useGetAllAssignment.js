import { useQuery } from "@tanstack/react-query";

import { getAllAssignement } from "../services/assignement";

export function useGetAllAssignment() {
  const { isLoading, data: assignments } = useQuery({
    queryKey: ["AllAssignment"],
    queryFn: () => getAllAssignement(),
  });

  return {
    isLoading,
    assignments,
  };
}
