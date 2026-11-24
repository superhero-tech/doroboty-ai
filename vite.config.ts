import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {
  defineConfig,
  loadEnv,
  type Connect,
  type Plugin,
  type PreviewServer,
  type ViteDevServer,
} from "vite";
import type { ServerResponse } from "node:http";
import { fileURLToPath } from "node:url";

const json = (response: ServerResponse, status: number, payload: Record<string, unknown>) => {
  response.statusCode = status;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.setHeader("cache-control", "no-store");
  response.setHeader("x-content-type-options", "nosniff");
  response.end(JSON.stringify(payload));
};

class RequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

class OpenAIRequestError extends Error {
  constructor(readonly status: number) {
    super("OpenAI request failed.");
  }
}

const readBody = (request: Connect.IncomingMessage, maximumBytes: number): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const declaredLength = Number(request.headers["content-length"] || 0);
    if (declaredLength > maximumBytes) {
      request.resume();
      reject(new RequestError("Request is too large.", 413));
      return;
    }
    const chunks: Buffer[] = [];
    let size = 0;
    let tooLarge = false;
    request.on("data", (chunk: Buffer | string) => {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buffer.length;
      if (size > maximumBytes) {
        tooLarge = true;
        chunks.length = 0;
        return;
      }
      if (!tooLarge) chunks.push(buffer);
    });
    request.on("end", () => {
      if (tooLarge) reject(new RequestError("Request is too large.", 413));
      else resolve(Buffer.concat(chunks));
    });
    request.on("error", reject);
  });

const readJson = async (request: Connect.IncomingMessage): Promise<Record<string, unknown>> => {
  const bytes = await readBody(request, 96 * 1024);
  try {
    const value: unknown = JSON.parse(bytes.toString("utf8"));
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Expected an object.");
    }
    return value as Record<string, unknown>;
  } catch {
    throw new RequestError("Invalid JSON request.", 400);
  }
};

const asText = (value: unknown, maximumLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maximumLength) : "";

const cleanQuestionsContext = (value: unknown) => {
  if (!value || typeof value !== "object") {
    throw new RequestError("Missing interview context.", 400);
  }
  const context = value as Record<string, unknown>;
  const cv =
    context.cv && typeof context.cv === "object" ? (context.cv as Record<string, unknown>) : {};
  const offer =
    context.offer && typeof context.offer === "object"
      ? (context.offer as Record<string, unknown>)
      : {};
  const experience = Array.isArray(cv.experience) ? cv.experience : [];
  const projects = Array.isArray(cv.projects) ? cv.projects : [];
  const skills = Array.isArray(cv.skills) ? cv.skills : [];
  const cleanExperience = experience.slice(0, 8).map((entry) => {
    const item = entry && typeof entry === "object" ? entry : {};
    const record = item as Record<string, unknown>;
    return {
      title: asText(record.title, 180),
      company: asText(record.company, 180),
      period: asText(record.period, 80),
      bullets: Array.isArray(record.bullets)
        ? record.bullets.slice(0, 8).map((bullet) => asText(bullet, 700))
        : [],
    };
  });
  const cleanProjects = projects.slice(0, 8).map((entry) => {
    const item = entry && typeof entry === "object" ? entry : {};
    const record = item as Record<string, unknown>;
    return {
      title: asText(record.title, 180),
      text: asText(record.text, 900),
    };
  });
  const cleanSkills = skills.slice(0, 12).map((entry) => {
    const item = entry && typeof entry === "object" ? entry : {};
    const record = item as Record<string, unknown>;
    return {
      label: asText(record.label, 100),
      values: Array.isArray(record.values)
        ? record.values.slice(0, 20).map((skill) => asText(skill, 100))
        : [],
    };
  });
  const clean = {
    cv: {
      headline: asText(cv.headline, 180),
      about: asText(cv.about, 1600),
      experience: cleanExperience,
      projects: cleanProjects,
      skills: cleanSkills,
      tools: Array.isArray(cv.tools) ? cv.tools.slice(0, 30).map((tool) => asText(tool, 100)) : [],
    },
    offer: {
      title: asText(offer.title, 180),
      company: asText(offer.company, 180),
      summary: asText(offer.summary, 1000),
      responsibility: asText(offer.responsibility, 1000),
      mandate: asText(offer.mandate, 1000),
      team: asText(offer.team, 1000),
      process: asText(offer.process, 700),
    },
  };
  if (!clean.cv.headline || !clean.offer.title) {
    throw new RequestError("CV headline and offer title are required.", 400);
  }
  return clean;
};

const getResponseText = (result: Record<string, unknown>): string => {
  if (typeof result.output_text === "string") return result.output_text;
  const output = Array.isArray(result.output) ? result.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as Record<string, unknown>).content;
    if (!Array.isArray(content)) continue;
    const text = content.find(
      (part) =>
        part &&
        typeof part === "object" &&
        (part as Record<string, unknown>).type === "output_text",
    ) as Record<string, unknown> | undefined;
    if (typeof text?.text === "string") return text.text;
  }
  throw new Error("OpenAI returned no output text.");
};

const callResponses = async (apiKey: string, body: Record<string, unknown>): Promise<string> => {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(90_000),
  });
  if (!response.ok) throw new OpenAIRequestError(response.status);
  const result: unknown = await response.json();
  if (!result || typeof result !== "object") {
    throw new Error("Invalid OpenAI response.");
  }
  return getResponseText(result as Record<string, unknown>);
};

const questionSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: { question: { type: "string" } },
        required: ["question"],
        additionalProperties: false,
      },
    },
  },
  required: ["questions"],
  additionalProperties: false,
};

const summarySchema = {
  type: "object",
  properties: { summary: { type: "string" } },
  required: ["summary"],
  additionalProperties: false,
};

const interviewApi = (): Plugin => {
  const register = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use(async (request, response, next) => {
      const path = request.url?.split("?", 1)[0];
      if (!path?.startsWith("/api/ai-interview/")) return next();

      const address = request.socket.remoteAddress || "";
      const loopback =
        address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
      if (!loopback) return json(response, 403, { error: "local_only" });

      const origin = request.headers.origin;
      if (origin) {
        try {
          if (new URL(origin).host !== request.headers.host) {
            return json(response, 403, { error: "origin_not_allowed" });
          }
        } catch {
          return json(response, 403, { error: "origin_not_allowed" });
        }
      }
      if (request.method !== "POST") {
        response.setHeader("allow", "POST");
        return json(response, 405, { error: "method_not_allowed" });
      }

      try {
        const apiKey =
          process.env.OPENAI_API_KEY ||
          loadEnv(server.config.mode, process.cwd(), "").OPENAI_API_KEY;
        if (!apiKey) return json(response, 503, { error: "openai_not_configured" });

        if (path === "/api/ai-interview/questions") {
          const payload = await readJson(request);
          const context = cleanQuestionsContext(payload.context);
          const output = await callResponses(apiKey, {
            model: "gpt-5-mini",
            store: false,
            max_output_tokens: 900,
            instructions:
              "Napisz po polsku dokładnie trzy konkretne, otwarte pytania do rozmowy rekrutacyjnej. Oprzyj każde pytanie na faktach z przekazanego CV i powiąż je z wymaganiami tej oferty. Pytania mają zapraszać do opisania własnego wkładu, decyzji lub rezultatów. Nie pytaj o cechy chronione, zdrowie, wiek, rodzinę ani inne prywatne sprawy. Nie oceniaj kandydata, nie punktuj, nie rekomenduj decyzji i nie wymyślaj faktów. Zwróć wyłącznie dane zgodne ze schematem.",
            input: JSON.stringify(context),
            text: {
              format: {
                type: "json_schema",
                name: "interview_questions",
                strict: true,
                schema: questionSchema,
              },
            },
          });
          const parsed: unknown = JSON.parse(output);
          const questions =
            parsed &&
            typeof parsed === "object" &&
            Array.isArray((parsed as Record<string, unknown>).questions)
              ? ((parsed as Record<string, unknown>).questions as unknown[])
              : [];
          const clean = questions
            .slice(0, 3)
            .map((item) =>
              item && typeof item === "object"
                ? asText((item as Record<string, unknown>).question, 320)
                : "",
            )
            .filter(Boolean);
          if (clean.length !== 3) throw new Error("Invalid question set.");
          return json(response, 200, { questions: clean });
        }

        if (path === "/api/ai-interview/transcribe") {
          const contentType = String(request.headers["content-type"] || "")
            .split(";", 1)[0]
            .trim()
            .toLowerCase();
          if (
            !["audio/webm", "audio/mp4", "audio/ogg", "audio/wav", "audio/mpeg"].includes(
              contentType,
            )
          ) {
            return json(response, 415, { error: "audio_type_not_supported" });
          }
          const audio = await readBody(request, 25 * 1024 * 1024);
          if (!audio.length) throw new RequestError("Audio is empty.", 400);
          const form = new FormData();
          form.append(
            "file",
            new File([Uint8Array.from(audio)], `answer.${contentType.split("/")[1]}`, {
              type: contentType,
            }),
          );
          form.append("model", "gpt-transcribe");
          form.append("languages[]", "pl");
          form.append("response_format", "json");
          const transcriptionResponse = await fetch(
            "https://api.openai.com/v1/audio/transcriptions",
            {
              method: "POST",
              headers: { authorization: `Bearer ${apiKey}` },
              body: form,
              signal: AbortSignal.timeout(120_000),
            },
          );
          if (!transcriptionResponse.ok) throw new OpenAIRequestError(transcriptionResponse.status);
          const result: unknown = await transcriptionResponse.json();
          const transcript =
            result && typeof result === "object"
              ? asText((result as Record<string, unknown>).text, 12_000)
              : "";
          if (!transcript) throw new Error("OpenAI returned an empty transcription.");
          return json(response, 200, { transcript });
        }

        if (path === "/api/ai-interview/summary") {
          const payload = await readJson(request);
          const offer =
            payload.offer && typeof payload.offer === "object"
              ? (payload.offer as Record<string, unknown>)
              : {};
          const answers = Array.isArray(payload.answers) ? payload.answers : [];
          const cleanAnswers = answers.slice(0, 3).map((entry) => {
            const item = entry && typeof entry === "object" ? entry : {};
            const record = item as Record<string, unknown>;
            return {
              question: asText(record.question, 320),
              answer: asText(record.answer, 4000),
            };
          });
          if (
            cleanAnswers.length !== 3 ||
            cleanAnswers.some((item) => !item.question || !item.answer)
          ) {
            throw new RequestError("Three completed answers are required.", 400);
          }
          const context = {
            offer: {
              title: asText(offer.title, 180),
              company: asText(offer.company, 180),
              summary: asText(offer.summary, 1000),
              responsibility: asText(offer.responsibility, 1000),
            },
            answers: cleanAnswers,
          };
          const output = await callResponses(apiKey, {
            model: "gpt-5-mini",
            store: false,
            max_output_tokens: 300,
            instructions:
              "Po polsku napisz krótkie, rzeczowe podsumowanie trzech odpowiedzi kandydata, najwyżej 500 znaków. Podaj wyłącznie informacje zawarte w odpowiedziach. Nie oceniaj, nie twórz rankingu ani rekomendacji zatrudnienia. Nie wnioskuj o cechach chronionych. Podsumowanie jest roboczą pomocą do weryfikacji przez rekrutera.",
            input: JSON.stringify(context),
            text: {
              format: {
                type: "json_schema",
                name: "interview_summary",
                strict: true,
                schema: summarySchema,
              },
            },
          });
          const parsed: unknown = JSON.parse(output);
          const summary =
            parsed && typeof parsed === "object"
              ? asText((parsed as Record<string, unknown>).summary, 500)
              : "";
          if (!summary) throw new Error("OpenAI returned an empty summary.");
          return json(response, 200, { summary });
        }

        return json(response, 404, { error: "not_found" });
      } catch (error) {
        if (error instanceof RequestError) {
          return json(response, error.status, { error: "invalid_request" });
        }
        if (error instanceof OpenAIRequestError && (error.status === 401 || error.status === 403)) {
          return json(response, 502, { error: "openai_auth_failed" });
        }
        if (error instanceof OpenAIRequestError && error.status === 429) {
          return json(response, 429, { error: "openai_rate_limited" });
        }
        return json(response, 502, { error: "openai_request_failed" });
      }
    });
  };

  return {
    name: "local-openai-interview-api",
    configureServer: register,
    configurePreviewServer: register,
  };
};

export default defineConfig({
  plugins: [react(), tailwindcss(), interviewApi()],
  base: "./",
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
