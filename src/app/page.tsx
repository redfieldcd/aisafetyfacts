import Link from "next/link";
import { getCompanies, getAllSafetyChecks, countChecks } from "@/lib/data";

function StatusBar({
  passed,
  failed,
  total,
}: {
  passed: number;
  failed: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-card-border overflow-hidden flex">
        <div
          className="h-full bg-safe"
          style={{ width: `${(passed / total) * 100}%` }}
        />
        <div
          className="h-full bg-danger"
          style={{ width: `${(failed / total) * 100}%` }}
        />
      </div>
      <span className="text-xs text-muted whitespace-nowrap">
        <span className="text-safe">{passed}</span>/{total}
      </span>
    </div>
  );
}

export default function Home() {
  const companies = getCompanies();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="font-mono text-3xl sm:text-4xl font-bold mb-3">
          AI Safety Tracker
        </h1>
        <p className="text-muted text-lg max-w-2xl">
          Tracking AI safety practices across major companies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {companies.map((company) => {
          const allChecks = getAllSafetyChecks(company);
          const { passed, failed, total } = countChecks(allChecks);

          return (
            <Link
              key={company.slug}
              href={`/company/${company.slug}`}
              className="group border border-card-border bg-card-bg rounded-lg p-5 hover:border-accent/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-card-border flex items-center justify-center font-mono font-bold text-sm text-muted">
                  {company.name.charAt(0)}
                </div>
                <span className="text-xs text-muted">
                  {company.incidents.length} incident
                  {company.incidents.length !== 1 ? "s" : ""}
                </span>
              </div>

              <h2 className="font-mono font-semibold text-base mb-1 group-hover:text-accent transition-colors">
                {company.name}
              </h2>
              <p className="text-muted text-xs mb-4 line-clamp-2">
                {company.description}
              </p>

              <StatusBar passed={passed} failed={failed} total={total} />

              <div className="mt-3 flex gap-3 text-xs">
                <span className="text-safe">{passed} passed</span>
                <span className="text-danger">{failed} failed</span>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
