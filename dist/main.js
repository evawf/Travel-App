var Client=function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"handleSubmit",(function(){return s}));let a={trips:[],maxId:0};const i=()=>{a.trips=[],a.maxId=0,localStorage.setItem("trips",JSON.stringify(a)),d()},r=document.getElementById("showTrips"),d=()=>{r.innerHTML="",a.trips.forEach((e=>{o(e)}))},o=e=>{let t=e.id;const n=document.createElement("div");n.classList.add("tripInfo"),n.id=`tripInfo_${t}`;const o=document.createElement("div"),c=document.createElement("div");o.classList.add("location"),c.classList.add("daysToTravel"),o.innerHTML=e.destination;const s=new Date,l=s.getFullYear()+"-"+(s.getMonth()+1)+"-"+s.getDate(),p=e.departureDate,m=new Date(p)-new Date(l),u=Math.floor(m/864e5);c.innerHTML="Your trip starts in: "+u+" days";const g=document.createElement("button");g.innerHTML="Weather Forecast",g.classList.add("weather_btn");const h=e.forecast,f=document.createElement("div");f.classList.add("showForecast"),f.classList.add("collapsed"),f.appendChild(g);for(let e=0;e<h.length;e++)if(new Date(h[e].date)>new Date(p)){const t=document.createElement("div");t.classList.add("forecast_div");const n=document.createElement("div"),a=document.createElement("div"),i=document.createElement("div"),r=document.createElement("img");n.innerHTML=h[e].date,a.innerHTML=h[e].high_temp+"&deg;C/"+h[e].low_temp+"&deg;C",i.innerHTML=h[e].weather.description,r.src=`/src/client/icons/${h[e].weather.icon}.png`,t.appendChild(n),t.appendChild(a),t.appendChild(r),t.appendChild(i),f.appendChild(t)}n.appendChild(o),n.appendChild(c),n.appendChild(f),g.addEventListener("click",(function(){f.classList.toggle("collapsed")}));const v=document.createElement("div");v.classList.add("showImage");const y=document.createElement("div");y.classList.add("image_div");const E=document.createElement("img");E.src=e.photos[e.activeImage],E.id=`trip_${t}_image`,y.appendChild(E),v.appendChild(y),n.appendChild(v);const I=document.createElement("a");I.classList.add("next"),I.innerHTML="&#10095;";const L=document.createElement("a");L.classList.add("prev"),L.innerHTML="&#10094;",L.addEventListener("click",(function(){0===e.activeImage?e.activeImage=e.photos.length-1:e.activeImage--,E.src=e.photos[e.activeImage]})),I.addEventListener("click",(function(){e.activeImage===e.photos.length-1?e.activeImage=0:e.activeImage++,E.src=e.photos[e.activeImage]})),v.appendChild(L),v.appendChild(I),r.appendChild(n);const b=document.createElement("a");b.classList.add("deleteTrip"),b.innerHTML="Remove ";const C=document.createElement("i");C.classList.add("fa"),C.classList.add("fa-trash"),b.appendChild(C),n.appendChild(b),b.addEventListener("click",(function(){a.trips.length>1?(a.trips.splice(t,1),a.maxId--,localStorage.setItem("trips",JSON.stringify(a)),d()):i()}))},c=document.getElementById("loader");async function s(e){console.log("clicked!"),e.preventDefault(),console.log("hey!!");const t=document.getElementById("destination").value,n=document.getElementById("departureDate").value,i=document.getElementById("errorMsg");if(((e,t)=>{if(""!==e&&""!==t)return!0})(t,n)){c.style.display="block";const e=await(async(e="",t={})=>{const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{Accept:"application/json","Content-type":"application/json"},body:JSON.stringify(t)});try{return await n.json()}catch(e){console.log("error",e)}})("http://localhost:8081/destination",{destination:t,departureDate:n});c.style.display="none",(r=e).id=a.maxId,a.maxId++,r.activeImage=0,a.trips.push(r),localStorage.setItem("trips",JSON.stringify(a)),d()}else i.innerHTML="Please enter both destination and departure date!",i.style.color="red";var r}n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p,n.p;const l=document.getElementById("departureDate");let p=new Date,m=p.getMonth()+1;m<10&&(m="0"+m);let u=p.getFullYear()+"-"+m+"-"+(p.getDate()+1);l.setAttribute("min",u);document.getElementById("deleteTrips").addEventListener("click",i),localStorage.getItem("trips")&&(a=JSON.parse(localStorage.getItem("trips"))),a.trips.length>0?document.getElementById("deleteTrips").style.display="block":document.getElementById("deleteTrips").style.display="none",d(),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/service-worker.js")}))}]);