"use client";
import CompulsoryLabel from "@/components/common/CompulsoryLabel";
import RichTextEditor from "@/components/editor/RichTextEditor";
import FormErr from "@/components/form/FormErr";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostLiterature } from "@/hooks/mutations";
import { convertToFormData } from "@/lib/form";
import {
  TLiteratureSchema,
  literatureSchema,
} from "@/schema/literature/literature.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();
  const {
    trigger,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TLiteratureSchema>({ resolver: zodResolver(literatureSchema) });
  const { isPending, mutateAsync } = usePostLiterature();
  console.log(errors);

  const onSubmit = (payload: TLiteratureSchema) => {
    console.log("literature add data: ", payload);
    const formData = convertToFormData(payload);
    const promise = mutateAsync(formData).then(() =>
      router.push("/literature")
    );
    toast.promise(promise, {
      loading: "Adding literature ....",
      success:
        "Literature added successfully. Once admin approves it, it will be updated in literature section.",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  return (
    <div className="2xl:container px-4 space-y-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-4 bg-white p-4 rounded-xl border mb-20"
      >
        <h2 className="text-3xl font-medium">Add Literature</h2>

        <ImageUploadBtn setValue={setValue} trigger={trigger} />
        <div className=" space-y-1">
          <CompulsoryLabel>Literature Title</CompulsoryLabel>
          <Input
            {...register("title")}
            placeholder="Eg: संगीतमा झुम्ने युवा"
            className=" bg-white"
          />
          <FormErr>{errors.title?.message}</FormErr>
        </div>

        <div className="space-y-1">
          <CompulsoryLabel>Author name</CompulsoryLabel>
          <Input
            {...register("author")}
            placeholder="Eg: सजना ... "
            className="bg-white"
          />
          <FormErr>{errors.title?.message}</FormErr>
        </div>

        <div className=" space-y-1">
          <CompulsoryLabel>Birth Place</CompulsoryLabel>
          <Input
            {...register("birth_place")}
            placeholder="Eg:  थापाथली, काठमाडौं, नेपाल"
            className=" bg-white"
          />
          <FormErr>{errors.birth_place?.message}</FormErr>
        </div>

        <div className=" space-y-1">
          <CompulsoryLabel>Write Alekh </CompulsoryLabel>
          <RichTextEditor
            name="content"
            setValue={setValue}
            trigger={trigger}
            value={watch("content")}
            modules={["table", "heading"]}
          />
          <FormErr>{errors.content?.message}</FormErr>
        </div>

        <div className=" grid place-items-end gap-2">
          <div className=" flex gap-2 items-center">
            <Button
              type="button"
              className="bg-destructive hover:bg-destructive/80"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button disabled={isPending}>
              {isPending ? "Loading...." : "submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
