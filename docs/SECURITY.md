# Prototype data boundary

This teaching prototype has no production server or real authentication. Role-specific UI and local transition checks organize the scenario; anyone using the browser can inspect browser-local data. Use synthetic data only.

The React scenario exposes one recruiter account in the employer entry flow and keeps role selection browser-local; the separate static DoRobory.AI demo also includes one passwordless recruiter identity. Neither selector is authentication, access control or a private recruiter workspace. Anyone using the browser can select a role or edit stored data. Recruiter-created offers, application stages and decisions remain in that browser and are not sent to employers or other devices. Do not enter real candidate data or use the demo for employment decisions.

Never put API keys, credentials, real CVs or private material in frontend source, JSON, localStorage or exports. Exports include recruiter notes. The optional static candidate interview uses a local Vite development/preview middleware on loopback. It reads `OPENAI_API_KEY` from the developer's ignored `.env.local`; the key is not exposed to browser code. Keep `.env.local` untracked and do not paste the key into chat or commit it.

After an explicit candidate opt-in, the middleware sends the selected synthetic profile's headline, description, experience, projects, skills and tools plus the selected synthetic offer to OpenAI to draft three interview questions. Recorded answers are sent to OpenAI for transcription; the three submitted answers and offer context are sent for a short summary. The attached PDF is not read or sent. The Responses API requests use `store: false`. The browser stores application text in localStorage and recordings in IndexedDB; this same-browser demo has no authentication or role confidentiality. Do not use real applicant material in this feature.

The AI routes are available only through `npm run dev` and Vite preview middleware. `npm run build` creates a static site without those routes; this code is not a production backend. No CV audio or answer content is written to server logs by this middleware.

Render imported text through React text nodes, validate imports with shared Zod schemas, reject unsupported versions, duplicate IDs, broken references and oversized files. Never overwrite an unreadable save automatically.
