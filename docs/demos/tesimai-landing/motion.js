/* Shared once-per-load viewport reveal. No persistent state or layout mutation. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'), compact=matchMedia('(max-width:899px)');
 const states=new Map(),ease='cubic-bezier(.22,1,.36,1)';
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>=Math.min(.2,innerHeight*.2/e.boundingClientRect.height))reveal(states.get(e.target))});
 },{threshold:[0,.05,.1,.15,.2]}):null;
 function finish(s){if(!s||s.done)return;s.entered=s.done=true;observer?.unobserve(s.section);s.animations.forEach(a=>a.cancel());s.animations=[];s.section.dataset.entrance='complete';if(s.event)s.section.dispatchEvent(new CustomEvent(s.event));}
 function reveal(s){if(!s||s.entered)return;s.entered=true;observer?.unobserve(s.section);
  if(reduced.matches||!Element.prototype.animate){finish(s);return;}
  s.section.dataset.entrance='running';
  s.animations=s.specs(compact.matches).filter(v=>v[0]).map(([el,delay,duration,translate='0 0',scale='1',fade=true])=>el.animate([
   {opacity:fade?0:1,translate,scale},{opacity:1,translate:'0 0',scale:'1'}
  ],{delay,duration,easing:ease,fill:'both'}));
  Promise.all(s.animations.map(a=>a.finished)).then(()=>finish(s)).catch(()=>{});
 }
 reduced.addEventListener('change',()=>{if(reduced.matches)states.forEach(finish)});
 compact.addEventListener('change',()=>states.forEach(s=>{if(s.entered)finish(s)}));
 window.TESIMAI_MOTION={register(section,specs,event){
  if(states.has(section))return states.get(section).dispose;
  const s={section,specs,event,entered:false,done:false,animations:[]};states.set(section,s);
  const focus=()=>finish(s);section.addEventListener('focusin',focus);section.dataset.entrance='pending';
  s.dispose=()=>{finish(s);section.removeEventListener('focusin',focus);states.delete(section)};
  if(reduced.matches||!observer)reveal(s);else observer.observe(section);
  return s.dispose;
 }};
})();
