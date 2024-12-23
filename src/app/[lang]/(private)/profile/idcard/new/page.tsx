"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import { Button } from "@/components/ui/button";

import Locations from "@/data/locations.json";
import { useForm } from "react-hook-form";
import { idCardSchema, TIdCardSchema } from "@/schema/idcard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageUploadBtn } from "@/components/tree/ImageUploadBtn";
import FormErr from "@/components/form/FormErr";
// import { uploadToCloudinary } from "@/lib/cloudinary";

import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { objectToFormData } from "@/lib/form";
import { useAddIdCard } from "@/hooks/mutations/idcard.mutation";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TIdCardSchema>({ resolver: zodResolver(idCardSchema) });
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [date, setDate] = useState("");
  const { mutateAsync, isPending } = useAddIdCard();

  useEffect(() => {
    if (date.length > 1) {
      setValue("birth_date", date);
      trigger("birth_date");
    }
  }, [date]);

  // const values = useWatch({ control });

  useEffect(() => {
    if (province.length !== 0) {
      setValue("province", Locations.provinceList[Number(province)].name || "");
      trigger("province");
    }
  }, [province]);

  useEffect(() => {
    if (province.length !== 0) {
      setValue(
        "district",
        Locations.provinceList[Number(province)].districtList[Number(district)]
          .name || ""
      );
      trigger("district");
    }
  }, [district]);

  useEffect(() => {
    if (district.length !== 0) {
      setValue(
        "local",
        Locations.provinceList[Number(province)].districtList[Number(district)]
          .municipalityList[Number(municipality)].name
      );
      trigger("local");
    }
  }, [municipality]);

  // GENDER
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("gender", e.target.value);
  };

  const onSubmit = async (data: TIdCardSchema) => {
    const formData = objectToFormData(data);
    const promise = mutateAsync(formData);
    toast.promise(promise, {
      loading: "Submiting for request ....",
      success:
        "ID card request submitted successfully. Once admin approves it, you will be able to view your ID card",
      error: (err) => err.message || "Something went wrong !!",
    });
  };

  return (
    <div className="min-h-screen max-w-3xl gap-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="m-2">
          <CardHeader>
            <CardTitle>ID Card Request</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <ImageUploadBtn setValue={setValue} trigger={trigger} />
              {<FormErr>{errors.image?.message}</FormErr>}
            </div>
            <div>
              <CompulsoryLabel>Full Name</CompulsoryLabel>
              <Input
                {...register("full_name")}
                placeholder="Eg : Ram Bahadur Adhikari"
              />
              <p className="text-xs text-red-500">
                {errors.full_name ? errors.full_name.message : ""}
              </p>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1">
                <CompulsoryLabel>Date Of Birth</CompulsoryLabel>
                {/* 
                <Input {...register("dob")} placeholder="Eg: YYYY-MM-DD" /> */}

                <NepaliDatePicker
                  inputClassName="select"
                  value={date}
                  onChange={(value: string) => setDate(value)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                />
                <p className="text-xs text-red-500">
                  {errors.birth_date ? errors.birth_date.message : ""}
                </p>
              </div>
              <div className="flex-1">
                <CompulsoryLabel>Blood Group</CompulsoryLabel>
                <select
                  {...register("blood_group")}
                  className="select"
                  defaultValue=""
                >
                  <option value="">Select Blood Group</option>
                  <option value="A(+ve)">A(+ve)</option>
                  <option value="A(-ve)">A(-ve)</option>
                  <option value="B(+ve)">B(+ve)</option>
                  <option value="B(-ve)">B(-ve)</option>
                  <option value="O(+ve)">O(+ve)</option>
                  <option value="O(-ve)">O(-ve)</option>
                  <option value="AB(+ve)">AB(+ve)</option>
                  <option value="AB(-ve)">AB(-ve)</option>
                </select>
                <p className="text-xs text-red-500">
                  {errors.blood_group ? errors.blood_group.message : ""}
                </p>
              </div>
            </div>

            <div>
              <CompulsoryLabel>Birth Place</CompulsoryLabel>
              <Input
                {...register("birth_place")}
                placeholder="Eg : Kathmandu"
              />
              <p className="text-xs text-red-500">
                {errors.birth_place ? errors.birth_place.message : ""}
              </p>
            </div>

            <div className="flex-1">
              <CompulsoryLabel>Province</CompulsoryLabel>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name=""
                id=""
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                defaultValue={province}
              >
                <option value="" disabled>
                  Select Province
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
              <Label>District</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name=""
                id=""
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
                defaultValue={district}
              >
                <option value="" disabled>
                  Select District
                </option>
                {province
                  ? Locations.provinceList[Number(province)].districtList.map(
                      (district, index) => (
                        <option key={district.id} value={index}>
                          {district.name}
                        </option>
                      )
                    )
                  : null}
              </select>
              <p className="text-xs text-red-500">
                {errors.district ? errors.district.message : ""}
              </p>
            </div>
            <div className="flex-1">
              <CompulsoryLabel>Local Level/Municipality</CompulsoryLabel>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                name=""
                id=""
                onChange={(e) => {
                  setMunicipality(e.target.value);
                }}
                defaultValue={municipality}
              >
                <option value="" disabled>
                  Select Municipality
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
            <div className="flex gap-2">
              <div className="flex-1">
                <CompulsoryLabel>Ward</CompulsoryLabel>
                <Input {...register("ward")} placeholder="Eg : 08" />
                <p className="text-xs text-red-500">
                  {errors.ward ? errors.ward.message : ""}
                </p>
              </div>
              <div className="flex-1">
                <CompulsoryLabel>Contact</CompulsoryLabel>
                <Input {...register("contact")} placeholder="98xxxxxxxx" />
                <p className="text-xs text-red-500">
                  {errors.contact ? errors.contact.message : ""}
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
                <Label>Profession</Label>
                <Input {...register("profession")} placeholder="Eg : Teacher" />
                <p className="text-xs text-red-500">
                  {errors.profession ? errors.profession.message : ""}
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-1">
                <CompulsoryLabel>Organizational Post</CompulsoryLabel>
                <Input
                  {...register("org_position")}
                  placeholder="Eg : National Chairman"
                />
                <p className="text-xs text-red-500">
                  {errors.org_position ? errors.org_position.message : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <CompulsoryLabel>Gender</CompulsoryLabel>
              <div className="flex w-[80%] justify-between">
                <div className="flex gap-2">
                  <input
                    onChange={handleGenderChange}
                    type="radio"
                    id="male"
                    name="gender"
                    value="पुरुष"
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="महिला"
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="others"
                    name="gender"
                    value="अन्य"
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="others">Others</label>
                </div>
              </div>

              <p className="text-xs text-red-500">
                {errors.gender ? errors.gender.message : ""}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full gap-4">
              {/* <Button
                variant="outline"
                className="border-primary text-primary flex-1"
              >
                Cancel
              </Button> */}
              <Button disabled={isSubmitting} className="flex-1">
                {isSubmitting && <Loader size={20} className="animate-spin" />}{" "}
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>

      {/*         
      <div className="w-[200px] scale-[65%] md:scale-[80%] md:px-16 lg:scale-100">
        <h2 className="my-4 w-full text-xl font-semibold text-black lg:my-0 lg:mb-4">
          Preview
        </h2>
        <IdentityCard values={values} />
      </div> */}
    </div>
  );
};

export default page;
