import React, { useRef } from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { Button } from '~/components/ui/button';

interface QRMenuShareProps {
  restaurantId: string;
}

export default function QRMenuShare({ restaurantId }: QRMenuShareProps) {
  const menuUrl = `${process.env.NEXT_PUBLIC_APP_URL}/menu/${restaurantId}`;
  const qrRef = useRef<HTMLCanvasElement>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(menuUrl);
    alert('Menu URL copied to clipboard!');
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const url = qrRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'menu-qr.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold">Share Your Menu</h2>
      <QRCode
        value={menuUrl}
        size={180}
        level="H"
        includeMargin={true}
        ref={qrRef}
      />
      <a
        href={menuUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate w-full text-center text-blue-600 hover:underline"
      >
        {menuUrl}
      </a>
      <Button variant="outline" className="w-full" onClick={copyToClipboard}>
        Copy Menu Link
      </Button>
      <Button variant="outline" className="w-full" onClick={downloadQRCode}>
        Download QR Code
      </Button>
    </div>
  );
}
