"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { MainContent } from "@/components/main-content";
import { MapView } from "@/components/map-view";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {activeTab === "map" ? (
        <div className="pt-16 pb-24">
          <MapView />
        </div>
      ) : (
        <MainContent />
      )}
      <BottomNavigation 
        currentTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  );
}
