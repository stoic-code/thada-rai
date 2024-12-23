"use client";
import React, { useState } from "react";
import { SingleNotification } from "@/components/notification/SingleNotification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";

const NotificationCard = () => {
  const [isOn, setOn] = useState(false);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-primary">Notifications</CardTitle>
          <div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-[100%]">
        <div className="border">
          <SingleNotification active />
          <SingleNotification />
          <SingleNotification />
          <SingleNotification />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
