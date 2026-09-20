/* Shared image/video lifecycle. Frame geometry belongs to each section's CSS. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),controllers=new Set();
 reduced.addEventListener('change',()=>controllers.forEach(c=>c.syncMotion()));
 window.TESIMAI_MEDIA={create(host,config,getAlt){
  let media,mediaConfig;
  function release(){if(media?.tagName==='VIDEO'){media.pause();media.removeAttribute('src');media.load();}}
  function refreshAlt(){if(media?.tagName==='IMG')media.alt=getAlt();else media?.setAttribute('aria-label',getAlt());}
  function syncMotion(){if(media?.tagName==='VIDEO'){media.autoplay=!reduced.matches;if(reduced.matches)media.pause();else media.play().catch(()=>{});}}
  function setMedia(config){release();mediaConfig={...config};host.replaceChildren();
   if(config.type==='video'){
    const poster=config.poster||'assets/card-building.png';
    host.style.background=`center / cover no-repeat url("${poster.replaceAll('"','%22')}")`;
    media=document.createElement('video');media.muted=true;media.defaultMuted=true;media.loop=true;media.playsInline=true;media.autoplay=!reduced.matches;media.preload='metadata';media.poster=poster;
    const current=media;media.addEventListener('error',()=>{current.style.visibility='hidden'});
   }else{host.style.background='';media=document.createElement('img');media.decoding='async';}
   refreshAlt();media.src=config.src;host.append(media);syncMotion();
  }
  const controller={setMedia,refreshAlt,syncMotion,get media(){return {...mediaConfig}},destroy(){controllers.delete(controller);release();}};
  controllers.add(controller);setMedia(config);return controller;
 }};
})();
