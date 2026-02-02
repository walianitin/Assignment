import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://extdataportal.worldbank.org/api/BReady/api/Data/TopicPillars";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const indicator = searchParams.get("indicator");

  if (!indicator) {
    return NextResponse.json(
      { error: "Indicator parameter is required" },
      { status: 400 }
    );
  }

  try {
    const encodedIndicator = encodeURIComponent(indicator);
    const url = `${BASE_URL}?Level=Pillar&indicator=${encodedIndicator}&Project=Bready%202025`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching indicator data:", error);
    return NextResponse.json(
      { error: "Failed to fetch indicator data" },
      { status: 500 }
    );
  }
}
