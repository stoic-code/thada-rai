"use client";
import { removeEmptyFields } from "@hyper/web-common";
import { X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const FilterPills = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = {
    name: searchParams.get("name") || "",
    province: searchParams.get("province") || "",
    district: searchParams.get("district") || "",
    local: searchParams.get("local") || "",
    status: searchParams.get("status") || "",
    origin: searchParams.get("origin") || "",
    nickname: searchParams.get("nickname") || "",
    childIndex: searchParams.get("childIndex") || "",
    page: searchParams.get("page") || "1",
  };

  const filteredQuery = removeEmptyFields(query);
  const handleClearFilter = (key: string) => {
    const newQuery = { ...filteredQuery, [key]: "" };
    const newSearchParams = new URLSearchParams(newQuery);
    router.push(`${pathName}?${newSearchParams}`);
  };

  return (
    <div className="flex translate-y-16  gap-2 pt-4 md:translate-y-0">
      {Object.entries(filteredQuery).map(
        (d: any, idx) =>
          d[0] !== "page" && (
            <div
              className="relative rounded-full bg-gray-200 px-2 py-1 text-xs"
              key={idx}
            >
              <button
                onClick={() => handleClearFilter(d[0])}
                className="absolute -right-1 -top-1 rounded-full bg-red-500 text-white"
              >
                <X size={14} />
              </button>
              {d[1]}
            </div>
          ),
      )}
    </div>
  );
};
export default FilterPills;
