"use client";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="max-w-sm flex-1 space-y-3">
      <div>
        <CompulsoryLabel>Current Password</CompulsoryLabel>
        <Input placeholder="Enter your old password" />
      </div>

      <div>
        <CompulsoryLabel>New Password</CompulsoryLabel>
        <Input placeholder="Enter a new password" />
      </div>
      <div>
        <CompulsoryLabel>Confirm Password</CompulsoryLabel>
        <Input placeholder="Enter a new password" />
      </div>

      <Button className="flex w-fit gap-2">
        <Save className="inline w-4" />
        Save
      </Button>
    </div>
  );
};

export default page;
