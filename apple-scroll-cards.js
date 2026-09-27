/* Weather-style scroll edges. No data, persistence or sync work. */
(() => {
  'use strict';
  if (!window.IntersectionObserver || !window.MutationObserver) return;
  const root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const selector='.card,.rivian-card,.rostering-board,.morning-tool-group,.whip-kpis > article';
  let cards=[],frame=0,dirty=true,printing=false;
  const visible=new Set();
  const enabled=()=>root.classList.contains('apple-design-preview')&&!root.classList.contains('apple-motion-paused')&&!reduce.matches&&!printing&&!document.hidden;
  const reset=card=>{card.style.removeProperty('--weather-cut');card.style.removeProperty('--weather-head-y');card.classList.remove('weather-collapsing');};
  const intersection=new IntersectionObserver(entries=>{
    for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else{visible.delete(entry.target);reset(entry.target);}}
    schedule();
  },{rootMargin:'100px 0px'});
  function scan(){
    const next=[...document.querySelectorAll('.content')].flatMap(content=>[...content.querySelectorAll(selector)]).filter(card=>{
      const parent=card.parentElement.closest(selector);
      // Fleet is a grid inside a panel: animate each van, not the whole grid.
      return !card.matches('.rivian-panel')&&(!parent||(card.matches('.rivian-card')&&parent.matches('.rivian-panel')))&&!card.closest('.modal,[role="dialog"],#van-parking,.parking-lot')&&!card.querySelector('table,input,textarea,[contenteditable]');
    });
    const keep=new Set(next);
    for(const card of cards)if(!keep.has(card)){intersection.unobserve(card);visible.delete(card);reset(card);card.classList.remove('weather-scroll-card');card.querySelector(':scope > .weather-card-heading')?.classList.remove('weather-card-heading');}
    for(const card of next)if(!card.classList.contains('weather-scroll-card')){
      card.classList.add('weather-scroll-card');
      const heading=[...card.children].find(child=>child.matches('.card-head,header,summary,.card-title,.kpi-top,h2,h3,.rivian-card-head'));
      if(heading)heading.classList.add('weather-card-heading');
      const background=getComputedStyle(card).backgroundColor;
      card.style.setProperty('--weather-card-surface',background==='rgba(0, 0, 0, 0)'?'#dce8ee':background);
      intersection.observe(card);
    }
    cards=next;dirty=false;
  }
  function paint(){
    frame=0;if(dirty)scan();
    if(!enabled()){cards.forEach(reset);return;}
    // Read all geometry first, then write styles. No continuous idle RAF loop.
    const measurements=[...visible].filter(card=>card.isConnected).map(card=>{
      const rect=card.getBoundingClientRect(),height=card.offsetHeight;
      const heading=card.querySelector(':scope > .weather-card-heading');
      const interactive=card.contains(document.activeElement)||card.querySelector('button[aria-expanded="true"],[role="menu"]');
      const cut=interactive?0:Math.max(0,Math.min(height,12-rect.top));
      return {card,cut,y:Math.min(cut,Math.max(0,height-(heading?.offsetHeight||0)-12))};
    });
    for(const {card,cut,y} of measurements){
      card.classList.toggle('weather-collapsing',cut>0);
      card.style.setProperty('--weather-cut',`${cut.toFixed(2)}px`);
      card.style.setProperty('--weather-head-y',`${y.toFixed(2)}px`);
    }
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
  function start(){
    const app=document.getElementById('app');if(!app)return;
    new MutationObserver(()=>{dirty=true;schedule();}).observe(app,{childList:true,subtree:true});
    new MutationObserver(schedule).observe(root,{attributes:true,attributeFilter:['class']});
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
    document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);
    document.addEventListener('visibilitychange',schedule);reduce.addEventListener('change',schedule);
    window.addEventListener('beforeprint',()=>{printing=true;cards.forEach(reset);});
    window.addEventListener('afterprint',()=>{printing=false;schedule();});
    schedule();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();

