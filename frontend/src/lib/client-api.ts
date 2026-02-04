"use client";

export async function fetchClientJson<T>(path: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function postClientJson<T, B = unknown>(
  path: string,
  body: B
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function patchClientJson<T, B = unknown>(
  path: string,
  body: B
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function deleteClientJson<T>(path: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}
