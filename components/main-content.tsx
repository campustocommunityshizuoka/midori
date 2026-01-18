"use client";

import { TreeDeciduous, Flower2, Sprout, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "記録した植物",
    value: "127",
    icon: <TreeDeciduous className="w-5 h-5" />,
    color: "text-primary",
  },
  {
    label: "発見した花",
    value: "43",
    icon: <Flower2 className="w-5 h-5" />,
    color: "text-accent",
  },
  {
    label: "今月の投稿",
    value: "12",
    icon: <Sprout className="w-5 h-5" />,
    color: "text-primary",
  },
  {
    label: "連続日数",
    value: "7",
    icon: <Sun className="w-5 h-5" />,
    color: "text-accent",
  },
];

const recentActivities = [
  {
    title: "桜の木を発見",
    location: "中央公園",
    time: "2時間前",
  },
  {
    title: "ツツジの群生地",
    location: "駅前通り",
    time: "昨日",
  },
  {
    title: "新緑の並木道",
    location: "川沿い遊歩道",
    time: "3日前",
  },
];

export function MainContent() {
  return (
    <main className="pt-16 pb-24 px-4">
      {/* Welcome Section */}
      <section className="py-6">
        <h2 className="text-xl font-bold text-foreground mb-1">
          こんにちは！
        </h2>
        <p className="text-muted-foreground text-sm">
          今日も街の緑を探しに行きましょう
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
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

      {/* Recent Activity */}
      <section>
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              最近のアクティビティ
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <TreeDeciduous className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.location}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="mt-6 text-center">
        <div className="bg-secondary/50 rounded-xl p-6 border border-border">
          <TreeDeciduous className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-1">
            新しい緑を見つけよう
          </h3>
          <p className="text-sm text-muted-foreground">
            カメラボタンをタップして
            <br />
            街の植物を記録しましょう
          </p>
        </div>
      </section>
    </main>
  );
}
