import AboutScrollLine from "./AboutScrollLine";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="section-heading font-mono text-xs text-muted uppercase tracking-widest mb-6">
            about
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-5 gap-10">
          <Reveal className="md:col-span-3 relative">
            <AboutScrollLine />
            <p className="text-lg sm:text-xl text-fg leading-relaxed">
              I find exploitable vulnerabilities through manual,
              adversary-driven testing, then translate them into actionable
              remediation that engineering teams actually ship.
            </p>
            <p className="mt-5 text-muted leading-relaxed">
              3+ years across penetration testing, offensive security,
              vulnerability exploitation, and AI/LLM red teaming. Hands-on with
              attack-chain construction, authentication and authorization
              bypass, privilege escalation, lateral movement, post-exploitation,
              source-level review for exploitation primitives, and adversarial
              testing of production AI systems.
            </p>
            <p className="mt-5 text-muted leading-relaxed">
              Surfaced 30+ confirmed vulnerabilities, including a novel
              Denial-of-Wallet attack class on a production RAG pipeline, a
              high-severity JWT lifecycle flaw on an OAuth-based multi-tenant
              SaaS platform, and 25+ critical findings at DXC contributing to a
              35% reduction in production incidents.
            </p>
            <p className="mt-5 text-muted leading-relaxed">
              I care about the fundamentals: understanding the target, writing
              tools when off-the-shelf ones fall short, and reporting findings
              with clear PoCs mapped to CVSS v3, OWASP Top 10, and MITRE
              ATT&amp;CK.
            </p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-2">
            <div className="border border-border rounded-lg p-5 font-mono text-xs bg-panel/40">
              <div className="text-muted mb-3">// currently</div>
              <ul className="space-y-2 text-fg">
                <li>
                  <span className="text-accent">→</span> Pentesting RAG/LLM
                  applications
                </li>
                <li>
                  <span className="text-accent">→</span> Adversarial AI guardrail
                  research
                </li>
                <li>
                  <span className="text-accent">→</span> Pursuing OSCP
                </li>
              </ul>
              <div className="text-muted mt-5 mb-3">// based in</div>
              <div className="text-fg">United States</div>
              <div className="text-muted mt-5 mb-3">// open to</div>
              <div className="text-fg">Red team · AppSec · AI security roles</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
