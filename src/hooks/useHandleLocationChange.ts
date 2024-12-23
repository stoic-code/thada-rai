import { useEffect } from "react";
import Locations from "@/data/locations.json";

type TProps = {
  setValue: any;
  trigger: any;
  province: any;
  district: any;
  municipality: any;
};

export const useHandleLocationChanges = ({
  setValue,
  trigger,
  province,
  district,
  municipality,
}: TProps) => {
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
          .name || "",
      );
      trigger("district");
    }
  }, [district]);

  useEffect(() => {
    if (district.length !== 0) {
      setValue(
        "local",
        Locations.provinceList[Number(province)].districtList[Number(district)]
          .municipalityList[Number(municipality)].name,
      );
      trigger("local");
    }
  }, [municipality]);
};
