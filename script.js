/* CONFIGURAÇÃO: substitua [LINK_YOUTUBE] abaixo uma única vez para atualizar todos os botões.
   Você também pode substituir globalmente o placeholder em todo o arquivo (funciona sem JS). */

/* CADASTRO: configure um endpoint HTTPS que aceite POST JSON {email, consent, source}.
   Responda 2xx somente após aceitar o cadastro. Configure CORS para a origem do site
   (incluindo o ambiente local se necessário), validação, proteção contra abuso,
   confirmação de e-mail e cancelamento no servidor/serviço de envio.
   Substitua também [LINK_POLITICA_PRIVACIDADE] pela política do responsável pelos dados. */
const FORM_ENDPOINT = '[ENDPOINT_CADASTRO]';
const signupForm=document.querySelector('#event-signup');
const signupMessage=document.querySelector('#signup-message');
const privacyLink=document.querySelector('#privacy-link');
privacyLink.addEventListener('click',event=>{if(privacyLink.getAttribute('href').startsWith('[')){event.preventDefault();signupMessage.textContent='A política de privacidade ainda não foi disponibilizada. O cadastro será liberado após a configuração.'}});
signupForm.addEventListener('submit',async event=>{
 event.preventDefault();
 if(!signupForm.reportValidity()) return;
 if(FORM_ENDPOINT.startsWith('[')||privacyLink.getAttribute('href').startsWith('[')){
  signupMessage.textContent='O cadastro ainda não está disponível. Volte em breve para receber as novidades. Nenhum dado foi enviado.';return;
 }
 const submit=signupForm.querySelector('button');
 submit.disabled=true;signupForm.setAttribute('aria-busy','true');signupMessage.textContent='Enviando seu cadastro…';
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
 try{
  const response=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:signupForm.elements.email.value.trim(),consent:signupForm.elements.consent.checked,source:'red-bull-symphonic-brasil'}),signal:controller.signal});
  if(!response.ok) throw new Error('Cadastro não aceito');
  signupMessage.textContent='Solicitação de cadastro recebida. Se houver uma etapa de confirmação, você receberá as instruções por e-mail.';signupForm.reset();
 }catch(error){signupMessage.textContent='Não foi possível confirmar o cadastro. Tente novamente em instantes.'}
 finally{clearTimeout(timeout);submit.disabled=false;signupForm.removeAttribute('aria-busy')}
});


/* Motion controls: pause all decorative hero animation; never plays audio. */
const stage=document.querySelector('.hero');
const motionToggle=document.querySelector('#motion-toggle');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=false;
function resetStage(){stage.style.setProperty('--cursor-x','0px');stage.style.setProperty('--cursor-y','0px')}
motionToggle.addEventListener('click',()=>{motionPaused=!motionPaused;stage.classList.toggle('motion-paused',motionPaused);motionToggle.setAttribute('aria-pressed',String(motionPaused));motionToggle.innerHTML=motionPaused?'Retomar movimento <span aria-hidden="true">▷</span>':'Pausar movimento <span aria-hidden="true">Ⅱ</span>';resetStage()});
stage.addEventListener('pointermove',event=>{if(motionPaused||motionPreference.matches||!matchMedia('(min-width:701px) and (pointer:fine)').matches)return;const rect=stage.getBoundingClientRect();stage.style.setProperty('--cursor-x',((event.clientX-rect.left)/rect.width-.5)*20+'px');stage.style.setProperty('--cursor-y',((event.clientY-rect.top)/rect.height-.5)*16+'px')},{passive:true});
stage.addEventListener('pointerleave',resetStage);
motionPreference.addEventListener('change',resetStage);

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=EtaXLhcpUfw&list=RDEtaXLhcpUfw&start_radio=1';
const status = document.querySelector('.status');
let noticeTimer;
function notify(message){status.textContent=message;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>status.textContent='',6500)}
document.querySelectorAll('a[href="https://www.youtube.com/watch?v=EtaXLhcpUfw&amp;list=RDEtaXLhcpUfw&amp;start_radio=1"]').forEach(link=>{
 if(YOUTUBE_URL !== '[LINK_YOUTUBE]') link.href=YOUTUBE_URL;
 link.addEventListener('click',event=>{if(link.getAttribute('href')==='[LINK_YOUTUBE]'){event.preventDefault();notify('Vídeo ainda não configurado. Substitua [LINK_YOUTUBE] pelo endereço da apresentação.')}});
 if(link.target==='_blank'&&!link.querySelector('.sr-only')&&!link.hasAttribute('aria-label')){const text=document.createElement('span');text.className='sr-only';text.textContent=' (abre em nova aba)';link.append(text)}
});
/* FOTOS: troque cada data-image="[FOTO_...]" pelo arquivo ou URL correspondente.
   O alt está em data-alt; ajuste a descrição para corresponder à fotografia escolhida. */
document.querySelectorAll('[data-image]').forEach(container=>{
 const source=container.dataset.image;
 if(!source || source.startsWith('[')) return;
 const img=new Image();img.alt=container.dataset.alt||'';img.decoding='async';
 img.loading=container.closest('.hero')?'eager':'lazy';
 if(container.closest('.hero')) img.fetchPriority='high';
 img.addEventListener('load',()=>{container.classList.add('has-image');container.querySelector('.placeholder')?.remove()});
 img.addEventListener('error',()=>{img.remove();container.classList.remove('has-image')});
 img.src=source;container.append(img);
});
const toggle=document.querySelector('.menu-toggle'), menu=document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu +'}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Fechar −':'Menu +';menu.classList.toggle('open',open)});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus()}});
matchMedia('(min-width:701px)').addEventListener('change',closeMenu);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!reduced.matches){
 document.documentElement.classList.add('enhanced');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
 document.querySelectorAll('.reveal,.score').forEach(el=>observer.observe(el));
 reduced.addEventListener('change',event=>{if(event.matches){document.documentElement.classList.remove('enhanced');observer.disconnect()}});
}
