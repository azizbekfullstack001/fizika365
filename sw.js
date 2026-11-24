/* Xizmat ishchisi: ilovani internetsiz ham ochadi. Versiya: bd03de99a2 */
const V='fmo-bd03de99a2',CORE=["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "vendor/three.min.js", "vendor/OrbitControls.js", "vendor/supabase.js", "vendor/chart.umd.js", "bg/oxu_bg.jpg", "bg/oxu_logo.png", "hero/amaliy.jpg", "hero/mustaqil.jpg", "au/maktab8.jpg", "au/ozmu.jpg", "au/litsey.jpg", "au/oxu.jpg", "au/atayeva.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k.startsWith('fmo-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin===location.origin&&/config\.json$/.test(u.pathname)){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r)));return}
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}
  if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))return;
  if(/\.(mp4|webm)$/i.test(u.pathname))return;
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&(res.type==='basic'||res.type==='cors')&&!/\.pdf$/i.test(u.pathname)){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})))});
