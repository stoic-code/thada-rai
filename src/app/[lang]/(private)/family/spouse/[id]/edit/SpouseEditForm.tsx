"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { dictionary } from "@/dictionary";
import { STATUS } from "@/schema/constants";
import FormErr from "@/components/form/FormErr";
import { useBeforeUnload, useNepaliTyping } from "@/hooks";
import { useNoInputScroll } from "@/hooks";
import { useSession } from "@/providers/SessionProvider";
import { professions } from "@/data/profession";
import { educationalQualifications } from "@/data/qualification";
import Countries from "@/data/countries.json";

const SpouseEditForm = ({
  lang,
  data,
  id,
}: {
  lang: string;
  data: any;
  id: string;
}) => {
  const {
    session: { accessToken: token, user },
  } = useSession();

  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
    trigger,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TspouseSchema>({
    resolver: zodResolver(spouseSchema),
    defaultValues: {
      ...data,
      birthDate: data.birthdate,
      deathDate: data.deathdate,
      updateForm: true,
    },
  });

  // Scroll to the errors if any
  const firstErrRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (firstErrRef.current) {
      firstErrRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [errors]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const [status, setStatus] = useState(data.status);
  const isAlive = status === STATUS.alive;

  const [nonResident, setNonResident] = useState<boolean>(false);

  const handleDeathStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as STATUS);
  };

  useEffect(() => {
    setValue("status", status);
  }, [status]);

  // trigger when changing to alive and death
  useEffect(() => {
    if (status !== STATUS.alive) {
      trigger();
    }
  }, [status]);

  const onSubmit = async (data: TspouseSchema) => {
    const formData = convertToFormData(data);

    try {
      console.log("formadat: ", convertToFormData(data));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/family/updatewife/${id}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast({
          title: "Success !!",
          description: "Edited your data in successfully!",
        });
        router.push("/family");
        return;
      }
      return toast({
        title: "Failed",
        description: "Couldn't edit your data in Banshwali !",
        variant: "destructive",
      });
    } catch (err) {
      console.log(err);
      return toast({
        title: "Internal Server Error !",
        description: "Couldn't send your data to the server.",
        variant: "destructive",
      });
    }
  };

  useNoInputScroll();
  useNepaliTyping();
  useBeforeUnload(isDirty);

  return (
    <Card className="mx-auto my-12 max-w-6xl">
      <CardHeader>
        <CardTitle className="text-lg">{dictionary[lang].titleEdit}</CardTitle>
      </CardHeader>
      <div className="p-4">
        <form
          method="POST"
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1">
            <ImageUploadBtn
              url={data.imgurl}
              trigger={trigger}
              setValue={setValue}
            />
            {errors.image && (
              <p ref={firstErrRef} className="text-xs text-red-500">
                {errors.image ? String(errors.image.message) : ""}
              </p>
            )}
          </div>

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].firstName}</CompulsoryLabel>
              <Input
                {...register("firstName")}
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
                placeholder={`Eg : गोदार थापा`}
                data-nepali="true"
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
            <div className="md:flex-1">
              {isAlive && <Label>{dictionary[lang].dob}</Label>}
              {/* <Input {...register("birthDate")} placeholder="Eg : १९९९-०१-०१" /> */}
              <input
                className={
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                }
                {...register("birthDate")}
                placeholder="Eg : १९९९-०१-०१"
              />
              <FormErr>{errors.birthDate?.message}</FormErr>
            </div>

            <div className="md:flex-1">
              <Label>{dictionary[lang].childCount}</Label>
              <Input
                {...register("childrenCount")}
                placeholder={`Eg : १`}
                data-date="true"
                defaultValue={0}
              />
              <p className="text-xs text-red-500">
                {errors.childrenCount ? errors.childrenCount.message : ""}
              </p>
            </div>

            <div className="md:flex-1">
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

          <div className="w-full md:w-1/3">
            <Label>{dictionary[lang].maiti}</Label>
            <Input
              {...register("maiti")}
              placeholder="Eg: Kothang"
              data-nepali="true"
              required={false}
            />
          </div>

          <div className="md:flex md:w-3/5 gap-3">
            {/* PROFESSION */}

            {professions?.length >= 1 && (
              <div className="flex-1">
                <Label>{dictionary[lang].profession}</Label>
                <select className="select" {...register("profession")}>
                  <option value="">पेशा छनोट गर्नुहोस्</option>
                  {professions.map((p: { id: number; name: string }) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* qualifiction */}
            {educationalQualifications?.length >= 1 && (
              <div className="flex-1">
                <Label>{dictionary[lang].qualification}</Label>
                <select className="select" {...register("qualification")}>
                  <option value="">योग्यता छनोट गर्नुहोस्</option>
                  {educationalQualifications.map(
                    (p: { id: number; name: string }) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
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

          {status === STATUS.alive && (
            <>
              <div className="my-4 flex items-center gap-4">
                <div className="md:w-1/3">
                  <Label>{dictionary[lang].contact}</Label>
                  <Input
                    {...register("phone")}
                    placeholder={`Eg :  ९८xxxxxxxx`}
                  />
                  <p className="text-xs text-red-500">
                    {errors.phone ? errors.phone.message : ""}
                  </p>
                </div>
              </div>
            </>
          )}

          <div>
            {status === STATUS.dead ? (
              <div className="md:w-1/3">
                <Label>{dictionary[lang].deathDate}</Label>
                <Input
                  {...register("deathDate")}
                  placeholder="Eg: १९९९-०१-०१"
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

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Label>{dictionary[lang].nonResident}</Label>
              <input
                type="checkbox"
                {...register("isNrn")}
                // checked={nonResident}
                onChange={() => {
                  setNonResident(!nonResident);
                }}
              />
              <p className="text-xs text-red-500">
                {errors.isNrn ? errors.isNrn.message : ""}
              </p>
            </div>
            {nonResident ? (
              <div className="w-fit">
                <Label>
                  Country <span className="text-red-500">*</span>
                </Label>
                <select className="select" {...register("country")}>
                  <option value="" disabled>
                    देश छनोट गर्नुहोस्
                  </option>
                  {Countries.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>

          <Button disabled={isSubmitting} className="w-fit self-end">
            {isSubmitting
              ? dictionary[lang].submitting
              : dictionary[lang].submit}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SpouseEditForm;
