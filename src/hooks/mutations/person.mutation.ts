import { useMutation, useQueryClient } from "@tanstack/react-query";
import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";

/** Add person's data in a tree. Self Father & Son */
export const useAddPerson = () => {
  const router = useRouter();
  const {
    session: { accessToken: token },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) =>
      await r
        .post({
          endpoint: payload.route,
          token,
          payload: payload.formData,
        })
        .then((data) => {
          queryClient.resetQueries();
          return data;
        }),
    onSuccess: async () => {
      router.replace("/family");
      router.refresh();
    },
  });
};

/** Delete a node from tree */
export const useDeletePerson = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (route: string) =>
      await r.delete({
        endpoint: route,
        token,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["family"] }),
  });
};

export const useEditDetails = (route: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) =>
      await r.patch({
        endpoint: route,
        token,
        payload,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["family"] }),
  });
};
