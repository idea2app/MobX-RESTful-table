function e(e,t,a,r){Object.defineProperty(e,t,{get:a,set:r,enumerable:!0,configurable:!0})}var t=globalThis.parcelRequireb6bd,a=t.register;a("j1q2Z",function(a,r){e(a.exports,"diagram",()=>E);var i=t("4RpWl"),n=t("dPlvm"),l=t("5Gaju"),s=t("3HF8x"),o=t("1ge8R"),c=t("fOAZm"),g=t("fVBdm"),d={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},m={axes:[],curves:[],options:d},p=structuredClone(m),u=s.defaultConfig_default.radar,x=(0,c.__name)(()=>(0,l.cleanAndMerge)({...u,...(0,s.getConfig)().radar}),"getConfig"),h=(0,c.__name)(()=>p.axes,"getAxes"),f=(0,c.__name)(()=>p.curves,"getCurves"),_=(0,c.__name)(()=>p.options,"getOptions"),$=(0,c.__name)(e=>{p.axes=e.map(e=>({name:e.name,label:e.label??e.name}))},"setAxes"),v=(0,c.__name)(e=>{p.curves=e.map(e=>({name:e.name,label:e.label??e.name,entries:y(e.entries)}))},"setCurves"),y=(0,c.__name)(e=>{if(void 0==e[0].axis)return e.map(e=>e.value);let t=h();if(0===t.length)throw Error("Axes must be populated before curves for reference entries");return t.map(t=>{let a=e.find(e=>e.axis?.$refText===t.name);if(void 0===a)throw Error("Missing entry for axis "+t.label);return a.value})},"computeCurveEntries"),b={getAxes:h,getCurves:f,getOptions:_,setAxes:$,setCurves:v,setOptions:(0,c.__name)(e=>{let t=e.reduce((e,t)=>(e[t.name]=t,e),{});p.options={showLegend:t.showLegend?.value??d.showLegend,ticks:t.ticks?.value??d.ticks,max:t.max?.value??d.max,min:t.min?.value??d.min,graticule:t.graticule?.value??d.graticule},p.options.ticks>32&&(o.log.warn(`Radar diagram ticks (${p.options.ticks}) exceeds maximum allowed (32). Using 32 instead.`),p.options.ticks=32)},"setOptions"),getConfig:x,clear:(0,c.__name)(()=>{(0,s.clear)(),p=structuredClone(m)},"clear"),setAccTitle:s.setAccTitle,getAccTitle:s.getAccTitle,setDiagramTitle:s.setDiagramTitle,getDiagramTitle:s.getDiagramTitle,getAccDescription:s.getAccDescription,setAccDescription:s.setAccDescription},C=(0,c.__name)(e=>{(0,i.populateCommonDb)(e,b);let{axes:t,curves:a,options:r}=e;b.setAxes(t),b.setCurves(a),b.setOptions(r)},"populate"),w={parse:(0,c.__name)(async e=>{let t=await (0,g.parse)("radar",e);o.log.debug(t),C(t)},"parse")},A=(0,c.__name)((e,t,a,r)=>{let i=r.db,l=i.getAxes(),s=i.getCurves(),o=i.getOptions(),c=i.getConfig(),g=i.getDiagramTitle(),d=T((0,n.selectSvgElement)(t),c),m=o.max??Math.max(...s.map(e=>Math.max(...e.entries))),p=o.min,u=Math.min(c.width,c.height)/2;M(d,l,u,o.ticks,o.graticule),L(d,l,u,c),k(d,l,s,p,m,o.graticule,c),S(d,s,o.showLegend,c),d.append("text").attr("class","radarTitle").text(g).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),T=(0,c.__name)((e,t)=>{let a=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return(0,s.configureSvgSize)(e,r,a,t.useMaxWidth??!0),e.attr("viewBox",`0 0 ${a} ${r}`).attr("overflow","visible"),e.append("g").attr("transform",`translate(${i.x}, ${i.y})`)},"drawFrame"),M=(0,c.__name)((e,t,a,r,i)=>{if("circle"===i)for(let t=0;t<r;t++){let i=a*(t+1)/r;e.append("circle").attr("r",i).attr("class","radarGraticule")}else if("polygon"===i){let i=t.length;for(let n=0;n<r;n++){let l=a*(n+1)/r,s=t.map((e,t)=>{let a=2*t*Math.PI/i-Math.PI/2,r=l*Math.cos(a),n=l*Math.sin(a);return`${r},${n}`}).join(" ");e.append("polygon").attr("points",s).attr("class","radarGraticule")}}},"drawGraticule"),L=(0,c.__name)((e,t,a,r)=>{let i=t.length;for(let n=0;n<i;n++){let l=t[n].label,s=2*n*Math.PI/i-Math.PI/2,o=Math.cos(s),c=Math.sin(s);e.append("line").attr("x1",0).attr("y1",0).attr("x2",a*r.axisScaleFactor*o).attr("y2",a*r.axisScaleFactor*c).attr("class","radarAxisLine");let g=o>.01?"start":o<-.01?"end":"middle",d=c>.01?"hanging":c<-.01?"auto":"central";e.append("text").text(l).attr("x",a*r.axisLabelFactor*o+4*o).attr("y",a*r.axisLabelFactor*c+4*c).attr("text-anchor",g).attr("dominant-baseline",d).attr("class","radarAxisLabel")}},"drawAxes");function k(e,t,a,r,i,n,l){let s=t.length,o=Math.min(l.width,l.height)/2;a.forEach((t,a)=>{if(t.entries.length!==s)return;let c=t.entries.map((e,t)=>{let a=2*Math.PI*t/s-Math.PI/2,n=O(e,r,i,o);return{x:n*Math.cos(a),y:n*Math.sin(a)}});"circle"===n?e.append("path").attr("d",D(c,l.curveTension)).attr("class",`radarCurve-${a}`):"polygon"===n&&e.append("polygon").attr("points",c.map(e=>`${e.x},${e.y}`).join(" ")).attr("class",`radarCurve-${a}`)})}function O(e,t,a,r){return r*(Math.min(Math.max(e,t),a)-t)/(a-t)}function D(e,t){let a=e.length,r=`M${e[0].x},${e[0].y}`;for(let i=0;i<a;i++){let n=e[(i-1+a)%a],l=e[i],s=e[(i+1)%a],o=e[(i+2)%a],c={x:l.x+(s.x-n.x)*t,y:l.y+(s.y-n.y)*t},g={x:s.x-(o.x-l.x)*t,y:s.y-(o.y-l.y)*t};r+=` C${c.x},${c.y} ${g.x},${g.y} ${s.x},${s.y}`}return`${r} Z`}function S(e,t,a,r){if(!a)return;let i=(r.width/2+r.marginRight)*3/4,n=-(3*(r.height/2+r.marginTop))/4;t.forEach((t,a)=>{let r=e.append("g").attr("transform",`translate(${i}, ${n+20*a})`);r.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${a}`),r.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(t.label)})}(0,c.__name)(k,"drawCurves"),(0,c.__name)(O,"relativeRadius"),(0,c.__name)(D,"closedRoundCurve"),(0,c.__name)(S,"drawLegend");var R=(0,c.__name)((e,t)=>{let a="";for(let r=0;r<e.THEME_COLOR_LIMIT;r++){let i=e[`cScale${r}`];a+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return a},"genIndexStyles"),I=(0,c.__name)(e=>{let t=(0,s.getThemeVariables)(),a=(0,s.getConfig)(),r=(0,l.cleanAndMerge)(t,a.themeVariables),i=(0,l.cleanAndMerge)(r.radar,e);return{themeVariables:r,radarOptions:i}},"buildRadarStyleOptions"),E={parser:w,db:b,renderer:{draw:A},styles:(0,c.__name)(({radar:e}={})=>{let{themeVariables:t,radarOptions:a}=I(e);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${a.axisColor};
		stroke-width: ${a.axisStrokeWidth};
	}
	.radarAxisLabel {
		font-size: ${a.axisLabelFontSize}px;
		color: ${a.axisColor};
	}
	.radarGraticule {
		fill: ${a.graticuleColor};
		fill-opacity: ${a.graticuleOpacity};
		stroke: ${a.graticuleColor};
		stroke-width: ${a.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${a.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${R(t,a)}
	`},"styles")}}),a("4RpWl",function(a,r){function i(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}e(a.exports,"populateCommonDb",()=>i),(0,t("fOAZm").__name)(i,"populateCommonDb")});
//# sourceMappingURL=diagram-UQ7AKVKN.148c11cc.js.map
