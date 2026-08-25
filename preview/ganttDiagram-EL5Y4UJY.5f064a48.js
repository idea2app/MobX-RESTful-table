function t(t){return t&&t.__esModule?t.default:t}var e=globalThis.parcelRequireb6bd,i=e.register;i("bPE0I",function(i,n){Object.defineProperty(i.exports,"diagram",{get:()=>tz,set:void 0,enumerable:!0,configurable:!0});var s,r,a,o=e("5Gaju"),c=e("3HF8x"),l=e("1ge8R"),d=e("fOAZm"),u=e("6VabF"),h=e("1zDll"),m=e("7JqFu"),f=e("5jViC"),y=e("6KBk3"),k=e("55KVi"),g=e("jP13E"),p=function(){var t=(0,d.__name)(function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],i=[1,26],n=[1,27],s=[1,28],r=[1,29],a=[1,30],o=[1,31],c=[1,32],l=[1,33],u=[1,34],h=[1,9],m=[1,10],f=[1,11],y=[1,12],k=[1,13],g=[1,14],p=[1,15],_=[1,16],T=[1,19],x=[1,20],v=[1,21],b=[1,22],$=[1,23],w=[1,25],D=[1,35],S={trace:(0,d.__name)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:(0,d.__name)(function(t,e,i,n,s,r,a){var o=r.length-1;switch(s){case 1:return r[o-1];case 2:case 6:case 7:this.$=[];break;case 3:r[o-1].push(r[o]),this.$=r[o-1];break;case 4:case 5:this.$=r[o];break;case 8:n.setWeekday("monday");break;case 9:n.setWeekday("tuesday");break;case 10:n.setWeekday("wednesday");break;case 11:n.setWeekday("thursday");break;case 12:n.setWeekday("friday");break;case 13:n.setWeekday("saturday");break;case 14:n.setWeekday("sunday");break;case 15:n.setWeekend("friday");break;case 16:n.setWeekend("saturday");break;case 17:n.setDateFormat(r[o].substr(11)),this.$=r[o].substr(11);break;case 18:n.enableInclusiveEndDates(),this.$=r[o].substr(18);break;case 19:n.TopAxis(),this.$=r[o].substr(8);break;case 20:n.setAxisFormat(r[o].substr(11)),this.$=r[o].substr(11);break;case 21:n.setTickInterval(r[o].substr(13)),this.$=r[o].substr(13);break;case 22:n.setExcludes(r[o].substr(9)),this.$=r[o].substr(9);break;case 23:n.setIncludes(r[o].substr(9)),this.$=r[o].substr(9);break;case 24:n.setTodayMarker(r[o].substr(12)),this.$=r[o].substr(12);break;case 27:n.setDiagramTitle(r[o].substr(6)),this.$=r[o].substr(6);break;case 28:this.$=r[o].trim(),n.setAccTitle(this.$);break;case 29:case 30:this.$=r[o].trim(),n.setAccDescription(this.$);break;case 31:n.addSection(r[o].substr(8)),this.$=r[o].substr(8);break;case 33:n.addTask(r[o-1],r[o]),this.$="task";break;case 34:this.$=r[o-1],n.setClickEvent(r[o-1],r[o],null);break;case 35:this.$=r[o-2],n.setClickEvent(r[o-2],r[o-1],r[o]);break;case 36:this.$=r[o-2],n.setClickEvent(r[o-2],r[o-1],null),n.setLink(r[o-2],r[o]);break;case 37:this.$=r[o-3],n.setClickEvent(r[o-3],r[o-2],r[o-1]),n.setLink(r[o-3],r[o]);break;case 38:this.$=r[o-2],n.setClickEvent(r[o-2],r[o],null),n.setLink(r[o-2],r[o-1]);break;case 39:this.$=r[o-3],n.setClickEvent(r[o-3],r[o-1],r[o]),n.setLink(r[o-3],r[o-2]);break;case 40:this.$=r[o-1],n.setLink(r[o-1],r[o]);break;case 41:case 47:this.$=r[o-1]+" "+r[o];break;case 42:case 43:case 45:this.$=r[o-2]+" "+r[o-1]+" "+r[o];break;case 44:case 46:this.$=r[o-3]+" "+r[o-2]+" "+r[o-1]+" "+r[o]}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:n,14:s,15:r,16:a,17:o,18:c,19:18,20:l,21:u,22:h,23:m,24:f,25:y,26:k,27:g,28:p,29:_,30:T,31:x,33:v,35:b,36:$,37:24,38:w,40:D},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:i,13:n,14:s,15:r,16:a,17:o,18:c,19:18,20:l,21:u,22:h,23:m,24:f,25:y,26:k,27:g,28:p,29:_,30:T,31:x,33:v,35:b,36:$,37:24,38:w,40:D},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:(0,d.__name)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},"parseError"),parse:(0,d.__name)(function(t){var e=this,i=[0],n=[],s=[null],r=[],a=this.table,o="",c=0,l=0,u=0,h=r.slice.call(arguments,1),m=Object.create(this.lexer),f={};for(var y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,y)&&(f[y]=this.yy[y]);m.setInput(t,f),f.lexer=m,f.parser=this,void 0===m.yylloc&&(m.yylloc={});var k=m.yylloc;r.push(k);var g=m.options&&m.options.ranges;function p(){var t;return"number"!=typeof(t=n.pop()||m.lex()||1)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof f.parseError?this.parseError=f.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,d.__name)(function(t){i.length=i.length-2*t,s.length=s.length-t,r.length=r.length-t},"popStack"),(0,d.__name)(p,"lex");for(var _,T,x,v,b,$,w,D,S,C={};;){if(x=i[i.length-1],this.defaultActions[x]?v=this.defaultActions[x]:(null==_&&(_=p()),v=a[x]&&a[x][_]),void 0===v||!v.length||!v[0]){var M="";for($ in S=[],a[x])this.terminals_[$]&&$>2&&S.push("'"+this.terminals_[$]+"'");M=m.showPosition?"Parse error on line "+(c+1)+":\n"+m.showPosition()+"\nExpecting "+S.join(", ")+", got '"+(this.terminals_[_]||_)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==_?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(M,{text:m.match,token:this.terminals_[_]||_,line:m.yylineno,loc:k,expected:S})}if(v[0]instanceof Array&&v.length>1)throw Error("Parse Error: multiple actions possible at state: "+x+", token: "+_);switch(v[0]){case 1:i.push(_),s.push(m.yytext),r.push(m.yylloc),i.push(v[1]),_=null,T?(_=T,T=null):(l=m.yyleng,o=m.yytext,c=m.yylineno,k=m.yylloc,u>0&&u--);break;case 2:if(w=this.productions_[v[1]][1],C.$=s[s.length-w],C._$={first_line:r[r.length-(w||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(w||1)].first_column,last_column:r[r.length-1].last_column},g&&(C._$.range=[r[r.length-(w||1)].range[0],r[r.length-1].range[1]]),void 0!==(b=this.performAction.apply(C,[o,l,c,f,v[1],s,r].concat(h))))return b;w&&(i=i.slice(0,-1*w*2),s=s.slice(0,-1*w),r=r.slice(0,-1*w)),i.push(this.productions_[v[1]][0]),s.push(C.$),r.push(C._$),D=a[i[i.length-2]][i[i.length-1]],i.push(D);break;case 3:return!0}}return!0},"parse")};function C(){this.yy={}}return S.lexer={EOF:1,parseError:(0,d.__name)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,d.__name)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,d.__name)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,d.__name)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,d.__name)(function(){return this._more=!0,this},"more"),reject:(0,d.__name)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,d.__name)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,d.__name)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,d.__name)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,d.__name)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,d.__name)(function(t,e){var i,n,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var r in s)this[r]=s[r];return!1},"test_match"),next:(0,d.__name)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,n,s=this._currentRules(),r=0;r<s.length;r++)if((i=this._input.match(this.rules[s[r]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,s[r])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,s[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,d.__name)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,d.__name)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,d.__name)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,d.__name)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,d.__name)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,d.__name)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,d.__name)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,d.__name)(function(t,e,i,n){switch(i){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:case 15:case 18:case 21:case 24:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:case 9:case 10:case 12:case 13:break;case 11:return 10;case 14:this.begin("href");break;case 16:return 43;case 17:this.begin("callbackname");break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 22:return 42;case 23:this.begin("click");break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}},(0,d.__name)(C,"Parser"),C.prototype=S,S.Parser=C,new C}();p.parser=p,(t(h)).extend(t(m)),(t(h)).extend(t(f)),(t(h)).extend(t(y));var _={friday:5,saturday:6},T="",x="",v=void 0,b="",$=[],w=[],D=new Map,S=[],C=[],M="",E="",Y=["active","done","crit","milestone","vert"],O=[],A="",L=!1,I=!1,F="sunday",W="saturday",P=0,H=(0,d.__name)(function(){S=[],C=[],M="",O=[],t_=0,s=void 0,r=void 0,tb=[],T="",x="",E="",v=void 0,b="",$=[],w=[],L=!1,I=!1,P=0,D=new Map,A="",(0,c.clear)(),F="sunday",W="saturday"},"clear"),z=(0,d.__name)(function(t){A=t},"setDiagramId"),B=(0,d.__name)(function(t){x=t},"setAxisFormat"),N=(0,d.__name)(function(){return x},"getAxisFormat"),j=(0,d.__name)(function(t){v=t},"setTickInterval"),R=(0,d.__name)(function(){return v},"getTickInterval"),G=(0,d.__name)(function(t){b=t},"setTodayMarker"),V=(0,d.__name)(function(){return b},"getTodayMarker"),Z=(0,d.__name)(function(t){T=t},"setDateFormat"),q=(0,d.__name)(function(){L=!0},"enableInclusiveEndDates"),U=(0,d.__name)(function(){return L},"endDatesAreInclusive"),X=(0,d.__name)(function(){I=!0},"enableTopAxis"),K=(0,d.__name)(function(){return I},"topAxisEnabled"),Q=(0,d.__name)(function(t){E=t},"setDisplayMode"),J=(0,d.__name)(function(){return E},"getDisplayMode"),tt=(0,d.__name)(function(){return T},"getDateFormat"),te=(0,d.__name)((t,e)=>[...new Set([...t,...e.toLowerCase().split(/[\s,]+/).filter(t=>""!==t)])],"mergeTokens"),ti=(0,d.__name)(function(t){$=te($,t)},"setIncludes"),tn=(0,d.__name)(function(){return $},"getIncludes"),ts=(0,d.__name)(function(t){w=te(w,t)},"setExcludes"),tr=(0,d.__name)(function(){return w},"getExcludes"),ta=(0,d.__name)(function(){return D},"getLinks"),to=(0,d.__name)(function(t){M=t,S.push(t)},"addSection"),tc=(0,d.__name)(function(){return S},"getSections"),tl=(0,d.__name)(function(){let t=tC(),e=0;for(;!t&&e<10;)t=tC(),e++;return C=tb},"getTasks"),td=(0,d.__name)(function(t,e,i,n){let s=t.format(e.trim()),r=t.format("YYYY-MM-DD");return!(n.includes(s)||n.includes(r))&&(!!(i.includes("weekends")&&(t.isoWeekday()===_[W]||t.isoWeekday()===_[W]+1)||i.includes(t.format("dddd").toLowerCase()))||i.includes(s)||i.includes(r))},"isInvalidDate"),tu=(0,d.__name)(function(t){F=t},"setWeekday"),th=(0,d.__name)(function(){return F},"getWeekday"),tm=(0,d.__name)(function(t){W=t},"setWeekend"),tf=(0,d.__name)(function(e,i,n,s){let r;if(!n.length||e.manualEndTime)return;let[a,o]=ty(r=(r=e.startTime instanceof Date?(t(h))(e.startTime):(t(h))(e.startTime,i,!0)).add(1,"d"),e.endTime instanceof Date?(t(h))(e.endTime):(t(h))(e.endTime,i,!0),i,n,s);e.endTime=a.toDate(),e.renderEndTime=o},"checkTaskDates"),ty=(0,d.__name)(function(t,e,i,n,s){let r=!1,a=null,o=e.add(1e4,"d");for(;t<=e;){if(r||(a=e.toDate()),(r=td(t,i,n,s))&&(e=e.add(1,"d"))>o)throw Error("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.");t=t.add(1,"d")}return[e,a]},"fixTaskDates"),tk=(0,d.__name)(function(e,i,n){if(n=n.trim(),(0,d.__name)(t=>{let e=t.trim();return"x"===e||"X"===e},"isTimestampFormat")(i)&&/^\d+$/.test(n))return new Date(Number(n));let s=/^after\s+(?<ids>[\d\w- ]+)/.exec(n);if(null!==s){let t=null;for(let e of s.groups.ids.split(" ")){let i=tD(e);void 0!==i&&(!t||i.endTime>t.endTime)&&(t=i)}if(t)return t.endTime;let e=new Date;return e.setHours(0,0,0,0),e}let r=(t(h))(n,i.trim(),!0);if(r.isValid())return r.toDate();{l.log.debug("Invalid date:"+n),l.log.debug("With date format:"+i.trim());let t=new Date(n);if(void 0===t||isNaN(t.getTime())||-1e4>t.getFullYear()||t.getFullYear()>1e4)throw Error("Invalid date:"+n);return t}},"getStartDate"),tg=(0,d.__name)(function(t){let e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return null!==e?[Number.parseFloat(e[1]),e[2]]:[0/0,"ms"]},"parseDuration"),tp=(0,d.__name)(function(e,i,n,s=!1){n=n.trim();let r=/^until\s+(?<ids>[\d\w- ]+)/.exec(n);if(null!==r){let t=null;for(let e of r.groups.ids.split(" ")){let i=tD(e);void 0!==i&&(!t||i.startTime<t.startTime)&&(t=i)}if(t)return t.startTime;let e=new Date;return e.setHours(0,0,0,0),e}let a=(t(h))(n,i.trim(),!0);if(a.isValid())return s&&(a=a.add(1,"d")),a.toDate();let o=(t(h))(e),[c,l]=tg(n);if(!Number.isNaN(c)){let t=o.add(c,l);t.isValid()&&(o=t)}return o.toDate()},"getEndDate"),t_=0,tT=(0,d.__name)(function(t){return void 0===t?"task"+(t_+=1):t},"parseId"),tx=(0,d.__name)(function(e,i){let n=(":"===i.substr(0,1)?i.substr(1,i.length):i).split(","),s={};tF(n,s,Y);for(let t=0;t<n.length;t++)n[t]=n[t].trim();let r="";switch(n.length){case 1:s.id=tT(),s.startTime=e.endTime,r=n[0];break;case 2:s.id=tT(),s.startTime=tk(void 0,T,n[0]),r=n[1];break;case 3:s.id=tT(n[0]),s.startTime=tk(void 0,T,n[1]),r=n[2]}return r&&(s.endTime=tp(s.startTime,T,r,L),s.manualEndTime=(t(h))(r,"YYYY-MM-DD",!0).isValid(),tf(s,T,w,$)),s},"compileData"),tv=(0,d.__name)(function(t,e){let i=(":"===e.substr(0,1)?e.substr(1,e.length):e).split(","),n={};tF(i,n,Y);for(let t=0;t<i.length;t++)i[t]=i[t].trim();switch(i.length){case 1:n.id=tT(),n.startTime={type:"prevTaskEnd",id:t},n.endTime={data:i[0]};break;case 2:n.id=tT(),n.startTime={type:"getStartDate",startData:i[0]},n.endTime={data:i[1]};break;case 3:n.id=tT(i[0]),n.startTime={type:"getStartDate",startData:i[1]},n.endTime={data:i[2]}}return n},"parseData"),tb=[],t$={},tw=(0,d.__name)(function(t,e){let i={section:M,type:M,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},n=tv(r,e);i.raw.startTime=n.startTime,i.raw.endTime=n.endTime,i.id=n.id,i.prevTaskId=r,i.active=n.active,i.done=n.done,i.crit=n.crit,i.milestone=n.milestone,i.vert=n.vert,i.vert?i.order=-1:(i.order=P,P++);let s=tb.push(i);r=i.id,t$[i.id]=s-1},"addTask"),tD=(0,d.__name)(function(t){return tb[t$[t]]},"findTaskById"),tS=(0,d.__name)(function(t,e){let i={section:M,type:M,description:t,task:t,classes:[]},n=tx(s,e);i.startTime=n.startTime,i.endTime=n.endTime,i.id=n.id,i.active=n.active,i.done=n.done,i.crit=n.crit,i.milestone=n.milestone,i.vert=n.vert,s=i,C.push(i)},"addTaskOrg"),tC=(0,d.__name)(function(){let e=(0,d.__name)(function(e){let i=tb[e],n="";switch(tb[e].raw.startTime.type){case"prevTaskEnd":{let t=tD(i.prevTaskId);i.startTime=t.endTime;break}case"getStartDate":(n=tk(void 0,T,tb[e].raw.startTime.startData))&&(tb[e].startTime=n)}return tb[e].startTime&&(tb[e].endTime=tp(tb[e].startTime,T,tb[e].raw.endTime.data,L),tb[e].endTime&&(tb[e].processed=!0,tb[e].manualEndTime=(t(h))(tb[e].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),tf(tb[e],T,w,$))),tb[e].processed},"compileTask"),i=!0;for(let[t,n]of tb.entries())e(t),i=i&&n.processed;return i},"compileTasks"),tM=(0,d.__name)(function(t,e){let i=e;"loose"!==(0,c.getConfig2)().securityLevel&&(i=(0,u.sanitizeUrl)(e)),t.split(",").forEach(function(t){void 0!==tD(t)&&(tO(t,()=>{window.open(i,"_self")}),D.set(t,i))}),tE(t,"clickable")},"setLink"),tE=(0,d.__name)(function(t,e){t.split(",").forEach(function(t){let i=tD(t);void 0!==i&&i.classes.push(e)})},"setClass"),tY=(0,d.__name)(function(t,e,i){if("loose"!==(0,c.getConfig2)().securityLevel||void 0===e)return;let n=[];if("string"==typeof i){n=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let t=0;t<n.length;t++){let e=n[t].trim();e.startsWith('"')&&e.endsWith('"')&&(e=e.substr(1,e.length-2)),n[t]=e}}0===n.length&&n.push(t),void 0!==tD(t)&&tO(t,()=>{o.utils_default.runFunc(e,...n)})},"setClickFun"),tO=(0,d.__name)(function(t,e){O.push(function(){let i=A?`${A}-${t}`:t,n=document.querySelector(`[id="${i}"]`);null!==n&&n.addEventListener("click",function(){e()})},function(){let i=A?`${A}-${t}`:t,n=document.querySelector(`[id="${i}-text"]`);null!==n&&n.addEventListener("click",function(){e()})})},"pushFun"),tA=(0,d.__name)(function(t,e,i){t.split(",").forEach(function(t){tY(t,e,i)}),tE(t,"clickable")},"setClickEvent"),tL=(0,d.__name)(function(t){O.forEach(function(e){e(t)})},"bindFunctions"),tI={getConfig:(0,d.__name)(()=>(0,c.getConfig2)().gantt,"getConfig"),clear:H,setDateFormat:Z,getDateFormat:tt,enableInclusiveEndDates:q,endDatesAreInclusive:U,enableTopAxis:X,topAxisEnabled:K,setAxisFormat:B,getAxisFormat:N,setTickInterval:j,getTickInterval:R,setTodayMarker:G,getTodayMarker:V,setAccTitle:c.setAccTitle,getAccTitle:c.getAccTitle,setDiagramTitle:c.setDiagramTitle,getDiagramTitle:c.getDiagramTitle,setDiagramId:z,setDisplayMode:Q,getDisplayMode:J,setAccDescription:c.setAccDescription,getAccDescription:c.getAccDescription,addSection:to,getSections:tc,getTasks:tl,addTask:tw,findTaskById:tD,addTaskOrg:tS,setIncludes:ti,getIncludes:tn,setExcludes:ts,getExcludes:tr,setClickEvent:tA,setLink:tM,getLinks:ta,bindFunctions:tL,parseDuration:tg,isInvalidDate:td,setWeekday:tu,getWeekday:th,setWeekend:tm};function tF(t,e,i){let n=!0;for(;n;)n=!1,i.forEach(function(i){let s=RegExp("^\\s*"+i+"\\s*$");t[0].match(s)&&(e[i]=!0,t.shift(1),n=!0)})}(0,d.__name)(tF,"getTaskTags"),(t(h)).extend(t(k));var tW=(0,d.__name)(function(){l.log.debug("Something is calling, setConf, remove the call")},"setConf"),tP={monday:g.timeMonday,tuesday:g.timeTuesday,wednesday:g.timeWednesday,thursday:g.timeThursday,friday:g.timeFriday,saturday:g.timeSaturday,sunday:g.timeSunday},tH=(0,d.__name)((t,e)=>{let i=[...t].map(()=>-1/0),n=[...t].sort((t,e)=>t.startTime-e.startTime||t.order-e.order),s=0;for(let t of n)for(let n=0;n<i.length;n++)if(t.startTime>=i[n]){i[n]=t.endTime,t.order=n+e,n>s&&(s=n);break}return s},"getMaxIntersections"),tz={parser:p,db:tI,renderer:{setConf:tW,draw:(0,d.__name)(function(e,i,n,s){let r,o=(0,c.getConfig2)().gantt;s.db.setDiagramId(i);let u=(0,c.getConfig2)().securityLevel;"sandbox"===u&&(r=(0,g.select)("#i"+i));let m="sandbox"===u?(0,g.select)(r.nodes()[0].contentDocument.body):(0,g.select)("body"),f="sandbox"===u?r.nodes()[0].contentDocument:document,y=f.getElementById(i);void 0===(a=y.parentElement.offsetWidth)&&(a=1200),void 0!==o.useWidth&&(a=o.useWidth);let k=s.db.getTasks(),p=k.filter(t=>!t.vert),_=[];for(let t of p)_.push(t.type);_=O(_);let T={},x=2*o.topPadding;if("compact"===s.db.getDisplayMode()||"compact"===o.displayMode){let t={};for(let e of p)void 0===t[e.section]?t[e.section]=[e]:t[e.section].push(e);let e=0;for(let i of Object.keys(t)){let n=tH(t[i],e)+1;e+=n,x+=n*(o.barHeight+o.barGap),T[i]=n}}else for(let t of(x+=p.length*(o.barHeight+o.barGap),_))T[t]=p.filter(e=>e.type===t).length;y.setAttribute("viewBox","0 0 "+a+" "+x);let v=m.select(`[id="${i}"]`),b=(0,g.scaleTime)().domain([(0,g.min)(k,function(t){return t.startTime}),(0,g.max)(k,function(t){return t.endTime})]).rangeRound([0,a-o.leftPadding-o.rightPadding]);function $(t,e){let i=t.startTime,n=e.startTime,s=0;return i>n?s=1:i<n&&(s=-1),s}function w(t,e,i){let n=o.barHeight,r=n+o.barGap,a=o.topPadding,c=o.leftPadding,l=(0,g.scaleLinear)().domain([0,_.length]).range(["#00B9FA","#F95002"]).interpolate(g.interpolateHcl);S(r,a,c,e,i,t,s.db.getExcludes(),s.db.getIncludes()),M(c,a,e,i),D(t,r,a,c,n,l,e),E(r,a),Y(c,a,e,i)}function D(t,e,n,r,a,l,d){t.sort((t,e)=>t.vert===e.vert?0:t.vert?1:-1);let u=t.filter(t=>!t.vert),h=[...new Set(u.map(t=>t.order))].map(t=>u.find(e=>e.order===t));v.append("g").selectAll("rect").data(h).enter().append("rect").attr("x",0).attr("y",function(t,i){return t.order*e+n-2}).attr("width",function(){return d-o.rightPadding/2}).attr("height",e).attr("class",function(t){for(let[e,i]of _.entries())if(t.type===i)return"section section"+e%o.numberSectionStyles;return"section section0"}).enter();let m=v.append("g").selectAll("rect").data(t).enter(),f=s.db.getLinks();if(m.append("rect").attr("id",function(t){return i+"-"+t.id}).attr("rx",3).attr("ry",3).attr("x",function(t){return t.milestone?b(t.startTime)+r+.5*(b(t.endTime)-b(t.startTime))-.5*a:b(t.startTime)+r}).attr("y",function(t,i){return(i=t.order,t.vert)?o.gridLineStartPadding:i*e+n}).attr("width",function(t){return t.milestone?a:t.vert?.08*a:b(t.renderEndTime||t.endTime)-b(t.startTime)}).attr("height",function(t){return t.vert?u.length*(o.barHeight+o.barGap)+2*o.barHeight:a}).attr("transform-origin",function(t,i){return i=t.order,(b(t.startTime)+r+.5*(b(t.endTime)-b(t.startTime))).toString()+"px "+(i*e+n+.5*a).toString()+"px"}).attr("class",function(t){let e="";t.classes.length>0&&(e=t.classes.join(" "));let i=0;for(let[e,n]of _.entries())t.type===n&&(i=e%o.numberSectionStyles);let n="";return t.active?t.crit?n+=" activeCrit":n=" active":t.done?n=t.crit?" doneCrit":" done":t.crit&&(n+=" crit"),0===n.length&&(n=" task"),t.milestone&&(n=" milestone "+n),t.vert&&(n=" vert "+n),n+=i,"task"+(n+=" "+e)}),m.append("text").attr("id",function(t){return i+"-"+t.id+"-text"}).text(function(t){return t.task}).attr("font-size",o.fontSize).attr("x",function(t){let e=b(t.startTime),i=b(t.renderEndTime||t.endTime);if(t.milestone&&(e+=.5*(b(t.endTime)-b(t.startTime))-.5*a,i=e+a),t.vert)return b(t.startTime)+r;let n=this.getBBox().width;return n>i-e?i+n+1.5*o.leftPadding>d?e+r-5:i+r+5:(i-e)/2+e+r}).attr("y",function(t,i){return t.vert?o.gridLineStartPadding+u.length*(o.barHeight+o.barGap)+60:t.order*e+o.barHeight/2+(o.fontSize/2-2)+n}).attr("text-height",a).attr("class",function(t){let e=b(t.startTime),i=b(t.endTime);t.milestone&&(i=e+a);let n=this.getBBox().width,s="";t.classes.length>0&&(s=t.classes.join(" "));let r=0;for(let[e,i]of _.entries())t.type===i&&(r=e%o.numberSectionStyles);let c="";return(t.active&&(c=t.crit?"activeCritText"+r:"activeText"+r),t.done?c=t.crit?c+" doneCritText"+r:c+" doneText"+r:t.crit&&(c=c+" critText"+r),t.milestone&&(c+=" milestoneText"),t.vert&&(c+=" vertText"),n>i-e)?i+n+1.5*o.leftPadding>d?s+" taskTextOutsideLeft taskTextOutside"+r+" "+c:s+" taskTextOutsideRight taskTextOutside"+r+" "+c+" width-"+n:s+" taskText taskText"+r+" "+c+" width-"+n}),"sandbox"===(0,c.getConfig2)().securityLevel){let t=(0,g.select)("#i"+i).nodes()[0].contentDocument;m.filter(function(t){return f.has(t.id)}).each(function(e){var n=t.querySelector("#"+CSS.escape(i+"-"+e.id)),s=t.querySelector("#"+CSS.escape(i+"-"+e.id+"-text"));let r=n.parentNode;var a=t.createElement("a");a.setAttribute("xlink:href",f.get(e.id)),a.setAttribute("target","_top"),r.appendChild(a),a.appendChild(n),a.appendChild(s)})}}function S(e,n,r,a,c,d,u,m){let f,y;if(0===u.length&&0===m.length)return;for(let{startTime:t,endTime:e}of d)(void 0===f||t<f)&&(f=t),(void 0===y||e>y)&&(y=e);if(!f||!y)return;if((t(h))(y).diff((t(h))(f),"year")>5)return void l.log.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");let k=s.db.getDateFormat(),g=[],p=null,_=(t(h))(f);for(;_.valueOf()<=y;)s.db.isInvalidDate(_,k,u,m)?p?p.end=_:p={start:_,end:_}:p&&(g.push(p),p=null),_=_.add(1,"d");v.append("g").selectAll("rect").data(g).enter().append("rect").attr("id",t=>i+"-exclude-"+t.start.format("YYYY-MM-DD")).attr("x",t=>b(t.start.startOf("day"))+r).attr("y",o.gridLineStartPadding).attr("width",t=>b(t.end.endOf("day"))-b(t.start.startOf("day"))).attr("height",c-n-o.gridLineStartPadding).attr("transform-origin",function(t,i){return(b(t.start)+r+.5*(b(t.end)-b(t.start))).toString()+"px "+(i*e+.5*c).toString()+"px"}).attr("class","exclude-range")}function C(e,i,n,s){if(n<=0||e>i)return 1/0;let r=(t(h)).duration({[s??"day"]:n}).asMilliseconds();return r<=0?1/0:Math.ceil((i-e)/r)}function M(t,e,i,n){let r,a=s.db.getDateFormat(),c=s.db.getAxisFormat();r=c||("D"===a?"%d":o.axisFormat??"%Y-%m-%d");let d=(0,g.axisBottom)(b).tickSize(-n+e+o.gridLineStartPadding).tickFormat((0,g.timeFormat)(r)),u=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(s.db.getTickInterval()||o.tickInterval);if(null!==u){let t=parseInt(u[1],10);if(isNaN(t)||t<=0)l.log.warn(`Invalid tick interval value: "${u[1]}". Skipping custom tick interval.`);else{let e=u[2],i=s.db.getWeekday()||o.weekday,n=b.domain(),r=C(n[0],n[1],t,e);if(r>1e4)l.log.warn(`The tick interval "${t}${e}" would generate ${r} ticks, which exceeds the maximum allowed (10000). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(e){case"millisecond":d.ticks(g.timeMillisecond.every(t));break;case"second":d.ticks(g.timeSecond.every(t));break;case"minute":d.ticks(g.timeMinute.every(t));break;case"hour":d.ticks(g.timeHour.every(t));break;case"day":d.ticks(g.timeDay.every(t));break;case"week":d.ticks(tP[i].every(t));break;case"month":d.ticks(g.timeMonth.every(t))}}}if(v.append("g").attr("class","grid").attr("transform","translate("+t+", "+(n-50)+")").call(d).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),s.db.topAxisEnabled()||o.topAxis){let i=(0,g.axisTop)(b).tickSize(-n+e+o.gridLineStartPadding).tickFormat((0,g.timeFormat)(r));if(null!==u){let t=parseInt(u[1],10);if(isNaN(t)||t<=0)l.log.warn(`Invalid tick interval value: "${u[1]}". Skipping custom tick interval.`);else{let e=u[2],n=s.db.getWeekday()||o.weekday,r=b.domain();if(1e4>=C(r[0],r[1],t,e))switch(e){case"millisecond":i.ticks(g.timeMillisecond.every(t));break;case"second":i.ticks(g.timeSecond.every(t));break;case"minute":i.ticks(g.timeMinute.every(t));break;case"hour":i.ticks(g.timeHour.every(t));break;case"day":i.ticks(g.timeDay.every(t));break;case"week":i.ticks(tP[n].every(t));break;case"month":i.ticks(g.timeMonth.every(t))}}}v.append("g").attr("class","grid").attr("transform","translate("+t+", "+e+")").call(i).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function E(t,e){let i=0,n=Object.keys(T).map(t=>[t,T[t]]);v.append("g").selectAll("text").data(n).enter().append(function(t){let e=t[0].split(c.common_default.lineBreakRegex),i=-(e.length-1)/2,n=f.createElementNS("http://www.w3.org/2000/svg","text");for(let[t,s]of(n.setAttribute("dy",i+"em"),e.entries())){let e=f.createElementNS("http://www.w3.org/2000/svg","tspan");e.setAttribute("alignment-baseline","central"),e.setAttribute("x","10"),t>0&&e.setAttribute("dy","1em"),e.textContent=s,n.appendChild(e)}return n}).attr("x",10).attr("y",function(s,r){if(!(r>0))return s[1]*t/2+e;for(let a=0;a<r;a++)return i+=n[r-1][1],s[1]*t/2+i*t+e}).attr("font-size",o.sectionFontSize).attr("class",function(t){for(let[e,i]of _.entries())if(t[0]===i)return"sectionTitle sectionTitle"+e%o.numberSectionStyles;return"sectionTitle"})}function Y(t,e,i,n){let r=s.db.getTodayMarker();if("off"===r)return;let a=v.append("g").attr("class","today"),c=new Date,l=a.append("line");l.attr("x1",b(c)+t).attr("x2",b(c)+t).attr("y1",o.titleTopMargin).attr("y2",n-o.titleTopMargin).attr("class","today"),""!==r&&l.attr("style",r.replace(/,/g,";"))}function O(t){let e={},i=[];for(let n=0,s=t.length;n<s;++n)Object.prototype.hasOwnProperty.call(e,t[n])||(e[t[n]]=!0,i.push(t[n]));return i}(0,d.__name)($,"taskCompare"),k.sort($),w(k,a,x),(0,c.configureSvgSize)(v,x,a,o.useMaxWidth),v.append("text").text(s.db.getDiagramTitle()).attr("x",a/2).attr("y",o.titleTopMargin).attr("class","titleText"),(0,d.__name)(w,"makeGantt"),(0,d.__name)(D,"drawRects"),(0,d.__name)(S,"drawExcludeDays"),(0,d.__name)(C,"getEstimatedTickCount"),(0,d.__name)(M,"makeGrid"),(0,d.__name)(E,"vertLabels"),(0,d.__name)(Y,"drawToday"),(0,d.__name)(O,"checkUnique")},"draw")},styles:(0,d.__name)(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar \u2014 same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles")}}),i("7JqFu",function(t,e){t.exports,t.exports=function(t,e,i){var n=function(t){return t.add(4-t.isoWeekday(),"day")},s=e.prototype;s.isoWeekYear=function(){return n(this).year()},s.isoWeek=function(t){if(!this.$utils().u(t))return this.add(7*(t-this.isoWeek()),"day");var e,s,r,a=n(this),o=(e=this.isoWeekYear(),r=4-(s=(this.$u?i.utc:i)().year(e).startOf("year")).isoWeekday(),s.isoWeekday()>4&&(r+=7),s.add(r,"day"));return a.diff(o,"week")+1},s.isoWeekday=function(t){return this.$utils().u(t)?this.day()||7:this.day(this.day()%7?t:t-7)};var r=s.startOf;s.startOf=function(t,e){var i=this.$utils(),n=!!i.u(e)||e;return"isoweek"===i.p(t)?n?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):r.bind(this)(t,e)}}}),i("5jViC",function(t,e){var i,n,s,r,a,o,c,l,d,u,h,m,f;t.exports,i={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,s=/\d/,r=/\d\d/,a=/\d\d?/,o=/\d*[^-_:/,()\s\d]+/,c={},l=function(t){return(t*=1)+(t>68?1900:2e3)},d=function(t){return function(e){this[t]=+e}},u=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t||"Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),i=60*e[1]+(+e[2]||0);return 0===i?0:"+"===e[0]?-i:i}(t)}],h=function(t){var e=c[t];return e&&(e.indexOf?e:e.s.concat(e.f))},m=function(t,e){var i,n=c.meridiem;if(n){for(var s=1;s<=24;s+=1)if(t.indexOf(n(s,0,e))>-1){i=s>12;break}}else i=t===(e?"pm":"PM");return i},f={A:[o,function(t){this.afternoon=m(t,!1)}],a:[o,function(t){this.afternoon=m(t,!0)}],Q:[s,function(t){this.month=3*(t-1)+1}],S:[s,function(t){this.milliseconds=100*t}],SS:[r,function(t){this.milliseconds=10*t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[a,d("seconds")],ss:[a,d("seconds")],m:[a,d("minutes")],mm:[a,d("minutes")],H:[a,d("hours")],h:[a,d("hours")],HH:[a,d("hours")],hh:[a,d("hours")],D:[a,d("day")],DD:[r,d("day")],Do:[o,function(t){var e=c.ordinal,i=t.match(/\d+/);if(this.day=i[0],e)for(var n=1;n<=31;n+=1)e(n).replace(/\[|\]/g,"")===t&&(this.day=n)}],w:[a,d("week")],ww:[r,d("week")],M:[a,d("month")],MM:[r,d("month")],MMM:[o,function(t){var e=h("months"),i=(h("monthsShort")||e.map(function(t){return t.slice(0,3)})).indexOf(t)+1;if(i<1)throw Error();this.month=i%12||i}],MMMM:[o,function(t){var e=h("months").indexOf(t)+1;if(e<1)throw Error();this.month=e%12||e}],Y:[/[+-]?\d+/,d("year")],YY:[r,function(t){this.year=l(t)}],YYYY:[/\d{4}/,d("year")],Z:u,ZZ:u},t.exports=function(t,e,s){s.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(l=t.parseTwoDigitYear);var r=e.prototype,a=r.parse;r.parse=function(t){var e=t.date,r=t.utc,o=t.args;this.$u=r;var l=o[1];if("string"==typeof l){var d=!0===o[2],u=!0===o[3],h=o[2];u&&(h=o[2]),c=this.$locale(),!d&&h&&(c=s.Ls[h]),this.$d=function(t,e,s,r){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var a=(function(t){var e,s;e=t,s=c&&c.formats;for(var r=(t=e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,e,n){var r=n&&n.toUpperCase();return e||s[n]||i[n]||s[r].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,e,i){return e||i.slice(1)})})).match(n),a=r.length,o=0;o<a;o+=1){var l=r[o],d=f[l],u=d&&d[0],h=d&&d[1];r[o]=h?{regex:u,parser:h}:l.replace(/^\[|\]$/g,"")}return function(t){for(var e={},i=0,n=0;i<a;i+=1){var s=r[i];if("string"==typeof s)n+=s.length;else{var o=s.regex,c=s.parser,l=t.slice(n),d=o.exec(l)[0];c.call(e,d),t=t.replace(d,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var i=t.hours;e?i<12&&(t.hours+=12):12===i&&(t.hours=0),delete t.afternoon}}(e),e}})(e)(t),o=a.year,l=a.month,d=a.day,u=a.hours,h=a.minutes,m=a.seconds,y=a.milliseconds,k=a.zone,g=a.week,p=new Date,_=d||(o||l?1:p.getDate()),T=o||p.getFullYear(),x=0;o&&!l||(x=l>0?l-1:p.getMonth());var v,b=u||0,$=h||0,w=m||0,D=y||0;return k?new Date(Date.UTC(T,x,_,b,$,w,D+60*k.offset*1e3)):s?new Date(Date.UTC(T,x,_,b,$,w,D)):(v=new Date(T,x,_,b,$,w,D),g&&(v=r(v).week(g).toDate()),v)}catch(t){return new Date("")}}(e,l,r,s),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),(d||u)&&e!=this.format(l)&&(this.$d=new Date("")),c={}}else if(l instanceof Array)for(var m=l.length,y=1;y<=m;y+=1){o[1]=l[y-1];var k=s.apply(this,o);if(k.isValid()){this.$d=k.$d,this.$L=k.$L,this.init();break}y===m&&(this.$d=new Date(""))}else a.call(this,t)}}}),i("6KBk3",function(t,e){t.exports,t.exports=function(t,e){var i=e.prototype,n=i.format;i.format=function(t){var e=this,i=this.$locale();if(!this.isValid())return n.bind(this)(t);var s=this.$utils(),r=(t||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(t){switch(t){case"Q":return Math.ceil((e.$M+1)/3);case"Do":return i.ordinal(e.$D);case"gggg":return e.weekYear();case"GGGG":return e.isoWeekYear();case"wo":return i.ordinal(e.week(),"W");case"w":case"ww":return s.s(e.week(),"w"===t?1:2,"0");case"W":case"WW":return s.s(e.isoWeek(),"W"===t?1:2,"0");case"k":case"kk":return s.s(String(0===e.$H?24:e.$H),"k"===t?1:2,"0");case"X":return Math.floor(e.$d.getTime()/1e3);case"x":return e.$d.getTime();case"z":return"["+e.offsetName()+"]";case"zzz":return"["+e.offsetName("long")+"]";default:return t}});return n.bind(this)(r)}}}),i("55KVi",function(t,e){var i,n,s,r,a,o,c,l,d,u,h,m,f;t.exports,s=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,r=/\[([^\]]+)]|YYYY|YY|Y|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g,a={years:31536e6,months:2628e6,days:864e5,hours:36e5,minutes:6e4,seconds:1e3,milliseconds:1,weeks:6048e5},o=function(t){return t instanceof m},c=function(t,e,i){return new m(t,i,e.$l)},l=function(t){return n.p(t)+"s"},d=function(t){return t<0},u=function(t){return d(t)?Math.ceil(t):Math.floor(t)},h=function(t,e){return t?d(t)?{negative:!0,format:""+Math.abs(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},m=function(){function t(t,e,i){var n=this;if(this.$d={},this.$l=i,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return c(t*a[l(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach(function(e){n.$d[l(e)]=t[e]}),this.calMilliseconds(),this;if("string"==typeof t){var r=t.match(s);if(r){var o=r.slice(2).map(function(t){return null!=t?Number(t):0});return this.$d.years=o[0],this.$d.months=o[1],this.$d.weeks=o[2],this.$d.days=o[3],this.$d.hours=o[4],this.$d.minutes=o[5],this.$d.seconds=o[6],this.calMilliseconds(),this}}return this}var e=t.prototype;return e.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce(function(e,i){return e+(t.$d[i]||0)*a[i]},0)},e.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=u(t/31536e6),t%=31536e6,this.$d.months=u(t/2628e6),t%=2628e6,this.$d.days=u(t/864e5),t%=864e5,this.$d.hours=u(t/36e5),t%=36e5,this.$d.minutes=u(t/6e4),t%=6e4,this.$d.seconds=u(t/1e3),t%=1e3,this.$d.milliseconds=t},e.toISOString=function(){var t=h(this.$d.years,"Y"),e=h(this.$d.months,"M"),i=+this.$d.days||0;this.$d.weeks&&(i+=7*this.$d.weeks);var n=h(i,"D"),s=h(this.$d.hours,"H"),r=h(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var o=h(a,"S"),c=t.negative||e.negative||n.negative||s.negative||r.negative||o.negative,l=s.format||r.format||o.format?"T":"",d=(c?"-":"")+"P"+t.format+e.format+n.format+l+s.format+r.format+o.format;return"P"===d||"-P"===d?"P0D":d},e.toJSON=function(){return this.toISOString()},e.format=function(t){var e={Y:this.$d.years,YY:n.s(this.$d.years,2,"0"),YYYY:n.s(this.$d.years,4,"0"),M:this.$d.months,MM:n.s(this.$d.months,2,"0"),D:this.$d.days,DD:n.s(this.$d.days,2,"0"),H:this.$d.hours,HH:n.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:n.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:n.s(this.$d.seconds,2,"0"),SSS:n.s(this.$d.milliseconds,3,"0")};return(t||"YYYY-MM-DDTHH:mm:ss").replace(r,function(t,i){return i||String(e[t])})},e.as=function(t){return this.$ms/a[l(t)]},e.get=function(t){var e=this.$ms,i=l(t);return"milliseconds"===i?e%=1e3:e="weeks"===i?u(e/a[i]):this.$d[i],e||0},e.add=function(t,e,i){var n;return n=e?t*a[l(e)]:o(t)?t.$ms:c(t,this).$ms,c(this.$ms+n*(i?-1:1),this)},e.subtract=function(t,e){return this.add(t,e,!0)},e.locale=function(t){var e=this.clone();return e.$l=t,e},e.clone=function(){return c(this.$ms,this)},e.humanize=function(t){return i().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},e.valueOf=function(){return this.asMilliseconds()},e.milliseconds=function(){return this.get("milliseconds")},e.asMilliseconds=function(){return this.as("milliseconds")},e.seconds=function(){return this.get("seconds")},e.asSeconds=function(){return this.as("seconds")},e.minutes=function(){return this.get("minutes")},e.asMinutes=function(){return this.as("minutes")},e.hours=function(){return this.get("hours")},e.asHours=function(){return this.as("hours")},e.days=function(){return this.get("days")},e.asDays=function(){return this.as("days")},e.weeks=function(){return this.get("weeks")},e.asWeeks=function(){return this.as("weeks")},e.months=function(){return this.get("months")},e.asMonths=function(){return this.as("months")},e.years=function(){return this.get("years")},e.asYears=function(){return this.as("years")},t}(),f=function(t,e,i){return t.add(e.years()*i,"y").add(e.months()*i,"M").add(e.days()*i,"d").add(e.hours()*i,"h").add(e.minutes()*i,"m").add(e.seconds()*i,"s").add(e.milliseconds()*i,"ms")},t.exports=function(t,e,s){i=s,n=s().$utils(),s.duration=function(t,e){return c(t,{$l:s.locale()},e)},s.isDuration=o;var r=e.prototype.add,a=e.prototype.subtract;e.prototype.add=function(t,e){return o(t)?f(this,t,1):r.bind(this)(t,e)},e.prototype.subtract=function(t,e){return o(t)?f(this,t,-1):a.bind(this)(t,e)}}});
//# sourceMappingURL=ganttDiagram-EL5Y4UJY.5f064a48.js.map
