import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function KulthanMandir() {
  return (
    <div>
      <div className="   space-y-4">
        <div className=" flex justify-between items-center text-black text-sm sm:text-2xl font-semibold">
          <h2>Kulthan Mandir</h2>
          <div className="border border-primary/50 text-sm w-40 sm:w-fit flex items-center gap-1  p-2 rounded-lg bg-white">
            <input
              type="text"
              className="w-full bg-white outline-none font-normal"
            />
            <Search
              size={16}
              className="flex-shrink-0 text-muted-foreground/50"
            />
          </div>
        </div>
        <div className=" flex sm:flex-row flex-col gap-4">
          <Image
            alt="pic"
            src={"/dashboard/temple3.jpg"}
            height={400}
            width={400}
            className=" w-auto sm:w-[30%] h-[30vh] flex-shrink-0 object-cover rounded-md"
          />
          <div className=" space-y-2">
            <h2 className=" text-black font-semibold text-xl">
              Kul Than Mandri Name
            </h2>
            <h2 className=" flex gap-1 items-center text-black  text-sm">
              <MapPin className=" text-green-500" size={16} /> Kul Than Mandri
              Name
            </h2>
            <div>
              <p className="  line-clamp-4 lg:line-clamp-none">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eveniet voluptatem, eaque quaerat culpa aliquid corrupti quidem
                dicta accusamus rem laudantium ipsum distinctio, possimus
                corporis sequi ipsa consectetur assumenda excepturi? Numquam
                atque ex iusto velit quae suscipit fugiat sint? Autem cupiditate
                necessitatibus quisquam rerum quae aut fugiat vitae deserunt ut
                praesentium. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Odit sed eum illum perferendis temporibus impedit
                sapiente, soluta ducimus possimus nesciunt quae perspiciatis
                nihil dolore consequatur corporis nemo accusamus est voluptatum
                repellendus quam voluptas atque commodi saepe? Dolorem rem
                officiis ex perferendis, eligendi voluptatum voluptates vero
                aliquam qui exercitationem voluptas fuga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
