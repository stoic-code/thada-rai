"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { convertToFormData } from "@/lib/form";

import { TspouseSchema, spouseSchema } from "@/schema/banshwali/spouse.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";

import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

import { dictionary } from "@/dictionary";
import { useBeforeUnload, useNepaliTyping, useNoInputScroll } from "@/hooks";
import useScrollToError from "@/hooks/useScrollToError";
import { useAddPerson } from "@/hooks/mutations";
import { toast } from "sonner";
import { STATUS } from "@/schema/constants";

const page = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const query = useSearchParams();
  const child = query.get("child");
  const gender = query.get("gender");
  const [status, setStatus] = useState("ALIVE");
  const isAlive = status === STATUS.alive;

  const {
    handleSubmit,
    setValue,
    register,
    trigger,
    formState: { errors, isDirty },
  } = useForm<TspouseSchema>({ resolver: zodResolver(spouseSchema) });
  const { mutateAsync, isPending } = useAddPerson();

  // trigger when changing to alive and death
  useEffect(() => {
    setValue("status", status);
    if (status !== STATUS.alive) {
      trigger();
    }
  }, [status]);

  // HANDLER FUNCTIONS
  const handleDeathStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  const onSubmit = async (data: TspouseSchema) => {
    const formData = convertToFormData<TspouseSchema>(data);
    formData.append("childId", String(child));
    formData.append("childGender", String(gender));
    if (status === "CONTACTLESS") {
      formData.append("contactless", "true");
    }
    const route = `/family/addmother/${child}`;
    toast.promise(mutateAsync({ route, formData }), {
      loading: "Please wait adding data to the tree !!",
      success: "Added data to the tree successfully !!",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  // CUSTOM HOOKS
  useBeforeUnload(isDirty);
  useScrollToError(errors);
  useNepaliTyping();
  useNoInputScroll();

  return (
    <Card className="mx-auto my-12 max-w-6xl">
      <CardHeader>
        <CardTitle className="text-lg">
          {dictionary[lang].titleMother}
        </CardTitle>
      </CardHeader>
      <div className="p-4">
        <form
          method="POST"
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1">
            <ImageUploadBtn trigger={trigger} setValue={setValue} />
            {errors.image && (
              <p className="text-xs text-red-500">
                {errors.image ? String(errors.image.message) : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].firstName}</CompulsoryLabel>
              <Input
                {...register("firstName")}
                type=""
                placeholder={`Eg : सिता`}
                data-nepali="true"
              />
              <p className="text-xs text-red-500">
                {errors.firstName ? errors.firstName.message : ""}
              </p>
            </div>

            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].lastName}</CompulsoryLabel>
              <Input
                {...register("lastName")}
                data-nepali="true"
                placeholder={`Eg : गोदार थापा`}
                className="capitalize"
              />
              <p className="text-xs text-red-500">
                {errors.lastName ? errors.lastName.message : ""}
              </p>
            </div>

            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].englishName}</CompulsoryLabel>
              <Input
                {...register("englishName")}
                placeholder={`Eg : Sita Adhikari `}
                className="capitalize"
              />
              <p className="text-xs text-red-500">
                {errors.englishName ? errors.englishName.message : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              {isAlive ? (
                <CompulsoryLabel>{dictionary[lang].dob}</CompulsoryLabel>
              ) : (
                <Label>{dictionary[lang].dob}</Label>
              )}
              <Input {...register("birthDate")} placeholder="Eg : १९९९-०१-०१" />
              <p className="text-xs text-red-500">
                {errors.birthDate ? errors.birthDate.message : ""}
              </p>
            </div>

            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].childCount}</CompulsoryLabel>
              <Input
                {...register("childrenCount")}
                defaultValue="0"
                placeholder={`Eg : १`}
                type="number"
              />
              <p className="text-xs text-red-500">
                {errors.childrenCount ? errors.childrenCount.message : ""}
              </p>
            </div>

            <div className="flex-1">
              <Label>{dictionary[lang].marriageDate}</Label>
              <Input
                {...register("marriedDate")}
                placeholder="Eg : १९९९-०१-०१"
              />
              <p className="text-xs text-red-500">
                {errors.marriedDate ? errors.marriedDate.message : ""}
              </p>
            </div>
          </div>

          <div className="my-4 flex items-center gap-4">
            <div className="flex gap-2">
              <input
                onChange={handleDeathStatus}
                id="alive"
                type="radio"
                value={STATUS.alive}
                checked={status === STATUS.alive}
              />
              <Label htmlFor="alive">{dictionary[lang].alive}</Label>
            </div>

            <div className="flex gap-2">
              <input
                id="dead"
                type="radio"
                value={STATUS.dead}
                onChange={handleDeathStatus}
                checked={status === STATUS.dead}
              />
              <Label htmlFor="dead">{dictionary[lang].dead}</Label>
            </div>

            <div className="flex gap-2">
              <input
                onChange={handleDeathStatus}
                id="contact_less"
                type="radio"
                value={STATUS.contactLess}
                checked={status === STATUS.contactLess}
              />
              <Label htmlFor="contact_less">
                {dictionary[lang].contactLess}
              </Label>
            </div>
          </div>

          {isAlive && (
            <>
              <div className="my-4 flex items-center gap-4">
                <div className="w-1/3">
                  <Label>{dictionary[lang].contact}</Label>
                  <Input
                    {...register("phone")}
                    placeholder={`Eg :  ९८xxxxxxxx`}
                    data-nepali="true"
                  />
                  <p className="text-xs text-red-500">
                    {errors.phone ? errors.phone.message : ""}
                  </p>
                </div>
              </div>
            </>
          )}

          <div>
            {status === "DEAD" ? (
              <div className="md:w-1/3">
                <Label>{dictionary[lang].deathDate}</Label>
                <Input
                  {...register("deathDate")}
                  placeholder="Eg: 2000-10-11"
                />
                <p className="text-xs text-red-500">
                  {errors.deathDate ? errors.deathDate.message : ""}
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex gap-2">
            <input {...register("divorced")} type="checkbox" id="divorced" />
            <Label htmlFor="divorced">{dictionary[lang].divorced}</Label>
          </div>

          <Button disabled={isPending} className="w-fit self-end">
            {isPending ? dictionary[lang].submitting : dictionary[lang].submit}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default page;
