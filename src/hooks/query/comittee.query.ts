import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetComitteeMembers = (route: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["committee", route],
    queryFn: async () => {
      return await r.get({
        endpoint: route,
        token,
      });
    },
  });
};
