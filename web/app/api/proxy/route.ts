import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url);

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { error: "Failed to fetch target URL" },
        { status: 500 },
      );
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
