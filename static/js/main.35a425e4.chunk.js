(window.webpackJsonpimage=window.webpackJsonpimage||[]).push([[0],{11:function(t,e,a){t.exports=a(18)},16:function(t,e,a){},17:function(t,e,a){},18:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),c=a(9),l=a.n(c),r=a(7),s=a(2),o=a(3),h=a(6),u=a(4),g=a(1),d=a(5),m=(a(16),a(10)),p=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(h.a)(this,Object(u.a)(e).call(this))).state={fcr:255,fcg:255,fcb:255,fca:255,rcr:255,rcg:255,rcb:255,rca:255,tcr:10,tcg:10,tcb:10,tca:10,pixel:null},t.onChange=t.onChange.bind(Object(g.a)(t)),t.replace=t.replace.bind(Object(g.a)(t)),t.section=t.section.bind(Object(g.a)(t)),t.click=t.click.bind(Object(g.a)(t)),t.navigate=t.navigate.bind(Object(g.a)(t)),t}return Object(d.a)(e,t),Object(o.a)(e,[{key:"onChange",value:function(t){var e=Number(t.target.value);if(!isNaN(e)&&e>=0&&e<=255){e=Number(e.toFixed());var a=Object(m.a)({},t.target.name,e);this.setState(a)}}},{key:"replace",value:function(t){t.preventDefault(),this.props.replace(this.state)}},{key:"click",value:function(t){t.preventDefault(),this.props.click()}},{key:"section",value:function(t){t.preventDefault();var e=this.state.pixel,a=this.state;e&&e[0]===a.fcr&&e[1]===a.fcg&&e[2]===a.fcb&&e[3]===a.fca?this.props.section(this.state):alert("You must first specify a section to paint. Click the cursor icon and then click on an area of the canvas.")}},{key:"navigate",value:function(t){var e=t.which;if(e>=37&&e<=40){var a=t.target.parentElement,n=t.target.name,i=n[0],c=n[2],l="f"===i?1:"r"===i?2:3;l+="r"===c?0:"g"===c?3:"b"===c?6:9,37===e?l-=0===t.target.selectionStart?1:l:38===e?l-=3:l+=39===e?t.target.selectionStart===t.target.value.length?1:12:3,l>=1&&l<=12&&a[l].focus()}}},{key:"render",value:function(){var t=this;return i.a.createElement("form",{id:"e",className:"replaceGrid",onKeyDown:this.navigate},i.a.createElement("label",null),i.a.createElement("span",null,i.a.createElement("label",null,"Find"),i.a.createElement("button",{onClick:this.click,title:"Click section on canvas"},i.a.createElement("i",{id:"clickIcon"},"\xa0\xa0\xa0\xa0"))),i.a.createElement("label",null,"Replace"),i.a.createElement("label",null,"Tolerance"),i.a.createElement("label",null,"Red:"),i.a.createElement("input",{type:"text",value:this.state.fcr,onChange:function(e){return t.onChange(e)},name:"fcr"}),i.a.createElement("input",{type:"text",value:this.state.rcr,onChange:function(e){return t.onChange(e)},name:"rcr"}),i.a.createElement("input",{type:"text",value:this.state.tcr,onChange:function(e){return t.onChange(e)},name:"tcr"}),i.a.createElement("label",null,"Green:"),i.a.createElement("input",{type:"text",value:this.state.fcg,onChange:function(e){return t.onChange(e)},name:"fcg"}),i.a.createElement("input",{type:"text",value:this.state.rcg,onChange:function(e){return t.onChange(e)},name:"rcg"}),i.a.createElement("input",{type:"text",value:this.state.tcg,onChange:function(e){return t.onChange(e)},name:"tcg"}),i.a.createElement("label",null,"Blue:"),i.a.createElement("input",{type:"text",value:this.state.fcb,onChange:function(e){return t.onChange(e)},name:"fcb"}),i.a.createElement("input",{type:"text",value:this.state.rcb,onChange:function(e){return t.onChange(e)},name:"rcb"}),i.a.createElement("input",{type:"text",value:this.state.tcb,onChange:function(e){return t.onChange(e)},name:"tcb"}),i.a.createElement("label",null,"Alpha:"),i.a.createElement("input",{type:"text",value:this.state.fca,onChange:function(e){return t.onChange(e)},name:"fca"}),i.a.createElement("input",{type:"text",value:this.state.rca,onChange:function(e){return t.onChange(e)},name:"rca"}),i.a.createElement("input",{type:"text",value:this.state.tca,onChange:function(e){return t.onChange(e)},name:"tca"}),i.a.createElement("div",{id:"replaceBtns"},i.a.createElement("button",{onClick:this.replace},"Replace Colour"),i.a.createElement("button",{onClick:this.section},"Replace Section Colour")))}}],[{key:"getDerivedStateFromProps",value:function(t,e){if(t.pixel){var a=t.pixel;return e.pixel&&e.pixel[4]===a[4]&&e.pixel[5]===a[5]?null:{fcr:a[0],fcg:a[1],fcb:a[2],fca:a[3],pixel:a}}return{pixel:null}}}]),e}(n.Component);a(17);var v=function(t){return i.a.createElement("div",null,i.a.createElement(p,{replace:function(e){return function(t,e,a){t(e,[a.fcr,a.fcg,a.fcb,a.fca],[a.rcr,a.rcg,a.rcb,a.rca],[a.tcr,a.tcg,a.tcb,a.tca])}(t.replace,t.file,e)},section:t.section,click:t.click,pixel:t.pixel}))};function f(t,e,a){for(var n=!0,i=0;i<4;i++)n=n&&Math.abs(t[i]-e[i])<=a[i];return n}var b=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(h.a)(this,Object(u.a)(e).call(this))).state={val:0},t.handleChange=t.handleChange.bind(Object(g.a)(t)),t}return Object(d.a)(e,t),Object(o.a)(e,[{key:"handleChange",value:function(t){var e=t.target.value;!isNaN(e)&&e>=0&&e<=100&&(e=Number(Number(e).toFixed()),this.setState({val:e}))}},{key:"render",value:function(){var t=this,e=this.props.text||"Lighten";return i.a.createElement(i.a.Fragment,null,i.a.createElement("button",{onClick:function(){return t.props.lighten(t.state.val)}}," ",e),i.a.createElement("input",{type:"text",value:this.state.val,onChange:this.handleChange,style:{width:"25px"}}),i.a.createElement("label",null,"%"))}}]),e}(n.Component),w=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(h.a)(this,Object(u.a)(e).call(this))).state={imgData:null,newData:null,x1:0,x2:0,y1:0,y2:0,sample:!1,pixel:null},t.imageChange=t.imageChange.bind(Object(g.a)(t)),t.download=t.download.bind(Object(g.a)(t)),t.loadImage=t.loadImage.bind(Object(g.a)(t)),t.swapImage=t.swapImage.bind(Object(g.a)(t)),t.replace=t.replace.bind(Object(g.a)(t)),t.recentre=t.recentre.bind(Object(g.a)(t)),t.handleClick=t.handleClick.bind(Object(g.a)(t)),t.replaceSection=t.replaceSection.bind(Object(g.a)(t)),t.copy=t.copy.bind(Object(g.a)(t)),t.grayscale=t.grayscale.bind(Object(g.a)(t)),t.negative=t.negative.bind(Object(g.a)(t)),t.lighten=t.lighten.bind(Object(g.a)(t)),t}return Object(d.a)(e,t),Object(o.a)(e,[{key:"imageChange",value:function(t){var e=this,a=t.target.files[0];if(a){var n=new Image,i=new FileReader;i.onload=function(t){n.onload=function(t){var a=document.createElement("canvas"),n=t.target,i=n.width,c=n.height;a.width=i,a.height=c,a.getContext("2d").drawImage(n,0,0,i,c);var l=a.getContext("2d").getImageData(0,0,i,c);e.setState({imgData:l},e.loadImage)};var a=t.target.result;a.startsWith("data:image")?n.src=a:alert("That file type is not supported")},i.readAsDataURL(a)}t.target.value=""}},{key:"loadImage",value:function(){var t=document.getElementById("canvas");t.width=t.scrollWidth,t.height=t.scrollHeight;var e=t.getContext("2d");(t=document.getElementById("newCanvas")).width=t.scrollWidth,t.height=t.scrollHeight,e.putImageData(this.state.imgData,0,0),this.swapImage(!1),this.setState({x1:0,x2:0,y1:0,y2:0,sample:!1,pixel:null})}},{key:"swapImage",value:function(t){if(this.state.imgData){var e=t?["canvas",this.state.newData]:["newCanvas",this.state.imgData],a=Object(r.a)(e,2),n=a[0],i=a[1];document.getElementById(n).getContext("2d").putImageData(i,0,0);var c=new Uint8ClampedArray(i.data),l=new ImageData(c,i.width,i.height);t?this.setState({imgData:l,x1:0,y1:0}):this.setState({newData:l,x2:0,y2:0})}}},{key:"replace",value:function(t,e,a,n){t&&(!function(t,e,a,n,i){for(var c=t.data,l=e.data,r=0;r<c.length;r+=4)if(f([c[r],c[r+1],c[r+2],c[r+3]],a,i))for(var s=0;s<4;s++)l[r+s]=n[s];else for(var o=0;o<4;o++)l[r+o]=c[r+o]}(this.state.imgData,t,e,a,n),document.getElementById("newCanvas").getContext("2d").putImageData(t,0,0))}},{key:"download",value:function(){var t=document.getElementById("download");if(this.state.imgData){var e=document.createElement("canvas");e.width=this.state.imgData.width,e.height=this.state.imgData.height,e.getContext("2d").putImageData(this.state.newData,0,0),t.setAttribute("href",e.toDataURL()),t.click()}}},{key:"recentre",value:function(t){var e=t.target;if(this.state.imgData&&(this.state.imgData.width>e.width||this.state.imgData.height>e.height)){var a=e.getContext("2d");a.clearRect(0,0,e.width,e.height);var n="canvas"===e.id?this.state.x1:this.state.x2,i="canvas"===e.id?this.state.y1:this.state.y2,c="canvas"===e.id?this.state.imgData:this.state.newData,l=e.width/2,r=[n+t.pageX-e.offsetLeft-l,i+t.pageY-e.offsetTop-l];r[0]=r[0]<0?0:r[0],r[0]=r[0]>c.width-e.width?c.width-e.width:r[0],r[0]=c.width<e.width?0:r[0],r[1]=r[1]<0?0:r[1],r[1]=r[1]>c.height-e.height?c.height-e.height:r[1],r[1]=c.width<e.width?0:r[1],"canvas"===e.id?this.setState({x1:r[0],y1:r[1]}):this.setState({x2:r[0],y2:r[1]});for(var s=[c.width,c.height],o=s[0],h=s[1],u=o-r[0],g=h-r[1],d=new Uint8ClampedArray(u*g*4),m=0;m<g;m++)for(var p=0;p<u;p++)for(var v=0;v<4;v++)d[m*u*4+4*p+v]=c.data[(r[1]+m)*o*4+4*(r[0]+p)+v];c=new ImageData(d,u,g),a.putImageData(c,0,0)}}},{key:"handleClick",value:function(t){if(this.state.imgData&&this.state.sample&&"canvas"===t.target.id){var e=t.target,a=[t.pageX-e.offsetLeft+this.state.x1,t.pageY-e.offsetTop+this.state.y1];if(a[0]>=0&&a[0]<=this.state.imgData.width&&a[1]>=0&&a[1]<=this.state.imgData.height){var n=[this.state.imgData.data[a[1]*this.state.imgData.width*4+4*a[0]],this.state.imgData.data[a[1]*this.state.imgData.width*4+4*a[0]+1],this.state.imgData.data[a[1]*this.state.imgData.width*4+4*a[0]+2],this.state.imgData.data[a[1]*this.state.imgData.width*4+4*a[0]+3],a[0],a[1]];this.setState({sample:!1,pixel:n})}}else this.state.sample?this.setState({sample:!1}):this.recentre(t)}},{key:"replaceSection",value:function(t){if(this.state.pixel){var e=[t.rcr,t.rcg,t.rcb,t.rca],a=[t.tcr,t.tcg,t.tcb,t.tca],n=function(t,e,a){var n=[t.width,t.height,t.data],i=n[0],c=n[1],l=n[2],s=[[0,-1],[1,0],[0,1],[-1,0]],o=new Array(i*c),h=[],u=[e[0],e[1],e[2],e[3]],g=[e[4],e[5]],d=g[0],m=g[1],p=[[d,m]];for(o[m*i+d]=!0;0!==p.length;){var v=p.pop(),b=Object(r.a)(v,2);if(d=b[0],m=b[1],!(d<0||d>i||m<0||m>c)){for(var w=[],C=0;C<4;C++)w.push(l[m*i*4+4*d+C]);f(w,u,a)&&(h.push(m*i*4+4*d),s.forEach((function(t){o[(m+t[1])*i+d+t[0]]||(o[(m+t[1])*i+d+t[0]]=!0,p.push([d+t[0],m+t[1]]))})))}}return h}(this.state.imgData,this.state.pixel,a),i=this.state.newData.data;this.copy(!0),n.forEach((function(t){i[t]=e[0],i[t+1]=e[1],i[t+2]=e[2],i[t+3]=e[3]})),document.getElementById("newCanvas").getContext("2d").putImageData(this.state.newData,0,0)}}},{key:"copy",value:function(t){var e=t?this.state.imgData.data:this.state.newData.data,a=t?this.state.newData.data:this.state.imgData.data;e.forEach((function(t,e){return a[e]=t}))}},{key:"grayscale",value:function(){if(this.state.newData){var t=this.state.newData.data;this.copy(!0);for(var e=0,a=0;a<t.length;a+=4)e=Math.round((t[a]+t[a+1]+t[a+2])/3),t[a]=e,t[a+1]=e,t[a+2]=e;document.getElementById("newCanvas").getContext("2d").putImageData(this.state.newData,0,0)}}},{key:"negative",value:function(){if(this.state.newData){var t=this.state.newData.data;this.copy(!0);for(var e=0;e<t.length;e+=4)t[e]=255-t[e],t[e+1]=255-t[e+1],t[e+2]=255-t[e+2];document.getElementById("newCanvas").getContext("2d").putImageData(this.state.newData,0,0)}}},{key:"lighten",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t/100+1;if(this.state.newData){var a=this.state.newData.data;this.copy(!0);for(var n=0;n<a.length;n+=4)a[n]=a[n]*e>255?255:a[n]*e,a[n+1]=a[n+1]*e>255?255:a[n+1]*e,a[n+2]=a[n+2]*e>255?255:a[n+2]*e;document.getElementById("newCanvas").getContext("2d").putImageData(this.state.newData,0,0)}}},{key:"render",value:function(){var t=this,e=this.state.sample?"container cross":"container";return i.a.createElement("div",{className:e},i.a.createElement("div",{className:"grid"},i.a.createElement("label",null,"Old Preview"),i.a.createElement("label",null,"New Preview"),i.a.createElement("div",{className:"transparent"},i.a.createElement("canvas",{id:"canvas",onClick:this.handleClick})),i.a.createElement("div",{className:"transparent"},i.a.createElement("canvas",{id:"newCanvas",onClick:this.handleClick})),i.a.createElement("input",{id:"upload",type:"file",onChange:this.imageChange,hidden:!0}),i.a.createElement("div",null,i.a.createElement("button",{onClick:function(){return document.getElementById("upload").click()}},"Upload Image"),i.a.createElement("button",{onClick:function(){return t.swapImage(!0)}},i.a.createElement("i",{id:"leftIcon",title:"Copy new preview to old"},"\xa0\xa0\xa0\xa0\xa0\xa0"))),i.a.createElement("div",null,i.a.createElement("button",{onClick:this.download},"Download"),i.a.createElement("button",{onClick:function(){return t.swapImage(!1)}},i.a.createElement("i",{id:"rightIcon",title:"Copy old preview to new"},"\xa0\xa0\xa0\xa0\xa0\xa0")))),i.a.createElement("a",{id:"download",href:"/",style:{display:"none"},download:"converted"},"Download"),i.a.createElement(v,{replace:this.replace,file:this.state.newData,click:function(){return t.setState({sample:!t.state.sample})},pixel:this.state.pixel,section:this.replaceSection}),i.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr",justifyItems:"center"}},i.a.createElement("div",null,i.a.createElement("button",{onClick:this.grayscale}," Grayscale "),i.a.createElement("button",{onClick:this.negative}," Negative "),i.a.createElement(b,{lighten:this.lighten}),i.a.createElement(b,{lighten:function(e){return t.lighten(e,100/(e+100))},text:"Darken"}))))}}]),e}(n.Component);l.a.render(i.a.createElement(w,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.35a425e4.chunk.js.map