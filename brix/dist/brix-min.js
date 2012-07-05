/*! Brix - v0.1.0 - 7/5/2012
* https://github.com/etaoux/brix
* Copyright (c) 2012 etaoux; Licensed MIT */
KISSY.add("brix/core/mustache",function(a){var b=typeof module!="undefined"&&module.exports||{};return function(a){function i(a){return h.test(a)}function n(a){return String(a).replace(/&(?!\w+;)|[<>"']/g,function(a){return m[a]||a})}function o(a,b,c,d){d=d||"<template>";var e=b.split("\n"),f=Math.max(c-3,0),g=Math.min(e.length,c+3),h=e.slice(f,g),i;for(var j=0,k=h.length;j<k;++j)i=j+f+1,h[j]=(i===c?" >> ":"    ")+h[j];return a.template=b,a.line=c,a.file=d,a.message=[d+":"+c,h.join("\n"),"",a.message].join("\n"),a}function p(a,b,c){if(a===".")return b[b.length-1];var d=a.split("."),e=d.length-1,f=d[e],g,h,i=b.length,j,k;while(i){k=b.slice(0),h=b[--i],j=0;while(j<e){h=h[d[j++]];if(h==null)break;k.push(h)}if(h&&typeof h=="object"&&f in h){g=h[f];break}}return typeof g=="function"&&(g=g.call(k[k.length-1])),g==null?c:g}function q(a,b,c,d){var e="",h=p(a,b);if(d){if(h==null||h===!1||f(h)&&h.length===0)e+=c()}else if(f(h))g(h,function(a){b.push(a),e+=c(),b.pop()});else if(typeof h=="object")b.push(h),e+=c(),b.pop();else if(typeof h=="function"){var i=b[b.length-1],j=function(a){return w(a,i)};e+=h.call(i,c(),j)||""}else h&&(e+=c());return e}function r(b,c){c=c||{};var d=c.tags||a.tags,e=d[0],f=d[d.length-1],g=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'],h=[],k=!1,l=!1,m=function(){if(k&&!l&&!c.space)while(h.length)g.splice(h.pop(),1);else h=[];k=!1,l=!1},n=[],p,q,r,s=function(a){d=j(a).split(/\s+/),q=d[0],r=d[d.length-1]},t=function(a){g.push('";',p,'\nvar partial = partials["'+j(a)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')},u=function(a,d){var e=j(a);if(e==="")throw o(new Error("Section name may not be empty"),b,z,c.file);n.push({name:e,inverted:d}),g.push('";',p,'\nvar name = "'+e+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')},v=function(a){u(a,!0)},w=function(a){var d=j(a),e=n.length!=0&&n[n.length-1].name;if(!e||d!=e)throw o(new Error('Section named "'+d+'" was never opened'),b,z,c.file);var f=n.pop();g.push('";',"\n    return buffer;","\n  };","\n})();"),f.inverted?g.push("\nbuffer += renderSection(name,stack,callback,true);"):g.push("\nbuffer += renderSection(name,stack,callback);"),g.push('\nbuffer += "')},x=function(a){g.push('";',p,'\nbuffer += lookup("'+j(a)+'",stack,"");','\nbuffer += "')},y=function(a){g.push('";',p,'\nbuffer += escapeHTML(lookup("'+j(a)+'",stack,""));','\nbuffer += "')},z=1,A,B;for(var C=0,D=b.length;C<D;++C)if(b.slice(C,C+e.length)===e){C+=e.length,A=b.substr(C,1),p="\nline = "+z+";",q=e,r=f,k=!0;switch(A){case"!":C++,B=null;break;case"=":C++,f="="+f,B=s;break;case">":C++,B=t;break;case"#":C++,B=u;break;case"^":C++,B=v;break;case"/":C++,B=w;break;case"{":f="}"+f;case"&":C++,l=!0,B=x;break;default:l=!0,B=y}var E=b.indexOf(f,C);if(E===-1)throw o(new Error('Tag "'+e+'" was not closed properly'),b,z,c.file);var F=b.substring(C,E);B&&B(F);var G=0;while(~(G=F.indexOf("\n",G)))z++,G++;C=E+f.length-1,e=q,f=r}else{A=b.substr(C,1);switch(A){case'"':case"\\":l=!0,g.push("\\"+A);break;case"\r":break;case"\n":h.push(g.length),g.push("\\n"),m(),z++;break;default:i(A)?h.push(g.length):l=!0,g.push(A)}}if(n.length!=0)throw o(new Error('Section "'+n[n.length-1].name+'" was not closed properly'),b,z,c.file);m(),g.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");var H=g.join("").replace(/buffer \+= "";\n/g,"");return c.debug&&(typeof console!="undefined"&&console.log?console.log(H):typeof print=="function"&&print(H)),H}function s(a,b){var c="view,partials,stack,lookup,escapeHTML,renderSection,render",d=r(a,b),e=new Function(c,d);return function(c,d){d=d||{};var f=[c];try{return e(c,d,f,p,n,q,w)}catch(g){throw o(g.error,a,g.line,b.file)}}}function u(){t={}}function v(a,b){return b=b||{},b.cache!==!1?(t[a]||(t[a]=s(a,b)),t[a]):s(a,b)}function w(a,b,c){return v(a)(b,c)}a.name="mustache.js",a.version="0.5.0-dev",a.tags=["{{","}}"],a.parse=r,a.compile=v,a.render=w,a.clearCache=u,a.to_html=function(a,b,c,d){var e=w(a,b,c);if(typeof d=="function")d(e);else return e};var b=Object.prototype.toString,c=Array.isArray,d=Array.prototype.forEach,e=String.prototype.trim,f;c?f=c:f=function(a){return b.call(a)==="[object Array]"};var g;d?g=function(a,b,c){return d.call(a,b,c)}:g=function(a,b,c){for(var d=0,e=a.length;d<e;++d)b.call(c,a[d],d,a)};var h=/^\s*$/,j;if(e)j=function(a){return a==null?"":e.call(a)};else{var k,l;i("\u00a0")?(k=/^\s+/,l=/\s+$/):(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),j=function(a){return a==null?"":String(a).replace(k,"").replace(l,"")}}var m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t={}}(b),b}),KISSY.add("brix/core/mu",function(a,b){function c(a,b){var c=d(a),f="";for(var g=0;g<c.length;g++){f="if("+c[g]+")";if(b[f])continue;b[f]=e(c[g])}}function d(a){var b=/\{{2,3}[\^#]?if\((.*?)\)\}{2,3}?/ig,c=/\{{2,3}[\^#]?if\((.*?)\)\}{2,3}?/i,d=a.match(b),e=[];if(d)for(var f=0;f<d.length;f++)e.push(d[f].match(c)[1]);return e}function e(a){a=a.split("==");var b=function(){var b=a[0].split("."),c=a[1],d=this;for(var e=b.length-1;e>-1;e--){var f=b.slice(e),g=d;try{for(var h=0;h<f.length-1;h++)g=g[f[h]];if(f[f.length-1]in g)return g[f[f.length-1]].toString()===c?!0:!1}catch(i){}}return!1};return b}function f(a,b){var c,d;for(c in a)d=a[c],d instanceof Array?g(d):typeof d=="object"&&b<5&&f(d,b+1)}function g(a){for(var b=0;b<a.length;b++){var c=a[b];typeof c=="object"&&(b===0?c.__first__=!0:b===a.length-1?c.__last__=!0:c.__mid__=!0,c.__index__=b)}}return{to_html:function(a,d){return typeof d=="object"&&f(d,0),c(a,d),b.to_html.apply(this,arguments)},name:b.name,version:b.version,tags:b.tags,parse:b.parse,compile:b.compile,render:b.render,clearCache:b.clearCache}},{requires:["./mustache"]}),KISSY.add("brix/core/tmpler",function(S,Mustache,Node){function _stamp(a,b){return b=b||"brick_",a.attr("id")||a.attr("id",S.guid("brix_"+b)),a.attr("id")}function _inDom(a){return S.one(document.body).contains(a)}function _recovery(a,b){return a=a.replace(/((\{{2,3}\#(.+)?\}{2,3})([\s\S]*)?\s*(\{{2,3}~\3\}{2,3}))\=\"\"/g,"$1"),a=a.replace(/(\{{2,3}[\^#~]?)iftmplbrick\_(\d+)(\}{2,3})/g,function(a,c,d,e){return c+b[parseInt(d)]+e}),a=a.replace(/(\{{2,3})~/g,"$1/"),a}function Tmpler(a,b){a&&b!==!1?(this.bricks={},this._praseTmpl(a)):this.tmpl=a}var $=Node.all;return S.extend(Tmpler,Object,{_praseTmpl:function(a){this._buildBricks(a)},_buildBricks:function(a){var b=this,c=$(a),d=null,e=_inDom(c[0]);if(!e){c.remove();var f=/(\{{2,3}\#(.+)?\}{2,3})\s*([\s\S]*)?\s*((\{{2,3})\/\2(\}{2,3}))/g;while(f.test(a))a=a.replace(f," $1$3$5~$2$6 "),f.lastIndex=0;var g=[];a=a.replace(/(\{{2,3}[\^#~])?(if\(.*?\))(\}{2,3})?/ig,function(a,b,c,d,e,f){var h=S.indexOf(c,g),i="iftmplbrick_";return h<0?(i+=g.length,g.push(c)):i+=h,b+i+d}),c=$(a),c.length>1&&(c=$("<div></div>").append(c)),d=$("<div></div>").append(c)}else d=c;this.id=_stamp(c);var h=d.all("[bx-tmpl-source]");h.each(function(a){var b=a.attr("bx-tmpl-source"),c=d.one(b).clone(!0);c.removeAttr("id"),_stamp(c,"tmpl_"),c.insertBefore(a),a.remove()});var i=d.all("[bx-brick]:not([bx-parent])");i.each(function(a){b._buildBrick(a,d,b.bricks,g)}),e||(b.tmpl=_recovery(d.html(),g),c.remove(),d.remove()),d=null,c=null,this.inDom=e},_buildBrick:function(el,container,bricks,arr){var self=this,id=_stamp(el),name=el.attr("bx-brick"),path=el.attr("bx-path"),config=el.attr("bx-config"),tmplNodes=el.all("[bx-tmpl="+name+"]");el.hasAttr("bx-tmpl")&&(tmplNodes=tmplNodes.add(el[0])),config=config?eval("config="+config):{},bricks[id]={path:path,config:config,tmpls:[],bricks:{}};var tmpls=bricks[id].tmpls;tmplNodes.each(function(a){var b=_stamp(a,"tmpl_"),c=a.attr("bx-datakey"),d=_recovery(a.html(),arr);tmpls.push({id:b,datakey:c?c.split(","):[],tmpler:new Tmpler(d,!1)})}),tmplNodes=null,container.all("[bx-parent="+name+"]").each(function(a){self._buildBrick(a,container,bricks[id].bricks)})},addTmpl:function(a,b){var c=this,d=!1;return S.each(c.bricks,function(c,e){if(e===a)return S.each(b,function(a){c.tmpls.push({id:a.id,datakey:a.datakey.split(","),tmpler:new Tmpler(a.tmpl,!1)})}),d=!0,!1}),d},getTmpl:function(){return this.tmpl},to_html:function(a){return Mustache.to_html(this.getTmpl(),a)}}),Tmpler},{requires:["./mu","node","sizzle"]}),KISSY.add("brix/core/dataset",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}return c.ATTRS={data:{}},a.extend(c,b,{setRenderer:function(a,b,c){var d=this,e=a,f,g,h=d.get("data");if(e){var i=function(a,d){var f=a,g=d,i=e[f][g];h[(c?c+"_":"")+f+"_"+g]=function(){return i.call(this,b,f)}};for(f in e)for(g in e[f])i(f,g)}}}),c},{requires:["base"]}),KISSY.add("brix/core/chunk",function(a,b,c,d,e){function g(){g.superclass.constructor.apply(this,arguments);var a=this;a._buildTmpler();var b=a.get("tmpler");b?(a.set("id",b.id),a.set("el","#"+b.id),b.inDom?a.__set("rendered",!0):a.get("autoRender")&&a.render()):a.pagelet||a.__set("rendered",!0)}var f=b.all;return g.ATTRS={id:{value:!1},el:{getter:function(b){return a.isString(b)&&(b=f(b)),b}},container:{value:"body",getter:function(b){return a.isString(b)&&(b=f(b)),b}},tmpl:{value:!1},tmpler:{value:!1},rendered:{value:!1},autoRender:{value:!1},data:{value:!1},dataset:{value:!1}},a.extend(g,c,{_buildTmpler:function(){var a=this,b=a.get("tmpler");if(!b&&!a.pagelet){var c=a.get("tmpl");c&&(b=new e(c),a.set("tmpler",b),a._buildDataset())}},_buildDataset:function(){var b=this,c=b.get("dataset");if(!c&&!b.pagelet){var e=b.get("data")||{};e=a.clone(e),c=new d({data:e}),b.set("dataset",c)}c&&c.on("afterDataChange",function(a){b._render(a.subAttrName,a.newVal)})},addTmpl:function(a,b){var c=this.pagelet?this.pagelet:this;return c.get("tmpler").addTmpl(a,b)},setChunkData:function(b,c){var d=this.pagelet?this.pagelet:this,e=d.get("dataset");c=a.clone(c),e.set("data."+b,c)},render:function(){var a=this;a.get("rendered")||(a._render("data",a.get("dataset").get("data")),a.__set("rendered",!0),a.fire("rendered"))},_render:function(a,b){var c=this.pagelet?this.pagelet:this,d=c.get("tmpler");if(a.split(".").length>1)a=a.replace(/^data\./,""),c._renderTmpl(d.bricks,a,b);else{var e=c.get("container");e.append(d.to_html(b))}},_renderTmpl:function(b,c,d){a.each(b,function(b){a.each(b.tmpls,function(b,e){if(a.inArray(c,b.datakey)){var f={};a.each(b.datakey,function(a){var b=d,c=a.split("."),e=c.length,g=0;while(g!==e)b=b[c[g]],g++;f[c[e-1]]=b,b=null}),a.one("#"+b.id).html(b.tmpler.to_html(f)),f=null}}),this._renderTmpl(b.bricks,c,d)},this)},destroy:function(){var b=this,c=b.get("el"),d=b.pagelet?b.pagelet:this,e=d.get("tmpler");if(e&&!a.isEmptyObject(e.bricks)){var f=!1;b.pagelet&&(f=c.attr("id")),d._destroyBricks(e.bricks,f)}else b._detachEvent&&b._detachEvent();c.remove()},_destroyBricks:function(b,c){var d=this;a.each(b,function(a,e){if(c){if(c===e)return d._destroyBrick(a),delete b[e],!1;d._destroyBricks(a.bricks)}else d._destroyBrick(a),delete b[e]})},_destroyBrick:function(a){var b=this;a.brick&&(a.brick._detachEvent(),b._destroyBricks(a.bricks),a.brick.pagelet=null,a.brick=null,delete a)}}),g},{requires:["node","base","./dataset","./tmpler"]}),KISSY.add("brix/core/brick",function(a,b){function c(b,c){return a.isString(c)?b[c]:c}function d(){var b=this;b.pagelet=arguments[0]?arguments[0].pagelet:null,d.superclass.constructor.apply(this,arguments);var c=b.pagelet?b.pagelet:b;c.get("rendered")?(b.initialize(),b._bindEvent()):c.on("rendered",function(){b.initialize(),b._bindEvent()});var e=b.get("tmpler"),f=b.get("id");e&&!a.isEmptyObject(e.bricks)&&a.each(e.bricks,function(a,c){e.bricks[c].brick=b}),!e&&!f&&(f=b.get("el").attr("id")||b.constructor.name,b.set("id",f));var g=b.constructor.RENDERER;g&&c.get("dataset").setRenderer(g,b,f)}return d.ATTACH={},d.ATTRS={events:{}},a.extend(d,b,{initialize:function(){},_detachEvent:function(){var b=this,c=b.constructor.ATTACH;c&&b._removeEvents(c);var d=b.constructor.DOCATTACH;d&&b._removeEvents(d,a.one(document)),b._undelegateEvents();var e=b.get("events");e&&this._removeEvents(e)},_bindEvent:function(){var b=this,c=b.constructor.ATTACH;c&&this._addEvents(c);var d=b.constructor.DOCATTACH;d&&this._addEvents(d,a.one(document)),b._delegateEvents();var e=b.get("events");e&&this._addEvents(e)},events:{},_removeEvents:function(a,b){b=b||this.get("el");for(var d in a){var e=a[d];for(var f in e){var g=c(this,e[f]);d===""?b.detach(f,g,this):b.undelegate(f,d,g,this)}}},_addEvents:function(a,b){b=b||this.get("el");for(var d in a){var e=a[d];for(var f in e){var g=c(this,e[f]);d===""?b.on(f,g,this):b.delegate(f,d,g,this)}}},_delegateEvents:function(){var a=this.events,b=this.get("el")[0],c=this;for(var d in a)(function(){var a=d;b["on"+a]=function(){var b=arguments[0]||window.event,d=b.target||b.srcElement;d.nodeType!==1&&(d=d.parentNode);var e=d.getAttribute("bx"+a);if(e){var f=e.split("|"),g,h;for(var i=0;i<f.length;i++){g=f[i].split(":"),h=g.shift();var j=g[g.length-1],k=!1;if(j==="_halt_"||j==="_preventDefault_")b.preventDefault?b.preventDefault():b.returnValue=!1,k=!0;if(j==="_halt_"||j==="_stop_")b.stopPropagation?b.stopPropagation():b.cancelBubble=!0,k=!0;k&&g.pop(),c.events&&c.events[a]&&c.events[a][h]&&c.events[a][h].call(c,d,g)}}d=null}})()},_undelegateEvents:function(){var a=this.events,b=this.get("el")[0],c=this;for(var d in a)(function(){var a=d;b["on"+a]=null})()}}),d},{requires:["./chunk"]}),KISSY.add("brix/core/pagelet",function(a,b){function c(){c.superclass.constructor.apply(this,arguments),this.isReady=!1,this.brickCount=0,this.readyList=[],this.isAddBehavior=!1}return a.extend(c,b,{getBrick:function(a){return this._getBrick(a,this.get("tmpler").bricks)},_getBrick:function(b,c){var d=this,e;return a.each(c,function(a,c){if(c===b)return e=a.brick,!1;e=d._getBrick(b,a.bricks)}),e||null},addBehavior:function(){this.isAddBehavior||(this._addBehavior(this.get("tmpler").bricks),this.isAddBehavior=!0)},_addBehavior:function(b){var c=this,d=function(b,d){c.brickCount++,a.use(b.path,function(a,e){var f=a.merge({id:d,el:"#"+d,pagelet:c},b.config),g=new e(f);b.brick=g,c._addBehavior(b.bricks),c.brickCount--,c.brickCount===0&&c._fireReady()})};a.each(b,function(a,b){d(a,b)}),c.brickCount===0&&c._fireReady()},ready:function(a){return this.isReady?a.call(window,this):this.readyList.push(a),this},_fireReady:function(){var a=this;if(a.isReady)return;a.isReady=!0;if(a.readyList){var b,c=0;while(b=a.readyList[c++])b.call(a);a.readyList=null}}}),c},{requires:["./chunk"]});