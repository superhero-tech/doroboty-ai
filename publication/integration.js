// Route accepted marketing entry points into the approved portal and profile.
/* global selectedCategory, onlySaved */
const resultUrl = (query, city) => {
  const url = new URL("portal/wyniki.html", location.href);
  if (query) url.searchParams.set("q", query);
  if (city && city !== "all") url.searchParams.set("city", city === "remote" ? "Zdalnie" : city);
  return url.href;
};
for (const [id, query, city] of [
  ["hero-search", "hero-query", "hero-location"],
  ["search-form", "search", "location"],
]) {
  document.getElementById(id)?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign(
        resultUrl(document.getElementById(query).value, document.getElementById(city).value),
      );
    },
    { capture: true },
  );
}
// The accepted portal is the source of both cards and saved-offer identifiers.
let savedOffers;
try {
  savedOffers = new Set(JSON.parse(localStorage.getItem("doroboty-saved-v1") || "[]"));
} catch {
  savedOffers = new Set();
}
const publicationNormalize = (text) =>
  text
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const specialty = {
  ML: "Machine Learning",
  GenAI: "LLM",
  Data: "Data",
  Engineering: "Engineer",
  Product: "Product",
};
window.DR_RENDER_LANDING = () => {
  const query = publicationNormalize(document.getElementById("search").value);
  const city = document.getElementById("location").value;
  let filtered = window.DR_JOBS.filter((job) => {
    const text = publicationNormalize([job.title, job.company, ...job.tags].join(" "));
    return (
      text.includes(query) &&
      (selectedCategory === "all" ||
        text.includes(publicationNormalize(specialty[selectedCategory] || selectedCategory))) &&
      (!onlySaved || savedOffers.has(job.id)) &&
      (city === "all" || (city === "remote" ? job.mode === "Zdalnie" : job.city === city))
    );
  });
  if (document.getElementById("sort").value === "salary")
    filtered = [...filtered].sort((a, b) => (b.max ?? -1) - (a.max ?? -1));
  const list = document.getElementById("job-list");
  list.innerHTML = window.DR_RENDER_CARDS(filtered, savedOffers);
  document.getElementById("results-count").textContent = `${filtered.length} przykładowych ofert`;
  document.getElementById("saved-count").textContent = savedOffers.size;
  document.getElementById("saved-filter").setAttribute("aria-pressed", String(onlySaved));
  document.getElementById("empty-state").hidden = filtered.length > 0;
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.category === selectedCategory));
    button.classList.toggle("active", button.dataset.category === selectedCategory);
  });
  document.querySelector('[data-category="all"] span').textContent = window.DR_JOBS.length;
};
document.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest("#job-list [data-save]");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const id = button.dataset.save;
    if (savedOffers.has(id)) savedOffers.delete(id);
    else savedOffers.add(id);
    let message = "Zaktualizowano zapisane oferty.";
    try {
      localStorage.setItem("doroboty-saved-v1", JSON.stringify([...savedOffers]));
    } catch {
      message = "Zapis niedostępny. Oferta pozostaje zapisana tylko do zamknięcia strony.";
    }
    window.DR_RENDER_LANDING();
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 3000);
  },
  { capture: true },
);
window.DR_RENDER_LANDING();
