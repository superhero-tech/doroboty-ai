'use strict';
const jobs = [
  { id: 1, title: 'Senior Machine Learning Engineer', company: 'Neural Studio', icon: 'n', location: 'Warszawa', remote: true, mode: 'Zdalnie', category: 'ML', salary: 32000, min: 24000, tags: ['Python', 'PyTorch', 'MLOps'], description: 'Buduj i wdrażaj modele uczenia maszynowego, które rozwiązują rzeczywiste problemy. Pracuj z zespołem inżynierów nad całym cyklem życia modelu — od eksperymentu po produkcję.' },
  { id: 2, title: 'LLM / Generative AI Engineer', company: 'Layers AI', icon: '▱', location: 'Kraków', remote: true, mode: 'Zdalnie', category: 'GenAI', salary: 30000, min: 22000, tags: ['LLMs', 'LangChain', 'RAG'], description: 'Projektuj aplikacje oparte na dużych modelach językowych. Twórz systemy RAG, rozwijaj agentów i sprawdzaj jakość odpowiedzi w praktycznych zastosowaniach.' },
  { id: 3, title: 'Data Scientist', company: 'Orbit Analytics', icon: '◎', location: 'Warszawa', remote: false, mode: 'Hybrydowo', category: 'Data', salary: 24000, min: 18000, tags: ['Python', 'SQL', 'Scikit-learn'], description: 'Zamieniaj dane w decyzje produktowe. Projektuj eksperymenty, opracowuj modele predykcyjne i współpracuj z zespołem nad mierzeniem ich wpływu na biznes.' },
  { id: 4, title: 'AI Product Manager', company: 'Futureworks', icon: 'f↗', location: 'Warszawa', remote: true, mode: 'Zdalnie', category: 'Product', salary: 28000, min: 20000, tags: ['AI Strategy', 'Product Discovery', 'B2B SaaS'], description: 'Wyznaczaj kierunek rozwoju produktów wykorzystujących AI. Łącz potrzeby użytkowników z możliwościami technologii i prowadź zespół od pomysłu do wdrożenia.' },
  { id: 5, title: 'AI / Python Developer', company: 'Syntax Labs', icon: '⌘', location: 'Kraków', remote: false, mode: 'Hybrydowo', category: 'Engineering', salary: 25000, min: 17000, tags: ['Python', 'FastAPI', 'Docker'], description: 'Twórz solidne zaplecze dla aplikacji AI. Rozwijaj API, integruj modele i dbaj o niezawodność systemów, z których codziennie korzystają użytkownicy.' },
  { id: 6, title: 'Computer Vision Engineer', company: 'Pixel Mind', icon: '✳', location: 'Warszawa', remote: true, mode: 'Zdalnie', category: 'ML', salary: 29000, min: 21000, tags: ['Computer Vision', 'OpenCV', 'PyTorch'], description: 'Daj maszynom nową perspektywę. Rozwijaj modele analizy obrazu, przygotowuj dane treningowe i optymalizuj rozwiązania computer vision pod kątem działania w czasie rzeczywistym.' }
];



const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const categoryNames = { ML: 'Machine Learning', GenAI: 'GenAI & LLM', Data: 'Data Science', Engineering: 'AI Engineering', Product: 'AI Product' };
const format = value => new Intl.NumberFormat('pl-PL').format(value);
const bookmarkIcon = '<svg viewBox="0 0 18 21" aria-hidden="true"><path d="M3 2h12v17l-6-4-6 4z"/></svg>';
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalize = value => value.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
let selectedCategory = 'all';
let selectedSpecialty = 'ML';
let onlySaved = false;
let saved = new Set();
try {
  const value = JSON.parse(localStorage.getItem('doroboty-saved') || '[]');
  if (Array.isArray(value)) saved = new Set(value.filter(id => jobs.some(job => job.id === id)));
} catch { /* Keep the page functional when storage is unavailable. */ }
const list = $('#job-list');
const dialog = $('#detail-dialog');
let toastTimeout;
function showToast(message) {
  clearTimeout(toastTimeout);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 2600);
}
function resultText(number) {
  return `${number} ${number === 1 ? 'przykładowa oferta' : number > 1 && number < 5 ? 'przykładowe oferty' : 'przykładowych ofert'}`;
}
function renderJobs() {
  const query = normalize($('#search').value.trim());
  const location = $('#location').value;
  const results = jobs.filter(job =>
    (selectedCategory === 'all' || job.category === selectedCategory) &&
    (!onlySaved || saved.has(job.id)) &&
    (location === 'all' || (location === 'remote' ? job.remote : job.location === location)) &&
    normalize(`${job.title} ${job.company} ${job.tags.join(' ')}`).includes(query)
  );
  if ($('#sort').value === 'salary') results.sort((a, b) => b.salary - a.salary);
  list.innerHTML = results.map(job => `<article class="job-card"><div class="company-icon" aria-hidden="true">${job.icon}</div><div class="job-info"><div class="job-title-row"><button class="job-title" data-job="${job.id}">${job.title}</button></div><div class="job-meta"><span class="company-name">${job.company}</span><span class="meta-dot" aria-hidden="true">/</span><span>${job.remote ? 'Zdalnie · Polska' : `${job.location} · ${job.mode}`}</span></div><div class="job-tags">${job.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><div class="job-right"><div class="salary"><strong>${format(job.min)} – ${format(job.salary)} zł</strong><small>netto / mies. · B2B</small></div><button class="save-button ${saved.has(job.id) ? 'saved' : ''}" data-save="${job.id}" aria-label="${saved.has(job.id) ? 'Usuń zapisaną ofertę' : 'Zapisz ofertę'}: ${job.title}" aria-pressed="${saved.has(job.id)}">${bookmarkIcon}</button></div></article>`).join('');
  $('#results-count').textContent = resultText(results.length);
  $('#empty-state').hidden = results.length > 0;
  $('#saved-count').textContent = saved.size;
  $('#saved-filter').setAttribute('aria-pressed', String(onlySaved));
  $$('[data-category]').forEach(button => {
    const active = button.dataset.category === selectedCategory;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function setCategory(category) { selectedCategory = category; renderJobs(); }
function setQuery(value, location) {
  $('#search').value = value;
  $('#hero-query').value = value;
  if (location !== undefined) { $('#location').value = location; $('#hero-location').value = location; }
}
function toggleSaved(id) {
  const isSaved = saved.has(id);
  isSaved ? saved.delete(id) : saved.add(id);
  let persistent = true;
  try { localStorage.setItem('doroboty-saved', JSON.stringify([...saved])); } catch { persistent = false; }
  renderJobs();
  showToast(isSaved ? 'Usunięto z zapisanych ofert.' : persistent ? 'Oferta zapisana w tej przeglądarce.' : 'Oferta zapisana na czas tej wizyty.');
}
$('#hero-search').addEventListener('submit', event => {
  event.preventDefault();
  setQuery($('#hero-query').value, $('#hero-location').value);
  selectedCategory = 'all'; onlySaved = false; renderJobs();
  $('#oferty').scrollIntoView({block:'start'});
});
$('#search-form').addEventListener('submit', event => { event.preventDefault(); renderJobs(); });
$('#search').addEventListener('input', event => { $('#hero-query').value = event.target.value; renderJobs(); });
$('#location').addEventListener('change', event => { $('#hero-location').value = event.target.value; renderJobs(); });
$('#sort').addEventListener('change', renderJobs);
$$('[data-category]').forEach(button => button.addEventListener('click', () => setCategory(button.dataset.category)));
$('#saved-filter').addEventListener('click', () => { onlySaved = !onlySaved; renderJobs(); });
$('#reset-filters').addEventListener('click', () => {
  setQuery('', 'all'); selectedCategory = 'all'; onlySaved = false; $('#sort').value = 'newest'; renderJobs(); $('#search').focus({preventScroll:true});
});

function renderProof() {
  const job = jobs.find(item => item.category === selectedSpecialty);
  $('#proof-card').innerHTML = `<div class="proof-top"><span class="proof-category">${categoryNames[job.category]}</span><span class="mono">PRZYKŁADOWA OFERTA</span></div><div class="proof-main"><div class="company-icon" aria-hidden="true">${job.icon}</div><div><h3>${job.title}</h3><p>${job.company} <span aria-hidden="true">/</span> ${job.remote ? 'Zdalnie · Polska' : `${job.location} · ${job.mode}`}</p></div></div><div class="job-tags">${job.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="proof-bottom"><div class="proof-salary"><strong>${format(job.min)} – ${format(job.salary)} zł</strong><small>netto / mies. · B2B</small></div><a href="#oferty" class="text-link" id="proof-link">Zobacz te oferty <span aria-hidden="true">↗</span></a></div>`;
  $('#proof-link').addEventListener('click', () => { setQuery('', 'all'); onlySaved = false; setCategory(selectedSpecialty); });
  $$('[data-specialty]').forEach(button => {
    const active = button.dataset.specialty === selectedSpecialty;
    button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
  });
}
$$('[data-specialty]').forEach(button => button.addEventListener('click', () => { selectedSpecialty = button.dataset.specialty; renderProof(); }));

let dialogOpener;
function openDialog(html, opener) {
  dialogOpener = opener || document.activeElement;
  $('#dialog-content').innerHTML = html;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}
function showJob(id, opener) {
  const job = jobs.find(item => item.id === id);
  openDialog(`<div class="company-icon" aria-hidden="true">${job.icon}</div><p class="dialog-eyebrow">${job.company} / ${job.remote ? 'ZDALNIE' : `${job.location} · ${job.mode}`}</p><h2 class="dialog-title" id="dialog-title">${job.title}</h2><p class="dialog-salary">${format(job.min)} – ${format(job.salary)} zł<small>netto / mies. · B2B</small></p><div class="dialog-tags">${job.tags.map(tag => `<span>${tag}</span>`).join('')}</div><p class="dialog-description">${job.description}</p><p class="dialog-notice">To przykładowe ogłoszenie w demonstracji doroboty.ai. Rekrutacja nie jest aktywna — nie zbieramy aplikacji.</p><div class="dialog-actions"><button class="button button-blue" id="dialog-save">${saved.has(id) ? 'Usuń z zapisanych' : 'Zapisz ofertę'} ${bookmarkIcon}</button><button class="button button-dark" id="back-to-jobs">Wróć do ofert <span aria-hidden="true">↗</span></button></div>`, opener);
  $('#back-to-jobs').addEventListener('click', () => dialog.close());
  $('#dialog-save').addEventListener('click', () => { toggleSaved(id); $('#dialog-save').innerHTML = `${saved.has(id) ? 'Usuń z zapisanych' : 'Zapisz ofertę'} ${bookmarkIcon}`; });
}
list.addEventListener('click', event => {
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    toggleSaved(id);
    const next = document.querySelector(`[data-save="${id}"]`);
    if (next) next.focus({preventScroll:true}); else $('#saved-filter').focus({preventScroll:true});
    return;
  }
  const jobButton = event.target.closest('[data-job]');
  if (jobButton) showJob(Number(jobButton.dataset.job), jobButton);
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  if (dialogOpener?.isConnected) dialogOpener.focus({preventScroll:true});
  else $('#saved-filter').focus({preventScroll:true});
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

// The scroll sequence uses natural page progress, never wheel interception.
const direction = $('#kierunek');
const sticky = $('.story-sticky');
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
let manualMotionOff = false;
try { manualMotionOff = localStorage.getItem('doroboty-motion-off') === 'true'; } catch { /* The system preference still applies. */ }
let motionOff = false;
let geometry = { top:0, range:1, mobile:false };
let scrollFrame = 0;
const clamp = value => Math.max(0, Math.min(1, value));
function measureScene() {
  geometry = { top:direction.getBoundingClientRect().top + window.scrollY, range:Math.max(1,direction.offsetHeight-sticky.offsetHeight), mobile:window.innerWidth <= 760 };
  requestScene();
}
function paintScene() {
  scrollFrame = 0;
  if (motionOff) return;
  const progress = clamp((window.scrollY - geometry.top) / geometry.range);
  const eased = 1 - Math.pow(1-clamp(progress/.85), 2);
  const mobile = geometry.mobile;
  direction.style.setProperty('--p', progress.toFixed(4));
  direction.style.setProperty('--cloud-y', `${-18*eased}px`);
  direction.style.setProperty('--cloud-scale', (1 - (mobile ? 0.06 : 0.17) * eased).toFixed(4));
  direction.style.setProperty('--card-y', `${(mobile?18:70)-(mobile?45:120)*eased}px`);
  direction.style.setProperty('--card-scale', ((mobile ? 0.92 : 0.85) + (mobile ? 0.08 : 0.15) * eased).toFixed(4));
  direction.style.setProperty('--card-alpha', '1');
  direction.style.setProperty('--connector-alpha', (1-.8*eased).toFixed(4));
  direction.dataset.progress = progress.toFixed(3);
  const phase = progress < .28 ? 0 : progress < .7 ? 1 : 2;
  $$('.story-step').forEach((step,index) => step.classList.toggle('current',index===phase));
}
function requestScene() { if (!scrollFrame && !motionOff) scrollFrame = requestAnimationFrame(paintScene); }
function setMotion(initial = false) {
  const wasInScene = !initial && direction.getBoundingClientRect().top < 0 && direction.getBoundingClientRect().bottom > 0;
  motionOff = media.matches || manualMotionOff;
  document.documentElement.dataset.motion = motionOff ? 'off' : 'on';
  $('#motion-toggle').setAttribute('aria-pressed', String(motionOff));
  $('#motion-toggle > span:first-child').textContent = motionOff ? '▷' : 'Ⅱ';
  $('#motion-label').textContent = media.matches ? 'Ruch ograniczony systemowo' : motionOff ? 'Włącz ruch' : 'Wyłącz ruch';
  $('#motion-toggle').setAttribute('aria-label', $('#motion-label').textContent);
  $('#motion-toggle').disabled = media.matches;
  measureScene();
  if (wasInScene) direction.scrollIntoView({behavior:'instant',block:'start'});
  document.dispatchEvent(new Event('doroboty:motionchange'));
}
$('#motion-toggle').addEventListener('click', () => {
  manualMotionOff = !manualMotionOff;
  try { localStorage.setItem('doroboty-motion-off', String(manualMotionOff)); } catch { /* Preference applies to this visit. */ }
  setMotion();
});
media.addEventListener('change', () => setMotion());
window.addEventListener('scroll', requestScene, {passive:true});
window.addEventListener('resize', measureScene, {passive:true});
if (document.fonts) document.fonts.ready.then(measureScene);

// Local-only form previews. No request is made to an external service.
function showPostForm(opener, values = {}) {
  openDialog(`<p class="dialog-eyebrow">DLA PRACODAWCÓW / LOKALNY PODGLĄD</p><h2 class="dialog-title" id="dialog-title">Zacznij od dobrej roli.</h2><p class="dialog-description">Przygotuj podgląd ogłoszenia. Dane pozostają w tym oknie — nie wysyłamy ich ani nie publikujemy oferty.</p><form class="dialog-form" id="post-form"><label>Nazwa firmy<input name="company" placeholder="np. Twoja firma" value="${escapeHTML(values.company || '')}" required maxlength="100" pattern=".*[^ ].*"></label><label>Stanowisko<input name="role" placeholder="np. Machine Learning Engineer" value="${escapeHTML(values.role || '')}" required maxlength="120" pattern=".*[^ ].*"></label><label>Firmowy e-mail<input name="email" type="email" placeholder="ty@firma.pl" value="${escapeHTML(values.email || '')}" required maxlength="200"></label><button class="button button-blue" type="submit">Pokaż podgląd <span aria-hidden="true">↗</span></button></form>`, opener);
  $('#post-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const originalOpener = dialogOpener;
    $('#dialog-content').innerHTML = `<p class="dialog-eyebrow">PODGLĄD / BEZ PUBLIKACJI</p><h2 class="dialog-title" id="dialog-title">Tak zaczyna się Twoja oferta.</h2><div class="preview-box"><p class="eyebrow">${escapeHTML(data.company.trim())}</p><h3>${escapeHTML(data.role.trim())}</h3><p>Kontakt: ${escapeHTML(data.email)}</p></div><p class="dialog-notice">To lokalny podgląd. Ogłoszenie nie zostało opublikowane, dane nie zostały wysłane. Publikowanie wymaga podłączenia usługi.</p><button class="button button-blue" id="edit-post">Edytuj dane <span aria-hidden="true">↗</span></button>`;
    $('#edit-post').addEventListener('click', () => { showPostForm(originalOpener, data); $('#post-form input').focus(); });
    dialog.scrollTop = 0;
    $('#edit-post').focus({preventScroll:true});
  });
}
$$('[data-post]').forEach(button => button.addEventListener('click', () => showPostForm(button)));
$('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  $('#newsletter-status').textContent = 'Format adresu jest poprawny. Alert nie jest jeszcze podłączony — nie zapisaliśmy Cię do newslettera.';
});
$('#email').addEventListener('input', () => { $('#newsletter-status').textContent = ''; });
renderJobs(); renderProof(); setMotion(true);



// One bounded, responsive sleight-of-hand sequence. The native form stays usable.
(() => {
  const hero = $('.hero');
  const frame = $('.hero-inner');
  const robot = $('.robot-svg');
  const originalArm = $('#robot-original-arm');
  const target = $('#hero-search button[type="submit"]');
  const replay = $('#magic-replay');
  if (!hero || !frame || !robot || !originalArm || !target || !replay) return;
  const duration = 7400;
  const ns = 'http://www.w3.org/2000/svg';
  let active = null;
  let animationFrame = 0;
  let autoTimer = 0;
  let autoAttempted = false;
  const lerp = (a,b,p) => a+(b-a)*p;
  const pointLerp = (a,b,p) => ({x:lerp(a.x,b.x,p),y:lerp(a.y,b.y,p)});
  const smooth = p => { p=clamp(p); return p*p*(3-2*p); };
  const segment = (time,start,end) => smooth((time-start)/(end-start));
  const number = value => Number(value.toFixed(2));
  const pointString = point => `${number(point.x)} ${number(point.y)}`;
  function label(text,icon='▷') {
    $('#magic-replay-label').textContent = text;
    replay.firstElementChild.textContent = icon;
    replay.setAttribute('aria-label', text);
  }
  function cancel(completed=false) {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    if (active) {
      target.style.opacity = active.originalOpacity;
      originalArm.style.visibility = '';
      active.back.remove(); active.front.remove(); active.proxy.remove();
      active = null;
    }
    hero.dataset.magicState = 'idle';
    delete hero.dataset.magicProgress;
    if (motionOff) label('Ruch wyłączony');
    else label(completed ? 'Jeszcze raz' : 'Sztuczka robocika');
    replay.disabled = motionOff;
  }
  function makeLayer(width,height,front=false) {
    const svg = document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio','none');
    svg.setAttribute('aria-hidden','true');
    svg.classList.add('magic-layer');
    if (front) svg.classList.add('magic-front');
    frame.append(svg);
    return svg;
  }
  function start() {
    clearTimeout(autoTimer);
    if (motionOff || document.hidden) return;
    if (active) { cancel(); return; }
    const box = frame.getBoundingClientRect();
    const buttonBox = target.getBoundingClientRect();
    const matrix = robot.getScreenCTM();
    if (!matrix || !box.width || !buttonBox.width) return;
    const map = (x,y) => {
      const point = new DOMPoint(x,y).matrixTransform(matrix);
      return {x:point.x-box.left,y:point.y-box.top};
    };
    const shoulder = map(202,216);
    const home = map(256,130);
    const unit = map(257,130);
    const robotScale = Math.hypot(unit.x-home.x,unit.y-home.y);
    const handScale = Math.max(.66,robotScale*1.13);
    const destination = {x:buttonBox.left-box.left+buttonBox.width/2,y:buttonBox.top-box.top+buttonBox.height/2-7};
    const displayHand = {x:Math.min(home.x+(robotScale<.6 ? 22 : 0),box.width-8),y:home.y-4};
    const back = makeLayer(box.width,box.height);
    back.innerHTML = `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path class="magic-arm-outline" stroke="#191c25" stroke-width="${Math.max(8,22*robotScale)}"/><path class="magic-arm-paper" stroke="#f5f5f0" stroke-width="${Math.max(5,14*robotScale)}"/><circle class="magic-elbow" r="${Math.max(4,10*robotScale)}" fill="#e9edff" stroke="#191c25" stroke-width="${Math.max(1.7,3*robotScale)}"/><circle cx="${shoulder.x}" cy="${shoulder.y}" r="${Math.max(3,7*robotScale)}" fill="#e9edff" stroke="#191c25" stroke-width="${Math.max(1.5,2*robotScale)}"/></g>`;
    const proxy = document.createElement('div');
    proxy.className = 'magic-button-proxy';
    proxy.setAttribute('aria-hidden','true');
    proxy.innerHTML = target.innerHTML;
    proxy.style.width = `${buttonBox.width}px`;
    proxy.style.height = `${buttonBox.height}px`;
    proxy.style.left = `${destination.x-buttonBox.width/2}px`;
    proxy.style.top = `${destination.y+7-buttonBox.height/2}px`;
    proxy.style.opacity = '0';
    frame.append(proxy);
    const front = makeLayer(box.width,box.height,true);
    front.innerHTML = `<g class="magic-hand" stroke="#191c25" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M-17-2Q-22 0-20 11L-14 24Q0 31 16 22L21 9Q23 0 16-4Z" fill="#f5f5f0"/><g class="magic-fingers" fill="none"></g><path d="M-9 18h16" stroke-width="2" opacity=".5"/></g><g class="magic-coin" opacity="0"><circle r="25" fill="#f5f5f0" stroke="#191c25" stroke-width="3"/><circle r="19" fill="#e9edff" stroke="#191c25" stroke-width="1"/><text x="0" y="12" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="35" font-weight="700" fill="#191c25">$</text></g><g class="magic-sparks" fill="none" stroke="#f5f5f0" stroke-width="2.5" stroke-linecap="round" opacity="0"></g>`;
    const fingerGroup = front.querySelector('.magic-fingers');
    const fist = document.createElementNS(ns,'g');
    fist.setAttribute('opacity','0');
    fist.innerHTML = '<path d="M-20 7V-6Q-20-15-13-14Q-10-19-5-15Q0-20 5-15Q12-19 16-12Q23-10 22-3L18 20Q4 29-13 22Z" fill="#f5f5f0"/><path d="M-10-10v9M0-11v10M10-9v10M-19 5Q-6-4 0 2L9 9Q12 15 7 18L-9 15" fill="none" stroke-width="2.5"/>';
    front.querySelector('.magic-hand').append(fist);
    const fingers = [];
    for (let i=0;i<4;i++) {
      const outline = document.createElementNS(ns,'path');
      outline.setAttribute('stroke','#191c25'); outline.setAttribute('stroke-width','10');
      const inner = document.createElementNS(ns,'path');
      inner.setAttribute('stroke','#f5f5f0'); inner.setAttribute('stroke-width','5.5');
      fingerGroup.append(outline,inner); fingers.push({outline,inner});
    }
    active = {
      back,front,proxy,shoulder,home,displayHand,destination,robotScale,handScale,
      originalOpacity:target.style.opacity,started:performance.now(),
      hand:front.querySelector('.magic-hand'),coin:front.querySelector('.magic-coin'),
      sparks:front.querySelector('.magic-sparks'),fingers,fingerGroup,fist,
      armOutline:back.querySelector('.magic-arm-outline'),armPaper:back.querySelector('.magic-arm-paper'),elbow:back.querySelector('.magic-elbow'),
      homeElbow:map(248,189)
    };
    for (let i=0;i<4;i++) active.sparks.append(document.createElementNS(ns,'path'));
    active.sparkPaths = [...active.sparks.children];
    originalArm.style.visibility = 'hidden';
    label('Zatrzymaj sztuczkę','Ⅱ');
    animationFrame = requestAnimationFrame(tick);
  }
  function tick(now) {
    if (!active) return;
    const a = active;
    const time = now-a.started;
    if (time>=duration || motionOff) { cancel(time>=duration); return; }
    const reaching = segment(time,180,1550);
    const closing = segment(time,1550,2200);
    const lifting = segment(time,2240,3350);
    const opening = segment(time,3650,4300);
    const returning = segment(time,6500,7350);
    let hand = pointLerp(a.home,a.destination,reaching);
    hand = pointLerp(hand,a.displayHand,lifting);
    hand = pointLerp(hand,a.home,returning);
    let angle = 180*reaching*(1-lifting);
    let grip = closing*(1-opening);
    if (time>3350 && time<3650) angle += Math.sin((time-3350)/300*Math.PI*4)*5;
    const radians = angle*Math.PI/180;
    const wrist = {x:hand.x-Math.sin(radians)*20*a.handScale,y:hand.y+Math.cos(radians)*20*a.handScale};
    const extendedElbow = {x:a.shoulder.x+(wrist.x-a.shoulder.x)*.62+35*a.robotScale,y:a.shoulder.y+(wrist.y-a.shoulder.y)*.32};
    const elbow = pointLerp(a.homeElbow,extendedElbow,reaching*(1-lifting));
    const armPath = `M${pointString(a.shoulder)}L${pointString(elbow)}L${pointString(wrist)}`;
    a.armOutline.setAttribute('d',armPath); a.armPaper.setAttribute('d',armPath);
    a.elbow.setAttribute('cx',number(elbow.x)); a.elbow.setAttribute('cy',number(elbow.y));
    a.hand.setAttribute('transform',`translate(${pointString(hand)}) rotate(${number(angle)}) scale(${a.handScale})`);
    a.fingerGroup.setAttribute('opacity',String(1-smooth(grip)));
    a.fist.setAttribute('opacity',String(smooth((grip-.2)/.75)));
    const bases = [-15,-5,5,15];
    const tips = [{x:-34,y:-17},{x:-13,y:-37},{x:9,y:-40},{x:33,y:-23}];
    a.fingers.forEach((finger,i) => {
      const x = bases[i];
      const openTip = tips[i];
      const tip = {x:lerp(openTip.x,x*.68,grip),y:lerp(openTip.y,9+(i%2)*3,grip)};
      const joint = {x:lerp(openTip.x,x*1.5,grip),y:lerp(openTip.y*.72,-17,grip)};
      const d = `M${x} 3C${number(x*1.4)} ${number(lerp(-7,-21,grip))} ${pointString(joint)} ${pointString(tip)}`;
      finger.outline.setAttribute('d',d); finger.inner.setAttribute('d',d);
    });
    if (time<1550) {
      target.style.opacity = a.originalOpacity; a.proxy.style.opacity = '0';
    } else if (time<2240) {
      target.style.opacity = '0';
      a.proxy.style.opacity = String(1-segment(time,2100,2210));
      a.proxy.style.transform = `translateY(${-17*closing}px) scale(${lerp(1,.08,closing)})`;
    } else {
      a.proxy.style.opacity = '0';
      target.style.opacity = time<6250 ? '0' : String(segment(time,6250,6850));
    }
    const reveal = segment(time,3900,4450);
    const vanish = segment(time,6100,6650);
    const bounce = reveal<1 ? 1+Math.sin(reveal*Math.PI)*.16 : 1;
    const coinScale = Math.max(.83,a.robotScale*1.1)*reveal*bounce;
    const coin = {x:hand.x,y:hand.y-31*a.handScale-22*vanish};
    a.coin.setAttribute('opacity',String(reveal*(1-vanish)));
    a.coin.setAttribute('transform',`translate(${pointString(coin)}) rotate(${number(-8*(1-reveal))}) scale(${number(coinScale)})`);
    const spark = Math.sin(clamp((time-4000)/900)*Math.PI);
    a.sparks.setAttribute('opacity',String(Math.max(0,spark)));
    const radius = 32+16*reveal;
    a.sparks.setAttribute('transform',`translate(${pointString(coin)}) scale(${Math.max(.8,a.robotScale)})`);
    a.sparkPaths.forEach((path,i) => {
      const theta = (i*Math.PI/2)+.25;
      const x = Math.cos(theta)*radius, y = Math.sin(theta)*radius;
      path.setAttribute('d',`M${number(x)} ${number(y)}l${number(Math.cos(theta)*7)} ${number(Math.sin(theta)*7)}`);
    });
    const fade = 1-segment(time,7120,7380);
    a.back.style.opacity = String(fade); a.front.style.opacity = String(fade);
    if (time>7120) originalArm.style.visibility = '';
    hero.dataset.magicState = time<1550 ? 'reach' : time<2240 ? 'grip' : time<3650 ? 'lift' : time<4450 ? 'opening' : time<6250 ? 'reveal' : 'return';
    hero.dataset.magicProgress = (time/duration).toFixed(3);
    animationFrame = requestAnimationFrame(tick);
  }
  replay.addEventListener('click', () => { autoAttempted=true; start(); });
  target.addEventListener('pointerenter', () => { if(active) cancel(); });
  $('#hero-search').addEventListener('focusin', () => { if(active) cancel(); });
  $('#hero-search').addEventListener('pointerdown', () => { if(active) cancel(); });
  $('#hero-search').addEventListener('submit', () => { if(active) cancel(); });
  window.addEventListener('resize', () => { if(active) cancel(); }, {passive:true});
  window.addEventListener('scroll', () => {
    if (!active) return;
    const bounds = hero.getBoundingClientRect();
    if (bounds.bottom<80 || bounds.top>window.innerHeight) cancel();
  }, {passive:true});
  document.addEventListener('visibilitychange', () => { if(document.hidden && active) cancel(); });
  document.addEventListener('doroboty:motionchange', () => { clearTimeout(autoTimer); cancel(); });
  function scheduleAuto() {
    if (autoAttempted || active || motionOff) return;
    const buttonBox = target.getBoundingClientRect();
    const robotBox = robot.getBoundingClientRect();
    if (buttonBox.bottom>window.innerHeight || buttonBox.top<0 || robotBox.bottom<100) return;
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      autoAttempted=true;
      if (document.activeElement?.closest('#hero-search') || target.matches(':hover')) return;
      start();
    },1600);
  }
  const visibility = new IntersectionObserver(() => scheduleAuto(),{threshold:[0,1]});
  visibility.observe(target);
  if (document.fonts) document.fonts.ready.then(scheduleAuto); else scheduleAuto();
  hero.dataset.magicState='idle';
  replay.disabled=motionOff;
  if (motionOff) label('Ruch wyłączony');
})();
