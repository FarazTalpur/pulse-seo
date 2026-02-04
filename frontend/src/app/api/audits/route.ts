import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type AuditsData = {
  issueBuckets: Array<{ label: string; count: number; color: string }>;
  auditRuns: Array<{
    site: string;
    status: string;
    issues: number;
    score: number;
    date: string;
  }>;
  recommendations: string[];
};

export async function GET() {
  const data = await readMock<AuditsData>("audits.json");
  return NextResponse.json(data);
}
