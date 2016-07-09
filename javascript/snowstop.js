// JavaScript Document
window.onload=function(){
	var oNav=document.getElementById('nav_r');
	var oBar=oNav.children[0].lastElementChild || oNav.children[0].lastChild;
	var aLi=oNav.getElementsByTagName('li');
	var timer=null;
	var nowPos=0;
	var l=0;
	
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseover=function(){
			move(oBar,this.offsetLeft);
			//this.children[0].className='active';
		}
		aLi[i].onmouseout=function(){
			move(oBar,nowPos);
			//aLi[i].children[0].className='';
		}
		aLi[i].onclick=function(){
			clearInterval(timer);
			for(var j=0;j<aLi.length;j++){
				aLi[j].children[0].className='';
			}
			this.children[0].className='active';
		}
	}
	
	function move(obj,iTarget){
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
