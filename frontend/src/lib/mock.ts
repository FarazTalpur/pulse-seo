import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readMock<T>(filename: string): Promise<T> {
  const filePath = path.resolve(
    process.cwd(),
    "..",
    "backend",
    "mock-data",
    filename
  );
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
