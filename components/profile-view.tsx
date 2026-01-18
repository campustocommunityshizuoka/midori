"use client";

import { User, MapPin, Mail, Calendar, Award, Settings, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileView() {
  const userInfo = {
    name: "山田 太郎",
    affiliation: "静岡大学",
    email: "yamada@example.com",
    joinDate: "2024年1月",
    totalPoints: 1240,
    rank: "植物マスター",
  };

  const menuItems = [
    { icon: <Settings className="w-5 h-5" />, label: "設定", onClick: () => {} },
    { icon: <HelpCircle className="w-5 h-5" />, label: "ヘルプ", onClick: () => {} },
  ];

  return (
    <main className="pt-16 pb-24 px-4">
      {/* Profile Header */}
      <section className="py-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                <User className="w-12 h-12 text-primary" />
              </div>
              
              {/* User Info */}
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">{userInfo.name}</h2>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{userInfo.affiliation}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 pt-2">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-primary mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-lg font-bold">{userInfo.totalPoints}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ポイント</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-primary mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-lg font-bold">{userInfo.joinDate}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">参加日</p>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="w-full pt-4 border-t border-border">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{userInfo.rank}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info */}
      <section className="mb-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              連絡先情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-foreground">{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-foreground">{userInfo.affiliation}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Menu Items */}
      <section>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="text-muted-foreground">{item.icon}</div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
