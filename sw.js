const CACHE ='AdvancedProgramming'
const FILES = ['/ileriProgramlama/CW2/CW2.html', '/ileriProgramlama/ListOfObjects/ListofObjects.html', '/ileriProgramlama/Cw5/cw5.html', '/ileriProgramlama/CW6.html','/ileriProgramlama/CW7.html','/ileriProgramlama/CW8/CW8.html', '/ileriProgramlama/CW9/CW9.html','/ileriProgramlama/CW10.html','/ileriProgramlama/cw11.html','/ileriProgramlama/CW12.html','/ileriProgramlama/CW13.html','/ileriProgramlama/HW1/HW1.html','/ileriProgramlama/HW2/index.html','/ileriProgramlama/TermProject/cagriproje.html']
function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)
function cacheCB(e) { //cache first
  let req = e.request
  e.respondWith(
    caches.match(req)
    .then(r1 => r1 || fetch(req))
    .catch(console.log)
  )
}
self.addEventListener('fetch', cacheCB)
function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  }) 
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)
