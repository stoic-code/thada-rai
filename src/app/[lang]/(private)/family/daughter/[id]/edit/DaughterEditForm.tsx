"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import {
  TDaughterSchema,
  daughterSchema,
} from "@/schema/banshwali/daughter.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";

import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";
import { convertToFormData } from "@/lib/form";
import { dictionary } from "@/dictionary";
import FormErr from "@/components/form/FormErr";
import { STATUS } from "@/schema/constants";
import { useEditDetails } from "@/hooks/mutations";
import { toast } from "sonner";
import { useNepaliTyping, useNoInputScroll } from "@/hooks";
import { professions } from "@/data/profession";
import { educationalQualifications } from "@/data/qualification";
import Countries from "@/data/countries.json";

const getMother = (mothers: any[], id: string) => {
  const ownMother = mothers.find((m) => m.id == id);
  if (ownMother)
    return {
      name: `${ownMother.firstName} ${ownMother.lastName}`,
      id: ownMother.id,
    };
  return null;
};

const DaughterEditForm = ({
  lang,
  data,
  id,
  mothers,
}: {
  lang: string;
  data: any;
  id: string;
  mothers: any;
}) => {
  const router = useRouter();
  const ownMother = getMother(mothers, data.motherId);
  const [motherId, setMotherId] = useState<string>(ownMother?.id);

  const query = useSearchParams();
  const type = query.get("type");

  const {
    handleSubmit,
    register,
    trigger,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<TDaughterSchema>({
    resolver: zodResolver(daughterSchema),
    defaultValues: {
      ...data,
      updateForm: true,
    },
  });
  const { mutateAsync, isPending } = useEditDetails(
    `/family/updatedaughter/${data.id}`
  );

  const [status, setStatus] = useState<STATUS>(data.status);
  const isAlive = status === STATUS.alive;

  const [marriageStatus, setMarriageStatus] = useState("unmarried");

  const handleDeathStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as STATUS);
  };

  const handleMarriageStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarriageStatus(e.target.value);
  };

  const [nonResident, setNonResident] = useState<boolean>(false);
  const watchIsNrn = watch("isNrn");

  useEffect(() => {
    if (!watchIsNrn) {
      setValue("country", "नेपाल");
      trigger("country");
    }
  }, [watchIsNrn]);

  useEffect(() => {
    setValue("status", status);
    if (status !== STATUS.alive) {
      trigger();
    }
  }, [status]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = async (data: TDaughterSchema) => {
    const formData = convertToFormData(data);

    if (marriageStatus === "divorced") {
      formData.append("divorced", "true");
    }

    if (motherId) {
      formData.append("motherName", getMother(mothers, motherId)?.name!);
    }

    const promise = mutateAsync(formData).then(() => router.push("/family"));
    toast.promise(promise, {
      loading: "Please wait editing data...",
      success: "Edited data successfully",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  useNepaliTyping();
  useNoInputScroll();

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
                placeholder={`Eg : सिता`}
                className="capitalize"
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
                className="capitalize"
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
              <CompulsoryLabel>{dictionary[lang].index}</CompulsoryLabel>
              <Input
                {...register("childIndex")}
                type="number"
                placeholder="Eg: 1"
              />
              <p className="text-xs text-red-500">
                {errors.childIndex ? errors.childIndex.message : ""}
              </p>
            </div>

            <div className="md:flex-1">
              <Label>{dictionary[lang].dob}</Label>
              <Input {...register("birthDate")} placeholder="Eg: YYYY-MM-DD" />
              <FormErr>{errors.birthDate?.message}</FormErr>
            </div>

            <div className="md:flex-1">
              <Label>{dictionary[lang].contact}</Label>
              <Input
                {...register("phone")}
                type="number"
                placeholder={`Eg : 98xxxxxxxx`}
              />
              <p className="text-xs text-red-500">
                {errors.phone ? errors.phone.message : ""}
              </p>
            </div>
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
                  <option value="">योग्यता छनोट गर्नुहोस् |</option>
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

          {mothers?.length >= 1 && (
            <div className="flex flex-col flex-wrap gap-4 md:flex-row">
              <div className="md:w-1/3">
                <Label>Mother's Name</Label>
                <select
                  className="select"
                  onChange={(e) => setMotherId(e.target.value)}
                  defaultValue={ownMother?.id || ""}
                >
                  {mothers.map((m: any) => (
                    <option key={m.id} value={m.id}>
                      {`${m.firstName} ${m.lastName}`}
                    </option>
                  ))}
                  <option value="">माथिको कुनै पनि होइन</option>
                </select>
              </div>
            </div>
          )}

          <div className="my-4 flex items-center gap-4">
            <div className="flex gap-2">
              <input
                onChange={handleMarriageStatus}
                id="unmarried"
                type="radio"
                value="unmarried"
                checked={marriageStatus === "unmarried"}
              />
              <Label htmlFor="unmarried">{dictionary[lang].unmarried}</Label>
            </div>

            <div className="flex gap-2">
              <input
                id="married"
                type="radio"
                value="married"
                onChange={handleMarriageStatus}
                checked={marriageStatus === "married"}
              />
              <Label htmlFor="married">{dictionary[lang].married}</Label>
            </div>

            <div className="flex gap-2">
              <input
                id="divorced"
                type="radio"
                value="divorced"
                onChange={handleMarriageStatus}
                checked={marriageStatus === "divorced"}
              />
              <Label htmlFor="divorced">{dictionary[lang].divorced}</Label>
            </div>
          </div>

          {marriageStatus === "married" && (
            <div className="flex gap-2">
              <div className="w-1/3">
                <Label>{dictionary[lang].marriageDate}</Label>
                <Input
                  {...register("marriageDate")}
                  placeholder="Eg: YYYY-MM-DD"
                />
                <p className="text-xs text-red-500">
                  {errors.marriageDate ? errors.marriageDate.message : ""}
                </p>
              </div>

              {/* 
                              <div className="w-1/3">
                                <Label>{dictionary[lang].sonInLaw}</Label>
                                <Input
                                  {...register("sonInLaw")}
                                  placeholder="Eg: Ganesh Man "
                                />
                                <p className="text-red-500 text-xs">
                                  {errors.sonInLaw ? errors.sonInLaw.message : ""}
                                </p>
                                </div>
                                */}
            </div>
          )}

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
                id="contact_less"
                type="radio"
                value={STATUS.contactLess}
                onChange={handleDeathStatus}
                checked={status === STATUS.contactLess}
              />
              <Label htmlFor="contact_less">
                {dictionary[lang].contactLess}
              </Label>
            </div>
          </div>

          <div>
            {status === STATUS.dead ? (
              <div className="w-1/3">
                <Label>{dictionary[lang].deathDate}</Label>
                <Input
                  {...register("deathDate")}
                  placeholder="Eg: YYYY-MM-DD"
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Label>{dictionary[lang].nonResident}</Label>
              <input
                type="checkbox"
                {...register("isNrn")}
                checked={Boolean(watchIsNrn)}
              />
              <p className="text-xs text-red-500">
                {errors.isNrn && errors.isNrn.message}
              </p>
            </div>
            {watchIsNrn && (
              <div className="w-fit">
                <Label>Country</Label>
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
            )}
          </div>

          <Button disabled={isPending} className="w-fit self-end">
            {isPending ? dictionary[lang].submitting : dictionary[lang].submit}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default DaughterEditForm;
