var Client=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"checkForInput",(function(){return a})),n.d(t,"handleSubmit",(function(){return o}));async function o(e){e.preventDefault();const t=document.getElementById("destination").value,n=document.getElementById("departureDate").value,o=document.getElementById("errorMsg");if(Client.checkForInput(t,n)){const e=await(async(e="",t={})=>{const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{Accept:"application/json","Content-type":"application/json"},body:JSON.stringify(t)});try{return await n.json()}catch(e){console.log("error",e)}})("http://localhost:8081/destination",{destination:t,departureDate:n});console.log(e),r(e)}else o.innerHTML="Please enter both destination and departure date!",o.style.color="red"}const r=e=>{const t=e[e.length-1];console.log(t);const n=document.getElementsByClassName("location"),o=document.getElementsByClassName("date");n.innerHTML=t.destination,o.innerHTML=t.departureDate,console.log(o.innerHTML)};let a=(e,t)=>{if(""!==e&&""!==t)return!0};console.log("connected!!!");const i=document.getElementById("departureDate");console.log(i);let l=new Date;console.log(l);let c=l.getMonth()+1;c<10&&(c="0"+c);let u=l.getFullYear()+"-"+c+"-"+(l.getDate()+1);console.log(u),i.setAttribute("min",u),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/service-worker.js")}))}]);