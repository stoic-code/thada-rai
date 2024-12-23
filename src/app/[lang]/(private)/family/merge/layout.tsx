import BackBtn from "@/components/BackBtn";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <BackBtn className="absolute top-3 left-2 z-10" />
      {children}
    </div>
  );
};

export default layout;
