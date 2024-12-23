"use client";
import { TPhoneSchema, phoneSchema } from "@/schema/banshwali";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Search } from "lucide-react";
import { useFindTreeByPhone } from "@/hooks/mutations/tree.mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const SearchForm = () => {
  const { mutateAsync } = useFindTreeByPhone();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TPhoneSchema>({ resolver: zodResolver(phoneSchema) });

  const onSubmit = (payload: any) => {
    const promise = mutateAsync(payload);
    toast.promise(promise, {
      success: (data) => {
        queryClient.setQueryData(["family", payload.phone], data);
        return "Family tree found successfully !!";
      },
      error: (err) => err.message || "No error",
      loading: "Please wait...",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="top-18 fixed left-0 z-50"
    >
      <div className="ml-1 mt-2 flex w-fit items-center justify-between gap-2 rounded-full bg-white px-2 py-1 text-xs shadow-lg md:px-4 md:py-2 md:text-base">
        <input
          {...register("phone")}
          className="w-fit bg-transparent outline-none"
          type=""
          placeholder="Family Admin Number"
        />

        <button disabled={isSubmitting} className="text-neutral-500">
          {isSubmitting ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>
      {errors.phone && (
        <p className="ml-2 py-2 pl-3 text-xs text-red-500">
          {errors.phone ? errors.phone.message : ""}
        </p>
      )}
    </form>
  );
};

export default SearchForm;
