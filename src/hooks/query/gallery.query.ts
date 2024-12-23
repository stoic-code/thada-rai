import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetGalleries = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      return await r.get({
        endpoint: "/user/album",
        token,
      });
    },
  });
};

export const useGetSingleGallery = (id: string | string[]) => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["gallery", id],
    queryFn: async () => {
      return await r.get({
        endpoint: `/user/album/${id}`,
        token,
      });
    },
  });
};
