import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type BriefsData = {
  briefs: Array<{
    title: string;
    type: string;
    status: string;
    owner: string;
    due: string;
  }>;
  playbooks: Array<{ name: string; desc: string }>;
};

export async function GET() {
  const data = await readMock<BriefsData>("briefs.json");
  return NextResponse.json(data);
}
