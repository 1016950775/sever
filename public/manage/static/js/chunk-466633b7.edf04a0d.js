(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-466633b7"],{"321e":function(t,i,h){},3826:function(t,i,h){var s;
/*!
 * sChart JavaScript Library v2.0.1
 * http://blog.gdfengshuo.com/example/sChart/ | Released under the MIT license
 * Date: 2018-04-16T18:59Z
 */
/*!
 * sChart JavaScript Library v2.0.1
 * http://blog.gdfengshuo.com/example/sChart/ | Released under the MIT license
 * Date: 2018-04-16T18:59Z
 */
(function(e,a){s=function(){return a(e)}.call(i,h,i,t),void 0===s||(t.exports=s)})(this,function(t){"use strict";function i(t,i,h,s){this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.dpi=window.devicePixelRatio||1,this.type=i,this.data=h,this.dataLength=this.data.length,this.showValue=!0,this.autoWidth=!1,this.width=this.canvas.width*this.dpi,this.height=this.canvas.height*this.dpi,this.topPadding=50*this.dpi,this.leftPadding=50*this.dpi,this.rightPadding=0*this.dpi,this.bottomPadding=50*this.dpi,this.yEqual=5,this.yLength=0,this.xLength=0,this.yFictitious=0,this.yRatio=0,this.bgColor="#ffffff",this.fillColor="#1E9FFF",this.axisColor="#666666",this.contentColor="#eeeeee",this.titleColor="#000000",this.title="",this.titlePosition="top",this.radius=100*this.dpi,this.innerRadius=70*this.dpi,this.colorList=["#1E9FFF","#13CE66","#F7BA2A","#FF4949","#72f6ff","#199475","#e08031","#726dd1"],this.legendColor="#000000",this.legendTop=40*this.dpi,this.totalValue=this.getTotalValue(),this.init(s)}return i.prototype={init:function(t){if(0===this.dataLength)return!1;if(t){var i=["topPadding","leftPadding","rightPadding","bottomPadding","radius","innerRadius","legendTop"];for(var h in t)"colorList"===h&&Array.isArray(t[h])?this[h]=t[h].concat(this[h]):i.indexOf(h)>-1?this[h]=t[h]*this.dpi:this[h]=t[h]}t.autoWidth?(this.width=this.canvas.width=this.canvas.parentNode.offsetWidth*this.dpi,this.height=this.canvas.height=this.canvas.parentNode.offsetHeight*this.dpi,this.canvas.setAttribute("style","width:"+this.canvas.parentNode.offsetWidth+"px;height:"+this.canvas.parentNode.offsetHeight+"px;")):(this.canvas.setAttribute("style","width:"+this.canvas.width+"px;height:"+this.canvas.height+"px;"),this.canvas.width*=this.dpi,this.canvas.height*=this.dpi),"bar"===this.type||"line"===this.type?(this.yLength=Math.floor((this.height-this.topPadding-this.bottomPadding-10)/this.yEqual),this.xLength=Math.floor((this.width-this.leftPadding-this.rightPadding-10)/this.dataLength),this.yFictitious=this.getYFictitious(this.data),this.yRatio=this.yLength/this.yFictitious,this.drawBarUpdate()):this.drawPieUpdate()},drawBarUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawAxis(),this.drawPoint(),this.drawTitle(),this.drawBarChart()},drawPieUpdate:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.width,this.height),this.drawLegend(),this.drawTitle(),this.drawPieChart()},drawBarChart:function(){this.ctx.fillStyle=this.fillColor,this.ctx.strokeStyle=this.fillColor;for(var t=0;t<this.dataLength;t++)this.data[t].left=this.leftPadding+this.xLength*(t+.25),this.data[t].top=this.height-this.bottomPadding-this.data[t].value*this.yRatio,this.data[t].right=this.leftPadding+this.xLength*(t+.75),this.data[t].bottom=this.height-this.bottomPadding,"line"===this.type?(this.ctx.beginPath(),this.ctx.arc(this.data[t].left+this.xLength/4,this.data[t].top,2,0,2*Math.PI,!0),this.ctx.fill(),0!==t&&(this.ctx.moveTo(this.data[t].left+this.xLength/4,this.data[t].top),this.ctx.lineTo(this.data[t-1].left+this.xLength/4,this.data[t-1].top)),this.ctx.stroke()):"bar"===this.type&&this.ctx.fillRect(this.data[t].left,this.data[t].top,this.data[t].right-this.data[t].left,this.data[t].bottom-this.data[t].top),this.showValue&&(this.ctx.font=12*this.dpi+"px Arial",this.ctx.fillText(this.data[t].value,this.data[t].left+this.xLength/4,this.data[t].top-5))},drawPieChart:function(){for(var t=this.width/2,i=this.height/2,h=0,s=0,e=0;e<this.dataLength;e++)this.ctx.beginPath(),this.ctx.fillStyle=this.colorList[e],this.ctx.moveTo(t,i),this.data[e].start=0===e?-Math.PI/2:this.data[e-1].end,this.data[e].end=this.data[e].start+this.data[e].value/this.totalValue*2*Math.PI,this.ctx.arc(t,i,this.radius,this.data[e].start,this.data[e].end),this.ctx.closePath(),this.ctx.fill(),this.data[e].middle=(this.data[e].start+this.data[e].end)/2,h=Math.ceil(Math.abs(this.radius*Math.cos(this.data[e].middle))),s=Math.floor(Math.abs(this.radius*Math.sin(this.data[e].middle))),this.ctx.strokeStyle=this.colorList[e],this.showValue&&(this.data[e].middle<=0?(this.ctx.textAlign="left",this.ctx.moveTo(t+h,i-s),this.ctx.lineTo(t+h+10,i-s-10),this.ctx.moveTo(t+h+10,i-s-10),this.ctx.lineTo(t+h+this.radius/2,i-s-10),this.ctx.stroke(),this.ctx.fillText(this.data[e].value,t+h+5+this.radius/2,i-s-5)):this.data[e].middle>0&&this.data[e].middle<=Math.PI/2?(this.ctx.textAlign="left",this.ctx.moveTo(t+h,i+s),this.ctx.lineTo(t+h+10,i+s+10),this.ctx.moveTo(t+h+10,i+s+10),this.ctx.lineTo(t+h+this.radius/2,i+s+10),this.ctx.stroke(),this.ctx.fillText(this.data[e].value,t+h+5+this.radius/2,i+s+15)):this.data[e].middle>Math.PI/2&&this.data[e].middle<Math.PI?(this.ctx.textAlign="right",this.ctx.moveTo(t-h,i+s),this.ctx.lineTo(t-h-10,i+s+10),this.ctx.moveTo(t-h-10,i+s+10),this.ctx.lineTo(t-h-this.radius/2,i+s+10),this.ctx.stroke(),this.ctx.fillText(this.data[e].value,t-h-5-this.radius/2,i+s+15)):(this.ctx.textAlign="right",this.ctx.moveTo(t-h,i-s),this.ctx.lineTo(t-h-10,i-s-10),this.ctx.moveTo(t-h-10,i-s-10),this.ctx.lineTo(t-h-this.radius/2,i-s-10),this.ctx.stroke(),this.ctx.fillText(this.data[e].value,t-h-5-this.radius/2,i-s-5)));"ring"===this.type&&(this.ctx.beginPath(),this.ctx.fillStyle=this.bgColor,this.ctx.arc(t,i,this.innerRadius,0,2*Math.PI),this.ctx.fill())},drawAxis:function(){this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding+.5,this.topPadding+.5),this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.width-this.rightPadding-.5,this.height-this.bottomPadding+.5),this.ctx.stroke()},drawPoint:function(){this.ctx.beginPath(),this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="center",this.ctx.fillStyle=this.axisColor;for(var t=0;t<this.dataLength;t++){var i=this.data[t].name,h=this.xLength*(t+1);this.ctx.moveTo(this.leftPadding+h+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding+h+.5,this.height-this.bottomPadding+5.5),this.ctx.fillText(i,this.leftPadding+h-this.xLength/2,this.height-this.bottomPadding+15*this.dpi)}this.ctx.stroke(),this.ctx.beginPath(),this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="right",this.ctx.fillStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding+.5),this.ctx.lineTo(this.leftPadding-4.5,this.height-this.bottomPadding+.5),this.ctx.fillText(0,this.leftPadding-10,this.height-this.bottomPadding+5);for(t=0;t<this.yEqual;t++){var s=this.yFictitious*(t+1),e=this.yLength*(t+1);this.ctx.beginPath(),this.ctx.strokeStyle=this.axisColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding-e+.5),this.ctx.lineTo(this.leftPadding-4.5,this.height-this.bottomPadding-e+.5),this.ctx.stroke(),this.ctx.fillText(s,this.leftPadding-10,this.height-this.bottomPadding-e+5),this.ctx.beginPath(),this.ctx.strokeStyle=this.contentColor,this.ctx.moveTo(this.leftPadding+.5,this.height-this.bottomPadding-e+.5),this.ctx.lineTo(this.width-this.rightPadding-.5,this.height-this.bottomPadding-e+.5),this.ctx.stroke()}},drawTitle:function(){this.title&&(this.ctx.beginPath(),this.ctx.textAlign="center",this.ctx.fillStyle=this.titleColor,this.ctx.font=16*this.dpi+"px Microsoft YaHei","bottom"===this.titlePosition&&this.bottomPadding>=40?this.ctx.fillText(this.title,this.width/2,this.height-5):this.ctx.fillText(this.title,this.width/2,this.topPadding/2+5))},drawLegend:function(){for(var t=0;t<this.dataLength;t++)this.ctx.fillStyle=this.colorList[t],this.ctx.fillRect(10,this.legendTop+15*t*this.dpi,20,11),this.ctx.fillStyle=this.legendColor,this.ctx.font=12*this.dpi+"px Microsoft YaHei",this.ctx.textAlign="left",this.ctx.fillText(this.data[t].name,35,this.legendTop+10+15*t*this.dpi)},getYFictitious:function(t){var i=t.slice(0);i.sort(function(t,i){return-(t.value-i.value)});var h=Math.ceil(i[0].value/this.yEqual),s=h.toString().length-1;return s=s>2?2:s,Math.ceil(h/Math.pow(10,s))*Math.pow(10,s)},getTotalValue:function(){for(var t=0,i=0;i<this.dataLength;i++)t+=this.data[i].value;return t}},i})},7105:function(t,i,h){"use strict";var s=h("321e"),e=h.n(s);e.a},"7ed4":function(t,i,h){"use strict";var s=h("6e6d"),e=new s["default"];i["a"]=e},a07d:function(t,i,h){"use strict";var s=function(){var t=this,i=t.$createElement,h=t._self._c||i;return h("div",[h("canvas",{attrs:{id:t.canvasId}})])},e=[],a=h("3826"),o=h.n(a),n={data:function(){return{schart:null,opt:{}}},props:{canvasId:{type:String,default:""},type:{type:String,default:"bar"},data:{type:Array,default:[]},options:{type:Object,required:!1}},mounted:function(){this.renderChart()},methods:{renderChart:function(){this.schart=null,this.opt=this.options,this.width&&this.height||(this.opt?this.opt["autoWidth"]=!0:this.opt={autoWidth:!0}),this.schart=new o.a(this.canvasId,this.type,this.data,this.opt)}},watch:{data:function(){this.renderChart()},options:function(){this.renderChart()},type:function(){this.renderChart()}}},d=n,l=h("17cc"),r=Object(l["a"])(d,s,e,!1,null,null,null);i["a"]=r.exports},e2ad:function(t,i,h){"use strict";h.r(i);var s=function(){var t=this,i=t.$createElement,h=t._self._c||i;return h("div")},e=[],a=(h("f763"),h("7364"),h("a07d")),o=h("7ed4"),n={name:"dashboard",data:function(){return{name:localStorage.getItem("ms_username"),todoList:[{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要写100行代码加几个bug吧",status:!1},{title:"今天要修复100个bug",status:!1},{title:"今天要修复100个bug",status:!0},{title:"今天要写100行代码加几个bug吧",status:!0}],data:[{name:"2018/09/04",value:1083},{name:"2018/09/05",value:941},{name:"2018/09/06",value:1139},{name:"2018/09/07",value:816},{name:"2018/09/08",value:327},{name:"2018/09/09",value:228},{name:"2018/09/10",value:1065}],options:{title:"最近七天每天的用户访问量",showValue:!1,fillColor:"rgb(45, 140, 240)",bottomPadding:30,topPadding:30},options2:{title:"最近七天用户访问趋势",fillColor:"#FC6FA1",axisColor:"#008ACD",contentColor:"#EEEEEE",bgColor:"#F5F8FD",bottomPadding:30,topPadding:30}}},components:{Schart:a["a"]},computed:{role:function(){return"admin"===this.name?"超级管理员":"普通用户"}},created:function(){this.handleListener(),this.changeDate()},activated:function(){this.handleListener()},deactivated:function(){window.removeEventListener("resize",this.renderChart),o["a"].$off("collapse",this.handleBus)},methods:{changeDate:function(){var t=(new Date).getTime();this.data.forEach(function(i,h){var s=new Date(t-864e5*(6-h));i.name="".concat(s.getFullYear(),"/").concat(s.getMonth()+1,"/").concat(s.getDate())})},handleListener:function(){o["a"].$on("collapse",this.handleBus),window.addEventListener("resize",this.renderChart)},handleBus:function(t){var i=this;setTimeout(function(){i.renderChart()},300)},renderChart:function(){this.$refs.bar.renderChart(),this.$refs.line.renderChart()}}},d=n,l=(h("7105"),h("17cc")),r=Object(l["a"])(d,s,e,!1,null,"3baf2e3e",null);i["default"]=r.exports}}]);