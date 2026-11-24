import type { ReactNode, Ref } from "react";
import { BackLink } from "@/components/back-link";
import { ProcessTimeline } from "@/components/process-timeline";
import { RecordSheet } from "@/components/record-sheet";
import { candidateNextStepLabels } from "./model";
import { CvAttachment } from "./cv-attachment";
import { MatchScore } from "./match-score";
import { stageLabels, type Application, type Stage } from "./model";

type RecordEvent = { stage: Stage; at: string; note?: string };
const dateFormat = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "short",
});

function CandidateProcess({ stage, history }: { stage: Stage; history: RecordEvent[] }) {
  const hasVerified = history.some((event) =>
    ["reviewed", "interview_invited", "first_conversation_held", "continued", "hired"].includes(
      event.stage,
    ),
  );
  const hasInterview = history.some((event) =>
    ["first_conversation_held", "continued", "hired"].includes(event.stage),
  );
  const decision = stage === "hired" || stage === "rejected";
  const withdrawn = stage === "withdrawn";
  const nextIndex = decision || withdrawn ? -1 : !hasVerified ? 1 : !hasInterview ? 2 : 3;
  const steps = [
    { label: "Aplikacja wysłana", state: "complete" },
    {
      label: "Zgłoszenie zweryfikowane",
      state: hasVerified ? "complete" : nextIndex === 1 ? "current" : "pending",
    },
    {
      label: "Rozmowa przeprowadzona",
      state: hasInterview ? "complete" : nextIndex === 2 ? "current" : "pending",
    },
    {
      label:
        stage === "hired"
          ? "Decyzja pozytywna"
          : stage === "rejected"
            ? "Aplikacja odrzucona"
            : stage === "withdrawn"
              ? "Aplikacja wycofana"
              : "Decyzja rekrutera",
      state:
        stage === "hired"
          ? "positive"
          : stage === "rejected"
            ? "negative"
            : stage === "withdrawn"
              ? "withdrawn"
              : nextIndex === 3
                ? "current"
                : "pending",
    },
  ];

  return (
    <section className="candidate-process" aria-labelledby="candidate-process-heading">
      <h2 id="candidate-process-heading">Postęp rekrutacji</h2>
      <ol className="candidate-process-steps" aria-label="Etapy aplikacji">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="candidate-process-step"
            data-state={step.state}
            aria-current={
              step.state === "current" || ["positive", "negative", "withdrawn"].includes(step.state)
                ? "step"
                : undefined
            }
          >
            <span className="candidate-process-marker" aria-hidden="true">
              {step.state === "complete" || step.state === "positive"
                ? "✓"
                : step.state === "negative"
                  ? "×"
                  : step.state === "withdrawn"
                    ? "−"
                    : index + 1}
            </span>
            <span className="candidate-process-label">{step.label}</span>
          </li>
        ))}
      </ol>
      <p
        className="candidate-process-next-step"
        data-outcome={
          stage === "hired" ? "positive" : stage === "rejected" ? "negative" : "pending"
        }
      >
        {candidateNextStepLabels[stage]}
      </p>
    </section>
  );
}

/** Role controllers authorize the record and project the history before rendering. */
export function ApplicationRecord({
  application,
  companyName,
  audience,
  history,
  statusRef,
  children,
  footer,
}: {
  application: Pick<
    Application,
    "candidateId" | "candidateName" | "jobTitle" | "stage" | "answer" | "cv" | "score" | "summary"
  >;
  companyName: string;
  audience: "candidate" | "employer";
  history: RecordEvent[];
  statusRef?: Ref<HTMLSpanElement>;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  const candidate = audience === "candidate";
  const title = candidate ? application.jobTitle : application.candidateName;
  const context = candidate ? application.candidateName : application.jobTitle;
  const submitted = history[0];
  return (
    <article className="recruiting-record">
      <header className="recruiting-header">
        <nav aria-label="Ścieżka nawigacji" className="record-breadcrumb">
          <BackLink to={candidate ? "/app/aplikacje" : "/app/kandydaci"}>
            {candidate ? "Moje aplikacje" : "Kandydaci"}
          </BackLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <h1>{title}</h1>
        <div className="record-meta">
          <span>
            {context} · {companyName}
          </span>
          <span
            className={`record-stage${application.stage === "hired" ? " is-positive" : application.stage === "rejected" ? " is-negative" : ""}`}
            tabIndex={-1}
            ref={statusRef}
          >
            {(application.stage === "hired" || application.stage === "rejected") && (
              <span className="record-stage-icon" aria-hidden="true">
                {application.stage === "hired" ? "✓" : "×"}
              </span>
            )}
            {stageLabels[application.stage]}
          </span>
          <MatchScore score={application.score} />
          {submitted && (
            <span>
              Złożona:{" "}
              <time dateTime={submitted.at}>{dateFormat.format(new Date(submitted.at))}</time>
            </span>
          )}
        </div>
      </header>
      {candidate && <CandidateProcess stage={application.stage} history={history} />}
      <div className="recruiting-layout">
        <RecordSheet
          label={candidate ? "Twoja wysłana aplikacja" : "Materiały kandydata"}
          sections={[
            {
              value: "answer",
              label: "Odpowiedź",
              content: (
                <>
                  <h3>Przesłana aplikacja</h3>
                  <p>{application.answer}</p>
                </>
              ),
            },
            {
              value: "cv",
              label: "CV",
              content: (
                <>
                  <h3>CV z momentu aplikowania</h3>
                  <CvAttachment
                    candidateId={application.candidateId}
                    fallbackText={application.cv}
                    layout="row"
                    preview
                  />
                </>
              ),
            },
          ]}
          footer={footer}
        >
          {children}
        </RecordSheet>
        <aside className="recruiting-margin" aria-label="Historia i podsumowanie">
          <section aria-labelledby="process-heading">
            <h2 id="process-heading">Historia procesu</h2>
            <ProcessTimeline
              items={history.map((event, index) => ({
                id: `${index}-${event.at}`,
                title: stageLabels[event.stage],
                dateTime: event.at,
                content: event.note || undefined,
              }))}
            />
          </section>
          <section className="record-summary" aria-labelledby="summary-heading">
            <h2 id="summary-heading">Podsumowanie</h2>
            <p>{application.summary}</p>
          </section>
        </aside>
      </div>
    </article>
  );
}
