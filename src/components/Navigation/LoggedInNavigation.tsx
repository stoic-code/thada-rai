"use client";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import "./Navigation.css";

import { ChevronDown } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components//ui/avatar";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  aboutMenu,
  articleMenus,
  banshwaliMenu,
  committeeMenu,
  privateMenu,
} from "./menus";
import { MobileMenu } from "./LoggedInMobileNavigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Notification from "./Notification";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import HamburgerIcon from "./HamburgerIcon";
import { useSession } from "@/providers/SessionProvider";

const LoggedInNavigation = () => {
  const {
    session: { user },
  } = useSession();
  const { lang } = useParams();
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);

  const articleMenusLang = articleMenus[lang as keyof typeof articleMenus];
  const privateMenus = privateMenu[lang as keyof typeof privateMenu];
  const aboutMenus = aboutMenu[lang as keyof typeof aboutMenu];
  const comitteeMenus = committeeMenu[lang as keyof typeof committeeMenu];
  const banshwaliMenus = banshwaliMenu[lang as keyof typeof committeeMenu];

  return (
    <>
      <MobileMenu lang={lang} state={mobileNav} setState={setMobileNav} />
      <nav
        className={cn(
          "shadow-b border-b sticky top-0 z-50 flex h-16 items-center justify-between px-4 text-black shadow-sm xl:px-12 bg-white",
          pathname.startsWith("/profile") && "static",
        )}
      >
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2"
        >
          <img alt="" src="/logo.webp" height={60} width={60} />
          <span className="flex flex-col font-semibold">
            {lang === "en"
              ? "Thadarai Adhikari Sewa Samaj"
              : `ठाडाराई अधिकारी सेवा समाज , नेपाल`}
          </span>
        </Link>
        <ul className="hidden items-center gap-5 xl:flex">
          {privateMenus.map((menu: any) =>
            menu.to == "banshwali" ? (
              <DropdownMenu key={menu.id}>
                <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                  {menu.title} <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {banshwaliMenus.map((item) => (
                    <DropdownMenuItem asChild key={item.id}>
                      <Link href={item.to}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : menu.to === "article" ? (
              <DropdownMenu key={menu.id}>
                <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                  {menu.title} <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {articleMenusLang.map((item) => (
                    <DropdownMenuItem asChild key={item.id}>
                      <Link href={item.to}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : menu.to === "about" ? (
              <DropdownMenu key={menu.id}>
                <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                  {menu.title} <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {aboutMenus.map((item) =>
                    item.to === "committee" ? (
                      <DropdownMenuSub key={item.id}>
                        <DropdownMenuSubTrigger>
                          {item.title}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {comitteeMenus.map((menu) => (
                              <DropdownMenuItem key={menu.id} asChild>
                                <Link
                                  className="h-full w-full"
                                  href={`${menu.to}`}
                                >
                                  {menu.title}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem asChild key={item.id}>
                        <Link href={item.to}>{item.title}</Link>
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <li key={menu.id}>
                <Link
                  href={menu.to}
                  className={`link cursor-pointer ${cn(
                    pathname === menu.to ? "active" : null,
                  )}`}
                >
                  {menu.title}
                </Link>
              </li>
            ),
          )}
          <LanguageSwitcher />
          <div className="flex gap-8">
            <Popover>
              <PopoverContent className="w-[20rem] p-0">
                <Notification />
              </PopoverContent>
            </Popover>
            <Notification />
            <Link href="/profile">
              <Avatar className="w-10 cursor-pointer">
                <AvatarImage className="object-cover" src={user?.imgurl} />
                <AvatarFallback>
                  {String(user?.name.trim().split(" ")[0][0]) +
                    String(
                      user?.name.trim().split(" ")[
                        user?.name.trim().split(" ").length - 1
                      ][0],
                    )}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </ul>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher />
          {
            /* <button
            onClick={() => {
              setMobileNav(!mobileNav);
            }}
          >
            {mobileNav ? <X /> : <MenuIcon />}
          </button> */
            <HamburgerIcon open={mobileNav} setOpen={setMobileNav} />
          }
        </div>
      </nav>
    </>
  );
};

export default LoggedInNavigation;
