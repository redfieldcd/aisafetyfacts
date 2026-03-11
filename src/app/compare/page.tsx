import type { Metadata } from "next";
import Link from "next/link";
import { getCompanies } from "@/lib/data";
import { SafetyCheck } from "@/lib/types";

export const metadata: Metadata = {
  title: "Compare AI Safety Practices — AI Safety Facts",
  description:
    "Side-by-side comparison of AI safety practices across major AI companies.",
};

function StatusCell({ status }: { status: boolean | null }) {
  if (status === true) return <span title="Yes">✅</span>;
  if (status === false) return <span title="No">❌</span>;
  return <span title="Unknown">⚠️</span>;
}

export default function ComparePage() {
  const companies = getCompanies();

  const safetyDocLabels = companies[0].safetyDocuments.map((d) => d.label);
  const testingLabels = companies[0].testingAndEvaluation.map((d) => d.label);
  const governanceLabels = companies[0].governance.map((d) => d.label);

  function getStatus(
    companySlug: string,
    section: "safetyDocuments" | "testingAndEvaluation" | "governance",
    label: string
  ): boolean | null {
    const company = companies.find((c) => c.slug === companySlug);
    if (!company) return null;
    const checks = company[section] as SafetyCheck[];
    const check = checks.find((c) => c.label === label);
    return check?.status ?? null;
  }

  function renderSection(
    title: string,
    labels: string[],
    section: "safetyDocuments" | "testingAndEvaluation" | "governance"
  ) {
    return (
      <>
        <tr>
          <td
            colSpan={companies.length + 1}
            className="bg-card-bg px-4 py-3 font-mono font-semibold text-accent text-sm border-t border-card-border"
          >
            {title}
          </td>
        </tr>
        {labels.map((label) => (
          <tr key={label} className="border-t border-card-border">
            <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">
              {label}
            </td>
            {companies.map((company) => (
              <td
                key={company.slug}
                className="px-4 py-3 text-center text-base"
              >
                <StatusCell
                  status={getStatus(company.slug, section, label)}
                />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-mono text-3xl font-bold mb-3">
          Compare AI Safety Practices
        </h1>
        <p className="text-muted text-lg">
          Side-by-side comparison of safety practices across major AI companies.
        </p>
      </div>

      <div className="overflow-x-auto border border-card-border rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-card-border bg-card-bg">
              <th className="px-4 py-3 text-left font-mono font-semibold text-muted sticky left-0 bg-card-bg z-10">
                Criteria
              </th>
              {companies.map((company) => (
                <th
                  key={company.slug}
                  className="px-4 py-3 text-center font-mono font-semibold min-w-[100px]"
                >
                  <Link
                    href={`/company/${company.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {company.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderSection(
              "Safety Documents",
              safetyDocLabels,
              "safetyDocuments"
            )}
            {renderSection(
              "Testing & Evaluation",
              testingLabels,
              "testingAndEvaluation"
            )}
            {renderSection("Governance", governanceLabels, "governance")}

            <tr>
              <td
                colSpan={companies.length + 1}
                className="bg-card-bg px-4 py-3 font-mono font-semibold text-accent text-sm border-t border-card-border"
              >
                Policy Positions
              </td>
            </tr>
            {["Military use", "Surveillance use", "Open-source models"].map(
              (label) => (
                <tr key={label} className="border-t border-card-border">
                  <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">
                    {label}
                  </td>
                  {companies.map((company) => {
                    const pos = company.policyPositions.find(
                      (p) => p.label === label
                    );
                    const value = pos?.value ?? "Unknown";
                    return (
                      <td
                        key={company.slug}
                        className="px-4 py-3 text-center text-xs font-mono"
                      >
                        <span
                          className={`px-2 py-0.5 rounded ${
                            value === "Banned"
                              ? "bg-danger/20 text-danger"
                              : value === "Restricted"
                                ? "bg-warning/20 text-warning"
                                : value === "Yes"
                                  ? "bg-safe/20 text-safe"
                                  : value === "No"
                                    ? "bg-danger/20 text-danger"
                                    : value === "Partial"
                                      ? "bg-warning/20 text-warning"
                                      : "bg-muted/20 text-muted"
                          }`}
                        >
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              )
            )}

            <tr>
              <td
                colSpan={companies.length + 1}
                className="bg-card-bg px-4 py-3 font-mono font-semibold text-accent text-sm border-t border-card-border"
              >
                Incidents
              </td>
            </tr>
            <tr className="border-t border-card-border">
              <td className="px-4 py-3 text-sm text-foreground">
                Reported incidents
              </td>
              {companies.map((company) => (
                <td
                  key={company.slug}
                  className="px-4 py-3 text-center font-mono text-sm"
                >
                  {company.incidents.length}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
