/* Dashboard appearance and motion; no operational data changes. */
(() => {
  'use strict';
  const params = new URLSearchParams(window.location.search);


  const root = document.documentElement;
  const enabled = params.get('design') !== 'original';
  root.classList.toggle('apple-design-preview', enabled);
  let motionEnabled = params.get('motion') !== 'off';
  root.classList.toggle('apple-motion-paused', !motionEnabled);
  // Pause the tiny sync pulse while this browser tab is in the background.
  // One visibility event, not a timer or a new synchronization request.
  const updateVisibility = () => root.classList.toggle('apple-preview-background', Boolean(document.hidden));
  updateVisibility();
  document.addEventListener('visibilitychange', updateVisibility);
  const stylesheet = document.createElement('link');
  stylesheet.id = 'apple-design-styles';
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'apple-design-preview.css?v=20260914-solid-pastels-r1';
  document.head.appendChild(stylesheet);
  const scrollStyles = document.createElement('link');
  scrollStyles.rel = 'stylesheet';
  scrollStyles.href = 'apple-scroll-cards.css?v=20260920-weather-r1';
  document.head.appendChild(scrollStyles);

  // One delegated pointer listener; no timers, render loops, saves or requests.
  const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)') || {matches:false};
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)') || {matches:true};
  let hoverCard = null;
  const clearCardHover = () => {
    if (!hoverCard) return;
    hoverCard.classList.remove('apple-cursor-card');
    ['--cursor-x','--cursor-y','--cursor-rx','--cursor-ry'].forEach(key => hoverCard.style.removeProperty(key));
    hoverCard = null;
  };
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches || !motionEnabled || document.hidden || !root.classList.contains('apple-design-preview')) { clearCardHover(); return; }
    const card = event.target.closest?.('.rivian-card');
    if (card !== hoverCard) { clearCardHover(); hoverCard = card; }
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
    const y = Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
    card.style.setProperty('--cursor-x',`${x*100}%`);
    card.style.setProperty('--cursor-y',`${y*100}%`);
    card.style.setProperty('--cursor-rx',`${(0.5-y)*3}deg`);
    card.style.setProperty('--cursor-ry',`${(x-0.5)*3}deg`);
    card.classList.add('apple-cursor-card');
  }, {passive:true});
  document.addEventListener('pointerout', event => { if (hoverCard && !hoverCard.contains(event.relatedTarget)) clearCardHover(); }, {passive:true});
  document.addEventListener('visibilitychange', clearCardHover);
  window.addEventListener?.('blur', clearCardHover);
  reducedMotion.addEventListener?.('change', clearCardHover);

  // Outside #app: ordinary navigation does not recreate controls or observers.
  document.addEventListener('DOMContentLoaded', () => {
    const controls = document.createElement('div');
    controls.id = 'apple-design-controls';
    controls.setAttribute('aria-label', 'Dashboard appearance');
    const caption = document.createElement('span');
    caption.textContent = 'Appearance';
    const note = document.createElement('small');
    note.textContent = 'Visual settings only';
    const group = document.createElement('div');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Dashboard appearance');
    const buttons = [false, true].map(isApple => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = isApple ? 'V.2' : 'Original';
      button.setAttribute('aria-pressed', String(isApple === enabled));
      button.addEventListener('click', () => {
        clearCardHover();
        root.classList.toggle('apple-design-preview', isApple);
        buttons.forEach((item, index) => item.setAttribute('aria-pressed', String(Boolean(index) === isApple)));
      });
      group.appendChild(button);
      return button;
    });
    const motionButton = document.createElement('button');
    motionButton.type = 'button';
    motionButton.id = 'apple-motion-toggle';
    const updateMotion = () => {
      root.classList.toggle('apple-motion-paused', !motionEnabled);
      motionButton.textContent = motionEnabled ? 'Motion on' : 'Motion off';
      motionButton.setAttribute('aria-pressed', String(motionEnabled));
      motionButton.title = 'Turn dashboard animations on or off. Your reduced-motion setting is always respected.';
    };
    motionButton.addEventListener('click', () => {
      clearCardHover();
      motionEnabled = !motionEnabled;
      updateMotion();
    });
    updateMotion();
    group.appendChild(motionButton);
    controls.append(caption, note, group);
    document.body.prepend(controls);
  }, { once: true });
})();
