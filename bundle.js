(()=>{var e,t={225:(e,t,n)=>{"use strict";n(85);var o=n(565),r=n(10),i=n(709);const a=n(764).Buffer,c=document.getElementById("signinBtn"),s=document.getElementById("signoutBtn"),l=new i.G(document.querySelector(".mdc-snackbar")),d=document.getElementById("redirectBtn");let u,p="";const f=window.location.search,g=new URLSearchParams(f).get("pubKey64"),b=a.from(g,"base64");console.log(b),(async()=>{const e={};b&&""!==b&&(e.identity=b),u=await r.L.create(e);const t=()=>{const e=u.getIdentity(),t=e.getPrincipal();if(e instanceof o.j){c.disabled=!0;const n=e.getDelegation().toJSON().publicKey,o=new a(n).toString("base64");p="exp://192.168.68.117:19000/--/Photos?principal="+t+"&publicKey64="+o,l.open(),l.timeoutMs=-1,setTimeout((()=>{window.location=p}),20)}else s.disabled=!0};t(),d.onclick=async()=>{setTimeout((()=>{window.location=p}),10)},c.onclick=async()=>{u.login({identityProvider:"https://identity.ic0.app/",onSuccess:t})},s.onclick=async()=>{u.logout(),s.disabled=!0,c.disabled=!1,t()}})()},24:()=>{}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,o),i.exports}o.m=t,o.amdO={},e=[],o.O=(t,n,r,i)=>{if(!n){var a=1/0;for(l=0;l<e.length;l++){for(var[n,r,i]=e[l],c=!0,s=0;s<n.length;s++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(c=!1,i<a&&(a=i));c&&(e.splice(l--,1),t=r())}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[n,r,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={296:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[a,c,s]=n,l=0;for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(s)var d=s(o);for(t&&t(n);l<a.length;l++)i=a[l],o.o(e,i)&&e[i]&&e[i][0](),e[a[l]]=0;return o.O(d)},n=self.webpackChunkic_agent_sample_javascript_app=self.webpackChunkic_agent_sample_javascript_app||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[706],(()=>o(225)));r=o.O(r)})();
//# sourceMappingURL=bundle.js.map