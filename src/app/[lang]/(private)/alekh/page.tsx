"use client";
import { useEffect, useState } from "react";
import PageLoadingUI from "@/components/PageLoadingUI";
import { Button } from "@/components/ui/button";
import { useGetAlekhs } from "@/hooks/query/alekh.query";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import AlekhCard from "@/components/dashboard/AlekhCard";
import { dateFormatter } from "@/lib/date";

export default function page() {
  const { lang } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 200);

  const { data: alekhs, isLoading } = useGetAlekhs();

  useEffect(() => {
    router.push(`${pathname}?q=${search}`);
  }, [searchTerm]);

  if (isLoading) return <PageLoadingUI />;
  return (
    <div className=" 2xl:container px-4 space-y-4">
      {/* HEADING PART */}
      <div className=" flex justify-between items-center">
        <h2 className=" text-3xl font-semibold py-10">
          {lang === "en" ? "Aalekh" : "आलेख "}
        </h2>
        <div className=" flex items-center gap-2">
          <div className="flex items-center gap-2  w-fit p-2 bg-white  border-2 rounded-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" outline-none text-sm "
            />
            <Search />
          </div>
          <Button asChild className="  h-10">
            <Link href={"/alekh/new"}>Add Alekh</Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="grid gap-8 pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {alekhs.map((a: any, idx: number) => {
            return (
              <Link href={`/alekh/${a._id}`} key={idx} className="">
                <AlekhCard
                  thumbnail={a.image.secure_url}
                  author={a.author}
                  title={a.title}
                  createdAt={dateFormatter(a.createdAt)}
                  desc={a.body}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
