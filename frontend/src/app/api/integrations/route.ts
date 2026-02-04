import { NextResponse } from "next/server";
import { readMock } from "@/lib/mock";

type IntegrationsData = {
  integrations: Array<{ name: string; status: string; owner: string }>;
  destinations: string[];
};

export async function GET() {
  const data = await readMock<IntegrationsData>("integrations.json");
  return NextResponse.json(data);
}
