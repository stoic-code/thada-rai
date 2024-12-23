"use client";
import React from "react";
import {
  Contact,
  GitMerge,
  LayoutDashboard,
  LogOut,
  Network,
  UserCog,
  HelpingHand,
  CircleEllipsis,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Image from "next/image";
import { dictionary } from "./dictionary";
import { useSession } from "@/providers/SessionProvider";
import { logout } from "@/actions/auth.action";
import { useParams } from "next/navigation";

const SideNav = () => {
  const { lang } = useParams();
  const menus = [
    {
      title: lang === "en" ? "Dashboard" : "ड्यासबोर्ड",
      icon: <LayoutDashboard />,
      to: "/profile",
    },
    {
      title: lang === "en" ? "Edit Profile" : " प्रोफाइल सम्पादन गर्नुहोस्",
      icon: <UserCog />,
      to: "/profile/edit",
    },
    {
      title: lang === "en" ? "ID Card " : "परिचय पत्र",
      icon: <Contact />,
      to: "/profile/idcard",
    },
    {
      title: lang === "en" ? " Merge Requests" : "मर्ज अनुरोध",
      icon: <Network />,
      to: "/profile/merge",
    },
    {
      title: lang === "en" ? "Contributions" : "योगदानहरू",
      icon: <HelpingHand />,
      to: "/profile/contributions",
    },
    {
      title: lang === "en" ? "Others" : "अन्य",
      icon: <CircleEllipsis />,
      to: "/profile/others",
    },
  ];

  const {
    session: { user },
  } = useSession();

  const dict = dictionary[lang as keyof typeof dictionary];
  const pathname = usePathname();

  return (
    <div className="hidden w-64 flex-col items-center border-r bg-white py-4 xl:flex">
      <Image
        src={user?.imgurl ? user.imgurl : "/avatar.jpg"}
        width={500}
        height={500}
        alt="user image"
        className="h-36 w-36 rounded-full border-2 border-primary object-cover"
      />
      <input type="file" className="hidden" />
      <h2
        style={{ fontWeight: 500 }}
        className="mb-8 mt-2 line-clamp-2 px-2 text-center text-xl text-black"
      >
        {user?.name}
      </h2>

      <ul
        className={cn(
          "w-full text-sm px-2 space-y-4",
          lang === "np" ? "text-base" : ""
        )}
      >
        {menus.map((d, idx) => (
          <li key={idx}>
            <Link
              className={cn(
                "flex cursor-pointer gap-1 rounded-sm px-4 py-2 transition-all duration-100 hover:bg-accent/60",
                pathname === d.to ? "bg-accent" : null
              )}
              href={d.to}
            >
              {d.icon}
              {d.title}
            </Link>
          </li>
        ))}

        <li>
          {user?.role === "EDITOR" && (
            <Link
              className={cn(
                "flex cursor-pointer gap-1 border-b px-4 py-3 transition-all duration-100 hover:bg-sky-100",
                pathname.startsWith("/profile/tree-edit") ? "bg-sky-100" : null
              )}
              href="/profile/tree-edit/add"
            >
              <Network size={20} />
              {dict.editTree}
            </Link>
          )}
        </li>

        <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <li className="flex cursor-pointer gap-1 px-4 py-3 text-red-500 transition-all duration-100 hover:bg-sky-100">
              <LogOut size={20} />
              <span className="">Log Out</span>
            </li>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  sessionStorage.clear();

                  await logout();
                }}
                className="bg-destructive hover:bg-red-600"
              >
                {lang === "en" ? "Logout" : "लग आउट गर्नुहोस्"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ul>
    </div>
  );
};

export default SideNav;
