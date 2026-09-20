TESIMAI_SITE.requestContact=()=>{if(TESIMAI_SITE.navigate('contact'))return;const message=document.querySelector('#toast');message.textContent=TESIMAI.copy[TESIMAI_I18N.locale].unavailable;message.hidden=false;clearTimeout(message._timer);message._timer=setTimeout(()=>message.hidden=true,3000)};
document.querySelector('.catalog').addEventListener('catalog:contact-request',TESIMAI_SITE.requestContact);
// The panel and shoulders use the same measured coordinates at every width.
(() => {
 const header=document.querySelector('#header'),panel=document.querySelector('#desktop-panel');
 function align(){
  if(innerWidth<900)return;
  const width=panel.classList.contains('lang-panel')?246:Math.min(560,innerWidth-48);
  const preferred=panel.classList.contains('lang-panel')?document.querySelector('#language').getBoundingClientRect().left-24:innerWidth-Math.max(24,(innerWidth-1278)/2+25)-width;
  const left=Math.max(22,Math.min(preferred,innerWidth-width-22));
  header.style.setProperty('--drop-left',left+'px');header.style.setProperty('--drop-width',width+'px');
  header.style.setProperty('--nav-height',document.querySelector('.nav-inner').getBoundingClientRect().height+'px');
  header.style.setProperty('--join-left-radius',Math.min(22,Math.max(0,left-22))+'px');
  header.style.setProperty('--join-right-radius',Math.min(22,Math.max(0,innerWidth-left-width-22))+'px');
 }
 new MutationObserver(align).observe(panel,{attributes:true,attributeFilter:['hidden','class']});
 new ResizeObserver(align).observe(document.querySelector('.nav-inner'));
 window.addEventListener('resize',align);align();
})();

TESIMAI_SITE.registerTarget('catalog',()=>document.getElementById('catalog'));
TESIMAI_SITE.registerSearch('catalog',()=>[
 {title:TESIMAI_CATALOG_CONTENT.label,desc:TESIMAI_CATALOG_CONTENT.desktopHeading,target:'catalog',section:TESIMAI_CATALOG_CONTENT.label},
 ...TESIMAI_CATALOG_CONTENT.products.map(p=>({title:p.name,desc:p.description,target:'catalog',section:TESIMAI_CATALOG_CONTENT.label}))
]);
