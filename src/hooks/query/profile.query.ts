import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetContributors = () => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["contributors"],
    queryFn: async () => {
      // return await r.get({ endpoint: "", token });
      return [];
    },
  });
};

export const useGetPitris = () => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["pitris"],
    queryFn: async () => {
      // return await r.get({ endpoint: "", token });
      return [];
    },
  });
};
