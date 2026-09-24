(() => {
  'use strict';
  const data = window.TESIMAI_CATALOG_CONTENT;
  const section = document.querySelector('.catalog');
  const track = section.querySelector('.catalog-track');
  const viewport = section.querySelector('.catalog-viewport');
  const pagination = section.querySelector('.catalog-pagination');
  const announcement = section.querySelector('.catalog-announcement');
  const compact = matchMedia('(max-width:899px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const products = data.products;
  let activeProductId = products[0].id;
  let gesture = null, suppressClick = false, suppressTimer, nudgeTimer, nudged = false;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Records and DOM are created once. Selection never reorders or replaces media.
  track.innerHTML = products.map((p,i) => `<article class="catalog-card" data-product-id="${esc(p.id)}" tabindex="0" role="button" aria-label="Select product ${i+1}: ${esc(p.name)}"><div class="catalog-image"><picture><source media="(max-width:899px)" srcset="${esc(p.mobileImage || p.image)}"><img src="${esc(p.image)}" alt="${esc(p.name)}" draggable="false"></picture></div><div class="catalog-info"><h3>${esc(p.name)}</h3><p class="catalog-subtitle">${esc(p.subtitle)}</p><p class="catalog-description">${esc(p.description)}</p></div></article>`).join('');
  pagination.innerHTML = products.map((p,i) => `<button type="button" class="catalog-dot" aria-label="Select product ${i+1}: ${esc(p.name)}" data-index="${i}"></button>`).join('');
  const cards = [...track.children], dots = [...pagination.children];
  const index = () => products.findIndex(p => p.id === activeProductId);
  function cancelNudge() { clearTimeout(nudgeTimer); viewport.classList.remove('is-nudging'); }
  function paint() {
    const current = index();
    const ui=data.ui||{select:'Select',current:'Current',open:'Open',product:'Product',of:'of'};
    section.querySelector('.catalog-label span').textContent=data.label;
    section.querySelector('.catalog-cta span').textContent=data.cta;
    viewport.setAttribute('aria-label',data.label);
    pagination.setAttribute('aria-label',ui.select+' '+ui.product);

    section.querySelector('#catalog-heading').textContent = compact.matches ? data.mobileHeading : data.desktopHeading;
    section.querySelector('.catalog-summary').textContent = data.desktopDescription;
    cards.forEach((card,i) => {
      const active = i === current, link = !!products[i].detailUrl;
      card.querySelector('h3').textContent=products[i].name;
      card.querySelector('.catalog-subtitle').textContent=products[i].subtitle;
      card.querySelector('.catalog-description').textContent=products[i].description;
      card.querySelector('img').alt=products[i].name;
      dots[i].setAttribute('aria-label',`${ui.select} ${ui.product} ${i+1}: ${products[i].name}`);
      card.classList.toggle('is-active',active);
      card.classList.toggle('is-link',active && link);
      card.setAttribute('aria-pressed',String(active));
      card.setAttribute('aria-label',`${active ? (link ? ui.open : ui.current) : ui.select} ${ui.product} ${i+1}: ${products[i].name}`);
      card.tabIndex = compact.matches && !active ? -1 : 0;
      card.inert = compact.matches && !active;
      card.setAttribute('aria-hidden',String(compact.matches && !active));
      dots[i].setAttribute('aria-current',String(active));
    });
    track.style.transform = compact.matches ? `translateX(${-current * viewport.clientWidth}px)` : '';
  }
  function select(next, notify = true) {
    next = Math.max(0,Math.min(products.length-1,next));
    cancelNudge();
    activeProductId = products[next].id;
    paint();
    if (notify) announcement.textContent = `${data.ui?.product||'Product'} ${next+1} ${data.ui?.of||'of'} ${products.length}: ${products[next].name}`;
    section.dispatchEvent(new CustomEvent('catalog:change',{bubbles:true,detail:{activeProductId}}));
  }
  function openDetail(product) {
    if (!product.detailUrl) return;
    let url;
    try { url = new URL(product.detailUrl,location.href); } catch { return; }
    if (!['http:','https:','file:'].includes(url.protocol)) return;
    const event = new CustomEvent('catalog:navigate',{bubbles:true,cancelable:true,detail:{productId:product.id,url:product.detailUrl}});
    if (section.dispatchEvent(event)) location.assign(product.detailUrl);
  }
  cards.forEach((card,i) => {
    const activate = () => { if (i !== index()) select(i); else openDetail(products[i]); };
    card.addEventListener('click',() => { if (!suppressClick) activate(); });
    card.addEventListener('keydown',e => {
      if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); activate();}
      if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) {
        e.preventDefault(); const next = e.key==='Home'?0:e.key==='End'?3:index()+(e.key==='ArrowRight'?1:-1);
        select(next); cards[index()].focus({preventScroll:true});
      }
    });
  });
  // The full pagination row is a touch zone; select the nearest original dot.
  pagination.addEventListener('click',e => {
    const button = e.target.closest('.catalog-dot');
    let next = button ? Number(button.dataset.index) : 0;
    if (!button) {
      let distance = Infinity;
      dots.forEach((dot,i) => {const r=dot.getBoundingClientRect();const d=Math.abs(e.clientX-r.x-r.width/2);if(d<distance){next=i;distance=d;}});
    }
    select(next);
  });
  viewport.addEventListener('pointerdown',e => {
    if (!compact.matches || !e.isPrimary || (e.pointerType==='mouse' && e.button!==0)) return;
    cancelNudge(); clearTimeout(suppressTimer); suppressClick=false;
    gesture={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0,axis:null};
  });
  viewport.addEventListener('pointermove',e => {
    if (!gesture || gesture.id!==e.pointerId) return;
    const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
    if (!gesture.axis && Math.max(Math.abs(dx),Math.abs(dy))>8) gesture.axis=Math.abs(dx)>Math.abs(dy)*1.2?'x':'y';
    if (gesture.axis==='y'){suppressClick=true;return;}
    if (gesture.axis!=='x') return;
    if (!viewport.hasPointerCapture(e.pointerId)) viewport.setPointerCapture(e.pointerId);
    suppressClick=true;gesture.dx=dx;
    viewport.classList.add('is-dragging');
    const edge=(index()===0&&dx>0)||(index()===3&&dx<0);
    const shift=edge?dx*.2:dx;
    track.style.transform=`translateX(${-index()*viewport.clientWidth+(reduced.matches?0:shift)}px)`;
  });
  function endGesture(e,cancelled=false) {
    if (!gesture || gesture.id!==e.pointerId) return;
    const g=gesture;gesture=null;
    if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);
    viewport.classList.remove('is-dragging');
    if(!cancelled && g.axis==='x' && Math.abs(g.dx)>=Math.min(48,viewport.clientWidth*.12))select(index()+(g.dx<0?1:-1));
    else paint();
    if(suppressClick)suppressTimer=setTimeout(()=>suppressClick=false,400);
  }
  viewport.addEventListener('pointerup',e=>endGesture(e));
  viewport.addEventListener('pointercancel',e=>endGesture(e,true));
  viewport.addEventListener('lostpointercapture',e=>{if(gesture && e.target===viewport)endGesture(e,true)});
  let contactTarget = '#contact-us';
  section.querySelector('.catalog-cta').addEventListener('click',() => {
    const target = typeof contactTarget==='function'?contactTarget():typeof contactTarget==='string'?document.querySelector(contactTarget):contactTarget;
    if (target instanceof Element) target.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});
    else section.dispatchEvent(new CustomEvent('catalog:contact-request',{bubbles:true,detail:{target:contactTarget}}));
  });
  let nudgeVisible = false;
  function scheduleNudge() {
    if(nudged || !compact.matches || reduced.matches || !nudgeVisible || ['pending','running'].includes(section.dataset.entrance))return;
    nudged=true;nudgeTimer=setTimeout(()=>{if(!gesture){viewport.classList.add('is-nudging');setTimeout(()=>viewport.classList.remove('is-nudging'),700)}},650);
  }
  const observer = new IntersectionObserver(entries=>{
    nudgeVisible=entries.some(e=>e.isIntersecting);scheduleNudge();
  },{threshold:.55});observer.observe(viewport);
  section.addEventListener('catalog:entrance-complete',scheduleNudge);
  const resize = new ResizeObserver(()=>{if(gesture){gesture=null;viewport.classList.remove('is-dragging')}paint()});resize.observe(viewport);
  compact.addEventListener('change',()=>{cancelNudge();paint()});
  reduced.addEventListener('change',cancelNudge);
  paint();
  // Integration API: configure real URLs/data in products.js; no invented destinations.
  window.TESIMAI_CATALOG = {get activeProductId(){return activeProductId},selectProduct(id){const i=products.findIndex(p=>p.id===id);if(i>=0)select(i)},setContactTarget(target){contactTarget=target},refresh:paint};
})();
