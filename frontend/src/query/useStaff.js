import { useQuery } from "@tanstack/react-query";
import { getStaffById } from "../services/staff";

export function useStaff(id) {
  const { data: staff, isLoading } = useQuery({
    queryKey: ["staff",id],
    queryFn: () =>getStaffById(id)
  });

  return { staff, isLoading };
}
