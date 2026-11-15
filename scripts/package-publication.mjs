import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const root = process.cwd();
const output = path.resolve(root, "publish");
if (path.dirname(output) !== root || path.basename(output) !== "publish")
  throw new Error("Publication output must stay inside the project.");
if (fs.existsSync(output)) {
  if (!fs.existsSync(path.join(output, "release.json")))
    throw new Error("Refusing to replace an unrecognized folder.");
  fs.rmSync(output, { recursive: true });
}
fs.mkdirSync(output);
fs.cpSync(path.join(root, "dist"), path.join(output, "profil"), { recursive: true });
for (const name of ["index.html", "styles.css", "app.js", "robot.svg"])
  fs.copyFileSync(path.join(root, "publication/landing", name), path.join(output, name));
fs.cpSync(path.join(root, "publication/portal"), path.join(output, "portal"), { recursive: true });
for (const name of ["integration.css", "integration.js"])
  fs.copyFileSync(path.join(root, "publication", name), path.join(output, name));

let landing = fs.readFileSync(path.join(output, "index.html"), "utf8");
landing = landing.replace(/\s*<link[^>]+(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>/g, "");
landing = landing.replace(
  "</head>",
  '<link rel="stylesheet" href="portal/assets/doroboty.css"><link rel="stylesheet" href="portal/portal.css"><link rel="stylesheet" href="portal/refinements.css"><link rel="stylesheet" href="integration.css"><script src="portal/jobs.js" defer></script><script src="catalog-cards.js" defer></script><script src="integration.js" defer></script></head>',
);
landing = landing.replace(
  "</nav>",
  '<a href="portal/wyniki.html">Portal ofert</a><a href="profil/#/app/profil">Mój profil</a><a href="profil/#/app/profil/podglad">Podgląd kandydata</a></nav>',
);
fs.writeFileSync(path.join(output, "index.html"), landing);
landing = landing.replace(
  '<div id="job-list" class="job-list"></div>',
  '<div class="dr-page publication-catalog"><div id="job-list" class="job-list"></div></div>',
);
landing = landing.replace("DEMO · 6 PRZYKŁADOWYCH OFERT", "DEMO · 9 PRZYKŁADOWYCH OFERT");
fs.writeFileSync(path.join(output, "index.html"), landing);

// Preserve approved layouts and animations; change only navigation between products.
const portalAppPath = path.join(output, "portal/app.js");
let portal = fs.readFileSync(portalAppPath, "utf8");
portal = portal.replace(
  'href="index.html" aria-label="DoRoboty.ai — strona główna"',
  'href="../" aria-label="DoRoboty.ai — strona główna"',
);
portal = portal.replace(
  '<button type="button" class="employer-link"',
  '<a href="../profil/#/app/profil">Mój profil</a><a href="../profil/#/app/profil/podglad">Podgląd kandydata</a><button type="button" class="employer-link"',
);
portal = portal.replace(
  "<p>Przygotuj szkic aplikacji.",
  '<p><a href="../profil/#/app/profil">Uzupełnij profil i opis swojego projektu ↗</a></p><p>Przygotuj szkic aplikacji.',
);
fs.writeFileSync(portalAppPath, portal);
const source = fs.readFileSync(path.join(root, "publication/portal/app.js"), "utf8");
const card = source.slice(source.indexOf("  function card(job)"), source.indexOf("  const list ="));
const bookmark = source.slice(
  source.indexOf("  const bookmarkIcon"),
  source.indexOf("  function card(job)"),
);
if (!card || !bookmark) throw new Error("Approved card renderer not found.");
fs.writeFileSync(
  path.join(output, "catalog-cards.js"),
  `window.DR_RENDER_CARDS = (jobs, saved) => {
 const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const money = value => new Intl.NumberFormat('pl-PL').format(value);
 const unit = job => job.contract === 'B2B' ? 'netto / miesiąc · B2B' : 'brutto / miesiąc · UoP';
 const salary = job => job.min == null ? '<span class="salary-missing">Nie podano wynagrodzenia</span>' : '<strong class="dr-job-salary">'+money(job.min)+'–'+money(job.max)+' zł</strong>';
 const offerUrl = job => 'portal/oferta.html?id='+encodeURIComponent(job.id);
 ${bookmark}\n${card}\nreturn jobs.map(card).join('');\n};`,
);
const landingAppPath = path.join(output, "app.js");
const landingApp = fs
  .readFileSync(landingAppPath, "utf8")
  .replaceAll("\r\n", "\n")
  .replace(
    /function renderJobs\(\) \{[\s\S]*?\n\}\nfunction setCategory/,
    "function renderJobs() { window.DR_RENDER_LANDING?.(); }\nfunction setCategory",
  );
if (!landingApp.includes("window.DR_RENDER_LANDING?.()"))
  throw new Error("Landing renderer integration failed.");
fs.writeFileSync(landingAppPath, landingApp);
const hashes = {};
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else
      hashes[path.relative(output, file).replaceAll("\\", "/")] = createHash("sha256")
        .update(fs.readFileSync(file))
        .digest("hex");
  }
}
walk(output);
const version = createHash("sha256").update(JSON.stringify(hashes)).digest("hex");
fs.writeFileSync(
  path.join(output, "release.json"),
  JSON.stringify(
    {
      name: "DoRoboty.ai — landing, portal i profil",
      version,
      scope: "Fictional prototype data only; local browser persistence; no real recruitment.",
      files: hashes,
    },
    null,
    2,
  ),
);
console.log(
  `Publication ready: ${output}\nVersion: ${version}\n${Object.keys(hashes).length} public files; no source history or research documents.`,
);
