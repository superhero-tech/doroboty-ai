import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/form-select";
import { Textarea } from "@/components/ui/textarea";
import { organizeNotes, ratingLabels, ratings, rubricFor, type Rating } from "./assessment";
import type { Application, Assessment } from "./model";
import { usePrototype } from "./store";

const ratingOptions = ratings.map((value) => ({ value, label: ratingLabels[value] }));
const dateFormat = new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" });

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Read-only summary shown after the decision. Employer view only. */
export function AssessmentSummary({ assessment }: { assessment: Assessment }) {
  return (
    <section className="assessment" aria-labelledby="assessment-summary-heading">
      <h3 id="assessment-summary-heading">Ocena po rozmowie</h3>
      <p className="record-caption">
        Zapisano <time dateTime={assessment.at}>{dateFormat.format(new Date(assessment.at))}</time>
        {assessment.durationSeconds !== undefined &&
          ` · czas wypełniania ${formatDuration(assessment.durationSeconds)}`}
        . Ocenę wystawił rekruter; AI tylko uporządkowało notatki (symulacja).
      </p>
      <dl className="assessment-summary">
        {assessment.criteria.map((criterion) => (
          <div key={criterion.label} className="assessment-summary-row">
            <dt>{criterion.label}</dt>
            <dd>
              <span className="assessment-rating">{ratingLabels[criterion.rating]}</span>
              <span className="assessment-evidence">{criterion.evidence}</span>
            </dd>
          </div>
        ))}
      </dl>
      {assessment.note && (
        <p className="assessment-note">
          <strong>Notatka rekrutera:</strong> {assessment.note}
        </p>
      )}
    </section>
  );
}

/** Editable I1 form for the employer at the first-conversation stage. */
export function PostInterviewAssessment({
  application,
  saved,
}: {
  application: Application;
  saved?: Assessment;
}) {
  const { run } = usePrototype();
  const rubric = rubricFor(application.jobId);
  const uid = useId();
  const [notes, setNotes] = useState(saved?.notes ?? "");
  const [evidence, setEvidence] = useState<string[]>(
    rubric.criteria.map((c) => saved?.criteria.find((x) => x.label === c.label)?.evidence ?? ""),
  );
  const [ratingValues, setRatingValues] = useState<(Rating | "")[]>(
    rubric.criteria.map((c) => saved?.criteria.find((x) => x.label === c.label)?.rating ?? ""),
  );
  const [note, setNote] = useState(saved?.note ?? "");
  const [unmatched, setUnmatched] = useState<string[]>([]);
  const [organizeStatus, setOrganizeStatus] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(saved?.durationSeconds ?? 0);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startedAt === null) return;
    const timer = window.setInterval(
      () => setElapsed(Math.round((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [startedAt]);

  function start() {
    if (startedAt === null) {
      setStartedAt(Date.now() - elapsed * 1000);
      setSaveStatus("");
    }
  }

  function organize() {
    start();
    if (!notes.trim()) {
      setOrganizeStatus("Wklej notatki z rozmowy albo wstaw przykładowe notatki.");
      return;
    }
    const result = organizeNotes(notes, rubric.criteria);
    setEvidence((current) => current.map((value, i) => result.evidence[i] || value));
    setUnmatched(result.unmatched);
    const filled = result.evidence.filter(Boolean).length;
    setOrganizeStatus(
      filled === 0
        ? "Symulacja nie przypisała żadnej notatki. Uzupełnij dowody ręcznie."
        : `Symulacja AI przypisała notatki do ${filled} z ${rubric.criteria.length} kryteriów. Nie wystawiła żadnej oceny — sprawdź dowody i oceń sam.`,
    );
  }

  const missing: string[] = [];
  rubric.criteria.forEach((c, i) => {
    if (!evidence[i].trim()) missing.push(`${c.label}: brakuje dowodu z notatek.`);
    if (!ratingValues[i]) missing.push(`${c.label}: wybierz własną ocenę.`);
  });
  const errors = showErrors ? missing : [];

  function save() {
    start();
    setShowErrors(true);
    if (missing.length > 0) {
      setSaveStatus("");
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    const durationSeconds =
      startedAt === null ? elapsed : Math.round((Date.now() - startedAt) / 1000);
    const ok = run({
      type: "assess",
      applicationId: application.id,
      value: {
        notes,
        note,
        durationSeconds,
        criteria: rubric.criteria.map((c, i) => ({
          label: c.label,
          evidence: evidence[i],
          rating: ratingValues[i] as Rating,
        })),
      },
    });
    if (ok) {
      setStartedAt(null);
      setElapsed(durationSeconds);
      setSaveStatus(
        `Ocena zapisana (czas wypełniania ${formatDuration(durationSeconds)}). Możesz teraz podjąć decyzję.`,
      );
    }
  }

  return (
    <section className="assessment" aria-labelledby={`${uid}-heading`}>
      <div className="assessment-heading">
        <h3 id={`${uid}-heading`}>Ocena po rozmowie</h3>
        <span
          className="assessment-timer"
          aria-label={`Czas wypełniania ${formatDuration(elapsed)}`}
        >
          {formatDuration(elapsed)}
        </span>
      </div>
      <p className="record-caption">
        Wklej notatki z rozmowy. AI uporządkuje je według kryteriów roli, ale ocenę wystawiasz Ty.
        Cel: około 1–2 minut.
      </p>
      <p className="prototype-notice assessment-sim">
        Symulacja: notatki porządkuje lokalne dopasowanie słów kluczowych, nie model AI. Kryteria są
        przygotowane dla tego scenariusza.
      </p>

      <div className="assessment-block">
        <label className="assessment-label" htmlFor={`${uid}-notes`}>
          1. Notatki z rozmowy
        </label>
        <Textarea
          id={`${uid}-notes`}
          rows={5}
          maxLength={12000}
          value={notes}
          onFocus={start}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Np. Opisała wdrożenie asystenta AI… Po wdrożeniu czas odpowiedzi spadł o 30%…"
        />
        <div className="record-actions">
          <Button type="button" onClick={organize}>
            Uporządkuj notatki (symulacja AI)
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              start();
              setNotes(rubric.exampleNotes);
              setOrganizeStatus("Wstawiono przykładowe, fikcyjne notatki.");
            }}
          >
            Wstaw przykładowe notatki
          </Button>
        </div>
        <p role="status" className="record-caption assessment-status">
          {organizeStatus}
        </p>
        {unmatched.length > 0 && (
          <div className="assessment-unmatched">
            <p className="record-caption">
              Nie przypisano do kryteriów (przenieś ręcznie, jeśli ważne):
            </p>
            <ul>
              {unmatched.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="assessment-block">
        <p className="assessment-label">2. Dowody i Twoja ocena</p>
        {rubric.criteria.map((criterion, i) => (
          <fieldset key={criterion.label} className="assessment-criterion">
            <legend>{criterion.label}</legend>
            <p className="record-caption">{criterion.hint}</p>
            <label className="assessment-field-label" htmlFor={`${uid}-evidence-${i}`}>
              Dowód z notatek
            </label>
            <Textarea
              id={`${uid}-evidence-${i}`}
              rows={2}
              maxLength={2000}
              aria-invalid={errors.length > 0 && !evidence[i].trim() ? true : undefined}
              value={evidence[i]}
              onFocus={start}
              onChange={(event) =>
                setEvidence((current) =>
                  current.map((value, j) => (j === i ? event.target.value : value)),
                )
              }
            />
            <label className="assessment-field-label" htmlFor={`${uid}-rating-${i}`}>
              Twoja ocena
            </label>
            <FormSelect
              id={`${uid}-rating-${i}`}
              ariaLabel={`Twoja ocena — ${criterion.label}`}
              placeholder="Wybierz ocenę"
              options={ratingOptions}
              value={ratingValues[i]}
              onValueChange={(value) => {
                start();
                setRatingValues((current) =>
                  current.map((item, j) => (j === i ? (value as Rating | "") : item)),
                );
              }}
            />
          </fieldset>
        ))}
        <label className="assessment-field-label" htmlFor={`${uid}-note`}>
          Dodatkowa notatka rekrutera (opcjonalnie)
        </label>
        <Textarea
          id={`${uid}-note`}
          rows={2}
          maxLength={12000}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>

      {errors.length > 0 && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="error-message assessment-errors">
          <p>Uzupełnij ocenę przed zapisaniem:</p>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="record-actions">
        <Button type="button" onClick={save}>
          {saved ? "Zaktualizuj ocenę" : "Zapisz ocenę"}
        </Button>
      </div>
      <p role="status" className="record-caption assessment-status">
        {saveStatus}
      </p>
    </section>
  );
}
