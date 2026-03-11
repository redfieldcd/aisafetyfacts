export interface SafetyCheck {
  label: string;
  status: boolean | null;
  detail: string;
  source: string | null;
  lastUpdated: string | null;
}

export interface PolicyPosition {
  label: string;
  value: string;
  detail: string | null;
  source: string | null;
}

export interface Incident {
  date: string;
  title: string;
  description: string;
  source: string;
  companyResponse: string | null;
}

export interface TimelineEvent {
  date: string;
  event: string;
  source: string;
}

export interface Company {
  name: string;
  slug: string;
  description: string;
  safetyDocuments: SafetyCheck[];
  testingAndEvaluation: SafetyCheck[];
  governance: SafetyCheck[];
  policyPositions: PolicyPosition[];
  incidents: Incident[];
  timeline: TimelineEvent[];
}
