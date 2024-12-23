import { r } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export function useGetStatistics(route: string) {
  return useQuery({
    queryKey: ["statistics", route],
    queryFn: async () => {
      return await r.get({
        endpoint: route,
      });
    },
  });
}
