var Client=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"checkForInput",(function(){return o})),n.d(t,"handleSubmit",(function(){return r}));async function r(e){e.preventDefault();const t=document.getElementById("destination").value,n=document.getElementById("departureDate").value,r=document.getElementById("errorMsg");if(Client.checkForInput(t,n)){const e=await(async(e="",t={})=>{const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{Accept:"application/json","Content-type":"application/json"},body:JSON.stringify(t)});try{return await n.json()}catch(e){console.log("error",e)}})("http://localhost:8081/destination",{destination:t});console.log(e)}else r.innerHTML="Please enter your destination and departure date!",r.style.color="red"}let o=(e,t)=>{if(""!==e&&""!==t)return!0};console.log("connected!!!"),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/service-worker.js")}))}]);