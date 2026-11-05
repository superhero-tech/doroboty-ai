import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Bot } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect } from "@/components/ui/form-select";
import type { JobWithCompany } from "@/features/jobs/types";
import { usePrototype } from "./store";
import {
  categoryLabel,
  completedWorkSampleInputSchema,
  sampleCategories,
  sampleMessages,
  type WorkSample,
  type WorkSampleInput,
} from "./work-sample-model";
import { WorkSampleLayout } from "./work-sample-layout";

export function WorkSampleTask({ job, sample }: { job: JobWithCompany; sample?: WorkSample }) {
  const { run, issue } = usePrototype();
  const navigate = useNavigate();
  const [value, setValue] = useState<WorkSampleInput>(
    sample ?? { prompt: "", generated: false, categories: ["", "", ""], explanation: "" },
  );
  const [error, setError] = useState("");
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const explanationRef = useRef<HTMLTextAreaElement>(null);
  const firstCategoryRef = useRef<HTMLDivElement>(null);
  const base = `/aplikuj/${job.slug}`;
  function update(next: WorkSampleInput) {
    setValue(next);
    setError("");
    run({ type: "work_sample", jobId: job.id, value: next, complete: false });
  }
  function generate() {
    if (value.prompt.trim().length < 10) {
      setError("Napisz polecenie o długości co najmniej 10 znaków.");
      promptRef.current?.focus();
      return;
    }
    update({
      ...value,
      generated: true,
      categories: sampleMessages.map(
        (message) => message.proposed,
      ) as WorkSampleInput["categories"],
    });
    requestAnimationFrame(() =>
      firstCategoryRef.current?.querySelector<HTMLButtonElement>("button")?.focus(),
    );
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = completedWorkSampleInputSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      if (!value.generated) promptRef.current?.focus();
      else explanationRef.current?.focus();
      return;
    }
    if (run({ type: "work_sample", jobId: job.id, value: parsed.data, complete: true }))
      navigate(`${base}/podsumowanie`);
  }
  return (
    <WorkSampleLayout
      job={job}
      step={2}
      action={
        <Link className={buttonVariants({ variant: "outline" })} to={`${base}/przygotowanie`}>
          Wróć do instrukcji
        </Link>
      }
    >
      <section className="pp-offer-section">
        <p className="work-sample-eyebrow">Krok 2 · Twoje zadanie</p>
        <h2>Uporządkuj zgłoszenia klientów</h2>
        <p>
          Zespół obsługi potrzebuje podziału wiadomości na: płatności, dostęp do konta i pozostałe /
          do wyjaśnienia. Napisz polecenie, sprawdź przygotowaną propozycję AI i zdecyduj o
          końcowych kategoriach.
        </p>
        <p className="work-sample-disclosure">
          <Bot aria-hidden="true" /> Symulacja AI: propozycja jest przygotowana z góry i może
          zawierać błędy.
        </p>
        <form noValidate onSubmit={submit} className="work-sample-form">
          <div className="work-sample-field">
            <label htmlFor="sample-prompt">Twoje polecenie dla AI</label>
            <Textarea
              id="sample-prompt"
              ref={promptRef}
              value={value.prompt}
              maxLength={4000}
              readOnly={value.generated}
              aria-describedby="sample-prompt-help"
              onChange={(e) => update({ ...value, prompt: e.target.value })}
            />
            <p id="sample-prompt-help">
              Minimum 10 znaków. Napisz, jak podzielić poniższe wiadomości i co sprawdzić.
            </p>
            {!value.generated && (
              <Button type="button" onClick={generate}>
                Pokaż propozycję AI <ArrowRight />
              </Button>
            )}
          </div>
          <h3>Wiadomości do sprawdzenia</h3>
          <div className="work-sample-messages">
            {sampleMessages.map((message, index) => (
              <article key={message.id} className="work-sample-message">
                <h4>{message.id} · Wiadomość klienta</h4>
                <p>{message.text}</p>
                {value.generated && (
                  <>
                    <p className="work-sample-proposal">
                      <Bot aria-hidden="true" /> Propozycja AI: {categoryLabel(message.proposed)}
                    </p>
                    <div
                      className="work-sample-field"
                      ref={index === 0 ? firstCategoryRef : undefined}
                    >
                      <label htmlFor={`category-${message.id}`}>
                        Twoja kategoria dla {message.id}
                      </label>
                      <FormSelect
                        id={`category-${message.id}`}
                        ariaLabel={`Twoja kategoria dla ${message.id}`}
                        value={value.categories[index]}
                        options={sampleCategories}
                        onValueChange={(category) =>
                          update({
                            ...value,
                            categories: value.categories.map((old, i) =>
                              i === index
                                ? (category as WorkSampleInput["categories"][number])
                                : old,
                            ),
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
          {value.generated && (
            <div className="work-sample-field">
              <label htmlFor="sample-explanation">Jak sprawdziłeś wynik i co zmieniłeś?</label>
              <Textarea
                id="sample-explanation"
                ref={explanationRef}
                value={value.explanation}
                maxLength={12000}
                aria-describedby="sample-explanation-help"
                onChange={(e) => update({ ...value, explanation: e.target.value })}
              />
              <p id="sample-explanation-help">
                Minimum 20 znaków. Odwołaj się do M1, M2 lub M3. Jeśli zostawiasz propozycję bez
                zmian, wyjaśnij dlaczego.
              </p>
            </div>
          )}
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
          <div className="work-sample-actions">
            {value.generated && (
              <Button type="submit">
                Oddaj zadanie i zobacz podsumowanie <ArrowRight />
              </Button>
            )}
            <Link className={buttonVariants({ variant: "outline" })} to={`${base}/przygotowanie`}>
              Przerwij i wróć później
            </Link>
          </div>
          <p className="work-sample-save" role="status">
            {issue
              ? "Zapis lokalny jest niedostępny. Nie zamykaj strony; sprawdź komunikat odzyskiwania danych."
              : "Postęp zapisuje się w tej przeglądarce po każdej zmianie. Zadanie nie wysyła aplikacji."}
          </p>
        </form>
      </section>
    </WorkSampleLayout>
  );
}
