"use client";
import { dictionary } from "@/app/[lang]/(private)/yogdan/dictionary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import React, { useEffect, useState } from "react";

export default function YogdanHeader() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 200);

  useEffect(() => {
    router.push(`${pathname}?q=${search}`);
  }, [searchTerm]);

  const params = useParams();
  const { lang } = params;
  const dict = dictionary[lang as keyof typeof dictionary];

  const yogdanTabs = [
    {
      title: dict.all,
      to: "/yogdan",
    },
    {
      title: dict.social,
      to: "/yogdan/social",
    },
    {
      title: dict.political,
      to: "/yogdan/political",
    },
    {
      title: dict.others,
      to: "/yogdan/others",
    },
  ];
  return (
    <div>
      {" "}
      <div>
        <div className="mx-auto rounded-lg bg-white px-4 py-2">
          <h1 className="my-2 text-xl font-semibold text-black md:text-3xl">
            {dict.bansaj_yogdan}
          </h1>
          <div className="flex flex-col gap-2 lg:flex-row xl:items-end xl:justify-between">
            <ul className="flex gap-4 sm:gap-6 py-1">
              {yogdanTabs.map((y: any, idx: number) => {
                const isActive = pathname == y.to;
                console.log("activeee", isActive);
                return (
                  <Link
                    className={cn(
                      " no-underline border-b-2 border-transparent",
                      isActive ? "border-primary" : " border-transparent",
                    )}
                    href={y.to}
                    key={idx}
                  >
                    {y.title}
                  </Link>
                );
              })}
            </ul>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex max-w-full gap-4">
                <form
                  onSubmit={(e) => {
                    const form = e.target as HTMLFormElement;
                    const name = form[0] as HTMLInputElement;
                    e.preventDefault();
                    // setParams({ ...query, name: name.value });
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 ring-gray-300 focus-within:ring-2 focus-within:ring-offset-2"
                >
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent py-2 outline-none focus:outline-none"
                    placeholder="Search..."
                  />
                  <button>
                    <Search className="text-primary" />
                  </button>
                </form>
              </div>
              <Button className="flex gap-1 hover:bg-blue-800">
                <Link className="flex gap-2" href="/yogdan/new">
                  <Plus /> {dict.add_contributions}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
