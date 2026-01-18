"use client";

import { BarChart3, Camera, Award, TrendingUp, Calendar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsView() {
  const monthlyStats = [
    { label: "今月の撮影数", value: "47", icon: <Camera className="w-5 h-5" />, color: "text-primary" },
    { label: "獲得ポイント", value: "1,240", icon: <Award className="w-5 h-5" />, color: "text-accent" },
    { label: "投稿数", value: "12", icon: <Calendar className="w-5 h-5" />, color: "text-primary" },
    { label: "達成率", value: "78%", icon: <Target className="w-5 h-5" />, color: "text-accent" },
  ];

  const weeklyData = [
    { day: "月", count: 8 },
    { day: "火", count: 12 },
    { day: "水", count: 5 },
    { day: "木", count: 10 },
    { day: "金", count: 15 },
    { day: "土", count: 7 },
    { day: "日", count: 3 },
  ];

  const maxCount = Math.max(...weeklyData.map((d) => d.count));

  return (
    <main className="pt-16 pb-24 px-4">
      {/* Header Section */}
      <section className="py-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">統計</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          あなたの活動を確認しましょう
        </p>
      </section>

      {/* Monthly Stats Grid */}
      <section className="grid grid-cols-2 gap-3 mb-6">
        {monthlyStats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={stat.color}>{stat.icon}</div>
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Weekly Activity Chart */}
      <section className="mb-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              今週の活動
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full h-24 flex items-end">
                    <div
                      className="w-full bg-primary rounded-t transition-all duration-500"
                      style={{
                        height: `${(data.count / maxCount) * 100}%`,
                        minHeight: data.count > 0 ? "4px" : "0",
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                  <span className="text-xs font-medium text-foreground">{data.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Achievements */}
      <section>
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              実績
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Award className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">植物マスター</p>
                  <p className="text-xs text-muted-foreground">100種類の植物を記録</p>
                </div>
                <span className="text-xs font-medium text-primary">達成済み</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Target className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">週間チャンピオン</p>
                  <p className="text-xs text-muted-foreground">7日連続で投稿</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">63%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
