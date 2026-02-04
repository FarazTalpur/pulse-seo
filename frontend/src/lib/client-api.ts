"use client";

export async function fetchClientJson<T>(
  path: string,
  accessToken?: string
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, {
    cache: "no-store",
    headers: buildHeaders(accessToken),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function postClientJson<T, B = unknown>(
  path: string,
  body: B,
  accessToken?: string
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, {
    method: "POST",
    headers: buildHeaders(accessToken, true),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function patchClientJson<T, B = unknown>(
  path: string,
  body: B,
  accessToken?: string
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, {
    method: "PATCH",
    headers: buildHeaders(accessToken, true),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function deleteClientJson<T>(path: string, accessToken?: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const res = await fetch(url, {
    method: "DELETE",
    headers: buildHeaders(accessToken),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

function buildHeaders(accessToken?: string, includeContentType = false) {
  const headers: Record<string, string> = {};
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}
