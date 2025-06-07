import{r as Ur,e as Pr,f as Dr,g as jr,i as $r,b as Br,d as Wr,s as Fr,a as Hr,o as zr,h as fe,t as Qr,E as Qt,k as Rt,q as Jr}from"./index.es-DBtlr63Q.js";import{v as Je,D as M,F as Vr,I as Gr,J as Kr,K as Yr,L as Zr,s as Jt}from"./index-CEFskgLE.js";import{r as Xr}from"./browser-DT9VdNOd.js";import{x as J,l as T,_ as D,k as te,H as $,d as Ce,A as Ve,a as Ge,T as Ke,b as _e,F as Ye,g as Ze,y as xe,P as Xe,c as et,q as tt,e as Vt,K as Gt,J as eo,E as be,G as to,f as no}from"./hooks.module-DT1Qu90S.js";class Tt extends Ur{constructor(e){super(e),this.events=new Pr.EventEmitter,this.hasRegisteredEventListeners=!1,this.connection=this.setConnection(e),this.connection.connected&&this.registerEventListeners()}async connect(e=this.connection){await this.open(e)}async disconnect(){await this.close()}on(e,n){this.events.on(e,n)}once(e,n){this.events.once(e,n)}off(e,n){this.events.off(e,n)}removeListener(e,n){this.events.removeListener(e,n)}async request(e,n){return this.requestStrict(Dr(e.method,e.params||[],e.id||jr().toString()),n)}async requestStrict(e,n){return new Promise(async(r,o)=>{if(!this.connection.connected)try{await this.open()}catch(i){o(i)}this.events.on(`${e.id}`,i=>{$r(i)?o(i.error):r(i.result)});try{await this.connection.send(e,n)}catch(i){o(i)}})}setConnection(e=this.connection){return e}onPayload(e){this.events.emit("payload",e),Br(e)?this.events.emit(`${e.id}`,e):this.events.emit("message",{type:e.method,data:e.params})}onClose(e){e&&e.code===3e3&&this.events.emit("error",new Error(`WebSocket connection closed abnormally with code: ${e.code} ${e.reason?`(${e.reason})`:""}`)),this.events.emit("disconnect")}async open(e=this.connection){this.connection===e&&this.connection.connected||(this.connection.connected&&this.close(),typeof e=="string"&&(await this.connection.open(e),e=this.connection),this.connection=this.setConnection(e),await this.connection.open(),this.registerEventListeners(),this.events.emit("connect"))}async close(){await this.connection.close()}registerEventListeners(){this.hasRegisteredEventListeners||(this.connection.on("payload",e=>this.onPayload(e)),this.connection.on("close",e=>this.onClose(e)),this.connection.on("error",e=>this.events.emit("error",e)),this.connection.on("register_error",e=>this.onClose()),this.hasRegisteredEventListeners=!0)}}const Le="Session currently connected",Q="Session currently disconnected",ro="Session Rejected",oo="Missing JSON RPC response",io='JSON-RPC success response must include "result" field',so='JSON-RPC error response must include "error" field',ao='JSON RPC request must have valid "method" value',co='JSON RPC request must have valid "id" value',lo="Missing one of the required parameters: bridge / uri / session",Ot="JSON RPC response format is invalid",uo="URI format is invalid",ho="QRCode Modal not provided",Nt="User close QRCode Modal",fo=["session_request","session_update","exchange_key","connect","disconnect","display_uri","modal_closed","transport_open","transport_close","transport_error"],_o=["wallet_addEthereumChain","wallet_switchEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode"],nt=["eth_sendTransaction","eth_signTransaction","eth_sign","eth_signTypedData","eth_signTypedData_v1","eth_signTypedData_v2","eth_signTypedData_v3","eth_signTypedData_v4","personal_sign",..._o],We="WALLETCONNECT_DEEPLINK_CHOICE",po={1:"mainnet",3:"ropsten",4:"rinkeby",5:"goerli",42:"kovan"};var Ae,Mt;function Kt(){if(Mt)return Ae;Mt=1,Ae=n,n.strict=r,n.loose=o;var t=Object.prototype.toString,e={"[object Int8Array]":!0,"[object Int16Array]":!0,"[object Int32Array]":!0,"[object Uint8Array]":!0,"[object Uint8ClampedArray]":!0,"[object Uint16Array]":!0,"[object Uint32Array]":!0,"[object Float32Array]":!0,"[object Float64Array]":!0};function n(i){return r(i)||o(i)}function r(i){return i instanceof Int8Array||i instanceof Int16Array||i instanceof Int32Array||i instanceof Uint8Array||i instanceof Uint8ClampedArray||i instanceof Uint16Array||i instanceof Uint32Array||i instanceof Float32Array||i instanceof Float64Array}function o(i){return e[t.call(i)]}return Ae}var go=Kt();const mo=Je(go);var Ue,qt;function wo(){if(qt)return Ue;qt=1;var t=Kt().strict;return Ue=function(n){if(t(n)){var r=Buffer.from(n.buffer);return n.byteLength!==n.buffer.byteLength&&(r=r.slice(n.byteOffset,n.byteOffset+n.byteLength)),r}else return Buffer.from(n)},Ue}var yo=wo();const vo=Je(yo),rt="hex",ot="utf8",bo="binary",Eo="buffer",So="array",Co="typed-array",xo="array-buffer",ke="0";function ne(t){return new Uint8Array(t)}function it(t,e=!1){const n=t.toString(rt);return e?pe(n):n}function st(t){return t.toString(ot)}function Yt(t){return t.readUIntBE(0,t.length)}function oe(t){return vo(t)}function B(t,e=!1){return it(oe(t),e)}function Zt(t){return st(oe(t))}function Xt(t){return Yt(oe(t))}function at(t){return Buffer.from(re(t),rt)}function W(t){return ne(at(t))}function ko(t){return st(at(t))}function Io(t){return Xt(W(t))}function ct(t){return Buffer.from(t,ot)}function en(t){return ne(ct(t))}function Ro(t,e=!1){return it(ct(t),e)}function To(t){const e=parseInt(t,10);return Jo(Qo(e),"Number can only safely store up to 53 bits"),e}function Oo(t){return Lo(lt(t))}function No(t){return ut(lt(t))}function Mo(t,e){return Ao(lt(t),e)}function qo(t){return`${t}`}function lt(t){const e=(t>>>0).toString(2);return ht(e)}function Lo(t){return oe(ut(t))}function ut(t){return new Uint8Array(Bo(t).map(e=>parseInt(e,2)))}function Ao(t,e){return B(ut(t),e)}function Uo(t){return!(typeof t!="string"||!new RegExp(/^[01]+$/).test(t)||t.length%8!==0)}function tn(t,e){return!(typeof t!="string"||!t.match(/^0x[0-9A-Fa-f]*$/)||e&&t.length!==2+2*e)}function Ie(t){return Buffer.isBuffer(t)}function dt(t){return mo.strict(t)&&!Ie(t)}function nn(t){return!dt(t)&&!Ie(t)&&typeof t.byteLength<"u"}function Po(t){return Ie(t)?Eo:dt(t)?Co:nn(t)?xo:Array.isArray(t)?So:typeof t}function Do(t){return Uo(t)?bo:tn(t)?rt:ot}function jo(...t){return Buffer.concat(t)}function rn(...t){let e=[];return t.forEach(n=>e=e.concat(Array.from(n))),new Uint8Array([...e])}function $o(t,e=8){const n=t%e;return n?(t-n)/e*e+e:t}function Bo(t,e=8){const n=ht(t).match(new RegExp(`.{${e}}`,"gi"));return Array.from(n||[])}function ht(t,e=8,n=ke){return Wo(t,$o(t.length,e),n)}function Wo(t,e,n=ke){return Vo(t,e,!0,n)}function re(t){return t.replace(/^0x/,"")}function pe(t){return t.startsWith("0x")?t:`0x${t}`}function Fo(t){return t=re(t),t=ht(t,2),t&&(t=pe(t)),t}function Ho(t){const e=t.startsWith("0x");return t=re(t),t=t.startsWith(ke)?t.substring(1):t,e?pe(t):t}function zo(t){return typeof t>"u"}function Qo(t){return!zo(t)}function Jo(t,e){if(!t)throw new Error(e)}function Vo(t,e,n,r=ke){const o=e-t.length;let i=t;return o>0&&(i=r.repeat(o)+t),i}function Ee(t){return oe(new Uint8Array(t))}function Go(t){return Zt(new Uint8Array(t))}function on(t,e){return B(new Uint8Array(t),!e)}function Ko(t){return Xt(new Uint8Array(t))}function Yo(...t){return W(t.map(e=>B(new Uint8Array(e))).join("")).buffer}function sn(t){return ne(t).buffer}function Zo(t){return st(t)}function Xo(t,e){return it(t,!e)}function ei(t){return Yt(t)}function ti(...t){return jo(...t)}function ni(t){return en(t).buffer}function ri(t){return ct(t)}function oi(t,e){return Ro(t,!e)}function ii(t){return To(t)}function si(t){return at(t)}function an(t){return W(t).buffer}function ai(t){return ko(t)}function ci(t){return Io(t)}function li(t){return Oo(t)}function ui(t){return No(t).buffer}function di(t){return qo(t)}function cn(t,e){return Mo(Number(t),!e)}const hi=M.getFromWindow,fi=M.getFromWindowOrThrow,_i=M.getDocumentOrThrow,pi=M.getDocument,gi=M.getNavigatorOrThrow,ln=M.getNavigator,mi=M.getLocationOrThrow,un=M.getLocation,wi=M.getCryptoOrThrow,yi=M.getCrypto,vi=M.getLocalStorageOrThrow,Re=M.getLocalStorage;function Te(t){return Wr(t)}function Oe(){const t=Te();return t&&t.os?t.os:void 0}function dn(){const t=Oe();return t?t.toLowerCase().includes("android"):!1}function hn(){const t=Oe();return t?t.toLowerCase().includes("ios")||t.toLowerCase().includes("mac")&&navigator.maxTouchPoints>1:!1}function fn(){return Oe()?dn()||hn():!1}function _n(){const t=Te();return t&&t.name?t.name.toLowerCase()==="node":!1}function pn(){return!_n()&&!!ln()}const gn=Fr,mn=Hr;function ft(t,e){const n=mn(e),r=Re();r&&r.setItem(t,n)}function _t(t){let e=null,n=null;const r=Re();return r&&(n=r.getItem(t)),e=n&&gn(n),e}function pt(t){const e=Re();e&&e.removeItem(t)}function Fe(){return Vr.getWindowMetadata()}function bi(t){return Fo(t)}function Ei(t){return pe(t)}function Si(t){return re(t)}function Ci(t){return Ho(pe(t))}const wn=zr;function ve(){return((e,n)=>{for(n=e="";e++<36;n+=e*51&52?(e^15?8^Math.random()*(e^20?16:4):4).toString(16):"-");return n})()}function xi(){console.warn("DEPRECATION WARNING: This WalletConnect client library will be deprecated in favor of @walletconnect/client. Please check docs.walletconnect.org to learn more about this migration!")}function yn(t,e){let n;const r=po[t];return r&&(n=`https://${r}.infura.io/v3/${e}`),n}function vn(t,e){let n;const r=yn(t,e.infuraId);return e.custom&&e.custom[t]?n=e.custom[t]:r&&(n=r),n}function ki(t,e){const n=encodeURIComponent(t);return e.universalLink?`${e.universalLink}/wc?uri=${n}`:e.deepLink?`${e.deepLink}${e.deepLink.endsWith(":")?"//":"/"}wc?uri=${n}`:""}function Ii(t){const e=t.href.split("?")[0];ft(We,Object.assign(Object.assign({},t),{href:e}))}function bn(t,e){return t.filter(n=>n.name.toLowerCase().includes(e.toLowerCase()))[0]}function Ri(t,e){let n=t;return e&&(n=e.map(r=>bn(t,r)).filter(Boolean)),n}function Ti(t,e){return async(...r)=>new Promise((o,i)=>{const l=(f,m)=>{(f===null||typeof f>"u")&&i(f),o(m)};t.apply(e,[...r,l])})}function En(t){const e=t.message||"Failed or Rejected Request";let n=-32e3;if(t&&!t.code)switch(e){case"Parse error":n=-32700;break;case"Invalid request":n=-32600;break;case"Method not found":n=-32601;break;case"Invalid params":n=-32602;break;case"Internal error":n=-32603;break;default:n=-32e3;break}const r={code:n,message:e};return t.data&&(r.data=t.data),r}const Sn="https://registry.walletconnect.com";function Oi(){return Sn+"/api/v2/wallets"}function Ni(){return Sn+"/api/v2/dapps"}function Cn(t,e="mobile"){var n;return{name:t.name||"",shortName:t.metadata.shortName||"",color:t.metadata.colors.primary||"",logo:(n=t.image_url.sm)!==null&&n!==void 0?n:"",universalLink:t[e].universal||"",deepLink:t[e].native||""}}function Mi(t,e="mobile"){return Object.values(t).filter(n=>!!n[e].universal||!!n[e].native).map(n=>Cn(n,e))}var Pe={},Lt;function qi(){return Lt||(Lt=1,function(t){const e=Yr(),n=Zr(),r=Gr(),o=Kr(),i=s=>s==null;function l(s){switch(s.arrayFormat){case"index":return c=>(d,u)=>{const h=d.length;return u===void 0||s.skipNull&&u===null||s.skipEmptyString&&u===""?d:u===null?[...d,[p(c,s),"[",h,"]"].join("")]:[...d,[p(c,s),"[",p(h,s),"]=",p(u,s)].join("")]};case"bracket":return c=>(d,u)=>u===void 0||s.skipNull&&u===null||s.skipEmptyString&&u===""?d:u===null?[...d,[p(c,s),"[]"].join("")]:[...d,[p(c,s),"[]=",p(u,s)].join("")];case"comma":case"separator":return c=>(d,u)=>u==null||u.length===0?d:d.length===0?[[p(c,s),"=",p(u,s)].join("")]:[[d,p(u,s)].join(s.arrayFormatSeparator)];default:return c=>(d,u)=>u===void 0||s.skipNull&&u===null||s.skipEmptyString&&u===""?d:u===null?[...d,p(c,s)]:[...d,[p(c,s),"=",p(u,s)].join("")]}}function f(s){let c;switch(s.arrayFormat){case"index":return(d,u,h)=>{if(c=/\[(\d*)\]$/.exec(d),d=d.replace(/\[\d*\]$/,""),!c){h[d]=u;return}h[d]===void 0&&(h[d]={}),h[d][c[1]]=u};case"bracket":return(d,u,h)=>{if(c=/(\[\])$/.exec(d),d=d.replace(/\[\]$/,""),!c){h[d]=u;return}if(h[d]===void 0){h[d]=[u];return}h[d]=[].concat(h[d],u)};case"comma":case"separator":return(d,u,h)=>{const v=typeof u=="string"&&u.includes(s.arrayFormatSeparator),g=typeof u=="string"&&!v&&E(u,s).includes(s.arrayFormatSeparator);u=g?E(u,s):u;const I=v||g?u.split(s.arrayFormatSeparator).map(Ne=>E(Ne,s)):u===null?u:E(u,s);h[d]=I};default:return(d,u,h)=>{if(h[d]===void 0){h[d]=u;return}h[d]=[].concat(h[d],u)}}}function m(s){if(typeof s!="string"||s.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function p(s,c){return c.encode?c.strict?e(s):encodeURIComponent(s):s}function E(s,c){return c.decode?n(s):s}function S(s){return Array.isArray(s)?s.sort():typeof s=="object"?S(Object.keys(s)).sort((c,d)=>Number(c)-Number(d)).map(c=>s[c]):s}function y(s){const c=s.indexOf("#");return c!==-1&&(s=s.slice(0,c)),s}function x(s){let c="";const d=s.indexOf("#");return d!==-1&&(c=s.slice(d)),c}function j(s){s=y(s);const c=s.indexOf("?");return c===-1?"":s.slice(c+1)}function k(s,c){return c.parseNumbers&&!Number.isNaN(Number(s))&&typeof s=="string"&&s.trim()!==""?s=Number(s):c.parseBooleans&&s!==null&&(s.toLowerCase()==="true"||s.toLowerCase()==="false")&&(s=s.toLowerCase()==="true"),s}function U(s,c){c=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},c),m(c.arrayFormatSeparator);const d=f(c),u=Object.create(null);if(typeof s!="string"||(s=s.trim().replace(/^[?#&]/,""),!s))return u;for(const h of s.split("&")){if(h==="")continue;let[v,g]=r(c.decode?h.replace(/\+/g," "):h,"=");g=g===void 0?null:["comma","separator"].includes(c.arrayFormat)?g:E(g,c),d(E(v,c),g,u)}for(const h of Object.keys(u)){const v=u[h];if(typeof v=="object"&&v!==null)for(const g of Object.keys(v))v[g]=k(v[g],c);else u[h]=k(v,c)}return c.sort===!1?u:(c.sort===!0?Object.keys(u).sort():Object.keys(u).sort(c.sort)).reduce((h,v)=>{const g=u[v];return g&&typeof g=="object"&&!Array.isArray(g)?h[v]=S(g):h[v]=g,h},Object.create(null))}t.extract=j,t.parse=U,t.stringify=(s,c)=>{if(!s)return"";c=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},c),m(c.arrayFormatSeparator);const d=g=>c.skipNull&&i(s[g])||c.skipEmptyString&&s[g]==="",u=l(c),h={};for(const g of Object.keys(s))d(g)||(h[g]=s[g]);const v=Object.keys(h);return c.sort!==!1&&v.sort(c.sort),v.map(g=>{const I=s[g];return I===void 0?"":I===null?p(g,c):Array.isArray(I)?I.reduce(u(g),[]).join("&"):p(g,c)+"="+p(I,c)}).filter(g=>g.length>0).join("&")},t.parseUrl=(s,c)=>{c=Object.assign({decode:!0},c);const[d,u]=r(s,"#");return Object.assign({url:d.split("?")[0]||"",query:U(j(s),c)},c&&c.parseFragmentIdentifier&&u?{fragmentIdentifier:E(u,c)}:{})},t.stringifyUrl=(s,c)=>{c=Object.assign({encode:!0,strict:!0},c);const d=y(s.url).split("?")[0]||"",u=t.extract(s.url),h=t.parse(u,{sort:!1}),v=Object.assign(h,s.query);let g=t.stringify(v,c);g&&(g=`?${g}`);let I=x(s.url);return s.fragmentIdentifier&&(I=`#${p(s.fragmentIdentifier,c)}`),`${d}${g}${I}`},t.pick=(s,c,d)=>{d=Object.assign({parseFragmentIdentifier:!0},d);const{url:u,query:h,fragmentIdentifier:v}=t.parseUrl(s,d);return t.stringifyUrl({url:u,query:o(h,c),fragmentIdentifier:v},d)},t.exclude=(s,c,d)=>{const u=Array.isArray(c)?h=>!c.includes(h):(h,v)=>!c(h,v);return t.pick(s,u,d)}}(Pe)),Pe}var xn=qi();function kn(t){const e=t.indexOf("?")!==-1?t.indexOf("?"):void 0;return typeof e<"u"?t.substr(e):""}function In(t,e){let n=gt(t);return n=Object.assign(Object.assign({},n),e),t=Rn(n),t}function gt(t){return xn.parse(t)}function Rn(t){return xn.stringify(t)}function Tn(t){return typeof t.bridge<"u"}function On(t){const e=t.indexOf(":"),n=t.indexOf("?")!==-1?t.indexOf("?"):void 0,r=t.substring(0,e),o=t.substring(e+1,n);function i(S){const x=S.split("@");return{handshakeTopic:x[0],version:parseInt(x[1],10)}}const l=i(o),f=typeof n<"u"?t.substr(n):"";function m(S){const y=gt(S);return{key:y.key||"",bridge:y.bridge||""}}const p=m(f);return Object.assign(Object.assign({protocol:r},l),p)}function Li(t){return t===""||typeof t=="string"&&t.trim()===""}function Ai(t){return!(t&&t.length)}function Ui(t){return Ie(t)}function Pi(t){return dt(t)}function Di(t){return nn(t)}function ji(t){return Po(t)}function $i(t){return Do(t)}function Bi(t,e){return tn(t,e)}function Wi(t){return typeof t.params=="object"}function Nn(t){return typeof t.method<"u"}function X(t){return typeof t.result<"u"}function he(t){return typeof t.error<"u"}function He(t){return typeof t.event<"u"}function Mn(t){return fo.includes(t)||t.startsWith("wc_")}function qn(t){return t.method.startsWith("wc_")?!0:!nt.includes(t.method)}const Fi=Object.freeze(Object.defineProperty({__proto__:null,addHexPrefix:Ei,appendToQueryString:In,concatArrayBuffers:Yo,concatBuffers:ti,convertArrayBufferToBuffer:Ee,convertArrayBufferToHex:on,convertArrayBufferToNumber:Ko,convertArrayBufferToUtf8:Go,convertBufferToArrayBuffer:sn,convertBufferToHex:Xo,convertBufferToNumber:ei,convertBufferToUtf8:Zo,convertHexToArrayBuffer:an,convertHexToBuffer:si,convertHexToNumber:ci,convertHexToUtf8:ai,convertNumberToArrayBuffer:ui,convertNumberToBuffer:li,convertNumberToHex:cn,convertNumberToUtf8:di,convertUtf8ToArrayBuffer:ni,convertUtf8ToBuffer:ri,convertUtf8ToHex:oi,convertUtf8ToNumber:ii,detectEnv:Te,detectOS:Oe,formatIOSMobile:ki,formatMobileRegistry:Mi,formatMobileRegistryEntry:Cn,formatQueryString:Rn,formatRpcError:En,getClientMeta:Fe,getCrypto:yi,getCryptoOrThrow:wi,getDappRegistryUrl:Ni,getDocument:pi,getDocumentOrThrow:_i,getEncoding:$i,getFromWindow:hi,getFromWindowOrThrow:fi,getInfuraRpcUrl:yn,getLocal:_t,getLocalStorage:Re,getLocalStorageOrThrow:vi,getLocation:un,getLocationOrThrow:mi,getMobileLinkRegistry:Ri,getMobileRegistryEntry:bn,getNavigator:ln,getNavigatorOrThrow:gi,getQueryString:kn,getRpcUrl:vn,getType:ji,getWalletRegistryUrl:Oi,isAndroid:dn,isArrayBuffer:Di,isBrowser:pn,isBuffer:Ui,isEmptyArray:Ai,isEmptyString:Li,isHexString:Bi,isIOS:hn,isInternalEvent:He,isJsonRpcRequest:Nn,isJsonRpcResponseError:he,isJsonRpcResponseSuccess:X,isJsonRpcSubscription:Wi,isMobile:fn,isNode:_n,isReservedEvent:Mn,isSilentPayload:qn,isTypedArray:Pi,isWalletConnectSession:Tn,logDeprecationWarning:xi,parseQueryString:gt,parseWalletConnectUri:On,payloadId:wn,promisify:Ti,removeHexLeadingZeros:Ci,removeHexPrefix:Si,removeLocal:pt,safeJsonParse:gn,safeJsonStringify:mn,sanitizeHex:bi,saveMobileLinkInfo:Ii,setLocal:ft,uuid:ve},Symbol.toStringTag,{value:"Module"}));class Hi{constructor(){this._eventEmitters=[],typeof window<"u"&&typeof window.addEventListener<"u"&&(window.addEventListener("online",()=>this.trigger("online")),window.addEventListener("offline",()=>this.trigger("offline")))}on(e,n){this._eventEmitters.push({event:e,callback:n})}trigger(e){let n=[];e&&(n=this._eventEmitters.filter(r=>r.event===e)),n.forEach(r=>{r.callback()})}}const zi=typeof global.WebSocket<"u"?global.WebSocket:require("ws");class Qi{constructor(e){if(this.opts=e,this._queue=[],this._events=[],this._subscriptions=[],this._protocol=e.protocol,this._version=e.version,this._url="",this._netMonitor=null,this._socket=null,this._nextSocket=null,this._subscriptions=e.subscriptions||[],this._netMonitor=e.netMonitor||new Hi,!e.url||typeof e.url!="string")throw new Error("Missing or invalid WebSocket url");this._url=e.url,this._netMonitor.on("online",()=>this._socketCreate())}set readyState(e){}get readyState(){return this._socket?this._socket.readyState:-1}set connecting(e){}get connecting(){return this.readyState===0}set connected(e){}get connected(){return this.readyState===1}set closing(e){}get closing(){return this.readyState===2}set closed(e){}get closed(){return this.readyState===3}open(){this._socketCreate()}close(){this._socketClose()}send(e,n,r){if(!n||typeof n!="string")throw new Error("Missing or invalid topic field");this._socketSend({topic:n,type:"pub",payload:e,silent:!!r})}subscribe(e){this._socketSend({topic:e,type:"sub",payload:"",silent:!0})}on(e,n){this._events.push({event:e,callback:n})}_socketCreate(){if(this._nextSocket)return;const e=Ji(this._url,this._protocol,this._version);if(this._nextSocket=new zi(e),!this._nextSocket)throw new Error("Failed to create socket");this._nextSocket.onmessage=n=>this._socketReceive(n),this._nextSocket.onopen=()=>this._socketOpen(),this._nextSocket.onerror=n=>this._socketError(n),this._nextSocket.onclose=()=>{setTimeout(()=>{this._nextSocket=null,this._socketCreate()},1e3)}}_socketOpen(){this._socketClose(),this._socket=this._nextSocket,this._nextSocket=null,this._queueSubscriptions(),this._pushQueue()}_socketClose(){this._socket&&(this._socket.onclose=()=>{},this._socket.close())}_socketSend(e){const n=JSON.stringify(e);this._socket&&this._socket.readyState===1?this._socket.send(n):(this._setToQueue(e),this._socketCreate())}async _socketReceive(e){let n;try{n=JSON.parse(e.data)}catch{return}if(this._socketSend({topic:n.topic,type:"ack",payload:"",silent:!0}),this._socket&&this._socket.readyState===1){const r=this._events.filter(o=>o.event==="message");r&&r.length&&r.forEach(o=>o.callback(n))}}_socketError(e){const n=this._events.filter(r=>r.event==="error");n&&n.length&&n.forEach(r=>r.callback(e))}_queueSubscriptions(){this._subscriptions.forEach(n=>this._queue.push({topic:n,type:"sub",payload:"",silent:!0})),this._subscriptions=this.opts.subscriptions||[]}_setToQueue(e){this._queue.push(e)}_pushQueue(){this._queue.forEach(n=>this._socketSend(n)),this._queue=[]}}function Ji(t,e,n){var r,o;const l=(t.startsWith("https")?t.replace("https","wss"):t.startsWith("http")?t.replace("http","ws"):t).split("?"),f=pn()?{protocol:e,version:n,env:"browser",host:((r=un())===null||r===void 0?void 0:r.host)||""}:{protocol:e,version:n,env:((o=Te())===null||o===void 0?void 0:o.name)||""},m=In(kn(l[1]||""),f);return l[0]+"?"+m}class Vi{constructor(){this._eventEmitters=[]}subscribe(e){this._eventEmitters.push(e)}unsubscribe(e){this._eventEmitters=this._eventEmitters.filter(n=>n.event!==e)}trigger(e){let n=[],r;Nn(e)?r=e.method:X(e)||he(e)?r=`response:${e.id}`:He(e)?r=e.event:r="",r&&(n=this._eventEmitters.filter(o=>o.event===r)),(!n||!n.length)&&!Mn(r)&&!He(r)&&(n=this._eventEmitters.filter(o=>o.event==="call_request")),n.forEach(o=>{if(he(e)){const i=new Error(e.error.message);o.callback(i,null)}else o.callback(null,e)})}}class Gi{constructor(e="walletconnect"){this.storageId=e}getSession(){let e=null;const n=_t(this.storageId);return n&&Tn(n)&&(e=n),e}setSession(e){return ft(this.storageId,e),e}removeSession(){pt(this.storageId)}}const Ki="walletconnect.org",Yi="abcdefghijklmnopqrstuvwxyz0123456789",Ln=Yi.split("").map(t=>`https://${t}.bridge.walletconnect.org`);function Zi(t){let e=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0];return e=e.split(":")[0],e=e.split("?")[0],e}function Xi(t){return Zi(t).split(".").slice(-2).join(".")}function es(){return Math.floor(Math.random()*Ln.length)}function ts(){return Ln[es()]}function ns(t){return Xi(t)===Ki}function rs(t){return ns(t)?ts():t}class os{constructor(e){if(this.protocol="wc",this.version=1,this._bridge="",this._key=null,this._clientId="",this._clientMeta=null,this._peerId="",this._peerMeta=null,this._handshakeId=0,this._handshakeTopic="",this._connected=!1,this._accounts=[],this._chainId=0,this._networkId=0,this._rpcUrl="",this._eventManager=new Vi,this._clientMeta=Fe()||e.connectorOpts.clientMeta||null,this._cryptoLib=e.cryptoLib,this._sessionStorage=e.sessionStorage||new Gi(e.connectorOpts.storageId),this._qrcodeModal=e.connectorOpts.qrcodeModal,this._qrcodeModalOptions=e.connectorOpts.qrcodeModalOptions,this._signingMethods=[...nt,...e.connectorOpts.signingMethods||[]],!e.connectorOpts.bridge&&!e.connectorOpts.uri&&!e.connectorOpts.session)throw new Error(lo);e.connectorOpts.bridge&&(this.bridge=rs(e.connectorOpts.bridge)),e.connectorOpts.uri&&(this.uri=e.connectorOpts.uri);const n=e.connectorOpts.session||this._getStorageSession();n&&(this.session=n),this.handshakeId&&this._subscribeToSessionResponse(this.handshakeId,"Session request rejected"),this._transport=e.transport||new Qi({protocol:this.protocol,version:this.version,url:this.bridge,subscriptions:[this.clientId]}),this._subscribeToInternalEvents(),this._initTransport(),e.connectorOpts.uri&&this._subscribeToSessionRequest(),e.pushServerOpts&&this._registerPushServer(e.pushServerOpts)}set bridge(e){e&&(this._bridge=e)}get bridge(){return this._bridge}set key(e){if(!e)return;const n=an(e);this._key=n}get key(){return this._key?on(this._key,!0):""}set clientId(e){e&&(this._clientId=e)}get clientId(){let e=this._clientId;return e||(e=this._clientId=ve()),this._clientId}set peerId(e){e&&(this._peerId=e)}get peerId(){return this._peerId}set clientMeta(e){}get clientMeta(){let e=this._clientMeta;return e||(e=this._clientMeta=Fe()),e}set peerMeta(e){this._peerMeta=e}get peerMeta(){return this._peerMeta}set handshakeTopic(e){e&&(this._handshakeTopic=e)}get handshakeTopic(){return this._handshakeTopic}set handshakeId(e){e&&(this._handshakeId=e)}get handshakeId(){return this._handshakeId}get uri(){return this._formatUri()}set uri(e){if(!e)return;const{handshakeTopic:n,bridge:r,key:o}=this._parseUri(e);this.handshakeTopic=n,this.bridge=r,this.key=o}set chainId(e){this._chainId=e}get chainId(){return this._chainId}set networkId(e){this._networkId=e}get networkId(){return this._networkId}set accounts(e){this._accounts=e}get accounts(){return this._accounts}set rpcUrl(e){this._rpcUrl=e}get rpcUrl(){return this._rpcUrl}set connected(e){}get connected(){return this._connected}set pending(e){}get pending(){return!!this._handshakeTopic}get session(){return{connected:this.connected,accounts:this.accounts,chainId:this.chainId,bridge:this.bridge,key:this.key,clientId:this.clientId,clientMeta:this.clientMeta,peerId:this.peerId,peerMeta:this.peerMeta,handshakeId:this.handshakeId,handshakeTopic:this.handshakeTopic}}set session(e){e&&(this._connected=e.connected,this.accounts=e.accounts,this.chainId=e.chainId,this.bridge=e.bridge,this.key=e.key,this.clientId=e.clientId,this.clientMeta=e.clientMeta,this.peerId=e.peerId,this.peerMeta=e.peerMeta,this.handshakeId=e.handshakeId,this.handshakeTopic=e.handshakeTopic)}on(e,n){const r={event:e,callback:n};this._eventManager.subscribe(r)}off(e){this._eventManager.unsubscribe(e)}async createInstantRequest(e){this._key=await this._generateKey();const n=this._formatRequest({method:"wc_instantRequest",params:[{peerId:this.clientId,peerMeta:this.clientMeta,request:this._formatRequest(e)}]});this.handshakeId=n.id,this.handshakeTopic=ve(),this._eventManager.trigger({event:"display_uri",params:[this.uri]}),this.on("modal_closed",()=>{throw new Error(Nt)});const r=()=>{this.killSession()};try{const o=await this._sendCallRequest(n);return o&&r(),o}catch(o){throw r(),o}}async connect(e){if(!this._qrcodeModal)throw new Error(ho);return this.connected?{chainId:this.chainId,accounts:this.accounts}:(await this.createSession(e),new Promise(async(n,r)=>{this.on("modal_closed",()=>r(new Error(Nt))),this.on("connect",(o,i)=>{if(o)return r(o);n(i.params[0])})}))}async createSession(e){if(this._connected)throw new Error(Le);if(this.pending)return;this._key=await this._generateKey();const n=this._formatRequest({method:"wc_sessionRequest",params:[{peerId:this.clientId,peerMeta:this.clientMeta,chainId:e&&e.chainId?e.chainId:null}]});this.handshakeId=n.id,this.handshakeTopic=ve(),this._sendSessionRequest(n,"Session update rejected",{topic:this.handshakeTopic}),this._eventManager.trigger({event:"display_uri",params:[this.uri]})}approveSession(e){if(this._connected)throw new Error(Le);this.chainId=e.chainId,this.accounts=e.accounts,this.networkId=e.networkId||0,this.rpcUrl=e.rpcUrl||"";const n={approved:!0,chainId:this.chainId,networkId:this.networkId,accounts:this.accounts,rpcUrl:this.rpcUrl,peerId:this.clientId,peerMeta:this.clientMeta},r={id:this.handshakeId,jsonrpc:"2.0",result:n};this._sendResponse(r),this._connected=!0,this._setStorageSession(),this._eventManager.trigger({event:"connect",params:[{peerId:this.peerId,peerMeta:this.peerMeta,chainId:this.chainId,accounts:this.accounts}]})}rejectSession(e){if(this._connected)throw new Error(Le);const n=e&&e.message?e.message:ro,r=this._formatResponse({id:this.handshakeId,error:{message:n}});this._sendResponse(r),this._connected=!1,this._eventManager.trigger({event:"disconnect",params:[{message:n}]}),this._removeStorageSession()}updateSession(e){if(!this._connected)throw new Error(Q);this.chainId=e.chainId,this.accounts=e.accounts,this.networkId=e.networkId||0,this.rpcUrl=e.rpcUrl||"";const n={approved:!0,chainId:this.chainId,networkId:this.networkId,accounts:this.accounts,rpcUrl:this.rpcUrl},r=this._formatRequest({method:"wc_sessionUpdate",params:[n]});this._sendSessionRequest(r,"Session update rejected"),this._eventManager.trigger({event:"session_update",params:[{chainId:this.chainId,accounts:this.accounts}]}),this._manageStorageSession()}async killSession(e){const n=e?e.message:"Session Disconnected",r={approved:!1,chainId:null,networkId:null,accounts:null},o=this._formatRequest({method:"wc_sessionUpdate",params:[r]});await this._sendRequest(o),this._handleSessionDisconnect(n)}async sendTransaction(e){if(!this._connected)throw new Error(Q);const n=e,r=this._formatRequest({method:"eth_sendTransaction",params:[n]});return await this._sendCallRequest(r)}async signTransaction(e){if(!this._connected)throw new Error(Q);const n=e,r=this._formatRequest({method:"eth_signTransaction",params:[n]});return await this._sendCallRequest(r)}async signMessage(e){if(!this._connected)throw new Error(Q);const n=this._formatRequest({method:"eth_sign",params:e});return await this._sendCallRequest(n)}async signPersonalMessage(e){if(!this._connected)throw new Error(Q);const n=this._formatRequest({method:"personal_sign",params:e});return await this._sendCallRequest(n)}async signTypedData(e){if(!this._connected)throw new Error(Q);const n=this._formatRequest({method:"eth_signTypedData",params:e});return await this._sendCallRequest(n)}async updateChain(e){if(!this._connected)throw new Error("Session currently disconnected");const n=this._formatRequest({method:"wallet_updateChain",params:[e]});return await this._sendCallRequest(n)}unsafeSend(e,n){return this._sendRequest(e,n),this._eventManager.trigger({event:"call_request_sent",params:[{request:e,options:n}]}),new Promise((r,o)=>{this._subscribeToResponse(e.id,(i,l)=>{if(i){o(i);return}if(!l)throw new Error(oo);r(l)})})}async sendCustomRequest(e,n){if(!this._connected)throw new Error(Q);switch(e.method){case"eth_accounts":return this.accounts;case"eth_chainId":return cn(this.chainId);case"eth_sendTransaction":case"eth_signTransaction":e.params;break;case"personal_sign":e.params;break}const r=this._formatRequest(e);return await this._sendCallRequest(r,n)}approveRequest(e){if(X(e)){const n=this._formatResponse(e);this._sendResponse(n)}else throw new Error(io)}rejectRequest(e){if(he(e)){const n=this._formatResponse(e);this._sendResponse(n)}else throw new Error(so)}transportClose(){this._transport.close()}async _sendRequest(e,n){const r=this._formatRequest(e),o=await this._encrypt(r),i=typeof(n==null?void 0:n.topic)<"u"?n.topic:this.peerId,l=JSON.stringify(o),f=typeof(n==null?void 0:n.forcePushNotification)<"u"?!n.forcePushNotification:qn(r);this._transport.send(l,i,f)}async _sendResponse(e){const n=await this._encrypt(e),r=this.peerId,o=JSON.stringify(n);this._transport.send(o,r,!0)}async _sendSessionRequest(e,n,r){this._sendRequest(e,r),this._subscribeToSessionResponse(e.id,n)}_sendCallRequest(e,n){return this._sendRequest(e,n),this._eventManager.trigger({event:"call_request_sent",params:[{request:e,options:n}]}),this._subscribeToCallResponse(e.id)}_formatRequest(e){if(typeof e.method>"u")throw new Error(ao);return{id:typeof e.id>"u"?wn():e.id,jsonrpc:"2.0",method:e.method,params:typeof e.params>"u"?[]:e.params}}_formatResponse(e){if(typeof e.id>"u")throw new Error(co);const n={id:e.id,jsonrpc:"2.0"};if(he(e)){const r=En(e.error);return Object.assign(Object.assign(Object.assign({},n),e),{error:r})}else if(X(e))return Object.assign(Object.assign({},n),e);throw new Error(Ot)}_handleSessionDisconnect(e){const n=e||"Session Disconnected";this._connected||(this._qrcodeModal&&this._qrcodeModal.close(),pt(We)),this._connected&&(this._connected=!1),this._handshakeId&&(this._handshakeId=0),this._handshakeTopic&&(this._handshakeTopic=""),this._peerId&&(this._peerId=""),this._eventManager.trigger({event:"disconnect",params:[{message:n}]}),this._removeStorageSession(),this.transportClose()}_handleSessionResponse(e,n){n?n.approved?(this._connected?(n.chainId&&(this.chainId=n.chainId),n.accounts&&(this.accounts=n.accounts),this._eventManager.trigger({event:"session_update",params:[{chainId:this.chainId,accounts:this.accounts}]})):(this._connected=!0,n.chainId&&(this.chainId=n.chainId),n.accounts&&(this.accounts=n.accounts),n.peerId&&!this.peerId&&(this.peerId=n.peerId),n.peerMeta&&!this.peerMeta&&(this.peerMeta=n.peerMeta),this._eventManager.trigger({event:"connect",params:[{peerId:this.peerId,peerMeta:this.peerMeta,chainId:this.chainId,accounts:this.accounts}]})),this._manageStorageSession()):this._handleSessionDisconnect(e):this._handleSessionDisconnect(e)}async _handleIncomingMessages(e){if(![this.clientId,this.handshakeTopic].includes(e.topic))return;let r;try{r=JSON.parse(e.payload)}catch{return}const o=await this._decrypt(r);o&&this._eventManager.trigger(o)}_subscribeToSessionRequest(){this._transport.subscribe(this.handshakeTopic)}_subscribeToResponse(e,n){this.on(`response:${e}`,n)}_subscribeToSessionResponse(e,n){this._subscribeToResponse(e,(r,o)=>{if(r){this._handleSessionResponse(r.message);return}X(o)?this._handleSessionResponse(n,o.result):o.error&&o.error.message?this._handleSessionResponse(o.error.message):this._handleSessionResponse(n)})}_subscribeToCallResponse(e){return new Promise((n,r)=>{this._subscribeToResponse(e,(o,i)=>{if(o){r(o);return}X(i)?n(i.result):i.error&&i.error.message?r(i.error):r(new Error(Ot))})})}_subscribeToInternalEvents(){this.on("display_uri",()=>{this._qrcodeModal&&this._qrcodeModal.open(this.uri,()=>{this._eventManager.trigger({event:"modal_closed",params:[]})},this._qrcodeModalOptions)}),this.on("connect",()=>{this._qrcodeModal&&this._qrcodeModal.close()}),this.on("call_request_sent",(e,n)=>{const{request:r}=n.params[0];if(fn()&&this._signingMethods.includes(r.method)){const o=_t(We);o&&(window.location.href=o.href)}}),this.on("wc_sessionRequest",(e,n)=>{e&&this._eventManager.trigger({event:"error",params:[{code:"SESSION_REQUEST_ERROR",message:e.toString()}]}),this.handshakeId=n.id,this.peerId=n.params[0].peerId,this.peerMeta=n.params[0].peerMeta;const r=Object.assign(Object.assign({},n),{method:"session_request"});this._eventManager.trigger(r)}),this.on("wc_sessionUpdate",(e,n)=>{e&&this._handleSessionResponse(e.message),this._handleSessionResponse("Session disconnected",n.params[0])})}_initTransport(){this._transport.on("message",e=>this._handleIncomingMessages(e)),this._transport.on("open",()=>this._eventManager.trigger({event:"transport_open",params:[]})),this._transport.on("close",()=>this._eventManager.trigger({event:"transport_close",params:[]})),this._transport.on("error",()=>this._eventManager.trigger({event:"transport_error",params:["Websocket connection failed"]})),this._transport.open()}_formatUri(){const e=this.protocol,n=this.handshakeTopic,r=this.version,o=encodeURIComponent(this.bridge),i=this.key;return`${e}:${n}@${r}?bridge=${o}&key=${i}`}_parseUri(e){const n=On(e);if(n.protocol===this.protocol){if(!n.handshakeTopic)throw Error("Invalid or missing handshakeTopic parameter value");const r=n.handshakeTopic;if(!n.bridge)throw Error("Invalid or missing bridge url parameter value");const o=decodeURIComponent(n.bridge);if(!n.key)throw Error("Invalid or missing key parameter value");const i=n.key;return{handshakeTopic:r,bridge:o,key:i}}else throw new Error(uo)}async _generateKey(){return this._cryptoLib?await this._cryptoLib.generateKey():null}async _encrypt(e){const n=this._key;return this._cryptoLib&&n?await this._cryptoLib.encrypt(e,n):null}async _decrypt(e){const n=this._key;return this._cryptoLib&&n?await this._cryptoLib.decrypt(e,n):null}_getStorageSession(){let e=null;return this._sessionStorage&&(e=this._sessionStorage.getSession()),e}_setStorageSession(){this._sessionStorage&&this._sessionStorage.setSession(this.session)}_removeStorageSession(){this._sessionStorage&&this._sessionStorage.removeSession()}_manageStorageSession(){this._connected?this._setStorageSession():this._removeStorageSession()}_registerPushServer(e){if(!e.url||typeof e.url!="string")throw Error("Invalid or missing pushServerOpts.url parameter value");if(!e.type||typeof e.type!="string")throw Error("Invalid or missing pushServerOpts.type parameter value");if(!e.token||typeof e.token!="string")throw Error("Invalid or missing pushServerOpts.token parameter value");const n={bridge:this.bridge,topic:this.clientId,type:e.type,token:e.token,peerName:"",language:e.language||""};this.on("connect",async(r,o)=>{if(r)throw r;if(e.peerMeta){const i=o.params[0].peerMeta.name;n.peerName=i}try{if(!(await(await fetch(`${e.url}/new`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})).json()).success)throw Error("Failed to register in Push Server")}catch{throw Error("Failed to register in Push Server")}})}}function is(t){return fe.getBrowerCrypto().getRandomValues(new Uint8Array(t))}const An=256,Un=An,ss=An,F="AES-CBC",as=`SHA-${Un}`,ze="HMAC",cs="encrypt",ls="decrypt",us="sign",ds="verify";function hs(t){return t===F?{length:Un,name:F}:{hash:{name:as},name:ze}}function fs(t){return t===F?[cs,ls]:[us,ds]}async function mt(t,e=F){return fe.getSubtleCrypto().importKey("raw",t,hs(e),!0,fs(e))}async function _s(t,e,n){const r=fe.getSubtleCrypto(),o=await mt(e,F),i=await r.encrypt({iv:t,name:F},o,n);return new Uint8Array(i)}async function ps(t,e,n){const r=fe.getSubtleCrypto(),o=await mt(e,F),i=await r.decrypt({iv:t,name:F},o,n);return new Uint8Array(i)}async function gs(t,e){const n=fe.getSubtleCrypto(),r=await mt(t,ze),o=await n.sign({length:ss,name:ze},r,e);return new Uint8Array(o)}function ms(t,e,n){return _s(t,e,n)}function ws(t,e,n){return ps(t,e,n)}async function Pn(t,e){return await gs(t,e)}async function Dn(t){const e=(t||256)/8,n=is(e);return sn(oe(n))}async function jn(t,e){const n=W(t.data),r=W(t.iv),o=W(t.hmac),i=B(o,!1),l=rn(n,r),f=await Pn(e,l),m=B(f,!1);return re(i)===re(m)}async function ys(t,e,n){const r=ne(Ee(e)),o=n||await Dn(128),i=ne(Ee(o)),l=B(i,!1),f=JSON.stringify(t),m=en(f),p=await ms(i,r,m),E=B(p,!1),S=rn(p,i),y=await Pn(r,S),x=B(y,!1);return{data:E,hmac:x,iv:l}}async function vs(t,e){const n=ne(Ee(e));if(!n)throw new Error("Missing key: required for decryption");if(!await jn(t,n))return null;const o=W(t.data),i=W(t.iv),l=await ws(i,n,o),f=Zt(l);let m;try{m=JSON.parse(f)}catch{return null}return m}const bs=Object.freeze(Object.defineProperty({__proto__:null,decrypt:vs,encrypt:ys,generateKey:Dn,verifyHmac:jn},Symbol.toStringTag,{value:"Module"}));class Es extends os{constructor(e,n){super({cryptoLib:bs,connectorOpts:e,pushServerOpts:n})}}const Ss=Jt(Fi);var De,At;function Cs(){return At||(At=1,De=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,n=[],r=0;r<t.rangeCount;r++)n.push(t.getRangeAt(r));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||n.forEach(function(o){t.addRange(o)}),e&&e.focus()}}),De}var je,Ut;function xs(){if(Ut)return je;Ut=1;var t=Cs(),e={"text/plain":"Text","text/html":"Url",default:"Text"},n="Copy to clipboard: #{key}, Enter";function r(i){var l=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return i.replace(/#{\s*key\s*}/g,l)}function o(i,l){var f,m,p,E,S,y,x=!1;l||(l={}),f=l.debug||!1;try{p=t(),E=document.createRange(),S=document.getSelection(),y=document.createElement("span"),y.textContent=i,y.ariaHidden="true",y.style.all="unset",y.style.position="fixed",y.style.top=0,y.style.clip="rect(0, 0, 0, 0)",y.style.whiteSpace="pre",y.style.webkitUserSelect="text",y.style.MozUserSelect="text",y.style.msUserSelect="text",y.style.userSelect="text",y.addEventListener("copy",function(k){if(k.stopPropagation(),l.format)if(k.preventDefault(),typeof k.clipboardData>"u"){f&&console.warn("unable to use e.clipboardData"),f&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var U=e[l.format]||e.default;window.clipboardData.setData(U,i)}else k.clipboardData.clearData(),k.clipboardData.setData(l.format,i);l.onCopy&&(k.preventDefault(),l.onCopy(k.clipboardData))}),document.body.appendChild(y),E.selectNodeContents(y),S.addRange(E);var j=document.execCommand("copy");if(!j)throw new Error("copy command was unsuccessful");x=!0}catch(k){f&&console.error("unable to copy using execCommand: ",k),f&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(l.format||"text",i),l.onCopy&&l.onCopy(window.clipboardData),x=!0}catch(U){f&&console.error("unable to copy using clipboardData: ",U),f&&console.error("falling back to prompt"),m=r("message"in l?l.message:n),window.prompt(m,i)}}finally{S&&(typeof S.removeRange=="function"?S.removeRange(E):S.removeAllRanges()),y&&document.body.removeChild(y),p()}return x}return je=o,je}function $n(t,e){for(var n in e)t[n]=e[n];return t}function Qe(t,e){for(var n in t)if(n!=="__source"&&!(n in e))return!0;for(var r in e)if(r!=="__source"&&t[r]!==e[r])return!0;return!1}function wt(t,e){var n=e(),r=Ce({t:{__:n,u:e}}),o=r[0].t,i=r[1];return _e(function(){o.__=n,o.u=e,$e(o)&&i({t:o})},[t,n,e]),xe(function(){return $e(o)&&i({t:o}),t(function(){$e(o)&&i({t:o})})},[t]),n}function $e(t){var e,n,r=t.u,o=t.__;try{var i=r();return!((e=o)===(n=i)&&(e!==0||1/e==1/n)||e!=e&&n!=n)}catch{return!0}}function yt(t){t()}function vt(t){return t}function bt(){return[!1,yt]}var Et=_e;function Se(t,e){this.props=t,this.context=e}function Bn(t,e){function n(o){var i=this.props.ref,l=i==o.ref;return!l&&i&&(i.call?i(null):i.current=null),e?!e(this.props,o)||!l:Qe(this.props,o)}function r(o){return this.shouldComponentUpdate=n,D(t,o)}return r.displayName="Memo("+(t.displayName||t.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(Se.prototype=new J).isPureReactComponent=!0,Se.prototype.shouldComponentUpdate=function(t,e){return Qe(this.props,t)||Qe(this.state,e)};var Pt=T.__b;T.__b=function(t){t.type&&t.type.__f&&t.ref&&(t.props.ref=t.ref,t.ref=null),Pt&&Pt(t)};var ks=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function Wn(t){function e(n){var r=$n({},n);return delete r.ref,t(r,n.ref||null)}return e.$$typeof=ks,e.render=e,e.prototype.isReactComponent=e.__f=!0,e.displayName="ForwardRef("+(t.displayName||t.name)+")",e}var Dt=function(t,e){return t==null?null:$($(t).map(e))},Fn={map:Dt,forEach:Dt,count:function(t){return t?$(t).length:0},only:function(t){var e=$(t);if(e.length!==1)throw"Children.only";return e[0]},toArray:$},Is=T.__e;T.__e=function(t,e,n,r){if(t.then){for(var o,i=e;i=i.__;)if((o=i.__c)&&o.__c)return e.__e==null&&(e.__e=n.__e,e.__k=n.__k),o.__c(t,e)}Is(t,e,n,r)};var jt=T.unmount;function Hn(t,e,n){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(r){typeof r.__c=="function"&&r.__c()}),t.__c.__H=null),(t=$n({},t)).__c!=null&&(t.__c.__P===n&&(t.__c.__P=e),t.__c.__e=!0,t.__c=null),t.__k=t.__k&&t.__k.map(function(r){return Hn(r,e,n)})),t}function zn(t,e,n){return t&&n&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(r){return zn(r,e,n)}),t.__c&&t.__c.__P===e&&(t.__e&&n.appendChild(t.__e),t.__c.__e=!0,t.__c.__P=n)),t}function de(){this.__u=0,this.o=null,this.__b=null}function Qn(t){var e=t.__.__c;return e&&e.__a&&e.__a(t)}function Jn(t){var e,n,r;function o(i){if(e||(e=t()).then(function(l){n=l.default||l},function(l){r=l}),r)throw r;if(!n)throw e;return D(n,i)}return o.displayName="Lazy",o.__f=!0,o}function ee(){this.i=null,this.l=null}T.unmount=function(t){var e=t.__c;e&&e.__R&&e.__R(),e&&32&t.__u&&(t.type=null),jt&&jt(t)},(de.prototype=new J).__c=function(t,e){var n=e.__c,r=this;r.o==null&&(r.o=[]),r.o.push(n);var o=Qn(r.__v),i=!1,l=function(){i||(i=!0,n.__R=null,o?o(f):f())};n.__R=l;var f=function(){if(!--r.__u){if(r.state.__a){var m=r.state.__a;r.__v.__k[0]=zn(m,m.__c.__P,m.__c.__O)}var p;for(r.setState({__a:r.__b=null});p=r.o.pop();)p.forceUpdate()}};r.__u++||32&e.__u||r.setState({__a:r.__b=r.__v.__k[0]}),t.then(l,l)},de.prototype.componentWillUnmount=function(){this.o=[]},de.prototype.render=function(t,e){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=Hn(this.__b,n,r.__O=r.__P)}this.__b=null}var o=e.__a&&D(te,null,t.fallback);return o&&(o.__u&=-33),[D(te,null,e.__a?null:t.children),o]};var $t=function(t,e,n){if(++n[1]===n[0]&&t.l.delete(e),t.props.revealOrder&&(t.props.revealOrder[0]!=="t"||!t.l.size))for(n=t.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;t.i=n=n[2]}};function Rs(t){return this.getChildContext=function(){return t.context},t.children}function Ts(t){var e=this,n=t.h;if(e.componentWillUnmount=function(){be(null,e.v),e.v=null,e.h=null},e.h&&e.h!==n&&e.componentWillUnmount(),!e.v){for(var r=e.__v;r!==null&&!r.__m&&r.__!==null;)r=r.__;e.h=n,e.v={nodeType:1,parentNode:n,childNodes:[],__k:{__m:r.__m},contains:function(){return!0},insertBefore:function(o,i){this.childNodes.push(o),e.h.insertBefore(o,i)},removeChild:function(o){this.childNodes.splice(this.childNodes.indexOf(o)>>>1,1),e.h.removeChild(o)}}}be(D(Rs,{context:e.context},t.__v),e.v)}function Vn(t,e){var n=D(Ts,{__v:t,h:e});return n.containerInfo=e,n}(ee.prototype=new J).__a=function(t){var e=this,n=Qn(e.__v),r=e.l.get(t);return r[0]++,function(o){var i=function(){e.props.revealOrder?(r.push(o),$t(e,t,r)):o()};n?n(i):i()}},ee.prototype.render=function(t){this.i=null,this.l=new Map;var e=$(t.children);t.revealOrder&&t.revealOrder[0]==="b"&&e.reverse();for(var n=e.length;n--;)this.l.set(e[n],this.i=[1,0,this.i]);return t.children},ee.prototype.componentDidUpdate=ee.prototype.componentDidMount=function(){var t=this;this.l.forEach(function(e,n){$t(t,n,e)})};var Gn=typeof Symbol<"u"&&Symbol.for&&Symbol.for("react.element")||60103,Os=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ns=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Ms=/[A-Z0-9]/g,qs=typeof document<"u",Ls=function(t){return(typeof Symbol<"u"&&typeof Symbol()=="symbol"?/fil|che|rad/:/fil|che|ra/).test(t)};function Kn(t,e,n){return e.__k==null&&(e.textContent=""),be(t,e),typeof n=="function"&&n(),t?t.__c:null}function Yn(t,e,n){return to(t,e),typeof n=="function"&&n(),t?t.__c:null}J.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(J.prototype,t,{configurable:!0,get:function(){return this["UNSAFE_"+t]},set:function(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}})});var Bt=T.event;function As(){}function Us(){return this.cancelBubble}function Ps(){return this.defaultPrevented}T.event=function(t){return Bt&&(t=Bt(t)),t.persist=As,t.isPropagationStopped=Us,t.isDefaultPrevented=Ps,t.nativeEvent=t};var St,Ds={enumerable:!1,configurable:!0,get:function(){return this.class}},Wt=T.vnode;T.vnode=function(t){typeof t.type=="string"&&function(e){var n=e.props,r=e.type,o={},i=r.indexOf("-")===-1;for(var l in n){var f=n[l];if(!(l==="value"&&"defaultValue"in n&&f==null||qs&&l==="children"&&r==="noscript"||l==="class"||l==="className")){var m=l.toLowerCase();l==="defaultValue"&&"value"in n&&n.value==null?l="value":l==="download"&&f===!0?f="":m==="translate"&&f==="no"?f=!1:m[0]==="o"&&m[1]==="n"?m==="ondoubleclick"?l="ondblclick":m!=="onchange"||r!=="input"&&r!=="textarea"||Ls(n.type)?m==="onfocus"?l="onfocusin":m==="onblur"?l="onfocusout":Ns.test(l)&&(l=m):m=l="oninput":i&&Os.test(l)?l=l.replace(Ms,"-$&").toLowerCase():f===null&&(f=void 0),m==="oninput"&&o[l=m]&&(l="oninputCapture"),o[l]=f}}r=="select"&&o.multiple&&Array.isArray(o.value)&&(o.value=$(n.children).forEach(function(p){p.props.selected=o.value.indexOf(p.props.value)!=-1})),r=="select"&&o.defaultValue!=null&&(o.value=$(n.children).forEach(function(p){p.props.selected=o.multiple?o.defaultValue.indexOf(p.props.value)!=-1:o.defaultValue==p.props.value})),n.class&&!n.className?(o.class=n.class,Object.defineProperty(o,"className",Ds)):(n.className&&!n.class||n.class&&n.className)&&(o.class=o.className=n.className),e.props=o}(t),t.$$typeof=Gn,Wt&&Wt(t)};var Ft=T.__r;T.__r=function(t){Ft&&Ft(t),St=t.__c};var Ht=T.diffed;T.diffed=function(t){Ht&&Ht(t);var e=t.props,n=t.__e;n!=null&&t.type==="textarea"&&"value"in e&&e.value!==n.value&&(n.value=e.value==null?"":e.value),St=null};var Zn={ReactCurrentDispatcher:{current:{readContext:function(t){return St.__n[t.__c].props.value},useCallback:tt,useContext:et,useDebugValue:Xe,useDeferredValue:vt,useEffect:xe,useId:Ze,useImperativeHandle:Ye,useInsertionEffect:Et,useLayoutEffect:_e,useMemo:Ke,useReducer:Ge,useRef:Ve,useState:Ce,useSyncExternalStore:wt,useTransition:bt}}},js="18.3.1";function Xn(t){return D.bind(null,t)}function ge(t){return!!t&&t.$$typeof===Gn}function er(t){return ge(t)&&t.type===te}function tr(t){return!!t&&!!t.displayName&&(typeof t.displayName=="string"||t.displayName instanceof String)&&t.displayName.startsWith("Memo(")}function nr(t){return ge(t)?eo.apply(null,arguments):t}function rr(t){return!!t.__k&&(be(null,t),!0)}function or(t){return t&&(t.base||t.nodeType===1&&t)||null}var ir=function(t,e){return t(e)},sr=function(t,e){return t(e)},ar=te,cr=ge,$s={useState:Ce,useId:Ze,useReducer:Ge,useEffect:xe,useLayoutEffect:_e,useInsertionEffect:Et,useTransition:bt,useDeferredValue:vt,useSyncExternalStore:wt,startTransition:yt,useRef:Ve,useImperativeHandle:Ye,useMemo:Ke,useCallback:tt,useContext:et,useDebugValue:Xe,version:"18.3.1",Children:Fn,render:Kn,hydrate:Yn,unmountComponentAtNode:rr,createPortal:Vn,createElement:D,createContext:Gt,createFactory:Xn,cloneElement:nr,createRef:Vt,Fragment:te,isValidElement:ge,isElement:cr,isFragment:er,isMemo:tr,findDOMNode:or,Component:J,PureComponent:Se,memo:Bn,forwardRef:Wn,flushSync:sr,unstable_batchedUpdates:ir,StrictMode:ar,Suspense:de,SuspenseList:ee,lazy:Jn,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Zn};const Bs=Object.freeze(Object.defineProperty({__proto__:null,Children:Fn,Component:J,Fragment:te,PureComponent:Se,StrictMode:ar,Suspense:de,SuspenseList:ee,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Zn,cloneElement:nr,createContext:Gt,createElement:D,createFactory:Xn,createPortal:Vn,createRef:Vt,default:$s,findDOMNode:or,flushSync:sr,forwardRef:Wn,hydrate:Yn,isElement:cr,isFragment:er,isMemo:tr,isValidElement:ge,lazy:Jn,memo:Bn,render:Kn,startTransition:yt,unmountComponentAtNode:rr,unstable_batchedUpdates:ir,useCallback:tt,useContext:et,useDebugValue:Xe,useDeferredValue:vt,useEffect:xe,useErrorBoundary:no,useId:Ze,useImperativeHandle:Ye,useInsertionEffect:Et,useLayoutEffect:_e,useMemo:Ke,useReducer:Ge,useRef:Ve,useState:Ce,useSyncExternalStore:wt,useTransition:bt,version:js},Symbol.toStringTag,{value:"Module"})),Ws=Jt(Bs);var Be,zt;function Fs(){if(zt)return Be;zt=1;function t(a){return a&&typeof a=="object"&&"default"in a?a.default:a}var e=Ss,n=t(Xr()),r=t(xs()),o=Ws;function i(a){n.toString(a,{type:"terminal"}).then(console.log)}var l=`:root {
  --animation-duration: 300ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.animated {
  animation-duration: var(--animation-duration);
  animation-fill-mode: both;
}

.fadeIn {
  animation-name: fadeIn;
}

.fadeOut {
  animation-name: fadeOut;
}

#walletconnect-wrapper {
  -webkit-user-select: none;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  user-select: none;
  width: 100%;
  z-index: 99999999999999;
}

.walletconnect-modal__headerLogo {
  height: 21px;
}

.walletconnect-modal__header p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  align-items: flex-start;
  display: flex;
  flex: 1;
  margin-left: 5px;
}

.walletconnect-modal__close__wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10000;
  background: white;
  border-radius: 26px;
  padding: 6px;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.walletconnect-modal__close__icon {
  position: relative;
  top: 7px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
}

.walletconnect-modal__close__line1 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
}

.walletconnect-modal__close__line2 {
  position: absolute;
  width: 100%;
  border: 1px solid rgb(48, 52, 59);
  transform: rotate(90deg);
}

.walletconnect-qrcode__base {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: rgba(37, 41, 46, 0.95);
  height: 100%;
  left: 0;
  pointer-events: auto;
  position: fixed;
  top: 0;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  width: 100%;
  will-change: opacity;
  padding: 40px;
  box-sizing: border-box;
}

.walletconnect-qrcode__text {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 10px 0 20px 0;
  text-align: center;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .walletconnect-qrcode__text {
    font-size: 4vw;
  }
}

@media only screen and (max-width: 320px) {
  .walletconnect-qrcode__text {
    font-size: 14px;
  }
}

.walletconnect-qrcode__image {
  width: calc(100% - 30px);
  box-sizing: border-box;
  cursor: none;
  margin: 0 auto;
}

.walletconnect-qrcode__notification {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.1s ease-in-out;
  background: white;
  color: black;
  margin-bottom: -60px;
  opacity: 0;
}

.walletconnect-qrcode__notification.notification__show {
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__header {
    height: 130px;
  }
  .walletconnect-modal__base {
    overflow: auto;
  }
}

@media only screen and (min-device-width: 415px) and (max-width: 768px) {
  #content {
    max-width: 768px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 375px) and (max-width: 415px) {
  #content {
    max-width: 414px;
    box-sizing: border-box;
  }
}

@media only screen and (min-width: 320px) and (max-width: 375px) {
  #content {
    max-width: 375px;
    box-sizing: border-box;
  }
}

@media only screen and (max-width: 320px) {
  #content {
    max-width: 320px;
    box-sizing: border-box;
  }
}

.walletconnect-modal__base {
  -webkit-font-smoothing: antialiased;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);
  font-family: ui-rounded, "SF Pro Rounded", "SF Pro Text", medium-content-sans-serif-font,
    -apple-system, BlinkMacSystemFont, ui-sans-serif, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 41px;
  padding: 24px 24px 22px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  overflow: visible;
  transform: translateY(-50%);
  top: 50%;
  max-width: 500px;
  margin: auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__base {
    padding: 24px 12px;
  }
}

.walletconnect-modal__base .hidden {
  transform: translateY(150%);
  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);
}

.walletconnect-modal__header {
  align-items: center;
  display: flex;
  height: 26px;
  left: 0;
  justify-content: space-between;
  position: absolute;
  top: -42px;
  width: 100%;
}

.walletconnect-modal__base .wc-logo {
  align-items: center;
  display: flex;
  height: 26px;
  margin-top: 15px;
  padding-bottom: 15px;
  pointer-events: auto;
}

.walletconnect-modal__base .wc-logo div {
  background-color: #3399ff;
  height: 21px;
  margin-right: 5px;
  mask-image: url("images/wc-logo.svg") center no-repeat;
  width: 32px;
}

.walletconnect-modal__base .wc-logo p {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.walletconnect-modal__base h2 {
  color: rgba(60, 66, 82, 0.6);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1875em;
  margin: 0 0 19px 0;
  text-align: center;
  width: 100%;
}

.walletconnect-modal__base__row {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  height: 56px;
  justify-content: space-between;
  padding: 0 15px;
  position: relative;
  margin: 0px 0px 8px;
  text-align: left;
  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  text-decoration: none;
}

.walletconnect-modal__base__row:hover {
  background: rgba(60, 66, 82, 0.06);
}

.walletconnect-modal__base__row:active {
  background: rgba(60, 66, 82, 0.06);
  transform: scale(0.975);
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.walletconnect-modal__base__row__h3 {
  color: #25292e;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding-bottom: 3px;
}

.walletconnect-modal__base__row__right {
  align-items: center;
  display: flex;
  justify-content: center;
}

.walletconnect-modal__base__row__right__app-icon {
  border-radius: 8px;
  height: 34px;
  margin: 0 11px 2px 0;
  width: 34px;
  background-size: 100%;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-modal__base__row__right__caret {
  height: 18px;
  opacity: 0.3;
  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 8px;
  will-change: opacity;
}

.walletconnect-modal__base__row:hover .caret,
.walletconnect-modal__base__row:active .caret {
  opacity: 0.6;
}

.walletconnect-modal__mobile__toggle {
  width: 80%;
  display: flex;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 18px;
  background: #d4d5d9;
}

.walletconnect-modal__single_wallet {
  display: flex;
  justify-content: center;
  margin-top: 7px;
  margin-bottom: 18px;
}

.walletconnect-modal__single_wallet a {
  cursor: pointer;
  color: rgb(64, 153, 255);
  font-size: 21px;
  font-weight: 800;
  text-decoration: none !important;
  margin: 0 auto;
}

.walletconnect-modal__mobile__toggle_selector {
  width: calc(50% - 8px);
  background: white;
  position: absolute;
  border-radius: 5px;
  height: calc(100% - 8px);
  top: 4px;
  transition: all 0.2s ease-in-out;
  transform: translate3d(4px, 0, 0);
}

.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {
  transform: translate3d(calc(100% + 12px), 0, 0);
}

.walletconnect-modal__mobile__toggle a {
  font-size: 12px;
  width: 50%;
  text-align: center;
  padding: 8px;
  margin: 0;
  font-weight: 600;
  z-index: 1;
}

.walletconnect-modal__footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media only screen and (max-width: 768px) {
  .walletconnect-modal__footer {
    margin-top: 5vw;
  }
}

.walletconnect-modal__footer a {
  cursor: pointer;
  color: #898d97;
  font-size: 15px;
  margin: 0 auto;
}

@media only screen and (max-width: 320px) {
  .walletconnect-modal__footer a {
    font-size: 14px;
  }
}

.walletconnect-connect__buttons__wrapper {
  max-height: 44vh;
}

.walletconnect-connect__buttons__wrapper__android {
  margin: 50% 0;
}

.walletconnect-connect__buttons__wrapper__wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 10px 0;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__buttons__wrapper__wrap {
    margin-top: 40px;
  }
}

.walletconnect-connect__button {
  background-color: rgb(64, 153, 255);
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: 500;
}

.walletconnect-connect__button__icon_anchor {
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 8px;
  width: 42px;
  justify-self: center;
  flex-direction: column;
  text-decoration: none !important;
}

@media only screen and (max-width: 320px) {
  .walletconnect-connect__button__icon_anchor {
    margin: 4px;
  }
}

.walletconnect-connect__button__icon {
  border-radius: 10px;
  height: 42px;
  margin: 0;
  width: 42px;
  background-size: cover !important;
  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);
}

.walletconnect-connect__button__text {
  color: #424952;
  font-size: 2.7vw;
  text-decoration: none !important;
  padding: 0;
  margin-top: 1.8vw;
  font-weight: 600;
}

@media only screen and (min-width: 768px) {
  .walletconnect-connect__button__text {
    font-size: 16px;
    margin-top: 12px;
  }
}

.walletconnect-search__input {
  border: none;
  background: #d4d5d9;
  border-style: none;
  padding: 8px 16px;
  outline: none;
  font-style: normal;
  font-stretch: normal;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  border-radius: 8px;
  width: calc(100% - 16px);
  margin: 0;
  margin-bottom: 8px;
}
`;typeof Symbol<"u"&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),typeof Symbol<"u"&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function f(a,_){try{var w=a()}catch(b){return _(b)}return w&&w.then?w.then(void 0,_):w}var m="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='300px' height='185px' viewBox='0 0 300 185' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EWalletConnect%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='walletconnect-logo-alt' fill='%233B99FC' fill-rule='nonzero'%3E %3Cpath d='M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z' id='WalletConnect'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E",p="WalletConnect",E=300,S="rgb(64, 153, 255)",y="walletconnect-wrapper",x="walletconnect-style-sheet",j="walletconnect-qrcode-modal",k="walletconnect-qrcode-close",U="walletconnect-qrcode-text",s="walletconnect-connect-button";function c(a){return o.createElement("div",{className:"walletconnect-modal__header"},o.createElement("img",{src:m,className:"walletconnect-modal__headerLogo"}),o.createElement("p",null,p),o.createElement("div",{className:"walletconnect-modal__close__wrapper",onClick:a.onClose},o.createElement("div",{id:k,className:"walletconnect-modal__close__icon"},o.createElement("div",{className:"walletconnect-modal__close__line1"}),o.createElement("div",{className:"walletconnect-modal__close__line2"}))))}function d(a){return o.createElement("a",{className:"walletconnect-connect__button",href:a.href,id:s+"-"+a.name,onClick:a.onClick,rel:"noopener noreferrer",style:{backgroundColor:a.color},target:"_blank"},a.name)}var u="data:image/svg+xml,%3Csvg width='8' height='18' viewBox='0 0 8 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.586301 0.213898C0.150354 0.552968 0.0718197 1.18124 0.41089 1.61719L5.2892 7.88931C5.57007 8.25042 5.57007 8.75608 5.2892 9.11719L0.410889 15.3893C0.071819 15.8253 0.150353 16.4535 0.586301 16.7926C1.02225 17.1317 1.65052 17.0531 1.98959 16.6172L6.86791 10.3451C7.7105 9.26174 7.7105 7.74476 6.86791 6.66143L1.98959 0.38931C1.65052 -0.0466374 1.02225 -0.125172 0.586301 0.213898Z' fill='%233C4252'/%3E %3C/svg%3E";function h(a){var _=a.color,w=a.href,b=a.name,N=a.logo,O=a.onClick;return o.createElement("a",{className:"walletconnect-modal__base__row",href:w,onClick:O,rel:"noopener noreferrer",target:"_blank"},o.createElement("h3",{className:"walletconnect-modal__base__row__h3"},b),o.createElement("div",{className:"walletconnect-modal__base__row__right"},o.createElement("div",{className:"walletconnect-modal__base__row__right__app-icon",style:{background:"url('"+N+"') "+_,backgroundSize:"100%"}}),o.createElement("img",{src:u,className:"walletconnect-modal__base__row__right__caret"})))}function v(a){var _=a.color,w=a.href,b=a.name,N=a.logo,O=a.onClick,q=window.innerWidth<768?(b.length>8?2.5:2.7)+"vw":"inherit";return o.createElement("a",{className:"walletconnect-connect__button__icon_anchor",href:w,onClick:O,rel:"noopener noreferrer",target:"_blank"},o.createElement("div",{className:"walletconnect-connect__button__icon",style:{background:"url('"+N+"') "+_,backgroundSize:"100%"}}),o.createElement("div",{style:{fontSize:q},className:"walletconnect-connect__button__text"},b))}var g=5,I=12;function Ne(a){var _=e.isAndroid(),w=o.useState(""),b=w[0],N=w[1],O=o.useState(""),q=O[0],H=O[1],A=o.useState(1),V=A[0],G=A[1],L=q?a.links.filter(function(C){return C.name.toLowerCase().includes(q.toLowerCase())}):a.links,z=a.errorMessage,ie=q||L.length>g,se=Math.ceil(L.length/I),ae=[(V-1)*I+1,V*I],ce=L.length?L.filter(function(C,R){return R+1>=ae[0]&&R+1<=ae[1]}):[],me=!_&&se>1,le=void 0;function Me(C){N(C.target.value),clearTimeout(le),C.target.value?le=setTimeout(function(){H(C.target.value),G(1)},1e3):(N(""),H(""),G(1))}return o.createElement("div",null,o.createElement("p",{id:U,className:"walletconnect-qrcode__text"},_?a.text.connect_mobile_wallet:a.text.choose_preferred_wallet),!_&&o.createElement("input",{className:"walletconnect-search__input",placeholder:"Search",value:b,onChange:Me}),o.createElement("div",{className:"walletconnect-connect__buttons__wrapper"+(_?"__android":ie&&L.length?"__wrap":"")},_?o.createElement(d,{name:a.text.connect,color:S,href:a.uri,onClick:o.useCallback(function(){e.saveMobileLinkInfo({name:"Unknown",href:a.uri})},[])}):ce.length?ce.map(function(C){var R=C.color,P=C.name,K=C.shortName,we=C.logo,Y=e.formatIOSMobile(a.uri,C),Z=o.useCallback(function(){e.saveMobileLinkInfo({name:P,href:Y})},[ce]);return ie?o.createElement(v,{color:R,href:Y,name:K||P,logo:we,onClick:Z}):o.createElement(h,{color:R,href:Y,name:P,logo:we,onClick:Z})}):o.createElement(o.Fragment,null,o.createElement("p",null,z.length?a.errorMessage:a.links.length&&!L.length?a.text.no_wallets_found:a.text.loading))),me&&o.createElement("div",{className:"walletconnect-modal__footer"},Array(se).fill(0).map(function(C,R){var P=R+1,K=V===P;return o.createElement("a",{style:{margin:"auto 10px",fontWeight:K?"bold":"normal"},onClick:function(){return G(P)}},P)})))}function lr(a){var _=!!a.message.trim();return o.createElement("div",{className:"walletconnect-qrcode__notification"+(_?" notification__show":"")},a.message)}var ur=function(a){try{var _="";return Promise.resolve(n.toString(a,{margin:0,type:"svg"})).then(function(w){return typeof w=="string"&&(_=w.replace("<svg",'<svg class="walletconnect-qrcode__image"')),_})}catch(w){return Promise.reject(w)}};function dr(a){var _=o.useState(""),w=_[0],b=_[1],N=o.useState(""),O=N[0],q=N[1];o.useEffect(function(){try{return Promise.resolve(ur(a.uri)).then(function(A){q(A)})}catch(A){Promise.reject(A)}},[]);var H=function(){var A=r(a.uri);A?(b(a.text.copied_to_clipboard),setInterval(function(){return b("")},1200)):(b("Error"),setInterval(function(){return b("")},1200))};return o.createElement("div",null,o.createElement("p",{id:U,className:"walletconnect-qrcode__text"},a.text.scan_qrcode_with_wallet),o.createElement("div",{dangerouslySetInnerHTML:{__html:O}}),o.createElement("div",{className:"walletconnect-modal__footer"},o.createElement("a",{onClick:H},a.text.copy_to_clipboard)),o.createElement(lr,{message:w}))}function hr(a){var _=e.isAndroid(),w=e.isMobile(),b=w?a.qrcodeModalOptions&&a.qrcodeModalOptions.mobileLinks?a.qrcodeModalOptions.mobileLinks:void 0:a.qrcodeModalOptions&&a.qrcodeModalOptions.desktopLinks?a.qrcodeModalOptions.desktopLinks:void 0,N=o.useState(!1),O=N[0],q=N[1],H=o.useState(!1),A=H[0],V=H[1],G=o.useState(!w),L=G[0],z=G[1],ie={mobile:w,text:a.text,uri:a.uri,qrcodeModalOptions:a.qrcodeModalOptions},se=o.useState(""),ae=se[0],ce=se[1],me=o.useState(!1),le=me[0],Me=me[1],C=o.useState([]),R=C[0],P=C[1],K=o.useState(""),we=K[0],Y=K[1],Z=function(){A||O||b&&!b.length||R.length>0||o.useEffect(function(){var Nr=function(){try{if(_)return Promise.resolve();q(!0);var qe=f(function(){var ue=a.qrcodeModalOptions&&a.qrcodeModalOptions.registryUrl?a.qrcodeModalOptions.registryUrl:e.getWalletRegistryUrl();return Promise.resolve(fetch(ue)).then(function(Mr){return Promise.resolve(Mr.json()).then(function(qr){var Lr=qr.listings,Ar=w?"mobile":"desktop",ye=e.getMobileLinkRegistry(e.formatMobileRegistry(Lr,Ar),b);q(!1),V(!0),Y(ye.length?"":a.text.no_supported_wallets),P(ye);var It=ye.length===1;It&&(ce(e.formatIOSMobile(a.uri,ye[0])),z(!0)),Me(It)})})},function(ue){q(!1),V(!0),Y(a.text.something_went_wrong),console.error(ue)});return Promise.resolve(qe&&qe.then?qe.then(function(){}):void 0)}catch(ue){return Promise.reject(ue)}};Nr()})};Z();var Or=w?L:!L;return o.createElement("div",{id:j,className:"walletconnect-qrcode__base animated fadeIn"},o.createElement("div",{className:"walletconnect-modal__base"},o.createElement(c,{onClose:a.onClose}),le&&L?o.createElement("div",{className:"walletconnect-modal__single_wallet"},o.createElement("a",{onClick:function(){return e.saveMobileLinkInfo({name:R[0].name,href:ae})},href:ae,rel:"noopener noreferrer",target:"_blank"},a.text.connect_with+" "+(le?R[0].name:"")+" ›")):_||O||!O&&R.length?o.createElement("div",{className:"walletconnect-modal__mobile__toggle"+(Or?" right__selected":"")},o.createElement("div",{className:"walletconnect-modal__mobile__toggle_selector"}),w?o.createElement(o.Fragment,null,o.createElement("a",{onClick:function(){return z(!1),Z()}},a.text.mobile),o.createElement("a",{onClick:function(){return z(!0)}},a.text.qrcode)):o.createElement(o.Fragment,null,o.createElement("a",{onClick:function(){return z(!0)}},a.text.qrcode),o.createElement("a",{onClick:function(){return z(!1),Z()}},a.text.desktop))):null,o.createElement("div",null,L||!_&&!O&&!R.length?o.createElement(dr,Object.assign({},ie)):o.createElement(Ne,Object.assign({},ie,{links:R,errorMessage:we})))))}var fr={choose_preferred_wallet:"Wähle bevorzugte Wallet",connect_mobile_wallet:"Verbinde mit Mobile Wallet",scan_qrcode_with_wallet:"Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",connect:"Verbinden",qrcode:"QR-Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"In die Zwischenablage kopieren",copied_to_clipboard:"In die Zwischenablage kopiert!",connect_with:"Verbinden mit Hilfe von",loading:"Laden...",something_went_wrong:"Etwas ist schief gelaufen",no_supported_wallets:"Es gibt noch keine unterstützten Wallet",no_wallets_found:"keine Wallet gefunden"},_r={choose_preferred_wallet:"Choose your preferred wallet",connect_mobile_wallet:"Connect to Mobile Wallet",scan_qrcode_with_wallet:"Scan QR code with a WalletConnect-compatible wallet",connect:"Connect",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copy to clipboard",copied_to_clipboard:"Copied to clipboard!",connect_with:"Connect with",loading:"Loading...",something_went_wrong:"Something went wrong",no_supported_wallets:"There are no supported wallets yet",no_wallets_found:"No wallets found"},pr={choose_preferred_wallet:"Elige tu billetera preferida",connect_mobile_wallet:"Conectar a billetera móvil",scan_qrcode_with_wallet:"Escanea el código QR con una billetera compatible con WalletConnect",connect:"Conectar",qrcode:"Código QR",mobile:"Móvil",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Conectar mediante",loading:"Cargando...",something_went_wrong:"Algo salió mal",no_supported_wallets:"Todavía no hay billeteras compatibles",no_wallets_found:"No se encontraron billeteras"},gr={choose_preferred_wallet:"Choisissez votre portefeuille préféré",connect_mobile_wallet:"Se connecter au portefeuille mobile",scan_qrcode_with_wallet:"Scannez le QR code avec un portefeuille compatible WalletConnect",connect:"Se connecter",qrcode:"QR Code",mobile:"Mobile",desktop:"Desktop",copy_to_clipboard:"Copier",copied_to_clipboard:"Copié!",connect_with:"Connectez-vous à l'aide de",loading:"Chargement...",something_went_wrong:"Quelque chose a mal tourné",no_supported_wallets:"Il n'y a pas encore de portefeuilles pris en charge",no_wallets_found:"Aucun portefeuille trouvé"},mr={choose_preferred_wallet:"원하는 지갑을 선택하세요",connect_mobile_wallet:"모바일 지갑과 연결",scan_qrcode_with_wallet:"WalletConnect 지원 지갑에서 QR코드를 스캔하세요",connect:"연결",qrcode:"QR 코드",mobile:"모바일",desktop:"데스크탑",copy_to_clipboard:"클립보드에 복사",copied_to_clipboard:"클립보드에 복사되었습니다!",connect_with:"와 연결하다",loading:"로드 중...",something_went_wrong:"문제가 발생했습니다.",no_supported_wallets:"아직 지원되는 지갑이 없습니다",no_wallets_found:"지갑을 찾을 수 없습니다"},wr={choose_preferred_wallet:"Escolha sua carteira preferida",connect_mobile_wallet:"Conectar-se à carteira móvel",scan_qrcode_with_wallet:"Ler o código QR com uma carteira compatível com WalletConnect",connect:"Conectar",qrcode:"Código QR",mobile:"Móvel",desktop:"Desktop",copy_to_clipboard:"Copiar",copied_to_clipboard:"Copiado!",connect_with:"Ligar por meio de",loading:"Carregamento...",something_went_wrong:"Algo correu mal",no_supported_wallets:"Ainda não há carteiras suportadas",no_wallets_found:"Nenhuma carteira encontrada"},yr={choose_preferred_wallet:"选择你的钱包",connect_mobile_wallet:"连接至移动端钱包",scan_qrcode_with_wallet:"使用兼容 WalletConnect 的钱包扫描二维码",connect:"连接",qrcode:"二维码",mobile:"移动",desktop:"桌面",copy_to_clipboard:"复制到剪贴板",copied_to_clipboard:"复制到剪贴板成功！",connect_with:"通过以下方式连接",loading:"正在加载...",something_went_wrong:"出了问题",no_supported_wallets:"目前还没有支持的钱包",no_wallets_found:"没有找到钱包"},vr={choose_preferred_wallet:"کیف پول مورد نظر خود را انتخاب کنید",connect_mobile_wallet:"به کیف پول موبایل وصل شوید",scan_qrcode_with_wallet:"کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید",connect:"اتصال",qrcode:"کد QR",mobile:"سیار",desktop:"دسکتاپ",copy_to_clipboard:"کپی به کلیپ بورد",copied_to_clipboard:"در کلیپ بورد کپی شد!",connect_with:"ارتباط با",loading:"...بارگذاری",something_went_wrong:"مشکلی پیش آمد",no_supported_wallets:"هنوز هیچ کیف پول پشتیبانی شده ای وجود ندارد",no_wallets_found:"هیچ کیف پولی پیدا نشد"},Ct={de:fr,en:_r,es:pr,fr:gr,ko:mr,pt:wr,zh:yr,fa:vr};function br(){var a=e.getDocumentOrThrow(),_=a.getElementById(x);_&&a.head.removeChild(_);var w=a.createElement("style");w.setAttribute("id",x),w.innerText=l,a.head.appendChild(w)}function Er(){var a=e.getDocumentOrThrow(),_=a.createElement("div");return _.setAttribute("id",y),a.body.appendChild(_),_}function xt(){var a=e.getDocumentOrThrow(),_=a.getElementById(j);_&&(_.className=_.className.replace("fadeIn","fadeOut"),setTimeout(function(){var w=a.getElementById(y);w&&a.body.removeChild(w)},E))}function Sr(a){return function(){xt(),a&&a()}}function Cr(){var a=e.getNavigatorOrThrow().language.split("-")[0]||"en";return Ct[a]||Ct.en}function xr(a,_,w){br();var b=Er();o.render(o.createElement(hr,{text:Cr(),uri:a,onClose:Sr(_),qrcodeModalOptions:w}),b)}function kr(){xt()}var kt=function(){return typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u"};function Ir(a,_,w){console.log(a),kt()?i(a):xr(a,_,w)}function Rr(){kt()||kr()}var Tr={open:Ir,close:Rr};return Be=Tr,Be}var Hs=Fs();const zs=Je(Hs);class Qs extends Qr{constructor(e){super(),this.events=new Qt,this.accounts=[],this.chainId=1,this.pending=!1,this.bridge="https://bridge.walletconnect.org",this.qrcode=!0,this.qrcodeModalOptions=void 0,this.opts=e,this.chainId=(e==null?void 0:e.chainId)||this.chainId,this.wc=this.register(e)}get connected(){return typeof this.wc<"u"&&this.wc.connected}get connecting(){return this.pending}get connector(){return this.wc=this.register(this.opts),this.wc}on(e,n){this.events.on(e,n)}once(e,n){this.events.once(e,n)}off(e,n){this.events.off(e,n)}removeListener(e,n){this.events.removeListener(e,n)}async open(e){if(this.connected){this.onOpen();return}return new Promise((n,r)=>{this.on("error",o=>{r(o)}),this.on("open",()=>{n()}),this.create(e)})}async close(){typeof this.wc>"u"||(this.wc.connected&&this.wc.killSession(),this.onClose())}async send(e){this.wc=this.register(this.opts),this.connected||await this.open(),this.sendPayload(e).then(n=>this.events.emit("payload",n)).catch(n=>this.events.emit("payload",Rt(e.id,n.message)))}register(e){if(this.wc)return this.wc;this.opts=e||this.opts,this.bridge=e!=null&&e.connector?e.connector.bridge:(e==null?void 0:e.bridge)||"https://bridge.walletconnect.org",this.qrcode=typeof(e==null?void 0:e.qrcode)>"u"||e.qrcode!==!1,this.chainId=typeof(e==null?void 0:e.chainId)<"u"?e.chainId:this.chainId,this.qrcodeModalOptions=e==null?void 0:e.qrcodeModalOptions;const n={bridge:this.bridge,qrcodeModal:this.qrcode?zs:void 0,qrcodeModalOptions:this.qrcodeModalOptions,storageId:e==null?void 0:e.storageId,signingMethods:e==null?void 0:e.signingMethods,clientMeta:e==null?void 0:e.clientMeta};if(this.wc=typeof(e==null?void 0:e.connector)<"u"?e.connector:new Es(n),typeof this.wc>"u")throw new Error("Failed to register WalletConnect connector");return this.wc.accounts.length&&(this.accounts=this.wc.accounts),this.wc.chainId&&(this.chainId=this.wc.chainId),this.registerConnectorEvents(),this.wc}onOpen(e){this.pending=!1,e&&(this.wc=e),this.events.emit("open")}onClose(){this.pending=!1,this.wc&&(this.wc=void 0),this.events.emit("close")}onError(e,n="Failed or Rejected Request",r=-32e3){const o={id:e.id,jsonrpc:e.jsonrpc,error:{code:r,message:n}};return this.events.emit("payload",o),o}create(e){this.wc=this.register(this.opts),this.chainId=e||this.chainId,!(this.connected||this.pending)&&(this.pending=!0,this.registerConnectorEvents(),this.wc.createSession({chainId:this.chainId}).then(()=>this.events.emit("created")).catch(n=>this.events.emit("error",n)))}registerConnectorEvents(){this.wc=this.register(this.opts),this.wc.on("connect",e=>{var n,r;if(e){this.events.emit("error",e);return}this.accounts=((n=this.wc)===null||n===void 0?void 0:n.accounts)||[],this.chainId=((r=this.wc)===null||r===void 0?void 0:r.chainId)||this.chainId,this.onOpen()}),this.wc.on("disconnect",e=>{if(e){this.events.emit("error",e);return}this.onClose()}),this.wc.on("modal_closed",()=>{this.events.emit("error",new Error("User closed modal"))}),this.wc.on("session_update",(e,n)=>{const{accounts:r,chainId:o}=n.params[0];(!this.accounts||r&&this.accounts!==r)&&(this.accounts=r,this.events.emit("accountsChanged",r)),(!this.chainId||o&&this.chainId!==o)&&(this.chainId=o,this.events.emit("chainChanged",o))})}async sendPayload(e){this.wc=this.register(this.opts);try{const n=await this.wc.unsafeSend(e);return this.sanitizeResponse(n)}catch(n){return this.onError(e,n.message)}}sanitizeResponse(e){return typeof e.error<"u"&&typeof e.error.code>"u"?Rt(e.id,e.error.message,e.error.data):e}}class Ys{constructor(e){this.events=new Qt,this.rpc={infuraId:e==null?void 0:e.infuraId,custom:e==null?void 0:e.rpc},this.signer=new Tt(new Qs(e));const n=this.signer.connection.chainId||(e==null?void 0:e.chainId)||1;this.http=this.setHttpProvider(n),this.registerEventListeners()}get connected(){return this.signer.connection.connected}get connector(){return this.signer.connection.connector}get accounts(){return this.signer.connection.accounts}get chainId(){return this.signer.connection.chainId}get rpcUrl(){var e;return((e=this.http)===null||e===void 0?void 0:e.connection).url||""}async request(e){switch(e.method){case"eth_requestAccounts":return await this.connect(),this.signer.connection.accounts;case"eth_accounts":return this.signer.connection.accounts;case"eth_chainId":return this.signer.connection.chainId}if(nt.includes(e.method))return this.signer.request(e);if(typeof this.http>"u")throw new Error(`Cannot request JSON-RPC method (${e.method}) without provided rpc url`);return this.http.request(e)}sendAsync(e,n){this.request(e).then(r=>n(null,r)).catch(r=>n(r,void 0))}async enable(){return await this.request({method:"eth_requestAccounts"})}async connect(){this.signer.connection.connected||await this.signer.connect()}async disconnect(){this.signer.connection.connected&&await this.signer.disconnect()}on(e,n){this.events.on(e,n)}once(e,n){this.events.once(e,n)}removeListener(e,n){this.events.removeListener(e,n)}off(e,n){this.events.off(e,n)}get isWalletConnect(){return!0}registerEventListeners(){this.signer.connection.on("accountsChanged",e=>{this.events.emit("accountsChanged",e)}),this.signer.connection.on("chainChanged",e=>{this.http=this.setHttpProvider(e),this.events.emit("chainChanged",e)}),this.signer.on("disconnect",()=>{this.events.emit("disconnect")})}setHttpProvider(e){const n=vn(e,this.rpc);return typeof n>"u"?void 0:new Tt(new Jr(n))}}export{Ys as default};
