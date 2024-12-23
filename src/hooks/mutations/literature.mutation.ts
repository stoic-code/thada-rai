import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useMutation } from "@tanstack/react-query";

export const usePostLiterature = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await r.post({
        endpoint: "/user/literature",
        token,
        payload,
      });
    },
  });
};
