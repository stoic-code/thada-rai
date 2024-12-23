import React from "react";
import { Bell, Mail } from "lucide-react";

export const SingleNotification = ({ active }: { active?: boolean }) => {
  return (
    <a
      href="/"
      className={`flex gap-2 items-center justify-between ${
        active ? "bg-[#DAEBF7]" : null
      } border-t border-b px-4 py-1`}
    >
      <div className="flex">
        <div className="w-14">
          <button className="p-2 flex items-center justify-center rounded-full bg-secondary">
            <Bell size={20} />
          </button>
        </div>
        <div className="w-[80%]">
          <h5 className={`${active ? "font-semibold" : null}`}>
            Account Renewal
          </h5>
          <p className="text-sm text-gray-600 overflow-hidden line-clamp-1">
            Please Renew your account to keep using banshwali Please Renew your
            account to keep using banshwali Please Renew your account to keep
            using banshwali
          </p>
          <span className="text-gray-500 text-xs">5 mins ago</span>
        </div>
      </div>
      <div className="w-14">
        <Mail size={20} />
      </div>
    </a>
  );
};
