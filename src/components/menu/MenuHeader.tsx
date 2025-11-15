import React from "react";
import { Button } from "~/components/ui/button";
import { QRCodeCanvas as QRCode } from "qrcode.react";

interface MenuHeaderProps {
  restaurantName: string;
  location: string;
  restaurantId: string;
}

export default function MenuHeader({
  restaurantName,
  location,
  restaurantId,
}: MenuHeaderProps) {

  return (
    <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-start space-x-1 px-4 py-4">
        <h1 className="text-xl font-semibold">{restaurantName}</h1>
        <p className="text-sm text-slate-600">{location}</p>
      </div>
    </div>
  );
}
