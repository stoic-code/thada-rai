"use client";
import Link from "next/link";
import React from "react";
import CardWithImgCircle from "./yogdan/CardWithImgCircle";
import { useGetLiteratures } from "@/hooks/query/literatures.query";
import { useParams } from "next/navigation";
import CommonHeading from "./dashboard/CommonHeading";

const LiteratureDashboard = () => {
  const { lang } = useParams();
  const { data, isLoading } = useGetLiteratures();

  if (isLoading) return null;

  return (
    <div className="mx-2 py-8 md:mx-auto">
      <CommonHeading
        title={
          lang === "np"
            ? "नयाँ थपिएका साहित्य संगालो"
            : "Recent Literatures Collections"
        }
        link_title={lang === "np" ? "थप हेर्नुहोस" : "See All"}
        link_src="/literature"
      />
      <div className="pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {data?.map(
            (d: any, idx: number) =>
              idx < 3 && (
                <Link
                  href={`/literature/${d._id.toString()}`}
                  key={d._id.toString()}
                >
                  <CardWithImgCircle
                    image={d.author_image.secure_url}
                    desc={d.title}
                    name={d.author}
                  />
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default LiteratureDashboard;
