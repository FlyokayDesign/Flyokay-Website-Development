/* Shared integration hooks. Sections register content instead of editing navigation. */
(() => {
 const targets=new Map(),sources=new Map();
 window.TESIMAI_SITE={
  registerTarget(id,resolve){targets.set(id,resolve);return()=>{if(targets.get(id)===resolve)targets.delete(id)}},
  navigate(id){const resolve=targets.get(id);const node=typeof resolve==='function'?resolve():resolve;if(!(node instanceof Element))return false;node.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});return true},
  registerSearch(id,provide){sources.set(id,provide);return()=>{if(sources.get(id)===provide)sources.delete(id)}},
  searchEntries(){return [...sources.values()].flatMap(provide=>provide(TESIMAI_I18N.locale)||[])}
 };
})();
