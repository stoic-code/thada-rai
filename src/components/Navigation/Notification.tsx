import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { NotificationList } from "../notification";

const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <span className="absolute right-[-5px] top-0 flex items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">
            3
          </span>
          <Bell />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[20rem] p-0">
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
