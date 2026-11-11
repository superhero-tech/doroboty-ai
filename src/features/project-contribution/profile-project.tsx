import { useId, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, FilePenLine, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePrototype } from "../prototype/store";
import { currentPerson } from "../prototype/model";
import {
  blankDraft,
  exampleDraft,
  profileProjectDraftSchema,
  profileProjectSchema,
  type FieldName,
  type ProfileProjectDraft,
  type ProjectDraft,
} from "./model";
import { ProjectContributionFields } from "./form-fields";
import { groups } from "./fields";
import "./project-contribution.css";
import "./profile-project.css";
import profileRobot from "./assets/robot.svg";

function excerpt(value: string, limit = 220) {
  if (value.length <= limit) return value;
  const boundary = value.lastIndexOf(" ", limit);
  return `${value.slice(0, boundary > limit / 2 ? boundary : limit)}…`;
}

export function ProjectContributionSummary({ project }: { project: ProfileProjectDraft }) {
  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="profile-project-card" aria-label="Projekt w skrócie">
      <header className="profile-project-card-header">
        <div>
          <p className="profile-project-eyebrow">Projekt w skrócie</p>
          <h3>{project.title}</h3>
          <p className="profile-project-meta">
            {project.role} · {project.period}
          </p>
        </div>
        <Button
          className="profile-project-label"
          aria-controls={detailsId}
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          Opis kandydata
        </Button>
      </header>
      <dl className="profile-project-facts">
        <div>
          <dt>Samodzielnie</dt>
          <dd>{excerpt(project.own)}</dd>
        </div>
        <div>
          <dt>Rezultat</dt>
          <dd>{excerpt(project.result)}</dd>
        </div>
        <div>
          <dt>Zakres innych osób</dt>
          <dd>{excerpt(project.others)}</dd>
        </div>
      </dl>
      <div className="profile-project-boundaries">
        <p>
          <strong>Podstawa wyniku:</strong> {excerpt(project.measurement, 180)}
        </p>
        <p>
          <strong>Ograniczenia i niewiadome:</strong> {excerpt(project.limits, 180)}
        </p>
      </div>
      <details
        id={detailsId}
        className="profile-project-details"
        open={expanded}
        onToggle={(event) => setExpanded(event.currentTarget.open)}
      >
        <summary>
          Pełny opis projektu i podział odpowiedzialności{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </summary>
        <div className="profile-project-full">
          {groups.map((group) => (
            <section key={group.title}>
              <h4>
                {group.title.startsWith("01") ? "Projekt i Twoja rola" : group.title.slice(4)}
              </h4>
              <dl>
                {group.fields
                  .filter(
                    (field) => !["title", "role", "period", "target", "link"].includes(field.name),
                  )
                  .map((field) => (
                    <div key={field.name}>
                      <dt>{field.label}</dt>
                      <dd>
                        {project[field.name as keyof ProfileProjectDraft] ||
                          "Nie udostępniono dodatkowego materiału."}
                      </dd>
                    </div>
                  ))}
              </dl>
            </section>
          ))}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Otwórz publiczny przykład (nowa karta)
            </a>
          )}
        </div>
      </details>
      <p className="profile-project-caption">
        Deklarowany zakres pracy. Opis nie jest niezależnym potwierdzeniem kompetencji.
      </p>
    </article>
  );
}

export function ProfileProjectSection({ preview = false }: { preview?: boolean }) {
  const { state, run } = usePrototype();
  const person = currentPerson(state)!;
  const [editing, setEditing] = useState(Boolean(person.projectDraft) && !preview);
  const [draft, setDraft] = useState<ProjectDraft>({
    ...blankDraft,
    ...(person.projectDraft ?? person.project),
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [confirmExample, setConfirmExample] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  function toProfileDraft(): ProfileProjectDraft {
    return profileProjectDraftSchema.parse(draft);
  }
  function loadExample() {
    setDraft({ ...exampleDraft, target: "" });
    setErrors({});
    setDirty(true);
    setConfirmExample(false);
    setMessage("Wczytano fikcyjny przykład do edycji. Nie został jeszcze dodany do profilu.");
    requestAnimationFrame(() => document.getElementById("profile-project-title")?.focus());
  }
  return (
    <section className="profile-project" aria-labelledby="profile-project-heading">
      <header className="profile-project-section-heading">
        <div>
          <p className="profile-project-eyebrow">Doświadczenie, które można zrozumieć</p>
          <h2 id="profile-project-heading" tabIndex={-1} ref={heading}>
            {preview ? "Najważniejszy projekt" : "Mój projekt"}
          </h2>
          <p>
            {preview
              ? "Własny wkład, rezultat i granice odpowiedzialności — przed lekturą CV."
              : "Opisz jeden projekt. Pokaż, za co odpowiadasz i co było pracą zespołu."}
          </p>
        </div>
        {!preview && !editing && (
          <Button
            variant={person.project ? "outline" : "default"}
            onClick={() => {
              setEditing(true);
              requestAnimationFrame(() =>
                document.getElementById("profile-project-title")?.focus(),
              );
            }}
          >
            {person.project ? (
              <FilePenLine size={16} aria-hidden="true" />
            ) : (
              <Plus size={16} aria-hidden="true" />
            )}
            {person.project ? "Edytuj projekt" : "Opisz projekt"}
          </Button>
        )}
      </header>
      {person.project && <ProjectContributionSummary project={person.project} />}
      {!person.project && !editing && (
        <div className="profile-project-empty">
          <span className="profile-project-empty-icon" aria-hidden="true">
            <img src={profileRobot} alt="" width={64} height={77} />
          </span>
          <div>
            <h3>
              {preview
                ? "Nie dodano jeszcze projektu"
                : "Za Twoim doświadczeniem stoi konkretna praca."}
            </h3>
            <p>
              {preview
                ? "Po zapisaniu pełnego opisu tutaj pojawi się skrót dla rekrutera. Niepełny szkic pozostaje w edycji."
                : "Oddziel swoje działania od pracy innych. Nie potrzebujesz publicznego repozytorium ani danych poprzedniego pracodawcy."}
            </p>
          </div>
        </div>
      )}
      {preview && (
        <p className="profile-project-preview-note">
          Podgląd sposobu prezentacji rekruterowi. Projekt nie jest automatycznie dołączany do
          aplikacji ani udostępniany firmom.
        </p>
      )}
      {!preview && editing && (
        <form
          ref={form}
          noValidate
          className="contribution-sheet profile-project-editor"
          aria-label="Opis projektu w profilu"
          onSubmit={(event) => {
            event.preventDefault();
            const result = profileProjectSchema.safeParse(toProfileDraft());
            if (!result.success) {
              const next: Partial<Record<FieldName, string>> = {};
              for (const issue of result.error.issues)
                next[issue.path[0] as FieldName] ??= issue.message;
              setErrors(next);
              setMessage("Uzupełnij oznaczone pola. Niepełny opis możesz zachować jako szkic.");
              requestAnimationFrame(() =>
                form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
              );
              return;
            }
            if (run({ type: "profile_project_save", value: result.data })) {
              setEditing(false);
              setDirty(false);
              setErrors({});
              setMessage("Zaktualizowano projekt w profilu. Skrót jest gotowy do podglądu.");
              requestAnimationFrame(() => heading.current?.focus());
            }
          }}
        >
          <header className="profile-project-editor-intro">
            <h3>Opisz projekt i swój wkład</h3>
            <p>
              Używaj danych przykładowych. Wpisz także to, czego nie wykonywałaś lub nie
              wykonywałeś. Dopasowanie do konkretnej oferty opiszesz przy aplikowaniu.
            </p>
            <p className="profile-project-caption">
              Szkic jest przypisany do {person.name}.{" "}
              {dirty
                ? "Masz niezapisane zmiany."
                : person.projectDraft
                  ? "Przywrócono zapisany szkic."
                  : "Pełny opis pojawi się w podglądzie po zapisaniu do profilu."}
            </p>
          </header>
          <div className="profile-project-example">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                Object.values(draft).some((value) => typeof value === "string" && value.trim())
                  ? setConfirmExample(true)
                  : loadExample()
              }
            >
              Wczytaj fikcyjny przykład
            </Button>
            {confirmExample && (
              <div>
                <p>
                  Przykład zastąpi bieżącą treść edytora. Zapisany projekt pozostanie bez zmian do
                  zatwierdzenia.
                </p>
                <Button type="button" onClick={loadExample}>
                  Zastąp opis przykładem
                </Button>
                <Button type="button" variant="outline" onClick={() => setConfirmExample(false)}>
                  Zachowaj mój opis
                </Button>
              </div>
            )}
          </div>
          <ProjectContributionFields
            profile
            prefix="profile-project"
            value={draft}
            errors={errors}
            onChange={(name, value) => {
              setDraft({ ...draft, [name]: value });
              setErrors({ ...errors, [name]: undefined });
              setDirty(true);
              setMessage("");
            }}
          />
          <div className="profile-project-actions">
            <Button type="submit">Zapisz projekt w profilu</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (run({ type: "profile_project_draft", value: toProfileDraft() })) {
                  setDirty(false);
                  setEditing(false);
                  setMessage(
                    "Zaktualizowano szkic. Podgląd pokazuje wyłącznie ostatni pełny opis.",
                  );
                  requestAnimationFrame(() => heading.current?.focus());
                }
              }}
            >
              Zapisz szkic i zamknij
            </Button>
          </div>
        </form>
      )}
      <p className="profile-project-status" role="status">
        {message}
      </p>
      {!preview && person.projectDraft && !editing && (
        <p className="profile-project-draft-note">
          Masz zapisany szkic.{" "}
          <Button
            variant="link"
            onClick={() => {
              setEditing(true);
              requestAnimationFrame(() =>
                document.getElementById("profile-project-title")?.focus(),
              );
            }}
          >
            Kontynuuj opis projektu
          </Button>
        </p>
      )}
      {!preview && person.project && (
        <Link className={buttonVariants({ variant: "outline" })} to="/app/profil/podglad">
          Zobacz profil oczami rekrutera <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      )}
    </section>
  );
}
