"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { convertToFormData } from "@/lib/form";

import { zodResolver } from "@hookform/resolvers/zod";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";

import Locations from "@/data/locations.json";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { dictionary } from "@/dictionary";
import { TInLawSchema, inLawSchema } from "@/schema/banshwali/inlaw.schema";
import FormErr from "@/components/form/FormErr";
import { useEditDetails } from "@/hooks/mutations";
import { toast } from "sonner";
import { useBeforeUnload, useNepaliTyping, useNoInputScroll } from "@/hooks";
import { professions } from "@/data/profession";
import { educationalQualifications } from "@/data/qualification";
import Countries from "@/data/countries.json";

const InlawEditForm = ({
  lang,
  data,
  id,
}: {
  lang: string;
  id: string;
  data: any;
}) => {
  const query = useSearchParams();
  const person = query.get("person");

  // Locations
  const [province, setProvince] = useState(data.province ? data.province : "");
  const [district, setDistrict] = useState(data.district ? data.district : "");
  const [municipality, setMunicipality] = useState(
    data.local ? data.local : ""
  );

  const [nonResident, setNonResident] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<TInLawSchema>({
    resolver: zodResolver(inLawSchema),
    defaultValues: {
      ...data,
      birthDate: data.birthdate,
      deathDate: data.deathdate,
      updateForm: true,
    },
  });
  const { mutateAsync, isPending } = useEditDetails(
    `/family/updatehusband/${id}`
  );

  const [status, setStatus] = useState(data.status);
  const isAlive = status === "ALIVE";
  const isDead = status === "DEAD";
  const isContactLess = status === "CONTACTLESS";
  const handleDeathStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const watchIsNrn = watch("isNrn");
  // trigger isNRN
  useEffect(() => {
    if (!watchIsNrn) {
      setValue("country", "नेपाल");
      trigger("country");
    }
  }, [watchIsNrn]);

  useEffect(() => {
    setValue("status", status);
    if (!isAlive) {
      trigger();
    }
  }, [status]);

  useEffect(() => {
    if (province?.length !== 0) {
      setValue(
        "province",
        Locations.provinceList.find((p) => p.name === province)?.name || ""
      );
      trigger("province");
    }
  }, [province]);

  useEffect(() => {
    if (province?.length !== 0) {
      setValue(
        "district",
        Locations.provinceList
          .find((p) => p.name === province)
          ?.districtList.find((d) => d.name === district)?.name || ""
      );
      trigger("district");
    }
  }, [district]);

  useEffect(() => {
    if (district?.length !== 0) {
      setValue(
        "local",
        Locations.provinceList
          .find((p) => p.name === province)
          ?.districtList.find((d) => d.name === district)
          ?.municipalityList.find((m) => m.name === municipality)?.name
      );
      trigger("local");
    }
  }, [municipality]);

  const onSubmit = async (data: TInLawSchema) => {
    // console.log(data);
    const formData = convertToFormData<TInLawSchema>(data);
    const promise = mutateAsync(formData).then(() => router.push("/family"));
    toast.promise(promise, {
      loading: "Please wait updating data...",
      success: "Data has been updated successfully !!",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  // CUSTOM HOOKS
  useBeforeUnload(isDirty);
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
                placeholder={`Eg : राम`}
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
                data-nepali="true"
                placeholder={`Eg : बुडाथोकि`}
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
                placeholder={`Eg : Ram Koirala`}
                className="capitalize"
              />
              <p className="text-xs text-red-500">
                {errors.englishName ? errors.englishName.message : ""}
              </p>
            </div>
          </div>

          <div className="md:w-1/3">
            <Label>{dictionary[lang].dob}</Label>
            <Input {...register("dob")} placeholder="Eg :  १९९९-०१-०१" />
            <p className="text-xs text-red-500">
              {errors.dob ? errors.dob.message : ""}
            </p>
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
                value="ALIVE"
                checked={isAlive}
              />
              <Label htmlFor="alive">{dictionary[lang].alive}</Label>
            </div>

            <div className="flex gap-2">
              <input
                id="dead"
                type="radio"
                value="DEAD"
                onChange={handleDeathStatus}
                checked={isDead}
              />
              <Label htmlFor="dead">{dictionary[lang].dead}</Label>
            </div>

            <div className="flex gap-2">
              <input
                onChange={handleDeathStatus}
                id="contact_less"
                type="radio"
                value="CONTACTLESS"
                checked={isContactLess}
              />
              <Label htmlFor="contact_less">
                {dictionary[lang].contactLess}
              </Label>
            </div>
          </div>

          {isAlive && (
            <>
              <div>
                <h5 className="my-2 font-semibold">
                  {dictionary[lang].currentAddress}
                  <span className="text-red-500">*</span>
                </h5>
                <div className="flex flex-col flex-wrap gap-4 md:flex-row ">
                  <div className="flex-1">
                    <CompulsoryLabel>
                      {dictionary[lang].province}
                    </CompulsoryLabel>
                    <select
                      className="select"
                      name=""
                      id=""
                      onChange={(e) => {
                        setProvince(e.target.value);
                      }}
                      defaultValue={province}
                    >
                      <option value="" disabled>
                        प्रदेश छनोट गर्नुहोस्
                      </option>
                      {Locations.provinceList.map((province, index) => (
                        <option key={province.id} value={province.name}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <FormErr>{errors.province?.message}</FormErr>
                  </div>
                  <div className="flex-1">
                    <CompulsoryLabel>
                      {dictionary[lang].district}
                    </CompulsoryLabel>
                    <select
                      className="select"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDistrict(e.target.value);
                      }}
                      defaultValue={district}
                    >
                      <option value="" disabled>
                        जिल्ला छनोट गर्नुहोस्{" "}
                      </option>
                      {province
                        ? Locations.provinceList
                            .find((p) => p.name === province)
                            ?.districtList.map((district) => (
                              <option key={district.id} value={district.name}>
                                {district.name}
                              </option>
                            ))
                        : null}
                    </select>
                    <FormErr>{errors.district?.message}</FormErr>
                  </div>
                  <div className="flex-1">
                    <CompulsoryLabel>{dictionary[lang].local}</CompulsoryLabel>
                    <select
                      className="select"
                      name=""
                      id=""
                      onChange={(e) => {
                        setMunicipality(e.target.value);
                      }}
                      defaultValue={municipality}
                    >
                      <option value="" disabled>
                        नगरपालिका/गाउँपालिका छनोट गर्नुहोस्
                      </option>
                      {province && district
                        ? Locations.provinceList
                            .find((p) => p.name === province)
                            ?.districtList.find((d) => d.name === district)
                            ?.municipalityList.map((mun) => (
                              <option key={mun.id} value={mun.name}>
                                {mun.name}
                              </option>
                            ))
                        : null}
                    </select>
                    <FormErr>{errors.local?.message}</FormErr>
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            {isDead ? (
              <div className="md:w-1/3">
                <Label>{dictionary[lang].deathDate}</Label>
                <Input
                  {...register("deathDate")}
                  placeholder="Eg: १९९९-०१-०१"
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
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default InlawEditForm;
