// apps/frontend/app/api/learning-situation/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/learning-situation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en proxy /api/learning-situation:", error);
    return NextResponse.json(
      { error: "Error interno al generar la situación" },
      { status: 500 }
    );
  }
}
