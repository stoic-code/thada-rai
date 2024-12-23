import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetContributions = () => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["contributions"],
    queryFn: async () => {
      return await r.get({
        endpoint: "",
        token,
      });
    },
  });
};
