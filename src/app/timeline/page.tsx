import type { Metadata } from "next";
import { getCompanies } from "@/lib/data";
import TimelineClient from "./timeline-client";

export const metadata: Metadata = {
  title: "AI Safety Timeline — AI Safety Facts",
  description:
    "Chronological timeline of AI safety events across major AI companies.",
};

export default function TimelinePage() {
  const companies = getCompanies();

  const allEvents = companies.flatMap((company) => [
    ...company.timeline.map((event) => ({
      ...event,
      companyName: company.name,
      companySlug: company.slug,
      type: "timeline" as const,
    })),
    ...company.incidents.map((incident) => ({
      date: incident.date,
      event: incident.title + ": " + incident.description,
      source: incident.source,
      companyName: company.name,
      companySlug: company.slug,
      type: "incident" as const,
    })),
  ]);

  allEvents.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const companyNames = companies.map((c) => c.name);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-mono text-3xl font-bold mb-3">
          AI Safety Timeline
        </h1>
        <p className="text-muted text-lg">
          Chronological safety events across all tracked companies.
        </p>
      </div>

      <TimelineClient events={allEvents} companyNames={companyNames} />
    </div>
  );
}
