"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { MainContent } from "@/components/main-content";

// MapViewをSSR無効化で動的インポート
const MapView = dynamic(() => import("@/components/map-view").then((mod) => mod.MapView), {
  ssr: false,
});

export default function Home() {
  const [currentTab, setCurrentTab] = useState("home");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {currentTab === "map" ? (
        <div className="pt-16 pb-24">
          <MapView />
        </div>
      ) : (
        <MainContent />
      )}
      <BottomNavigation 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
      />
    </div>
  );
}
