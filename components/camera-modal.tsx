"use client";

import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CameraModal({ open, onOpenChange }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { toast } = useToast();

  // カメラを起動
  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open]);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // 背面カメラを優先
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error("カメラの起動に失敗しました:", err);
      setError("カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。");
      toast({
        title: "エラー",
        description: "カメラへのアクセスに失敗しました",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = async () => {
    if (!videoRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // キャンバスに画像を描画
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("キャンバスのコンテキストを取得できませんでした");
      }

      ctx.drawImage(videoRef.current, 0, 0);
      
      // Base64に変換
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      
      // APIを呼び出し
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "画像解析に失敗しました");
      }

      const data = await response.json();
      const description = data.description || "画像の解析が完了しました";
      
      // 結果を保存してDialogを表示
      setAnalysisResult(description);
      setResultDialogOpen(true);
      
      // カメラモーダルを閉じる
      onOpenChange(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "画像の解析に失敗しました";
      setError(errorMessage);
      toast({
        title: "エラー",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="p-4 pb-2">
          <DialogTitle>カメラ</DialogTitle>
        </DialogHeader>
        
        <div className="relative bg-black aspect-[4/3] flex items-center justify-center">
          {error ? (
            <div className="text-white text-center p-4">
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>

        <div className="p-4 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isLoading}
          >
            <X className="w-4 h-4 mr-2" />
            キャンセル
          </Button>
          <Button
            onClick={captureImage}
            className="flex-1"
            disabled={isLoading || !!error}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                解析中...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-2" />
                撮影
              </>
            )}
          </Button>
        </div>
      </DialogContent>

      {/* 解析結果表示Dialog */}
      <Dialog open={resultDialogOpen} onOpenChange={setResultDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              解析結果
            </DialogTitle>
            <DialogDescription className="pt-2">
              {analysisResult}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setResultDialogOpen(false)}>
              閉じる
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
