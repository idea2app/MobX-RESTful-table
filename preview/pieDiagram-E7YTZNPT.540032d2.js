function e(e,t,a,i){Object.defineProperty(e,t,{get:a,set:i,enumerable:!0,configurable:!0})}var t=globalThis.parcelRequireb6bd,a=t.register;a("5hoZN",function(a,i){e(a.exports,"diagram",()=>A);var l=t("4RpWl"),r=t("dPlvm"),n=t("5Gaju"),o=t("3HF8x"),s=t("1ge8R"),c=t("fOAZm"),p=t("fVBdm"),d=t("jP13E"),g=o.defaultConfig_default.pie,h={sections:new Map,showData:!1,config:g},m=h.sections,u=h.showData,f=structuredClone(g),b=(0,c.__name)(()=>structuredClone(f),"getConfig"),x=(0,c.__name)(()=>{m=new Map,u=h.showData,(0,o.clear)()},"clear"),S=(0,c.__name)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);m.has(e)||(m.set(e,t),s.log.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,c.__name)(()=>m,"getSections"),D=(0,c.__name)(e=>{u=e},"setShowData"),$=(0,c.__name)(()=>u,"getShowData"),v={getConfig:b,clear:x,setDiagramTitle:o.setDiagramTitle,getDiagramTitle:o.getDiagramTitle,setAccTitle:o.setAccTitle,getAccTitle:o.getAccTitle,setAccDescription:o.setAccDescription,getAccDescription:o.getAccDescription,addSection:S,getSections:w,setShowData:D,getShowData:$},T=(0,c.__name)((e,t)=>{(0,l.populateCommonDb)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),_={parse:(0,c.__name)(async e=>{let t=await (0,p.parse)("pie",e);s.log.debug(t),T(t,v)},"parse")},y=(0,c.__name)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),C=(0,c.__name)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return(0,d.pie)().value(e=>e.value).sort(null)(a)},"createPieArcs"),A={parser:_,db:v,renderer:{draw:(0,c.__name)((e,t,a,i)=>{s.log.debug("rendering pie chart\n"+e);let l=i.db,c=(0,o.getConfig2)(),p=(0,n.cleanAndMerge)(l.getConfig(),c.pie),g=(0,r.selectSvgElement)(t),h=g.append("g");h.attr("transform","translate(225,225)");let{themeVariables:m}=c,[u]=(0,n.parseFontSize)(m.pieOuterStrokeWidth);u??=2;let f=p.legendPosition,b=p.textPosition,x=p.donutHole>0&&p.donutHole<=.9?p.donutHole:0,S=(0,d.arc)().innerRadius(185*x).outerRadius(185),w=(0,d.arc)().innerRadius(185*b).outerRadius(185*b),D=h.append("g");D.append("circle").attr("cx",0).attr("cy",0).attr("r",185+u/2).attr("class","pieOuterCircle");let $=l.getSections(),v=C($),T=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],_=0;$.forEach(e=>{_+=e});let y=v.filter(e=>"0"!==(e.data.value/_*100).toFixed(0)),A=(0,d.scaleOrdinal)(T).domain([...$.keys()]);D.selectAll("mySlices").data(y).enter().append("path").attr("d",S).attr("fill",e=>A(e.data.label)).attr("class",e=>{let t="pieCircle";return"hover"===p.highlightSlice?t+=" highlightedOnHover":p.highlightSlice===e.data.label&&(t+=" highlighted"),t}),D.selectAll("mySlices").data(y).enter().append("text").text(e=>(e.data.value/_*100).toFixed(0)+"%").attr("transform",e=>"translate("+w.centroid(e)+")").style("text-anchor","middle").attr("class","slice");let k=h.append("text").text(l.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText"),O=[...$.entries()].map(([e,t])=>({label:e,value:t})),R=h.selectAll(".legend").data(O).enter().append("g").attr("class","legend");R.append("rect").attr("width",18).attr("height",18).style("fill",e=>A(e.label)).style("stroke",e=>A(e.label)),R.append("text").attr("x",22).attr("y",14).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);let z=Math.max(...R.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0)),F=450,M=490,H=22*O.length;switch(f){case"center":R.attr("transform",(e,t)=>"translate("+(-z/2-22)+","+(22*t-22*O.length/2)+")");break;case"top":F+=H,R.attr("transform",(e,t)=>`translate(${-z/2-22}, ${22*t-185})`),D.attr("transform",()=>`translate(0, ${H+22})`);break;case"bottom":F+=H,R.attr("transform",(e,t)=>"translate("+(-z/2-22)+","+(22*t- -207)+")");break;case"left":M+=22+z,R.attr("transform",(e,t)=>"translate(-207,"+(22*t-22*O.length/2)+")"),D.attr("transform",()=>`translate(${z+18+4}, 0)`);break;default:M+=22+z,R.attr("transform",(e,t)=>"translate(216,"+(22*t-22*O.length/2)+")")}let P=k.node()?.getBoundingClientRect().width??0,W=Math.min(0,225-P/2),B=Math.max(M,225+P/2)-W;g.attr("viewBox",`${W} 0 ${B} ${F}`),(0,o.configureSvgSize)(g,F,B,p.useMaxWidth)},"draw")},styles:y}}),a("4RpWl",function(a,i){function l(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}e(a.exports,"populateCommonDb",()=>l),(0,t("fOAZm").__name)(l,"populateCommonDb")});
//# sourceMappingURL=pieDiagram-E7YTZNPT.540032d2.js.map
