import { categoryLabel, sampleMessages, type WorkSample } from "./work-sample-model";

export function WorkSampleEvidence({ sample }: { sample: WorkSample }) {
  return (
    <div className="work-sample-evidence">
      <h3>Twoje polecenie dla AI</h3>
      <p className="work-sample-quote">{sample.prompt}</p>
      <h3>Propozycja AI i Twoje decyzje</h3>
      <p className="work-sample-disclosure">
        Propozycja AI była symulacją. Poniżej pokazujemy zapisane wybory, bez automatycznej oceny
        ich poprawności.
      </p>
      {sampleMessages.map((message, index) => (
        <article className="work-sample-message" key={message.id}>
          <h4>{message.id} · Wiadomość klienta</h4>
          <p>{message.text}</p>
          <dl className="work-sample-comparison">
            <div>
              <dt>Propozycja AI</dt>
              <dd>{categoryLabel(message.proposed)}</dd>
            </div>
            <div>
              <dt>Twoja kategoria</dt>
              <dd>{categoryLabel(sample.categories[index])}</dd>
            </div>
          </dl>
        </article>
      ))}
      <h3>Twoje wyjaśnienie weryfikacji</h3>
      <p className="work-sample-quote">{sample.explanation}</p>
      <p>
        Ten zapis dotyczy wyłącznie tego zadania. Nie potwierdza innych umiejętności ani
        samodzielnego wykonania pracy poza tą sesją.
      </p>
    </div>
  );
}
