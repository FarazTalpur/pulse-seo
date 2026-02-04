import { proxyGet } from "@/lib/server-api";

export async function GET() {
  return proxyGet("/v1/automations");
}
