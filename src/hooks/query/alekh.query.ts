import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetAlekhs = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["alekhs"],
    queryFn: async () => {
      return await r.get({
        endpoint: "/user/aalekh",
        token,
      });
    },
  });
};

export const useGetSingleAlekh = (id: string | string[]) => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["alekhs", id],
    queryFn: async () => {
      return await r.get({
        endpoint: `/user/aalekh/${id}`,
        token,
      });
    },
  });
};
