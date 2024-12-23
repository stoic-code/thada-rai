import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const EditForm = () => {
  return (
    <>
      <CardContent>
        <form action="#" className="flex flex-col gap-4 ">
          <div className="flex gap-8">
            <div className="flex-1">
              <Label>First Name</Label>
              <Input placeholder="Ex : Bhakta Adhikari" />
            </div>
            <div className="flex-1">
              <Label>Nick Name</Label>
              <Input placeholder="Mastar Sab" />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>
            <div className="flex-1">
              <Label>Birth Place</Label>
              <Input placeholder="Ex : Kathmandu" />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <Label>Current Address</Label>
              <Input placeholder="Ex : Kathmandu" />
            </div>
            <div className="flex-1">
              <Label>Contact</Label>
              <Input type="number" placeholder="Ex : 98xxxxxxxx" />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <Label>Profession</Label>
              <Input placeholder="Ex : Teacher" />
            </div>
            <div className="flex-1">
              <Label>Organization Designation</Label>
              <Input placeholder="Ex : Member" />
            </div>
          </div>

          <div className="flex-1">
            <Label>Remarks</Label>
            <Input placeholder="Write your remarks here" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button className="border-primary text-primary" variant="outline">
          Cancel
        </Button>
        <Button>Update Profile</Button>
      </CardFooter>
    </>
  );
};

export default EditForm;
