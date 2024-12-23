import SideBar from "@/components/profile/edit/SideBar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-2">
      <h1 className="pb-10 text-xl font-semibold md:text-3xl">
        Update Profile
      </h1>
      <div className="flex flex-col md:flex-row">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
