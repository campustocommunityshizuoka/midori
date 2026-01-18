"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import L from "leaflet";

// react-leafletをSSR無効化で動的インポート
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// LeafletのCSSを動的に読み込む
if (typeof window !== "undefined") {
  require("leaflet/dist/leaflet.css");
  
  // マーカーアイコンのデフォルト設定（Next.jsで必要）
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
}

export function MapView({ 
  center = [34.725, 137.717], // 静岡大学付近のデフォルト座標
  zoom = 15 
}: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // クライアント側でのみレンダリング
  if (!isClient) {
    return (
      <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
        <p className="text-muted-foreground">地図を読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" style={{ minHeight: "calc(100vh - 200px)" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            現在地
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
