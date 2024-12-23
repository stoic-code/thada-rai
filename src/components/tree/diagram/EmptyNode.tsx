import React from "react";
import { PlusIcon } from "lucide-react";

import Link from "next/link";

const EmptyNode = () => {
  return (
    <div className="h-screen w-screen fixed mt-10">
      <div
        title="Add Banshwali Information"
        className="h-[50px] w-[50px] bg-[#ddd] rounded-full border-2 flex item-center justify-center mx-auto my-auto"
      >
        <Link
          className="flex items-center justify-center"
          href="/family/person"
        >
          <PlusIcon />
        </Link>
      </div>
    </div>
  );
};

export default EmptyNode;
