"use client";

import { useState, ReactNode } from "react";
import { Home, Map, Camera, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CameraModal } from "@/components/camera-modal";

type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
  isCamera?: boolean;
};

const navItems: NavItem[] = [
  { id: "home", label: "ホーム", icon: <Home className="w-5 h-5" /> },
  { id: "map", label: "マップ", icon: <Map className="w-5 h-5" /> },
  { id: "camera", label: "撮影", icon: <Camera className="w-7 h-7" />, isCamera: true },
  { id: "stats", label: "統計", icon: <BarChart3 className="w-5 h-5" /> },
  { id: "profile", label: "プロフィール", icon: <User className="w-5 h-5" /> },
];

interface BottomNavigationProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function BottomNavigation({ 
  currentTab = "home",
  onTabChange 
}: BottomNavigationProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border pb-safe">
      <div className="flex items-end justify-around px-2 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.isCamera) {
                setIsCameraOpen(true);
              } else {
                onTabChange?.(item.id);
              }
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200",
              item.isCamera
                ? "relative -mt-6"
                : "min-w-[60px] py-1"
            )}
          >
            {item.isCamera ? (
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200",
                    "bg-primary text-primary-foreground",
                    currentTab === item.id
                      ? "scale-110 shadow-xl ring-4 ring-primary/30"
                      : "hover:scale-105"
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "text-[10px] mt-1 font-medium transition-colors",
                    currentTab === item.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "transition-colors",
                    currentTab === item.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    currentTab === item.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
      <CameraModal open={isCameraOpen} onOpenChange={setIsCameraOpen} />
    </nav>
  );
}
