// JavaScript Document
window.onload=function(){
	var oWrap=document.getElementById('wrap');
	var oHtml=document.getElementsByTagName('html')[0];
	var oKt=document.getElementById('kaitou');
	var oC=document.getElementById('cav');
	var oP=oKt.getElementsByTagName('p');
	var oIn=oKt.getElementsByTagName('a')[0];
	var oNext=document.getElementById('next');
	var oSnow=document.getElementById('snow');
	var oNavr=document.getElementById('nav_r');
	var aLi=oNavr.getElementsByTagName('li');
	var oNav=oWrap.children[0].getElementsByClassName('nav')[0];
	var o3D=oWrap.children[1].getElementsByClassName('word3d')[0];
	var aWord=o3D.getElementsByTagName('li');


	
 	var gd=oC.getContext('2d');
	var winW=document.documentElement.clientWidth;
	var winH=document.documentElement.clientHeight;
	oC.width=winW;
	oC.height=winH;
 	//画布绘画 
	oC.onmousedown=function(ev){
		var x=ev.clientX-oC.offsetLeft;
		var y=ev.clientY-oC.offsetLeft+8;
		gd.beginPath();
		gd.moveTo(x,y)
		
		document.onmousemove=function(ev){
			var x=ev.clientX-oC.offsetLeft;
			var y=ev.clientY-oC.offsetLeft+8;
			
			gd.lineTo(x,y);
			gd.strokeStyle='rgba(255, 255, 255, .2)';
			gd.lineWidth='3';

			gd.stroke();
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
		}
		return false;
	}
	
	//消失
	oIn.onclick=function(){
		oKt.style.WebkitTransition='2s all ease';
		oKt.style.MozTransition='2s all ease';
		oKt.style.msTransition='2s all ease';
		oKt.style.OTransition='2s all ease';
		oKt.style.transition='2s all ease';
		oKt.style.WebkitTransform='translateY(-1000px)';
		oKt.style.MozTransform='translateY(-1000px)';
		oKt.style.msTransform='translateY(-1000px)';
		oKt.style.OTransform='translateY(-1000px)';
		oKt.style.transform='perspective(800px) translateY(-1000px)';

		oKt.style.opacity=0;
		

 		function tranEnd(){
			oKt.removeEventListener('transitionend',tranEnd,false);
			oKt.style.display='none';
			
		}
		oKt.addEventListener('transitionend',tranEnd,false);
 		move(oNav,{height:70},{easing:Tween.Elastic.easeOut,duration:3000});
		oWrap.style.display='block';
		oNavr.style.display='block';
	}
 
	
	var oBar=oNavr.children[0].lastElementChild || oNavr.children[0].lastChild;
	var timer=null;
	var nowPos=0;
	var l=0;
	var oTab=document.getElementById('tab');
	var aHead=oTab.children;
	var aPage=oWrap.children;
	var iNow=0;
	var pageReady=true;
	 
    //导航菜单	
	setNav();
	function setNav(){
		for(var i=0;i<aLi.length;i++){
			aLi[i].onmouseover=function(){
				moveNav(oBar,this.offsetLeft);
				
			}
			aLi[i].onmouseout=function(){
				moveNav(oBar,nowPos);
			}
			
			aLi[i].index=i;
			aLi[i].onclick=function(){
				clearInterval(timer);
				iNow=this.index;
				
				pageTab();

		}
		
		function moveNav(obj,iTarget){
			clearInterval(timer);
			var speed=0;
			
			timer=setInterval(function(){
				speed+=(iTarget-obj.offsetLeft)/5;
				speed *= 0.85;	
				l+=speed;
	
				obj.style.left=Math.round(l)+'px';
	
				if(Math.abs(speed)<1) speed=0;
				
				if(obj.offsetLeft==iTarget && speed==0){
					clearInterval(timer);
					//console.log(iTarget,obj.offsetLeft,speed);//没到位	
				}
				
			},30);
		}
	};
	
	//小圆点
	for(var i=0;i<aHead.length;i++){
		(function(index){
			aHead[i].onmouseover=function(){
				iNow=index;
				
				pageTab();
			}
		})(i);
	}
	
	oNext.onclick=function(){
		iNow++;
		pageTab();
	}

	//第一页运动
	page1();
	function page1(){
		var oContent=document.getElementById('content');
		var aCLi=oContent.getElementsByClassName('li');
		for(var i=0;i<aCLi.length;i++){
			//var oSpan=document.createElement('span');
			//var oSpan=aCLi[i].getElementsByTagName('span')[0];
			aCLi[i].onmouseover=function(){
				this.children[3].style.display='block';
				//this.appendChild(oSpan);
			}
			aCLi[i].onmouseout=function(){
				this.children[3].style.display='none';
				//var oS=aCLi[i].
				//this.removeChild(oSpan);
			}
			aCLi[i].onmousemove=function(ev){
				var oEvt=ev||event;
				var disX=oEvt.clientX-this.offsetLeft;
				var disY=oEvt.clientY-this.offsetTop;
				var oSpan=this.children[3];
			    var l=disX-230;
			    var t=disY-230;
				oSpan.style.left=l+'px';
				oSpan.style.top=t+'px';
			}
		}
		
	}
	//第二页运动
 	function page2(){
		var count=0;
		var bOk=false;
		
		function word3D(){
			//move(o3D,{top:170},{easing:Tween.Expo.easeOut});
			for(var i=0;i<aWord.length;i++){
				aWord[i].style.WebkitTransition = '.5s all ease '+(16-i)*100+'ms';
				aWord[i].style.MozTransition = '.5s all ease '+(16-i)*100+'ms';
				aWord[i].style.msTransition = '.5s all ease '+(16-i)*100+'ms';
				aWord[i].style.OTransition = '.5s all ease '+(16-i)*100+'ms';
				aWord[i].style.transition = '.5s all ease '+(16-i)*100+'ms';
				aWord[i].style.WebkitTransform = 'rotateY('+i*360/16+'deg) translateZ(400px) scale(1,1)';
				aWord[i].style.MozTransform = 'rotateY('+i*360/16+'deg) translateZ(400px) scale(1,1)';
				aWord[i].style.msTransform = 'rotateY('+i*360/16+'deg) translateZ(400px) scale(1,1)';
				aWord[i].style.OTransform = 'rotateY('+i*360/16+'deg) translateZ(400px) scale(1,1)';
				aWord[i].style.transform = 'rotateY('+i*360/16+'deg) translateZ(400px) scale(1,1)';
				aWord[i].style.opacity=1;
	
			}
			function tranEnd(){
				aWord[0].removeEventListener('transitionend',tranEnd,false);
				bOk = true;
			}
			aWord[0].addEventListener('transitionend',tranEnd,false);
			
			var x = 0;
			var y = 0;
			var iSpeedX = 0;
			var iSpeedY = 0;
			var lastX = 0;
			var lastY = 0;
			var timer = null;
			o3D.onmousedown=function(ev){
				if(!bOk)return;
				clearInterval(timer);
				var disX = ev.pageX-y;
				var disY = ev.pageY-x;
				document.onmousemove=function(ev){
					//x = ev.pageY-disY;
					y = ev.pageX-disX;
					o3D.style.WebkitTransform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
					o3D.style.MozTransform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
					o3D.style.msTransform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
					o3D.style.OTransform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
					o3D.style.transform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
					//iSpeedX = ev.pageX-lastX;
					iSpeedY = ev.pageY-lastY;
					
					//lastX = ev.pageX;
					lastY = ev.pageY;
				};
				
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					clearInterval(timer);
					timer = setInterval(function(){
						iSpeedX*=0.8;
						iSpeedY*=0.8;
						x += iSpeedY;
						y += iSpeedX;
						o3D.style.WebkitTransform = 'perspective(800px) rotateX(-3deg) rotateY('+y/5+'deg)';
						o3D.style.MozTransform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
						o3D.style.msTransform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
						o3D.style.OTransform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
						o3D.style.transform = 'perspective(800px)  rotateX(-3deg) rotateY('+y/5+'deg)';
						//if(Math.abs(iSpeedX)<1)iSpeedX=0;
						if(Math.abs(iSpeedY)<1)iSpeedY=0;
						if(iSpeedX==0&&iSpeedY==0){
							clearInterval(timer);
						}
					},30);
				};
				return false;
			};
			
		};
		if(iNow==1){
			word3D();
		}else {
			for(var i=0;i<aWord.length;i++){
				aWord[i].style.WebkitTransition = '.5s all ease '+(i-16)*100+'ms';
				aWord[i].style.MozTransition = '.5s all ease '+(i-16)*100+'ms';
				aWord[i].style.msTransition = '.5s all ease '+(i-16)*100+'ms';
				aWord[i].style.OTransition = '.5s all ease '+(i-16)*100+'ms';
				aWord[i].style.transition = '.5s all ease '+(i-16)*100+'ms';
				aWord[i].style.WebkitTransform = 'rotateY(0deg) translateZ(0px) scale(.5,.5)';
				aWord[i].style.MozTransform = 'rotateY(0deg) translateZ(0px) scale(.5,.5)';
				aWord[i].style.msTransform = 'rotateY(0deg) translateZ(0px) scale(.5,.5)';
				aWord[i].style.OTransform = 'rotateY(0deg) translateZ(0px) scale(.5,.5)';
				aWord[i].style.transform = 'rotateY(0deg) translateZ(0px) scale(.5,.5)';
				aWord[i].style.opacity=0;
	
			}

		}
 	};

	//滚轮
	addMouseWheel(oWrap,function(down){
		pageReady=false;
		
		if(down){
			iNow+=1;
			if(iNow>aHead.length-1){
				iNow=aHead.length-1;
				pageReady=true;
				return;
			}	
			//oBar.style.left=iNow*aLi[0].offsetLeft+'px';
			
		}else{
			iNow-=1;
			if(iNow<0){
				iNow=0;
				pageReady=true;
				return;	
			}	
		}	
		pageTab();
	});
	
	//键盘运动
	var t=b=false;
	document.onkeydown=function(ev){
		var oEvt=ev||event;
		
		switch(oEvt.keyCode){
			case 38:
				t=true;
				iNow--;
				break;
			case 40:
				b=true;
				iNow++;
				break;
		}
		if(iNow<0){
			iNow=0;
		}else if(iNow==aHead.length){
			iNow=aHead.length-1;
		}
		pageTab();
	};	
	document.onkeyup=function(ev){
		var oEvt=ev||event;
		switch(oEvt.keyCode){
			case 38:
				t=false;
				break;
			case 40:
				b=false;
				break;
		}
	};	
	

	//选项卡函数  pageTab
 	function pageTab(){
		page2();

		for(var i=0;i<aLi.length;i++){
			aLi[i].className='';
		}
		aLi[iNow].className='active';
		
		oBar.style.left=aLi[iNow].offsetLeft+'px';
		nowPos=aLi[iNow].offsetLeft;
		l=nowPos;
		
  		move(oWrap,{top:-iNow*aPage[0].offsetHeight},{complete:function(){
			ready=true;
			if(iNow==aHead.length){
				oWrap.style.left=0;
				iNow=0;
			}
		},easing:Tween.Expo.easeOut,duration:1000});
 		

		for(var i=0;i<aHead.length;i++){
			aHead[i].className='';
		}
		if(iNow==aHead.length){
			aHead[0].className='active';
		}else{
			aHead[iNow].className='active';
		};
		//小箭头
		if(iNow==aHead.length-1){
			oNext.style.opacity=0;
			createLi(oSnow);
		}else{
			oNext.style.opacity=1;
			clearInterval(oSnow.timer);
		}
		
		if(iNow>=1){
			move(oNavr,{top:33},{easing:Tween.Expo.easeOut});
			
			
		}else if(iNow==0){
			move(oNavr,{top:13},{easing:Tween.Expo.easeOut});
			}
		}
		
		
 		move(oWrap,{top:-iNow*aPage[0].offsetHeight},{complete:function(){
			 ready=true;
			if(iNow==aHead.length){
				oWrap.style.left=0;
				iNow=0;
			}
		},easing:Tween.Expo.easeOut,duration:1000});
 				
		//page1();
		
		//page3();
		//page4();
		//page5();
		//page6();

	
	}
	
	
 	//底部漂浮
 	function createLi(obj){
		clearInterval(obj.timer)
		obj.timer = setInterval(function(){
			var oLi = document.createElement('li');
		    oLi.style.width=rnd(5,15)+'px';
		    oLi.style.height=oLi.style.width;
			oLi.style.opacity=rnd(0,.7);
			
			oLi.style.left = rnd(0,oSnow.offsetWidth-oLi.offsetWidth)+'px';
			obj.appendChild(oLi);
				
			move(oLi,{bottom:oLi.offsetHeight+150,opacity:0},{complete:function(){
				obj.removeChild(oLi);
				//createLi(obj)	
			}})
		},30)
	}
 	
	
	
	
	
	
}
