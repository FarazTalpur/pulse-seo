"use client";

import useSWR from "swr";
import { fetchClientJson } from "@/lib/client-api";
import { useSession } from "next-auth/react";

type Fetcher<T> = (accessToken?: string) => Promise<T>;

export function useApi<T>(key: string, fetcher: Fetcher<T>) {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const shouldFetch = status === "authenticated" && !!accessToken;

  const { data, error, isLoading } = useSWR<T>(
    shouldFetch ? [key, accessToken] : null,
    ([url, token]) => fetcher(token)
  );

  return { data, error, isLoading: status === "loading" || isLoading };
}

export type DashboardData = {
  stats: Array<{ label: string; value: string; note: string }>;
  alerts: Array<{ title: string; detail: string; time: string; level: string }>;
  tasks: Array<{ title: string; detail: string; owner: string; status: string }>;
  opportunities: Array<{ page: string; gain: string; reason: string }>;
  briefs: Array<{ title: string; status: string; eta: string }>;
  clusters: Array<{
    keyword: string;
    volume: string;
    difficulty: string;
    intent: string;
    trend: string;
  }>;
  automations: Array<{ title: string; detail: string }>;
  integrations: Array<{ title: string; status: string }>;
};

export type AuditsData = {
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

export type BriefsData = {
  briefs: Array<{
    title: string;
    type: string;
    status: string;
    owner: string;
    due: string;
  }>;
  playbooks: Array<{ name: string; desc: string }>;
};

export type ReportsData = {
  reports: Array<{
    name: string;
    cadence: string;
    recipients: string;
    status: string;
  }>;
  exports: Array<{ name: string; type: string; time: string }>;
  templates: string[];
};

export type AutomationsData = {
  automations: Array<{
    name: string;
    trigger: string;
    status: string;
    owner: string;
  }>;
  recipes: string[];
};

export type IntegrationsData = {
  integrations: Array<{ name: string; status: string; owner: string }>;
  destinations: string[];
};

export type SettingsData = {
  settings: Array<{ label: string; value: string }>;
  notifications: string[];
};

export type TeamData = {
  team: Array<{ name: string; role: string; status: string }>;
  roles: string[];
};

export type SummaryData = {
  version: string;
  updated: string;
  notes: string;
};

export const useDashboard = () =>
  useApi<DashboardData>("/v1/dashboard", (token) =>
    fetchClientJson<DashboardData>("/v1/dashboard", token)
  );

export const useAudits = () =>
  useApi<AuditsData>("/v1/audits", (token) =>
    fetchClientJson<AuditsData>("/v1/audits", token)
  );

export const useBriefs = () =>
  useApi<BriefsData>("/v1/briefs", (token) =>
    fetchClientJson<BriefsData>("/v1/briefs", token)
  );

export const useReports = () =>
  useApi<ReportsData>("/v1/reports", (token) =>
    fetchClientJson<ReportsData>("/v1/reports", token)
  );

export const useAutomations = () =>
  useApi<AutomationsData>("/v1/automations", (token) =>
    fetchClientJson<AutomationsData>("/v1/automations", token)
  );

export const useIntegrations = () =>
  useApi<IntegrationsData>("/v1/integrations", (token) =>
    fetchClientJson<IntegrationsData>("/v1/integrations", token)
  );

export const useSettings = () =>
  useApi<SettingsData>("/v1/settings", (token) =>
    fetchClientJson<SettingsData>("/v1/settings", token)
  );

export const useTeam = () =>
  useApi<TeamData>("/v1/team", (token) =>
    fetchClientJson<TeamData>("/v1/team", token)
  );

export const useSummary = () =>
  useApi<SummaryData>("/v1/summary", (token) =>
    fetchClientJson<SummaryData>("/v1/summary", token)
  );
