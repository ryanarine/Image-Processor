(window.webpackJsonpimage=window.webpackJsonpimage||[]).push([[0],{21:function(e,t,a){e.exports=a(33)},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(13),i=a.n(c),o=a(1),l=a(5),s=a(19),u=a(20),p=a(4),h=a(7);function d(e,t,a,n){for(var r=!0,c=(e[0],0);c<4;c++)switch(e[c]){case"=":r=r&&Math.abs(t[c]-a[c])<=n[c];break;case">":r=r&&t[c]>a[c];break;case">=":r=r&&t[c]>=a[c];break;case"<":r=r&&t[c]<a[c];break;case"<=":r=r&&t[c]<=a[c];break;default:return void alert("Something went terribly wrong. Please refresh the page and try again")}return r}function m(e,t,a,n){for(var r=0;r<4;r++)switch(e[r]){case"=":t[n+r]=a[r];break;case"+":t[n+r]+=a[r];break;case"-":t[n+r]-=a[r];break;case"*":t[n+r]*=a[r];break;case"/":t[n+r]/=a[r];break;default:return void alert("Something went terribly wrong. Please refresh the page and try again")}}function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(a,!0).forEach((function(t){Object(h.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var v={imgData:null,newData:null,x1:0,x2:0,y1:0,y2:0,pixelSample:!1,colourSample:!1,pixel:null,zoom1:0,zoom2:0},b={GRAYSCALE:function(e){for(var t=0,a=0;a<e.length;a+=4)t=Math.round((e[a]+e[a+1]+e[a+2])/3),e[a]=t,e[a+1]=t,e[a+2]=t},NEGATIVE:function(e){for(var t=0;t<e.length;t+=4)e[t]=255-e[t],e[t+1]=255-e[t+1],e[t+2]=255-e[t+2]},BRIGHT:function(e,t){for(var a=0;a<e.length;a+=4)e[a]=e[a]*t,e[a+2]=e[a+2]*t,e[a+1]=e[a+1]*t},REPLACE:function(e,t,a,n,r,c){for(var i=0;i<e.length;i+=4)d(t,[e[i],e[i+1],e[i+2],e[i+3]],a,c)&&m(n,e,r,i)}},y=50,E=1.5;function w(e,t,a,n){return a<t.width||e[0]<0?e[0]=0:e[0]=e[0]>a-t.width?a-t.width:e[0],n<t.height||e[1]<0?e[1]=0:e[1]=e[1]>n-t.height?n-t.height:e[1],e}function O(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"newCanvas",r=document.getElementById(n);r.getContext("2d").putImageData(a,-e,-t,e,t,r.width,r.height)}function x(e,t){e.forEach((function(e,a){return t[a]=e}))}function C(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]?"container cross":"container dropper";document.getElementById("container").className=e?"container":t}var k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET":return t.isNewCanvas?g({},e,{newData:t.data}):g({},e,{imgData:t.data});case"REFRESH":return g({},e,{x1:0,x2:0,y1:0,y2:0,sample:!1,pixel:null,zoom1:0,zoom2:0});case"CENTER":var a=t.canvas,n="canvas"===a.id?[e.x1,e.y1,e.imgData]:[e.x2,e.y2,e.newData],r=Object(p.a)(n,3),c=r[0],i=r[1],o=r[2],l=function(e,t,a,n,r,c,i){var o=e.width/2,l=e.height/2,s=e.width/e.scrollWidth,u=e.height/e.scrollHeight;return w([Math.round(t+(c-e.offsetLeft)*s-o),Math.round(a+(i-e.offsetTop)*u-l)],e,n,r)}(t.canvas,c,i,o.width,o.height,t.pageX,t.pageY);if(l[0]!==c||l[1]!==i){var s,h,f,k,j=a.getContext("2d");"newCanvas"===a.id?(s=l,h=Object(p.a)(s,2),e.x2=h[0],e.y2=h[1]):(f=l,k=Object(p.a)(f,2),e.x1=k[0],e.y1=k[1]);var D=[o.width,o.height],I=D[0],S=D[1],P=I-l[0],N=S-l[1];P=Math.min(a.width,P),N=Math.min(a.height,N);for(var T=new Uint8ClampedArray(P*N*4),M=0;M<N;M++)for(var A=0;A<P;A++)for(var L=0;L<4;L++)T[M*P*4+4*A+L]=o.data[(l[1]+M)*I*4+4*(l[0]+A)+L];o=new ImageData(T,P,N),j.putImageData(o,0,0)}return e;case"PIXEL":return C(e.pixelSample),g({},e,{pixelSample:!1,pixel:t.pixel});case"SAMPLE":return"PIXEL"===t.sample?(C(e.pixelSample),g({},e,{pixelSample:!e.pixelSample,colourSample:!1})):"COLOUR"===t.sample?(C(e.colourSample,!1),g({},e,{pixelSample:!1,colourSample:!e.colourSample})):e;case"BASIC":if(e.newData){var R=b[t.effect];x(e.imgData.data,e.newData.data),t.payload?R.apply(void 0,[e.newData.data].concat(Object(u.a)(t.payload))):R(e.newData.data),O(e.x2,e.y2,e.newData)}return e;case"SECTION":if(e.pixel&&e.newData){document.body.style.cursor="progress";var B=function(e,t,a,n,r){var c=[e.width,e.height,e.data],i=c[0],o=c[1],l=c[2],s=[[0,-1],[1,0],[0,1],[-1,0]],u=new Array(i*o),h=[],m=[t[4],t[5]],f=m[0],g=m[1],v=[[f,g]];for(u[g*i+f]=!0;0!==v.length;){var b=v.pop(),y=Object(p.a)(b,2);if(f=y[0],g=y[1],!(f<0||f>i||g<0||g>o)){for(var E=[],w=0;w<4;w++)E.push(l[g*i*4+4*f+w]);d(a,E,n,r)&&(h.push(g*i*4+4*f),s.forEach((function(e){u[(g+e[1])*i+f+e[0]]||(u[(g+e[1])*i+f+e[0]]=!0,v.push([f+e[0],g+e[1]]))})))}}return h}(e.imgData,e.pixel,t.comparisons,t.oldVal,t.tolerance),U=e.newData.data;x(e.imgData.data,e.newData.data);var Z=t.newVal,G=t.operators;B.forEach((function(e){m(G,U,Z,e)})),O(e.x2,e.y2,e.newData),document.body.style.cursor="default"}else e.pixel||alert("You must first specify a section to paint. Click the cursor icon and then click on an area in the left canvas.");return e;case"SWAP":if(e.imgData){var W=t.copyToNew?["newCanvas",e.imgData,e.x2,e.y2]:["canvas",e.newData,e.x1,e.y1],H=Object(p.a)(W,4),X=H[0],F=H[1],Y=H[2],z=H[3],V=document.getElementById(X);V.getContext("2d").putImageData(F,-Y,-z,Y,z,V.width,V.height);var q=new Uint8ClampedArray(F.data),J=new ImageData(q,F.width,F.height);return t.copyToNew?g({},e,{newData:J}):g({},e,{imgData:J})}return e;case"ZOOM":if(e.imgData){var K=t.isNewCanvas?["newCanvas",e.newData,e.zoom2,e.x2,e.y2]:["canvas",e.imgData,e.zoom1,e.x1,e.y1],Q=Object(p.a)(K,5),$=Q[0],_=Q[1],ee=Q[2],te=Q[3],ae=Q[4],ne=document.getElementById($);if(!t.isZoomOut||ee<0||_.width>ne.scrollWidth||_.height>ne.scrollHeight){var re=t.isZoomOut?ee+1:ee-1,ce=Math.pow(E,re),ie=Math.round(ne.scrollWidth*ce);if((t.isZoomOut&&ee>=0||!t.isZoomOut&&ee<=0)&&(!t.isZoomOut&&ie<y?ie=y:t.isZoomOut&&ie>=_.width&&ie>=_.height&&(ie=Math.max(_.width,_.height))),ie!==ne.width){ne.width=ne.height=ie;var oe=w([te,ae],ne,_.width,_.height),le=Object(p.a)(oe,2);te=le[0],ae=le[1],e=t.isNewCanvas?g({},e,{x2:te,y2:ae,zoom2:re}):g({},e,{x1:te,y1:ae,zoom1:re}),O(te,ae,_,$)}}}return e;default:return e}},j={cc:["=","=","=","="],fc:[255,255,255,255],oc:["=","=","=","="],rc:[255,255,255,255],tc:[10,10,10,10],rModal:[!1,!1,!1,!1],fModal:[!1,!1,!1,!1]};var D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATEINPUT":var a=[t.name,t.value,t.index],n=a[0],r=a[1],c=a[2],i=255;if(n.startsWith("r")){var o=e.oc[c];"*"!==o&&"/"!==o||(i=500)}return!isNaN(r)&&r>=0&&r<=i?(r=Number(Number(r).toFixed()),e[n.substring(0,2)][c]=r,e):e;case"UPDATEOPTION":var l=[t.index,t.value,t.isOperator],s=l[0],u=l[1],p=l[2];return p&&e.rc[s]>255&&"*"!==u&&"/"!==u&&(e.rc[s]=255),p?e.oc[s]=u:e.cc[s]=u,e;case"MODAL":for(var h=0;h<e.rModal.length;h++)e.rModal[h]=!1,e.fModal[h]=!1;return t.index>=0&&(t.replace?e.rModal[t.index]=!0:e.fModal[t.index]=!0),e;case"SAMPLECOLOUR":return e.fc[0]=t.r,e.fc[1]=t.g,e.fc[2]=t.b,e.fc[3]=t.a,e;default:return e}},I=Object(l.c)({image:k,replace:D}),S=a(8),P=a(9),N=a(12),T=a(10),M=a(2),A=a(11),L=function(e){return{type:"SAMPLE",sample:e}},R=function(e,t){return{type:"BASIC",effect:e,payload:t}},B=function(e){return{type:"SWAP",copyToNew:e}},U=function(e,t){return{type:"ZOOM",isZoomOut:e,isNewCanvas:t}},Z=function(e,t){return{type:"UPDATEINPUT",name:e.target.name,value:e.target.value,index:t}},G=function(e,t,a){return{type:"UPDATEOPTION",index:e,value:t,isOperator:a}},W=function(e){return{type:"MODAL",index:e,replace:!0}},H=function(e){return{type:"MODAL",index:e,replace:!1}},X=function(e,t,a,n){return{type:"SAMPLECOLOUR",r:e,g:t,b:a,a:n}},F={position:"absolute",width:"0",height:"0",borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"10px solid rgba(255,255,255,0.8)",top:"calc(-100% + 13px)",left:"calc(50% - 5px)",animation:"appear 0.3s linear"},Y={position:"absolute",width:"max-content",height:"25px",padding:"5px",backgroundColor:"rgba(255,255,255,0.8)",top:"calc(-100% - 22.5px)",left:"100%",borderRadius:"5px",transform:"translateX(calc(-50% - 14px))",animation:"appear 0.3s linear"};var z=function(e){var t=Object(o.c)(),a=e.index,n=e.replace?W:H,c=e.options.map((function(n){return r.a.createElement("button",{key:n,type:"button",className:"findBtn",onClick:function(){return t(G(a,n,e.replace))}},n)}));return window.addEventListener("click",(function e(){window.removeEventListener("click",e,!1),t(n(-1))}),!1),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:F}),r.a.createElement("div",{style:Y},c))},V=["r","g","b","a"],q=["red","green","blue","alpha"],J=["f","r","t"],K=["=",">",">=","<","<="],Q=["=","+","-","*","/"],$=function(e,t,a){var n=q[a],r="";switch(e){case"=":r="Select only pixels that have a ".concat(n," value that is within the tolerance range of ").concat(t);break;case">":r="Select only pixels that have a ".concat(n," value greater than ").concat(t);break;case">=":r="Select only pixels that have a ".concat(n," value greater than or equal to ").concat(t);break;case"<":r="Select only pixels that have a ".concat(n," value less than ").concat(t);break;case"<=":r="Select only pixels that have a ".concat(n," value less than or equal to ").concat(t);break;default:return""}return r};function _(e){var t=e.index,a=Object(o.d)((function(e){return e.replace.cc[t]})),n=Object(o.d)((function(e){return e.replace.fc[t]})),c=Object(o.d)((function(e){return e.replace.fModal[t]})),i=Object(o.c)(),l=c?r.a.createElement(z,{options:K,index:t,replace:!1}):"";return r.a.createElement("span",null,r.a.createElement("span",{style:{position:"relative"}},r.a.createElement("button",{type:"button",title:$(a,n,t),onClick:function(e){e.stopPropagation(),i(H(t))},className:"findBtn"},a),l),r.a.createElement("input",{type:"text",value:n,onChange:function(e){return i(Z(e,t))},name:"fc"+V[t]}))}var ee=function(e,t,a){var n=q[a],r="";switch(e){case"=":r="Change the ".concat(n," value of the selected pixels to ").concat(t);break;case"+":r="Increase the ".concat(n," value of the selected pixels by ").concat(t);break;case"-":r="Decrease the ".concat(n," value of the selected pixels by ").concat(t);break;case"*":r="Multiply the ".concat(n," value of the selected pixels by ").concat(t/100+1);break;case"/":r="Divide the ".concat(n," value of the selected pixels by ").concat(t/100+1);break;default:return""}return r};var te=function(e){var t=e.index,a=Object(o.d)((function(e){return e.replace.oc[t]})),n=Object(o.d)((function(e){return e.replace.rc[t]})),c=Object(o.d)((function(e){return e.replace.rModal[t]})),i=Object(o.c)(),l="*"===a||"/"===a?"%":"",s=c?r.a.createElement(z,{options:Q,index:t,replace:!0}):"",u=r.a.createElement("span",{style:{position:"relative"}},r.a.createElement("button",{type:"button",title:ee(a,n,t),onClick:function(e){e.stopPropagation(),i(W(t))},className:"findBtn"},a),s);return r.a.createElement("span",null,u,r.a.createElement("input",{type:"text",value:n,onChange:function(e){return i(Z(e,t))},name:"rc"+V[t]}),l)};var ae=function(e){var t=e.index,a=Object(o.c)(),n=Object(o.d)((function(e){return e.replace.tc[t]}));return r.a.createElement("input",{type:"text",value:n,onChange:function(e){return a(Z(e,t))},name:"tc"+V[t]})};function ne(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var re=function(e){function t(){var e;return Object(S.a)(this,t),(e=Object(N.a)(this,Object(T.a)(t).call(this))).replace=e.replace.bind(Object(M.a)(e)),e.section=e.section.bind(Object(M.a)(e)),e.navigate=e.navigate.bind(Object(M.a)(e)),e.copy=e.copy.bind(Object(M.a)(e)),e}return Object(A.a)(t,e),Object(P.a)(t,[{key:"replace",value:function(){for(var e=this.props,t=e.cc,a=e.fc,n=e.oc,r=[e.rc[0],e.rc[1],e.rc[2],e.rc[3]],c=0;c<n.length;c++)"*"!==n[c]&&"/"!==n[c]||(r[c]=r[c]/100+1);var i=e.tc;this.props.basicImgEffect("REPLACE",[t,a,n,r,i])}},{key:"section",value:function(){for(var e=this.props,t=e.cc,a=e.fc,n=e.oc,r=[e.rc[0],e.rc[1],e.rc[2],e.rc[3]],c=0;c<n.length;c++)"*"!==n[c]&&"/"!==n[c]||(r[c]=r[c]/100+1);var i=e.tc;this.props.section(t,a,n,r,i)}},{key:"navigate",value:function(e){var t=e.which;if(t>=37&&t<=40){var a=document.getElementById("replaceGrid"),n=e.target.name;if(!n)return;var r=V.findIndex((function(e){return e===n[2]})),c=J.findIndex((function(e){return e===n[0]}));if(37===t){if(0!==e.target.selectionStart)return;c=(c+J.length-1)%J.length}else if(38===t)r=(r+V.length-1)%V.length;else if(39===t){if(e.target.selectionStart!==e.target.value.length)return;c=(c+1)%J.length}else r=(r+1)%V.length;var i=J[c]+"c"+V[r];a[i].focus();var o=0;o=37===t||39===t?37===t?a[i].value.length:0:e.target.selectionStart,setTimeout((function(){return a[i].setSelectionRange(o,o)}),0)}}},{key:"copy",value:function(){var e=fe.getState().image.pixel;e?this.props.sampleColour(e[0],e[1],e[2],e[3]):alert("You must specify a pixel first. Click on the cursor icon and then click on a pixel on the canvas to do so")}},{key:"render",value:function(){var e=this,t=V.map((function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement(_,{key:"fc"+e,index:t}),r.a.createElement(te,{key:"rc"+e,index:t}),r.a.createElement(ae,{key:"tc"+e,index:t}))}));return r.a.createElement("form",{id:"replaceGrid",className:"replaceGrid",onKeyDown:this.navigate,autoComplete:"off"},r.a.createElement("label",null),r.a.createElement("span",null,r.a.createElement("label",null,"Find"),r.a.createElement("button",{onClick:function(){return e.props.switchSample("PIXEL")},type:"button",title:"Specify a section on the canvas by clicking on a pixel within that section",className:"infoTool"},r.a.createElement("i",{id:"clickIcon"},"\xa0\xa0\xa0\xa0")),r.a.createElement("button",{onClick:function(){return e.props.switchSample("COLOUR")},type:"button",title:"Sample a pixel's colour off one of the canvases",className:"infoTool"},r.a.createElement("i",{id:"dropperIcon"},"\xa0\xa0\xa0\xa0")),r.a.createElement("button",{type:"button",onClick:this.copy,title:"Copy the selected pixel's colour to the inputs",className:"infoTool"},r.a.createElement("i",{id:"mouseDropperIcon"},"\xa0\xa0\xa0\xa0"))),r.a.createElement("label",null,"Replace"),r.a.createElement("label",null,"Tolerance"),r.a.createElement("label",null,"Red:"),t[0],r.a.createElement("label",null,"Green:"),t[1],r.a.createElement("label",null,"Blue:"),t[2],r.a.createElement("label",null,"Alpha:"),t[3],r.a.createElement("div",{id:"replaceBtns"},r.a.createElement("button",{type:"button",onClick:this.replace},"Replace Colour"),r.a.createElement("button",{type:"button",onClick:this.section},"Replace Section Colour")))}}]),t}(n.Component),ce=Object(o.b)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ne(a,!0).forEach((function(t){Object(h.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ne(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e.replace)}),{switchSample:L,basicImgEffect:R,section:function(e,t,a,n,r){return{type:"SECTION",comparisons:e,oldVal:t,operators:a,newVal:n,tolerance:r}},updateOption:G,updateInput:Z,sampleColour:X})(re);a(31);var ie=function(){return r.a.createElement("div",null,r.a.createElement(ce,null))},oe=function(e){function t(){var e;return Object(S.a)(this,t),(e=Object(N.a)(this,Object(T.a)(t).call(this))).state={val:0},e.handleChange=e.handleChange.bind(Object(M.a)(e)),e.handleClick=e.handleClick.bind(Object(M.a)(e)),e}return Object(A.a)(t,e),Object(P.a)(t,[{key:"handleChange",value:function(e){var t=e.target.value;!isNaN(t)&&t>=0&&t<=500&&(t=Number(Number(t).toFixed()),this.setState({val:t}))}},{key:"handleClick",value:function(){this.props.basicImgEffect("BRIGHT",[this.props.multiplier(this.state.val)])}},{key:"render",value:function(){var e=this.props.text||"Lighten";return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:this.handleClick}," ",e),r.a.createElement("input",{type:"text",value:this.state.val,onChange:this.handleChange,style:{width:"25px"}}),r.a.createElement("label",null,"%"))}}]),t}(n.PureComponent),le=Object(o.b)((function(){return{}}),{basicImgEffect:R})(oe);var se=function(){var e=Object(o.c)();return r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr",justifyItems:"center"}},r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return e(R("GRAYSCALE"))}}," Grayscale "),r.a.createElement("button",{onClick:function(){return e(R("NEGATIVE"))}}," Negative "),r.a.createElement(le,{multiplier:function(e){return e/100+1}}),r.a.createElement(le,{multiplier:function(e){return 100/(e+100)},text:"Darken"})))};a(32);var ue=function(e){var t=Object(o.c)();return r.a.createElement("div",null,r.a.createElement("input",{id:"upload",type:"file",onChange:e.change,hidden:!0}),r.a.createElement("button",{className:"fileBtn",onClick:function(){return document.getElementById("upload").click()}},r.a.createElement("i",{id:"uploadIcon",title:"Upload Image"},"\xa0\xa0\xa0\xa0")),r.a.createElement("button",{onClick:function(){return t(B(!1))}},r.a.createElement("i",{id:"leftIcon",title:"Copy new preview to old"},"\xa0\xa0\xa0\xa0\xa0\xa0\xa0")),r.a.createElement("button",{className:"infoTool",onClick:function(){return t(U(!1,!1))}},r.a.createElement("i",{id:"plusIcon",title:"Zoom in"},"\xa0\xa0\xa0\xa0")),r.a.createElement("button",{className:"infoTool",onClick:function(){return t(U(!0,!1))}},r.a.createElement("i",{id:"minusIcon",title:"Zoom out"},"\xa0\xa0\xa0\xa0")))};var pe=function(e){var t=Object(o.c)();return r.a.createElement("div",null,r.a.createElement("button",{className:"fileBtn",onClick:e.download},r.a.createElement("i",{id:"downloadIcon",title:"Download Image"},"\xa0\xa0\xa0\xa0")),r.a.createElement("button",{onClick:function(){return t(B(!0))}},r.a.createElement("i",{id:"rightIcon",title:"Copy old preview to new"},"\xa0\xa0\xa0\xa0\xa0\xa0\xa0")),r.a.createElement("button",{className:"infoTool",onClick:function(){return t(U(!1,!0))}},r.a.createElement("i",{id:"plusIcon",title:"Zoom in"},"\xa0\xa0\xa0\xa0")),r.a.createElement("button",{className:"infoTool",onClick:function(){return t(U(!0,!0))}},r.a.createElement("i",{id:"minusIcon",title:"Zoom out"},"\xa0\xa0\xa0\xa0")),r.a.createElement("a",{id:"download",href:"/",style:{display:"none"},download:"converted"},"Download"))};function he(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var de=function(e){function t(){var e;return Object(S.a)(this,t),(e=Object(N.a)(this,Object(T.a)(t).call(this))).imageChange=e.imageChange.bind(Object(M.a)(e)),e.download=e.download.bind(Object(M.a)(e)),e.recenter=e.recenter.bind(Object(M.a)(e)),e.handleClick=e.handleClick.bind(Object(M.a)(e)),e}return Object(A.a)(t,e),Object(P.a)(t,[{key:"imageChange",value:function(e){var t=this,a=e.target.files[0];if(a){var n=new Image,r=new FileReader;r.onload=function(e){n.onload=function(e){var a=document.createElement("canvas"),n=e.target,r=n.width,c=n.height;a.width=r,a.height=c,a.getContext("2d").drawImage(n,0,0,r,c);var i=a.getContext("2d").getImageData(0,0,r,c);(a=document.getElementById("canvas")).width=a.scrollWidth,a.height=a.scrollHeight;var o=a.getContext("2d");(a=document.getElementById("newCanvas")).width=a.scrollWidth,a.height=a.scrollHeight,t.props.setImgData(!1,i).then((function(){o.putImageData(t.props.imgData,0,0,0,0,a.scrollWidth,a.scrollHeight),t.props.swap(!0)})),t.props.refresh()};var a=e.target.result;a.startsWith("data:image")?n.src=a:alert("That file type is not supported")},r.readAsDataURL(a)}e.target.value=""}},{key:"download",value:function(){var e=document.getElementById("download");if(this.props.imgData){var t=document.createElement("canvas");t.width=this.props.imgData.width,t.height=this.props.imgData.height,t.getContext("2d").putImageData(this.props.newData,0,0),e.setAttribute("href",t.toDataURL()),e.click()}}},{key:"recenter",value:function(e){var t=e.target;this.props.imgData&&(this.props.imgData.width>t.width||this.props.imgData.height>t.height)&&this.props.center(t,e.pageX,e.pageY)}},{key:"handleClick",value:function(e){if(this.props.imgData&&(this.props.pixelSample||this.props.colourSample)){var t=e.target,a=t.width/t.scrollWidth,n=t.height/t.scrollHeight,r=[Math.round((e.pageX-t.offsetLeft)*a+this.props.x1),Math.round((e.pageY-t.offsetTop)*n+this.props.y1)];if(r[0]>=0&&r[0]<=this.props.imgData.width&&r[1]>=0&&r[1]<=this.props.imgData.height){var c=this.props.imgData.data[r[1]*this.props.imgData.width*4+4*r[0]],i=this.props.imgData.data[r[1]*this.props.imgData.width*4+4*r[0]+1],o=this.props.imgData.data[r[1]*this.props.imgData.width*4+4*r[0]+2],l=this.props.imgData.data[r[1]*this.props.imgData.width*4+4*r[0]+3];if(this.props.pixelSample){var s=[c,i,o,l,r[0],r[1]];this.props.updatePixel(s)}else this.props.sampleColour(c,i,o,l)}}else this.props.pixelSample?(this.props.switchSample("PIXEL"),alert("You must upload an image first. Click the upload button to upload an image.")):this.recenter(e)}},{key:"render",value:function(){return r.a.createElement("div",{className:"container",id:"container"},r.a.createElement("div",{className:"grid"},r.a.createElement("label",null,"Old Preview"),r.a.createElement("label",null,"New Preview"),r.a.createElement("div",{className:"transparent"},r.a.createElement("canvas",{id:"canvas",onClick:this.handleClick})),r.a.createElement("div",{className:"transparent"},r.a.createElement("canvas",{id:"newCanvas",onClick:this.handleClick})),r.a.createElement(ue,{change:this.imageChange}),r.a.createElement(pe,{download:this.download})),r.a.createElement(ie,null),r.a.createElement(se,null))}},{key:"shouldComponentUpdate",value:function(){return!1}}]),t}(n.Component),me=Object(o.b)((function(e){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?he(a,!0).forEach((function(t){Object(h.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):he(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e.image)}),{setImgData:function(e,t){return function(a){return a({type:"SET",isNewCanvas:e,data:t}),Promise.resolve()}},refresh:function(){return{type:"REFRESH"}},center:function(e,t,a){return{type:"CENTER",canvas:e,pageX:t,pageY:a}},updatePixel:function(e){return{type:"PIXEL",pixel:e}},basicImgEffect:R,swap:B,switchSample:L,sampleColour:X})(de);a.d(t,"store",(function(){return fe}));var fe=Object(l.d)(I,{},Object(l.a)(s.a));i.a.render(r.a.createElement(o.a,{store:fe},r.a.createElement(me,null)),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.3ee14c31.chunk.js.map