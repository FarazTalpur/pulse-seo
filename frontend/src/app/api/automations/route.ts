import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type AutomationsData = {
  automations: Array<{
    name: string;
    trigger: string;
    status: string;
    owner: string;
  }>;
  recipes: string[];
};

export async function GET() {
  const data = await readMock<AutomationsData>("automations.json");
  return NextResponse.json(data);
}
