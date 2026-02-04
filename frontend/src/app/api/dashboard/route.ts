import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type DashboardData = {
  stats: Array<{ label: string; value: string; note: string }>;
  alerts: Array<{ title: string; detail: string; time: string; level: string }>;
  tasks: Array<{ title: string; detail: string; owner: string; status: string }>;
  opportunities: Array<{ page: string; gain: string; reason: string }>;
  briefs: Array<{ title: string; status: string; eta: string }>;
  clusters: Array<{
    keyword: string;
    volume: string;
    difficulty: string;
    intent: string;
    trend: string;
  }>;
  automations: Array<{ title: string; detail: string }>;
  integrations: Array<{ title: string; status: string }>;
};

export async function GET() {
  const data = await readMock<DashboardData>("dashboard.json");
  return NextResponse.json(data);
}
