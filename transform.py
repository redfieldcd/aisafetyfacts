#!/usr/bin/env python3
"""Transform research data into the format expected by the Next.js site."""
import json

LABELS = {
    "safetyDocuments": {
        "responsibleScalingPolicy": "Responsible Scaling Policy",
        "modelCard": "Model Card / System Card",
        "safetyBenchmarkResults": "Safety Benchmark Results",
        "acceptableUsePolicy": "Acceptable Use Policy",
    },
    "testing": {
        "thirdPartyRedTeam": "Third-Party Red Teaming",
        "cbrnRiskEvaluation": "CBRN Risk Evaluation",
        "preDeploymentSafetyEval": "Pre-Deployment Safety Evaluation",
        "externalEvals": "External Safety Evaluations",
    },
    "governance": {
        "independentSafetyBoard": "Independent Safety Board",
        "seoulAISafetyCommitment": "Seoul AI Safety Commitment",
        "governmentSafetyReport": "Government Safety Report",
        "thirdPartyAudits": "Third-Party Audits",
        "whistleblowerPolicy": "Whistleblower Policy",
    },
}

POLICY_LABELS = {
    "militaryUse": "Military Use",
    "surveillanceUse": "Surveillance Use",
    "openSourceModels": "Open-Source Models",
    "childrenMinorsPolicy": "Children/Minors Policy",
}

DESCRIPTIONS = {
    "openai": "Creator of ChatGPT and GPT-4; leading frontier AI lab focused on artificial general intelligence.",
    "anthropic": "AI safety company building Claude; founded by former OpenAI researchers with a safety-first mission.",
    "google-deepmind": "Google's AI research lab developing Gemini models; merged from Google Brain and DeepMind.",
    "meta": "Develops the open-weight Llama model family; largest open-source contributor to frontier AI.",
    "deepseek": "Chinese AI lab producing competitive open-source models like DeepSeek-R1 and V3.",
    "alibaba-qwen": "Alibaba Cloud's AI division developing the Qwen open-weight model family.",
    "xai": "Elon Musk's AI company building Grok; integrated with the X platform.",
    "mistral": "French AI startup releasing open-weight models; a leading European frontier AI company.",
}


def to_status(val):
    """Convert various exists/signed/submitted values to bool or null."""
    if val is True or val == "yes" or val == "Yes":
        return True
    if val is False or val == "no" or val == "No":
        return False
    # "partial", "unknown", or other strings -> null
    if isinstance(val, str):
        if val.lower().startswith("yes"):
            return True
        return None
    return None


def get_source(item):
    """Extract primary source URL from an item."""
    if item.get("url"):
        return item["url"]
    if item.get("sourceUrl"):
        return item["sourceUrl"]
    return None


def get_last_updated(item):
    """Extract a date for lastUpdated."""
    return item.get("dateUpdated") or item.get("datePublished") or item.get("date") or None


def build_detail(item, key=None):
    """Build a detail string from the item's notes and name."""
    parts = []
    if item.get("name"):
        parts.append(item["name"])
    if item.get("who"):
        parts.append(item["who"])
    if item.get("which"):
        parts.append(item["which"])
    if item.get("organizations"):
        parts.append(", ".join(item["organizations"]))
    if item.get("models") and isinstance(item["models"], list) and len(item["models"]) > 0:
        parts.append(", ".join(item["models"][:5]))
        if len(item["models"]) > 5:
            parts.append(f"and {len(item['models']) - 5} more")
    if item.get("notes"):
        parts.append(item["notes"])
    return ". ".join(parts) if parts else ""


def convert_safety_checks(section_data, label_map):
    """Convert a dict of safety check items to SafetyCheck[]."""
    checks = []
    for key, label in label_map.items():
        item = section_data.get(key, {})
        if not item:
            continue

        # Determine status
        status_val = item.get("exists") if "exists" in item else item.get("signed") if "signed" in item else item.get("submitted")
        status = to_status(status_val)

        checks.append({
            "label": label,
            "status": status,
            "detail": build_detail(item, key),
            "source": get_source(item),
            "lastUpdated": get_last_updated(item),
        })
    return checks


def convert_policies(policies_data):
    """Convert policies dict to PolicyPosition[]."""
    positions = []
    for key, label in POLICY_LABELS.items():
        item = policies_data.get(key, {})
        if not item:
            continue

        value = item.get("status", "Unknown")
        if isinstance(value, bool):
            value = "Yes" if value else "No"
        # For childrenMinorsPolicy which uses "exists" instead of "status"
        if "status" not in item and "exists" in item:
            exists_val = item["exists"]
            if exists_val is True:
                value = "Yes"
            elif exists_val is False:
                value = "No"
            elif isinstance(exists_val, str):
                value = exists_val.capitalize()
            else:
                value = "Unknown"

        positions.append({
            "label": label,
            "value": value,
            "detail": build_detail(item, key),
            "source": get_source(item),
        })
    return positions


def convert_incidents(incidents_data):
    """Convert incidents to the expected format."""
    return [
        {
            "date": inc["date"],
            "title": inc["title"],
            "description": inc["description"],
            "source": inc.get("sourceUrl", ""),
            "companyResponse": inc.get("companyResponse"),
        }
        for inc in incidents_data
    ]


def convert_timeline(timeline_data):
    """Convert timeline events to the expected format."""
    return [
        {
            "date": evt["date"],
            "event": evt["event"],
            "source": evt.get("url", ""),
        }
        for evt in timeline_data
    ]


def transform_company(company):
    """Transform a single company from research format to site format."""
    return {
        "name": company["name"],
        "slug": company["slug"],
        "description": DESCRIPTIONS.get(company["slug"], ""),
        "safetyDocuments": convert_safety_checks(
            company.get("safetyDocuments", {}), LABELS["safetyDocuments"]
        ),
        "testingAndEvaluation": convert_safety_checks(
            company.get("testing", {}), LABELS["testing"]
        ),
        "governance": convert_safety_checks(
            company.get("governance", {}), LABELS["governance"]
        ),
        "policyPositions": convert_policies(company.get("policies", {})),
        "incidents": convert_incidents(company.get("incidents", [])),
        "timeline": convert_timeline(company.get("timeline", [])),
    }


def main():
    with open("data/companies.json", "r") as f:
        data = json.load(f)

    companies = data["companies"]
    print(f"Transforming {len(companies)} companies...")

    transformed = [transform_company(c) for c in companies]

    with open("data/companies.json", "w") as f:
        json.dump(transformed, f, indent=2)

    print(f"Done. Wrote {len(transformed)} companies to data/companies.json")
    for c in transformed:
        print(f"  - {c['name']}: {len(c['safetyDocuments'])} docs, {len(c['testingAndEvaluation'])} tests, {len(c['governance'])} gov, {len(c['policyPositions'])} policies, {len(c['incidents'])} incidents, {len(c['timeline'])} timeline")


if __name__ == "__main__":
    main()
