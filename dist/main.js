(()=>{var e={416:e=>{function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((t=>{const i=e[t],s=typeof i;"object"!==s&&"function"!==s||Object.isFrozen(i)||n(i)})),e}class t{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function s(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}const r=e=>!!e.scope;class a{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=i(e)}openNode(e){if(!r(e))return;const n=((e,{prefix:n})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const t=e.split(".");return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")}return`${n}${e}`})(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){r(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const o=(e={})=>{const n={children:[]};return Object.assign(n,e),n};class c{constructor(){this.rootNode=o(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=o({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class l extends c{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const t=e.root;n&&(t.scope=`language:${n}`),this.add(t)}toHTML(){return new a(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function g(e){return e?"string"==typeof e?e:e.source:null}function u(e){return f("(?=",e,")")}function d(e){return f("(?:",e,")*")}function h(e){return f("(?:",e,")?")}function f(...e){return e.map((e=>g(e))).join("")}function p(...e){const n=function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e);return"("+(n.capture?"":"?:")+e.map((e=>g(e))).join("|")+")"}function b(e){return new RegExp(e.toString()+"|").exec("").length-1}const m=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function E(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t;let i=g(e),s="";for(;i.length>0;){const e=m.exec(i);if(!e){s+=i;break}s+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?s+="\\"+String(Number(e[1])+n):(s+=e[0],"("===e[0]&&t++)}return s})).map((e=>`(${e})`)).join(n)}const y="[a-zA-Z]\\w*",_="[a-zA-Z_]\\w*",w="\\b\\d+(\\.\\d+)?",x="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",v="\\b(0b[01]+)",A={begin:"\\\\[\\s\\S]",relevance:0},N={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[A]},j={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[A]},S=function(e,n,t={}){const i=s({scope:"comment",begin:e,end:n,contains:[]},t);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const r=p("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:f(/[ ]+/,"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},k=S("//","$"),O=S("/\\*","\\*/"),R=S("#","$"),M={scope:"number",begin:w,relevance:0},I={scope:"number",begin:x,relevance:0},T={scope:"number",begin:v,relevance:0},B={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[A,{begin:/\[/,end:/\]/,relevance:0,contains:[A]}]},L={scope:"title",begin:y,relevance:0},C={scope:"title",begin:_,relevance:0},$={begin:"\\.\\s*"+_,relevance:0};var D=Object.freeze({__proto__:null,APOS_STRING_MODE:N,BACKSLASH_ESCAPE:A,BINARY_NUMBER_MODE:T,BINARY_NUMBER_RE:v,COMMENT:S,C_BLOCK_COMMENT_MODE:O,C_LINE_COMMENT_MODE:k,C_NUMBER_MODE:I,C_NUMBER_RE:x,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})},HASH_COMMENT_MODE:R,IDENT_RE:y,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:$,NUMBER_MODE:M,NUMBER_RE:w,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:j,REGEXP_MODE:B,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=f(n,/.*\b/,e.binary,/\b.*/)),s({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},TITLE_MODE:L,UNDERSCORE_IDENT_RE:_,UNDERSCORE_TITLE_MODE:C});function P(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}function H(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function U(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=P,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function z(e,n){Array.isArray(e.illegal)&&(e.illegal=p(...e.illegal))}function Z(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function F(e,n){void 0===e.relevance&&(e.relevance=1)}const G=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]})),e.keywords=t.keywords,e.begin=f(t.beforeMatch,u(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},W=["of","and","for","in","not","or","if","then","parent","list","value"];function K(e,n,t="keyword"){const i=Object.create(null);return"string"==typeof e?s(t,e.split(" ")):Array.isArray(e)?s(t,e):Object.keys(e).forEach((function(t){Object.assign(i,K(e[t],n,t))})),i;function s(e,t){n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((function(n){const t=n.split("|");i[t[0]]=[e,X(t[0],t[1])]}))}}function X(e,n){return n?Number(n):function(e){return W.includes(e.toLowerCase())}(e)?0:1}const J={},q=e=>{console.error(e)},V=(e,...n)=>{console.log(`WARN: ${e}`,...n)},Q=(e,n)=>{J[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),J[`${e}/${n}`]=!0)},Y=new Error;function ee(e,n,{key:t}){let i=0;const s=e[t],r={},a={};for(let e=1;e<=n.length;e++)a[e+i]=s[e],r[e+i]=!0,i+=b(n[e-1]);e[t]=a,e[t]._emit=r,e[t]._multi=!0}function ne(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw q("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Y;if("object"!=typeof e.beginScope||null===e.beginScope)throw q("beginScope must be object"),Y;ee(e,e.begin,{key:"beginScope"}),e.begin=E(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw q("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Y;if("object"!=typeof e.endScope||null===e.endScope)throw q("endScope must be object"),Y;ee(e,e.end,{key:"endScope"}),e.end=E(e.end,{joinWith:""})}}(e)}function te(e){function n(n,t){return new RegExp(g(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=b(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(E(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,i)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=s(e.classNameAliases||{}),function t(r,a){const o=r;if(r.isCompiled)return o;[H,Z,ne,G].forEach((e=>e(r,a))),e.compilerExtensions.forEach((e=>e(r,a))),r.__beforeBegin=null,[U,z,F].forEach((e=>e(r,a))),r.isCompiled=!0;let c=null;return"object"==typeof r.keywords&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),c=r.keywords.$pattern,delete r.keywords.$pattern),c=c||/\w+/,r.keywords&&(r.keywords=K(r.keywords,e.case_insensitive)),o.keywordPatternRe=n(c,!0),a&&(r.begin||(r.begin=/\B|\b/),o.beginRe=n(o.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),r.end&&(o.endRe=n(o.end)),o.terminatorEnd=g(o.end)||"",r.endsWithParent&&a.terminatorEnd&&(o.terminatorEnd+=(r.end?"|":"")+a.terminatorEnd)),r.illegal&&(o.illegalRe=n(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(n){return s(e,{variants:null},n)}))),e.cachedVariants?e.cachedVariants:ie(e)?s(e,{starts:e.starts?s(e.starts):null}):Object.isFrozen(e)?s(e):e}("self"===e?r:e)}))),r.contains.forEach((function(e){t(e,o)})),r.starts&&t(r.starts,a),o.matcher=function(e){const n=new i;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(o),o}(e)}function ie(e){return!!e&&(e.endsWithParent||ie(e.starts))}class se extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const re=i,ae=s,oe=Symbol("nomatch"),ce=function(e){const i=Object.create(null),s=Object.create(null),r=[];let a=!0;const o="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let g={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:l};function b(e){return g.noHighlightRe.test(e)}function m(e,n,t){let i="",s="";"object"==typeof n?(i=e,t=n.ignoreIllegals,s=n.language):(Q("10.7.0","highlight(lang, code, ...args) has been deprecated."),Q("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),s=e,i=n),void 0===t&&(t=!0);const r={code:i,language:s};j("before:highlight",r);const a=r.result?r.result:E(r.language,r.code,t);return a.code=r.code,j("after:highlight",a),a}function E(e,n,s,r){const c=Object.create(null);function l(){if(!j.keywords)return void k.addText(O);let e=0;j.keywordPatternRe.lastIndex=0;let n=j.keywordPatternRe.exec(O),t="";for(;n;){t+=O.substring(e,n.index);const s=x.case_insensitive?n[0].toLowerCase():n[0],r=(i=s,j.keywords[i]);if(r){const[e,i]=r;if(k.addText(t),t="",c[s]=(c[s]||0)+1,c[s]<=7&&(R+=i),e.startsWith("_"))t+=n[0];else{const t=x.classNameAliases[e]||e;d(n[0],t)}}else t+=n[0];e=j.keywordPatternRe.lastIndex,n=j.keywordPatternRe.exec(O)}var i;t+=O.substring(e),k.addText(t)}function u(){null!=j.subLanguage?function(){if(""===O)return;let e=null;if("string"==typeof j.subLanguage){if(!i[j.subLanguage])return void k.addText(O);e=E(j.subLanguage,O,!0,S[j.subLanguage]),S[j.subLanguage]=e._top}else e=y(O,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(R+=e.relevance),k.__addSublanguage(e._emitter,e.language)}():l(),O=""}function d(e,n){""!==e&&(k.startScope(n),k.addText(e),k.endScope())}function h(e,n){let t=1;const i=n.length-1;for(;t<=i;){if(!e._emit[t]){t++;continue}const i=x.classNameAliases[e[t]]||e[t],s=n[t];i?d(s,i):(O=s,l(),O=""),t++}}function f(e,n){return e.scope&&"string"==typeof e.scope&&k.openNode(x.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(d(O,x.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),O=""):e.beginScope._multi&&(h(e.beginScope,n),O="")),j=Object.create(e,{parent:{value:j}}),j}function p(e,n,i){let s=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,i);if(s){if(e["on:end"]){const i=new t(e);e["on:end"](n,i),i.isMatchIgnored&&(s=!1)}if(s){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return p(e.parent,n,i)}function b(e){return 0===j.matcher.regexIndex?(O+=e[0],1):(T=!0,0)}function m(e){const t=e[0],i=n.substring(e.index),s=p(j,e,i);if(!s)return oe;const r=j;j.endScope&&j.endScope._wrap?(u(),d(t,j.endScope._wrap)):j.endScope&&j.endScope._multi?(u(),h(j.endScope,e)):r.skip?O+=t:(r.returnEnd||r.excludeEnd||(O+=t),u(),r.excludeEnd&&(O=t));do{j.scope&&k.closeNode(),j.skip||j.subLanguage||(R+=j.relevance),j=j.parent}while(j!==s.parent);return s.starts&&f(s.starts,e),r.returnEnd?0:t.length}let _={};function w(i,r){const o=r&&r[0];if(O+=i,null==o)return u(),0;if("begin"===_.type&&"end"===r.type&&_.index===r.index&&""===o){if(O+=n.slice(r.index,r.index+1),!a){const n=new Error(`0 width match regex (${e})`);throw n.languageName=e,n.badRule=_.rule,n}return 1}if(_=r,"begin"===r.type)return function(e){const n=e[0],i=e.rule,s=new t(i),r=[i.__beforeBegin,i["on:begin"]];for(const t of r)if(t&&(t(e,s),s.isMatchIgnored))return b(n);return i.skip?O+=n:(i.excludeBegin&&(O+=n),u(),i.returnBegin||i.excludeBegin||(O=n)),f(i,e),i.returnBegin?0:n.length}(r);if("illegal"===r.type&&!s){const e=new Error('Illegal lexeme "'+o+'" for mode "'+(j.scope||"<unnamed>")+'"');throw e.mode=j,e}if("end"===r.type){const e=m(r);if(e!==oe)return e}if("illegal"===r.type&&""===o)return O+="\n",1;if(I>1e5&&I>3*r.index)throw new Error("potential infinite loop, way more iterations than matches");return O+=o,o.length}const x=v(e);if(!x)throw q(o.replace("{}",e)),new Error('Unknown language: "'+e+'"');const A=te(x);let N="",j=r||A;const S={},k=new g.__emitter(g);!function(){const e=[];for(let n=j;n!==x;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach((e=>k.openNode(e)))}();let O="",R=0,M=0,I=0,T=!1;try{if(x.__emitTokens)x.__emitTokens(n,k);else{for(j.matcher.considerAll();;){I++,T?T=!1:j.matcher.considerAll(),j.matcher.lastIndex=M;const e=j.matcher.exec(n);if(!e)break;const t=w(n.substring(M,e.index),e);M=e.index+t}w(n.substring(M))}return k.finalize(),N=k.toHTML(),{language:e,value:N,relevance:R,illegal:!1,_emitter:k,_top:j}}catch(t){if(t.message&&t.message.includes("Illegal"))return{language:e,value:re(n),illegal:!0,relevance:0,_illegalBy:{message:t.message,index:M,context:n.slice(M-100,M+100),mode:t.mode,resultSoFar:N},_emitter:k};if(a)return{language:e,value:re(n),illegal:!1,relevance:0,errorRaised:t,_emitter:k,_top:j};throw t}}function y(e,n){n=n||g.languages||Object.keys(i);const t=function(e){const n={value:re(e),illegal:!1,relevance:0,_top:c,_emitter:new g.__emitter(g)};return n._emitter.addText(e),n}(e),s=n.filter(v).filter(N).map((n=>E(n,e,!1)));s.unshift(t);const r=s.sort(((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(v(e.language).supersetOf===n.language)return 1;if(v(n.language).supersetOf===e.language)return-1}return 0})),[a,o]=r,l=a;return l.secondBest=o,l}function _(e){let n=null;const t=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=g.languageDetectRe.exec(n);if(t){const n=v(t[1]);return n||(V(o.replace("{}",t[1])),V("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>b(e)||v(e)))}(e);if(b(t))return;if(j("before:highlightElement",{el:e,language:t}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(g.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),g.throwUnescapedHTML))throw new se("One of your code blocks includes unescaped HTML.",e.innerHTML);n=e;const i=n.textContent,r=t?m(i,{language:t,ignoreIllegals:!0}):y(i);e.innerHTML=r.value,e.dataset.highlighted="yes",function(e,n,t){const i=n&&s[n]||t;e.classList.add("hljs"),e.classList.add(`language-${i}`)}(e,t,r.language),e.result={language:r.language,re:r.relevance,relevance:r.relevance},r.secondBest&&(e.secondBest={language:r.secondBest.language,relevance:r.secondBest.relevance}),j("after:highlightElement",{el:e,result:r,text:i})}let w=!1;function x(){if("loading"===document.readyState)return w||window.addEventListener("DOMContentLoaded",(function(){x()}),!1),void(w=!0);document.querySelectorAll(g.cssSelector).forEach(_)}function v(e){return e=(e||"").toLowerCase(),i[e]||i[s[e]]}function A(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{s[e.toLowerCase()]=n}))}function N(e){const n=v(e);return n&&!n.disableAutodetect}function j(e,n){const t=e;r.forEach((function(e){e[t]&&e[t](n)}))}Object.assign(e,{highlight:m,highlightAuto:y,highlightAll:x,highlightElement:_,highlightBlock:function(e){return Q("10.7.0","highlightBlock will be removed entirely in v12.0"),Q("10.7.0","Please use highlightElement now."),_(e)},configure:function(e){g=ae(g,e)},initHighlighting:()=>{x(),Q("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){x(),Q("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(n,t){let s=null;try{s=t(e)}catch(e){if(q("Language definition for '{}' could not be registered.".replace("{}",n)),!a)throw e;q(e),s=c}s.name||(s.name=n),i[n]=s,s.rawDefinition=t.bind(null,e),s.aliases&&A(s.aliases,{languageName:n})},unregisterLanguage:function(e){delete i[e];for(const n of Object.keys(s))s[n]===e&&delete s[n]},listLanguages:function(){return Object.keys(i)},getLanguage:v,registerAliases:A,autoDetection:N,inherit:ae,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{e["before:highlightBlock"](Object.assign({block:n.el},n))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{e["after:highlightBlock"](Object.assign({block:n.el},n))})}(e),r.push(e)},removePlugin:function(e){const n=r.indexOf(e);-1!==n&&r.splice(n,1)}}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString="11.11.1",e.regex={concat:f,lookahead:u,either:p,optional:h,anyNumberOfTimes:d};for(const e in D)"object"==typeof D[e]&&n(D[e]);return Object.assign(e,D),e},le=ce({});le.newInstance=()=>ce({}),e.exports=le,le.HighlightJS=le,le.default=le}},n={};function t(i){var s=n[i];if(void 0!==s)return s.exports;var r=n[i]={exports:{}};return e[i](r,r.exports,t),r.exports}(()=>{"use strict";const e=t(416),n="[A-Za-z$_][0-9A-Za-z$_]*",i=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],s=["true","false","null","undefined","NaN","Infinity"],r=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],a=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],o=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],l=[].concat(o,r,a);e.registerLanguage("javascript",(function(e){const t=e.regex,g=n,u={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{const t=e[0].length+e.index,i=e.input[t];if("<"===i||","===i)return void n.ignoreMatch();let s;">"===i&&(((e,{after:n})=>{const t="</"+e[0].slice(1);return-1!==e.input.indexOf(t,n)})(e,{after:t})||n.ignoreMatch());const r=e.input.substring(t);((s=r.match(/^\s*=/))||(s=r.match(/^\s+extends\s+/))&&0===s.index)&&n.ignoreMatch()}},d={$pattern:n,keyword:i,literal:s,built_in:l,"variable.language":c},h="[0-9](_?[0-9])*",f=`\\.(${h})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",b={className:"number",variants:[{begin:`(\\b(${p})((${f})|\\.)?|(${f}))[eE][+-]?(${h})\\b`},{begin:`\\b(${p})\\b((${f})\\b|\\.)?|(${f})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},m={className:"subst",begin:"\\$\\{",end:"\\}",keywords:d,contains:[]},E={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,m],subLanguage:"xml"}},y={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,m],subLanguage:"css"}},_={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,m],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,m]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:g+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},v=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,E,y,_,w,{match:/\$\d+/},b];m.contains=v.concat({begin:/\{/,end:/\}/,keywords:d,contains:["self"].concat(v)});const A=[].concat(x,m.contains),N=A.concat([{begin:/(\s*)\(/,end:/\)/,keywords:d,contains:["self"].concat(A)}]),j={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:N},S={variants:[{match:[/class/,/\s+/,g,/\s+/,/extends/,/\s+/,t.concat(g,"(",t.concat(/\./,g),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,g],scope:{1:"keyword",3:"title.class"}}]},k={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...r,...a]}},O={variants:[{match:[/function/,/\s+/,g,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[j],illegal:/%/},R={match:t.concat(/\b/,(M=[...o,"super","import"].map((e=>`${e}\\s*\\(`)),t.concat("(?!",M.join("|"),")")),g,t.lookahead(/\s*\(/)),className:"title.function",relevance:0};var M;const I={begin:t.concat(/\./,t.lookahead(t.concat(g,/(?![0-9A-Za-z$_(])/))),end:g,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},T={match:[/get|set/,/\s+/,g,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},j]},B="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",L={match:[/const|var|let/,/\s+/,g,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(B)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[j]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:d,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:k},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,E,y,_,w,x,{match:/\$\d+/},b,k,{scope:"attr",match:g+t.lookahead(":"),relevance:0},L,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:B,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:u.begin,"on:begin":u.isTrulyOpeningTag,end:u.end}],subLanguage:"xml",contains:[{begin:u.begin,end:u.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[j,e.inherit(e.TITLE_MODE,{begin:g,className:"title.function"})]},{match:/\.\.\./,relevance:0},I,{match:"\\$"+g,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[j]},R,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},S,T,{match:/\$[(.]/}]}}));let g=document.createElement("style");g.innerText="pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}",document.head.appendChild(g),document.addEventListener("alpine:init",(()=>{Alpine.directive("dump",((n,{expression:t},{evaluate:i})=>{let s=[],r=e.highlight(JSON.stringify(i(t),((e,n)=>"object"==typeof n&&null!==n?s.includes(n)?void 0:s.push(n)&&n:n),2),{language:"javascript"}).value;n.innerHTML=`\n\t\t\t<div style="font-family: monospace;">\n\t\t\t\t<div style="white-space: pre-wrap; background-color: #252525; padding: 0.2rem; color: white;">${t}</div>\n\t\t\t\t<div style="white-space: pre-wrap; background-color: black; color: lightgreen; padding: 0.2rem;">${r}</div>\n\t\t\t</div>`}))}))})()})();