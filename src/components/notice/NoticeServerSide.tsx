import React from "react";
import NoticeOverlay from "./NoticeOverlay";
import { getSession } from "@/actions/auth.action";

export default async function NoticeServerSide() {
  let popup;
  try {
    const session = await getSession();
    const token = session.accessToken;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/popup`,
      {
        headers: { Authorization: `bearer ${token}` },
        cache: "no-store",
      }
    );
    const data = await res.json();
    popup = data;
  } catch (err) {
    // console.log("error hai", err);
    return null;
  }
  const popups = [
    {
      secure_url: "/dashboard/temple7.jpg",
    },
    {
      secure_url: "/dashboard/temple5.jpg",
    },
    {
      secure_url: "/dashboard/temple4.jpg",
    },
    {
      secure_url: "/dashboard/temple2.jpg",
    },
  ];
  return (
    <div>
      {" "}
      {popup &&
        popup.length > 0 &&
        popup.map((p: any, idx: number) => {
          return <NoticeOverlay key={idx} imgUrl={p.image.secure_url} />;
        })}
    </div>
  );
}
