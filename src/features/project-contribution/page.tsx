import { ProjectContributionFields } from "./form-fields";
import { groups } from "./fields";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BackLink } from "@/components/back-link";
import {
  blankDraft,
  draftSchema,
  exampleDraft,
  projectSchema,
  type FieldName,
  type ProjectDraft,
} from "./model";
import "./project-contribution.css";

export const PROJECT_DRAFT_KEY = "doroboty-project-workshop-v1";

function readDraft(): { draft: ProjectDraft; message: string } {
  try {
    const stored = localStorage.getItem(PROJECT_DRAFT_KEY);
    if (!stored) return { draft: { ...blankDraft }, message: "" };
    const parsed = draftSchema.safeParse(JSON.parse(stored));
    if (!parsed.success) throw new Error("Invalid draft");
    return { draft: parsed.data, message: "Przywrócono zapisany szkic ćwiczeniowy." };
  } catch {
    return {
      draft: { ...blankDraft },
      message:
        "Nie udało się odczytać szkicu. Poprzedni zapis nie został zmieniony. Możesz pracować w tej karcie.",
    };
  }
}

export default function ProjectContributionPage() {
  const [initial] = useState(readDraft);
  const [draft, setDraft] = useState(initial.draft);
  const [message, setMessage] = useState(initial.message);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [preview, setPreview] = useState(false);
  const [dirty, setDirty] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const previewTitle = useRef<HTMLHeadingElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const [confirmExample, setConfirmExample] = useState(false);
  function loadExample() {
    setDraft({ ...exampleDraft });
    setErrors({});
    setDirty(true);
    setMessage("Wczytano fikcyjny przykład. Szkic na dysku nie został nadpisany.");
    setConfirmExample(false);
    requestAnimationFrame(() => document.getElementById("project-title")?.focus());
  }
  function save() {
    try {
      localStorage.setItem(PROJECT_DRAFT_KEY, JSON.stringify(draft));
      setDirty(false);
      setMessage("Zapisano szkic w tej przeglądarce. Nie wysłano go do firmy.");
    } catch {
      setMessage(
        "Nie udało się zapisać szkicu. Pozostaw tę kartę otwartą i skopiuj treść przed jej zamknięciem.",
      );
    }
  }
  return (
    <section className="contribution-page">
      <BackLink to="/oferty">Wróć do ofert</BackLink>
      <header className="contribution-intro">
        <span className="contribution-eyebrow">Twój projekt. Twój wkład.</span>
        <h1>
          Pokaż, co zrobiłaś.
          <br />
          Pokaż, co zrobiłeś.
        </h1>
        <p>
          Jeden konkretny projekt, czytelny podział odpowiedzialności. Pomóż rekruterowi zrozumieć
          Twoją pracę przed pierwszą rozmową.
        </p>
      </header>
      <p className="contribution-local">
        Warsztat prototypowy • Używaj danych przykładowych. Jeden szkic w tej przeglądarce, wspólny
        dla wybranych osób. Nie trafia do aplikacji ani do firmy.
      </p>
      <div className="contribution-toolbar">
        <Button
          ref={editButton}
          variant={preview ? "outline" : "default"}
          onClick={() => {
            setPreview(false);
            requestAnimationFrame(() => editButton.current?.focus());
          }}
          aria-pressed={!preview}
        >
          Edytuj opis
        </Button>
        <span>{dirty ? "Zmiany niezapisane" : "Szkic ćwiczeniowy"}</span>
        <Button variant="outline" onClick={save}>
          Zapisz szkic
        </Button>
      </div>
      <p className="contribution-status" role="status">
        {message}
      </p>
      {preview ? (
        <article
          className="contribution-sheet contribution-preview"
          aria-labelledby="recruiter-preview"
        >
          <div className="contribution-preview-label">Podgląd dla rekrutera • opis kandydata</div>
          <h2 id="recruiter-preview" tabIndex={-1} ref={previewTitle}>
            {draft.title}
          </h2>
          <p>
            {draft.role} · {draft.period}
          </p>
          <p className="contribution-disclaimer">
            To deklarowany zakres pracy. Materiał nie stanowi niezależnego potwierdzenia
            kompetencji.
          </p>
          {groups.map((group) => (
            <section className="contribution-reading" key={group.title}>
              <h3>{group.title.slice(4)}</h3>
              <dl>
                {group.fields
                  .filter((field) => !["title", "role", "period", "link"].includes(field.name))
                  .map((field) => (
                    <div key={field.name}>
                      <dt>{field.label}</dt>
                      <dd>
                        {draft[field.name].trim() || "Nie udostępniono dodatkowego materiału."}
                      </dd>
                    </div>
                  ))}
              </dl>
            </section>
          ))}
          {draft.link && (
            <a href={draft.link} target="_blank" rel="noopener noreferrer">
              Otwórz przykład kandydata (nowa karta)
            </a>
          )}
          <div className="contribution-actions">
            <Button
              onClick={() => {
                setPreview(false);
                requestAnimationFrame(() => document.getElementById("project-own")?.focus());
              }}
            >
              Popraw opis wkładu
            </Button>
          </div>
        </article>
      ) : (
        <div className="contribution-layout">
          <form
            className="contribution-sheet"
            ref={form}
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const result = projectSchema.safeParse(draft);
              if (!result.success) {
                const next: Partial<Record<FieldName, string>> = {};
                for (const issue of result.error.issues) {
                  const name = issue.path[0] as FieldName;
                  next[name] ??= issue.message;
                }
                setErrors(next);
                setMessage(
                  "Uzupełnij oznaczone pola przed podglądem. Niepełny szkic możesz zapisać.",
                );
                requestAnimationFrame(() =>
                  form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
                );
                return;
              }
              setDraft(result.data);
              setErrors({});
              setPreview(true);
              setMessage("Otworzono podgląd. Nic nie zostało wysłane.");
              requestAnimationFrame(() => previewTitle.current?.focus());
            }}
          >
            <ProjectContributionFields
              value={draft}
              errors={errors}
              onChange={(name, value) => {
                setDraft({ ...draft, [name]: value });
                setDirty(true);
                setMessage("");
                setErrors({ ...errors, [name]: undefined });
              }}
            />
            <div className="contribution-actions">
              <Button type="submit">Zobacz oczami rekrutera</Button>
              <span>Możesz wrócić i poprawić każdą odpowiedź.</span>
            </div>
          </form>
          <aside className="contribution-guide" aria-label="Pomoc w opisie projektu">
            <h2>Konkretnie, po Twojemu.</h2>
            <ol>
              <li>
                <strong>Twoja praca</strong>
                <p>Co zrobiłaś lub zrobiłeś osobiście? Co po tym zostało?</p>
              </li>
              <li>
                <strong>Granice odpowiedzialności</strong>
                <p>Co było wspólne, a co należało do innych?</p>
              </li>
              <li>
                <strong>Rezultat i niewiadome</strong>
                <p>Co wiadomo z pomiaru, a czego jeszcze nie wiesz?</p>
              </li>
            </ol>
            <p>
              Nie opisuj całej kariery. Jeden dobrze rozpisany projekt daje więcej kontekstu niż
              lista narzędzi.
            </p>
            <Button
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
              <div className="contribution-confirm">
                <p>
                  Przykład zastąpi niezapisany opis w formularzu. Zapisany szkic pozostanie bez
                  zmian do kolejnego zapisu.
                </p>
                <Button onClick={loadExample}>Zastąp opis przykładem</Button>
                <Button variant="outline" onClick={() => setConfirmExample(false)}>
                  Zachowaj mój opis
                </Button>
              </div>
            )}
            <p className="contribution-caption">
              Wypełnienie pól pomaga uporządkować opis. Nie gwarantuje zaproszenia i nie jest oceną
              umiejętności.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
