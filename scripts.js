(function(a,b){function e(a,e){c.addType(a,function(f,g,h){var i,j,k,l,m=g,n=(new Date).getTime();if(!f){m={},l=[],k=0;try{f=e.length;while(f=e.key(k++))d.test(f)&&(j=JSON.parse(e.getItem(f)),j.expires&&j.expires<=n?l.push(f):m[f.replace(d,"")]=j.data);while(f=l.pop())e.removeItem(f)}catch(o){}return m}f="__amplify__"+f;if(g===b){i=e.getItem(f),j=i?JSON.parse(i):{expires:-1};if(!(j.expires&&j.expires<=n))return j.data;e.removeItem(f)}else if(g===null)e.removeItem(f);else{j=JSON.stringify({data:g,expires:h.expires?n+h.expires:null});try{e.setItem(f,j)}catch(o){c[a]();try{e.setItem(f,j)}catch(o){throw c.error()}}}return m})}var c=a.store=function(a,b,d){var e=c.type;return d&&d.type&&d.type in c.types&&(e=d.type),c.types[e](a,b,d||{})};c.types={},c.type=null,c.addType=function(a,b){c.type||(c.type=a),c.types[a]=b,c[a]=function(b,d,e){return e=e||{},e.type=a,c(b,d,e)}},c.error=function(){return"amplify.store quota exceeded"};var d=/^__amplify__/;for(var f in{localStorage:1,sessionStorage:1})try{window[f].setItem("__amplify__","x"),window[f].removeItem("__amplify__"),e(f,window[f])}catch(g){}if(!c.types.localStorage&&window.globalStorage)try{e("globalStorage",window.globalStorage[window.location.hostname]),c.type==="sessionStorage"&&(c.type="globalStorage")}catch(g){}(function(){if(c.types.localStorage)return;var a=document.createElement("div"),d="amplify";a.style.display="none",document.getElementsByTagName("head")[0].appendChild(a);try{a.addBehavior("#default#userdata"),a.load(d)}catch(e){a.parentNode.removeChild(a);return}c.addType("userData",function(e,f,g){a.load(d);var h,i,j,k,l,m=f,n=(new Date).getTime();if(!e){m={},l=[],k=0;while(h=a.XMLDocument.documentElement.attributes[k++])i=JSON.parse(h.value),i.expires&&i.expires<=n?l.push(h.name):m[h.name]=i.data;while(e=l.pop())a.removeAttribute(e);return a.save(d),m}e=e.replace(/[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-"),e=e.replace(/^-/,"_-");if(f===b){h=a.getAttribute(e),i=h?JSON.parse(h):{expires:-1};if(!(i.expires&&i.expires<=n))return i.data;a.removeAttribute(e)}else f===null?a.removeAttribute(e):(j=a.getAttribute(e),i=JSON.stringify({data:f,expires:g.expires?n+g.expires:null}),a.setAttribute(e,i));try{a.save(d)}catch(o){j===null?a.removeAttribute(e):a.setAttribute(e,j),c.userData();try{a.setAttribute(e,i),a.save(d)}catch(o){throw j===null?a.removeAttribute(e):a.setAttribute(e,j),c.error()}}return m})})(),function(){function e(a){return a===b?b:JSON.parse(JSON.stringify(a))}var a={},d={};c.addType("memory",function(c,f,g){return c?f===b?e(a[c]):(d[c]&&(clearTimeout(d[c]),delete d[c]),f===null?(delete a[c],null):(a[c]=f,g.expires&&(d[c]=setTimeout(function(){delete a[c],delete d[c]},g.expires)),f)):e(a)})}()})(this.amplify=this.amplify||{}),function(a){function e(a,b){for(var c=0;c<a.length;c+=1)if(b(a[c],c,a)===!1)return}function f(a){var b=[];for(var c=0,d=a.length;c<d;c++)b=b.concat(a[c]);return b}function g(a,b,c){if(!a.length)return c();var d=0;(function e(){b(a[d],function(b){b||b===!1?(c(b),c=function(){}):(d+=1,d===a.length?c():e())})})()}function h(a,b,c){c=a;for(var d in b)if(b.hasOwnProperty(d)){c=b[d](a);if(c!==a)break}return c===a?"([._a-zA-Z0-9-]+)":c}function i(a,b){~a.indexOf("*")&&(a=a.replace(/\*/g,"([_.()!\\ %@&a-zA-Z0-9-]+)"));var c=a.match(/:([^\/]+)/ig),d;if(c){d=c.length;for(var e=0;e<d;e++)a=a.replace(c[e],h(c[e],b))}return a}Array.prototype.filter||(Array.prototype.filter=function(a,b){var c=[],d;for(var e=0,f=this.length;e<f;e++)e in this&&a.call(b,d=this[e],e,this)&&c.push(d);return c}),Array.isArray||(Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"});var b=document.location,c={mode:"modern",hash:location.hash,check:function(){var a=location.hash;a!=this.hash&&(this.hash=a,this.onHashChanged())},fire:function(){this.mode==="modern"?window.onhashchange():this.onHashChanged()},init:function(a){function c(){for(var a=0,b=window.Router.listeners.length;a<b;a++)window.Router.listeners[a]()}var b=this;window.Router.listeners||(window.Router.listeners=[]);if("onhashchange"in window&&(document.documentMode===undefined||document.documentMode>7))window.onhashchange=c,this.mode="modern";else{var d=document.createElement("iframe");d.id="state-frame",d.style.display="none",document.body.appendChild(d),this.writeFrame(""),"onpropertychange"in document&&"attachEvent"in document&&document.attachEvent("onpropertychange",function(){event.propertyName==="location"&&b.check()}),window.setInterval(function(){b.check()},50),this.onHashChanged=c,this.mode="legacy"}return window.Router.listeners.push(a),this.mode},destroy:function(a){if(!window.Router||!window.Router.listeners)return;var b=window.Router.listeners;for(var c=b.length-1;c>=0;c--)b[c]===a&&b.splice(c,1)},setHash:function(a){return this.mode==="legacy"&&this.writeFrame(a),location.hash=a[0]==="/"?a:"/"+a,this},writeFrame:function(a){var b=document.getElementById("state-frame"),c=b.contentDocument||b.contentWindow.document;c.open(),c.write("<script>_hash = '"+a+"'; onload = parent.listener.syncHash;<script>"),c.close()},syncHash:function(){var a=this._hash;return a!=location.hash&&(location.hash=a),this},onHashChanged:function(){}},d=a.Router=function(a){if(!(this instanceof d))return new d(a);this.params={},this.routes={},this.methods=["on","once","after","before"],this._methods={},this._insert=this.insert,this.insert=this.insertEx,this.configure(),this.mount(a||{})};d.prototype.init=function(a){var b=this;return this.handler=function(){var a=location.hash.replace(/^#/,"");b.dispatch("on",a)},location.hash===""&&a&&(location.hash=a),location.hash.length>0&&this.handler(),c.init(this.handler),this},d.prototype.explode=function(){var a=location.hash;return a[1]==="/"&&(a=a.slice(1)),a.slice(1,a.length).split("/")},d.prototype.setRoute=function(a,b,d){var e=this.explode();return typeof a=="number"&&typeof b=="string"?e[a]=b:typeof d=="string"?e.splice(a,b,s):e=[a],c.setHash(e.join("/")),e},d.prototype.insertEx=function(a,b,c,d){return a==="once"&&(a="on",c=function(a){var b=!1;return function(){if(b)return;return b=!0,a.apply(this,arguments)}}(c)),this._insert(a,b,c,d)},d.prototype.getState=function(){return this.state},d.prototype.getRoute=function(a){var b=a;if(typeof a=="number")b=this.explode()[a];else if(typeof a=="string"){var c=this.explode();b=c.indexOf(a)}else b=this.explode();return b},d.prototype.destroy=function(){return c.destroy(this.handler),this},d.prototype.configure=function(a){a=a||{};for(var b=0;b<this.methods.length;b++)this._methods[this.methods[b]]=!0;return this.recurse=a.recurse||this.recurse||!1,this.async=a.async||!1,this.delimiter=a.delimiter||"/",this.strict=typeof a.strict=="undefined"?!0:a.strict,this.notfound=a.notfound,this.resource=a.resource,this.parseBody=typeof a.parseBody=="undefined"?!0:a.parseBody,this.every={after:a.after||null,before:a.before||null,on:a.on||null},this},d.prototype.param=function(a,b){a[0]!==":"&&(a=":"+a);var c=new RegExp(a,"g");this.params[a]=function(a){return a.replace(c,b.source||b)}},d.prototype.on=d.prototype.route=function(a,b,c){var d=this;!c&&typeof b=="function"&&(c=b,b=a,a="on");if(Array.isArray(b))return b.forEach(function(b){d.on(a,b,c)});b.source&&(b=b.source.replace(/\\\//ig,"/"));if(Array.isArray(a))return a.forEach(function(a){d.on(a.toLowerCase(),b,c)});this.insert(a,this.scope.concat(b.split(new RegExp(this.delimiter))),c)},d.prototype.dispatch=function(a,b,c){function h(){d.last=e.after,d.invoke(d.runlist(e),d,c)}var d=this,e=this.traverse(a,b,this.routes,""),f=this._invoked,g;return this._invoked=!0,!e||e.length===0?(this.last=[],typeof this.notfound=="function"&&this.invoke([this.notfound],{method:a,path:b},c),!1):(this.recurse==="forward"&&(e=e.reverse()),g=this.every&&this.every.after?[this.every.after].concat(this.last):[this.last],g&&g.length>0&&f?(this.async?this.invoke(g,this,h):(this.invoke(g,this),h()),!0):(h(),!0))},d.prototype.invoke=function(a,b,c){var d=this;this.async?g(a,function f(c,d){if(Array.isArray(c))return g(c,f,d);typeof c=="function"&&c.apply(b,a.captures.concat(d))},function(){c&&c.apply(b,arguments)}):e(a,function h(c){if(Array.isArray(c))return e(c,h);if(typeof c=="function")return c.apply(b,a.captures||null);typeof c=="string"&&d.resource&&d.resource[c].apply(b,a.captures||null)})},d.prototype.traverse=function(a,b,c,d){var e=[],f,g,h,i,j;if(b===this.delimiter&&c[a])return i=[[c.before,c[a]].filter(Boolean)],i.after=[c.after].filter(Boolean),i.matched=!0,i.captures=[],i;for(var k in c)if(c.hasOwnProperty(k)&&(!this._methods[k]||this._methods[k]&&typeof c[k]=="object"&&!Array.isArray(c[k]))){f=g=d+this.delimiter+k,this.strict||(g+="["+this.delimiter+"]?"),h=b.match(new RegExp("^"+g));if(!h)continue;if(h[0]&&h[0]==b&&c[k][a])return i=[[c[k].before,c[k][a]].filter(Boolean)],i.after=[c[k].after].filter(Boolean),i.matched=!0,i.captures=h.slice(1),this.recurse&&c===this.routes&&(i.push([c.before,c.on].filter(Boolean)),i.after=i.after.concat([c.after].filter(Boolean))),i;i=this.traverse(a,b,c[k],f);if(i.matched)return i.length>0&&(e=e.concat(i)),this.recurse&&(e.push([c[k].before,c[k].on].filter(Boolean)),i.after=i.after.concat([c[k].after].filter(Boolean)),c===this.routes&&(e.push([c.before,c.on].filter(Boolean)),i.after=i.after.concat([c.after].filter(Boolean)))),e.matched=!0,e.captures=i.captures,e.after=i.after,e}return!1},d.prototype.insert=function(a,b,c,d){var e,f,g,h,j;b=b.filter(function(a){return a&&a.length>0}),d=d||this.routes,j=b.shift(),/\:|\*/.test(j)&&!/\\d|\\w/.test(j)&&(j=i(j,this.params));if(b.length>0)return d[j]=d[j]||{},this.insert(a,b,c,d[j]);if(!j&&!b.length&&d===this.routes){e=typeof d[a];switch(e){case"function":d[a]=[d[a],c];return;case"object":d[a].push(c);return;case"undefined":d[a]=c;return}return}f=typeof d[j],g=Array.isArray(d[j]);if(d[j]&&!g&&f=="object"){e=typeof d[j][a];switch(e){case"function":d[j][a]=[d[j][a],c];return;case"object":d[j][a].push(c);return;case"undefined":d[j][a]=c;return}}else if(f=="undefined"){h={},h[a]=c,d[j]=h;return}throw new Error("Invalid route context: "+f)},d.prototype.extend=function(a){var b=this,c=a.length,d;for(d=0;d<c;d++)(function(a){b._methods[a]=!0,b[a]=function(){var c=arguments.length===1?[a,""]:[a];b.on.apply(b,c.concat(Array.prototype.slice.call(arguments)))}})(a[d])},d.prototype.runlist=function(a){var b=this.every&&this.every.before?[this.every.before].concat(f(a)):f(a);return this.every&&this.every.on&&b.push(this.every.on),b.captures=a.captures,b.source=a.source,b},d.prototype.mount=function(a,b){function d(b,d){var e=b,f=b.split(c.delimiter),g=typeof a[b],h=f[0]===""||!c._methods[f[0]],i=h?"on":e;h&&(e=e.slice((e.match(new RegExp(c.delimiter))||[""])[0].length),f.shift());if(h&&g==="object"&&!Array.isArray(a[b])){d=d.concat(f),c.mount(a[b],d);return}h&&(d=d.concat(e.split(c.delimiter))),c.insert(i,d,a[b])}if(!a||typeof a!="object"||Array.isArray(a))return;var c=this;b=b||[];for(var e in a)a.hasOwnProperty(e)&&d(e,b.slice(0))}}(window),function(a){var b=function(){return+(new Date)},c=function(c,d,e){var f=new XMLHttpRequest;d||(d=function(){}),e||(e=function(){});if("withCredentials"in f)try{f.open("GET",c+"?"+b(),!0),f.onload=function(){try{d(JSON.parse(this.responseText))}catch(a){e(a)}},f.onerror=e,f.send()}catch(g){e(g)}else{var h=a.document,i=h.createElement("script"),j="callback"+b();a[j]=d,i.onerror=e,i.src=c+"?callback="+j,h.body.appendChild(i)}},d={url:"http://node-hnapi.herokuapp.com/",url2:"http://node-hnapi.jit.su/",news:function(a,b){var e="news";c(d.url+e,a,function(){c(d.url2+e,a,b)})},news2:function(a,b){var e="news2";c(d.url+e,a,function(){c(d.url2+e,a,b)})},item:function(a,b,e){var f="item/"+a;c(d.url+f,b,function(){c(d.url2+f,b,e)})},comments:function(a,b,e){var f="comments/"+a;c(d.url+f,b,function(){c(d.url2+f,b,e)})}};a.hnapi=d}(window);var Hogan={};(function(a,b){function c(a,b,c){function d(){}function e(){}d.prototype=a,e.prototype=a.subs;var f,g=new d;g.subs=new e,g.ib();for(f in b)g.subs[f]=b[f];for(f in c)g.partials[f]=c[f];return g}function j(a){return String(a===null||a===undefined?"":a)}function k(a){return a=j(a),i.test(a)?a.replace(d,"&amp;").replace(e,"&lt;").replace(f,"&gt;").replace(g,"&#39;").replace(h,"&quot;"):a}a.Template=function(a,b,c,d){a=a||{},this.r=a.code||this.r,this.c=c,this.options=d,this.text=b||"",this.partials=a.partials||{},this.subs=a.subs||{},this.ib()},a.Template.prototype={r:function(a,b,c){return""},v:k,t:j,render:function(b,c,d){return this.ri([b],c||{},d)},ri:function(a,b,c){return this.r(a,b,c)},ep:function(a,b){var d=this.partials[a],e=b[d.name];if(d.instance&&d.base==e)return d.instance;if(typeof e=="string"){if(!this.c)throw new Error("No compiler available.");e=this.c.compile(e,this.options)}return e?(this.partials[a].base=e,d.subs&&(e=c(e,d.subs,d.partials)),this.partials[a].instance=e,e):null},rp:function(a,b,c,d){var e=this.ep(a,c);return e?e.ri(b,c,d):""},rs:function(a,b,c){var d=a[a.length-1];if(!l(d)){c(a,b,this);return}for(var e=0;e<d.length;e++)a.push(d[e]),c(a,b,this),a.pop()},s:function(a,b,c,d,e,f,g){var h;return l(a)&&a.length===0?!1:(typeof a=="function"&&(a=this.ms(a,b,c,d,e,f,g)),h=a===""||!!a,!d&&h&&b&&b.push(typeof a=="object"?a:b[b.length-1]),h)},d:function(a,b,c,d){var e=a.split("."),f=this.f(e[0],b,c,d),g=null;if(a==="."&&l(b[b.length-2]))return b[b.length-1];for(var h=1;h<e.length;h++)f&&typeof f=="object"&&f[e[h]]!=null?(g=f,f=f[e[h]]):f="";return d&&!f?!1:(!d&&typeof f=="function"&&(b.push(g),f=this.mv(f,b,c),b.pop()),f)},f:function(a,b,c,d){var e=!1,f=null,g=!1;for(var h=b.length-1;h>=0;h--){f=b[h];if(f&&typeof f=="object"&&f[a]!=null){e=f[a],g=!0;break}}return g?(!d&&typeof e=="function"&&(e=this.mv(e,b,c)),e):d?!1:""},ls:function(a,b,c,d,e){var f=this.options.delimiters;return this.options.delimiters=e,this.b(this.ct(j(a.call(b,d)),b,c)),this.options.delimiters=f,!1},ct:function(a,b,c){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(a,this.options).render(b,c)},b:b?function(a){this.buf.push(a)}:function(a){this.buf+=a},fl:b?function(){var a=this.buf.join("");return this.buf=[],a}:function(){var a=this.buf;return this.buf="",a},ib:function(){this.buf=b?[]:""},ms:function(a,b,c,d,e,f,g){var h=b[b.length-1],i=a.call(h);return typeof i=="function"?d?!0:this.ls(i,h,c,this.text.substring(e,f),g):i},mv:function(a,b,c){var d=b[b.length-1],e=a.call(d);return typeof e=="function"?this.ct(j(e.call(d)),d,c):e},sub:function(a,b,c){var d=this.subs[a];d&&d(b,c,this)}};var d=/&/g,e=/</g,f=/>/g,g=/\'/g,h=/\"/g,i=/[&<>\"\']/,l=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"}})(typeof exports!="undefined"?exports:Hogan),function(a){function e(a,b,d){function e(){var d=c[a],e=function(a){return function(){throw a}},f,g;for(f=0,g=d.length;f<g;f++)try{d[f].func(a,b)}catch(h){setTimeout(e(h),0)}}return c.hasOwnProperty(a)?(d===!0?e():setTimeout(e,0),!0):!1}"use strict";var b={version:"1.0.4-dev"},c={},d=-1;typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(module.exports=b),exports.PubSub=b):a.PubSub=b,b.publish=function(a,b){return e(a,b,!1)},b.publishSync=function(a,b){return e(a,b,!0)},b.subscribe=function(a,b){c.hasOwnProperty(a)||(c[a]=[]);var e=(++d).toString();return c[a].push({token:e,func:b}),e},b.unsubscribe=function(a){var b,d,e;for(b in c)if(c.hasOwnProperty(b))for(d=0,e=c[b].length;d<e;d++)if(c[b][d].token===a)return c[b].splice(d,1),a;return!1},typeof define=="function"&&define.amd&&define("pubsub",function(){return b})}(this),function(a,b){typeof define=="function"&&define.amd?define("tappable",[],function(){return b(a,window.document),a.tappable}):b(a,window.document)}(this,function(a,b){var c=Math.abs,d=function(){},e={noScroll:!1,activeClass:"tappable-active",onTap:d,onStart:d,onMove:d,onMoveOut:d,onMoveIn:d,onEnd:d,onCancel:d,allowClick:!1,boundMargin:50,noScrollDelay:0,activeClassDelay:0,inactiveClassDelay:0},f="ontouchend"in document,g={start:f?"touchstart":"mousedown",move:f?"touchmove":"mousemove",end:f?"touchend":"mouseup"},h=function(a,c){var d=b.elementFromPoint(a,c);return d.nodeType==3&&(d=d.parentNode),d},i=function(a){var b=a.target;if(b)return b;var c=a.targetTouches[0];return h(c.clientX,c.clientY)},j=function(a){return a.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")},k=function(a,b){if(!b)return;if(a.classList){a.classList.add(b);return}if(j(a.className).indexOf(b)>-1)return;a.className=j(a.className+" "+b)},l=function(a,b){if(!b)return;if(a.classList){a.classList.remove(b);return}a.className=a.className.replace(new RegExp("(^|\\s)"+b+"(?:\\s|$)"),"$1")},m=function(a,c){var d=b.documentElement,e=d.matchesSelector||d.mozMatchesSelector||d.webkitMatchesSelector||d.msMatchesSelector;return e.call(a,c)},n=function(a,b){var c=!1;do c=m(a,b);while(!c&&(a=a.parentNode)&&a.ownerDocument);return c?a:!1};a.tappable=function(a,c){typeof c=="function"&&(c={onTap:c});var d={};for(var f in e)d[f]=c[f]||e[f];var j=d.containerElement||b.body,m,o,p,q,r,s=!1,t=!1,u=d.activeClass,v=d.activeClassDelay,w,x=d.inactiveClassDelay,y,z=d.noScroll,A=d.noScrollDelay,B,C=d.boundMargin;j.addEventListener(g.start,function(b){var c=n(i(b),a);if(!c)return;v?(clearTimeout(w),w=setTimeout(function(){k(c,u)},v)):k(c,u),x&&c==o&&clearTimeout(y),p=b.clientX,q=b.clientY;if(!p||!q){var e=b.targetTouches[0];p=e.clientX,q=e.clientY}m=c,s=!1,t=!1,r=z?c.getBoundingClientRect():null,A&&(clearTimeout(B),z=!1,B=setTimeout(function(){z=!0},A)),d.onStart.call(j,b,c)},!1),j.addEventListener(g.move,function(a){if(!m)return;z?a.preventDefault():clearTimeout(w);var b=a.target,c=a.clientX,e=a.clientY;if(!b||!c||!e){var f=a.changedTouches[0];c||(c=f.clientX),e||(e=f.clientY),b||(b=h(c,e))}z?c>r.left-C&&c<r.right+C&&e>r.top-C&&e<r.bottom+C?(t=!1,k(m,u),d.onMoveIn.call(j,a,b)):(t=!0,l(m,u),d.onMoveOut.call(j,a,b)):!s&&Math.abs(e-q)>10&&(s=!0,l(m,u),d.onCancel.call(b,a)),d.onMove.call(j,a,b)},!1),j.addEventListener(g.end,function(a){if(!m)return;clearTimeout(w);if(x){v&&!s&&k(m,u);var b=m;y=setTimeout(function(){l(b,u)},x)}else l(m,u);d.onEnd.call(j,a,m);var c=a.which==3||a.button==2;!s&&!t&&!c&&d.onTap.call(j,a,m),o=m,m=null,setTimeout(function(){p=q=null},400)},!1),j.addEventListener("touchcancel",function(a){if(!m)return;l(m,u),m=p=q=null,d.onCancel.call(j,a)},!1),d.allowClick||j.addEventListener("click",function(b){var c=n(b.target,a);c?b.preventDefault():p&&q&&Math.abs(b.clientX-p)<25&&Math.abs(b.clientY-q)<25&&(b.stopPropagation(),b.preventDefault())},!1)}}),function(a,b){function c(a,b){a.push.apply(a,b?{}.toString.call(b)=="[object Array]"?b:[b]:[])}function d(a,b,c){for(var d=0,e=a.length;d<e;++d)a[d].call(b,c)}function e(a){if(!(this instanceof e))return new e(a);this.object=a.object,this.property=a.property,this.from=this._from=a.from||this.object[this.property],this.to={}.toString.call(a.to)=="[object Array]"?a.to:[a.to],this.target=0,this.parser=a.parser||function(a){var b=e.Parsers,c,d=[],f,g;for(f in b)b.hasOwnProperty(f)&&d.push(b[f]);d.sort(function(a,b){return(b.priority||0)-(a.priority||0)});for(f=0,g=d.length;f<g;++f){c=new d[f];if(c.parse(a)!=null)return c}return c=new b.Number,c.parse(a),c}(this.from),this.transition=a.transition||e.Transitions.linear,this.duration=a.duration||500,this.fps=a.fps||40,this.frameInterval=1e3/this.fps,this.frames=a.frames||~~(this.duration/this.frameInterval+.5),this.frame=a.frame==b?-1:0,this.running=!1,this.startHandlers=[],this.updateHandlers=[],this.finishHandlers=[],c(this.startHandlers,a.start),c(this.updateHandlers,a.update),c(this.finishHandlers,a.finish)}function j(a,b,c){return(b-a)*c+a}var f=e.prototype,g,h,i=a.Viper;f.start=function(){return this.running||(this.resume(),d(this.startHandlers,this,this.object)),this},f.stop=function(){return this.running&&(this.pause(),d(this.finishHandlers,this,this.object)),this},f.pause=function(a){if(this.running){this.running=this.time=!1,clearInterval(this.timer);var c=this;a!=b&&setTimeout(function(){c.resume()},a)}return this},f.resume=function(){if(!this.running&&this.frame<this.frames){var a=this;this.timer=setInterval(function(){a.step(+(new Date))},this.frameInterval),this.running=!0}return this},f.step=function(a){this.frame+=(a-(this.time||a))/this.frameInterval,this.time=a,this.object[this.property]=this.parser.compute(this.from,this.to[this.target],this.frame<this.frames?this.transition(this.frame/this.frames):1),d(this.updateHandlers,this,this.object),this.frame>=this.frames&&(this.frame=this.time=0,this.parser.parse(this.from=this.to[this.target++]),this.to[this.target]==b&&(this.parser.parse(this.from=this._from),this.target=0,this.stop()))},e.Transitions={linear:function(a){return a},sine:function(a){return 1-Math.cos(a*Math.PI/2)},elastic:function(a){return Math.pow(2,10*--a)*Math.cos(20*a*Math.PI/3)},bounce:function(a){var b=0,c=1,d;while(a<(7-4*b)/11)b+=c,c/=2;return d=(11-6*b-11*a)/4,c*c-d*d}};for(h in e.Transitions)e.Transitions.hasOwnProperty(h)&&(g=e.Transitions[h],g.out=function(a){return function(b){return 1-a(1-b)}}(g),g.inOut=function(a){return function(b){return(b>.5?2-a(2*(1-b)):a(2*b))/2}}(g));e.Parsers={Number:function(){this.parse=function(a,c){a+="";var d=/(\D*)(\d+)(.*)?/.exec(a)||[,,NaN],e=parseFloat(d[2]);return c||(this.prefix=d[1]||"",this.suffix=d[3]||"",this.value=e),isNaN(e)?b:e},this.compute=function(a,b,c){return this.prefix+j(this.value,this.parse(b,!0),c)+this.suffix}},Color:function(){this.parse=function(a,b){var c=parseInt,d;if(/^#[\da-f]{6}$/i.test(a))d=[c(a.substring(1,3),16),c(a.substring(3,5),16),c(a.substring(5,7),16)];else if(d=/^(rgb\()?(\d+),\s*(\d+),\s*(\d+)\)?$/.exec(a))d=[c(d[2]),c(d[3]),c(d[4])];return b||(this.value=d),d},this.compute=function(a,b,c){for(var d=[],e=this.parse(b,!0),f=0,g=this.value.length;f<g;++f)d.push(~~(j(this.value[f],e[f],c)+.5));return"rgb("+d+")"}},String:function(){this.parse=function(a){return""+a},this.compute=function(a,b,c){a+="",b+="";var d=~~(b.length*c+.5);return b.substr(0,d)+a.substr(d,a.length-d-~~((a.length-b.length)*c+.5))}}},e.Parsers.Color.priority=1,e.Parsers.String.priority=-9,e.noConflict=function(){return a.Viper=i,e},a.Viper=e}(this)