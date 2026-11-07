import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryLabels, seniorityLabels } from "@/features/jobs/presentation";
import { NotFound } from "./shell";
import { usePrototype } from "./store";
import type { HelpRequest } from "./model";
import {
  essentialLabels,
  essentialPrompt,
  firstName,
  type EssentialKey,
  type TextEssentialKey,
} from "./essentials";

type Mode = "text" | "voice";
type Draft = { mode: Mode; text: string; undecided: boolean };

function answersLabel(count: number) {
  return count === 1 ? "1 odpowiedź" : `${count} odpowiedzi`;
}

/** Simulated recorder: no audio is captured; the moderator types the transcript. */
function Recorder() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (startedAt === null) return;
    const timer = window.setInterval(
      () => setSeconds(Math.floor((Date.now() - startedAt) / 1000)),
      500,
    );
    return () => window.clearInterval(timer);
  }, [startedAt]);
  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="expert-recorder">
      <Button
        type="button"
        size="sm"
        variant="outline"
        aria-pressed={startedAt !== null}
        onClick={() => {
          if (startedAt === null) {
            setSeconds(0);
            setStartedAt(Date.now());
          } else setStartedAt(null);
        }}
      >
        {startedAt === null ? <Mic aria-hidden="true" /> : <Square aria-hidden="true" />}
        {startedAt === null ? (seconds ? "Nagraj ponownie" : "Zacznij nagrywanie") : "Zatrzymaj"}
      </Button>
      <span className="essential-hint" aria-live="polite">
        {startedAt !== null
          ? `Nagrywanie ${clock}`
          : seconds
            ? `Nagrano ${clock}`
            : "Prototyp nie zapisuje dźwięku."}
      </span>
    </div>
  );
}

function ModeToggle({
  mode,
  onChange,
  label,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
  label: string;
}) {
  return (
    <div className="mode-toggle" role="group" aria-label={label}>
      <Button
        type="button"
        size="xs"
        variant="outline"
        aria-pressed={mode === "text"}
        onClick={() => onChange("text")}
      >
        Wpisz
      </Button>
      <Button
        type="button"
        size="xs"
        variant="outline"
        aria-pressed={mode === "voice"}
        onClick={() => onChange("voice")}
      >
        <Mic aria-hidden="true" /> Nagraj
      </Button>
    </div>
  );
}

export function ExpertHelpPage() {
  const { id } = useParams();
  const { state, run } = usePrototype();
  const request = state.helpRequests.find((x) => x.id === id);
  if (!request) return <NotFound />;
  return <ExpertHelpForm key={request.id} request={request} run={run} state={state} />;
}

function ExpertHelpForm({
  request,
  run,
  state,
}: {
  request: HelpRequest;
  run: ReturnType<typeof usePrototype>["run"];
  state: ReturnType<typeof usePrototype>["state"];
}) {
  const job = state.jobs.find((x) => x.id === request.jobId);
  const company = state.companies.find((x) => x.id === request.companyId);
  const author = state.people.find((x) => x.id === request.authorId);
  const authorName = firstName(author?.name ?? "Autor");
  const category = job?.category ?? "build";
  const [answers, setAnswers] = useState<Record<string, Draft>>(() =>
    Object.fromEntries(
      request.questions.map((k) => [k, { mode: "text", text: "", undecided: false }]),
    ),
  );
  const [corrections, setCorrections] = useState<Partial<Record<TextEssentialKey, string>>>({});
  const [note, setNote] = useState<Draft>({ mode: "text", text: "", undecided: false });
  const [error, setError] = useState("");
  const [briefOpen, setBriefOpen] = useState(false);
  const longBrief = request.brief.length > 600;

  if (request.status === "answered")
    return (
      <section className="prototype-section expert-help">
        <h1>Dziękujemy</h1>
        <p className="my-5">
          Odpowiedzi zostały wysłane. {authorName} zobaczy je przy ogłoszeniu. Możesz zamknąć tę
          stronę.
        </p>
      </section>
    );

  function update(key: EssentialKey, patch: Partial<Draft>) {
    setAnswers((current) => ({ ...current, [key]: { ...current[key], ...patch } }));
    setError("");
  }

  function send() {
    const missing = request.questions.filter(
      (k) => !answers[k].undecided && !answers[k].text.trim(),
    );
    if (missing.length) {
      setError("Odpowiedz na każde pytanie albo zaznacz, że to jeszcze nie jest ustalone.");
      document.getElementById(`answer-${missing[0]}`)?.focus();
      return;
    }
    run({
      type: "expert_answer",
      requestId: request.id,
      answers: request.questions.map((key) => ({
        key,
        mode: answers[key].mode,
        text: answers[key].undecided ? "" : answers[key].text.trim(),
        undecided: answers[key].undecided,
      })),
      corrections: request.known
        .filter((k) => corrections[k.key]?.trim() && corrections[k.key]!.trim() !== k.text)
        .map((k) => ({ key: k.key, original: k.text, text: corrections[k.key]!.trim() })),
      note: note.text.trim() ? { mode: note.mode, text: note.text.trim() } : undefined,
    });
  }

  return (
    <section className="prototype-section expert-help" aria-labelledby="expert-help-heading">
      <h1 id="expert-help-heading">
        {authorName} prosi o {answersLabel(request.questions.length)}
      </h1>
      <p className="expert-help-meta">
        {job?.title}
        {company && ` · ${company.name}`}
        {job && ` · ${categoryLabels[job.category]} · ${seniorityLabels[job.seniority]}`}. Zajmie to
        kilka minut.
      </p>
      {request.message && (
        <blockquote className="expert-help-message">{request.message}</blockquote>
      )}

      {(request.known.length > 0 || request.brief) && (
        <div className="prototype-panel expert-help-card">
          <h2>Co już wiadomo</h2>
          {request.known.length > 0 && (
            <p className="essential-hint">
              Coś się nie zgadza? Popraw. {authorName} zobaczy Twoją wersję obok swojej.
            </p>
          )}
          {request.brief && (
            <div className="expert-known">
              <p>
                <strong>Brief autora ogłoszenia</strong>
              </p>
              <p id="expert-brief" className="expert-brief">
                {longBrief && !briefOpen
                  ? `${request.brief.slice(0, 280).trimEnd()}…`
                  : request.brief}
              </p>
              {longBrief && (
                <Button
                  type="button"
                  size="xs"
                  variant="ghost"
                  aria-expanded={briefOpen}
                  aria-controls="expert-brief"
                  onClick={() => setBriefOpen((open) => !open)}
                >
                  {briefOpen ? "Zwiń brief" : "Pokaż cały brief"}
                </Button>
              )}
            </div>
          )}
          {request.known.map((item) => {
            const editing = corrections[item.key] !== undefined;
            return (
              <div key={item.key} className="expert-known">
                <p>
                  <strong>{essentialLabels[item.key]}:</strong> {item.text}
                </p>
                {editing ? (
                  <>
                    <Textarea
                      className="min-h-20"
                      aria-label={`Poprawka: ${essentialLabels[item.key]}`}
                      maxLength={4000}
                      value={corrections[item.key]}
                      onChange={(e) =>
                        setCorrections((c) => ({ ...c, [item.key]: e.target.value }))
                      }
                    />
                    <Button
                      type="button"
                      size="xs"
                      variant="ghost"
                      onClick={() =>
                        setCorrections((c) => {
                          const next = { ...c };
                          delete next[item.key];
                          return next;
                        })
                      }
                    >
                      Anuluj poprawkę
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    size="xs"
                    variant="ghost"
                    onClick={() => setCorrections((c) => ({ ...c, [item.key]: item.text }))}
                  >
                    Popraw
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {request.questions.map((key, index) => {
        const draft = answers[key];
        const prompt = essentialPrompt(key, category);
        return (
          <div key={key} className="prototype-panel expert-help-card">
            <h2 className="expert-question">
              {index + 1}. {prompt}
            </h2>
            <ModeToggle
              mode={draft.mode}
              label={`Sposób odpowiedzi na pytanie ${index + 1}`}
              onChange={(mode) => update(key, { mode })}
            />
            {draft.mode === "voice" && !draft.undecided && <Recorder />}
            <Textarea
              id={`answer-${key}`}
              className="min-h-24"
              aria-label={
                draft.mode === "voice"
                  ? `Spisana odpowiedź na pytanie ${index + 1}`
                  : `Odpowiedź na pytanie ${index + 1}`
              }
              placeholder={
                draft.mode === "voice"
                  ? "Spisana odpowiedź (w teście wpisuje moderator)"
                  : undefined
              }
              disabled={draft.undecided}
              maxLength={4000}
              value={draft.text}
              onChange={(e) => update(key, { text: e.target.value })}
            />
            <label className="flex items-center gap-3">
              <Checkbox
                checked={draft.undecided}
                onCheckedChange={(checked) => update(key, { undecided: checked })}
              />
              <span>To jeszcze nie jest ustalone</span>
            </label>
          </div>
        );
      })}

      <div className="prototype-panel expert-help-card">
        <h2 className="expert-question">Chcesz dodać coś od siebie? (opcjonalnie)</h2>
        <p className="essential-hint">
          Czego tu nie ma, a kandydat powinien wiedzieć? Albo uwaga tylko dla autora ogłoszenia.
        </p>
        <ModeToggle
          mode={note.mode}
          label="Sposób dodania uwagi"
          onChange={(mode) => setNote((n) => ({ ...n, mode }))}
        />
        {note.mode === "voice" && <Recorder />}
        <Textarea
          className="min-h-20"
          aria-label="Dodatkowa uwaga"
          maxLength={4000}
          value={note.text}
          onChange={(e) => setNote((n) => ({ ...n, text: e.target.value }))}
        />
      </div>

      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}
      <Button type="button" onClick={send}>
        Wyślij odpowiedzi
      </Button>
    </section>
  );
}
