import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

// Gets a loggedin user's tree
export const useGetMergeRequest = (route: string) => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["merge", route],
    queryFn: async () => {
      return await r.get({ endpoint: route, token });
    },
    refetchInterval: 5000,
    retry: 1,
  });
};
