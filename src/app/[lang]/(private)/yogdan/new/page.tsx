"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";

import FormSubmitBtn from "@/components/form/FormSubmitBtn";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TYogdanSchema, yogdanSchema } from "@/schema/yogdan/yogdan.schema";
import FormErr from "@/components/form/FormErr";
import { useRouter } from "next/navigation";

// import { useAuth } from "@/hooks/useAuth";
// import { postRequest } from "@/lib/requests";
import { toast } from "sonner";
import { convertToFormData } from "@/lib/form";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";
import { usePostYogdan } from "@/hooks/mutations/yogdan.mutation";

const page = () => {
  //   const { token } = useAuth();
  const router = useRouter();
  const { mutateAsync } = usePostYogdan();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TYogdanSchema>({ resolver: zodResolver(yogdanSchema) });

  const onSubmit = async (data: TYogdanSchema) => {
    const formData = convertToFormData(data);
    console.log("formdata", formData);

    const promise = mutateAsync(formData);
    toast.promise(promise, {
      loading: "Adding yogdan please wait !!!",
      success: () => {
        router.push("/yogdan");
        return "Yogdan Added successfully !! Once admin approves it, it will be displayed in the Yogdan section.";
      },
      error: (err) => err.message || "Something went wrong !!",
    });
    console.log(formData);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="flex min-h-screen justify-center px-4 py-10">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Add Bansaj Yogdan</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <ImageUploadBtn setValue={setValue} trigger={trigger} />
              <FormErr>{errors.image?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Name of the contributor</CompulsoryLabel>
              <Input
                {...register("name")}
                placeholder="Eg: Ram Bahadur Adhikari"
              />
              <FormErr>{errors.name?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Birth Place</CompulsoryLabel>
              <Input {...register("birthPlace")} placeholder="Eg: Kathmandu" />
              <FormErr>{errors.birthPlace?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Contribution Type</CompulsoryLabel>
              <select {...register("type")} defaultValue="" className="select">
                <option value="" disabled>
                  Select contribution type
                </option>
                <option value="SOCIAL">Social</option>
                <option value="POLITICAL">Political</option>
                <option value="OTHERS">Others</option>
              </select>
              <FormErr>{errors.type?.message}</FormErr>
            </div>
            <div>
              <CompulsoryLabel>Description</CompulsoryLabel>
              <Textarea
                {...register("desc")}
                placeholder="Write description here"
              />
              <FormErr>{errors.desc?.message}</FormErr>
            </div>
            <FormSubmitBtn isSubmitting={isSubmitting}>
              Add Yogdan
            </FormSubmitBtn>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
