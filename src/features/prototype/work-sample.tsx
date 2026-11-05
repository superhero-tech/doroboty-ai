import { Link, useParams } from "react-router";
import { ArrowRight, CheckCircle2, Bot, ClipboardCheck, MessageSquare } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { currentPerson, publishedJobs } from "./model";
import { usePrototype } from "./store";
import { Empty, NotFound } from "./shell";
import { WORK_SAMPLE_SLUG } from "./work-sample-model";
import { WorkSampleLayout } from "./work-sample-layout";
import { WorkSampleTask } from "./work-sample-task";
import { WorkSampleEvidence } from "./work-sample-summary";

export function WorkSamplePage({ view = "intro" }: { view?: "intro" | "task" | "summary" }) {
  const { slug } = useParams();
  const { state } = usePrototype();
  const person = currentPerson(state);
  const job = publishedJobs(state).find(
    (job) => job.slug === slug && job.slug === WORK_SAMPLE_SLUG && job.category === "apply",
  );
  if (!job) return <NotFound />;
  const base = `/aplikuj/${job.slug}`;
  const next = `${base}/zadanie`;
  const start =
    person?.role === "candidate"
      ? next
      : `/auth/sign-in?audience=candidate&next=${encodeURIComponent(next)}`;
  const application = state.applications.find(
    (a) => a.candidateId === person?.id && a.jobId === job.id,
  );
  const sample =
    application?.workSample ??
    state.workSamples.find(
      (sample) => sample.candidateId === person?.id && sample.jobId === job.id,
    );
  if (view !== "intro" && person?.role !== "candidate")
    return (
      <WorkSampleLayout job={job} step={1}>
        <section className="pp-offer-section">
          <h2>Wybierz profil kandydata</h2>
          <p>Pracę zapiszemy przy Twojej aplikacji na {job.title}.</p>
          <Link className={buttonVariants()} to={start}>
            Wybierz osobę i rozpocznij zadanie <ArrowRight />
          </Link>
        </section>
      </WorkSampleLayout>
    );
  if (view === "task" && !application)
    return <WorkSampleTask key={`${person!.id}:${job.id}`} job={job} sample={sample} />;
  if (view === "summary" || (view === "task" && application))
    return (
      <WorkSampleLayout
        job={job}
        step={3}
        action={
          sample?.completedAt ? (
            <Link
              className={buttonVariants()}
              to={application ? `/app/aplikacje/${application.id}` : base}
            >
              Wróć do aplikacji <ArrowRight />
            </Link>
          ) : undefined
        }
      >
        <section className="pp-offer-section">
          <p className="work-sample-eyebrow">Krok 3 · Podsumowanie</p>
          <h2>Sprawdź swoją pracę</h2>
          {sample?.completedAt ? (
            <>
              <p>
                To zapis Twoich odpowiedzi i zmian. Nie jest oceną umiejętności ani decyzją
                rekrutacyjną.
              </p>
              <WorkSampleEvidence sample={sample} />
              <div className="work-sample-actions">
                {!application && (
                  <Link className={buttonVariants({ variant: "outline" })} to={next}>
                    Popraw odpowiedzi
                  </Link>
                )}
              </div>
            </>
          ) : (
            <Empty>
              <p>Nie masz jeszcze ukończonego zadania dla tej oferty.</p>
              <Link
                className={buttonVariants()}
                to={application ? `/app/aplikacje/${application.id}` : start}
              >
                {application ? "Zobacz aplikację" : "Przejdź do zadania"}
              </Link>
            </Empty>
          )}
        </section>
      </WorkSampleLayout>
    );
  return (
    <WorkSampleLayout
      job={job}
      step={1}
      action={
        <Link
          className={buttonVariants()}
          to={
            application
              ? `/app/aplikacje/${application.id}`
              : sample?.completedAt
                ? `${base}/podsumowanie`
                : start
          }
        >
          {application
            ? "Zobacz swoją aplikację"
            : sample?.completedAt
              ? "Zobacz podsumowanie"
              : sample
                ? "Wznów zadanie"
                : "Rozpocznij zadanie"}
          <ArrowRight />
        </Link>
      }
    >
      <section className="pp-offer-section">
        <p className="work-sample-eyebrow">Krok 1 · Zanim zaczniesz</p>
        <h2>Pokaż, jak pracujesz z AI</h2>
        <p>
          Sam opis doświadczenia nie pokazuje całego sposobu pracy. W krótkim zadaniu pokażesz, jak
          wydajesz polecenie AI, sprawdzasz wynik i podejmujesz własne decyzje.
        </p>
        <div className="work-sample-intro-callout">
          <ClipboardCheck aria-hidden="true" />
          <div>
            <h3>Uporządkuj zgłoszenia klientów</h3>
            <p>
              Otrzymasz trzy fikcyjne wiadomości. Podzielisz je na kategorie z pomocą AI, sprawdzisz
              propozycję i wyjaśnisz swoje poprawki.
            </p>
          </div>
        </div>
        <h3>Jak to wygląda?</h3>
        <ol className="work-sample-instructions">
          <li>
            <MessageSquare aria-hidden="true" />
            <div>
              <strong>Napisz polecenie</strong>
              <p>Powiedz AI, jak ma uporządkować wiadomości.</p>
            </div>
          </li>
          <li>
            <Bot aria-hidden="true" />
            <div>
              <strong>Sprawdź propozycję</strong>
              <p>Przeczytaj źródła i popraw to, co wymaga zmiany.</p>
            </div>
          </li>
          <li>
            <CheckCircle2 aria-hidden="true" />
            <div>
              <strong>Wyjaśnij i sprawdź zapis</strong>
              <p>Opisz swoją weryfikację. Przed powrotem do aplikacji zobaczysz podsumowanie.</p>
            </div>
          </li>
        </ol>
        <h3>Co zapisujemy?</h3>
        <p>
          Twoje polecenie, końcowe kategorie i wyjaśnienie. Nie nagrywamy ekranu, kamery ani działań
          poza tym zadaniem. Postęp zapisuje się lokalnie, przy wybranym profilu.
        </p>
        <p className="work-sample-disclosure">
          Prototyp: AI pokazuje przygotowaną propozycję, taką samą dla każdego polecenia. Nie
          łączymy się z modelem i nie wystawiamy oceny kandydata.
        </p>
      </section>
    </WorkSampleLayout>
  );
}
