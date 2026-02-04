import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type SettingsData = {
  settings: Array<{ label: string; value: string }>;
  notifications: string[];
};

export async function GET() {
  const data = await readMock<SettingsData>("settings.json");
  return NextResponse.json(data);
}
