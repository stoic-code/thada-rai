"use client";
import CompulsoryLabel from "@/components/common/CompulsoryLabel";
import RichTextEditor from "@/components/editor/RichTextEditor";
import FormErr from "@/components/form/FormErr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostAlekh } from "@/hooks/mutations/alekh.mutation";
import { convertToFormData } from "@/lib/form";
import { TAlekhSchema, alekhSchema } from "@/schema/alekh.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<TAlekhSchema>({
    resolver: zodResolver(alekhSchema),
  });
  const { mutateAsync, isPending } = usePostAlekh();

  const onSubmit = (payload: TAlekhSchema) => {
    const refined = { ...payload, desc: "this is desc" };
    const formData = convertToFormData(refined);
    const promise = mutateAsync(formData).then(() => router.push("/alekh"));

    toast.promise(promise, {
      loading: "Adding alekh please wait !!",
      success:
        "Alekh Added successfully !! Once admin approves it, it will be displayed in the alekh section.",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  return (
    <div className="2xl:container bg-white min-h-screen px-4 space-y-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-4"
      >
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Add a new Alekh
          </h2>
        </div>
        <div className="space-y-1">
          <CompulsoryLabel>Alekh Title</CompulsoryLabel>
          <Input
            {...register("title")}
            placeholder="Enter Alekh Title"
            className=" bg-white"
          />
          <FormErr>{errors.title?.message}</FormErr>
        </div>
        <div className=" space-y-1">
          <CompulsoryLabel>Author Name</CompulsoryLabel>
          <Input
            {...register("author")}
            placeholder="Write Author's Name "
            className=" bg-white"
          />
          <FormErr>{errors.author?.message}</FormErr>
        </div>
        <div className=" space-y-1">
          <CompulsoryLabel>Alekh Image</CompulsoryLabel>
          <Input
            type="file"
            placeholder="Write Author's Name "
            className=" bg-white"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setValue("image", e.target.files[0]);
                trigger("image");
              }
            }}
          />
          <FormErr>{errors.image?.message}</FormErr>
        </div>
        <div className="space-y-1">
          <RichTextEditor
            name="body"
            setValue={setValue}
            trigger={trigger}
            value={watch("body")}
            modules={["table", "heading"]}
          />
          <FormErr>{errors.body?.message}</FormErr>
        </div>

        <div className=" grid place-items-end gap-2">
          <div className=" flex gap-2 items-center">
            <Button
              type="button"
              className=" hover:bg-destructive bg-destructive"
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
