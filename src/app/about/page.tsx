import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI Safety Facts",
  description:
    "Our mission, methodology, and data sources for AI safety transparency.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-mono text-3xl font-bold mb-8">About</h1>

      <section className="mb-10">
        <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
          Mission
        </h2>
        <p className="text-muted leading-relaxed">
          AI Safety Facts is a fact-based, source-linked AI safety transparency
          dashboard. We provide verifiable information about AI company safety
          practices without opinions, grades, or rankings. Every fact on this
          site links directly to its primary source so you can verify it
          yourself.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
          Methodology
        </h2>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            We track publicly verifiable safety practices across major AI
            companies. Our data points fall into five categories:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong className="text-foreground">Safety Documents</strong> —
              Published policies, model cards, and safety frameworks
            </li>
            <li>
              <strong className="text-foreground">
                Testing &amp; Evaluation
              </strong>{" "}
              — Third-party red-teaming, CBRN evaluations, and safety benchmarks
            </li>
            <li>
              <strong className="text-foreground">Governance</strong> —
              Independent safety boards, government commitments, and audit
              practices
            </li>
            <li>
              <strong className="text-foreground">Policy Positions</strong> —
              Factual statements about military use, open-source stance, and
              content filtering
            </li>
            <li>
              <strong className="text-foreground">Incident History</strong> —
              Reported safety incidents and company responses
            </li>
          </ul>
          <p>
            Each data point is marked as verified (with source link), not found
            (no public evidence), or unknown (insufficient information to
            determine).
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-xl font-semibold mb-4 text-accent">
          Data Sources
        </h2>
        <ul className="space-y-3 text-muted">
          <li className="flex items-start gap-2">
            <span className="text-foreground">&#8226;</span>
            <span>
              Company websites, blogs, and official documentation
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">&#8226;</span>
            <span>
              Published research papers and technical reports (e.g., arXiv)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">&#8226;</span>
            <span>
              AI Incident Database (incidentdatabase.ai)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">&#8226;</span>
            <span>
              Government publications and international commitments
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">&#8226;</span>
            <span>
              Third-party evaluation organizations (METR, ARC, AISI)
            </span>
          </li>
        </ul>
      </section>

    </div>
  );
}
