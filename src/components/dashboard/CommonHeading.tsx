import Link from "next/link";
import React from "react";

export default function CommonHeading({
  title,
  link_title,
  link_src,
}: {
  title: string;
  link_title: string;
  link_src: string;
}) {
  return (
    <div>
      <div className=" flex justify-between items-center  text-black  font-semibold">
        <h2 className="text-sm sm:text-3xl">{title}</h2>
        <Link href={link_src} className=" text-sm">
          {link_title}
        </Link>
      </div>
    </div>
  );
}
