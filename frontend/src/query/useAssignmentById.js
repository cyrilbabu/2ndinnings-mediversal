import { useQuery } from "@tanstack/react-query";

import { getAssignmentById } from "../services/assignement";

export function useAssignmentById(id) {
  const { isLoading, data: assignment } = useQuery({
    queryKey: ["Assignment", id],
    queryFn: () => getAssignmentById(id),
  });

  return {
    isLoading,
    assignment,
  };
}
