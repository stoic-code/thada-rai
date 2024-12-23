"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import Locations from "@/data/locations.json";
import Countries from "@/data/countries.json";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { selfSchema, TSelfSchema } from "@/schema/banshwali/person.schema";

import CompulsoryLabel from "@/components/form/CompulsoryLabel";

import { convertToFormData } from "@/lib/form";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";

import { dictionary } from "@/dictionary";
import FormErr from "@/components/form/FormErr";
import {
  useBeforeUnload,
  useHandleLocationChanges,
  useNepaliTyping,
  useNoInputScroll,
} from "@/hooks";
import { useAddPerson } from "@/hooks/mutations";
import { useSession } from "@/providers/SessionProvider";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { professions } from "@/data/profession";
import { educationalQualifications } from "@/data/qualification";

const page = ({ params }: { params: { lang: string } }) => {
  const {
    session: { user },
  } = useSession();
  const lang = params.lang || "en";
  const pathName = usePathname();
  const query = useSearchParams();
  const add = query.get("add");
  const child = query.get("child");
  const mother = query.get("mother");
  const fatherId = query.get("fatherId");
  const motherArr = JSON.parse(mother ? mother : "[]");
  const isSelf = pathName === "/family/person";

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors, isDirty },
  } = useForm<TSelfSchema>({
    resolver: zodResolver(selfSchema),
    defaultValues: {
      status: "ALIVE",
      mother: motherArr?.length === 1 ? `${motherArr[0].id}` : "",
      self: isSelf,
    },
  });
  const { mutateAsync, isPending } = useAddPerson();

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [nonResident, setNonResident] = useState<boolean>(false);

  const [status, setStatus] = useState("ALIVE");
  const isAlive = status === "ALIVE";
  const isDead = status === "DEAD";

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

  const onSubmit = async (data: TSelfSchema) => {
    console.log("son detail: ", data);
    const { mother } = data;
    const isEditor = user?.role === "EDITOR";
    const formData = convertToFormData(data);
    const route =
      add === "father"
        ? `/family/addfather/${child}`
        : add === "son"
        ? `${
            isEditor
              ? `/family/addson/${fatherId}/${mother}`
              : `/family/addownson/${mother}`
          }`
        : "/family/addmyself";

    toast.promise(mutateAsync({ formData, route }), {
      loading: "Please wait adding person's data to the tree !!",
      success: "Person data added successfully in the tree !!",
      error: (err) =>
        err.message || "Something went wrong while adding person !!",
    });
  };

  // trigger when changing to alive and death
  useEffect(() => {
    setValue("status", status);
    if (status !== "ALIVE") {
      trigger();
    }
  }, [status]);

  // CUSTOM HOOKS
  // useBeforeUnload(isDirty);
  useNepaliTyping();
  useNoInputScroll();
  useHandleLocationChanges({
    setValue,
    trigger,
    province,
    district,
    municipality,
  });

  // console.log(errors);
  return (
    <Card className="mx-auto my-12 max-w-6xl">
      <CardHeader className="mb-0 pb-0">
        <CardTitle className="mb-0 pb-0 text-lg">
          {add === "father"
            ? dictionary[lang].titleFather
            : add === "son"
            ? dictionary[lang].titleSon
            : dictionary[lang].titleSelf}
        </CardTitle>
      </CardHeader>
      <div className="p-4">
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex-1">
            <ImageUploadBtn trigger={trigger} setValue={setValue} />
            <FormErr>{errors.image?.message as string}</FormErr>
          </div>

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].firstName}</CompulsoryLabel>
              <Input
                {...register("firstName")}
                placeholder={`Eg : राम `}
                data-nepali="true"
              />
              <FormErr>{errors.firstName?.message}</FormErr>
            </div>

            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].lastName}</CompulsoryLabel>
              <Input
                {...register("lastName")}
                defaultValue={getValues("lastName")}
                disabled
                placeholder={`अधिकारी`}
              />
              <FormErr>{errors.lastName?.message}</FormErr>
            </div>

            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].englishName}</CompulsoryLabel>
              <Input
                {...register("englishName")}
                type=""
                placeholder={`Eg : Ram Adhikari`}
                className="capitalize"
              />
              <FormErr>{errors.englishName?.message}</FormErr>
            </div>
          </div>

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <div className="flex-1">
              <CompulsoryLabel>{dictionary[lang].index}</CompulsoryLabel>
              <Input
                {...register("childIndex")}
                placeholder="Eg: 1"
                type="number"
              />
              <FormErr>{errors.childIndex?.message}</FormErr>
            </div>

            <div className="flex-1">
              <Label>{dictionary[lang].nickName}</Label>
              <Input
                {...register("nickName")}
                placeholder={`Eg : मास्टर साब`}
                data-nepali="true"
              />
              {errors.nickName?.message}
            </div>

            <div className="flex-1">
              <Label>{dictionary[lang].birthPlace}</Label>
              <Input
                {...register("birthPlace")}
                placeholder="Eg: काठमाडौँ"
                data-nepali="true"
              />
              <FormErr>{errors.birthPlace?.message}</FormErr>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-1/2">
              <Label>{dictionary[lang].origin}</Label>
              <Input
                {...register("origin")}
                placeholder="Eg: काठमाडौँ "
                data-nepali="true"
              />
              <FormErr>{errors.origin?.message}</FormErr>
            </div>

            <div className="md:w-1/2">
              <Label>{dictionary[lang].remarks}</Label>
              <Textarea
                {...register("remarks")}
                placeholder="Eg: पाँचथर - राँके - ईलाम - बिर्तामोड - काठमाडौं"
                data-nepali="true"
                rows={1}
              />
              <FormErr>{errors.remarks?.message}</FormErr>
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

          {motherArr.length >= 2 && (
            <div className="flex flex-col flex-wrap gap-4 md:flex-row">
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
            </div>
          )}

          {add === "father" || add === "son" ? (
            <div className="my-4 flex items-center gap-4">
              <div className="flex gap-2">
                <input
                  onChange={handleDeathStatus}
                  id="alive"
                  type="radio"
                  value="ALIVE"
                  checked={status === "ALIVE"}
                />
                <Label htmlFor="alive">{dictionary[lang].alive}</Label>
              </div>

              <div className="flex gap-2">
                <input
                  id="dead"
                  type="radio"
                  value="DEAD"
                  onChange={handleDeathStatus}
                  checked={status === "DEAD"}
                />
                <Label htmlFor="dead">{dictionary[lang].dead}</Label>
              </div>

              <div className="flex gap-2">
                <input
                  id="contact_less"
                  type="radio"
                  value="CONTACTLESS"
                  onChange={handleDeathStatus}
                  checked={status === "CONTACTLESS"}
                />
                <Label htmlFor="contact_less">
                  {dictionary[lang].contactLess}
                </Label>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            {isAlive && (
              <div className="md:w-1/3">
                <Label>{dictionary[lang].contact}</Label>
                <Input
                  {...register("phone")}
                  type="number"
                  placeholder="Eg: 98xxxxxxxx"
                />
                <FormErr>{errors.phone?.message}</FormErr>
              </div>
            )}

            <div className="md:w-1/3">
              <Label>{dictionary[lang].dob}</Label>
              <Input {...register("birthDate")} placeholder="Eg: १९९९-०१-०१" />
              <FormErr>{errors.birthDate?.message}</FormErr>
            </div>

            {isDead && (
              <div className="md:w-1/3">
                <Label>{dictionary[lang].deathDate}</Label>
                <Input
                  {...register("deathDate")}
                  placeholder="Eg: १९९९-०१-०१"
                  // data-nepali="true"
                />
                <FormErr>{errors.deathDate?.message}</FormErr>
              </div>
            )}
          </div>

          {isAlive && (
            <>
              <div>
                <h5 className="my-2 font-semibold">
                  {dictionary[lang].currentAddress}
                </h5>
                <div className="flex flex-col flex-wrap gap-4 md:flex-row ">
                  <div className="flex-1">
                    <Label>{dictionary[lang].province}</Label>
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
                        <option key={province.id} value={index}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <FormErr>{errors.province?.message}</FormErr>
                  </div>
                  <div className="flex-1">
                    <Label>{dictionary[lang].district}</Label>
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
                        ? Locations.provinceList[
                            Number(province)
                          ].districtList.map((district, index) => (
                            <option key={district.id} value={index}>
                              {district.name}
                            </option>
                          ))
                        : null}
                    </select>
                    <FormErr>{errors.district?.message}</FormErr>
                  </div>
                  <div className="flex-1">
                    <Label>{dictionary[lang].local}</Label>
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
                        ? Locations.provinceList[Number(province)].districtList[
                            Number(district)
                          ].municipalityList.map((mun, index) => (
                            <option key={mun.id} value={index}>
                              {mun.name}
                            </option>
                          ))
                        : null}
                    </select>
                    <FormErr>{errors.local?.message}</FormErr>
                  </div>
                </div>
              </div>

              <div>
                <div className="md:w-1/3">
                  <Label>{dictionary[lang].ward}</Label>
                  <Input
                    type="number"
                    {...register("ward")}
                    placeholder="Eg: ०५ "
                  />
                  <FormErr>{errors.ward?.message}</FormErr>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col flex-wrap gap-4 md:flex-row"></div>

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

          <Button disabled={isPending} className="self-end">
            {isPending ? dictionary[lang].submitting : dictionary[lang].submit}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default page;
