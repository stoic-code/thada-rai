import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetDownloads = () => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["downloads"],
    queryFn: async () => {
      return await r.get({
        endpoint: "/user/document",
        token,
      });
    },
  });
};
