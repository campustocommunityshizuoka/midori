import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { MainContent } from "@/components/main-content";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MainContent />
      <BottomNavigation />
    </div>
  );
}
