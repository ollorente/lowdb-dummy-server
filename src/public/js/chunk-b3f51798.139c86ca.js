(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b3f51798"],{"159b":function(t,a,e){var s=e("da84"),i=e("fdbc"),r=e("17c2"),c=e("9112");for(var o in i){var n=s[o],l=n&&n.prototype;if(l&&l.forEach!==r)try{c(l,"forEach",r)}catch(d){l.forEach=r}}},"17c2":function(t,a,e){"use strict";var s=e("b727").forEach,i=e("a640"),r=e("ae40"),c=i("forEach"),o=r("forEach");t.exports=c&&o?[].forEach:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}},"191e":function(t,a,e){"use strict";var s=e("fb64"),i=e.n(s);i.a},"3e5d":function(t,a,e){"use strict";var s=e("cc20"),i=e.n(s);i.a},4160:function(t,a,e){"use strict";var s=e("23e7"),i=e("17c2");s({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},5530:function(t,a,e){"use strict";e.d(a,"a",(function(){return r}));e("a4d3"),e("4de4"),e("4160"),e("e439"),e("dbb4"),e("b64b"),e("159b");function s(t,a,e){return a in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}function i(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),e.push.apply(e,s)}return e}function r(t){for(var a=1;a<arguments.length;a++){var e=null!=arguments[a]?arguments[a]:{};a%2?i(Object(e),!0).forEach((function(a){s(t,a,e[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))}))}return t}},"61c9":function(t,a,e){"use strict";var s=e("eac3"),i=e.n(s);i.a},8364:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("router-link",{attrs:{to:{name:"Page",params:{id:t.slug}}}},[e("div",{staticClass:"card border-0 shadow-sm mb-4"},[e("img",{staticClass:"card-img-top",attrs:{src:t.image?t.image:"https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg",alt:t.name}}),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title text-dark"},[t._v(t._s(t.name))]),e("p",{staticClass:"card-text text-dark"},[t._v("@"+t._s(t.slug))])])])])},i=[],r={name:"Site",props:{image:String,name:String,slug:String}},c=r,o=(e("3e5d"),e("2877")),n=Object(o["a"])(c,s,i,!1,null,"6b1cbeca",null);a["a"]=n.exports},b64b:function(t,a,e){var s=e("23e7"),i=e("7b0b"),r=e("df75"),c=e("d039"),o=c((function(){r(1)}));s({target:"Object",stat:!0,forced:o},{keys:function(t){return r(i(t))}})},bb51:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"home"},[e("the-navbar"),e("main",{staticClass:"main mt-5 pt-5"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-sm-8 col-lg-9"},[e("div",{staticClass:"row"},[t._m(0),t._l(t.getPages,(function(t,a){return e("div",{key:a,staticClass:"col-12 col-sm-6 col-lg-4"},[e("Site",{attrs:{image:t.image,name:t.name,slug:t.slug}})],1)})),e("div",{staticClass:"col-12 col-lg-3"})],2)]),e("div",{staticClass:"col-12 col-sm-4 col-lg-3"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("Adds")],1),e("div",{staticClass:"col-12"},[e("Featureds")],1),e("div",{staticClass:"col-12"},[e("Adds")],1),e("div",{staticClass:"col-12"},[e("the-footer")],1)])])])])])],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-12"},[e("img",{staticClass:"img-home rounded mb-3",attrs:{src:"https://res.cloudinary.com/dbszizqh4/image/upload/v1562472720/default.jpg",alt:"imagen"}})])}],r=e("5530"),c=e("2f62"),o=e("d8d6"),n=e("e17a"),l=e("8364"),d=e("07a3"),u=e("3a0b"),m={name:"Home",components:{Adds:o["a"],Featureds:n["a"],Site:l["a"],TheFooter:d["a"],TheNavbar:u["a"]},created:function(){this.fetchPages()},methods:Object(r["a"])({},Object(c["b"])(["fetchPages"])),computed:Object(r["a"])({},Object(c["c"])(["getPages"]))},b=m,f=(e("61c9"),e("2877")),g=Object(f["a"])(b,s,i,!1,null,"9c051390",null);a["default"]=g.exports},cc20:function(t,a,e){},dbb4:function(t,a,e){var s=e("23e7"),i=e("83ab"),r=e("56ef"),c=e("fc6a"),o=e("06cf"),n=e("8418");s({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var a,e,s=c(t),i=o.f,l=r(s),d={},u=0;while(l.length>u)e=i(s,a=l[u++]),void 0!==e&&n(d,a,e);return d}})},e17a:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card border-0 shadow-sm mb-4"},[t._m(0),e("div",{staticClass:"card-body p-3"},[e("ul",{staticClass:"list-unstyled m-0"},[e("router-link",{staticClass:"media mb-3",attrs:{tag:"li",to:{name:"Page",params:{id:"fancolombia-1"}}}},[e("img",{staticClass:"mr-2 img-avatar-boton rounded-circle",attrs:{src:"https://res.cloudinary.com/dbszizqh4/image/upload/v1560048300/favicon_square.png",alt:"logo rounded-circle"}}),e("div",{staticClass:"media-body"},[e("h5",{staticClass:"mt-0 mb-1 h6"},[t._v("List-based media object")])])]),e("router-link",{staticClass:"media mb-3",attrs:{tag:"li",to:{name:"Page",params:{id:"fancolombia-2"}}}},[e("img",{staticClass:"mr-2 img-avatar-boton rounded-circle",attrs:{src:"https://res.cloudinary.com/dbszizqh4/image/upload/v1560048300/favicon_square.png",alt:"logo rounded-circle"}}),e("div",{staticClass:"media-body"},[e("h5",{staticClass:"mt-0 mb-1 h6"},[t._v("List-based media object")])])]),e("router-link",{staticClass:"media mb-3",attrs:{tag:"li",to:{name:"Page",params:{id:"fancolombia-3"}}}},[e("img",{staticClass:"mr-2 img-avatar-boton rounded-circle",attrs:{src:"https://res.cloudinary.com/dbszizqh4/image/upload/v1560048300/favicon_square.png",alt:"logo rounded-circle"}}),e("div",{staticClass:"media-body"},[e("h5",{staticClass:"mt-0 mb-1 h6"},[t._v("List-based media object")])])]),e("router-link",{staticClass:"media mb-3",attrs:{tag:"li",to:{name:"Page",params:{id:"fancolombia-4"}}}},[e("img",{staticClass:"mr-2 img-avatar-boton rounded-circle",attrs:{src:"https://res.cloudinary.com/dbszizqh4/image/upload/v1560048300/favicon_square.png",alt:"logo rounded-circle"}}),e("div",{staticClass:"media-body"},[e("h5",{staticClass:"mt-0 mb-1 h6"},[t._v("List-based media object")])])])],1)])])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("h5",{staticClass:"h6 pl-3 pt-3"},[e("span",{staticClass:"text-muted text-uppercase"},[t._v("Recomendados")])])}],r={name:"Featureds",props:{}},c=r,o=(e("191e"),e("2877")),n=Object(o["a"])(c,s,i,!1,null,"4d3f5f58",null);a["a"]=n.exports},e439:function(t,a,e){var s=e("23e7"),i=e("d039"),r=e("fc6a"),c=e("06cf").f,o=e("83ab"),n=i((function(){c(1)})),l=!o||n;s({target:"Object",stat:!0,forced:l,sham:!o},{getOwnPropertyDescriptor:function(t,a){return c(r(t),a)}})},eac3:function(t,a,e){},fb64:function(t,a,e){},fdbc:function(t,a){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-b3f51798.139c86ca.js.map