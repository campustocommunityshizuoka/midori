"use client";

import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-center gap-2 px-4 py-3">
        <Leaf className="w-6 h-6 text-primary" />
        <h1 className="text-lg font-bold text-foreground tracking-wide">
          Act Street Green DX
        </h1>
      </div>
    </header>
  );
}
