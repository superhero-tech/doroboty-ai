(() => {
  document.documentElement.classList.add('js');

  const profiles = [
    {
      id: 'C1', name: 'Kuba', initials: 'K', archetype: 'Build',
      role: 'AI Engineer · wyszukiwanie i ewaluacja',
      summary: 'Pracował przy indeksowaniu i testach ewaluacji wyszukiwania dokumentów. Jego komponent był integrowany z API przygotowanym przez inną osobę.',
      skills: ['Indeksowanie', 'Ewaluacja', 'Wyszukiwanie', 'Praca zespołowa'],
      evidence: 'Pokazuje komponent i syntetyczny zestaw testów. Nie udostępnia dokumentów klienta ani nie przypisuje sobie pracy nad API.',
      goal: 'Rozwijać praktyczne rozwiązania AI i jasno pokazywać własny wkład w projekt.',
      cv: {
        headline: 'AI Engineer · wyszukiwanie i ewaluacja',
        location: 'Wrocław · praca zdalna lub hybrydowa',
        email: 'kuba.nowak@example.com',
        about: 'Inżynier AI skupiony na wyszukiwaniu informacji w dokumentach, jakości wyników i ewaluacji. Łączę implementację z testami, które pokazują, czy system pomaga użytkownikowi znaleźć właściwą odpowiedź. W pracy zespołowej jasno opisuję własny zakres i zależności od API lub komponentów przygotowanych przez inne osoby.',
        experience: [
          { title: 'AI Engineer · Search & Evaluation', company: 'Pracownia Wektorów · fikcyjna firma produktowa', period: '2024–2026', bullets: [
            'Rozwijałem komponent indeksowania dokumentów i aktualizacje indeksu po zmianach źródeł.',
            'Przygotowywałem syntetyczne zestawy pytań i oceniałem trafność oraz użyteczność wyników wyszukiwania.',
            'Integrowałem własny komponent z API przygotowanym przez innego członka zespołu; nie przypisuję sobie autorstwa API.',
            'Analizowałem przypadki, w których wysoki wynik testu nie przekładał się na dobrą odpowiedź dla użytkownika.',
            'Opisywałem ograniczenia testów i zakres odpowiedzialności w dokumentacji projektu.'
          ] },
          { title: 'Junior Data & ML Engineer', company: 'Laboratorium Danych · fikcyjna firma technologiczna', period: '2022–2024', bullets: [
            'Przygotowywałem dane tekstowe do eksperymentów klasyfikacji i wyszukiwania.',
            'Pisałem skrypty walidacyjne, porównywałem wyniki modeli i raportowałem błędne przypadki.',
            'Współpracowałem z programistami backendu przy przekazywaniu wymagań i integracji komponentów.'
          ] }
        ],
        projects: [
          { title: 'Wyszukiwanie w dokumentach', text: 'Komponent indeksowania i ewaluacji na syntetycznych danych. Portfolio nie zawiera dokumentów klientów ani poufnych materiałów.' }
        ],
        education: [
          { title: 'Informatyka, studia inżynierskie', school: 'Akademia Technologii we Wrocławiu · uczelnia fikcyjna', period: '2018–2022' }
        ],
        skills: [
          { label: 'AI i wyszukiwanie', values: ['indeksowanie dokumentów', 'wyszukiwanie semantyczne', 'embeddingi', 'ewaluacja retrievalu', 'analiza jakości wyników'] },
          { label: 'Programowanie i dane', values: ['Python', 'SQL', 'Pandas', 'scikit-learn', 'pytest'] },
          { label: 'Współpraca', values: ['integracja komponentów', 'dokumentacja techniczna', 'przegląd przypadków błędnych', 'praca w zespole produktowym'] }
        ],
        tools: ['Python', 'Pandas', 'scikit-learn', 'pytest', 'JupyterLab', 'GitHub', 'Docker', 'OpenSearch', 'FastAPI · integracja API'],
        languages: ['polski · ojczysty', 'angielski · B2']
      }
    },
    {
      id: 'C2', name: 'Ola', initials: 'O', archetype: 'Apply',
      role: 'AI Implementation Specialist · procesy i adopcja',
      summary: 'Pracowała z zespołem obsługi nad przygotowaniem odpowiedzi i kategoryzacją wiadomości. Zbierała informacje o użyciu i adopcji zmian.',
      skills: ['Usprawnianie procesów', 'Adopcja AI', 'Analiza użycia', 'Praca z użytkownikami'],
      evidence: 'Opisuje zmianę procesu i rozdziela własne zadania od wspólnej pracy zespołu. Materiały firmowe pozostają poufne.',
      goal: 'Pracować nad zmianami, które pomagają zespołom i użytkownikom w codziennym procesie.',
      cv: {
        headline: 'AI Implementation Specialist · procesy i adopcja',
        location: 'Warszawa · praca hybrydowa lub zdalna',
        email: 'ola.zielinska@example.com',
        about: 'Specjalistka wdrożeń AI z doświadczeniem w usprawnianiu obsługi klienta. Pomagam przełożyć możliwości narzędzi na praktyczne kroki w codziennej pracy: rozpoznaję powtarzalne zadania, konsultuję zmiany z użytkownikami, przygotowuję instrukcje i sprawdzam, jak rozwiązanie jest używane. Dbam o to, by odpowiedzialność za rekomendację, kontrolę i eskalację była jasna.',
        experience: [
          { title: 'AI Implementation Specialist', company: 'Pracownia Procesów · fikcyjna firma usługowa', period: '2024–2026', bullets: [
            'Współpracowałam z zespołem obsługi przy przygotowaniu szkiców odpowiedzi i kategoryzacji wiadomości.',
            'Mapowałam kroki procesu przed zmianą i dokumentowałam nowy sposób pracy po wdrożeniu.',
            'Zbierałam informacje o użyciu rozwiązania, pytania użytkowników i przypadki wymagające ręcznej obsługi.',
            'Przygotowywałam krótkie instrukcje, przykłady i sesje wdrożeniowe dla zespołu.',
            'Rozdzielałam własne zadania od pracy wspólnej; nie publikuję firmowych wiadomości ani zrzutów ekranu.'
          ] },
          { title: 'Specjalistka ds. operacji klienta', company: 'Centrum Wsparcia · fikcyjna firma e-commerce', period: '2022–2024', bullets: [
            'Analizowałam powtarzające się pytania klientów i porządkowałam kategorie zgłoszeń.',
            'Aktualizowałam bazę wiedzy i przekazywałam zespołowi informacje o niejasnych procedurach.',
            'Współpracowałam z liderami obsługi przy testowaniu zmian w procesie odpowiedzi.'
          ] }
        ],
        projects: [
          { title: 'Wsparcie odpowiedzi i kategoryzacji zgłoszeń', text: 'Pilotażowy proces z asystą AI, w którym pracownik sprawdza szkic, a wiadomości wymagające oceny człowieka trafiają do ręcznej obsługi. Wyniki i materiały firmowe pozostają poufne.' }
        ],
        education: [
          { title: 'Zarządzanie i inżynieria procesów', school: 'Wyższa Szkoła Zarządzania w Warszawie · uczelnia fikcyjna', period: '2018–2022' }
        ],
        skills: [
          { label: 'Wdrożenia AI', values: ['mapowanie procesów', 'przygotowanie pilotażu', 'zasady kontroli człowieka', 'obsługa wyjątków', 'dokumentacja wdrożeniowa'] },
          { label: 'Adopcja i użytkownicy', values: ['warsztaty', 'zbieranie opinii', 'materiały szkoleniowe', 'komunikacja zmiany', 'współpraca między zespołami'] },
          { label: 'Analiza operacyjna', values: ['analiza kategorii zgłoszeń', 'monitorowanie użycia', 'porównanie procesu przed i po', 'raportowanie wniosków'] }
        ],
        tools: ['ChatGPT Enterprise · środowisko demonstracyjne', 'Zendesk', 'Google Sheets', 'Looker Studio', 'Make', 'Notion', 'Miro'],
        languages: ['polski · ojczysty', 'angielski · B2']
      }
    },
    {
      id: 'C3', name: 'Bartek', initials: 'B', archetype: 'Lead',
      role: 'AI Program Lead · priorytety inicjatyw',
      summary: 'Koordynował dwie inicjatywy AI w dwóch działach, uzgadniał kryteria i kolejność. Decyzję budżetową podejmował sponsor.',
      skills: ['Priorytetyzacja', 'Koordynacja', 'Transformacja AI', 'Definiowanie zakresu'],
      evidence: 'Może opisać kompromisy i własny zakres odpowiedzialności; nie przedstawia decyzji budżetowej jako swojej.',
      goal: 'Objąć rolę z jasno określonym mandatem do ustalania priorytetów wdrożeń.',
      cv: {
        headline: 'AI Program Lead · priorytety inicjatyw',
        location: 'Kraków · praca hybrydowa lub zdalna',
        email: 'bartek.maj@example.com',
        about: 'Lider programów transformacji z doświadczeniem w koordynowaniu inicjatyw AI między działami. Pomagam uzgodnić kryteria wyboru, kolejność prac, zależności i odpowiedzialność. Dobrze czuję się na styku biznesu, operacji i technologii. Oddzielam rekomendację oraz koordynację od formalnych decyzji sponsora, w tym zatwierdzania budżetu.',
        experience: [
          { title: 'AI Program Lead', company: 'Wektor Operacje · fikcyjna firma technologiczna', period: '2023–2026', bullets: [
            'Koordynowałem dwie inicjatywy AI prowadzone równolegle w dwóch działach.',
            'Uzgadniałem kryteria oceny, zależności i kolejność uruchamiania inicjatyw z zespołami oraz sponsorami.',
            'Przygotowywałem warianty i opisy kompromisów, aby interesariusze mogli podjąć świadomą decyzję.',
            'Pilnowałem zakresu, ryzyk, statusów i kolejnych kroków; budżet zatwierdzał sponsor.',
            'Prowadziłem komunikację między biznesem, operacjami i zespołem technicznym.'
          ] },
          { title: 'Koordynator projektów i analityk procesów', company: 'Centrum Transformacji · fikcyjna organizacja', period: '2020–2023', bullets: [
            'Rozpisywałem cele projektu na etapy, właścicieli, zależności i kryteria gotowości.',
            'Prowadziłem warsztaty ustalające problemy użytkowników i priorytety zmian.',
            'Przygotowywałem podsumowania decyzji, statusy oraz materiały dla komitetu sterującego.'
          ] }
        ],
        projects: [
          { title: 'Priorytetyzacja dwóch inicjatyw AI', text: 'Uzgodnienie kryteriów i kolejności prac w dwóch działach. Bartek odpowiadał za koordynację procesu i rekomendacje; decyzja budżetowa należała do sponsora.' }
        ],
        education: [
          { title: 'Zarządzanie projektami i analityka biznesowa', school: 'Akademia Biznesu w Krakowie · uczelnia fikcyjna', period: '2016–2020' }
        ],
        skills: [
          { label: 'Programy i strategia', values: ['priorytetyzacja inicjatyw', 'definiowanie kryteriów', 'planowanie etapów', 'zarządzanie zależnościami', 'analiza kompromisów'] },
          { label: 'Prowadzenie współpracy', values: ['facylitacja warsztatów', 'uzgadnianie zakresu', 'komunikacja ze sponsorami', 'koordynacja międzydziałowa', 'zarządzanie ryzykiem'] },
          { label: 'Ład i raportowanie', values: ['statusy programu', 'rejestr decyzji', 'odpowiedzialność i mandaty', 'rekomendacje budżetowe', 'kryteria gotowości'] }
        ],
        tools: ['Jira', 'Confluence', 'Miro', 'Microsoft Excel', 'PowerPoint', 'Power BI', 'Notion'],
        languages: ['polski · ojczysty', 'angielski · C1']
      }
    }
  ];

  const keys = {
    profiles: 'dorobory.demoProfiles.v1',
    session: 'dorobory.demoSession.v1',
    applications: 'dorobory.demoApplications.v1',
    jobs: 'dorobory.demoRecruiterJobs.v1',
    cvAttachments: 'dorobory.demoCvAttachments.v1'
  };
  const recruiterAccount = { id: 'R1', name: 'Rekruter demo', organization: 'DoRobory.AI' };
  let interviewAudioDatabase;
  const openInterviewAudioDatabase = () => {
    if (!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB is unavailable.'));
    if (!interviewAudioDatabase) {
      interviewAudioDatabase = new Promise((resolve, reject) => {
        const request = window.indexedDB.open('doroboty.aiInterviewAudio.v1', 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains('recordings')) {
            request.result.createObjectStore('recordings');
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('Could not open recording storage.'));
      });
    }
    return interviewAudioDatabase;
  };
  const storeInterviewAudio = async (audioKey, blob) => {
    const database = await openInterviewAudioDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction('recordings', 'readwrite');
      transaction.objectStore('recordings').put(blob, audioKey);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error || new Error('Could not save recording.'));
      transaction.onabort = () => reject(transaction.error || new Error('Could not save recording.'));
    });
  };
  const readInterviewAudio = async audioKey => {
    const database = await openInterviewAudioDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction('recordings', 'readonly').objectStore('recordings').get(audioKey);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Could not read recording.'));
    });
  };
  const deleteInterviewAudio = async audioKey => {
    const database = await openInterviewAudioDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction('recordings', 'readwrite');
      transaction.objectStore('recordings').delete(audioKey);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error || new Error('Could not delete recording.'));
      transaction.onabort = () => reject(transaction.error || new Error('Could not delete recording.'));
    });
  };
  const memoryStore = {};
  const read = key => {
    try {
      const value = window.localStorage.getItem(key);
      if (value !== null) return value;
    } catch { /* file previews may deny browser storage */ }
    try {
      const value = window.sessionStorage.getItem(key);
      if (value !== null) return value;
    } catch { /* continue with the in-memory preview state */ }
    return memoryStore[key] ?? null;
  };
  const write = (key, value) => {
    memoryStore[key] = value;
    try { window.localStorage.setItem(key, value); } catch { /* local test still works in memory */ }
    try { window.sessionStorage.setItem(key, value); } catch { /* local test still works in memory */ }
  };
  const remove = key => {
    delete memoryStore[key];
    try { window.localStorage.removeItem(key); } catch { /* no persistent storage available */ }
    try { window.sessionStorage.removeItem(key); } catch { /* no persistent storage available */ }
  };
  const readJSON = (key, fallback) => {
    try { return JSON.parse(read(key) || 'null') ?? fallback; }
    catch { return fallback; }
  };
  const writeJSON = (key, value) => write(key, JSON.stringify(value));

  if (!read(keys.profiles)) writeJSON(keys.profiles, profiles);
  const getSession = () => readJSON(keys.session, null);
  const getCurrentProfile = () => {
    const session = getSession();
    return session ? profiles.find(profile => profile.id === session.profileId) || null : null;
  };
  const getCurrentRecruiter = () => getSession()?.role === 'recruiter' ? recruiterAccount : null;
  const getApplications = () => {
    const value = readJSON(keys.applications, []);
    return Array.isArray(value) ? value : [];
  };
  const getCvAttachments = () => {
    const value = readJSON(keys.cvAttachments, {});
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  };
  const getCvAttachment = profileId => getCvAttachments()[profileId] || null;
  const saveCvAttachment = (profileId, file) => {
    if (!file || !(file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) return 'Wybierz plik PDF.';
    if (file.size > 5 * 1024 * 1024) return 'Plik może mieć maksymalnie 5 MB.';
    const attachments = getCvAttachments();
    attachments[profileId] = { name: file.name, size: file.size, type: 'application/pdf', uploadedAt: new Date().toISOString() };
    writeJSON(keys.cvAttachments, attachments);
    return '';
  };
  const removeCvAttachment = profileId => {
    const attachments = getCvAttachments();
    delete attachments[profileId];
    writeJSON(keys.cvAttachments, attachments);
  };
  const setSession = profileId => writeJSON(keys.session, { profileId, role: 'candidate', signedInAt: new Date().toISOString() });
  const setRecruiterSession = () => writeJSON(keys.session, { role: 'recruiter', recruiterId: recruiterAccount.id, signedInAt: new Date().toISOString() });
  const toast = document.querySelector('[data-app-toast]');
  const applicationDialog = document.querySelector('[data-application-dialog]');
  const applicationFlowRoot = applicationDialog?.querySelector('[data-application-flow]') || null;
  let applicationFlow = null;
  let applicationTimer = 0;
  let toastTimer = 0;
  let activeInterviewRecorder = null;
  let activeInterviewStream = null;
  let activeInterviewChunks = [];
  let recruiterAudioUrls = [];

  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
  };
  const addText = (parent, tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    parent.append(node);
    return node;
  };
  const linkText = (parent, text, href, className = '') => {
    const link = addText(parent, 'a', className, text);
    link.href = href;
    return link;
  };

  const candidateMenuItems = [
    { page: 'overview', href: 'konto.html', label: 'Przegląd', icon: '⌂' },
    { page: 'applications', href: 'aplikacje.html', label: 'Moje aplikacje', icon: '↗' },
    { page: 'offers', href: 'role.html', label: 'Nowe oferty', icon: '✦' },
    { page: 'data', href: 'dane.html', label: 'Moje dane', icon: '◎' },
    { page: 'cv', href: 'cv.html', label: 'Moje CV', icon: '▤' }
  ];

  const recruiterMenuItems = [
    { page: 'create', href: 'rekruter-utworz.html', label: 'Utwórz ofertę', icon: '+' },
    { page: 'offers', href: 'rekruter-oferty.html', label: 'Opublikowane oferty', icon: '▤' },
    { page: 'applications', href: 'rekruter.html', label: 'Aplikacje kandydatów', icon: '↗' }
  ];

  const setupAccountMenu = () => {
    document.querySelectorAll('[data-login-link]').forEach((loginLink, index) => {
      const header = loginLink.closest('.masthead-inner');
      if (!header || header.querySelector('[data-account-menu-host]')) return;

      const host = document.createElement('div');
      host.className = 'account-menu-host';
      host.dataset.accountMenuHost = '';
      host.hidden = true;

      const trigger = addText(host, 'button', 'masthead-login account-menu-trigger', '');
      trigger.type = 'button';
      trigger.id = `account-menu-trigger-${index + 1}`;
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', `account-menu-panel-${index + 1}`);
      addText(trigger, 'span', 'account-menu-trigger-label', 'Mój profil');
      addText(trigger, 'span', 'login-chevron account-menu-chevron', '⌄').setAttribute('aria-hidden', 'true');

      const panel = document.createElement('div');
      panel.id = `account-menu-panel-${index + 1}`;
      panel.className = 'account-menu-panel';
      panel.hidden = true;
      panel.setAttribute('aria-labelledby', trigger.id);
      host.append(trigger, panel);
      loginLink.insertAdjacentElement('afterend', host);

      const closeMenu = (restoreFocus = false) => {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (restoreFocus) trigger.focus();
      };
      trigger.addEventListener('click', () => {
        const willOpen = panel.hidden;
        panel.hidden = !willOpen;
        trigger.setAttribute('aria-expanded', String(willOpen));
      });
      document.addEventListener('click', event => {
        if (!host.contains(event.target)) closeMenu();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !panel.hidden) closeMenu(true);
        if (event.key === 'ArrowDown' && document.activeElement === trigger && panel.hidden) {
          panel.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');
          panel.querySelector('a')?.focus();
          event.preventDefault();
        }
      });
    });
  };

  const renderAccountMenu = (host, profile, recruiter) => {
    const panel = host.querySelector('.account-menu-panel');
    const trigger = host.querySelector('.account-menu-trigger');
    if (!panel || !trigger) return;
    panel.replaceChildren();
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');

    const isCandidate = Boolean(profile);
    addText(panel, 'p', 'account-menu-kicker', isCandidate ? `Panel kandydata · ${profile.name}` : 'Strefa pracodawcy');
    const nav = document.createElement('nav');
    nav.className = 'account-menu-nav';
    nav.setAttribute('aria-label', isCandidate ? 'Opcje panelu kandydata' : 'Opcje panelu rekrutera');
    const items = isCandidate ? candidateMenuItems : recruiterMenuItems;
    const currentPage = isCandidate ? document.body.dataset.candidatePage : document.body.dataset.recruiterPage;
    items.forEach(item => {
      const link = addText(nav, 'a', '', '');
      link.href = item.href;
      if (item.page === currentPage) link.setAttribute('aria-current', 'page');
      addText(link, 'span', 'account-menu-link-icon', item.icon).setAttribute('aria-hidden', 'true');
      addText(link, 'span', 'account-menu-link-label', item.label);
    });
    panel.append(nav);

    const logout = addText(panel, 'button', 'account-menu-logout', 'Wyloguj się');
    logout.type = 'button';
    logout.dataset.demoLogout = 'true';
    logout.setAttribute('aria-label', `Wyloguj z ${recruiter ? 'konta rekrutera' : `profilu ${profile.name}`}`);
  };

  const updateLoginUI = () => {
    const profile = getCurrentProfile();
    const recruiter = getCurrentRecruiter();
    const signedIn = Boolean(profile || recruiter);
    document.body.classList.toggle('is-logged-in', signedIn);
    document.querySelectorAll('[data-login-link]').forEach(link => {
      const next = link.dataset.loginNext || 'konto.html';
      link.hidden = signedIn;
      delete link.dataset.demoLogout;
      if (!signedIn) link.href = window.location.pathname.endsWith('/zaloguj.html') ? '#profile-options' : `zaloguj.html?next=${encodeURIComponent(next)}`;
    });
    document.querySelectorAll('[data-account-menu-host]').forEach(host => {
      host.hidden = !signedIn;
      if (signedIn) renderAccountMenu(host, profile, recruiter);
      else {
        const panel = host.querySelector('.account-menu-panel');
        const trigger = host.querySelector('.account-menu-trigger');
        if (panel) panel.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.querySelectorAll('[data-profile-nav]').forEach(link => { link.hidden = true; });
    document.querySelectorAll('[data-candidate-menu-host], [data-recruiter-menu-host]').forEach(host => { host.hidden = true; });
  };

  const profileList = document.querySelector('[data-login-profile-list]');
  const statusText = document.querySelector('[data-login-status]');
  const renderLoginProfiles = () => {
    if (!profileList) return;
    profileList.replaceChildren();
    const current = getCurrentProfile();
    const currentRecruiter = getCurrentRecruiter();
    profiles.forEach(profile => {
      const card = document.createElement('article');
      card.className = `login-profile-card${current?.id === profile.id ? ' is-current' : ''}`;
      const identity = document.createElement('div');
      identity.className = 'login-profile-identity';
      addText(identity, 'span', 'profile-monogram', profile.initials);
      const labels = document.createElement('div');
      addText(labels, 'small', 'account-source', `${profile.id} · ${profile.archetype}${current?.id === profile.id ? ' · aktywny' : ''}`);
      addText(labels, 'h3', '', profile.name);
      identity.append(labels);
      card.append(identity);
      addText(card, 'div', 'account-profile-role', profile.role);
      addText(card, 'p', '', profile.summary);
      const button = addText(card, 'button', 'account-enter', current?.id === profile.id ? `Kontynuuj jako ${profile.name}` : `Zaloguj się jako ${profile.name}`);
      button.type = 'button';
      button.dataset.loginProfile = profile.id;
      profileList.append(card);
    });
    const recruiterCard = document.createElement('article');
    recruiterCard.className = `login-profile-card login-profile-card--recruiter${currentRecruiter ? ' is-current' : ''}`;
    const recruiterIdentity = document.createElement('div');
    recruiterIdentity.className = 'login-profile-identity';
    addText(recruiterIdentity, 'span', 'profile-monogram', 'R');
    const recruiterLabels = document.createElement('div');
    addText(recruiterLabels, 'small', 'account-source', `KONTO REKRUTERA${currentRecruiter ? ' · AKTYWNE' : ''}`);
    addText(recruiterLabels, 'h3', '', recruiterAccount.name);
    recruiterIdentity.append(recruiterLabels);
    recruiterCard.append(recruiterIdentity);
    addText(recruiterCard, 'div', 'account-profile-role', recruiterAccount.organization);
    addText(recruiterCard, 'p', '', 'Demo panelu rekrutacyjnego: publikuj fikcyjne oferty i aktualizuj etapy aplikacji w tej przeglądarce.');
    const recruiterButton = addText(recruiterCard, 'button', 'account-enter', currentRecruiter ? 'Otwórz panel rekrutera' : 'Zaloguj się jako rekruter');
    recruiterButton.type = 'button';
    recruiterButton.dataset.loginRecruiter = '';
    profileList.append(recruiterCard);
    if (statusText) {
      statusText.textContent = currentRecruiter
        ? `Aktywne konto: ${recruiterAccount.name}. Wybierz konto kandydata, aby wrócić do aplikowania.`
        : current
          ? `Aktywny profil: ${current.name}. Wybierz go ponownie lub przełącz się na inną osobę.`
          : 'Wybierz profil testowy, aby kontynuować.';
    }
  };

  const processStageLabels = {
    submitted: 'Aplikacja wysłana',
    verified: 'Zgłoszenie zweryfikowane',
    interviewed: 'Rozmowa przeprowadzona',
    accepted: 'Decyzja pozytywna',
    rejected: 'Aplikacja odrzucona',
    withdrawn: 'Aplikacja wycofana'
  };
  const getApplicationProcessStage = application => {
    if (application.status === 'withdrawn') return 'withdrawn';
    return Object.hasOwn(processStageLabels, application.processStage) ? application.processStage : 'submitted';
  };
  const getApplicationStageLabel = application => {
    const stage = getApplicationProcessStage(application);
    if (stage === 'submitted') return 'Oczekuje na weryfikację';
    if (stage === 'verified') return 'Oczekuje na rozmowę';
    if (stage === 'interviewed') return 'Oczekuje na decyzję';
    return processStageLabels[stage];
  };
  const renderApplicationProgress = application => {
    const stage = getApplicationProcessStage(application);
    const progress = document.createElement('div');
    progress.className = `application-progress${stage === 'rejected' ? ' is-rejected' : stage === 'accepted' ? ' is-positive' : ''}`;
    const terminal = ['accepted', 'rejected', 'withdrawn'].includes(stage);
    const currentIndex = stage === 'submitted' ? 1 : stage === 'verified' ? 2 : stage === 'interviewed' ? 3 : -1;
    const steps = document.createElement('ol');
    steps.className = 'application-steps';
    const labels = ['Aplikacja wysłana', 'Zgłoszenie zweryfikowane', 'Rozmowa przeprowadzona', 'Decyzja rekrutera'];
    const completed = new Set(['submitted']);
    const events = Array.isArray(application.processEvents) ? application.processEvents : [];
    events.forEach(event => { if (['submitted', 'verified', 'interviewed'].includes(event.stage)) completed.add(event.stage); });
    if (['verified', 'interviewed', 'accepted'].includes(stage)) completed.add('verified');
    if (['interviewed', 'accepted'].includes(stage)) completed.add('interviewed');
    const stepKeys = ['submitted', 'verified', 'interviewed', 'decision'];
    stepKeys.forEach((key, index) => {
      const step = document.createElement('li');
      const rejectedDecision = stage === 'rejected' && key === 'decision';
      const positiveDecision = stage === 'accepted' && key === 'decision';
      const isComplete = key !== 'decision' ? completed.has(key) : positiveDecision;
      const isCurrent = !terminal && currentIndex === index;
      if (isComplete) step.classList.add('is-complete');
      if (isCurrent) step.classList.add('is-current');
      if (rejectedDecision) step.classList.add('is-rejected');
      if (positiveDecision) step.classList.add('is-positive');
      const markerText = rejectedDecision ? '×' : isComplete ? '✓' : String(index + 1);
      const marker = addText(step, 'span', 'application-step-marker', markerText);
      marker.setAttribute('aria-hidden', 'true');
      addText(step, 'span', 'application-step-label', rejectedDecision ? processStageLabels.rejected : positiveDecision ? processStageLabels.accepted : labels[index]);
      if (isCurrent || rejectedDecision || positiveDecision) step.setAttribute('aria-current', 'step');
      steps.append(step);
    });
    progress.setAttribute('aria-label', `Etap aplikacji: ${getApplicationStageLabel(application)}`);
    addText(progress, 'p', 'application-progress-label', terminal ? getApplicationStageLabel(application) : `Krok ${currentIndex + 1} z 4 · ${getApplicationStageLabel(application)}`);
    progress.append(steps);
    addText(progress, 'p', 'application-demo-note', 'Status procesu jest aktualizowany przez konto rekrutera w tej samej przeglądarce.');
    return progress;
  };

  const updateAccountOverview = () => {
    const root = document.querySelector('[data-account-overview]');
    if (!root) return;
    root.replaceChildren();
    const view = root.dataset.accountView || 'overview';
    const profile = getCurrentProfile();
    if (!profile) {
      const recruiter = getCurrentRecruiter();
      if (recruiter) {
        addText(root, 'div', 'eyebrow', 'Konto rekrutera · demonstracja');
        addText(root, 'h2', '', 'To konto otwiera panel rekrutera.');
        addText(root, 'p', '', 'Oferty, zgłoszenia i ich etapy są dostępne w tej przeglądarce.');
        linkText(root, 'Przejdź do panelu rekrutera', 'rekruter.html', 'primary-cta account-overview-login');
        return;
      }
      addText(root, 'div', 'eyebrow', 'Konto testowe');
      addText(root, 'h2', '', 'Zaloguj się, aby otworzyć swój profil.');
      addText(root, 'p', '', 'Wybierz profil kandydata, aby zobaczyć swoje aplikacje, dane i podgląd CV.');
      const pageByView = { overview: 'konto.html', applications: 'aplikacje.html', offers: 'role.html', data: 'dane.html', cv: 'cv.html' };
      const nextPage = pageByView[document.body.dataset.candidatePage] || 'konto.html';
      linkText(root, 'Zaloguj się i wybierz profil', `zaloguj.html?next=${encodeURIComponent(nextPage)}`, 'primary-cta account-overview-login');
      return;
    }
    const applications = getApplications().filter(item => item.profileId === profile.id);
    if (view === 'overview') {
      addText(root, 'div', 'eyebrow', `Profil testowy · ${profile.id} · ${profile.archetype}`);
      addText(root, 'h2', '', `Witaj, ${profile.name}.`);
      addText(root, 'p', 'account-overview-role', profile.role);
      addText(root, 'p', '', profile.summary);
      const dashboard = document.createElement('div');
      dashboard.className = 'account-dashboard-links';
      dashboard.setAttribute('aria-label', 'Skróty do sekcji profilu');
      [
        { href: 'aplikacje.html', label: 'Moje aplikacje', value: String(applications.length), detail: 'Śledź zgłoszenia i kolejne kroki.' },
        { href: 'dane.html', label: 'Moje dane', value: 'Profil', detail: 'Sprawdź obszar i kompetencje.' },
        { href: 'cv.html', label: 'Moje CV', value: 'CV', detail: 'Zobacz profil zawodowy i dodaj plik.' }
      ].forEach(item => {
        const card = document.createElement('a');
        card.className = 'account-dashboard-link';
        card.href = item.href;
        addText(card, 'span', 'account-dashboard-link-label', item.label);
        addText(card, 'strong', 'account-dashboard-link-value', item.value);
        addText(card, 'span', 'account-dashboard-link-detail', item.detail);
        dashboard.append(card);
      });
      root.append(dashboard);
      return;
    }

    const dataSection = document.createElement('section');
    const dataTitle = addText(dataSection, 'h3', 'account-overview-subhead', 'Moje dane');
    dataTitle.id = 'dane';
    const dataGrid = document.createElement('dl');
    dataGrid.className = 'account-profile-data';
    [[ 'Profil testowy', `${profile.id} · ${profile.archetype}` ], [ 'Obszar zawodowy', profile.role ]].forEach(([label, value]) => {
      const cell = document.createElement('div');
      addText(cell, 'dt', '', label);
      addText(cell, 'dd', '', value);
      dataGrid.append(cell);
    });
    const skillsCell = document.createElement('div');
    addText(skillsCell, 'dt', '', 'Kompetencje');
    addText(skillsCell, 'dd', '', profile.skills.join(' · '));
    dataGrid.append(skillsCell);
    dataSection.append(dataGrid);
    if (view === 'data') root.append(dataSection);

    const applicationsSection = document.createElement('section');
    const applicationsTitle = addText(applicationsSection, 'h3', 'account-overview-subhead', 'Moje aplikacje');
    applicationsTitle.id = 'aplikacje';
    if (!applications.length) {
      addText(applicationsSection, 'p', 'account-empty-state', 'Nie masz jeszcze testowych aplikacji. Przeglądaj oferty i wyślij pierwsze zgłoszenie.');
      linkText(applicationsSection, 'Przeglądaj nowe oferty →', 'role.html', 'account-empty-link');
    } else {
      const list = document.createElement('div');
      list.className = 'account-application-list';
      applications.slice().reverse().forEach(item => {
        const row = document.createElement('article');
        row.className = `application-card${item.status === 'withdrawn' ? ' is-withdrawn' : ''}`;
        const main = document.createElement('div');
        main.className = 'application-card-main';
        const titleRow = document.createElement('div');
        titleRow.className = 'application-card-heading';
        addText(titleRow, 'h4', 'application-card-title', item.jobTitle);
        const processStage = getApplicationProcessStage(item);
        const statusClass = processStage === 'withdrawn' ? ' is-withdrawn' : processStage === 'rejected' ? ' is-rejected' : processStage === 'accepted' ? ' is-positive' : '';
        addText(titleRow, 'span', `application-card-status${statusClass}`, processStageLabels[processStage]);
        main.append(titleRow);
        addText(main, 'p', 'application-card-company', item.company);
        const aiInterviewUsed = Boolean(item.aiInterview || item.aiExpansionUsed || item.interviewInterested);
        if (item.status === 'withdrawn') {
          addText(main, 'p', 'application-withdrawn-note', 'Aplikacja wycofana. Nie bierze już udziału w demonstracyjnym procesie.');
        } else {
          main.append(renderApplicationProgress(item));
          if (aiInterviewUsed) addText(main, 'p', 'application-extra-note', item.aiInterview ? 'Dołączono odpowiedzi do rozmowy AI.' : 'Dołączono krótką odpowiedź.');
        }
        const aiStatus = document.createElement('div');
        aiStatus.className = `application-ai-status${aiInterviewUsed ? ' is-used' : ' is-skipped'}`;
        addText(aiStatus, 'span', 'application-ai-status-marker', aiInterviewUsed ? '✓' : '○');
        addText(aiStatus, 'span', '', aiInterviewUsed ? 'Odpowiedzi AI dołączone' : 'Opcja AI pominięta');
        main.append(aiStatus);
        const side = document.createElement('aside');
        side.className = 'application-card-side';
        const submitted = new Date(item.submittedAt);
        addText(side, 'time', 'application-submitted-date', `Wysłano ${submitted.toLocaleDateString('pl-PL')}`).dateTime = submitted.toISOString();
        if (item.status !== 'withdrawn' && !['accepted', 'rejected'].includes(processStage)) {
          const cancel = addText(side, 'button', 'application-cancel-button', 'Anuluj aplikację');
          cancel.type = 'button';
          cancel.dataset.withdrawApplication = item.id;
        } else if (item.withdrawnAt) {
          addText(side, 'small', 'application-submitted-date', `Wycofano ${new Date(item.withdrawnAt).toLocaleDateString('pl-PL')}`);
        }
        row.append(main, side);
        list.append(row);
      });
      applicationsSection.append(list);
    }
    if (view === 'applications') root.append(applicationsSection);

    const cvSection = document.createElement('section');
    const cvTitle = addText(cvSection, 'h3', 'account-overview-subhead', 'Moje CV');
    cvTitle.id = 'cv';
    const cv = document.createElement('div');
    cv.className = 'account-cv-sheet';
    const cvData = profile.cv;
    const uploadPanel = document.createElement('div');
    uploadPanel.className = 'cv-upload-panel';
    addText(uploadPanel, 'h4', 'cv-upload-title', 'Dodaj CV do profilu (opcjonalnie)');
    addText(uploadPanel, 'p', 'cv-upload-copy', 'Wybierz wyłącznie fikcyjny plik testowy. Wersja demonstracyjna zapisuje nazwę pliku w tej przeglądarce; nie wysyła ani nie odczytuje PDF-a.');
    const uploadLabel = addText(uploadPanel, 'label', 'cv-upload-control', 'Wybierz plik PDF');
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = '.pdf,application/pdf';
    uploadInput.dataset.profileCvUpload = '';
    uploadLabel.append(uploadInput);
    const cvAttachment = getCvAttachment(profile.id);
    const uploadStatus = addText(uploadPanel, 'p', 'cv-upload-status', cvAttachment ? `W profilu: ${cvAttachment.name} · ${Math.max(1, Math.round(cvAttachment.size / 1024))} KB` : 'Nie dodano pliku. Możesz dodać go później albo podczas aplikowania.');
    uploadStatus.dataset.profileCvStatus = '';
    if (cvAttachment) {
      const removeCv = addText(uploadPanel, 'button', 'cv-remove-button', 'Usuń plik z profilu');
      removeCv.type = 'button';
      removeCv.dataset.removeProfileCv = '';
    }
    cvSection.append(uploadPanel);
    addText(cv, 'div', 'cv-demo-banner', 'CV demonstracyjne · wszystkie osoby, dane i doświadczenia są fikcyjne');

    const cvHeader = document.createElement('div');
    cvHeader.className = 'cv-header';
    addText(cvHeader, 'h4', 'cv-name', profile.name);
    addText(cvHeader, 'p', 'cv-headline', cvData.headline);
    addText(cvHeader, 'p', 'cv-contact', `${cvData.location} · ${cvData.email}`);
    cv.append(cvHeader);

    const makeCvSection = title => {
      const section = document.createElement('section');
      section.className = 'cv-section';
      addText(section, 'h5', 'cv-section-title', title);
      cv.append(section);
      return section;
    };

    const about = makeCvSection('O mnie');
    addText(about, 'p', 'cv-copy', cvData.about);

    const experience = makeCvSection('Doświadczenie zawodowe');
    cvData.experience.forEach(item => {
      const entry = document.createElement('article');
      entry.className = 'cv-entry';
      addText(entry, 'h6', 'cv-entry-title', item.title);
      addText(entry, 'p', 'cv-entry-meta', `${item.company} · ${item.period}`);
      const duties = document.createElement('ul');
      duties.className = 'cv-bullet-list';
      item.bullets.forEach(bullet => addText(duties, 'li', '', bullet));
      entry.append(duties);
      experience.append(entry);
    });

    const projects = makeCvSection('Wybrane projekty');
    cvData.projects.forEach(item => {
      const entry = document.createElement('article');
      entry.className = 'cv-entry';
      addText(entry, 'h6', 'cv-entry-title', item.title);
      addText(entry, 'p', 'cv-copy', item.text);
      projects.append(entry);
    });

    const education = makeCvSection('Wykształcenie');
    cvData.education.forEach(item => {
      const entry = document.createElement('article');
      entry.className = 'cv-entry cv-entry--compact';
      addText(entry, 'h6', 'cv-entry-title', item.title);
      addText(entry, 'p', 'cv-entry-meta', `${item.school} · ${item.period}`);
      education.append(entry);
    });

    const competencies = makeCvSection('Umiejętności');
    cvData.skills.forEach(group => {
      const groupNode = document.createElement('div');
      groupNode.className = 'cv-skill-group';
      addText(groupNode, 'h6', 'cv-skill-label', group.label);
      addText(groupNode, 'p', 'cv-copy', group.values.join(' · '));
      competencies.append(groupNode);
    });

    const toolsSection = makeCvSection('Narzędzia i programy');
    const toolList = document.createElement('ul');
    toolList.className = 'cv-tag-list';
    cvData.tools.forEach(tool => addText(toolList, 'li', '', tool));
    toolsSection.append(toolList);

    const languages = makeCvSection('Języki');
    addText(languages, 'p', 'cv-copy', cvData.languages.join(' · '));

    const portfolio = makeCvSection('Portfolio i zakres odpowiedzialności');
    addText(portfolio, 'p', 'cv-copy', profile.evidence);
    cvSection.append(cv);
    if (view === 'cv') root.append(cvSection);
  };

  const renderRecruiterInbox = () => {
    const root = document.querySelector('[data-recruiter-inbox]');
    if (!root) return;
    recruiterAudioUrls.forEach(url => URL.revokeObjectURL(url));
    recruiterAudioUrls = [];
    root.replaceChildren();
    if (!getCurrentRecruiter()) return;
    const applications = getApplications()
      .filter(item => item.aiInterview && Array.isArray(item.aiInterview.answers))
      .slice()
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    if (!applications.length) {
      const empty = addText(root, 'p', 'recruiter-empty', 'Nie ma jeszcze aplikacji z odpowiedziami AI w tej przeglądarce. Złóż aplikację na fikcyjnej ofercie i wybierz opcję AI, aby zobaczyć przykład.');
      empty.setAttribute('role', 'status');
      return;
    }
    applications.forEach(application => {
      const profile = profiles.find(item => item.id === application.profileId);
      const card = document.createElement('article');
      card.className = 'recruiter-application-card';
      const header = document.createElement('header');
      header.className = 'recruiter-card-header';
      addText(header, 'h2', '', application.jobTitle || 'Oferta demonstracyjna');
      const date = new Date(application.submittedAt);
      addText(header, 'p', 'recruiter-card-meta', `${profile?.name || 'Kandydat'} · ${application.company || 'Firma demonstracyjna'} · ${date.toLocaleDateString('pl-PL')}${application.status === 'withdrawn' ? ' · aplikacja wycofana' : ''}`);
      card.append(header);

      const body = document.createElement('div');
      body.className = 'recruiter-card-body';
      const summary = document.createElement('section');
      summary.className = 'recruiter-summary';
      const summaryLabel = addText(summary, 'label', '', 'Podsumowanie AI · do sprawdzenia i edycji');
      const summaryArea = document.createElement('textarea');
      summaryArea.rows = 4;
      summaryArea.maxLength = 1000;
      summaryArea.value = application.aiInterview.summary || '';
      summaryArea.disabled = !application.aiInterview.summary;
      summaryArea.dataset.recruiterSummary = application.id;
      summaryLabel.append(summaryArea);
      addText(summary, 'small', '', application.aiInterview.summary ? 'Wygenerowano przez AI. Zmiany zapisują się automatycznie tylko w tej przeglądarce.' : 'Podsumowanie nie zostało wygenerowane przez OpenAI.');
      body.append(summary);

      const answers = document.createElement('div');
      answers.className = 'recruiter-answers';
      application.aiInterview.answers.forEach((entry, index) => {
        const answer = document.createElement('section');
        answer.className = 'recruiter-answer';
        addText(answer, 'h3', '', `${index + 1}. ${entry.question}`);
        if (entry.transcript) addText(answer, 'p', 'recruiter-transcript', `Oryginalna transkrypcja OpenAI: ${entry.transcript}`);
        addText(answer, 'p', '', `Odpowiedź kandydata: ${entry.answer}`);
        if (entry.audioKey) {
          const status = addText(answer, 'p', 'recruiter-status', 'Otwieramy lokalne nagranie…');
          const player = document.createElement('audio');
          player.controls = true;
          player.preload = 'metadata';
          player.setAttribute('aria-label', `Nagranie odpowiedzi ${index + 1} od ${profile?.name || 'kandydata'}`);
          answer.append(player);
          readInterviewAudio(entry.audioKey).then(blob => {
            if (!player.isConnected) return;
            if (!blob) {
              status.textContent = 'Nagranie nie jest dostępne w tej przeglądarce.';
              return;
            }
            const url = URL.createObjectURL(blob);
            recruiterAudioUrls.push(url);
            player.src = url;
            status.textContent = 'Nagranie zapisane lokalnie.';
          }).catch(() => {
            if (status.isConnected) status.textContent = 'Nie udało się odczytać nagrania z lokalnej pamięci.';
          });
        }
        answers.append(answer);
      });
      body.append(answers);
      card.append(body);
      const actions = document.createElement('div');
      actions.className = 'recruiter-card-actions';
      const remove = addText(actions, 'button', '', 'Usuń materiały rozmowy AI');
      remove.type = 'button';
      remove.dataset.deleteAiMaterials = application.id;
      card.append(actions);
      root.append(card);
    });
  };

  const seniorityLabels = { junior: 'Junior', mid: 'Mid', senior: 'Senior', expert: 'Expert' };
  const senioritySteps = { junior: 1, mid: 2, senior: 3, expert: 4 };
  const directionDefinitions = {
    product: { label: 'Produkt', icon: [['path', { d: 'M12 3 20 7.5 12 12 4 7.5 12 3Z' }], ['path', { d: 'M4 7.5v9L12 21l8-4.5v-9M12 12v9M4 7.5l8 4.5 8-4.5' }]] },
    design_ux: { label: 'Design i UX', icon: [['path', { d: 'm4 4 6.2 15 2.1-6.1 6.1-2.1L4 4Z' }], ['path', { d: 'm13 13 5 5' }], ['circle', { cx: '18', cy: '18', r: '2' }]] },
    marketing_content: { label: 'Marketing i content', icon: [['path', { d: 'M4 10v4h4l9 4V6l-9 4H4Z' }], ['path', { d: 'm8 14 2 5h3l-2-4.1M20 9a4 4 0 0 1 0 6' }]] },
    automation: { label: 'Automatyzacja', icon: [['path', { d: 'M7 7h10l-2.5-2.5M17 17H7l2.5 2.5' }], ['path', { d: 'M17 7a7 7 0 0 1 2 5M7 17a7 7 0 0 1-2-5' }], ['path', { d: 'M14.5 4.5 17 7l-2.5 2.5M9.5 14.5 7 17l2.5 2.5' }]] },
    engineering_data: { label: 'Inżynieria i data', icon: [['rect', { x: '7', y: '7', width: '10', height: '10', rx: '2' }], ['path', { d: 'M10 10h4v4h-4zM9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4' }]] },
    implementation: { label: 'Wdrożenia', icon: [['circle', { cx: '12', cy: '12', r: '8.5' }], ['path', { d: 'm8.5 12 2.3 2.3 4.8-5M12 3.5v2M20.5 12h-2M12 20.5v-2M3.5 12h2' }]] }
  };
  const featuredOfferIdsByDirection = {
    product: 'pub-004592',
    design_ux: 'pub-004633',
    marketing_content: 'pub-004715',
    automation: 'pub-004781',
    engineering_data: 'pub-004569',
    implementation: 'pub-004734'
  };
  const directionForLegacyCategory = { Build: 'engineering_data', Apply: 'implementation', Lead: 'product' };
  const getOfferDirection = job => job.direction || directionForLegacyCategory[job.category] || 'engineering_data';
  const createDirectionLabel = (direction, suffix = '') => {
    const definition = directionDefinitions[direction] || directionDefinitions.engineering_data;
    const label = document.createElement('span');
    label.className = `offer-category direction-label direction-label--${direction}`;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('direction-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.55');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    definition.icon.forEach(([tag, attributes]) => {
      const shape = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attributes).forEach(([key, value]) => shape.setAttribute(key, value));
      svg.append(shape);
    });
    label.append(svg);
    const text = document.createElement('span');
    text.textContent = `${definition.label}${suffix}`;
    label.append(text);
    return label;
  };
  const createSeniorityMeter = (seniority, direction) => {
    const level = seniorityLabels[seniority] ? seniority : 'junior';
    const meter = document.createElement('span');
    meter.className = `experience-level experience-level--${direction}`;
    meter.setAttribute('role', 'img');
    meter.setAttribute('aria-label', `Poziom ${seniorityLabels[level]}, ${senioritySteps[level]} z 4`);
    const name = document.createElement('span');
    name.className = 'experience-level-name';
    name.setAttribute('aria-hidden', 'true');
    name.textContent = seniorityLabels[level];
    meter.append(name);
    const stairs = document.createElement('span');
    stairs.className = 'experience-level-stairs';
    stairs.setAttribute('aria-hidden', 'true');
    for (let step = 1; step <= 4; step++) {
      const tile = document.createElement('span');
      tile.className = `experience-level-step${step <= senioritySteps[level] ? ' is-filled' : ''}`;
      stairs.append(tile);
    }
    meter.append(stairs);
    return meter;
  };
  const workModeLabels = { remote: 'Praca zdalna', hybrid: 'Hybrydowo', office: 'Stacjonarnie' };
  const contractLabels = { UoP: 'Umowa o pracę', B2B: 'B2B' };
  const money = value => new Intl.NumberFormat('pl-PL').format(value);
  const salaryLabel = job => {
    if (job.salaryMin == null || job.salaryMax == null) return 'Widełki niepodane';
    return `${money(job.salaryMin)}–${money(job.salaryMax)} zł`;
  };
  const jobList = document.querySelector('[data-job-list]');
  const featuredJobList = document.querySelector('[data-featured-jobs]');
  const demoJobs = Array.isArray(window.demoJobsData) ? window.demoJobsData : [];
  const getRecruiterJobs = () => {
    const value = readJSON(keys.jobs, []);
    return Array.isArray(value) ? value.filter(job => job && typeof job.id === 'string' && job.id.startsWith('rec-')) : [];
  };
  const getJobs = () => [...getRecruiterJobs(), ...demoJobs].sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')));
  const renderJobListings = () => {
    if (!jobList) return;
    jobList.replaceChildren();
    getJobs().forEach(job => {
      const card = document.createElement('article');
      card.className = 'job-listing';
      card.dataset.jobCard = '';
      card.dataset.jobId = job.id;
      const direction = getOfferDirection(job);
      card.dataset.jobCategory = direction;
      card.dataset.jobTitle = job.title;
      card.dataset.jobCompany = job.company;
      card.dataset.jobCity = job.city;
      card.dataset.jobSeniority = job.seniority;
      card.dataset.jobMode = job.mode;
      card.dataset.jobContract = job.contract;
      card.dataset.jobSalary = String(job.salaryMin != null && job.salaryMax != null);

      const top = document.createElement('div');
      top.className = 'job-topline';
      top.append(createDirectionLabel(direction));
      top.append(createSeniorityMeter(job.seniority, direction));
      card.append(top);
      addText(card, 'h3', 'job-title', job.title);
      addText(card, 'p', 'job-company', job.company);
      addText(card, 'p', 'job-summary', job.summary);

      const metaRow = document.createElement('div');
      metaRow.className = 'job-meta-row';
      const meta = document.createElement('ul');
      meta.className = 'job-meta';
      [job.city, workModeLabels[job.mode], contractLabels[job.contract]].forEach(item => addText(meta, 'li', '', item));
      metaRow.append(meta);
      const salary = document.createElement('div');
      salary.className = 'job-salary';
      addText(salary, 'span', 'job-salary-label', 'Wynagrodzenie');
      addText(salary, 'strong', 'job-salary-value', salaryLabel(job));
      metaRow.append(salary);
      card.append(metaRow);
      const date = new Date(`${job.publishedAt}T12:00:00`).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
      addText(card, 'div', 'job-date', `Dodano ${date} · dane demonstracyjne`);

      const details = document.createElement('details');
      details.className = 'job-details';
      addText(details, 'summary', '', 'Zakres roli i proces rekrutacji');
      const detailBody = document.createElement('div');
      detailBody.className = 'job-details-body';
      [['Odpowiedzialność:', job.responsibility], ['Zakres samodzielności:', job.mandate], ['Zespół i dane:', job.team], ['Proces:', job.process]].forEach(([label, value]) => {
        const paragraph = document.createElement('p');
        addText(paragraph, 'b', '', label);
        paragraph.append(document.createTextNode(` ${value}`));
        detailBody.append(paragraph);
      });
      details.append(detailBody);
      card.append(details);

      const actions = document.createElement('div');
      actions.className = 'job-actions';
      const apply = addText(actions, 'button', 'apply-button', 'Aplikuj do oferty ↗');
      apply.type = 'button';
      apply.dataset.applyJob = job.id;
      const state = addText(actions, 'span', 'application-state', '');
      state.dataset.applicationState = job.id;
      card.append(actions);
      jobList.append(card);
    });
  };

  const renderFeaturedJobListings = () => {
    const jobs = getJobs();
    if (!featuredJobList || !jobs.length) return;
    featuredJobList.replaceChildren();
    Object.entries(featuredOfferIdsByDirection).forEach(([direction, offerId]) => {
      const job = jobs.find(item => item.id === offerId) || jobs.find(item => getOfferDirection(item) === direction);
      if (!job) return;
      const card = document.createElement('article');
      card.className = 'offer-card featured-offer-card';
      card.setAttribute('role', 'listitem');

      const top = document.createElement('div');
      top.className = 'featured-offer-top';
      top.append(createDirectionLabel(direction));
      top.append(createSeniorityMeter(job.seniority, direction));
      card.append(top);
      addText(card, 'h3', 'offer-title', job.title);
      addText(card, 'p', 'featured-offer-company', job.company);
      addText(card, 'p', 'offer-meta', job.summary);

      const meta = document.createElement('ul');
      meta.className = 'featured-offer-meta';
      [job.city, workModeLabels[job.mode], contractLabels[job.contract]].forEach(value => addText(meta, 'li', '', value));
      card.append(meta);
      const footer = document.createElement('div');
      footer.className = 'featured-offer-footer';
      const salary = document.createElement('div');
      salary.className = 'featured-offer-salary';
      addText(salary, 'span', 'featured-offer-salary-label', 'Wynagrodzenie');
      addText(salary, 'strong', 'featured-offer-salary-value', salaryLabel(job));
      footer.append(salary);
      linkText(footer, 'Szczegóły oferty →', `role.html?offer=${encodeURIComponent(job.id)}`, 'featured-offer-link');
      card.append(footer);
      featuredJobList.append(card);
    });
  };

  const pluralOffers = count => {
    if (count === 1) return 'oferta';
    const last = count % 10, lastTwo = count % 100;
    return last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14) ? 'oferty' : 'ofert';
  };
  const filterForm = document.querySelector('[data-job-filter-form]');
  const applyJobFilters = () => {
    if (!jobList) return;
    const value = key => filterForm?.querySelector(`[data-filter="${key}"]`)?.value || '';
    const query = value('query').trim().toLocaleLowerCase('pl-PL');
    const filters = { category: value('category'), city: value('city'), seniority: value('seniority'), mode: value('mode'), contract: value('contract') };
    const salaryOnly = Boolean(filterForm?.querySelector('[data-filter="salary"]')?.checked);
    let count = 0;
    document.querySelectorAll('[data-job-card]').forEach(card => {
      const matches = (!filters.category || card.dataset.jobCategory === filters.category)
        && (!filters.city || card.dataset.jobCity === filters.city)
        && (!filters.seniority || card.dataset.jobSeniority === filters.seniority)
        && (!filters.mode || card.dataset.jobMode === filters.mode)
        && (!filters.contract || card.dataset.jobContract === filters.contract)
        && (!salaryOnly || card.dataset.jobSalary === 'true')
        && (!query || card.textContent.toLocaleLowerCase('pl-PL').includes(query));
      card.hidden = !matches;
      if (matches) count++;
    });
    const countText = `${count} ${pluralOffers(count)}`;
    document.querySelectorAll('[data-filter-count]').forEach(node => { node.textContent = String(count); });
    document.querySelectorAll('[data-results-count]').forEach(node => { node.textContent = countText; });
    const empty = document.querySelector('[data-job-empty]');
    if (empty) empty.hidden = count !== 0;
  };
  const initializeJobFilters = () => {
    if (!filterForm) return;
    const params = new URLSearchParams(window.location.search);
    const selectedOffer = getJobs().find(job => job.id === params.get('offer'));
    const category = params.get('category');
    if (selectedOffer) filterForm.querySelector('[data-filter="category"]').value = getOfferDirection(selectedOffer);
    else if (category && Object.prototype.hasOwnProperty.call(directionDefinitions, category)) filterForm.querySelector('[data-filter="category"]').value = category;
    filterForm.addEventListener('input', applyJobFilters);
    filterForm.addEventListener('change', applyJobFilters);
    filterForm.addEventListener('submit', event => { event.preventDefault(); applyJobFilters(); });
    filterForm.addEventListener('reset', () => window.setTimeout(applyJobFilters, 0));
    applyJobFilters();
    if (selectedOffer) {
      const target = [...document.querySelectorAll('[data-job-card]')].find(card => card.dataset.jobId === selectedOffer.id);
      if (target) {
        target.classList.add('job-listing--highlighted');
        const details = target.querySelector('.job-details');
        if (details) details.open = true;
        window.setTimeout(() => target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' }), 80);
      }
    }
  };

  const renderRecruiterJobList = () => {
    const root = document.querySelector('[data-recruiter-jobs]');
    if (!root) return;
    root.replaceChildren();
    const publishedJobs = getRecruiterJobs().slice().sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
    if (!publishedJobs.length) {
      const empty = addText(root, 'p', 'recruiter-empty', 'Nie opublikowano jeszcze ofert. ');
      linkText(empty, 'Utwórz pierwszą ofertę →', 'rekruter-utworz.html', 'recruiter-inline-link');
      return;
    }
    const applications = getApplications();
    publishedJobs.forEach(job => {
      const card = document.createElement('article');
      card.className = 'recruiter-job-card';
      const heading = document.createElement('div');
      heading.className = 'recruiter-job-card-heading';
      addText(heading, 'h3', '', job.title);
      addText(heading, 'span', 'recruiter-state-chip', 'Opublikowana');
      card.append(heading);
      addText(card, 'p', 'recruiter-card-meta', `${job.company} · ${job.city} · ${applications.filter(item => item.jobId === job.id).length} aplikacji`);
      addText(card, 'p', 'recruiter-job-summary', job.summary);
      linkText(card, 'Zobacz ofertę w katalogu →', `role.html?offer=${encodeURIComponent(job.id)}`, 'recruiter-inline-link');
      const applicationCount = applications.filter(item => item.jobId === job.id).length;
      linkText(card, `Zobacz aplikacje (${applicationCount}) →`, `rekruter.html?offer=${encodeURIComponent(job.id)}`, 'recruiter-inline-link recruiter-job-applications-link');
      root.append(card);
    });
  };

  let recruiterFiltersInitialized = false;
  const renderRecruiterApplicationFilters = () => {
    const form = document.querySelector('[data-recruiter-filters]');
    if (!form) return;
    const offerSelect = form.querySelector('[data-recruiter-filter="offer"]');
    const statusSelect = form.querySelector('[data-recruiter-filter="status"]');
    const applications = getApplications();
    if (offerSelect) {
      const currentValue = offerSelect.value;
      const requestedOffer = new URLSearchParams(window.location.search).get('offer') || '';
      const selected = recruiterFiltersInitialized ? currentValue : requestedOffer;
      const offers = new Map();
      getJobs().forEach(job => offers.set(job.id, `${job.title || 'Oferta demonstracyjna'} · ${job.company || 'DoRobory.AI'}`));
      applications.forEach(application => {
        if (typeof application.jobId !== 'string' || !application.jobId) return;
        if (!offers.has(application.jobId)) offers.set(application.jobId, `${application.jobTitle || 'Oferta demonstracyjna'} · ${application.company || 'DoRobory.AI'}`);
      });
      offerSelect.replaceChildren(new Option('Wszystkie oferty', ''));
      offers.forEach((label, id) => offerSelect.add(new Option(label, id)));
      if ([...offerSelect.options].some(option => option.value === selected)) offerSelect.value = selected;
    }
    if (statusSelect) {
      const selected = statusSelect.value;
      statusSelect.replaceChildren(new Option('Wszystkie statusy', ''));
      Object.entries(processStageLabels).forEach(([stage, label]) => statusSelect.add(new Option(label, stage)));
      if ([...statusSelect.options].some(option => option.value === selected)) statusSelect.value = selected;
    }
    recruiterFiltersInitialized = true;
  };

  const normalizeRecruiterSearch = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pl-PL').trim();
  const getFilteredRecruiterApplications = applications => {
    const form = document.querySelector('[data-recruiter-filters]');
    const offerId = form?.querySelector('[data-recruiter-filter="offer"]')?.value || '';
    const status = form?.querySelector('[data-recruiter-filter="status"]')?.value || '';
    const query = normalizeRecruiterSearch(form?.querySelector('[data-recruiter-filter="query"]')?.value);
    return applications.filter(application => {
      if (offerId && application.jobId !== offerId) return false;
      if (status && getApplicationProcessStage(application) !== status) return false;
      if (!query) return true;
      const profile = profiles.find(item => item.id === application.profileId);
      const searchable = normalizeRecruiterSearch([
        application.applicantName,
        application.jobTitle,
        application.company,
        profile?.name,
        profile?.role
      ].filter(Boolean).join(' '));
      return searchable.includes(query);
    });
  };

  const renderRecruiterApplications = () => {
    const root = document.querySelector('[data-recruiter-applications]');
    if (!root) return;
    root.replaceChildren();
    renderRecruiterApplicationFilters();
    const allApplications = getApplications().slice().sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    const applications = getFilteredRecruiterApplications(allApplications);
    const count = document.querySelector('[data-recruiter-applications-count]');
    if (count) count.textContent = `${applications.length} ${applications.length === 1 ? 'aplikacja' : 'aplikacji'}`;
    if (!allApplications.length) {
      addText(root, 'p', 'recruiter-empty', 'Nie ma jeszcze zgłoszeń. Aplikacje kandydatów pojawią się tutaj po wysłaniu formularza.');
      return;
    }
    if (!applications.length) {
      addText(root, 'p', 'recruiter-empty', 'Nie znaleziono aplikacji dla wybranych filtrów. Zmień kryteria lub wyczyść filtry.');
      return;
    }
    applications.forEach(application => {
      const profile = profiles.find(item => item.id === application.profileId);
      const stage = getApplicationProcessStage(application);
      const card = document.createElement('article');
      card.className = 'recruiter-application-card';
      const header = document.createElement('header');
      header.className = 'recruiter-card-header';
      addText(header, 'h2', '', application.jobTitle || 'Oferta demonstracyjna');
      const submitted = new Date(application.submittedAt);
      addText(header, 'p', 'recruiter-card-meta', `${profile?.name || 'Kandydat testowy'} · ${profile?.role || 'Profil demonstracyjny'} · ${application.company || 'DoRobory.AI'} · ${submitted.toLocaleDateString('pl-PL')}`);
      card.append(header);

      const body = document.createElement('div');
      body.className = 'recruiter-card-body';
      const status = document.createElement('div');
      status.className = 'recruiter-application-status';
      addText(status, 'span', 'recruiter-application-status-label', 'Aktualny etap');
      const statusClass = stage === 'rejected' ? ' is-rejected' : stage === 'accepted' ? ' is-positive' : stage === 'withdrawn' ? ' is-withdrawn' : '';
      addText(status, 'strong', `recruiter-state-chip${statusClass}`, processStageLabels[stage]);
      body.append(status);

      if (Array.isArray(application.answers) && application.answers.length) {
        const details = document.createElement('details');
        details.className = 'recruiter-candidate-answers';
        const answerCount = application.answers.length;
        addText(details, 'summary', '', `Odpowiedzi w aplikacji (${answerCount})`);
        const list = document.createElement('dl');
        application.answers.forEach((entry, index) => {
          addText(list, 'dt', '', entry.question || `Pytanie ${index + 1}`);
          addText(list, 'dd', '', entry.answer || 'Brak odpowiedzi');
        });
        details.append(list);
        body.append(details);
      }
      card.append(body);

      const actions = document.createElement('div');
      actions.className = 'recruiter-card-actions recruiter-process-actions';
      if (application.status !== 'withdrawn' && !['accepted', 'rejected'].includes(stage)) {
        const nextAction = stage === 'submitted' ? ['verified', 'Oznacz zgłoszenie jako zweryfikowane']
          : stage === 'verified' ? ['interviewed', 'Oznacz rozmowę jako przeprowadzoną']
            : ['accepted', 'Decyzja pozytywna · zatrudnij'];
        const advance = addText(actions, 'button', 'recruiter-process-button is-primary', nextAction[1]);
        advance.type = 'button';
        advance.dataset.processApplication = application.id;
        advance.dataset.processStage = nextAction[0];
        const reject = addText(actions, 'button', 'recruiter-process-button is-danger', 'Odrzuć aplikację');
        reject.type = 'button';
        reject.dataset.processApplication = application.id;
        reject.dataset.processStage = 'rejected';
      } else {
        addText(actions, 'p', `recruiter-terminal-note${statusClass}`, stage === 'withdrawn' ? 'Kandydat wycofał zgłoszenie.' : processStageLabels[stage]);
      }
      card.append(actions);
      root.append(card);
    });
  };

  const renderRecruiterWorkspace = () => {
    const workspace = document.querySelector('[data-recruiter-workspace]');
    const access = document.querySelector('[data-recruiter-access]');
    if (!workspace) return;
    const recruiter = getCurrentRecruiter();
    workspace.hidden = !recruiter;
    if (access) access.hidden = Boolean(recruiter);
    if (!recruiter) return;
    renderRecruiterJobList();
    renderRecruiterApplications();
    renderRecruiterInbox();
  };

  const updateRecruiterApplicationStage = (applicationId, nextStage) => {
    if (!getCurrentRecruiter()) return false;
    const transitions = {
      submitted: ['verified', 'rejected'],
      verified: ['interviewed', 'rejected'],
      interviewed: ['accepted', 'rejected']
    };
    const applications = getApplications();
    const current = applications.find(item => item.id === applicationId);
    if (!current || current.status === 'withdrawn') return false;
    const previousStage = getApplicationProcessStage(current);
    if (!transitions[previousStage]?.includes(nextStage)) return false;
    const changedAt = new Date().toISOString();
    const processEvents = Array.isArray(current.processEvents) && current.processEvents.length
      ? current.processEvents
      : [{ stage: 'submitted', changedAt: current.submittedAt, actor: 'system' }];
    const updated = applications.map(item => item.id === applicationId ? {
      ...item,
      processStage: nextStage,
      processEvents: [...processEvents, { stage: nextStage, changedAt, actor: recruiterAccount.id, previousStage }]
    } : item);
    writeJSON(keys.applications, updated);
    updateApplicationButtons();
    updateAccountOverview();
    renderRecruiterWorkspace();
    showToast(nextStage === 'rejected' ? 'Aplikacja została odrzucona.' : `Zapisano etap: ${processStageLabels[nextStage]}.`);
    return true;
  };

  const applicationQuestions = [
    { question: 'Kiedy możesz rozpocząć pracę?', options: ['Od zaraz', 'W ciągu 2 tygodni', 'W ciągu miesiąca', 'Za ponad miesiąc'] },
    { question: 'Jaki tryb pracy najbardziej Ci odpowiada?', options: ['Zdalny', 'Hybrydowy', 'Stacjonarny', 'Bez preferencji'] },
    { question: 'Co najbardziej przyciąga Cię do tej roli?', options: ['Wpływ na użytkowników', 'Praca z rozwiązaniami AI', 'Współpraca z zespołem', 'Możliwość rozwoju'] },
    { question: 'Jak zaczynasz zadanie, którego zakres nie jest jeszcze jasny?', options: ['Dopytuję o cel', 'Sprawdzam dostępne dane', 'Proponuję mały pierwszy krok', 'Uzgadniam podejście z zespołem'] },
    { question: 'Co pomaga Ci najlepiej wykonać nowy projekt?', options: ['Jasny zakres odpowiedzialności', 'Regularne krótkie rozmowy', 'Wspólne planowanie', 'Czas na samodzielne przygotowanie'] }
  ];
  const getInterviewOffer = flow => getJobs().find(job => job.id === flow.jobId) || null;
  const interviewOfferContext = job => ({
    title: job.title,
    company: job.company,
    summary: job.summary,
    responsibility: job.responsibility,
    mandate: job.mandate,
    team: job.team,
    process: job.process
  });
  const postInterviewJson = async (path, payload) => {
    let response;
    try {
      response = await fetch(path, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      throw new Error('Nie udało się połączyć z lokalną usługą AI. Uruchom aplikację przez npm run dev i spróbuj ponownie.');
    }
    const result = await response.json().catch(() => ({}));
    if (response.ok) return result;
    if (result.error === 'openai_not_configured') {
      throw new Error('Brakuje OPENAI_API_KEY. Dodaj klucz do lokalnego pliku .env.local i uruchom ponownie serwer.');
    }
    if (result.error === 'openai_auth_failed') {
      throw new Error('Klucz OpenAI jest nieprawidłowy albo nie ma dostępu do tej usługi. Sprawdź .env.local.');
    }
    if (result.error === 'openai_rate_limited') {
      throw new Error('OpenAI chwilowo ogranicza liczbę zapytań. Odczekaj chwilę i spróbuj ponownie.');
    }
    if (response.status === 413) throw new Error('Nagranie przekracza limit 25 MB. Nagraj krótszą odpowiedź.');
    if (response.status === 415) throw new Error('Format nagrania nie jest obsługiwany. Wpisz odpowiedź tekstowo.');
    throw new Error('Usługa OpenAI nie zwróciła odpowiedzi. Spróbuj ponownie albo złóż zwykłą aplikację.');
  };
  const generateInterviewQuestions = async flow => {
    const profile = profiles.find(item => item.id === flow.profileId);
    const job = getInterviewOffer(flow);
    if (!profile || !job) throw new Error('Nie znaleziono profilu lub wybranej oferty. Wróć do aplikacji i spróbuj ponownie.');
    const cv = profile.cv;
    const result = await postInterviewJson('/api/ai-interview/questions', {
      context: {
        cv: {
          headline: cv.headline,
          about: cv.about,
          experience: cv.experience,
          projects: cv.projects,
          skills: cv.skills,
          tools: cv.tools
        },
        offer: interviewOfferContext(job)
      }
    });
    if (!Array.isArray(result.questions) || result.questions.length !== 3 || result.questions.some(question => typeof question !== 'string' || !question.trim())) {
      throw new Error('Nie udało się przygotować dokładnie trzech pytań. Spróbuj ponownie.');
    }
    return result.questions.map(question => question.trim());
  };
  const generateInterviewSummary = async flow => {
    const job = getInterviewOffer(flow);
    const answers = flow.aiQuestions.map((question, index) => ({
      question,
      answer: flow.aiAnswers[index].answer.trim()
    }));
    if (!job || answers.length !== 3 || answers.some(item => !item.answer)) {
      throw new Error('Uzupełnij odpowiedzi na wszystkie trzy pytania.');
    }
    const result = await postInterviewJson('/api/ai-interview/summary', {
      offer: interviewOfferContext(job),
      answers
    });
    if (typeof result.summary !== 'string' || !result.summary.trim()) {
      throw new Error('Nie udało się przygotować podsumowania. Spróbuj ponownie.');
    }
    return result.summary.trim();
  };
  const formatCountdown = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const stopApplicationTimer = () => {
    window.clearInterval(applicationTimer);
    applicationTimer = 0;
  };
  const advanceInterviewQuestion = () => {
    if (!applicationFlow || applicationFlow.stage !== 'ai') return;
    if (applicationFlow.aiQuestionIndex < applicationFlow.aiQuestions.length - 1) {
      applicationFlow.aiQuestionIndex++;
      applicationFlow.questionExpired = false;
      applicationFlow.advanceAfterTranscription = false;
      applicationFlow.timerEndsAt = Date.now() + 180_000;
      renderApplicationFlow();
      applicationFlowRoot?.querySelector('[data-ai-answer]')?.focus();
      startApplicationTimer();
      return;
    }
    stopApplicationTimer();
    applicationFlow.stage = 'ai-review';
    applicationFlow.questionExpired = false;
    applicationFlow.advanceAfterTranscription = false;
    renderApplicationFlow();
    applicationFlowRoot?.querySelector('[data-ai-review-answer]')?.focus();
  };
  const transcribeInterviewAnswer = async (flow, index, blob) => {
    const answer = flow.aiAnswers[index];
    try {
      const response = await fetch('/api/ai-interview/transcribe', {
        method: 'POST',
        headers: { 'content-type': blob.type || 'audio/webm' },
        body: blob
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (result.error === 'openai_not_configured') throw new Error('Brakuje OPENAI_API_KEY. Dodaj go do .env.local i uruchom ponownie serwer.');
        if (result.error === 'openai_auth_failed') throw new Error('Klucz OpenAI jest nieprawidłowy albo nie ma dostępu do transkrypcji. Sprawdź .env.local.');
        if (result.error === 'openai_rate_limited') throw new Error('OpenAI chwilowo ogranicza liczbę zapytań. Odczekaj chwilę i spróbuj ponownie.');
        throw new Error('Nie udało się utworzyć transkrypcji. Możesz wpisać odpowiedź ręcznie albo nagrać ją ponownie.');
      }
      if (applicationFlow !== flow) return;
      answer.transcript = typeof result.transcript === 'string' ? result.transcript : '';
      answer.answer = answer.transcript;
      answer.transcriptionError = answer.transcript ? '' : 'Transkrypcja jest pusta. Wpisz odpowiedź albo spróbuj nagrać ją ponownie.';
    } catch (error) {
      if (applicationFlow !== flow) return;
      answer.transcriptionError = error instanceof Error ? error.message : 'Nie udało się utworzyć transkrypcji.';
    } finally {
      answer.transcribing = false;
      if (applicationFlow === flow) {
        const shouldAdvance = flow.advanceAfterTranscription;
        renderApplicationFlow();
        if (shouldAdvance) advanceInterviewQuestion();
        else applicationFlowRoot?.querySelector('[data-ai-answer]')?.focus();
      }
    }
  };
  const startInterviewRecording = async () => {
    const flow = applicationFlow;
    if (!flow || flow.stage !== 'ai' || flow.questionExpired || activeInterviewRecorder) return;
    const index = flow.aiQuestionIndex;
    const answer = flow.aiAnswers[index];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (applicationFlow !== flow) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      activeInterviewStream = stream;
      activeInterviewChunks = [];
      const supportedType = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find(type => MediaRecorder.isTypeSupported(type));
      const recorder = supportedType ? new MediaRecorder(stream, { mimeType: supportedType }) : new MediaRecorder(stream);
      activeInterviewRecorder = recorder;
      answer.recording = true;
      answer.transcriptionError = '';
      recorder.addEventListener('dataavailable', event => {
        if (event.data?.size) activeInterviewChunks.push(event.data);
      });
      recorder.addEventListener('error', () => {
        answer.recording = false;
        answer.transcriptionError = 'Nagrywanie zostało przerwane. Możesz wpisać odpowiedź lub spróbować ponownie.';
        activeInterviewStream?.getTracks().forEach(track => track.stop());
        activeInterviewRecorder = null;
        activeInterviewStream = null;
        if (applicationFlow === flow) renderApplicationFlow();
      });
      recorder.addEventListener('stop', () => {
        const blob = new Blob(activeInterviewChunks, { type: recorder.mimeType || 'audio/webm' });
        activeInterviewChunks = [];
        activeInterviewStream?.getTracks().forEach(track => track.stop());
        activeInterviewRecorder = null;
        activeInterviewStream = null;
        if (flow.cancelled) return;
        answer.recording = false;
        if (!blob.size) {
          answer.transcribing = false;
          answer.transcriptionError = 'Nagranie jest puste. Wpisz odpowiedź albo nagraj ją ponownie.';
          if (applicationFlow === flow) renderApplicationFlow();
          if (flow.advanceAfterTranscription && applicationFlow === flow) advanceInterviewQuestion();
          return;
        }
        answer.audioBlob = blob;
        answer.transcribing = true;
        answer.transcriptionError = '';
        if (applicationFlow === flow) renderApplicationFlow();
        transcribeInterviewAnswer(flow, index, blob);
      }, { once: true });
      recorder.start(1000);
      renderApplicationFlow();
      applicationFlowRoot?.querySelector('[data-toggle-recording]')?.focus();
    } catch {
      activeInterviewStream?.getTracks().forEach(track => track.stop());
      activeInterviewStream = null;
      if (applicationFlow === flow) {
        answer.recording = false;
        answer.transcriptionError = 'Nie udało się uruchomić mikrofonu. Sprawdź uprawnienia przeglądarki albo wpisz odpowiedź.';
        renderApplicationFlow();
      }
    }
  };
  const stopInterviewRecording = () => {
    if (!activeInterviewRecorder || activeInterviewRecorder.state === 'inactive') return;
    const flow = applicationFlow;
    const answer = flow?.aiAnswers?.[flow.aiQuestionIndex];
    if (answer) answer.recording = false;
    activeInterviewRecorder.stop();
    if (flow && applicationFlow === flow) {
      if (answer) answer.transcribing = true;
      renderApplicationFlow();
      applicationFlowRoot?.querySelector('[data-toggle-recording]')?.focus();
    }
  };
  const expireInterviewQuestion = () => {
    const flow = applicationFlow;
    if (!flow || flow.stage !== 'ai' || flow.questionExpired) return;
    stopApplicationTimer();
    flow.questionExpired = true;
    const answer = flow.aiAnswers[flow.aiQuestionIndex];
    if (answer.recording && activeInterviewRecorder) {
      flow.advanceAfterTranscription = true;
      stopInterviewRecording();
      renderApplicationFlow();
      return;
    }
    if (answer.transcribing) {
      flow.advanceAfterTranscription = true;
      renderApplicationFlow();
      return;
    }
    advanceInterviewQuestion();
  };
  const closeApplicationFlow = () => {
    stopApplicationTimer();
    if (applicationFlow) applicationFlow.cancelled = true;
    if (activeInterviewRecorder && activeInterviewRecorder.state !== 'inactive') activeInterviewRecorder.stop();
    activeInterviewStream?.getTracks().forEach(track => track.stop());
    activeInterviewRecorder = null;
    activeInterviewStream = null;
    applicationFlow = null;
    if (applicationDialog?.open) applicationDialog.close();
  };
  const makeFlowButton = (parent, label, className, dataKey, dataValue = '') => {
    const button = addText(parent, 'button', `application-flow-button ${className}`, label);
    button.type = 'button';
    button.dataset[dataKey] = dataValue;
    return button;
  };
  const addFlowHeader = (step, title, description) => {
    const heading = addText(applicationFlowRoot, 'div', 'application-flow-heading', '');
    addText(heading, 'div', 'eyebrow', `Aplikacja · krok ${step} z 3`);
    const titleNode = addText(heading, 'h2', 'application-flow-title', title);
    titleNode.id = 'application-flow-title';
    titleNode.tabIndex = -1;
    addText(heading, 'p', 'application-flow-copy', description);
    const context = document.createElement('div');
    context.className = 'application-job-context';
    addText(context, 'strong', '', applicationFlow.jobTitle);
    addText(context, 'span', '', applicationFlow.company);
    applicationFlowRoot.append(context);
  };
  const addFlowError = () => {
    const error = addText(applicationFlowRoot, 'p', 'application-flow-error', '');
    error.dataset.applicationError = '';
    error.setAttribute('role', 'alert');
    error.tabIndex = -1;
    return error;
  };
  const addFlowActions = () => {
    const actions = document.createElement('div');
    actions.className = 'application-flow-actions';
    applicationFlowRoot.append(actions);
    return actions;
  };
  const renderFlowStepPills = activeStep => {
    const list = document.createElement('ol');
    list.className = 'application-modal-steps';
    ['CV i doświadczenie', 'Pytania', 'Opcjonalne AI'].forEach((label, index) => {
      const step = addText(list, 'li', index + 1 === activeStep ? 'is-current' : index + 1 < activeStep ? 'is-complete' : '', label);
      if (index + 1 === activeStep) step.setAttribute('aria-current', 'step');
    });
    applicationFlowRoot.append(list);
  };
  const renderCvStep = profile => {
    addFlowHeader(1, 'Zacznij aplikację', 'Sprawdź doświadczenie, które chcesz pokazać przy tej ofercie. Załącznik CV jest opcjonalny.');
    renderFlowStepPills(1);
    const upload = document.createElement('section');
    upload.className = 'application-cv-upload';
    addText(upload, 'h3', '', 'CV w profilu');
    const attachment = getCvAttachment(profile.id);
    applicationFlow.cvAttachment = attachment;
    addText(upload, 'p', 'application-cv-file', attachment ? `Dodany plik: ${attachment.name}` : 'Nie dodano pliku PDF. Możesz dodać go teraz albo kontynuować bez załącznika.');
    const uploadLabel = addText(upload, 'label', 'cv-upload-control', attachment ? 'Zmień plik PDF' : 'Wybierz plik PDF');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,application/pdf';
    input.dataset.applicationCvUpload = '';
    uploadLabel.append(input);
    addText(upload, 'p', 'cv-upload-copy', 'Użyj fikcyjnego pliku testowego. Prototyp zapisuje tylko nazwę pliku w tej przeglądarce; nie odczytuje ani nie wysyła PDF-a.');
    applicationFlowRoot.append(upload);

    const experiences = profile.cv.experience || [];
    const experiencePanel = document.createElement('section');
    experiencePanel.className = 'application-profile-experience';
    addText(experiencePanel, 'h3', '', 'Doświadczenie z profilu CV');
    addText(experiencePanel, 'p', '', 'CV i ankieta wystarczą do zwykłej aplikacji. Opisanie doświadczenia jest dobrowolne i pojawi się tylko po zaznaczeniu opcji AI.');
    if (experiences.length) {
      const experienceList = document.createElement('ul');
      experienceList.className = 'application-profile-experience-list';
      experiences.forEach(item => {
        const entry = document.createElement('li');
        addText(entry, 'strong', '', item.title);
        addText(entry, 'small', '', `${item.company} · ${item.period}`);
        experienceList.append(entry);
      });
      experiencePanel.append(experienceList);
    } else addText(experiencePanel, 'p', 'application-cv-file', 'Profil nie ma jeszcze przykładowego doświadczenia. Możesz aplikować bez niego.');
    applicationFlowRoot.append(experiencePanel);
    addFlowError();
    const actions = addFlowActions();
    makeFlowButton(actions, 'Anuluj', 'is-secondary', 'closeApplication');
    makeFlowButton(actions, 'Dalej', 'is-primary', 'applicationNext', 'questions');
  };
  const renderQuestionsStep = profile => {
    addFlowHeader(2, 'Kilka pytań o Twoją aplikację', 'Wybierz odpowiedź, która najlepiej Cię opisuje. To krótkie pytania demonstracyjne.');
    renderFlowStepPills(2);
    const form = document.createElement('div');
    form.className = 'application-questions';
    applicationQuestions.forEach((item, questionIndex) => {
      const fieldset = document.createElement('fieldset');
      fieldset.className = 'application-choice-group';
      addText(fieldset, 'legend', '', `${questionIndex + 1}. ${item.question}`);
      item.options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'application-choice-option';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `application-answer-${questionIndex}`;
        radio.value = option;
        radio.checked = applicationFlow.answers[questionIndex] === option;
        radio.dataset.applicationAnswer = String(questionIndex);
        const text = document.createElement('span');
        text.textContent = option;
        label.append(radio, text);
        fieldset.append(label);
      });
      form.append(fieldset);
    });
    applicationFlowRoot.append(form);
    addText(applicationFlowRoot, 'p', 'application-demo-note', 'Odpowiedzi są przykładowe i zostaną zapisane tylko w tej przeglądarce.');
    addFlowError();
    const actions = addFlowActions();
    makeFlowButton(actions, 'Wstecz', 'is-secondary', 'applicationBack', 'cv');
    makeFlowButton(actions, 'Dalej', 'is-primary', 'applicationNext', 'interest');
  };
  const renderAiOptIn = () => {
    addFlowHeader(3, 'Czy chcesz skorzystać z opcji AI?', 'To dobrowolny dodatek. Jeśli go pominiesz, aplikacja zostanie złożona z CV i odpowiedzi na pięć pytań.');
    renderFlowStepPills(3);
    const panel = document.createElement('section');
    panel.className = 'application-ai-optin-panel';
    const label = document.createElement('label');
    label.className = 'application-ai-optin';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = Boolean(applicationFlow.aiInterviewConsent);
    checkbox.dataset.aiOptin = '';
    const copy = document.createElement('span');
    addText(copy, 'strong', '', 'Tak, chcę odpowiedzieć na 3 pytania wygenerowane przez AI');
    addText(copy, 'small', '', 'Odpowiem tekstem albo głosowo. Na każdą odpowiedź mam 3 minuty.');
    label.append(checkbox, copy);
    panel.append(label);
    addText(panel, 'p', 'application-ai-disclosure', 'Po wybraniu tej opcji do OpenAI wyślemy opis, doświadczenie, projekty i umiejętności z demonstracyjnego profilu oraz treść oferty, aby przygotować pytania. Nagrania wyślemy do transkrypcji, a odpowiedzi do krótkiego podsumowania dla rekrutera. Załączony PDF nie jest odczytywany.');
    addText(panel, 'p', 'application-ai-disclosure', 'Pytania, odpowiedzi, transkrypcje i nagrania są widoczne tylko w tej przeglądarce. Konto rekrutera jest demonstracyjne; zgłoszenie nie trafia do pracodawcy. Po wysłaniu zapytania do OpenAI nie można cofnąć tego przetwarzania.');
    applicationFlowRoot.append(panel);
    addFlowError();
    const actions = addFlowActions();
    makeFlowButton(actions, 'Wstecz', 'is-secondary', 'applicationBack', 'questions');
    makeFlowButton(actions, 'Złóż aplikację bez AI', 'is-secondary', 'aiChoiceSubmit');
    const generate = makeFlowButton(actions, 'Wygeneruj 3 pytania AI', 'is-primary', 'aiGenerateQuestions');
    generate.disabled = !applicationFlow.aiInterviewConsent || applicationFlow.generatingQuestions;
    if (applicationFlow.generatingQuestions) generate.textContent = 'Generujemy pytania…';
  };
  const renderAiExpansion = () => {
    const index = applicationFlow.aiQuestionIndex;
    const answer = applicationFlow.aiAnswers[index];
    const question = applicationFlow.aiQuestions[index];
    addFlowHeader(3, 'Odpowiedz na pytania o Twoje doświadczenie', 'Możesz mówić albo pisać. Każde pytanie ma osobny limit 3 minut.');
    renderFlowStepPills(3);
    const response = document.createElement('section');
    response.className = 'application-timed-response';
    response.setAttribute('aria-labelledby', 'application-current-question');
    const questionPosition = addText(response, 'p', 'application-question-position', `Pytanie ${index + 1} z ${applicationFlow.aiQuestions.length}`);
    questionPosition.setAttribute('aria-live', 'polite');
    const questionHeading = addText(response, 'h3', 'application-interview-question', question);
    questionHeading.id = 'application-current-question';
    const timerLine = document.createElement('div');
    timerLine.className = 'application-timer-line';
    addText(timerLine, 'span', '', 'Pozostały czas');
    const timer = addText(timerLine, 'output', 'application-countdown', applicationFlow.timerEndsAt ? '03:00' : '03:00');
    timer.dataset.aiTimer = '';
    timer.setAttribute('aria-live', 'off');
    response.append(timerLine);
    const recordButton = makeFlowButton(response, answer.recording ? 'Zatrzymaj nagranie' : answer.audioBlob ? 'Nagraj odpowiedź ponownie' : 'Nagraj odpowiedź', 'is-secondary application-record-button', 'toggleRecording');
    recordButton.disabled = answer.transcribing || applicationFlow.questionExpired;
    if (!('MediaRecorder' in window) || !navigator.mediaDevices?.getUserMedia) {
      recordButton.disabled = true;
      recordButton.title = 'Ta przeglądarka nie udostępnia nagrywania. Możesz wpisać odpowiedź.';
    }
    if (answer.audioBlob) addText(response, 'p', 'application-recording-status', 'Nagranie jest gotowe. Po wysłaniu aplikacji będzie dostępne w demonstracyjnym widoku rekrutera.');
    if (answer.transcribing) addText(response, 'p', 'application-recording-status', 'Tworzymy transkrypcję nagrania…');
    if (answer.transcriptionError) addText(response, 'p', 'application-recording-error', answer.transcriptionError);
    const prompt = addText(response, 'label', 'application-response-label', answer.transcript ? 'Transkrypcja nagrania — możesz ją poprawić przed wysłaniem' : 'Odpowiedź tekstowa');
    const textarea = document.createElement('textarea');
    textarea.rows = 5;
    textarea.maxLength = 4000;
    textarea.placeholder = 'Wpisz odpowiedź albo nagraj ją przyciskiem powyżej.';
    textarea.value = answer.answer;
    textarea.disabled = answer.recording || answer.transcribing || applicationFlow.questionExpired;
    textarea.dataset.aiAnswer = String(index);
    prompt.append(textarea);
    addText(response, 'p', 'application-response-hint', applicationFlow.questionExpired ? 'Limit czasu minął. Możesz jeszcze sprawdzić i poprawić transkrypcję w podsumowaniu odpowiedzi.' : 'Po upływie 3 minut nagranie zostanie zatrzymane i przejdziesz do kolejnego pytania.');
    applicationFlowRoot.append(response);
    addFlowError();
    const actions = addFlowActions();
    const save = makeFlowButton(actions, index === applicationFlow.aiQuestions.length - 1 ? 'Przejdź do sprawdzenia odpowiedzi' : 'Zapisz odpowiedź i dalej', 'is-primary', 'aiNextQuestion');
    save.disabled = answer.recording || answer.transcribing || applicationFlow.questionExpired;
  };
  const renderAiReview = () => {
    addFlowHeader(3, 'Sprawdź odpowiedzi przed wysłaniem', 'Możesz poprawić tekst i transkrypcje. Rekruter zobaczy oryginalną transkrypcję, Twoją wersję odpowiedzi oraz krótkie podsumowanie AI.');
    renderFlowStepPills(3);
    const list = document.createElement('div');
    list.className = 'application-interview-review-list';
    applicationFlow.aiQuestions.forEach((question, index) => {
      const answer = applicationFlow.aiAnswers[index];
      const item = document.createElement('section');
      item.className = 'application-interview-review-card';
      addText(item, 'p', 'application-question-position', `Pytanie ${index + 1}`);
      addText(item, 'h3', 'application-interview-question', question);
      const label = addText(item, 'label', 'application-response-label', 'Twoja odpowiedź');
      const textarea = document.createElement('textarea');
      textarea.rows = 4;
      textarea.maxLength = 4000;
      textarea.required = true;
      textarea.disabled = applicationFlow.submitting;
      textarea.value = answer.answer;
      textarea.dataset.aiReviewAnswer = String(index);
      label.append(textarea);
      if (answer.transcript) {
        const details = document.createElement('details');
        addText(details, 'summary', '', 'Pokaż oryginalną transkrypcję OpenAI');
        addText(details, 'p', 'application-original-transcript', answer.transcript);
        item.append(details);
      }
      if (answer.audioBlob) addText(item, 'p', 'application-recording-status', 'Do odpowiedzi dołączono nagranie głosowe.');
      list.append(item);
    });
    applicationFlowRoot.append(list);
    addText(applicationFlowRoot, 'p', 'application-ai-disclosure', 'Po kliknięciu „Złóż aplikację” odpowiedzi zostaną zapisane w tej przeglądarce, a OpenAI przygotuje krótkie podsumowanie dla rekrutera. Podsumowanie nie ocenia kandydata ani nie rekomenduje decyzji.');
    const error = addFlowError();
    if (applicationFlow.summaryFailure) error.textContent = `${applicationFlow.summaryFailure} Możesz spróbować ponownie albo wysłać aplikację bez podsumowania AI.`;
    if (applicationFlow.audioSaveFailure) error.textContent = 'Nie udało się zapisać nagrań w tej przeglądarce. Spróbuj ponownie albo wyślij odpowiedzi bez nagrań.';
    const actions = addFlowActions();
    makeFlowButton(actions, 'Anuluj', 'is-secondary', 'closeApplication');
    const submit = makeFlowButton(actions, applicationFlow.submitting ? 'Zapisujemy aplikację…' : 'Złóż aplikację i wygeneruj podsumowanie', 'is-primary', 'aiSubmit');
    submit.disabled = applicationFlow.submitting;
    if (applicationFlow.summaryFailure) makeFlowButton(actions, 'Złóż bez podsumowania AI', 'is-secondary', 'aiSubmitWithoutSummary');
    if (applicationFlow.audioSaveFailure) makeFlowButton(actions, 'Złóż bez nagrań', 'is-secondary', 'aiSubmitWithoutAudio');
  };
  const renderApplicationSuccess = () => {
    addText(applicationFlowRoot, 'div', 'eyebrow', 'Aplikacja · gotowe');
    const title = addText(applicationFlowRoot, 'h2', 'application-flow-title', 'Zgłoszenie przebiegło pomyślnie.');
    title.id = 'application-flow-title';
    title.tabIndex = -1;
    addText(applicationFlowRoot, 'p', 'application-flow-copy', `${applicationFlow.jobTitle} · ${applicationFlow.company}`);
    const confirmation = document.createElement('div');
    confirmation.className = 'application-success-panel';
    addText(confirmation, 'strong', '', 'Aplikacja jest zapisana na Twoim profilu.');
    addText(confirmation, 'p', '', applicationFlow.aiInterviewUsed
      ? 'To wersja demonstracyjna: zgłoszenie, odpowiedzi, transkrypcje i nagrania są zapisane tylko w tej przeglądarce. Za zgodą wysłano kontekst i odpowiedzi do OpenAI; nie wysłano ich do pracodawcy.'
      : 'To wersja demonstracyjna: zgłoszenie, odpowiedzi i status są zapisane tylko w tej przeglądarce. Nie wysłano ich do pracodawcy.');
    applicationFlowRoot.append(confirmation);
    const actions = addFlowActions();
    makeFlowButton(actions, 'Wróć do mojego profilu', 'is-primary', 'applicationGoProfile');
  };
  const renderApplicationFlow = () => {
    if (!applicationFlowRoot || !applicationFlow) return;
    applicationFlowRoot.replaceChildren();
    const profile = getCurrentProfile();
    if (!profile) return;
    if (applicationFlow.stage === 'success') return renderApplicationSuccess();
    if (applicationFlow.stage === 'cv') return renderCvStep(profile);
    if (applicationFlow.stage === 'questions') return renderQuestionsStep(profile);
    if (applicationFlow.stage === 'ai-opt-in') return renderAiOptIn();
    if (applicationFlow.stage === 'ai') return renderAiExpansion();
    if (applicationFlow.stage === 'ai-review') return renderAiReview();
  };
  const startApplicationFlow = jobId => {
    const profile = getCurrentProfile();
    const card = [...document.querySelectorAll('[data-job-card]')].find(item => item.dataset.jobId === jobId);
    if (!profile) {
      window.location.assign(`zaloguj.html?next=role.html&job=${encodeURIComponent(jobId)}`);
      return;
    }
    if (!applicationDialog || !applicationFlowRoot || !card) {
      showToast('Nie udało się otworzyć aplikacji. Wróć do katalogu ofert i spróbuj ponownie.');
      return;
    }
    if (getApplications().some(item => item.profileId === profile.id && item.jobId === jobId)) {
      showToast('Masz już zapisaną aplikację na tę ofertę. Możesz sprawdzić jej status w swoim profilu.');
      return;
    }
    applicationFlow = {
      profileId: profile.id,
      jobId,
      jobTitle: card.dataset.jobTitle,
      company: card.dataset.jobCompany,
      stage: 'cv',
      answers: Array(applicationQuestions.length).fill(''),
      cvAttachment: getCvAttachment(profile.id),
      aiInterviewConsent: false,
      generatingQuestions: false,
      aiQuestions: [],
      aiQuestionIndex: 0,
      aiAnswers: [],
      questionExpired: false,
      advanceAfterTranscription: false,
      timerEndsAt: 0,
      submitting: false,
      summaryFailure: '',
      audioSaveFailure: false
    };
    renderApplicationFlow();
    if (!applicationDialog.open) applicationDialog.showModal();
    applicationFlowRoot?.querySelector('.application-flow-title')?.focus();
  };
  const updateApplicationTimer = () => {
    if (!applicationFlow || applicationFlow.stage !== 'ai' || !applicationFlow.timerEndsAt) return;
    const remaining = Math.max(0, Math.ceil((applicationFlow.timerEndsAt - Date.now()) / 1000));
    const output = applicationFlowRoot?.querySelector('[data-ai-timer]');
    if (output) output.textContent = formatCountdown(remaining);
    if (remaining === 0) expireInterviewQuestion();
  };
  const startApplicationTimer = () => {
    if (!applicationFlow || applicationFlow.stage !== 'ai') return;
    if (!applicationFlow.timerEndsAt) applicationFlow.timerEndsAt = Date.now() + 180_000;
    if (!applicationTimer) applicationTimer = window.setInterval(updateApplicationTimer, 250);
    updateApplicationTimer();
  };
  const finishApplication = async options => {
    if (!applicationFlow) return;
    stopApplicationTimer();
    const flow = applicationFlow;
    const profile = getCurrentProfile();
    if (!profile) return closeApplicationFlow();
    const applications = getApplications();
    if (applications.some(item => item.profileId === profile.id && item.jobId === flow.jobId)) {
      flow.stage = 'success';
      renderApplicationFlow();
      return;
    }
    const aiInterviewUsed = Boolean(flow.aiInterviewConsent && flow.aiQuestions.length === 3);
    if (aiInterviewUsed && !options?.withoutAudio && flow.aiAnswers.some(answer => !answer.answer.trim())) {
      const error = applicationFlowRoot?.querySelector('[data-application-error]');
      if (error) error.textContent = 'Uzupełnij odpowiedzi na wszystkie trzy pytania przed wysłaniem.';
      applicationFlowRoot?.querySelector('[data-ai-review-answer]:invalid')?.focus();
      flow.submitting = false;
      return;
    }
    flow.submitting = true;
    flow.summaryFailure = '';
    flow.audioSaveFailure = false;
    renderApplicationFlow();
    let summary = options?.withoutSummary ? null : flow.aiSummary || null;
    if (aiInterviewUsed && !options?.withoutSummary && !summary) {
      try {
        summary = await generateInterviewSummary(flow);
        flow.aiSummary = summary;
      } catch (error) {
        if (applicationFlow !== flow) return;
        flow.submitting = false;
        flow.summaryFailure = error instanceof Error ? error.message : 'Nie udało się wygenerować podsumowania.';
        renderApplicationFlow();
        applicationFlowRoot?.querySelector('[data-application-error]')?.focus();
        return;
      }
    }
    if (applicationFlow !== flow) return;

    const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const interviewAnswers = [];
    if (aiInterviewUsed) {
      const storedAudioKeys = [];
      try {
        for (let index = 0; index < flow.aiQuestions.length; index++) {
          const answer = flow.aiAnswers[index];
          const audioKey = answer.audioBlob && !options?.withoutAudio ? `${id}:${index}` : null;
          if (audioKey) {
            await storeInterviewAudio(audioKey, answer.audioBlob);
            storedAudioKeys.push(audioKey);
          }
          interviewAnswers.push({
            question: flow.aiQuestions[index],
            transcript: answer.transcript || null,
            answer: answer.answer.trim(),
            inputMethod: answer.audioBlob ? 'voice' : 'text',
            audioKey
          });
        }
      } catch {
        await Promise.all(storedAudioKeys.map(key => deleteInterviewAudio(key).catch(() => {})));
        if (applicationFlow !== flow) return;
        flow.submitting = false;
        flow.audioSaveFailure = true;
        renderApplicationFlow();
        applicationFlowRoot?.querySelector('[data-application-error]')?.focus();
        return;
      }
    }
    if (applicationFlow !== flow) return;

    const submittedAt = new Date().toISOString();
    const item = {
      id,
      profileId: flow.profileId,
      jobId: flow.jobId,
      jobTitle: flow.jobTitle,
      company: flow.company,
      submittedAt,
      status: 'submitted',
      processStage: 'submitted',
      processEvents: [{ stage: 'submitted', changedAt: submittedAt, actor: 'candidate' }],
      cvFileName: getCvAttachment(profile.id)?.name || null,
      answers: flow.answers.map((answer, index) => ({ question: applicationQuestions[index].question, answer })),
      aiInterview: aiInterviewUsed ? {
        answers: interviewAnswers,
        summary,
        summaryGeneratedAt: summary ? new Date().toISOString() : null,
        summaryModel: summary ? 'gpt-5-mini' : null
      } : null
    };
    applications.push(item);
    writeJSON(keys.applications, applications);
    updateApplicationButtons();
    updateAccountOverview();
    flow.stage = 'success';
    flow.aiInterviewUsed = aiInterviewUsed;
    flow.submitting = false;
    renderApplicationFlow();
    applicationFlowRoot?.querySelector('[data-application-go-profile]')?.focus();
  };
  const updateApplicationButtons = () => {
    const current = getCurrentProfile();
    const applications = getApplications();
    document.querySelectorAll('[data-job-card]').forEach(card => {
      const application = current && applications.find(item => item.profileId === current.id && item.jobId === card.dataset.jobId);
      const button = card.querySelector('[data-apply-job]');
      const state = card.querySelector('[data-application-state]');
      if (!button) return;
      button.disabled = Boolean(application);
      const stage = application ? getApplicationProcessStage(application) : null;
      const buttonLabel = stage === 'withdrawn' ? 'Aplikacja wycofana' : stage === 'rejected' ? 'Aplikacja odrzucona' : stage === 'accepted' ? 'Decyzja pozytywna' : 'Aplikacja złożona';
      button.innerHTML = application ? `${buttonLabel} <span aria-hidden="true">${stage === 'rejected' ? '×' : stage === 'accepted' ? '✓' : '·'}</span>` : 'Aplikuj do oferty <span aria-hidden="true">↗</span>';
      if (state) state.textContent = application ? `${processStageLabels[stage]} · profil ${current.name}` : current ? '' : 'Zaloguj się jako kandydat, aby aplikować';
    });
  };

  const allowedNextPages = ['start.html','role.html','konto.html','aplikacje.html','dane.html','cv.html','dopasowanie.html','o-portalu.html','faq.html','rekruter.html','rekruter-utworz.html','rekruter-oferty.html'];
  const isValidDemoJobId = id => typeof id === 'string' && (/^pub-\d{6}$/.test(id) || /^rec-[a-z0-9-]{8,64}$/i.test(id));
  const completeLogin = profileId => {
    setSession(profileId);
    updateLoginUI();
    updateApplicationButtons();
    updateAccountOverview();
    const params = new URLSearchParams(window.location.search);
    const requested = (params.get('next') || 'konto.html').split(/[?#]/)[0];
    const next = allowedNextPages.includes(requested) ? requested : 'konto.html';
    const jobId = params.get('job');
    const target = isValidDemoJobId(jobId) ? `role.html?apply=${encodeURIComponent(jobId)}` : next;
    window.location.assign(target);
  };
  const completeRecruiterLogin = () => {
    setRecruiterSession();
    const requested = new URLSearchParams(window.location.search).get('next') || 'rekruter.html';
    const next = ['rekruter.html', 'rekruter-utworz.html', 'rekruter-oferty.html'].includes(requested.split(/[?#]/)[0]) ? requested.split(/[?#]/)[0] : 'rekruter.html';
    window.location.assign(next);
  };

  document.addEventListener('click', event => {
    const resetRecruiterFilters = event.target.closest('[data-recruiter-filter-reset]');
    if (resetRecruiterFilters) {
      const form = resetRecruiterFilters.closest('[data-recruiter-filters]');
      form?.querySelectorAll('[data-recruiter-filter]').forEach(control => { control.value = ''; });
      renderRecruiterApplications();
      form?.querySelector('[data-recruiter-filter="query"]')?.focus();
      return;
    }
    const processAction = event.target.closest('[data-process-application][data-process-stage]');
    if (processAction) {
      const stage = processAction.dataset.processStage;
      if (stage === 'rejected' && !window.confirm('Odrzucić tę aplikację? Zmiana będzie widoczna na profilu kandydata w tej przeglądarce.')) return;
      updateRecruiterApplicationStage(processAction.dataset.processApplication, stage);
      return;
    }
    const recruiterButton = event.target.closest('[data-login-recruiter]');
    if (recruiterButton) {
      completeRecruiterLogin();
      return;
    }
    const profileButton = event.target.closest('[data-login-profile]');
    if (profileButton) {
      completeLogin(profileButton.dataset.loginProfile);
      return;
    }
    const applyButton = event.target.closest('[data-apply-job]');
    if (applyButton) {
      startApplicationFlow(applyButton.dataset.applyJob);
      return;
    }
    if (event.target.closest('[data-close-application]')) {
      closeApplicationFlow();
      return;
    }
    const next = event.target.closest('[data-application-next]');
    if (next && applicationFlow) {
      if (next.dataset.applicationNext === 'questions') {
        applicationFlow.stage = 'questions';
        renderApplicationFlow();
        applicationFlowRoot?.querySelector('.application-flow-title')?.focus();
      } else if (next.dataset.applicationNext === 'interest') {
        const unanswered = applicationFlow.answers.findIndex(answer => !answer);
        if (unanswered !== -1) {
          const error = applicationFlowRoot?.querySelector('[data-application-error]');
          if (error) error.textContent = 'Odpowiedz na wszystkie pięć pytań, aby przejść dalej.';
          applicationFlowRoot?.querySelector(`[data-application-answer="${unanswered}"]`)?.focus();
          return;
        }
        applicationFlow.stage = 'ai-opt-in';
        renderApplicationFlow();
        applicationFlowRoot?.querySelector('.application-flow-title')?.focus();
      }
      return;
    }
    const back = event.target.closest('[data-application-back]');
    if (back && applicationFlow) {
      applicationFlow.stage = back.dataset.applicationBack;
      renderApplicationFlow();
      applicationFlowRoot?.querySelector('.application-flow-title')?.focus();
      return;
    }
    const aiChoiceSubmit = event.target.closest('[data-ai-choice-submit]');
    if (aiChoiceSubmit && applicationFlow) {
      applicationFlow.aiInterviewConsent = false;
      finishApplication();
      return;
    }
    const generateInterview = event.target.closest('[data-ai-generate-questions]');
    if (generateInterview && applicationFlow && applicationFlow.aiInterviewConsent && !applicationFlow.generatingQuestions) {
      const flow = applicationFlow;
      flow.generatingQuestions = true;
      renderApplicationFlow();
      generateInterviewQuestions(flow).then(questions => {
        if (applicationFlow !== flow) return;
        flow.aiQuestions = questions;
        flow.aiAnswers = questions.map(() => ({ answer: '', transcript: '', audioBlob: null, recording: false, transcribing: false, transcriptionError: '' }));
        flow.aiQuestionIndex = 0;
        flow.timerEndsAt = Date.now() + 180_000;
        flow.questionExpired = false;
        flow.stage = 'ai';
        flow.generatingQuestions = false;
        renderApplicationFlow();
        applicationFlowRoot?.querySelector('[data-ai-answer]')?.focus();
        startApplicationTimer();
      }).catch(error => {
        if (applicationFlow !== flow) return;
        flow.generatingQuestions = false;
        const message = error instanceof Error ? error.message : 'Nie udało się wygenerować pytań.';
        renderApplicationFlow();
        const errorNode = applicationFlowRoot?.querySelector('[data-application-error]');
        if (errorNode) {
          errorNode.textContent = `${message} Możesz spróbować ponownie albo złożyć aplikację bez AI.`;
          errorNode.focus();
        }
      });
      return;
    }
    if (event.target.closest('[data-toggle-recording]')) {
      if (activeInterviewRecorder) stopInterviewRecording();
      else startInterviewRecording();
      return;
    }
    if (event.target.closest('[data-ai-next-question]') && applicationFlow?.stage === 'ai') {
      const answer = applicationFlow.aiAnswers[applicationFlow.aiQuestionIndex];
      if (!answer.recording && !answer.transcribing) advanceInterviewQuestion();
      return;
    }
    if (event.target.closest('[data-ai-submit]')) {
      if (!applicationFlow || applicationFlow.submitting) return;
      const missing = applicationFlow.aiAnswers.findIndex(answer => !answer.answer.trim());
      if (missing !== -1) {
        const error = applicationFlowRoot?.querySelector('[data-application-error]');
        if (error) error.textContent = 'Uzupełnij odpowiedzi na wszystkie trzy pytania.';
        applicationFlowRoot?.querySelector(`[data-ai-review-answer="${missing}"]`)?.focus();
      } else finishApplication();
      return;
    }
    if (event.target.closest('[data-ai-submit-without-summary]')) {
      if (applicationFlow && !applicationFlow.submitting) finishApplication({ withoutSummary: true });
      return;
    }
    if (event.target.closest('[data-ai-submit-without-audio]')) {
      if (applicationFlow && !applicationFlow.submitting) finishApplication({ withoutAudio: true });
      return;
    }
    if (event.target.closest('[data-application-go-profile]')) {
      closeApplicationFlow();
      window.location.assign('aplikacje.html');
      return;
    }
    const withdraw = event.target.closest('[data-withdraw-application]');
    if (withdraw) {
      const applicationId = withdraw.dataset.withdrawApplication;
      if (!window.confirm('Czy chcesz anulować tę aplikację? W wersji demonstracyjnej zostanie oznaczona jako wycofana tylko w tej przeglądarce.')) return;
      const withdrawnAt = new Date().toISOString();
      const applications = getApplications().map(item => item.id === applicationId ? {
        ...item,
        status: 'withdrawn',
        processStage: 'withdrawn',
        withdrawnAt,
        processEvents: [...(Array.isArray(item.processEvents) ? item.processEvents : []), { stage: 'withdrawn', changedAt: withdrawnAt, actor: 'candidate' }]
      } : item);
      writeJSON(keys.applications, applications);
      updateApplicationButtons();
      updateAccountOverview();
      showToast('Aplikacja została oznaczona jako wycofana w tej przeglądarce.');
      return;
    }
    const removeInterview = event.target.closest('[data-delete-ai-materials]');
    if (removeInterview) {
      const applicationId = removeInterview.dataset.deleteAiMaterials;
      const application = getApplications().find(item => item.id === applicationId);
      if (!application?.aiInterview) return;
      if (!window.confirm('Usunąć nagrania, transkrypcje, odpowiedzi i podsumowanie AI z tej przeglądarki? Aplikacja pozostanie na profilu.')) return;
      removeInterview.disabled = true;
      const audioKeys = application.aiInterview.answers.map(item => item.audioKey).filter(Boolean);
      Promise.all(audioKeys.map(key => deleteInterviewAudio(key))).then(() => {
        const applications = getApplications().map(item => {
          if (item.id !== applicationId) return item;
          const next = { ...item };
          delete next.aiInterview;
          return next;
        });
        writeJSON(keys.applications, applications);
        renderRecruiterInbox();
        updateAccountOverview();
        showToast('Usunięto materiały rozmowy AI z tej przeglądarki.');
      }).catch(() => {
        removeInterview.disabled = false;
        showToast('Nie udało się usunąć wszystkich nagrań. Spróbuj ponownie.');
      });
      return;
    }
    const removeCv = event.target.closest('[data-remove-profile-cv]');
    if (removeCv) {
      const profile = getCurrentProfile();
      if (!profile) return;
      removeCvAttachment(profile.id);
      updateAccountOverview();
      showToast('Usunięto nazwę pliku CV z demonstracyjnego profilu.');
      return;
    }
    const logoutControl = event.target.closest('[data-demo-logout]');
    if (logoutControl) {
      event.preventDefault();
      remove(keys.session);
      updateLoginUI();
      updateApplicationButtons();
      renderLoginProfiles();
      updateAccountOverview();
      renderRecruiterWorkspace();
      showToast('Wylogowano z profilu testowego.');
    }
  });
  document.addEventListener('submit', event => {
    const filterForm = event.target.closest('[data-recruiter-filters]');
    if (filterForm) {
      event.preventDefault();
      renderRecruiterApplications();
      return;
    }
    const form = event.target.closest('[data-recruiter-job-form]');
    if (!form) return;
    event.preventDefault();
    if (!getCurrentRecruiter()) {
      renderRecruiterWorkspace();
      return;
    }
    const fields = new FormData(form);
    const value = name => String(fields.get(name) || '').trim();
    const title = value('title');
    const company = value('company');
    const direction = value('direction');
    const city = value('city');
    const mode = value('mode');
    const contract = value('contract');
    const summary = value('summary');
    const salaryMinInput = value('salaryMin');
    const salaryMaxInput = value('salaryMax');
    const salaryMin = salaryMinInput ? Number(salaryMinInput) : null;
    const salaryMax = salaryMaxInput ? Number(salaryMaxInput) : null;
    const error = form.querySelector('[data-recruiter-job-error]');
    if (error) error.textContent = '';
    if (!title || !company || !direction || !city || !mode || !contract || !summary) return;
    if ((salaryMin === null) !== (salaryMax === null) || (salaryMin !== null && (!Number.isFinite(salaryMin) || !Number.isFinite(salaryMax) || salaryMin < 0 || salaryMax < salaryMin))) {
      if (error) error.textContent = 'Podaj obie kwoty wynagrodzenia albo pozostaw oba pola puste. Kwota maksymalna nie może być niższa od minimalnej.';
      form.querySelector('[name="salaryMin"]')?.focus();
      return;
    }
    const now = new Date();
    const idSuffix = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    const directionCategory = direction === 'engineering_data' ? 'Build' : direction === 'product' ? 'Lead' : 'Apply';
    const job = {
      id: `rec-${idSuffix}`,
      category: directionCategory,
      direction,
      seniority: value('seniority'),
      company,
      city,
      mode,
      contract,
      salaryMin,
      salaryMax,
      salaryBasis: contract === 'B2B' ? 'net_invoice' : 'gross_employment',
      publishedAt: now.toISOString().slice(0, 10),
      title,
      summary,
      responsibility: value('responsibility') || summary,
      mandate: 'Zakres zadań jest uzgadniany z zespołem rekrutacyjnym.',
      team: `${company} · dane i zespół demonstracyjne.`,
      process: 'Weryfikacja zgłoszenia, rozmowa rekrutacyjna i decyzja.'
    };
    writeJSON(keys.jobs, [job, ...getRecruiterJobs()]);
    form.reset();
    if (error) error.textContent = '';
    renderRecruiterWorkspace();
    showToast('Oferta została opublikowana i pojawi się w katalogu kandydatów.');
  });
  document.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('[data-recruiter-filter="offer"], [data-recruiter-filter="status"]')) {
      renderRecruiterApplications();
      return;
    }
    const profile = getCurrentProfile();
    if (target.matches('[data-profile-cv-upload], [data-application-cv-upload]')) {
      if (!profile || !target.files?.[0]) return;
      const error = saveCvAttachment(profile.id, target.files[0]);
      if (error) {
        const status = document.querySelector('[data-profile-cv-status]');
        const flowError = applicationFlowRoot?.querySelector('[data-application-error]');
        if (status) status.textContent = error;
        if (flowError) flowError.textContent = error;
        target.value = '';
        return;
      }
      if (applicationFlow && target.matches('[data-application-cv-upload]')) {
        applicationFlow.cvAttachment = getCvAttachment(profile.id);
        renderApplicationFlow();
      } else updateAccountOverview();
      showToast('CV testowe dodano do profilu. Zapisano tylko nazwę pliku.');
      return;
    }
    if (target.matches('[data-application-answer]') && applicationFlow) {
      applicationFlow.answers[Number(target.dataset.applicationAnswer)] = target.value;
      return;
    }
    if (target.matches('[data-ai-optin]') && applicationFlow) {
      applicationFlow.aiInterviewConsent = target.checked;
      renderApplicationFlow();
      applicationFlowRoot?.querySelector('[data-ai-optin]')?.focus();
    }
  });
  document.addEventListener('input', event => {
    if (event.target.matches('[data-recruiter-filter="query"]')) {
      renderRecruiterApplications();
      return;
    }
    if (event.target.matches('[data-recruiter-summary]')) {
      const applicationId = event.target.dataset.recruiterSummary;
      const applications = getApplications().map(item => item.id === applicationId && item.aiInterview
        ? { ...item, aiInterview: { ...item.aiInterview, summary: event.target.value } }
        : item);
      writeJSON(keys.applications, applications);
      return;
    }
    if (!applicationFlow) return;
    if (event.target.matches('[data-ai-answer]')) {
      const answer = applicationFlow.aiAnswers[Number(event.target.dataset.aiAnswer)];
      if (answer) answer.answer = event.target.value;
      return;
    }
    if (event.target.matches('[data-ai-review-answer]')) {
      const answer = applicationFlow.aiAnswers[Number(event.target.dataset.aiReviewAnswer)];
      if (answer) {
        answer.answer = event.target.value;
        applicationFlow.aiSummary = null;
      }
    }
  });
  applicationDialog?.addEventListener('close', () => {
    stopApplicationTimer();
    if (applicationFlow) applicationFlow.cancelled = true;
    if (activeInterviewRecorder && activeInterviewRecorder.state !== 'inactive') activeInterviewRecorder.stop();
    activeInterviewStream?.getTracks().forEach(track => track.stop());
    activeInterviewRecorder = null;
    activeInterviewStream = null;
    applicationFlow = null;
  });

  const offerTabs = [...document.querySelectorAll('[data-offer-tab]')];
  const offerPanels = [...document.querySelectorAll('.offer-panel[role="tabpanel"]')];
  const offerCards = [...document.querySelectorAll('.offer-card')];
  const offerCardIsVisible = card => {
    const panel = card.closest('.offer-panel');
    return !panel || !panel.hidden;
  };
  const revealCards = () => offerCards.forEach(card => {
    if (offerCardIsVisible(card) && card.getBoundingClientRect().top < window.innerHeight * .92) card.classList.add('is-revealed');
  });
  const selectOfferTab = (tab, moveFocus = false) => {
    offerTabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    offerPanels.forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
    if (moveFocus) tab.focus();
    window.requestAnimationFrame(revealCards);
  };
  offerTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectOfferTab(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % offerTabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + offerTabs.length) % offerTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = offerTabs.length - 1;
      else return;
      event.preventDefault();
      selectOfferTab(offerTabs[next], true);
    });
  });

  const pointerCanHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.querySelectorAll('.career-card, .offer-card').forEach(card => {
    if (!pointerCanHover) return;
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--y', `${event.clientY - rect.top}px`);
      if (card.classList.contains('offer-card')) {
        card.style.setProperty('--xp', ((event.clientX - rect.left) / rect.width).toFixed(3));
        card.style.setProperty('--spot-opacity', '.22');
        card.style.setProperty('--border-opacity', '.9');
      }
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--x', '50%');
      card.style.setProperty('--y', '50%');
      card.style.setProperty('--spot-opacity', '.14');
      card.style.setProperty('--border-opacity', '.72');
    });
  });

  const rain = document.querySelector('.data-rain');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rain) {
    const context = rain.getContext('2d');
    if (context) {
      const particles = [];
      const pointer = { x: -1000, y: -1000, active: false };
      let width = 0, height = 0, ratio = 1;
      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        ratio = Math.min(window.devicePixelRatio || 1, 2);
        rain.width = Math.round(width * ratio);
        rain.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        particles.length = 0;
        const count = Math.min(520, Math.max(180, Math.round(width * height / 2500)));
        for (let i = 0; i < count; i++) particles.push({
          x: Math.random() * width, y: Math.random() * height,
          homeX: Math.random() * width, homeY: Math.random() * height,
          vx: 0, vy: 0, radius: .65 + Math.random() * 1.35,
          phase: Math.random() * Math.PI * 2, drift: .15 + Math.random() * .4
        });
      };
      const draw = () => {
        context.clearRect(0, 0, width, height);
        for (const particle of particles) {
          particle.phase += .006 * particle.drift;
          let ax = (particle.homeX - particle.x) * .002 + Math.sin(particle.phase) * .012;
          let ay = (particle.homeY - particle.y) * .002 + .015 + Math.cos(particle.phase * .7) * .01;
          if (pointer.active && !reducedMotion) {
            const dx = particle.x - pointer.x, dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy) || .001;
            if (distance < 145) {
              const force = (1 - distance / 145) * .72;
              ax += dx / distance * force;
              ay += dy / distance * force;
            }
          }
          particle.vx = (particle.vx + ax) * .91;
          particle.vy = (particle.vy + ay) * .91;
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.y > height + 6) { particle.y = -6; particle.homeY = Math.random() * height; }
          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
          const dx = pointer.active ? particle.x - pointer.x : 9999;
          const dy = pointer.active ? particle.y - pointer.y : 9999;
          const proximity = pointer.active ? Math.max(0, 1 - Math.hypot(dx, dy) / 150) : 0;
          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius + proximity * 1.25, 0, Math.PI * 2);
          context.fillStyle = `rgba(${Math.round(78 + proximity * 65)},${Math.round(205 + proximity * 43)},255,${.28 + proximity * .68})`;
          context.shadowBlur = proximity > .12 ? 9 * proximity : 0;
          if (proximity > .12) context.shadowColor = '#56d9ff';
          context.fill();
        }
        context.shadowBlur = 0;
        if (!reducedMotion) window.requestAnimationFrame(draw);
      };
      if (pointerCanHover && !reducedMotion) {
        window.addEventListener('pointermove', event => { pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true; }, { passive: true });
        window.addEventListener('pointerleave', () => { pointer.active = false; }, { passive: true });
      }
      window.addEventListener('resize', resize, { passive: true });
      resize();
      draw();
    }
  }

  setupAccountMenu();
  updateLoginUI();
  renderLoginProfiles();
  renderJobListings();
  renderFeaturedJobListings();
  updateApplicationButtons();
  updateAccountOverview();
  renderRecruiterWorkspace();
  initializeJobFilters();
  const applyAfterLogin = new URLSearchParams(window.location.search).get('apply');
  if (isValidDemoJobId(applyAfterLogin) && getCurrentProfile()) {
    const applicationCard = [...document.querySelectorAll('[data-job-card]')].find(card => card.dataset.jobId === applyAfterLogin);
    window.history.replaceState(null, '', window.location.pathname);
    if (applicationCard) startApplicationFlow(applyAfterLogin);
    else showToast('Nie znaleziono tej oferty. Sprawdź aktualną listę ogłoszeń.');
  }
  window.addEventListener('storage', event => {
    if (![keys.session, keys.applications, keys.jobs].includes(event.key)) return;
    updateLoginUI();
    renderLoginProfiles();
    updateApplicationButtons();
    updateAccountOverview();
    if (event.key === keys.jobs && jobList) {
      renderJobListings();
      renderFeaturedJobListings();
      applyJobFilters();
    }
    renderRecruiterWorkspace();
  });
  if (reducedMotion || !('IntersectionObserver' in window)) offerCards.forEach(card => card.classList.add('is-revealed'));
  else if (offerCards.length) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && offerCardIsVisible(entry.target)) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    offerCards.forEach(card => observer.observe(card));
  }
})();
