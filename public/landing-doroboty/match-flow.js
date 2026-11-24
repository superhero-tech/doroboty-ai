(() => {
  const wizard = document.querySelector('[data-match-wizard]');
  if (!wizard) return;

  const directionLabels = {
    product: 'Produkt',
    design_ux: 'Design i UX',
    marketing_content: 'Marketing i content',
    automation: 'Automatyzacja',
    engineering_data: 'Inżynieria i data',
    implementation: 'Wdrożenia'
  };
  const modeLabels = { remote: 'Zdalny', hybrid: 'Hybrydowy', office: 'Stacjonarny', any: 'Bez preferencji' };
  const levelLabels = { junior: 'Junior', mid: 'Mid', senior: 'Senior', expert: 'Expert' };
  const levelOrder = ['junior', 'mid', 'senior', 'expert'];
  const progressOrder = ['profile', 'technical', 'results'];
  const correctAnswers = {
    tech_product: 'A',
    tech_design: 'C',
    tech_marketing: 'B',
    tech_automation: 'D',
    tech_engineering: 'B',
    tech_implementation: 'C'
  };
  const relatedDirections = {
    product: 'marketing_content',
    design_ux: 'implementation',
    marketing_content: 'product',
    automation: 'engineering_data',
    engineering_data: 'automation',
    implementation: 'design_ux'
  };
  const steps = [...wizard.querySelectorAll('[data-match-step]')];
  const progressItems = [...wizard.querySelectorAll('[data-match-progress]')];
  const error = wizard.querySelector('[data-match-error]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const currentAnswers = name => wizard.querySelector(`input[name="${name}"]:checked`)?.value || '';
  const setCurrentStep = name => {
    steps.forEach(step => { step.hidden = step.dataset.matchStep !== name; });
    progressItems.forEach(item => {
      const active = item.dataset.matchProgress === name;
      const completed = progressOrder.indexOf(item.dataset.matchProgress) < progressOrder.indexOf(name);
      item.classList.toggle('is-current', active);
      item.classList.toggle('is-complete', completed);
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    error.hidden = true;
    wizard.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };
  const isComplete = (stepName, requiredNames) => {
    const panel = wizard.querySelector(`[data-match-step="${stepName}"]`);
    return requiredNames.every(name => panel.querySelector(`input[name="${name}"]:checked`));
  };
  const salaryLabel = job => job.salaryMin == null || job.salaryMax == null
    ? 'Widełki niepodane'
    : `${new Intl.NumberFormat('pl-PL').format(job.salaryMin)}–${new Intl.NumberFormat('pl-PL').format(job.salaryMax)} zł`;
  const scoreOffer = (job, profile, technical) => {
    const direction = job.direction || 'engineering_data';
    const preferenceFit = direction === profile.direction ? 28 : (relatedDirections[profile.direction] === direction ? 17 : 8);
    const jobLevel = levelOrder.indexOf(job.seniority);
    const candidateLevel = levelOrder.indexOf(profile.experience);
    const levelFit = Math.max(5, 20 - Math.abs(jobLevel - candidateLevel) * 5);
    const modeFit = profile.workMode === 'any' || profile.workMode === job.mode ? 10 : 4;
    const technicalFit = technical[direction] ? 12 : 4;
    return Math.min(100, preferenceFit + levelFit + modeFit + technicalFit + 30);
  };
  const addText = (parent, tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    parent.append(node);
    return node;
  };
  const makeResultCard = (job, score, rank) => {
    const item = document.createElement('li');
    item.className = 'match-result-item';
    const card = document.createElement('article');
    card.className = 'match-result-card';

    const header = document.createElement('div');
    header.className = 'match-result-header';
    const direction = job.direction || 'engineering_data';
    addText(header, 'span', `match-result-direction match-result-direction--${direction}`, directionLabels[direction] || directionLabels.engineering_data);
    const scoreBadge = addText(header, 'span', 'match-result-score', `${score}%`);
    scoreBadge.setAttribute('aria-label', `Matchscore ${score} procent`);
    card.append(header);

    const content = document.createElement('div');
    content.className = 'match-result-content';
    addText(content, 'span', 'match-result-rank', `Dopasowanie ${String(rank).padStart(2, '0')}`);
    addText(content, 'h4', 'match-result-title', job.title);
    addText(content, 'p', 'match-result-company', job.company);
    addText(content, 'p', 'match-result-summary', job.summary);
    card.append(content);

    const footer = document.createElement('div');
    footer.className = 'match-result-footer';
    const meta = document.createElement('ul');
    meta.className = 'match-result-meta';
    [job.city, ({ remote: 'Zdalnie', hybrid: 'Hybrydowo', office: 'Stacjonarnie' })[job.mode], job.contract].filter(Boolean).forEach(value => addText(meta, 'li', '', value));
    footer.append(meta);
    const salary = addText(footer, 'strong', 'match-result-salary', salaryLabel(job));
    if (job.salaryMin == null || job.salaryMax == null) salary.classList.add('match-result-salary--empty');
    const link = addText(footer, 'a', 'match-result-link', 'Zobacz ofertę ↗');
    link.href = `role.html?offer=${encodeURIComponent(job.id)}`;
    card.append(footer);
    item.append(card);
    return item;
  };
  const showResults = () => {
    const profile = {
      experience: currentAnswers('experience'),
      direction: currentAnswers('direction'),
      workMode: currentAnswers('workMode')
    };
    const technical = {};
    Object.entries(correctAnswers).forEach(([name, answer]) => {
      const direction = name.replace('tech_', '');
      const directionKey = ({ product: 'product', design: 'design_ux', marketing: 'marketing_content', automation: 'automation', engineering: 'engineering_data', implementation: 'implementation' })[direction];
      technical[directionKey] = currentAnswers(name) === answer;
    });
    const jobs = Array.isArray(window.demoJobsData) ? window.demoJobsData : [];
    const ranked = jobs.map(job => ({ job, score: scoreOffer(job, profile, technical) }))
      .sort((a, b) => b.score - a.score || b.job.publishedAt.localeCompare(a.job.publishedAt))
      .slice(0, 10);
    const resultList = wizard.querySelector('[data-match-results]');
    resultList.replaceChildren(...ranked.map(({ job, score }, index) => makeResultCard(job, score, index + 1)));
    const correctCount = Object.entries(correctAnswers).filter(([name, answer]) => currentAnswers(name) === answer).length;
    wizard.querySelector('[data-match-summary]').textContent = `${levelLabels[profile.experience]} · ${directionLabels[profile.direction]} · ${modeLabels[profile.workMode]} · ${correctCount}/6 trafnych odpowiedzi w teście technicznym.`;
    setCurrentStep('results');
  };

  wizard.querySelector('[data-match-next]').addEventListener('click', () => {
    if (!isComplete('profile', ['experience', 'direction', 'workMode'])) {
      error.hidden = false;
      return;
    }
    setCurrentStep('technical');
  });
  wizard.querySelector('[data-match-back]').addEventListener('click', () => setCurrentStep('profile'));
  wizard.querySelector('[data-match-show-results]').addEventListener('click', () => {
    if (!isComplete('technical', Object.keys(correctAnswers))) {
      error.hidden = false;
      return;
    }
    showResults();
  });
  wizard.querySelector('[data-match-restart]').addEventListener('click', () => {
    wizard.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = false; });
    wizard.querySelector('[data-match-results]').replaceChildren();
    setCurrentStep('profile');
  });
})();
