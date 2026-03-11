"use client";

import { useState } from "react";
import Link from "next/link";

interface TimelineEvent {
  date: string;
  event: string;
  source: string;
  companyName: string;
  companySlug: string;
  type: "timeline" | "incident";
}

export default function TimelineClient({
  events,
  companyNames,
}: {
  events: TimelineEvent[];
  companyNames: string[];
}) {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? events
      : events.filter((e) => e.companyName === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            filter === "all"
              ? "bg-accent text-white"
              : "bg-card-bg border border-card-border text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {companyNames.map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              filter === name
                ? "bg-accent text-white"
                : "bg-card-bg border border-card-border text-muted hover:text-foreground"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="relative border-l-2 border-card-border ml-2 pl-6 space-y-6">
        {filtered.map((event, i) => (
          <div key={`${event.date}-${event.companySlug}-${i}`} className="relative">
            <div
              className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-background ${
                event.type === "incident" ? "bg-danger" : "bg-accent"
              }`}
            />
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-muted">{event.date}</span>
              <Link
                href={`/company/${event.companySlug}`}
                className="text-xs font-mono px-2 py-0.5 rounded bg-card-bg border border-card-border text-muted hover:text-accent transition-colors"
              >
                {event.companyName}
              </Link>
              {event.type === "incident" && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-danger/20 text-danger font-mono">
                  incident
                </span>
              )}
            </div>
            <div className="text-sm">
              {event.event}
              <a
                href={event.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:underline ml-1"
                title="View source"
              >
                🔗
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted text-sm text-center py-8">
          No events found for the selected filter.
        </p>
      )}
    </>
  );
}
