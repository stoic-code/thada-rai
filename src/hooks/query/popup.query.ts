import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

export const useGetPopups = () => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["popups"],
    queryFn: async () => {
      return await r.get({
        endpoint: "/user/popup",
        token,
      });
    },
  });
};
