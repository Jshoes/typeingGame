function game(obj){
	this.obj=obj;

	this.letter=["D","F","E","U","T","N","M","A","Z","B","P","L","K","G"];
	this.letterArr=[];
	this.speed=3;
	this.num=7;
	this.level=1;
	this.objlife=$(".life",obj)[0];
	this.objscreo=$(".screo",obj)[0];
	this.objend=$(".end",obj)[0];
	this.screo=0;
	this.life=10;
	this.cW=document.documentElement.clientWidth;
	this.cH=document.documentElement.clientHeight;
	this.getLetter();
	this.play(this.num);
	this.start();
	this.end();
}

game.prototype={
	getLetter:function(num){
		for(var i=0;i<num;i++){
			var div=document.createElement("div");
			div.style.cssText="width:100px;height:100px;color:orange;font-size:80px;line-height:100px;text-align:center;position:absolute;background-image:url(images/2.png);border-radius: 50%;";
			div.style.left=(Math.random()*(this.cW-400)+200)+"px";
			div.style.top=((Math.random()*-40)-50)+'px';
			div.innerHTML=this.letter[Math.floor(Math.random()*this.letter.length)];
			this.obj.appendChild(div);
			this.letterArr.push(div);	
		}
	},
	play:function(){
		var that=this;
		setInterval(function(){
			if(that.letterArr.length<that.num){
				var f=that.num-that.letterArr.length;
				that.getLetter(f);
			}
			for(var j=0;j<that.letterArr.length;j++){
				that.letterArr[j].style.top=(that.letterArr[j].offsetTop+that.speed)+"px";
				if(that.letterArr[j].offsetTop>that.cH-40){
					that.obj.removeChild(that.letterArr[j]);
					that.letterArr.splice(j,1);
					that.life-=1;
					that.objlife.innerHTML=that.life;
					if(that.life<=0){alert("太遗憾了！继续加油吧！");history.go(0);}
				}
			}
		},50)
	},

	start:function(){
		var that=this;
		document.onkeydown=function(e){
			var ev=e||window.event;
			for(var k=0;k<that.letterArr.length;k++){
				if(String.fromCharCode(ev.keyCode)==that.letterArr[k].innerHTML){
					that.obj.removeChild(that.letterArr[k]);
					that.letterArr.splice(k,1);
					that.screo+=1;
					that.objscreo.innerHTML=that.screo;
					if(that.screo==50){alert("太棒了！增加难度试试吧！");history.go(0);}
					break;
				}
			}
		}
	},
	end:function(){
		this.objend.onclick=function(){
			history.go(0);
		}
	}
}