import companiesData from "../../data/companies.json";
import { Company, SafetyCheck } from "./types";

export function getCompanies(): Company[] {
  return companiesData as Company[];
}

export function getCompany(slug: string): Company | undefined {
  return getCompanies().find((c) => c.slug === slug);
}

export function countChecks(checks: SafetyCheck[]): {
  passed: number;
  failed: number;
  total: number;
} {
  const passed = checks.filter((c) => c.status === true).length;
  const failed = checks.filter((c) => c.status === false).length;
  return { passed, failed, total: checks.length };
}

export function getAllSafetyChecks(company: Company): SafetyCheck[] {
  return [
    ...company.safetyDocuments,
    ...company.testingAndEvaluation,
    ...company.governance,
  ];
}
