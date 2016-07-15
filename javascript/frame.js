
// $            ---获取ID...
//getByClass    ---获取class标签函数
//getSetStyle   ---获取,修改样式
//getPosClient  ---获取到窗口的距离

//move          ---高级运动框架			
//ajax          ---ajax框架						
//jsonp         ---jsonp框架        		

//addEvent  	---绑定事件函数
//removeEvent   ---解绑事件函数
//addMouseWheel ---滚轮事件函数
//ready         ---加载事件函数

//setCookie     ---设置缓存			
//getCookie		---获取缓存			
//removeCookie	---删除缓存			

//hashJson		---hash转json		
//jsonHash		---json转hash	

//toggleClass   ---切换class
//hasClass   	---判断class
//addClass   	---添加class
//removeClass   ---删除class	

//rnd     ---随机数  -543
//setC3Style

	"use strict";

//获取ID...
function $(id){
	return document.getElementById(id);
}

//获取class标签函数
function getByClass(oParent,sClass){

	if(oParent.getElementsByClass)
	{
		return oParent.getElementsByClass(sClass);
	}

	var aEle = oParent.getElementsByTagName("*");
	var result=[];

	for(var i=0 ;i<aEle.length;i++){
	var tmpArr = aEle[i].className.split(/\s+/g);
		for(var j=0;j<tmpArr.length;j++){
			if(tmpArr[j] == sClass){
				result.push(aEle[i]);
				break;
			}
		}
	}	
	return result;
};

//获取,修改样式
function getSetStyle(){
	if(arguments.length == 2 ){	
		if(typeof arguments[1] == "string"){
			var obj = arguments[0];
			var name = arguments[1];
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}else{
				return getComputedStyle(obj,false)[name];
			}
		}
		else if(typeof arguments[1] == "object"){	
			var obj = arguments[0];
			var json = arguments[1];
			for (var key in json) {
				obj.style[key] = json[key];	
			}		
		}
	}
	else if(arguments.length == 3 ){
		var obj = arguments[0];
		var style = arguments[1];
		var value = arguments[2];
		obj.style[style] = value;
	}
}

//获取到窗口的距离;
function getPosClient(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;			
		t+=obj.offsetTop;
		obj=obj.offsetParent;		
	}
	return {left:l,top:t};
}

//高级运动框架(对象,{属性},{时间,函数,类型})
var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {//弹性
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {//碰撞
		easeIn: function(t,b,c,d){
			return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};
function move(obj,json,optional){
	
	optional=optional||{};
	optional.duration=optional.duration||500;
	optional.complete=optional.complete||null;
	optional.easing=optional.easing||Tween.Quad.easeInOut;
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getSetStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(optional.duration/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		
		n++;
		
		for(var key in json){
			//var cur=start[key]+n*dis[key]/count;
			var cur=optional.easing(n/count*optional.duration,start[key],dis[key],optional.duration);
		
		
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}
		}
		
		
		if(n==count){
			clearInterval(obj.timer);
			optional.complete && optional.complete();
		}
		
	},30);	
}

//ajax框架 ---> url data  success error timeout type 
function ajax(options){
	
	//-1.	整理options
	options	=	options || {};
	if(!options.url) return;
	options.data = options.data || {};
	options.type = options.type || 'get';
	options.timeout = options.timeout || 0;
	
	//0.整理data
	options.data.t=Math.random();  //根据实际情况改变--->更新速度;
	
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	var str = arr.join('&');
	
	//1.创建ajax
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if(options.type=='get'){//根据type建立连接，发送请求
		//2.
		oAjax.open('get',options.url+'?'+str,true);
		//3.
		oAjax.send();	
	}else{
		//2.
		oAjax.open('post',options.url,true);
		//设置请求头信息
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		//3.
		oAjax.send(str);	
	}
	
	
	//4.接收
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				
				options.success && options.success(oAjax.responseText);
			}else{
				options.error && options.error(oAjax.status);	
			}
		}
	};
	
	//5.超时
	if(options.timeout){
		var timer=setTimeout(function(){
			alert('超时了');
			oAjax.abort();//中断ajax请求
		},options.timeout);
	}	
}

//jsonp框架 ---> url data success error timeout cbKey                 
function jsonp(options){
	//整理options
	options	=	options	||	{};
	if(!options.url) return;
	if(!options.data) return;
	options.cbKey=	options.cbKey || 'cb';
	options.timeout=options.timeout ||	0;
	options.success=options.success ||	null;
	options.error=options.error ||	null;
	
	//整理data 
	var cbValue =  'jsonp'+Math.random(); 
	options.data[options.cbKey]=cbValue.replace('.','');//告诉网上的js回调随机函数名
	
	window[options.data[options.cbKey]]=function(json){
		options.success && options.success(json);
		clearTimeout(timer);
		//删除script标签
		document.getElementsByTagName('head')[0].removeChild(oSc);
		window[options.data[options.cbKey]]=null;//删除用过的函数
	};	
	
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	options.url = options.url +'?' +arr.join('&');
	//创建script标签，丢到head里面
	var oSc=document.createElement('script');
	oSc.src=options.url;
	document.getElementsByTagName('head')[0].appendChild(oSc);
	
	//超时
	if(options.timeout){
		var timer=setTimeout(function(){
			options.error && options.error();
			//阻止请求 
			window[options.data[options.cbKey]]=function(){};//给个空函数什么都不做
			document.getElementsByTagName('head')[0].removeChild(oSc);
		},options.timeout);
	}
}

//绑定事件函数;
function addEvent(obj,sEvt,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEvt,fn,false);
	}else{
		obj.attachEvent("on"+sEvt,fn);		 
	}
}

//解绑事件函数;
function removeEvent(obj,sEvt,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEvt,fn,false);
	}else{
		obj.detachEvent("on"+sEvt,fn);
	}
}

//滚轮事件函数;
function addMouseWheel(obj,fn){
	var firefox=window.navigator.userAgent.toLowerCase().indexOf('firefox');
	if(firefox!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);	
	}else{
		obj.onmousewheel=fnWheel;			
	}
	function fnWheel(ev){
		var oEvt=ev||event;
		var down=false;
		if(oEvt.wheelDelta){
			down = oEvt.wheelDelta<0?true:false;
		}else if(oEvt.detail){
			down = oEvt.detail>0?true:false;
		}
		fn(down);
		if(oEvt.preventDefault){
			oEvt.preventDefault();
		}
		return false;
	}
}

//加载事件函数;
function ready(fn){
	if(document.addEventListener)    //高级浏览器
	{
		document.addEventListener("DOMContentLoaded",function(){
			fn && fn();
		},false);
	}
	else                             //IE低版本
	{
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState == "complete"){
				fn && fn();
			}
		});
	}
}

//设置缓存
function setCookie(name,value,timeout){
	var d=new Date();
	d.setDate(d.getDate()+timeout);
	document.cookie=name+'='+value+';expires='+d;
}

//获取缓存
function getCookie(name){
	//user=alex; address=外滩18号; user2=ritian
	 var arr=document.cookie.split('; ');
	 for(var i=0;i<arr.length;i++){
		//arr[i]	==	 'user=alex'
		var arr2 = arr[i].split('=');//['user','alex']
		if(arr2[0]==name){
			return arr2[1];	
		}
	 }
	 return '';
}

//删除缓存
function removeCookie(name){
	//引用
	setCookie(name,'',-1);
}

//hash转json
function hashJson(hash){
	hash = hash.substring(1);	
	var arr= hash.split('&');
	var json={};
	for(var i=0;i<arr.length;i++){
		var arr2=arr[i].split('=');	
		json[arr2[0]]=arr2[1];
	}
	return json;
}

//json转hash	
function jsonHash(json){
	var arr=[];
	for(var key in json){
		arr.push(key+'='+json[key]);	
	}
	window.location.hash='#'+arr.join('&');
}

//切换class
function toggleClass(oParent,sClass){
	if( hasClass(oParent,sClass) ){
		removeClass(oParent,sClass)
	}else{
		addClass(oParent,sClass)
	}
}

//判断class
function hasClass(oParent,sClass){
	var re = new RegExp("\\b"+sClass+"\\b");
	return re.test(oParent.className);
}

//添加class
function addClass(oParent,sClass){
	var re = new RegExp("\\b"+sClass+"\\b");
	if(!re.test(oParent.className)){				//要添加的class是否存在
		oParent.className = oParent.className+" "+"box";
	}
	oParent.className = oParent.className.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
}

//删除class
function removeClass(oParent,sClass){
	var re = new RegExp("\\b"+sClass+"\\b");      		//规则
	if(re.test(oParent.className)){
		oParent.className = oParent.className.replace(re,"");  	//删除sClass
		if(!oParent.className){
			oParent.removeAttribute("class");				//删除一个属性名class
		}
	}
	if(oParent.className){									//整理空格
		oParent.className = oParent.className.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
	}
}

function rnd(n,m){
	return Math.random()*(m-n)+n;
}

//setC3Style
function setC3Style(obj,sName,sValue){
	var str = sName.charAt(0).toUpperCase()+sName.substring(1);
	obj.style['Webkit'+str] = sValue;
	obj.style['Moz'+str] = sValue;
	obj.style['ms'+str] = sValue;
	obj.style['O'+str] = sValue;
	obj.style[sName] = sValue;
}