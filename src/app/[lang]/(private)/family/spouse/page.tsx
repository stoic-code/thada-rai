"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
import { dictionary } from "@/dictionary";
import { useBeforeUnload, useNepaliTyping, useNoInputScroll } from "@/hooks";
import { STATUS } from "@/schema/constants";
import { useSession } from "@/providers/SessionProvider";
import useScrollToError from "@/hooks/useScrollToError";
import { useAddPerson } from "@/hooks/mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { educationalQualifications } from "@/data/qualification";
import { professions } from "@/data/profession";
import Countries from "@/data/countries.json";

const page = ({ params }: { params: { lang: string } }) => {
  const router = useRouter();
  const {
    session: { user },
  } = useSession();
  const lang = params.lang;
  const query = useSearchParams();
  const person = query.get("person");

  /**
   * If not found use case should be removed
   */
  const type = query.get("type");
  const isEditor = user?.role === "EDITOR";

  const {
    handleSubmit,
    setValue,
    register,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<TspouseSchema>({ resolver: zodResolver(spouseSchema) });
  const { mutateAsync, isPending } = useAddPerson();

  const [status, setStatus] = useState(STATUS.alive);
  const isAlive = status === STATUS.alive;

  const handleDeathStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as STATUS);
  };

  const [nonResident, setNonResident] = useState<boolean>(false);
  const watchIsNrn = watch("isNrn");
  // trigger isNRN
  useEffect(() => {
    if (!watchIsNrn) {
      setValue("country", "नेपाल");
      trigger("country");
    }
  }, [watchIsNrn]);

  // trigger when changing to alive and death
  useEffect(() => {
    setValue("status", status);
    if (status !== STATUS.alive) {
      trigger();
    }
  }, [status]);

  const onSubmit = async (data: TspouseSchema) => {
    const formData = convertToFormData<TspouseSchema>(data);
    const route = `/family/addwife/${person}`;
    toast.promise(mutateAsync({ formData, route }), {
      loading: "Please wait... !! Adding spouse data in the tree !!",
      success: "Spouse data added successfully on the tree !!",
      error: (err) =>
        err.message || "Spouse data added successfully on the tree !!",
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
          {dictionary[lang].titleSpouse}
        </CardTitle>
      </CardHeader>
      <div className="p-4">
        <form
          method="POST"
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1">
            <ImageUploadBtn url="" trigger={trigger} setValue={setValue} />
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
              <Label>{dictionary[lang].dob}</Label>
              <Input {...register("birthDate")} placeholder="Eg : १९९९-०१-०१" />
              <p className="text-xs text-red-500">
                {errors.birthDate ? errors.birthDate.message : ""}
              </p>
            </div>

            <div className="md:flex-1">
              <Label>{dictionary[lang].childCount}</Label>
              <Input
                {...register("childrenCount")}
                placeholder={`Eg : १`}
                defaultValue={0}
                type="number"
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

          <div className="w-full md:w-1/3">
            <Label>{dictionary[lang].maiti}</Label>
            <Input
              {...register("maiti")}
              placeholder={`Eg : खोटाङ`}
              data-nepali="true"
              required={false}
            />
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

export default page;
