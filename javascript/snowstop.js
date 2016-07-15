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
		oKt.style.WebkitTransition='3s all ease';
		oKt.style.MozTransition='3s all ease';
		oKt.style.MsTransition='3s all ease';
		oKt.style.OTransition='3s all ease';
		oKt.style.transition='3s all ease';
		oKt.style.WebkitTransform='perspective(800px) translateY(-1000px)';
		oKt.style.MozTransform='perspective(800px) translateY(-1000px)';
		oKt.style.MsTransform='perspective(800px) translateY(-1000px)';
		oKt.style.OTransform='perspective(800px) translateY(-1000px)';
		oKt.style.transform='perspective(800px) translateY(-1000px)';

		oKt.style.opacity='0.5';

 		function tranEnd(){
			oKt.removeEventListener('transitionend',tranEnd,false);
			oKt.style.display='none';
		}
		oKt.addEventListener('transitionend',tranEnd,false);
 		
		oWrap.style.display='block';
		oNav.style.display='block';
	}
	
	var oNav=document.getElementById('nav_r');
	var oBar=oNav.children[0].lastElementChild || oNav.children[0].lastChild;
	var aLi=oNav.getElementsByTagName('li');
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
				
/*				for(var i=0;i<aLi.length;i++){
					aLi[i].className='';
				}
				this.className='active';
*//*				oBar.style.left=iNow*aLi[0].offsetLeft+'px';
				nowPos=iNow*aLi[0].offsetLeft;
				l=nowPos;
				
 				move(oWrap,{top:-iNow*aPage[0].offsetHeight},{complete:function(){
					ready=true;
					if(iNow==aHead.length){
						oWrap.style.left=0;
						iNow=0;
					}
				},easing:Tween.Expo.easeOut,duration:1000});
*/				
				pageTab();
			}
		}
		
		function moveNav(obj,iTarget){
			clearInterval(timer);
			var speed=0;
			
			timer=setInterval(function(){
				speed+=(iTarget-obj.offsetLeft)/5;
				speed *= 0.7;	
				l+=speed;
	
				obj.style.left=Math.round(l)+'px';
	
				if(Math.abs(speed)<1) speed=0;
				
				if(obj.offsetLeft==iTarget && speed==0){
					clearInterval(timer);
					//console.log(iTarget,obj.offsetLeft,speed);//没到位	
				}
				
			},30);
		}
	}
	
	
	for(var i=0;i<aHead.length;i++){
		(function(index){
			aHead[i].onmouseover=function(){
				iNow=index;
				
				pageTab();
			}
		})(i);
	}
	
	
 	function pageTab(){
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
		},easing:Tween.Expo.easeOut,duration:4000});
		
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
			oNav.style.WebkitTransition='.5s all ease';
			oNav.style.WebkitTransform='translateY(15px)';
			
		}else if(iNow==0){
			oNav.style.WebkitTransform='translateY(0px)';
			

		}
		
		move(oWrap,{top:-iNow*aPage[0].offsetHeight},{complete:function(){
			ready=true;
			if(iNow==aHead.length){
				oWrap.style.left=0;
				iNow=0;
			}
		},easing:Tween.Expo.easeOut,duration:1000});
				
/*		page1();
		page2();
		page3();
		page4();
		page5();
		page6();
*/	
	}
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
	
 	//piaofu
	function createLi(obj){
		clearInterval(obj.timer)
		obj.timer = setInterval(function(){
			var oLi = document.createElement('li');
		    oLi.style.width=rnd(10,20)+'px';
		    oLi.style.height=oLi.style.width;
			oLi.style.opacity=rnd(0,.7);
			
			oLi.style.left = rnd(0,oSnow.offsetWidth)+'px';
			obj.appendChild(oLi);
				
			move(oLi,{bottom:oLi.offsetHeight+180,opacity:0},{complete:function(){
				obj.removeChild(oLi);
				//createLi(obj)	
			}})
		},30)
			
			
			
	}
	
	
	
	
	
	
}
