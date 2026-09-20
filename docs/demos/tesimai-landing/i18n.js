/* One locale owner for every section, including sections mounted later. */
(() => {
  const supported=['EN','ES','FR','ZH-CN','ZH-TW','JA'];
  const tags={'EN':'en','ES':'es','FR':'fr','ZH-CN':'zh-Hans','ZH-TW':'zh-Hant','JA':'ja'};
  let locale='EN';try{const saved=localStorage.getItem('tesimai-language');if(supported.includes(saved))locale=saved}catch{}
  const sections=new Map();
  function notify(){document.documentElement.lang=tags[locale];sections.forEach(render=>render(locale));document.dispatchEvent(new CustomEvent('tesimai:languagechange',{detail:{locale}}));}
  window.TESIMAI_I18N={get locale(){return locale},setLanguage(next){if(!supported.includes(next)||next===locale)return;locale=next;try{localStorage.setItem('tesimai-language',next)}catch{}notify()},register(id,render){sections.set(id,render);render(locale);return()=>{if(sections.get(id)===render)sections.delete(id)}}};
  document.documentElement.lang=tags[locale];
})();
