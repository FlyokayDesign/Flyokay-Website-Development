(() => {
 const section=document.querySelector('#footer'),q=s=>section.querySelector(s),data=TESIMAI_FOOTER_CONTENT,compact=matchMedia('(max-width:899px)');
 let config={...data.media};
 const responsiveMedia=()=>({...config,src:config.type==='image'&&compact.matches&&config.mobileSrc?config.mobileSrc:config.src});
 const media=TESIMAI_MEDIA.create(q('.footer-media'),responsiveMedia(),()=>config.alt||'');
 function render(){
  const locale=TESIMAI_I18N.locale,t=data.locales[locale]||data.locales.EN,global=TESIMAI.copy[locale];
  const heading=q('h2');heading.textContent=global.heading;
  if(locale==='EN'){heading.replaceChildren(document.createTextNode('Bringing More'),document.createElement('br'),document.createTextNode('Joy to the World'));}
  q('.footer-top span').textContent=t.top;
  q('.footer-nav').replaceChildren(...TESIMAI.navigation.map((target,i)=>{const b=document.createElement('button');b.type='button';b.dataset.target=target;b.textContent=global.nav[i];return b;}));
  q('.footer-contacts').replaceChildren(...data.contacts.map((contact,i)=>{
   const item=document.createElement(contact.href?'a':'div');item.className='footer-contact';if(contact.href)item.href=contact.href;
   const icon=document.createElement('i'),img=document.createElement('img');img.src=contact.icon;img.alt='';icon.append(img);
   const text=document.createElement('p'),label=document.createElement('span'),value=document.createElement('span');label.textContent=i===0?t.email:contact.label;value.textContent=contact.value;value.className='footer-contact-value';text.append(label,value);item.append(icon,text);return item;
  }));
 }
 const stopLanguage=TESIMAI_I18N.register('footer',render);
 const resizeMode=()=>{if(config.type==='image')media.setMedia(responsiveMedia());};compact.addEventListener('change',resizeMode);
 const stopMotion=TESIMAI_MOTION.register(section,mobile=>mobile?[
 [q('.footer-brand'),0,700,'0 18px'],[q('h2'),80,650,'0 20px'],[q('.footer-nav'),160,600,'0 18px'],[q('.footer-contacts'),240,600,'0 18px'],[q('.footer-top-wrap'),320,600,'0 18px']
 ]:[
 [q('h2'),0,650,'0 24px'],[q('.footer-top-wrap'),100,600,'20px 0'],[q('.footer-nav'),180,600,'0 18px'],[q('.footer-contacts'),220,600,'0 18px'],[q('.footer-brand'),280,850,'0 30px','.985']
 ],'footer:entrance-complete');
 window.TESIMAI_FOOTER={refresh:render,setMedia(next){config={...next};media.setMedia(responsiveMedia());},get media(){return {...config};},destroy(){stopLanguage();stopMotion();compact.removeEventListener('change',resizeMode);media.destroy();}};
})();
