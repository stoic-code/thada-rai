import React from "react";
import {
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { logout } from "@/actions/auth.action";

const MobileLogout = () => {
  const handleLogout = async () => {
    sessionStorage.clear();
    return await logout();
  };

  return (
    <>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleLogout}
        className="bg-destructive hover:bg-red-600"
      >
        Logout
      </AlertDialogAction>
    </>
  );
};

export default MobileLogout;
