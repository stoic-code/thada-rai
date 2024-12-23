"use client";
import { useState, useEffect } from "react";
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
import { useAddPerson } from "@/hooks/mutations";
import {
  useBeforeUnload,
  useHandleLocationChanges,
  useNepaliTyping,
  useNoInputScroll,
} from "@/hooks";
import { toast } from "sonner";
import { educationalQualifications } from "@/data/qualification";
import { professions } from "@/data/profession";
import Countries from "@/data/countries.json";

const page = ({ params }: { params: { lang: string; id: string } }) => {
  const lang = params.lang;
  const query = useSearchParams();
  const person = query.get("person");

  // Locations
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");

  const [nonResident, setNonResident] = useState<boolean>(false);

  const {
    handleSubmit,
    setValue,
    register,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<TInLawSchema>({ resolver: zodResolver(inLawSchema) });
  const { mutateAsync, isPending } = useAddPerson();

  const [status, setStatus] = useState("ALIVE");
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

  const onSubmit = async (data: TInLawSchema) => {
    const formData = convertToFormData<TInLawSchema>(data);
    const route = `/family/addhusband/${person}`;
    const promise = mutateAsync({ formData, route });
    toast.promise(promise, {
      loading: "Adding data to the tree !! Please wait....",
      success: "Data added successfully in the tree !!",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  // CUSTOM HOOKS
  useBeforeUnload(isDirty);
  useNepaliTyping();
  useNoInputScroll();
  useHandleLocationChanges({
    setValue,
    trigger,
    province,
    district,
    municipality,
  });

  return (
    <Card className="mx-auto my-12 max-w-6xl">
      <CardHeader>
        <CardTitle className="text-lg">
          {dictionary[lang].titleSonInLaw}
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
                </h5>
                <div className="flex flex-col flex-wrap gap-4 md:flex-row ">
                  <div className="flex-1">
                    <Label>{dictionary[lang].province}</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                    <p className="text-xs text-red-500">
                      {errors.province ? errors.province.message : ""}
                    </p>
                  </div>
                  <div className="flex-1">
                    <Label>{dictionary[lang].district}</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                    <p className="text-xs text-red-500">
                      {errors.district ? errors.district.message : ""}
                    </p>
                  </div>
                  <div className="flex-1">
                    <Label>{dictionary[lang].local}</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                    <p className="text-xs text-red-500">
                      {errors.local ? errors.local.message : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-4 flex items-center gap-4">
                <div className="md:w-1/3">
                  <Label>{dictionary[lang].contact}</Label>
                  <Input
                    type="number"
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

export default page;
