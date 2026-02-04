import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type TeamData = {
  team: Array<{ name: string; role: string; status: string }>;
  roles: string[];
};

export async function GET() {
  const data = await readMock<TeamData>("team.json");
  return NextResponse.json(data);
}
