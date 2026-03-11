import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCompanies, getCompany } from "@/lib/data";
import { SafetyCheck, PolicyPosition, Incident, TimelineEvent } from "@/lib/types";

export function generateStaticParams() {
  return getCompanies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return { title: "Not Found" };
  return {
    title: `${company.name} AI Safety — AI Safety Facts`,
    description: `AI safety practices, policies, and incident history for ${company.name}.`,
  };
}

function SourceLink({ href }: { href: string | null }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-accent hover:underline ml-1"
      title="View source"
    >
      🔗
    </a>
  );
}

function StatusIcon({ status }: { status: boolean | null }) {
  if (status === true) return <span className="text-safe text-lg">✅</span>;
  if (status === false) return <span className="text-danger text-lg">❌</span>;
  return <span className="text-warning text-lg">⚠️</span>;
}

function CheckSection({
  title,
  checks,
}: {
  title: string;
  checks: SafetyCheck[];
}) {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
        {title}
      </h2>
      <div className="border border-card-border rounded-lg overflow-hidden">
        {checks.map((check, i) => (
          <div
            key={check.label}
            className={`flex items-start gap-3 p-4 ${
              i > 0 ? "border-t border-card-border" : ""
            }`}
          >
            <StatusIcon status={check.status} />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{check.label}</div>
              <div className="text-muted text-xs mt-0.5">
                {check.detail}
                <SourceLink href={check.source} />
              </div>
              {check.lastUpdated && (
                <div className="text-muted/60 text-xs mt-0.5">
                  Last updated: {check.lastUpdated}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PolicySection({ positions }: { positions: PolicyPosition[] }) {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
        Policy Positions
      </h2>
      <div className="border border-card-border rounded-lg overflow-hidden">
        {positions.map((pos, i) => (
          <div
            key={pos.label}
            className={`flex items-start gap-3 p-4 ${
              i > 0 ? "border-t border-card-border" : ""
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{pos.label}:</span>
                <span
                  className={`text-sm font-mono px-2 py-0.5 rounded ${
                    pos.value === "Banned"
                      ? "bg-danger/20 text-danger"
                      : pos.value === "Restricted"
                        ? "bg-warning/20 text-warning"
                        : pos.value === "Yes"
                          ? "bg-safe/20 text-safe"
                          : pos.value === "No"
                            ? "bg-danger/20 text-danger"
                            : pos.value === "Unknown"
                              ? "bg-muted/20 text-muted"
                              : "bg-card-border text-foreground"
                  }`}
                >
                  {pos.value}
                </span>
              </div>
              {pos.detail && (
                <div className="text-muted text-xs mt-1">
                  {pos.detail}
                  <SourceLink href={pos.source} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IncidentSection({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <section className="mb-10">
        <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
          Incident History
        </h2>
        <p className="text-muted text-sm">No reported incidents.</p>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
        Incident History
      </h2>
      <div className="space-y-3">
        {incidents.map((incident) => (
          <div
            key={incident.date + incident.title}
            className="border border-card-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-sm">{incident.title}</h3>
              <span className="text-xs text-muted whitespace-nowrap font-mono">
                {incident.date}
              </span>
            </div>
            <p className="text-muted text-xs">{incident.description}</p>
            <div className="mt-2 flex gap-3 text-xs">
              <a
                href={incident.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                🔗 Source
              </a>
              {incident.companyResponse && (
                <a
                  href={incident.companyResponse}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  🔗 Company Response
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineSection({ events }: { events: TimelineEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="mb-10">
      <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
        Timeline
      </h2>
      <div className="relative border-l-2 border-card-border ml-2 pl-6 space-y-6">
        {sorted.map((event) => (
          <div key={event.date + event.event} className="relative">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-background" />
            <div className="font-mono text-xs text-muted mb-1">
              {event.date}
            </div>
            <div className="text-sm">
              {event.event}
              <SourceLink href={event.source} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="text-muted hover:text-foreground text-sm mb-6 inline-block transition-colors"
      >
        ← Back to all companies
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-xl bg-card-border flex items-center justify-center font-mono font-bold text-xl text-muted">
            {company.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-mono text-3xl font-bold">{company.name}</h1>
          </div>
        </div>
        <p className="text-muted">{company.description}</p>
      </div>

      <CheckSection title="Safety Documents" checks={company.safetyDocuments} />
      <CheckSection
        title="Testing & Evaluation"
        checks={company.testingAndEvaluation}
      />
      <CheckSection title="Governance" checks={company.governance} />
      <PolicySection positions={company.policyPositions} />
      <IncidentSection incidents={company.incidents} />
      <TimelineSection events={company.timeline} />
    </div>
  );
}
