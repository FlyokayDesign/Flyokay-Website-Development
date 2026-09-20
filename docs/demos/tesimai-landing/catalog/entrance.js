/* Catalog-specific choreography; lifecycle is shared with other sections. */
(() => {
 const section=document.querySelector('.catalog'),q=s=>section.querySelector(s);
 const viewport=q('.catalog-viewport'),wrapper=document.createElement('div');
 wrapper.className='catalog-entrance-viewport';viewport.before(wrapper);wrapper.append(viewport);
 const label=q('.catalog-label'),copy=q('.catalog-copy'),cta=q('.catalog-cta'),divider=q('.catalog-divider'),pagination=q('.catalog-pagination');
 TESIMAI_MOTION.register(section,mobile=>{
  const active=q('.catalog-card.is-active');
  divider.style.transformOrigin=mobile?'':'left center';
  return mobile?[
   [label,0,550,'0 16px'],[copy,60,600,'0 18px'],[wrapper,180,600,'0 20px','.985'],
   [pagination,320,500,'0 16px'],[divider,380,550,'0 16px'],[cta,440,600,'0 16px']
  ]:[
   [label,0,600,'-24px 0'],[copy,0,650,'28px 0'],[cta,120,600,'-24px 0'],
   ...[...section.querySelectorAll('.catalog-card')].map((card,i)=>[card,280+i*60,600,'0 20px',card===active?'.985':'1']),
   [divider,520,550,'0 0','0 1']
  ];
 },'catalog:entrance-complete');
})();
