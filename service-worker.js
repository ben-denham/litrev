"use strict";var precacheConfig=[["/litrev/index.html","99f0196315d289acc03f5c6259b47194"],["/litrev/static/css/main.ffd5b23d.css","b9d215a893de6771ddf65bcd85d97cf1"],["/litrev/static/js/main.6fd91a75.js","7b7bf03f0901bdb6b88fa44750098540"],["/litrev/static/media/roboto-all-400-normal.a91ad097.woff","a91ad097d24828af724d4fee36a063ed"],["/litrev/static/media/roboto-cyrillic-400-normal.8bb64952.woff2","8bb64952764a884d67019b3486296ab9"],["/litrev/static/media/roboto-cyrillic-ext-400-normal.4743c758.woff2","4743c758a952f2bd4a35d4e42afc002b"],["/litrev/static/media/roboto-greek-400-normal.c1e9793c.woff2","c1e9793c84cb26c44ef2a2cf8b6f49ce"],["/litrev/static/media/roboto-greek-ext-400-normal.182ee6a4.woff2","182ee6a4872ca8fa78048951b1561a5c"],["/litrev/static/media/roboto-latin-400-normal.479970ff.woff2","479970ffb74f2117317f9d24d9e317fe"],["/litrev/static/media/roboto-latin-ext-400-normal.455200cb.woff2","455200cb007fe1212c668721d827c691"],["/litrev/static/media/roboto-vietnamese-400-normal.a8be5b46.woff2","a8be5b46d06bb541b0968196ee5e6bb8"],["/litrev/static/media/semanticscholar-logo.ea5b05b1.svg","ea5b05b1cc4f7473a0705d7e58e0c9fc"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var r=new URL(e);return"/"===r.pathname.slice(-1)&&(r.pathname+=t),r.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,r,n){var a=new URL(e);return n&&a.pathname.match(n)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(r)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var r=new URL(t).pathname;return e.some(function(e){return r.match(e)})},stripIgnoredUrlParameters=function(e,r){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return r.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],r=e[1],n=new URL(t,self.location),a=createCacheKey(n,hashParamName,r,/\.\w{8}\./);return[n.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(r){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!r.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var r=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!r.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,r=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(r))||(r=addDirectoryIndex(r,n),e=urlsToCacheKeys.has(r));var a="/litrev/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(r=new URL(a,self.location).toString(),e=urlsToCacheKeys.has(r)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(r)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});