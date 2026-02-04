"use client";

import useSWR from "swr";
import { fetchClientJson } from "@/lib/client-api";

type Fetcher<T> = () => Promise<T>;

export function useApi<T>(key: string, fetcher: Fetcher<T>) {
  const { data, error, isLoading } = useSWR<T>(key, fetcher);
  return { data, error, isLoading };
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
  useApi<DashboardData>("/v1/dashboard", () =>
    fetchClientJson<DashboardData>("/v1/dashboard")
  );

export const useAudits = () =>
  useApi<AuditsData>("/v1/audits", () =>
    fetchClientJson<AuditsData>("/v1/audits")
  );

export const useBriefs = () =>
  useApi<BriefsData>("/v1/briefs", () =>
    fetchClientJson<BriefsData>("/v1/briefs")
  );

export const useReports = () =>
  useApi<ReportsData>("/v1/reports", () =>
    fetchClientJson<ReportsData>("/v1/reports")
  );

export const useAutomations = () =>
  useApi<AutomationsData>("/v1/automations", () =>
    fetchClientJson<AutomationsData>("/v1/automations")
  );

export const useIntegrations = () =>
  useApi<IntegrationsData>("/v1/integrations", () =>
    fetchClientJson<IntegrationsData>("/v1/integrations")
  );

export const useSettings = () =>
  useApi<SettingsData>("/v1/settings", () =>
    fetchClientJson<SettingsData>("/v1/settings")
  );

export const useTeam = () =>
  useApi<TeamData>("/v1/team", () => fetchClientJson<TeamData>("/v1/team"));

export const useSummary = () =>
  useApi<SummaryData>("/v1/summary", () =>
    fetchClientJson<SummaryData>("/v1/summary")
  );
