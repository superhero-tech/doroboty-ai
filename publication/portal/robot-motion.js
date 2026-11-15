// The 7.4-second hand/button/dollar sequence is adapted from the approved saved landing.
(() => {
  const $=selector=>document.querySelector(selector);
  const clamp=value=>Math.max(0,Math.min(1,value));
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let manualOff=false;
  try { manualOff=localStorage.getItem('doroboty-portal-motion-off')==='true'; } catch {}
  let motionOff=media.matches||manualOff;
  function updateMotion(){
    motionOff=media.matches||manualOff;document.documentElement.dataset.motion=motionOff?'off':'on';
    document.querySelectorAll('.motion-toggle').forEach(button=>{button.textContent=motionOff?'Włącz ruch':'Wyłącz ruch';button.setAttribute('aria-pressed',String(motionOff));button.disabled=media.matches;});
    document.dispatchEvent(new Event('doroboty:motionchange'));
  }
  document.querySelectorAll('.motion-toggle').forEach(button=>button.addEventListener('click',()=>{manualOff=!manualOff;try{localStorage.setItem('doroboty-portal-motion-off',String(manualOff));}catch{}updateMotion();}));
  media.addEventListener('change',updateMotion);updateMotion();
// One bounded, responsive sleight-of-hand sequence. The native form stays usable.
(() => {
  const hero = $('.hero-home .dr-hero');
  const frame = $('.hero-home .dr-hero');
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
    front.innerHTML = `<g class="magic-hand" stroke="#191c25" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M-17-2Q-22 0-20 11L-14 24Q0 31 16 22L21 9Q23 0 16-4Z" fill="#f5f5f0"/><g class="magic-fingers" fill="none"></g><path d="M-9 18h16" stroke-width="2" opacity=".5"/></g><g class="magic-coin" opacity="0"><circle r="25" fill="#f5f5f0" stroke="#191c25" stroke-width="3"/><circle r="19" fill="#e9edff" stroke="#191c25" stroke-width="1"/><text x="0" y="12" text-anchor="middle" font-family="Courier New,monospace" font-size="35" font-weight="700" fill="#191c25">$</text></g><g class="magic-sparks" fill="none" stroke="#f5f5f0" stroke-width="2.5" stroke-linecap="round" opacity="0"></g>`;
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

})();
