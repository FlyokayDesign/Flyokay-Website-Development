(() => {
 const section=document.querySelector('#trusted'),q=s=>section.querySelector(s),data=TESIMAI_TRUSTED_CONTENT,compact=matchMedia('(max-width:899px)');
 const copy=()=>data.locales[TESIMAI_I18N.locale]||data.locales.EN;
 let mediaController;
 function render(){const t=copy();q('.trusted-label span').textContent=t.label;q('h2').textContent=t.heading;q('.trusted-feedback').textContent=compact.matches?t.mobileFeedback:t.feedback;q('.trusted-cta span').textContent=TESIMAI.copy[TESIMAI_I18N.locale].cta;mediaController?.refreshAlt();}
 const stopLanguage=TESIMAI_I18N.register('trusted',render);compact.addEventListener('change',render);
 mediaController=TESIMAI_MEDIA.create(q('.trusted-media-content'),data.media,()=>copy().alt);
 function setMap(config){q('.trusted-map img').src=config.src;q('.trusted-map img').alt=config.alt||'';}
 setMap(data.map);
 const contact=()=>TESIMAI_SITE.requestContact();q('.trusted-cta').addEventListener('click',contact);
 const stopTarget=TESIMAI_SITE.registerTarget('trusted',()=>section);
 const stopSearch=TESIMAI_SITE.registerSearch('trusted',locale=>{const t=data.locales[locale];return [{title:t.label,desc:t.heading+' '+t.feedback,target:'trusted',section:t.label}]});
 const stopMotion=TESIMAI_MOTION.register(section,mobile=>mobile?[
 [q('.trusted-label'),0,550,'0 14px'],[q('.trusted-map'),100,700,'0 16px','.99'],[q('h2'),180,600,'0 18px'],
 [q('.trusted-media'),260,800,'0 20px'],[q('.trusted-media-settle'),260,800,'0 0','1.03',false],
 [q('.trusted-feedback'),380,600,'0 16px'],[q('.trusted-divider'),480,550,'0 0','0 1'],[q('.trusted-cta'),540,550,'0 14px']
 ]:[
 [q('.trusted-label'),0,600,'-24px 0'],[q('h2'),0,650,'28px 0'],[q('.trusted-media'),140,800,'-24px 0'],
 [q('.trusted-media-settle'),140,800,'0 0','1.03',false],[q('.trusted-cta'),140,600,'20px 0'],
 [q('.trusted-feedback'),280,600,'0 16px'],[q('.trusted-map'),280,750,'0 12px','.985'],[q('.trusted-divider'),420,550,'0 0','0 1']
 ],'trusted:entrance-complete');
 window.TESIMAI_TRUSTED={refresh:render,setMedia:mediaController.setMedia,setMap,get media(){return mediaController.media},destroy(){stopLanguage();stopTarget();stopSearch();stopMotion();compact.removeEventListener('change',render);q('.trusted-cta').removeEventListener('click',contact);mediaController.destroy();}};
})();
