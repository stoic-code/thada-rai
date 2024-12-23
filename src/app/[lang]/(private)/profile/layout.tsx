import React, { ReactNode } from "react";
import SideNav from "@/components/profile/SideNav";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main suppressHydrationWarning className="flex min-h-screen 2xl:container">
      <SideNav />
      <div className="w-full bg-white lg:p-8">{children}</div>
    </main>
  );
};

export default layout;
