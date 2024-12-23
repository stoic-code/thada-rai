"use client";
import Locations from "@/data/locations.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "@/schema/auth/signup";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPinned,
  Phone,
  UserRound,
} from "lucide-react";
import FormErr from "@/components/form/FormErr";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormSubmitBtn from "@/components/form/FormSubmitBtn";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import { cn } from "@/lib/utils";
import { useRegistrationMutation } from "@/hooks/mutations";
import { toast } from "sonner";

const page = () => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { province: "", district: "" },
  });
  const { mutateAsync, isPending } = useRegistrationMutation();

  const onSubmit = async (payload: TSignUpSchema) => {
    toast.promise(mutateAsync(payload), {
      loading: "Please wait you are being registered !!",
      success: "Registration successful !! Now Verify OTP !!",
      error: (err) => err.message || "Something went wrong while regsration !!",
    });
  };

  useEffect(() => {
    if (watch("password").length > 0) {
      trigger("password");
    }
  }, [watch("password")]);

  useEffect(() => {
    if (watch("confirmPassword").length > 0) {
      trigger("confirmPassword");
    }
  }, [watch("confirmPassword")]);

  return (
    <div className="bg-white relative min-h-screen">
      <img
        src="/auth/register1.svg"
        alt="logo"
        width={200}
        height={150}
        className="absolute top-0 right-20 mt-10 mr-10 hidden  lg:block xl:block"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-xl flex-col justify-center px-2 py-10"
      >
        <div className="space-y-2 pb-5">
          <h1 className="text-center font-semibold text-4xl leading-snug">
            डिजिटल बंशावलीमा
            <br /> हजुरलाई स्वागत छ
          </h1>
        </div>

        <div className="space-y-4">
          <div className="w-full">
            <CompulsoryLabel>Full Name</CompulsoryLabel>
            <div className="flex items-center rounded-md border border-gray-300 ring-primary focus-within:ring-[1px]">
              <UserRound className="mx-2 h-4 w-4 text-gray-500" />
              <input
                {...register("name")}
                placeholder="Eg: Ram Adhikari "
                className="w-full rounded-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <FormErr>{errors.name?.message}</FormErr>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="w-full">
              <CompulsoryLabel>Email</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300 ring-primary focus-within:ring-[1px]">
                <Mail className="mx-2 h-4 w-4 text-gray-500" />
                <input
                  {...register("email")}
                  placeholder="Eg: ram@gmail.com"
                  className="w-full rounded-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
                />
              </div>
              <FormErr>{errors.email?.message}</FormErr>
            </div>

            <div className="w-full">
              <CompulsoryLabel>Phone</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300 ring-primary focus-within:ring-[1px]">
                <Phone className="mx-2 h-4 w-4 text-gray-500" />
                <input
                  type="number"
                  {...register("phone")}
                  placeholder="Eg: 98xxxxxxxx"
                  className="w-full rounded-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
                />
              </div>
              <FormErr>{errors.phone?.message}</FormErr>
            </div>
          </div>

          {/* Password Input */}
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="w-full">
              <CompulsoryLabel>Password</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300 pr-1 ring-primary focus-within:ring-[1px]">
                <LockKeyhole className="mx-2 h-4 w-4 text-gray-500" />
                <input
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full rounded-r-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
                  type={visible ? "text" : "password"}
                />
                {watch("password")?.length > 0 && (
                  <>
                    {visible ? (
                      <EyeOff
                        onClick={() => setVisible(!visible)}
                        size={20}
                        className="cursor-pointer text-gray-700"
                      />
                    ) : (
                      <Eye
                        onClick={() => setVisible(!visible)}
                        size={20}
                        className="cursor-pointer text-gray-700"
                      />
                    )}
                  </>
                )}
              </div>
              <FormErr>{errors.password?.message}</FormErr>
            </div>

            <div className="w-full">
              <CompulsoryLabel>Confirm Password</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300 pr-1 ring-primary focus-within:ring-[1px]">
                <LockKeyhole className="mx-2 h-5 w-5 text-gray-500" />
                <input
                  {...register("confirmPassword")}
                  placeholder="Enter your password"
                  className="w-full rounded-r-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
                  type={confirmVisible ? "text" : "password"}
                />
                {watch("confirmPassword")?.length > 0 && (
                  <>
                    {confirmVisible ? (
                      <EyeOff
                        onClick={() => setConfirmVisible(!confirmVisible)}
                        size={20}
                        className="cursor-pointer text-gray-700"
                      />
                    ) : (
                      <Eye
                        onClick={() => setConfirmVisible(!confirmVisible)}
                        size={20}
                        className="cursor-pointer text-gray-700"
                      />
                    )}
                  </>
                )}
              </div>
              <FormErr>{errors.confirmPassword?.message}</FormErr>
            </div>
          </div>

          {/* PROVINCE */}
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="w-full">
              <CompulsoryLabel>Province</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300 ring-primary focus-within:ring-[1px]">
                <MapPinned className="mx-2 h-4 w-4 text-gray-500" />
                <select
                  className={cn(
                    "w-full rounded-r-md p-2 text-muted-foreground outline-none placeholder:font-light placeholder:text-gray-500",
                    watch("province")?.length > 0 ? "text-black" : ""
                  )}
                  onChange={(e) => {
                    setValue("province", e.target.value);
                    trigger("province");
                  }}
                  value={watch("province")}
                >
                  <option value="" disabled>
                    Select a Province
                  </option>
                  {Locations.provinceList.map((province) => (
                    <option key={province.id} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <FormErr>{errors.province?.message}</FormErr>
            </div>

            {/* DISTRICT */}
            <div className="w-full">
              <CompulsoryLabel>District</CompulsoryLabel>
              <div className="flex items-center rounded-md border border-gray-300 ring-primary focus-within:ring-[1px]">
                <MapPinned className="mx-2 h-4 w-4 text-gray-500" />
                <select
                  className={cn(
                    "w-full rounded-r-md p-2 text-muted-foreground outline-none placeholder:font-light placeholder:text-gray-500",
                    watch("district")?.length > 0 ? "text-black" : ""
                  )}
                  onChange={(e) => {
                    setValue("district", e.target.value);
                    trigger("district");
                  }}
                  value={watch("district")}
                >
                  <option value="" disabled>
                    Select a District
                  </option>
                  {watch("province")
                    ? Locations.provinceList
                        .find((p) => p.name === watch("province"))!
                        .districtList.map((district) => (
                          <option key={district.id} value={district.name}>
                            {district.name}
                          </option>
                        ))
                    : null}
                </select>
              </div>
              <FormErr>{errors.district?.message}</FormErr>
            </div>
          </div>

          {/* REFFERAL CODE */}
          <div className="w-full">
            <CompulsoryLabel>Referral Code</CompulsoryLabel>
            <div className="flex items-center rounded-md border border-gray-300 ring-primary focus-within:ring-[1px]">
              <UserRound className="mx-2 h-4 w-4 text-gray-500" />
              <input
                {...register("referral")}
                placeholder="Eg: META"
                className="w-full rounded-md p-2 outline-none placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <FormErr>{errors.referral?.message}</FormErr>
          </div>

          {/* Login Button */}
          <FormSubmitBtn isSubmitting={isPending} className="w-full">
            Register
          </FormSubmitBtn>
        </div>

        {/* Registration Link */}
        <div className="flex gap-2 pt-8 text-gray-400">
          <span>Already have an account ?</span>
          <Link
            href="/signin"
            className="text-blue-500 hover:underline hover:underline-offset-2"
          >
            Sign In
          </Link>
        </div>
      </form>
      <img
        src="/auth/register2.svg"
        alt="logo"
        width={200}
        height={150}
        className="absolute bottom-20 left-10 mt-10 mr-10 hidden  lg:block xl:block"
      />
    </div>
  );
};

export default page;
