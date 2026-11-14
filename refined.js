(()=>{'use strict';
const svg=p=>`<svg viewBox="0 0 24 24" class="icon" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${p}"/></svg>`;
const paths=['m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9','M3 5c3-1 6-1 9 1v15c-3-2-6-2-9-1zM21 5c-3-1-6-1-9 1v15c3-2 6-2 9-1z','M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z','M8 14 6 22l6-3 6 3-2-8M19 9a7 7 0 1 1-14 0 7 7 0 0 1 14 0'];
document.querySelectorAll('.main-nav a').forEach((a,i)=>{if(!a.querySelector('svg'))a.insertAdjacentHTML('afterbegin',svg(paths[i%4]));});
const root=document.documentElement,button=document.getElementById('theme-toggle');let busy=false;
button.onclick=async()=>{if(busy)return;busy=true;button.disabled=true;const target=root.dataset.theme==='dark'?'light':'dark',r=button.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));let applied=false;
 const apply=()=>{if(applied)return;applied=true;root.dataset.theme=target;try{localStorage.setItem('mh-theme-v3',target)}catch{}window.paintAcademyTheme?.();document.querySelector('meta[name="theme-color"]')?.setAttribute('content',target==='dark'?'#171a19':'#ffffff');};
 try{if(root.dataset.effects==='lite'||matchMedia('(prefers-reduced-motion: reduce)').matches){apply();return;}
 if(document.startViewTransition){root.classList.add('theme-reveal');const t=document.startViewTransition(apply);await t.ready;await root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},{duration:780,easing:'cubic-bezier(.22,.75,.2,1)',pseudoElement:'::view-transition-new(root)',fill:'both'}).finished;await t.finished;}
 else{const b=document.createElement('div');b.className='theme-bubble';b.style.cssText=`left:${x}px;top:${y}px;width:${radius*2}px;height:${radius*2}px;background:${target==='dark'?'#171a19':'#fff'}`;document.body.append(b);await b.animate([{transform:'translate(-50%,-50%) scale(0)'},{transform:'translate(-50%,-50%) scale(1)'}],{duration:550,easing:'cubic-bezier(.22,.75,.2,1)',fill:'forwards'}).finished;apply();await b.animate([{opacity:1},{opacity:0}],{duration:220,fill:'forwards'}).finished;b.remove();}
 }catch{apply()}finally{root.classList.remove('theme-reveal');button.disabled=false;busy=false;}};
if(document.body.dataset.page==='quran'){
 const $=id=>document.getElementById(id),headphones=svg('M4 13v-2a8 8 0 0 1 16 0v2M4 12H2v8h5v-8ZM20 12h2v8h-5v-8Z');
 $('q-index').innerHTML=svg('M9 5h12M9 12h12M9 19h12M3 5h.01M3 12h.01M3 19h.01')+'<span>فهرس المصحف</span>';
 $('q-settings').innerHTML=svg('M4 7h16M4 17h16M9 4v6M15 14v6')+'<span>أدوات التلاوة</span>';
 $('q-audio-options').innerHTML=headphones+'<span>القرّاء والاستماع</span>';
 const audio=$('quran-audio'),dock=document.createElement('div');dock.className='audio-dock';dock.hidden=true;dock.id='audio-dock';dock.innerHTML='<div class="audio-dock-label">'+headphones+'<div><strong id="dock-reciter"></strong><small id="dock-status" role="status"></small></div></div><div id="dock-controls"></div><button class="icon-btn" id="dock-close" aria-label="إيقاف وإغلاق">×</button>';document.querySelector('.reader-layout').after(dock);$('dock-controls').append(audio);
 $('dock-close').onclick=()=>{window.stopAcademyAudio?.();audio.pause();dock.hidden=true;};audio.addEventListener('play',()=>{dock.hidden=false;$('dock-reciter').textContent=$('reciter').selectedOptions[0]?.textContent||'';});
 new MutationObserver(()=>$('dock-status').textContent=$('audio-status').textContent).observe($('audio-status'),{childList:true,subtree:true,characterData:true});
 window.addEventListener('readerpage',()=>{if(document.querySelector('.mushaf-paper')&&!matchMedia('(prefers-reduced-motion:reduce)').matches)$('quran-content').animate([{opacity:.4,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});});
}
})();
