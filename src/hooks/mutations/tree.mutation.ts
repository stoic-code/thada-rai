import { useMutation } from "@tanstack/react-query";
import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useFindTreeByPhone = () => {
  const {
    session: { accessToken: token },
  } = useSession();
  const { push } = useRouter();
  return useMutation({
    mutationFn: async ({ phone }: any) => {
      return await r
        .get({ endpoint: `/family/findtree/${phone}`, token })
        .then(() => push(`/family/${phone}`));
    },
  });
};

export const useConfirmClaim = () => {
  const router = useRouter();

  const {
    session: { accessToken: token },
  } = useSession();
  return useMutation({
    mutationFn: async (id: string) => {
      return await r
        .post({
          endpoint: `/merge/claimrequest?claimthis=${id}`,
          token,
        })
        .then(() =>
          toast.success("Claim request sent successfully !!", {
            description:
              "After the node owner accept the request you will get the claimed node in your geneology tree",
          })
        )
        .then(() => router.push("/family"))
        .catch((err) => {
          toast.error("Failed !!", {
            description: err.message || "Something went wrong !!",
          });
        });
    },
  });
};

export const useConfirmMergeReq = (route: string) => {
  const router = useRouter();

  const {
    session: { accessToken: token },
  } = useSession();
  return useMutation({
    mutationFn: async () => {
      return await r
        .post({
          endpoint: route,
          token,
        })
        .then(() =>
          toast.success("Merge request sent successfully !!", {
            description:
              "After the node owner accept the request your tree will be updated. And you will be able to see your acendents in full tree !!",
          })
        )
        .then(() => router.push("/family"))
        .catch((err) => {
          toast.error("Failed !!", {
            description: err.message || "Something went wrong !!",
          });
        });
    },
  });
};

export const useChangeReqStatus = (requestId: string) => {
  const router = useRouter();

  const {
    session: { accessToken: token },
  } = useSession();
  return useMutation({
    mutationFn: async ({
      status,
      type,
    }: {
      status: "REJECTED" | "VERIFIED";
      type: "CLAIM" | "MERGE";
    }) => {
      const isClaim = type === "CLAIM";
      const endpoint = `/merge/${isClaim ? "reviewclaim" : "reviewmerge"}`;
      return await r
        .post({
          endpoint,
          token,
          payload: { requestId, status },
        })
        .then(() =>
          toast.success("Merge request approved successfully !!", {
            description:
              "Incomming tree is now merged in your tree. You can view it in your gneology tree!!",
          })
        )
        .then(() => router.back())
        .catch((err) => {
          toast.error("Failed !!", {
            description: err.message || "Something went wrong !!",
          });
        });
    },
  });
};
