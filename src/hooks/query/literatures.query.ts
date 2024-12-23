import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetLiteratures = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["literatures"],
    queryFn: async () => {
      return await r.get({
        endpoint: "/user/literature",
        token,
      });
    },
  });
};

export const useGetSingleLiterature = (id: string | string[]) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["literatures", id],
    queryFn: async () => {
      return await r.get({
        endpoint: `/user/literature/${id}`,
        token,
      });
    },
  });
};
