import { getSession } from "@/actions/auth.action";
import LoggedInNavigation from "@/components/Navigation/LoggedInNavigation";
import NoticeOverlay from "@/components/notice/NoticeOverlay";
import NoticeServerSide from "@/components/notice/NoticeServerSide";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NoticeServerSide />
      <LoggedInNavigation />
      {children}
    </>
  );
};

export default layout;
