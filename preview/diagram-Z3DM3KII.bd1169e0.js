function t(t,e,a,r){Object.defineProperty(t,e,{get:a,set:r,enumerable:!0,configurable:!0})}var e=globalThis.parcelRequireb6bd,a=e.register;a("kuNxy",function(a,r){t(a.exports,"diagram",()=>x);var i=e("4RpWl"),l=e("dPlvm"),o=e("5Gaju"),s=e("3HF8x"),n=e("1ge8R"),c=e("fOAZm"),d=e("fVBdm"),p=s.defaultConfig_default.packet,b=class{constructor(){this.packet=[],this.setAccTitle=s.setAccTitle,this.getAccTitle=s.getAccTitle,this.setDiagramTitle=s.setDiagramTitle,this.getDiagramTitle=s.getDiagramTitle,this.getAccDescription=s.getAccDescription,this.setAccDescription=s.setAccDescription}static{(0,c.__name)(this,"PacketDB")}getConfig(){let t=(0,o.cleanAndMerge)({...p,...(0,s.getConfig)().packet});return t.showBits&&(t.paddingY+=10),t}getPacket(){return this.packet}pushWord(t){t.length>0&&this.packet.push(t)}clear(){(0,s.clear)(),this.packet=[]}},g=(0,c.__name)((t,e)=>{(0,i.populateCommonDb)(t,e);let a=-1,r=[],l=1,{bitsPerRow:o}=e.getConfig();for(let{start:i,end:s,bits:c,label:d}of t.blocks){if(void 0!==i&&void 0!==s&&s<i)throw Error(`Packet block ${i} - ${s} is invalid. End must be greater than start.`);if((i??=a+1)!==a+1)throw Error(`Packet block ${i} - ${s??i} is not contiguous. It should start from ${a+1}.`);if(0===c)throw Error(`Packet block ${i} is invalid. Cannot have a zero bit field.`);for(s??=i+(c??1)-1,c??=s-i+1,a=s,n.log.debug(`Packet block ${i} - ${a} with label ${d}`);r.length<=o+1&&e.getPacket().length<1e4;){let[t,a]=h({start:i,end:s,bits:c,label:d},l,o);if(r.push(t),t.end+1===l*o&&(e.pushWord(r),r=[],l++),!a)break;({start:i,end:s,bits:c,label:d}=a)}}e.pushWord(r)},"populate"),h=(0,c.__name)((t,e,a)=>{if(void 0===t.start)throw Error("start should have been set during first phase");if(void 0===t.end)throw Error("end should have been set during first phase");if(t.start>t.end)throw Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*a)return[t,void 0];let r=e*a-1,i=e*a;return[{start:t.start,end:r,label:t.label,bits:r-t.start},{start:i,end:t.end,label:t.label,bits:t.end-i}]},"getNextFittingBlock"),k={parser:{yy:void 0},parse:(0,c.__name)(async t=>{let e=await (0,d.parse)("packet",t),a=k.parser?.yy;if(!(a instanceof b))throw Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");n.log.debug(e),g(e,a)},"parse")},f=(0,c.__name)((t,e,a,r)=>{let i=r.db,o=i.getConfig(),{rowHeight:n,paddingY:c,bitWidth:d,bitsPerRow:p}=o,b=i.getPacket(),g=i.getDiagramTitle(),h=n+c,k=h*(b.length+1)-(g?0:n),f=d*p+2,m=(0,l.selectSvgElement)(e);for(let[t,e]of(m.attr("viewBox",`0 0 ${f} ${k}`),(0,s.configureSvgSize)(m,k,f,o.useMaxWidth),b.entries()))u(m,e,t,o);m.append("text").text(g).attr("x",f/2).attr("y",k-h/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),u=(0,c.__name)((t,e,a,{rowHeight:r,paddingX:i,paddingY:l,bitWidth:o,bitsPerRow:s,showBits:n})=>{let c=t.append("g"),d=a*(r+l)+l;for(let t of e){let e=t.start%s*o+1,a=(t.end-t.start+1)*o-i;if(c.append("rect").attr("x",e).attr("y",d).attr("width",a).attr("height",r).attr("class","packetBlock"),c.append("text").attr("x",e+a/2).attr("y",d+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!n)continue;let l=t.end===t.start,p=d-2;c.append("text").attr("x",e+(l?a/2:0)).attr("y",p).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",l?"middle":"start").text(t.start),l||c.append("text").attr("x",e+a).attr("y",p).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(t.end)}},"drawWord"),m={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},x={parser:k,get db(){return new b},renderer:{draw:f},styles:(0,c.__name)(({packet:t}={})=>{let e=(0,o.cleanAndMerge)(m,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles")}}),a("4RpWl",function(a,r){function i(t,e){t.accDescr&&e.setAccDescription?.(t.accDescr),t.accTitle&&e.setAccTitle?.(t.accTitle),t.title&&e.setDiagramTitle?.(t.title)}t(a.exports,"populateCommonDb",()=>i),(0,e("fOAZm").__name)(i,"populateCommonDb")});
//# sourceMappingURL=diagram-Z3DM3KII.bd1169e0.js.map
