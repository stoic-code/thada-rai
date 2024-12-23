import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostAlekh = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await r.post({
        endpoint: "/user/aalekh",
        token,
        payload,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alekhs"] }),
  });
};
