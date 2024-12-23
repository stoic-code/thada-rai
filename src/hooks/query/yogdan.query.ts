import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetYogdans = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["yogdans"],
    queryFn: async () => {
      return await r.get({
        endpoint: "/user/yogdan",
        token,
      });
    },
  });
};

export const useGetSingleYogdan = (id: string | string[]) => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["yogdans", id],
    queryFn: async () => {
      return await r.get({
        endpoint: `/user/yogdan/${id}`,
        token,
      });
    },
  });
};
