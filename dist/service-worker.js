if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return i[e]||(c=new Promise((async c=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=c}else importScripts(e),c()}))),c.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},c=(c,i)=>{Promise.all(c.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(c)};self.define=(c,n,r)=>{i[c]||(i[c]=Promise.resolve().then((()=>{let i={};const s={uri:location.origin+c.slice(1)};return Promise.all(n.map((c=>{switch(c){case"exports":return i;case"module":return s;default:return e(c)}}))).then((e=>{const c=r(...e);return i.default||(i.default=c),i}))})))}}define("./service-worker.js",["./workbox-08e0b74e"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"./index.html",revision:"06a7f1c88b4f642b6f3c8dd3b0edbdce"},{url:"main.css",revision:"de1b5df1845b5b8fc4f28376adb9abcd"},{url:"main.js",revision:"94b75702b83f94ccea63d2caf49550f5"},{url:"src/client/icons/a01d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/icons/a02d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/icons/a03d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/icons/a04d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/icons/a05d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/icons/a06d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/icons/c01d.png",revision:"5bd79e6650e3e2767f61a4934d4e0c45"},{url:"src/client/icons/c02d.png",revision:"e036c5b2eebc6c9adfa84f5dac34d725"},{url:"src/client/icons/c03d.png",revision:"e93d272802d6631fd16be26e7b72657f"},{url:"src/client/icons/c04d.png",revision:"2c5994f7d9426ea4bbae0f33ba417bd9"},{url:"src/client/icons/d01d.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/icons/d02d.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/icons/d03d.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/icons/f01d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/icons/r01d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/icons/r02d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/icons/r03d.png",revision:"c96f1cb1d19fd3453cf74f4dbb7059a5"},{url:"src/client/icons/r04d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/icons/r05d.png",revision:"87ccf2d87bfbfb6013b90744986d7781"},{url:"src/client/icons/r06d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/icons/s01d.png",revision:"adf57aee773961e0093750518f0573a9"},{url:"src/client/icons/s02d.png",revision:"4445c1dee782450c83183091ece545e4"},{url:"src/client/icons/s03d.png",revision:"4445c1dee782450c83183091ece545e4"},{url:"src/client/icons/s04d.png",revision:"adf57aee773961e0093750518f0573a9"},{url:"src/client/icons/s05d.png",revision:"d1a4a3475009e7c2b7a8ee8ee4dfa8c2"},{url:"src/client/icons/s06d.png",revision:"9c82e68544657b2c2bbed1918a654747"},{url:"src/client/icons/t01d.png",revision:"32547a79e8469342782cb03652fe80f1"},{url:"src/client/icons/t02d.png",revision:"32547a79e8469342782cb03652fe80f1"},{url:"src/client/icons/t03d.png",revision:"32547a79e8469342782cb03652fe80f1"},{url:"src/client/icons/t04d.png",revision:"3a792b96d369a96b9baed3b12945f849"},{url:"src/client/icons/t05d.png",revision:"3a792b96d369a96b9baed3b12945f849"},{url:"src/client/icons/u00d.png",revision:"fe27c344277901aa5be6e95337439959"}],{})}));
