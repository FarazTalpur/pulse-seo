import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type Summary = {
  version: string;
  updated: string;
  notes: string;
};

export async function GET() {
  const data = await readMock<Summary>("summary.json");
  return NextResponse.json(data);
}
