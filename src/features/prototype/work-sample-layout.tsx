import type { ReactNode } from "react";
import { Link } from "react-router";
import { BriefcaseBusiness, MapPin, Monitor } from "lucide-react";
import { BackLink } from "@/components/back-link";
import { CompanyLogo } from "@/features/jobs/company-logo";
import { SalaryFact } from "@/features/jobs/salary-fact";
import { remoteLabels, seniorityLabels } from "@/features/jobs/presentation";
import type { JobWithCompany } from "@/features/jobs/types";

export function WorkSampleLayout({
  job,
  step,
  action,
  children,
}: {
  job: JobWithCompany;
  step: number;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="pp-offer-page pp-container pp-offer-main work-sample-page">
      <nav className="pp-offer-breadcrumb" aria-label="Powrót do oferty">
        <BackLink to={`/oferty/${job.slug}`}>Wróć do oferty</BackLink>
        <span>Aplikacja · {step} z 3</span>
      </nav>
      <div className="pp-offer-grid work-sample-grid">
        <header className="pp-offer-hero">
          <div className="pp-offer-identity">
            <CompanyLogo company={job.company} />
            <div>
              <Link className="pp-offer-company-link" to={`/firmy/${job.company.slug}`}>
                {job.company.name}
              </Link>
              <p>Oferta, na którą aplikujesz</p>
            </div>
            <span className="pp-offer-category">Apply</span>
          </div>
          <h1>{job.title}</h1>
          <div className="pp-offer-key-facts">
            <span>
              <MapPin className="pp-icon" />
              {job.locations.join(" / ")}
            </span>
            <span>
              <Monitor className="pp-icon" />
              {remoteLabels[job.remoteStatus]}
            </span>
            <span>
              <BriefcaseBusiness className="pp-icon" />
              {seniorityLabels[job.seniority]}
            </span>
          </div>
          <div className="pp-offer-skill-row">
            <span>Praktyczna praca z AI</span>
          </div>
          <div className="pp-offer-hero-bottom">
            <span>{job.summary}</span>
          </div>
        </header>
        <aside className="pp-offer-sidebar" aria-label="Kontekst aplikacji">
          <div className="pp-offer-action-card">
            <div className="pp-offer-pay">
              <p className="pp-offer-eyebrow">Wynagrodzenie</p>
              <SalaryFact job={job} />
            </div>
            <div className="work-sample-progress">
              <h2>Twoja aplikacja</h2>
              <ol>
                {["Poznaj zadanie", "Pokaż sposób pracy", "Sprawdź podsumowanie"].map(
                  (label, index) => (
                    <li key={label} aria-current={step === index + 1 ? "step" : undefined}>
                      <span aria-hidden="true">{index + 1}</span>
                      {label}
                    </li>
                  ),
                )}
              </ol>
            </div>
            <div className="pp-offer-actions">
              {action}
              <p>Materiały demonstracyjne. Twoja praca pozostaje w tej przeglądarce.</p>
            </div>
          </div>
        </aside>
        <div className="pp-offer-description">
          <div className="pp-offer-reading">{children}</div>
        </div>
      </div>
    </article>
  );
}
