(() => {
 const section=document.querySelector('.about'),q=s=>section.querySelector(s),data=TESIMAI_ABOUT_CONTENT;
 let mediaController;
 function copy(){return data.locales[TESIMAI_I18N.locale]||data.locales.EN}
 const stopLanguage=TESIMAI_I18N.register('about',()=>{
  const t=copy();q('.about-label span').textContent=t.label;q('h2').textContent=t.heading;q('.about-summary').textContent=t.summary;
  q('.about-cta span').textContent=TESIMAI.copy[TESIMAI_I18N.locale].cta;
  section.querySelectorAll('.about-feature').forEach((el,i)=>{el.querySelector('h3').textContent=t.features[i].title;el.querySelector('p').textContent=t.features[i].description});
  mediaController?.refreshAlt();
 });
 mediaController=TESIMAI_MEDIA.create(q('.about-media-content'),data.media,()=>copy().alt);
 const contact=()=>TESIMAI_SITE.requestContact();q('.about-cta').addEventListener('click',contact);
 const stopTarget=TESIMAI_SITE.registerTarget('about',()=>section);
 const stopSearch=TESIMAI_SITE.registerSearch('about',locale=>{const t=data.locales[locale];return [{title:t.label,desc:t.heading+' '+t.summary,target:'about',section:t.label},...t.features.map(f=>({title:f.title,desc:f.description,target:'about',section:t.label}))]});
 const stopMotion=TESIMAI_MOTION.register(section,mobile=>{
  const [first,second]=section.querySelectorAll('.about-feature');
  return mobile?[
   [q('.about-label'),0,550,'0 14px'],[q('.about-copy'),80,600,'0 18px'],
   [q('.about-media'),180,800,'0 20px'],[q('.about-media-settle'),180,800,'0 0','1.035',false],
   [first,300,600,'0 18px'],[second,360,600,'0 18px'],
   [q('.about-divider'),480,550,'0 0','0 1'],[q('.about-cta'),560,550,'0 14px']
  ]:[
   [q('.about-label'),0,600,'-24px 0'],[q('.about-copy'),0,650,'28px 0'],[q('.about-cta'),120,600,'-24px 0'],
   [first,260,600,'-20px 0'],[second,340,600,'-20px 0'],
   [q('.about-media'),300,800,'28px 0'],[q('.about-media-settle'),300,800,'0 0','1.035',false]
  ];
 },'about:entrance-complete');
 window.TESIMAI_ABOUT={setMedia:mediaController.setMedia,get media(){return mediaController.media},destroy(){stopLanguage();stopTarget();stopSearch();stopMotion();q('.about-cta').removeEventListener('click',contact);mediaController.destroy();}};
})();
