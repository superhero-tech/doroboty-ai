# AI interview assistant

## Intent

Replace the simulated AI expansion step in the static DoRobory demo with an optional, consent-based interview flow. Generate three role-specific questions from the candidate's structured CV profile and selected offer. Let the candidate answer each question by typing or recording speech, with three minutes per question. Transcribe audio and prepare a short recruiter-facing summary through OpenAI. Keep the recruiter inbox in the same browser because this demo has no accounts or shared backend.

The OpenAI key stays on the Vite server and is read from an ignored `.env.local`. The browser must never receive the key. Do not log CV text, answers, recordings, transcripts, or summaries. The feature does not score candidates or recommend hiring decisions. AI participation remains optional, with an explicit disclosure that CV/offer context and opted-in responses are sent to OpenAI.

## Acceptance criteria

- The existing `Czy chcesz skorzystać z opcji AI?` step stays optional and explains what is sent to OpenAI; the non-AI application path remains available.
- Advancing into AI generates exactly three Polish questions using structured CV experience and the selected job offer. Uploaded PDF bytes are not available in this static flow and are not sent.
- Each question supports editable text or microphone recording, shows a three-minute timer, and retains the candidate's answer when time expires. Voice recording is stopped at the limit.
- Recorded answers are transcribed through the server-side OpenAI endpoint. The candidate can correct the transcript before submitting; the recruiter view distinguishes the original transcript from the candidate-edited answer.
- Submission stores recordings in browser IndexedDB and application metadata in the existing same-browser store. The recruiter demo page shows playable recordings, transcript, submitted answer, and a short AI summary. It supports deleting interview materials from this browser.
- The summary is factual, marked AI-generated, editable by the recruiter, and contains no fit score or hiring recommendation.
- Missing API configuration or provider failures do not block the ordinary application path; the user gets a clear error and can retry or submit without AI.
- The OpenAI key is never embedded in client code, imported data, or exports. No request content is logged. The local API is available only through Vite dev/preview middleware bound to loopback; this does not create a production backend or cross-device delivery.
- Update the behavior register and security notes. Apply the user-designated AI career moodboard and `ai-career-landing-style` skill to the changed application step and recruiter view.

## Assumptions and limits

- Three minutes means three minutes per question.
- The static demo shares state only within one browser profile; the recruiter inbox is a demonstration view, not authentication or access control.
- The API key will be supplied by the developer in `.env.local`; no key is committed or included in this task.

## Verification plan

- Exercise opt-out, question generation error, text-only answers, microphone denial, recording/transcription, transcript editing, timer expiry, final submission, recruiter playback, summary edit, and deletion.
- Check the changed flow on desktop and mobile, including keyboard focus and error recovery.
- Run `./scripts/verify` and inspect the final diff separately. Report any provider behavior that could not be exercised without a local API key.

## Visual follow-up

Align the application dialog and recruiter demo with `research/moodboard.html` and the `ai-career-landing-style` skill: deep navy layered surfaces, white and blue-gray text, cyan interaction/focus accents, yellow primary action, restrained glow, and system sans-serif headings. Keep the three progress labels horizontal and wrapping on narrow screens; the dialog body remains independently scrollable. This correction does not change application behavior; `FEATURES.md` was reviewed and needs no behavior-register update.
