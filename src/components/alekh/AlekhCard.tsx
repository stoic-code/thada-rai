import React from "react";

export default function AlekhCard({ a }: { a: any }) {
  return (
    <div>
      <div className="bg-white p-4 w-fit rounded-3xl cursor-pointer">
        <img
          width={250}
          src={a.image.secure_url}
          alt=""
          className="h-32 rounded-3xl object-cover"
        />
        <h2 className="text-lg py-2 font-medium">{a.title}</h2>
        <p
          className="  text-muted-foreground line-clamp-4 "
          dangerouslySetInnerHTML={{ __html: `${a.desc}` }}
        ></p>
        <div className="flex pt-4 justify-between text-xs">
          <p>2081-10-20</p>
          <p>{a.author}</p>
        </div>
      </div>
    </div>
  );
}
