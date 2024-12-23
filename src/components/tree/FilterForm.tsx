"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FilterIcon, MenuIcon, Search, XCircle } from "lucide-react";
import { dictionary } from "@/dictionary";
import Locations from "@/data/locations.json";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { removeEmptyFields } from "@hyper/web-common";
import { useMediaQuery } from "@uidotdev/usehooks";

const FilterForm = ({ lang }: { lang: string }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const pathName = usePathname();
  const isSearchPage = pathName === "/banshwali/q";
  const [isOpen, setIsOpen] = useState(
    isSearchPage && !isSmallDevice ? true : false
  );
  const router = useRouter();

  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const province = searchParams.get("province") || "";
  const district = searchParams.get("district") || "";
  const local = searchParams.get("local") || "";
  const nickname = searchParams.get("nickname") || "";
  const origin = searchParams.get("origin") || "";
  const status = searchParams.get("status") || "";
  const childIndex = searchParams.get("childIndex") || "";
  const phone = searchParams.get("phone") || "";

  const [query, setQuery] = useState({
    name,
    province,
    district,
    nickname,
    origin,
    local,
    status,
    childIndex,
    phone,
  });

  useEffect(() => {
    if (isSearchPage) {
      onSubmit();
    }
  }, [query.district, query.province, query.local, query.status]);

  useEffect(() => {
    setQuery({
      name,
      province,
      district,
      nickname,
      origin,
      local,
      status,
      childIndex,
      phone,
    });
  }, [searchParams]);

  const onSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const filteredQuery = removeEmptyFields(query);
    const searchParams = new URLSearchParams(filteredQuery);
    router.push(`/banshwali/q?${searchParams}`);
    if (isSmallDevice) {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    router.push("/banshwali/q?status=ALIVE");
    setQuery({ ...query, name: "" });
  };

  return (
    <form onSubmit={onSubmit} className="fixed top-16 z-10 w-full">
      <div className="absolute z-[1000] left-1 top-3 flex h-10 w-[95%] items-center rounded-full  bg-white shadow-md md:w-[300px]">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          title="Advance search"
          className="mx-4"
          type="button"
        >
          <MenuIcon />
        </button>
        <div className="flex w-full items-center pr-2">
          <input
            placeholder="Ram Adhikari "
            className="w-full outline-none"
            value={query.name}
            onChange={(e) => {
              setQuery({ ...query, name: e.target.value });
            }}
          />
          <div className="flex items-center">
            {query.name.length > 0 ? (
              <button onClick={clearSearch} type="button">
                <XCircle size={20} className="text-destructive" />
              </button>
            ) : (
              <button type="submit">
                <Search size={20} className="text-neutral-300" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          transform: isOpen ? "" : "translateX(-350px)",
          opacity: isOpen ? "1" : "0",
        }}
        className="absolute left-1 top-16 z-10 w-[300px] rounded-xl bg-white shadow-md transition-all duration-300"
      >
        <div className="flex max-h-[80vh] flex-col gap-2 overflow-auto p-4">
          <div>
            <Label>{dictionary[lang].province}</Label>
            <select
              className="select"
              onChange={(e) => {
                setQuery((state) => ({
                  ...state,
                  province: e.target.value,
                  district: "",
                  local: "",
                }));
              }}
              value={query.province}
            >
              <option value="" disabled>
                प्रदेश छनोट गर्नुहोस्
              </option>
              {Locations.provinceList.map((province) => (
                <option key={province.name} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>{dictionary[lang].district}</Label>
            <select
              className="select"
              value={query.district}
              onChange={(e) => {
                setQuery((state) => ({
                  ...state,
                  district: e.target.value,
                  local: "",
                }));
              }}
            >
              <option value="" disabled>
                जिल्ला छनोट गर्नुहोस्{" "}
              </option>
              {query.province !== ""
                ? Locations.provinceList
                    .find((p) => p.name === query.province)
                    ?.districtList.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))
                : null}
            </select>
          </div>

          <div>
            <Label>{dictionary[lang].local}</Label>
            <select
              className="select"
              onChange={(e) => {
                setQuery((state) => ({ ...state, local: e.target.value }));
              }}
              value={query.local}
            >
              <option value="" disabled>
                नगरपालिका/गाउँपालिका छनोट गर्नुहोस्
              </option>
              {query.district !== "" && query.district !== ""
                ? Locations.provinceList
                    .find((p) => p.name === query.province)
                    ?.districtList.find((d) => d.name === query.district)
                    ?.municipalityList.map((mun) => (
                      <option key={mun.id} value={mun.name}>
                        {mun.name}
                      </option>
                    ))
                : null}
            </select>
          </div>
          <div>
            <Label>Status</Label>
            <select
              className="select"
              onChange={(e) =>
                setQuery((state) => ({ ...state, status: e.target.value }))
              }
              value={query.status}
            >
              <option value="ALIVE">Alive</option>
              <option value="DEAD">Dead</option>
              <option value="CONTACTLESS">Contact Less</option>
            </select>
          </div>

          <div>
            <Label>{dictionary[lang].origin}</Label>
            <Input
              value={query.origin}
              onChange={(e) =>
                setQuery((state) => ({ ...state, origin: e.target.value }))
              }
              placeholder="Enter place of origin"
            />
          </div>

          <div>
            <Label>{dictionary[lang].nickName}</Label>
            <Input
              onChange={(e) =>
                setQuery((state) => ({ ...state, nickname: e.target.value }))
              }
              placeholder="Enter nickname"
              value={query.nickname}
            />
          </div>

          <div>
            <Label>{dictionary[lang].index}</Label>
            <Input
              type="number"
              onChange={(e) =>
                setQuery((state) => ({
                  ...state,
                  childIndex: e.target.value,
                }))
              }
              placeholder="Enter child index"
              value={query.childIndex}
            />
          </div>

          <div>
            <Label>{dictionary[lang].contact}</Label>
            <Input
              type="number"
              onChange={(e) =>
                setQuery((state) => ({
                  ...state,
                  phone: e.target.value,
                }))
              }
              placeholder="Enter Phone Number"
              value={query.phone}
            />
          </div>

          <Button type="submit">
            <FilterIcon size={20} /> Filter
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
