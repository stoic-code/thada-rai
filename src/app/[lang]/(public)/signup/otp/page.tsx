"use client";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useSubmitOTP } from "@/hooks/mutations";
import { toast } from "sonner";

const page = () => {
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  const { mutateAsync, isPending } = useSubmitOTP();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(mutateAsync({ phone, otp }), {
      loading: "Verifying OTP. Please wait ....",
      success:
        "OTP verified successfully !! Now You will be redirected to login page.",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  return (
    <div className="flex -translate-y-10 min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border bg-white p-8 space-y-5 text-center rounded-3xl"
      >
        <h3 className="text-2xl font-semibold">OTP Verification</h3>
        <p className="text-sm text-muted-foreground">
          Enter OTP code sent to <span className="font-bold">{phone}</span>
        </p>
        <InputOTP value={otp} onChange={(val) => setOtp(val)} maxLength={6}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTP>
        <p className="text-sm text-muted-foreground">
          Didnt receive code ? <span className="font-bold">Resend</span> in{" "}
          <span className="font-bold">60</span>s
        </p>

        <Button disabled={isPending} size="lg" className="w-full">
          Verify
        </Button>
      </form>
    </div>
  );
};

export default page;
