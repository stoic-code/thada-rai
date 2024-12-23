"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import NepaliDate from "nepali-datetime";

import {
  TDaughterSchema,
  daughterSchema,
} from "@/schema/banshwali/daughter.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";

import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";
import { convertToFormData } from "@/lib/form";
import { dictionary } from "@/dictionary";
import { useBeforeUnload, useNepaliTyping, useNoInputScroll } from "@/hooks";
import FormErr from "@/components/form/FormErr";
import { STATUS } from "@/schema/constants";
import { toast } from "sonner";
import { useAddPerson } from "@/hooks/mutations";
import { cn } from "@/lib/utils";
import { bsToAd } from "@/lib/date";
import { professions } from "@/data/profession";
import { educationalQualifications } from "@/data/qualification";
import Countries from "@/data/countries.json";

const page = ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const lang = params.lang;
  const query = useSearchParams();
  const mother = query.get("mother");
  const motherArr = JSON.parse(mother ? mother : "[]");
  const type = query.get("type");
  const person = query.get("person");
  const fatherId = query.get("fatherId");

  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<TDaughterSchema>({
    resolver: zodResolver(daughterSchema),
    defaultValues: {
      mother: motherArr?.length === 1 ? `${motherArr[0].id}` : "",
    },
  });
  console.log(errors);
  const { mutateAsync, isPending } = useAddPerson();
  const [status, setStatus] = useState<STATUS>(STATUS.alive);
  const isAlive = status === STATUS.alive;
  const [marriageStatus, setMarriageStatus] = useState("unmarried");
  const handleDeathStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as STATUS);
  };

  const handleMarriageStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarriageStatus(e.target.value);
  };
  const watchIsNrn = watch("isNrn");

  useEffect(() => {
    setValue("status", status);
    if (status !== STATUS.alive) {
      trigger();
    }
  }, [status]);

  useEffect(() => {
    if (!watchIsNrn) {
      setValue("country", "नेपाल");
      trigger("country");
    }
  }, [watchIsNrn]);

  const onSubmit = async (data: TDaughterSchema) => {
    const formData = convertToFormData({ ...data });
    if (marriageStatus === "divorced") {
      formData.append("divorced", "true");
    }
    // formData.append("motherId", data.mother!);

    const route = `/family/adddaughter/${fatherId}/${data.mother}`;
    // await mutateAsync({ formData, route });
    toast.promise(mutateAsync({ formData, route }), {
      loading: "Please wait adding data in family tree...",
      success: "Daughter's data added successfully !!",
      error: (err) => err.messsage || "Something went wrong !!",
    });

    // HANDLE BIRTHDATE CONVIRSION
    // try {
    //   // let birthDate;
    //   // if (data.birthDate) {
    //   //   birthDate = bsToAd(data.birthDate);
    //   // }
    // } catch (err: any) {
    //   toast.error(err.message || "Something went wrong");
    // }
  };

  // CUSTOM HOOKS
  // useBeforeUnload(isDirty);
  useNepaliTyping();
  useNoInputScroll();

  return (
    <Card className="mx-auto my-12 max-w-6xl">
      <CardHeader>
        <CardTitle className="text-lg">
          {type === "sister"
            ? dictionary[lang].titleSister
            : dictionary[lang].titleDaughter}
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
              <Label>{dictionary[lang].index}</Label>
              <Input
                type="number"
                {...register("childIndex")}
                placeholder="Eg: १"
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
                placeholder={`Eg : ९८xxxxxxxx`}
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

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            {motherArr.length >= 2 && (
              <div className="md:w-1/3">
                <Label>Mother's Name</Label>
                <select
                  className={cn(
                    "select",
                    !watch("mother") || watch("mother") === ""
                      ? "text-muted-foreground"
                      : ""
                  )}
                  {...register("mother")}
                >
                  <option value="" disabled>
                    आमा चयन गर्नुहोस ।
                  </option>
                  {motherArr.map((m: any) => (
                    <option key={m.id} value={`${m.id}`}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <FormErr>{errors.mother?.message}</FormErr>
              </div>
            )}
          </div>

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

export default page;
