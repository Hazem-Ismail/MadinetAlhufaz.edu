(()=>{'use strict';
 const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)'),lite=root.dataset.effects==='lite';
 const targets=[...document.querySelectorAll('.hero-art,.medal-showcase,.original-mission,.trust-strip')];
 if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('motion-visible',e.isIntersecting)),{threshold:.1});targets.forEach(el=>io.observe(el));}else targets.forEach(el=>el.classList.add('motion-visible'));
 const visibility=()=>root.classList.toggle('motion-paused',document.hidden);document.addEventListener('visibilitychange',visibility);visibility();
 function showIntro(){
 if(reduce.matches||lite)return;
 const previous=document.activeElement,overlay=document.createElement('div');overlay.className='academy-intro';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','مرحبًا بك في أكاديمية مدينة الحفاظ');
 overlay.innerHTML='<button class="intro-skip" type="button">تخطّي المقدّمة <span aria-hidden="true">←</span></button><div class="intro-aura" aria-hidden="true"></div><div class="intro-vfx" aria-hidden="true"><i class="intro-streak gold-streak"></i><i class="intro-streak blue-streak"></i><i class="intro-bloom"></i></div><div class="intro-orbits" aria-hidden="true"><i></i><i></i></div><div class="intro-stage" dir="rtl"><div class="intro-logo-wrap"><i class="intro-ring"></i><svg class="intro-trace" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="94" /></svg><span class="intro-logo"><img src="assets/academy-logo-hq.jpg" width="640" height="537" alt="شعار أكاديمية مدينة الحفاظ" decoding="async"></span></div><div class="intro-copy"><div class="intro-rule"></div><p class="intro-kicker">أكاديمية القرآن الكريم وعلومه</p><h2><span class="intro-academy">أكاديمية</span> <span class="intro-name">مدينة الحفاظ</span></h2><p class="intro-motto">الإحسان بصحبة القرآن</p></div></div><span class="intro-timeline" aria-hidden="true"></span>';
 root.classList.toggle('intro-playing',true);document.body.append(overlay);const siblings=[...document.body.children].filter(el=>el!==overlay).map(el=>[el,el.inert]);siblings.forEach(([el])=>el.inert=true);
 const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';const skip=overlay.querySelector('button');skip.focus({preventScroll:true});let timer,closed=false;
 function finish(){if(closed)return;closed=true;clearTimeout(timer);document.removeEventListener('keydown',keys);reduce.removeEventListener?.('change',finish);siblings.forEach(([el,was])=>el.inert=was);document.body.style.overflow=oldOverflow;overlay.remove();root.classList.toggle('intro-playing',false);if(previous&&previous!==document.body)previous.focus({preventScroll:true});}
 function keys(e){if(e.key==='Escape'){e.preventDefault();finish()}if(e.key==='Tab'){e.preventDefault();skip.focus()}}
 skip.onclick=finish;document.addEventListener('keydown',keys);reduce.addEventListener?.('change',finish);timer=setTimeout(finish,4600);window.addEventListener('pagehide',finish,{once:true});
 }
 // Play on site entry or a homepage refresh, never on internal page navigation.
 const navigation=window.performance?.getEntriesByType?.('navigation')?.[0]?.type||'navigate';
 let internal=false;try{internal=!!document.referrer&&new URL(document.referrer).origin===location.origin;}catch{}
 let started=false;try{started=sessionStorage.getItem('mh-visit-started')==='1';sessionStorage.setItem('mh-visit-started','1');}catch{started=navigation==='reload';}
 const homepageReload=navigation==='reload'&&document.body.dataset.page==='index';
 const siteEntry=navigation==='navigate'&&!internal&&!started;
 if(homepageReload||siteEntry)showIntro();
 // Browser history restores the existing page without reopening the overlay.

})();
