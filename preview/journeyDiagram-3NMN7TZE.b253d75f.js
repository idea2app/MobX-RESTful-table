function t(t,e,i,n){Object.defineProperty(t,e,{get:i,set:n,enumerable:!0,configurable:!0})}var e=globalThis.parcelRequireb6bd,i=e.register;i("kteYM",function(i,n){t(i.exports,"diagram",()=>U);var a=e("fWK09"),r=e("92w2u"),s=e("3HF8x");e("1ge8R");var l=e("fOAZm"),o=e("jP13E"),c=function(){var t=(0,l.__name)(function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i},"o"),e=[6,8,10,11,12,14,16,17,18],i=[1,9],n=[1,10],a=[1,11],r=[1,12],s=[1,13],o=[1,14],c={trace:(0,l.__name)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:(0,l.__name)(function(t,e,i,n,a,r,s){var l=r.length-1;switch(a){case 1:return r[l-1];case 2:case 6:case 7:this.$=[];break;case 3:r[l-1].push(r[l]),this.$=r[l-1];break;case 4:case 5:this.$=r[l];break;case 8:n.setDiagramTitle(r[l].substr(6)),this.$=r[l].substr(6);break;case 9:this.$=r[l].trim(),n.setAccTitle(this.$);break;case 10:case 11:this.$=r[l].trim(),n.setAccDescription(this.$);break;case 12:n.addSection(r[l].substr(8)),this.$=r[l].substr(8);break;case 13:n.addTask(r[l-1],r[l]),this.$="task"}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:n,14:a,16:r,17:s,18:o},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:n,14:a,16:r,17:s,18:o},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:(0,l.__name)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},"parseError"),parse:(0,l.__name)(function(t){var e=this,i=[0],n=[],a=[null],r=[],s=this.table,o="",c=0,h=0,u=0,p=r.slice.call(arguments,1),y=Object.create(this.lexer),d={};for(var f in this.yy)Object.prototype.hasOwnProperty.call(this.yy,f)&&(d[f]=this.yy[f]);y.setInput(t,d),d.lexer=y,d.parser=this,void 0===y.yylloc&&(y.yylloc={});var m=y.yylloc;r.push(m);var g=y.options&&y.options.ranges;function _(){var t;return"number"!=typeof(t=n.pop()||y.lex()||1)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof d.parseError?this.parseError=d.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,l.__name)(function(t){i.length=i.length-2*t,a.length=a.length-t,r.length=r.length-t},"popStack"),(0,l.__name)(_,"lex");for(var x,k,b,v,w,$,T,M,S,A={};;){if(b=i[i.length-1],this.defaultActions[b]?v=this.defaultActions[b]:(null==x&&(x=_()),v=s[b]&&s[b][x]),void 0===v||!v.length||!v[0]){var E="";for($ in S=[],s[b])this.terminals_[$]&&$>2&&S.push("'"+this.terminals_[$]+"'");E=y.showPosition?"Parse error on line "+(c+1)+":\n"+y.showPosition()+"\nExpecting "+S.join(", ")+", got '"+(this.terminals_[x]||x)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==x?"end of input":"'"+(this.terminals_[x]||x)+"'"),this.parseError(E,{text:y.match,token:this.terminals_[x]||x,line:y.yylineno,loc:m,expected:S})}if(v[0]instanceof Array&&v.length>1)throw Error("Parse Error: multiple actions possible at state: "+b+", token: "+x);switch(v[0]){case 1:i.push(x),a.push(y.yytext),r.push(y.yylloc),i.push(v[1]),x=null,k?(x=k,k=null):(h=y.yyleng,o=y.yytext,c=y.yylineno,m=y.yylloc,u>0&&u--);break;case 2:if(T=this.productions_[v[1]][1],A.$=a[a.length-T],A._$={first_line:r[r.length-(T||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(T||1)].first_column,last_column:r[r.length-1].last_column},g&&(A._$.range=[r[r.length-(T||1)].range[0],r[r.length-1].range[1]]),void 0!==(w=this.performAction.apply(A,[o,h,c,d,v[1],a,r].concat(p))))return w;T&&(i=i.slice(0,-1*T*2),a=a.slice(0,-1*T),r=r.slice(0,-1*T)),i.push(this.productions_[v[1]][0]),a.push(A.$),r.push(A._$),M=s[i[i.length-2]][i[i.length-1]],i.push(M);break;case 3:return!0}}return!0},"parse")};function h(){this.yy={}}return c.lexer={EOF:1,parseError:(0,l.__name)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,l.__name)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,l.__name)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,l.__name)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var a=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[a[0],a[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,l.__name)(function(){return this._more=!0,this},"more"),reject:(0,l.__name)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,l.__name)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,l.__name)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,l.__name)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,l.__name)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,l.__name)(function(t,e){var i,n,a;if(this.options.backtrack_lexer&&(a={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(a.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var r in a)this[r]=a[r];return!1},"test_match"),next:(0,l.__name)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,n,a=this._currentRules(),r=0;r<a.length;r++)if((i=this._input.match(this.rules[a[r]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,a[r])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,a[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,l.__name)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,l.__name)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,l.__name)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,l.__name)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,l.__name)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,l.__name)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,l.__name)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,l.__name)(function(t,e,i,n){switch(i){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}},(0,l.__name)(h,"Parser"),h.prototype=c,c.Parser=h,new h}();c.parser=c;var h="",u=[],p=[],y=[],d=(0,l.__name)(function(){u.length=0,p.length=0,h="",y.length=0,(0,s.clear)()},"clear"),f=(0,l.__name)(function(t){h=t,u.push(t)},"addSection"),m=(0,l.__name)(function(){return u},"getSections"),g=(0,l.__name)(function(){let t=b(),e=0;for(;!t&&e<100;)t=b(),e++;return p.push(...y),p},"getTasks"),_=(0,l.__name)(function(){let t=[];return p.forEach(e=>{e.people&&t.push(...e.people)}),[...new Set(t)].sort()},"updateActors"),x=(0,l.__name)(function(t,e){let i=e.substr(1).split(":"),n=0,a=[];1===i.length?(n=Number(i[0]),a=[]):(n=Number(i[0]),a=i[1].split(","));let r=a.map(t=>t.trim()),s={section:h,type:h,people:r,task:t,score:n};y.push(s)},"addTask"),k=(0,l.__name)(function(t){let e={section:h,type:h,description:t,task:t,classes:[]};p.push(e)},"addTaskOrg"),b=(0,l.__name)(function(){let t=(0,l.__name)(function(t){return y[t].processed},"compileTask"),e=!0;for(let[i,n]of y.entries())t(i),e=e&&n.processed;return e},"compileTasks"),v=(0,l.__name)(function(){return _()},"getActors"),w={getConfig:(0,l.__name)(()=>(0,s.getConfig2)().journey,"getConfig"),clear:d,setDiagramTitle:s.setDiagramTitle,getDiagramTitle:s.getDiagramTitle,setAccTitle:s.setAccTitle,getAccTitle:s.getAccTitle,setAccDescription:s.setAccDescription,getAccDescription:s.getAccDescription,addSection:f,getSections:m,getTasks:g,addTask:x,addTaskOrg:k,getActors:v},$=(0,l.__name)(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePaths .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
  ${(0,a.getIconStyles)()}
`,"getStyles"),T=(0,l.__name)(function(t,e){return(0,r.drawRect)(t,e)},"drawRect"),M=(0,l.__name)(function(t,e){let i=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),n=t.append("g");function a(t){let i=(0,o.arc)().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function r(t){let i=(0,o.arc)().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function s(t){t.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return n.append("circle").attr("cx",e.cx-5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),n.append("circle").attr("cx",e.cx+5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),(0,l.__name)(a,"smile"),(0,l.__name)(r,"sad"),(0,l.__name)(s,"ambivalent"),e.score>3?a(n):e.score<3?r(n):s(n),i},"drawFace"),S=(0,l.__name)(function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),void 0!==i.class&&i.attr("class",i.class),void 0!==e.title&&i.append("title").text(e.title),i},"drawCircle"),A=(0,l.__name)(function(t,e){return(0,r.drawText)(t,e)},"drawText"),E=(0,l.__name)(function(t,e,i){let n=t.append("g"),a=(0,r.getNoteRect)();a.x=e.x,a.y=e.y,a.fill=e.fill,a.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),a.height=i.height,a.class="journey-section section-type-"+e.num,a.rx=3,a.ry=3,T(n,a),P(i)(e.text,n,a.x,a.y,a.width,a.height,{class:"journey-section section-type-"+e.num},i,e.colour)},"drawSection"),C=-1,I=(0,l.__name)(function(t,e,i,n){let a=e.x+i.width/2,s=t.append("g");C++,s.append("line").attr("id",n+"-task"+C).attr("x1",a).attr("y1",e.y).attr("x2",a).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),M(s,{cx:a,cy:300+(5-e.score)*30,score:e.score});let l=(0,r.getNoteRect)();l.x=e.x,l.y=e.y,l.fill=e.fill,l.width=i.width,l.height=i.height,l.class="task task-type-"+e.num,l.rx=3,l.ry=3,T(s,l);let o=e.x+14;e.people.forEach(t=>{let i=e.actors[t].color;S(s,{cx:o,cy:e.y,r:7,fill:i,stroke:"#000",title:t,pos:e.actors[t].position}),o+=10}),P(i)(e.task,s,l.x,l.y,l.width,l.height,{class:"task"},i,e.colour)},"drawTask"),P=function(){function t(t,e,i,a,r,s,l,o){n(e.append("text").attr("x",i+r/2).attr("y",a+s/2+5).style("font-color",o).style("text-anchor","middle").text(t),l)}function e(t,e,i,a,r,s,l,o,c){let{taskFontSize:h,taskFontFamily:u}=o,p=t.split(/<br\s*\/?>/gi);for(let t=0;t<p.length;t++){let o=t*h-h*(p.length-1)/2,y=e.append("text").attr("x",i+r/2).attr("y",a).attr("fill",c).style("text-anchor","middle").style("font-size",h).style("font-family",u);y.append("tspan").attr("x",i+r/2).attr("dy",o).text(p[t]),y.attr("y",a+s/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(y,l)}}function i(t,i,a,r,s,l,o,c){let h=i.append("switch"),u=h.append("foreignObject").attr("x",a).attr("y",r).attr("width",s).attr("height",l).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");u.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(t),e(t,h,a,r,s,l,o,c),n(u,o)}function n(t,e){for(let i in e)i in e&&t.attr(i,e[i])}return(0,l.__name)(t,"byText"),(0,l.__name)(e,"byTspan"),(0,l.__name)(i,"byFo"),(0,l.__name)(n,"_setTextAttrs"),function(n){return"fo"===n.textPlacement?i:"old"===n.textPlacement?t:e}}(),j=(0,l.__name)(function(t,e){C=-1,t.append("defs").append("marker").attr("id",e+"-arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),F=(0,l.__name)(function(t){Object.keys(t).forEach(function(e){B[e]=t[e]})},"setConf"),R={},O=0;function V(t){let e=(0,s.getConfig2)().journey,i=e.maxLabelWidth;O=0;let n=60;Object.keys(R).forEach(a=>{let r=R[a].color;S(t,{cx:20,cy:n,r:7,fill:r,stroke:"#000",pos:R[a].position});let s=t.append("text").attr("visibility","hidden").text(a),l=s.node().getBoundingClientRect().width;s.remove();let o=[];if(l<=i)o=[a];else{let e=a.split(" "),n="";s=t.append("text").attr("visibility","hidden"),e.forEach(t=>{let e=n?`${n} ${t}`:t;if(s.text(e),s.node().getBoundingClientRect().width>i){if(n&&o.push(n),n=t,s.text(t),s.node().getBoundingClientRect().width>i){let e="";for(let n of t)e+=n,s.text(e+"-"),s.node().getBoundingClientRect().width>i&&(o.push(e.slice(0,-1)+"-"),e=n);n=e}}else n=e}),n&&o.push(n),s.remove()}o.forEach((i,a)=>{let r=A(t,{x:40,y:n+7+20*a,fill:"#666",text:i,textMargin:e.boxTextMargin??5}).node().getBoundingClientRect().width;r>O&&r>e.leftMargin-r&&(O=r)}),n+=Math.max(20,20*o.length)})}(0,l.__name)(V,"drawActorLegend");var B=(0,s.getConfig2)().journey,D=0,N=(0,l.__name)(function(t,e,i,n){let a,r=(0,s.getConfig2)(),l=r.journey.titleColor,c=r.journey.titleFontSize,h=r.journey.titleFontFamily,u=r.securityLevel;"sandbox"===u&&(a=(0,o.select)("#i"+e));let p="sandbox"===u?(0,o.select)(a.nodes()[0].contentDocument.body):(0,o.select)("body");L.init();let y=p.select("#"+e);j(y,e);let d=n.db.getTasks(),f=n.db.getDiagramTitle(),m=n.db.getActors();for(let t in R)delete R[t];let g=0;m.forEach(t=>{R[t]={color:B.actorColours[g%B.actorColours.length],position:g},g++}),V(y),D=B.leftMargin+O,L.insert(0,0,D,50*Object.keys(R).length),Y(y,d,0,e);let _=L.getBounds();f&&y.append("text").text(f).attr("x",D).attr("font-size",c).attr("font-weight","bold").attr("y",25).attr("fill",l).attr("font-family",h);let x=_.stopy-_.starty+2*B.diagramMarginY,k=D+_.stopx+2*B.diagramMarginX;(0,s.configureSvgSize)(y,x,k,B.useMaxWidth),y.append("line").attr("x1",D).attr("y1",4*B.height).attr("x2",k-D-4).attr("y2",4*B.height).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#"+e+"-arrowhead)");let b=70*!!f;y.attr("viewBox",`${_.startx} -25 ${k} ${x+b}`),y.attr("preserveAspectRatio","xMinYMin meet"),y.attr("height",x+b+25)},"draw"),L={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:(0,l.__name)(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:(0,l.__name)(function(t,e,i,n){void 0===t[e]?t[e]=i:t[e]=n(i,t[e])},"updateVal"),updateBounds:(0,l.__name)(function(t,e,i,n){let a=(0,s.getConfig2)().journey,r=this,o=0;function c(s){return(0,l.__name)(function(l){o++;let c=r.sequenceItems.length-o+1;r.updateVal(l,"starty",e-c*a.boxMargin,Math.min),r.updateVal(l,"stopy",n+c*a.boxMargin,Math.max),r.updateVal(L.data,"startx",t-c*a.boxMargin,Math.min),r.updateVal(L.data,"stopx",i+c*a.boxMargin,Math.max),"activation"!==s&&(r.updateVal(l,"startx",t-c*a.boxMargin,Math.min),r.updateVal(l,"stopx",i+c*a.boxMargin,Math.max),r.updateVal(L.data,"starty",e-c*a.boxMargin,Math.min),r.updateVal(L.data,"stopy",n+c*a.boxMargin,Math.max))},"updateItemBounds")}(0,l.__name)(c,"updateFn"),this.sequenceItems.forEach(c())},"updateBounds"),insert:(0,l.__name)(function(t,e,i,n){let a=Math.min(t,i),r=Math.max(t,i),s=Math.min(e,n),l=Math.max(e,n);this.updateVal(L.data,"startx",a,Math.min),this.updateVal(L.data,"starty",s,Math.min),this.updateVal(L.data,"stopx",r,Math.max),this.updateVal(L.data,"stopy",l,Math.max),this.updateBounds(a,s,r,l)},"insert"),bumpVerticalPos:(0,l.__name)(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:(0,l.__name)(function(){return this.verticalPos},"getVerticalPos"),getBounds:(0,l.__name)(function(){return this.data},"getBounds")},z=B.sectionFills,W=B.sectionColours,Y=(0,l.__name)(function(t,e,i,n){let a=(0,s.getConfig2)().journey,r="",l=i+(2*a.height+a.diagramMarginY),o=0,c="#CCC",h="black",u=0;for(let[i,s]of e.entries()){if(r!==s.section){c=z[o%z.length],u=o%z.length,h=W[o%W.length];let n=0,l=s.section;for(let t=i;t<e.length;t++)if(e[t].section==l)n+=1;else break;E(t,{x:i*a.taskMargin+i*a.width+D,y:50,text:s.section,fill:c,num:u,colour:h,taskCount:n},a),r=s.section,o++}let p=s.people.reduce((t,e)=>(R[e]&&(t[e]=R[e]),t),{});s.x=i*a.taskMargin+i*a.width+D,s.y=l,s.width=a.diagramMarginX,s.height=a.diagramMarginY,s.colour=h,s.fill=c,s.num=u,s.actors=p,I(t,s,a,n),L.insert(s.x,s.y,s.x+s.width+a.taskMargin,450)}},"drawTasks"),q={setConf:F,draw:N},U={parser:c,db:w,renderer:q,styles:$,init:(0,l.__name)(t=>{q.setConf(t.journey),w.clear()},"init")}}),i("fWK09",function(i,n){t(i.exports,"getIconStyles",()=>a);var a=(0,e("fOAZm").__name)(()=>`
  /* Font Awesome icon styling - consolidated */
  .label-icon {
    display: inline-block;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
  }
  
  .node .label-icon path {
    fill: currentColor;
    stroke: revert;
    stroke-width: revert;
  }
`,"getIconStyles")}),i("92w2u",function(i,n){t(i.exports,"drawRect",()=>o),t(i.exports,"drawBackgroundRect",()=>c),t(i.exports,"drawText",()=>h),t(i.exports,"drawImage",()=>u),t(i.exports,"drawEmbeddedImage",()=>p),t(i.exports,"getNoteRect",()=>y),t(i.exports,"getTextObj",()=>d),t(i.exports,"createTooltip",()=>f);var a=e("3HF8x"),r=e("fOAZm"),s=e("6VabF"),l=e("jP13E"),o=(0,r.__name)((t,e)=>{let i=t.append("rect");if(i.attr("x",e.x),i.attr("y",e.y),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("width",e.width),i.attr("height",e.height),e.name&&i.attr("name",e.name),e.rx&&i.attr("rx",e.rx),e.ry&&i.attr("ry",e.ry),void 0!==e.attrs)for(let t in e.attrs)i.attr(t,e.attrs[t]);return e.class&&i.attr("class",e.class),i},"drawRect"),c=(0,r.__name)((t,e)=>{o(t,{x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,stroke:e.stroke,class:"rect"}).lower()},"drawBackgroundRect"),h=(0,r.__name)((t,e)=>{let i=e.text.replace(a.lineBreakRegex," "),n=t.append("text");n.attr("x",e.x),n.attr("y",e.y),n.attr("class","legend"),n.style("text-anchor",e.anchor),e.class&&n.attr("class",e.class);let r=n.append("tspan");return r.attr("x",e.x+2*e.textMargin),r.text(i),n},"drawText"),u=(0,r.__name)((t,e,i,n)=>{let a=t.append("image");a.attr("x",e),a.attr("y",i);let r=(0,s.sanitizeUrl)(n);a.attr("xlink:href",r)},"drawImage"),p=(0,r.__name)((t,e,i,n)=>{let a=t.append("use");a.attr("x",e),a.attr("y",i);let r=(0,s.sanitizeUrl)(n);a.attr("xlink:href",`#${r}`)},"drawEmbeddedImage"),y=(0,r.__name)(()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),"getNoteRect"),d=(0,r.__name)(()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0}),"getTextObj"),f=(0,r.__name)(()=>{let t=(0,l.select)(".mermaidTooltip");return t.empty()&&(t=(0,l.select)("body").append("div").attr("class","mermaidTooltip").style("opacity",0).style("position","absolute").style("text-align","center").style("max-width","200px").style("padding","2px").style("font-size","12px").style("background","#ffffde").style("border","1px solid #333").style("border-radius","2px").style("pointer-events","none").style("z-index","100")),t},"createTooltip")});
//# sourceMappingURL=journeyDiagram-3NMN7TZE.b253d75f.js.map
