if(!e)var e={map:function(e,r){var n={};return r?e.map(function(e,t){return n.index=t,r.call(n,e)}):e.slice()},naturalOrder:function(e,r){return e<r?-1:e>r?1:0},sum:function(e,r){var n={};return e.reduce(r?function(e,t,o){return n.index=o,e+r.call(n,t)}:function(e,r){return e+r},0)},max:function(r,n){return Math.max.apply(null,n?e.map(r,n):r)}};var r=function(){var r=5,n=8-r,t=1e3;function o(e,n,t){return(e<<2*r)+(n<<r)+t}function a(e){var r=[],n=!1;function t(){r.sort(e),n=!0}return{push:function(e){r.push(e),n=!1},peek:function(e){return n||t(),void 0===e&&(e=r.length-1),r[e]},pop:function(){return n||t(),r.pop()},size:function(){return r.length},map:function(e){return r.map(e)},debug:function(){return n||t(),r}}}function i(e,r,n,t,o,a,i){var u=this;u.r1=e,u.r2=r,u.g1=n,u.g2=t,u.b1=o,u.b2=a,u.histo=i}function u(){this.vboxes=new a(function(r,n){return e.naturalOrder(r.vbox.count()*r.vbox.volume(),n.vbox.count()*n.vbox.volume())})}function s(r,n){if(n.count()){var t=n.r2-n.r1+1,a=n.g2-n.g1+1,i=e.max([t,a,n.b2-n.b1+1]);if(1==n.count())return[n.copy()];var u,s,c,h,l=0,f=[],p=[];if(i==t)for(u=n.r1;u<=n.r2;u++){for(h=0,s=n.g1;s<=n.g2;s++)for(c=n.b1;c<=n.b2;c++)h+=r[o(u,s,c)]||0;f[u]=l+=h}else if(i==a)for(u=n.g1;u<=n.g2;u++){for(h=0,s=n.r1;s<=n.r2;s++)for(c=n.b1;c<=n.b2;c++)h+=r[o(s,u,c)]||0;f[u]=l+=h}else for(u=n.b1;u<=n.b2;u++){for(h=0,s=n.r1;s<=n.r2;s++)for(c=n.g1;c<=n.g2;c++)h+=r[o(s,c,u)]||0;f[u]=l+=h}return f.forEach(function(e,r){p[r]=l-e}),function(e){var r,t,o,a,i,s=e+"1",c=e+"2",h=0;for(u=n[s];u<=n[c];u++)if(f[u]>l/2){for(o=n.copy(),a=n.copy(),i=(r=u-n[s])<=(t=n[c]-u)?Math.min(n[c]-1,~~(u+t/2)):Math.max(n[s],~~(u-1-r/2));!f[i];)i++;for(h=p[i];!h&&f[i-1];)h=p[--i];return o[c]=i,a[s]=o[c]+1,[o,a]}}(i==t?"r":i==a?"g":"b")}}return i.prototype={volume:function(e){var r=this;return r._volume&&!e||(r._volume=(r.r2-r.r1+1)*(r.g2-r.g1+1)*(r.b2-r.b1+1)),r._volume},count:function(e){var r=this,n=r.histo;if(!r._count_set||e){var t,a,i,u=0;for(t=r.r1;t<=r.r2;t++)for(a=r.g1;a<=r.g2;a++)for(i=r.b1;i<=r.b2;i++)u+=n[o(t,a,i)]||0;r._count=u,r._count_set=!0}return r._count},copy:function(){var e=this;return new i(e.r1,e.r2,e.g1,e.g2,e.b1,e.b2,e.histo)},avg:function(e){var n=this,t=n.histo;if(!n._avg||e){var a,i,u,s,c=0,h=1<<8-r,l=0,f=0,p=0;for(i=n.r1;i<=n.r2;i++)for(u=n.g1;u<=n.g2;u++)for(s=n.b1;s<=n.b2;s++)c+=a=t[o(i,u,s)]||0,l+=a*(i+.5)*h,f+=a*(u+.5)*h,p+=a*(s+.5)*h;n._avg=c?[~~(l/c),~~(f/c),~~(p/c)]:[~~(h*(n.r1+n.r2+1)/2),~~(h*(n.g1+n.g2+1)/2),~~(h*(n.b1+n.b2+1)/2)]}return n._avg},contains:function(e){var r=this,t=e[0]>>n;return gval=e[1]>>n,bval=e[2]>>n,t>=r.r1&&t<=r.r2&&gval>=r.g1&&gval<=r.g2&&bval>=r.b1&&bval<=r.b2}},u.prototype={push:function(e){this.vboxes.push({vbox:e,color:e.avg()})},palette:function(){return this.vboxes.map(function(e){return e.color})},size:function(){return this.vboxes.size()},map:function(e){for(var r=this.vboxes,n=0;n<r.size();n++)if(r.peek(n).vbox.contains(e))return r.peek(n).color;return this.nearest(e)},nearest:function(e){for(var r,n,t,o=this.vboxes,a=0;a<o.size();a++)((n=Math.sqrt(Math.pow(e[0]-o.peek(a).color[0],2)+Math.pow(e[1]-o.peek(a).color[1],2)+Math.pow(e[2]-o.peek(a).color[2],2)))<r||void 0===r)&&(r=n,t=o.peek(a).color);return t},forcebw:function(){var r=this.vboxes;r.sort(function(r,n){return e.naturalOrder(e.sum(r.color),e.sum(n.color))});var n=r[0].color;n[0]<5&&n[1]<5&&n[2]<5&&(r[0].color=[0,0,0]);var t=r.length-1,o=r[t].color;o[0]>251&&o[1]>251&&o[2]>251&&(r[t].color=[255,255,255])}},{quantize:function(c,h){if(!c.length||h<2||h>256)return!1;var l=function(e){var t,a=new Array(1<<3*r);return e.forEach(function(e){t=o(e[0]>>n,e[1]>>n,e[2]>>n),a[t]=(a[t]||0)+1}),a}(c);l.forEach(function(){});var f=function(e,r){var t,o,a,u=1e6,s=0,c=1e6,h=0,l=1e6,f=0;return e.forEach(function(e){(t=e[0]>>n)<u?u=t:t>s&&(s=t),(o=e[1]>>n)<c?c=o:o>h&&(h=o),(a=e[2]>>n)<l?l=a:a>f&&(f=a)}),new i(u,s,c,h,l,f,r)}(c,l),p=new a(function(r,n){return e.naturalOrder(r.count(),n.count())});function d(e,r){for(var n,o=e.size(),a=0;a<t;){if(o>=r)return;if(a++>t)return;if((n=e.pop()).count()){var i=s(l,n),u=i[0],c=i[1];if(!u)return;e.push(u),c&&(e.push(c),o++)}else e.push(n),a++}}p.push(f),d(p,.75*h);for(var v=new a(function(r,n){return e.naturalOrder(r.count()*r.volume(),n.count()*n.volume())});p.size();)v.push(p.pop());d(v,h);for(var g=new u;v.size();)g.push(v.pop());return g}}}().quantize,n=function(e){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=e.naturalWidth,this.height=this.canvas.height=e.naturalHeight,this.context.drawImage(e,0,0,this.width,this.height)};n.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var t=function(){};t.prototype.getColor=function(e,r,n){return void 0===r&&(r=10),void 0===n&&(n=!1),this.getPalette(e,5,r,n)[0]},t.prototype.getPalette=function(e,t,o,a,i,u){void 0===a&&(a=!1),void 0===i&&(i=!1),void 0===u&&(u={pixelConsideredTransparentThreshold:10,imageConsideredTransparentThreshold:.1});var s=function(e){var r=e.colorCount,n=e.quality,t=e.includeWhite,o=e.checkTransparency,a=e.checkTransparencyConfig;if(void 0!==r&&Number.isInteger(r)){if(1===r)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");r=Math.max(r,2),r=Math.min(r,20)}else r=10;if((void 0===n||!Number.isInteger(n)||n<1)&&(n=10),void 0!==t&&"boolean"==typeof t||(t=!1),void 0===o||"boolean"!=typeof o)o=!1;else if(void 0===a||"object"!=typeof a)a={pixelConsideredTransparentThreshold:10,imageConsideredTransparentThreshold:.1};else{var i=a.pixelConsideredTransparentThreshold,u=a.imageConsideredTransparentThreshold;if((void 0===i||Number.isNaN(i))&&(a.pixelConsideredTransparentThreshold=10),i<0||i>255)throw new Error("pixelConsideredTransparentThreshold should be between 0 and 255. Default is 10, meaning if a pixel's alpha (0-255) is less than this 10, the pixel is counted towards the overall transparency check.");if((void 0===u||Number.isNaN(u))&&(a.imageConsideredTransparentThreshold=.1),u<0||u>1)throw new Error("pixelConsideredTransparentThreshold should be between 0 and 1. Default is 0.1, meaning if 10% of the pixels trigger the pixelConsideredTransparentThreshold check, the image is considered transparent.")}return{colorCount:r,quality:n,includeWhite:t,checkTransparency:o,checkTransparencyConfig:a}}({colorCount:t,quality:o,includeWhite:a,checkTransparency:i,checkTransparencyConfig:u}),c=new n(e),h=function(e,r,n){for(var t,o,a,i,u,s=n.quality,c=n.includeWhite,h=n.checkTransparency,l=n.checkTransparencyConfig,f=e,p=[],d=0,v=0;v<r;v+=s)o=f[0+(t=4*v)],a=f[t+1],i=f[t+2],void 0===(u=f[t+3])||u>=125?o>250&&a>250&&i>250&&!c||p.push([o,a,i]):h&&u<l.pixelConsideredTransparentThreshold&&d++;return{pixelArray:p,hasTransparency:h&&d/r.length>l.imageConsideredTransparentThreshold}}(c.getImageData().data,c.width*c.height,s),l=h.hasTransparency,f=r(h.pixelArray,s.colorCount),p=f?f.palette():null;return i?{palette:p,hasTransparency:l}:p},t.prototype.getColorFromUrl=function(e,r,n){var t=this,o=document.createElement("img");o.addEventListener("load",function(){var a=t.getPalette(o,5,n);r(a[0],e)}),o.src=e},t.prototype.getImageData=function(e,r){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=function(){if(200==this.status){var e=new Uint8Array(this.response);i=e.length;for(var n=new Array(i),t=0;t<e.length;t++)n[t]=String.fromCharCode(e[t]);var o=n.join(""),a=window.btoa(o);r("data:image/png;base64,"+a)}},n.send()},t.prototype.getColorAsync=function(e,r,n){var t=this;this.getImageData(e,function(e){var o=document.createElement("img");o.addEventListener("load",function(){var e=t.getPalette(o,5,n);r(e[0],this)}),o.src=e})};export{t as default};
