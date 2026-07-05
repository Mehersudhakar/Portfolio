import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

type Severity = "Critical" | "High" | "Medium" | "Low";

type CVE = {
  id: string;
  score: number;
  severity: Severity;
  product: string;
  slug: string;
  version: string;
  type: string;
  cwe: string;
  auth: string;
  source: "WPScan" | "Wordfence";
  summary: string;
};

// A selection of assigned CVEs, ordered by CVSS v3.1 base score (desc).
const cves: CVE[] = [
  {
    id: "CVE-2026-12081",
    score: 8.8,
    severity: "High",
    product: "Database for CF7, WPForms & Elementor Forms",
    slug: "contact-form-entries",
    version: "<= 1.5.1",
    type: "PHP Object Injection",
    cwe: "CWE-502",
    auth: "Unauthenticated",
    source: "WPScan",
    summary:
      "An unauthenticated visitor stores a serialized payload in a file-type form field that a bare maybe_unserialize() instantiates when an admin opens the entry — an incomplete fix of two prior deserialization CVEs. 70,000+ installs.",
  },
  {
    id: "CVE-2026-12274",
    score: 7.1,
    severity: "High",
    product: "Tutor LMS",
    slug: "tutor",
    version: "<= 3.9.11",
    type: "IDOR / Broken Auth",
    cwe: "CWE-639",
    auth: "Instructor+",
    source: "WPScan",
    summary:
      "The quiz-builder save handler passes an attacker-controlled post ID straight to wp_insert_post() with no per-object capability check, letting an instructor overwrite and take over any post — including admin pages. 90,000+ installs.",
  },
  {
    id: "CVE-2026-12395",
    score: 6.5,
    severity: "Medium",
    product: "WP Job Portal",
    slug: "wp-job-portal",
    version: "<= 2.5.4",
    type: "SQL Injection",
    cwe: "CWE-89",
    auth: "Employer+",
    source: "WPScan",
    summary:
      "The Applied Resumes view concatenates the ta parameter into an unquoted numeric SQL comparison where esc_sql() can't neutralize it, letting an Employer read any data in the database — including user password hashes. 10,000+ installs.",
  },
  {
    id: "CVE-2026-12907",
    score: 6.5,
    severity: "Medium",
    product: "RTMKit Addons for Elementor",
    slug: "rometheme-for-elementor",
    version: "<= 2.0.8",
    type: "Missing Authorization",
    cwe: "CWE-862",
    auth: "Author+",
    source: "WPScan",
    summary:
      "The Theme Builder render layer selects any published, active template with no author or capability constraint, letting an Author publish site-wide header, footer, and 404 chrome shown to every visitor and administrator. 40,000+ installs.",
  },
  {
    id: "CVE-2026-11766",
    score: 6.4,
    severity: "Medium",
    product: "Ultimate Member",
    slug: "ultimate-member",
    version: "<= 2.11.4",
    type: "Stored XSS",
    cwe: "CWE-79",
    auth: "Subscriber+",
    source: "WPScan",
    summary:
      "An entity-encoded payload survives sanitize_textarea_field() on save, then html_entity_decode() revives it into live markup at render — a bypass of the biography-only fix shipped for CVE-2025-15064. 200,000+ installs.",
  },
  {
    id: "CVE-2026-12970",
    score: 6.1,
    severity: "Medium",
    product: "LearnPress",
    slug: "learnpress",
    version: "<= 4.3.9.1",
    type: "Reflected XSS",
    cwe: "CWE-79",
    auth: "Unauthenticated",
    source: "WPScan",
    summary:
      "The Course Builder reflects the c_search request parameter into the page without escaping, executing attacker-supplied script in the victim's browser with no authentication required. 90,000+ installs.",
  },
  {
    id: "CVE-2026-12511",
    score: 4.3,
    severity: "Medium",
    product: "AI Engine",
    slug: "ai-engine",
    version: "<= 3.5.4",
    type: "Arbitrary File Write",
    cwe: "CWE-22",
    auth: "Editor+",
    source: "WPScan",
    summary:
      "A traversal sequence in a generated image filename escapes the uploads directory to write attacker-controlled bytes anywhere on disk; a .php.png double-extension write yields RCE under a permissive PHP handler. 100,000+ installs.",
  },
];

const sevStyle: Record<Severity, string> = {
  Critical: "text-accent border-accent/50 bg-accent/15",
  High: "text-accent border-accent/40 bg-accent/10",
  Medium: "text-[#f59e0b] border-[#f59e0b]/40 bg-[#f59e0b]/10",
  Low: "text-positive border-positive/40 bg-positive/10",
};

function nvdUrl(id: string) {
  return `https://nvd.nist.gov/vuln/detail/${id}`;
}

export default function Research() {
  const highest = Math.max(...cves.map((c) => c.score));

  return (
    <section id="research" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-3">
            <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest">
              cve research
            </h2>
            <span className="font-mono text-[10px] text-mutedStrong">
              $ grep -rl &quot;CVE-2026&quot; ~/disclosures
            </span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-muted text-xs font-mono mb-10">
            <span className="text-accent">▸</span> selected disclosures · top
            severity {highest.toFixed(1)} · object injection · IDOR · SQLi ·
            missing-auth · stored &amp; reflected XSS · arbitrary file write
            across the WordPress plugin ecosystem
          </p>
        </Reveal>

        <div className="space-y-3">
          {cves.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <a
                href={nvdUrl(c.id)}
                target="_blank"
                rel="noreferrer"
                className="group block border border-border rounded-lg p-5 bg-panel/30 transition-all hover:border-accent/60 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-16px_rgba(239,68,68,0.4)]"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="text-accent font-mono text-sm mt-0.5 select-none"
                    aria-hidden
                  >
                    ▸
                  </span>
                  <div className="flex-1 min-w-0">
                    {/* Line 1: CVE id · severity · type */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="font-mono text-sm text-fg tracking-tight group-hover:text-accent transition-colors">
                        {c.id}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${sevStyle[c.severity]}`}
                      >
                        {c.severity.toUpperCase()} {c.score.toFixed(1)}
                      </span>
                      <span className="font-mono text-[10px] text-muted border border-border rounded px-1.5 py-0.5">
                        {c.type}
                      </span>
                      <span className="text-sm text-fg font-medium">
                        {c.product}
                      </span>
                      <span className="font-mono text-[11px] text-muted">
                        {c.version}
                      </span>
                    </div>

                    {/* Line 2: one-line summary */}
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {c.summary}
                    </p>

                    {/* Line 3: meta */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-mutedStrong">
                      <span>{c.cwe}</span>
                      <span
                        className={
                          c.auth === "Unauthenticated"
                            ? "text-accent/80"
                            : "text-mutedStrong"
                        }
                      >
                        auth: {c.auth}
                      </span>
                      <span>slug: {c.slug}</span>
                      <span>via {c.source}</span>
                    </div>
                  </div>

                  <ExternalLink
                    size={14}
                    className="text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all mt-1 shrink-0"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={cves.length * 60}>
          <p className="mt-6 font-mono text-[10px] text-mutedStrong">
            A selection of assigned CVEs from independent WordPress plugin
            research; IDs assigned by WPScan and Wordfence / MITRE. Links
            resolve on NVD.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
