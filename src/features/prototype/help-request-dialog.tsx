import { useState } from "react";
import { z } from "zod";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { JobCategory } from "@/features/jobs/types";
import { essentialPrompt, type EssentialKey } from "./essentials";
import { Field } from "./workspace";

export type HelpRequestInput = {
  expertEmail: string;
  expertName: string;
  expertRole: string;
  message: string;
  channel: "email" | "link";
  questions: EssentialKey[];
};

const emailSchema = z.email();

export function HelpRequestDialog({
  category,
  authorName,
  title,
  askable,
  suggested,
  preselected,
  onClose,
  onSubmit,
}: {
  category: JobCategory;
  authorName: string;
  title: string;
  askable: EssentialKey[];
  /** Selected by default: open gaps the author has not skipped. */
  suggested: EssentialKey[];
  preselected: EssentialKey | null;
  onClose: () => void;
  /** Returns an error message, or null when the request was saved. */
  onSubmit: (input: HelpRequestInput) => string | null;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState<EssentialKey[]>(
    preselected ? [preselected] : suggested,
  );
  const [message, setMessage] = useState(
    `Przygotowuję ogłoszenie${title.trim() ? ` na stanowisko ${title.trim()}` : ""}. Kilka minut teraz może oszczędzić Ci rozmów z osobami, które nie pasują.`,
  );
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  function submit(channel: "email" | "link") {
    setEmailError("");
    setError("");
    if (channel === "email" && !emailSchema.safeParse(email.trim()).success) {
      setEmailError("Wpisz pełny adres e-mail albo skopiuj link i wyślij go samodzielnie.");
      return;
    }
    if (channel === "link" && email.trim() && !emailSchema.safeParse(email.trim()).success) {
      setEmailError("Popraw adres e-mail albo zostaw to pole puste.");
      return;
    }
    if (!name.trim()) {
      setError("Wpisz imię eksperta. Zobaczysz je przy jego odpowiedziach.");
      return;
    }
    if (!questions.length) {
      setError("Wybierz co najmniej jedno pytanie.");
      return;
    }
    const problem = onSubmit({
      expertEmail: email.trim(),
      expertName: name.trim(),
      expertRole: role.trim(),
      message: message.trim(),
      channel,
      questions,
    });
    if (problem) setError(problem);
  }

  // Questions the author did not choose to ask but which are also open stay available.
  const options =
    preselected && !askable.includes(preselected) ? [preselected, ...askable] : askable;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="help-request-dialog sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Poproś o pomoc przy ogłoszeniu</DialogTitle>
          <DialogDescription>
            Ekspert dostanie link do pytań, których nie znasz. Nie potrzebuje konta.
          </DialogDescription>
        </DialogHeader>
        <div className="help-request-body">
          <Field label="E-mail eksperta">
            <Input
              type="email"
              autoComplete="off"
              placeholder="imie.nazwisko@firma.pl"
              value={email}
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? "expert-email-error" : undefined}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
          </Field>
          {emailError && (
            <p id="expert-email-error" role="alert" className="error-message">
              {emailError}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Imię">
              <Input value={name} maxLength={200} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Rola (opcjonalnie)">
              <Input
                value={role}
                maxLength={200}
                placeholder="Tech Lead"
                onChange={(e) => setRole(e.target.value)}
              />
            </Field>
          </div>
          <fieldset className="help-request-questions">
            <legend>Pytania</legend>
            {options.map((key) => (
              <label key={key} className="flex items-start gap-3">
                <Checkbox
                  checked={questions.includes(key)}
                  onCheckedChange={(checked) =>
                    setQuestions((current) =>
                      checked ? [...current, key] : current.filter((x) => x !== key),
                    )
                  }
                />
                <span>{essentialPrompt(key, category)}</span>
              </label>
            ))}
          </fieldset>
          <Field label="Wiadomość">
            <Textarea
              className="min-h-20"
              maxLength={2000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Field>
          <p className="essential-hint">
            Szkic zostanie zapisany. Możesz opublikować ofertę bez odpowiedzi. Wysyła: {authorName}.
          </p>
          {error && (
            <p role="alert" className="error-message">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => submit("link")}>
            <Copy aria-hidden="true" /> Kopiuj link
          </Button>
          <Button type="button" onClick={() => submit("email")}>
            Wyślij prośbę
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
