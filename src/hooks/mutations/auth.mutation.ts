import { login } from "@/actions/auth.action";
import { r } from "@/config/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Register mutations
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    onSuccess: () => {
      queryClient.resetQueries();
    },
    mutationFn: async (payload: any) => {
      try {
        const { error, code } = await login(payload);

        if (error) {
          if (code === 403) {
            toast.error("Verify OTP!!", {
              description: "You have to verify otp first !!",
            });
            router.push(`/signup/otp?phone=${payload.phone}`);
            return;
          } else {
            return toast.error("Invalid Credentials !!", {
              description:
                "Please check your phone & password and try again !!",
            });
          }
        } else {
          toast.success("Login Successful !!", {
            description: "You have been loggedin successfully !!",
          });
          router.push("/dashboard");
          // router.push("/");
        }
      } catch (err) {
        toast("Something went wrong !!", {
          description: "Couldn't send data to the server.",
        });
      }
    },
  });
};

export const useRegistrationMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: any) =>
      r
        .post({ endpoint: "/auth/signup", payload })
        .then(async () => {
          await r.post({ endpoint: `/auth/request-otp`, payload });
        })
        .then(() => {
          router.push(`/signup/otp?phone=${payload.phone}`);
        }),
  });
};

// 575772;
export const useSubmitOTP = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await r
        .patch({ endpoint: "/auth/verify-otp", payload })
        .then(() => {
          router.push(`/signin`);
        });
    },
  });
};
