/* 可选的 HTTPS / localhost 离线缓存。直接打开 file:// 时不会注册。 */
'use strict';
const CACHE='anime-club-challenge-v2';
const FILES=['./','./index.html','./style.css','./cards.js','./extra-cards.js','./generator.js','./engine.js','./app.js',
  ...Array.from({length:12},(_,i)=>'I'+String(i+1).padStart(2,'0')).flatMap(id=>[`./assets/images/${id}_guess.jpg`,`./assets/images/${id}_answer.jpg`])];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('anime-club-challenge-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached=await cache.match(event.request,{ignoreSearch:true});if(cached)return cached;
    try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate')return await cache.match('./index.html');throw error;}
  }));
});
