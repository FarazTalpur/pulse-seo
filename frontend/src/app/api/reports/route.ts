import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type ReportsData = {
  reports: Array<{
    name: string;
    cadence: string;
    recipients: string;
    status: string;
  }>;
  exports: Array<{ name: string; type: string; time: string }>;
  templates: string[];
};

export async function GET() {
  const data = await readMock<ReportsData>("reports.json");
  return NextResponse.json(data);
}
