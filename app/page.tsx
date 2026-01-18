"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { MainContent } from "@/components/main-content";
import { StatsView } from "@/components/stats-view";
import { ProfileView } from "@/components/profile-view";

// MapViewをSSR無効化で動的インポート
const MapView = dynamic(() => import("@/components/map-view").then((mod) => mod.MapView), {
  ssr: false,
});

export default function Home() {
  const [currentTab, setCurrentTab] = useState("home");

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <MainContent />;
      case "map":
        return (
          <div className="pt-16 pb-24">
            <MapView />
          </div>
        );
      case "stats":
        return <StatsView />;
      case "profile":
        return <ProfileView />;
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {renderContent()}
      <BottomNavigation 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
      />
    </div>
  );
}
s