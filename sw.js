/* Update bridge for the previous release. HTML is never cached here. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>/^(mh-|madinat|academy)/i.test(k)).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
