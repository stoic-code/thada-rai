"use client";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import FormErr from "@/components/form/FormErr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/providers/SessionProvider";
import { Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
const page = () => {
  const {
    session: { user },
  } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: user });

  const onSubmit = () => {};

  return (
    <div className="max-w-xl flex-1 space-y-3 px-2">
      <div>
        <CompulsoryLabel>Full Name</CompulsoryLabel>
        <Input placeholder="Enter your full name" {...register("name")} />
        <FormErr></FormErr>
      </div>
      <div>
        <div className="flex-1">
          <CompulsoryLabel>Email</CompulsoryLabel>
          <Input placeholder="Enter your email" {...register("email")} />
          <FormErr></FormErr>
        </div>
      </div>
      <div>
        <CompulsoryLabel>Phone</CompulsoryLabel>
        <Input placeholder="Enter your email" {...register("phone")} />
        <button className="text-xs text-blue-700">Verify</button>
      </div>
      <Button className="flex w-fit gap-2">
        <Save className="inline w-4" />
        Save
      </Button>
    </div>
  );
};

export default page;
