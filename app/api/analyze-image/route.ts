import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "画像データが提供されていません" },
        { status: 400 }
      );
    }

    // 環境変数からAPIキーを取得（デフォルトは空文字）
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

    if (!apiKey) {
      // APIキーが設定されていない場合、ダミーレスポンスを返す
      return NextResponse.json({
        description: "APIキーが設定されていません。環境変数 NEXT_PUBLIC_OPENAI_API_KEY を設定してください。",
      });
    }

    // Base64データからdata:image/jpeg;base64,のプレフィックスを除去
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    // OpenAI APIを呼び出し
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "この画像に写っているものを日本語で詳しく説明してください。植物や自然に関するものであれば、特に詳しく説明してください。",
              },
              {
                type: "image_url",
                image_url: {
                  url: image, // Base64データURIをそのまま使用
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `OpenAI APIエラー: ${response.statusText}`
      );
    }

    const data = await response.json();
    const description =
      data.choices?.[0]?.message?.content ||
      "画像の解析に失敗しました";

    return NextResponse.json({ description });
  } catch (error) {
    console.error("画像解析エラー:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "画像の解析中にエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
