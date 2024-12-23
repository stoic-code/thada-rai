"use client";
import FormErr from "@/components/form/FormErr";
import FormSubmitBtn from "@/components/form/FormSubmitBtn";
import { Label } from "@/components/ui/label";
import { useNoInputScroll } from "@/hooks/useNoInputScroll";
import { TSignInSchema, signInSchema } from "@/schema/auth/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserRound } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/hooks/mutations/auth.mutation";
import React from "react";

export default function page() {
  useNoInputScroll();
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });
  const { mutateAsync, isPending } = useLoginMutation();

  const onSubmit = async (payload: TSignInSchema) => {
    mutateAsync(payload);
  };

  return (
    <div className="relative min-h-screen ">
      <img
        src="/auth/login1.svg"
        alt="logo"
        width={200}
        height={150}
        className="absolute top-0 right-20 mt-10 mr-10 hidden lg:block xl:block"
      />
      <div className="flex justify-center items-start h-screen  sm:min-h-screen">
        <div className="w-[500px] sm:mt-8 rounded-lg bg-white h-screen sm:h-auto  p-2 sm:p-8 shadow-md">
          <h1 className="text-center  text-2xl sm:text-3xl font-semibold lg:text-4xl lg:leading-snug leading-snug">
            डिजिटल बंशावलीमा
            <br /> हजुरलाई स्वागत छ
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mt-5 gap-4">
              {/* Phone Number Input */}
              <div>
                <label htmlFor="phone" className="block font-medium">
                  Phone Number
                </label>
                <div className="flex items-center rounded-md border border-gray-300 ring-primary focus-within:ring-[1px]">
                  <UserRound className="mx-2 h-4 w-4 text-gray-500" />
                  <input
                    {...register("phone")}
                    type="number"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="flex-1 rounded-r-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
                  />
                </div>
                <FormErr>{errors.phone?.message}</FormErr>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <div className="flex items-center rounded-md border border-gray-300 pr-1 ring-primary focus-within:ring-[1px]">
                  <LockKeyhole className="mx-2 h-4 w-4 text-gray-500" />
                  <input
                    {...register("password")}
                    id="password"
                    placeholder="Enter your password"
                    className="flex-1 rounded-r-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
                    type={visible ? "text" : "password"}
                  />
                  {watch("password")?.length > 0 && (
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setVisible(!visible)}
                      className="cursor-pointer text-gray-700"
                    >
                      {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
                <FormErr>{errors.password?.message}</FormErr>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-password"
                    className="mr-2"
                  />
                  <Label
                    htmlFor="remember-password"
                    className=" text-xs sm:text-sm tracking-wide"
                  >
                    Remember Password
                  </Label>
                </div>
                <a
                  href="/forgot-password"
                  className="hover:underline text-xs sm:text-sm tracking-wide text-primary"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mt-2">
                {/* Login Button */}
                <FormSubmitBtn isSubmitting={isPending} className="w-full">
                  Login
                </FormSubmitBtn>
                <div className="flex justify-center gap-2 text-sm tracking-wider items-center mt-2">
                  Don't have an account ?{" "}
                  <a href="/signup" className=" ">
                    <span className="text-blue-800">Signup</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center mt-5">
                <div className="flex-grow border-t border-solid border-muted-foreground "></div>
                <span className="mx-2 text-muted-foreground text-sm">or</span>
                <div className="flex-grow border-t border-solid border-muted-foreground "></div>
              </div>
              <div className="flex justify-center items-center mt-2 border p-2 rounded-md">
                <img
                  src="/auth/google.svg"
                  alt="google"
                  width={20}
                  className="mr-2"
                />
                <a href="#" className="text-primary text-sm hover:underline">
                  Sign in with Google
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <img
        src="/auth/login2.svg"
        alt="logo"
        width={200}
        height={150}
        className="absolute bottom-10 left-0 mb-10 ml-10 hidden lg:block xl:block"
      />
    </div>
  );
}
