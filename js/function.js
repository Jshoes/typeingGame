function getClass(classname,obj){
	obj=obj||document;
	if(obj.getElementsByClassName!=undefined){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		var Tags=obj.getElementsTagName("*");  //把全部都获得
		for(var i=0;i<Tags.length;i++){
			if(check(Tags[i].className,classname)){   //如果类名是 lits  one   a   输入一个one  如果没有这个判断  就搜不到  造成错误
				arr.push(Tags[i]);
			}
		}
		return arr;
	}
}

function inp(obj,val){
	if(val==undefined){
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}else{
		if(obj.innerText){
			obj.innerText=val;
		}else{
			obj.textContent=val;
		}
	}
}

function check(oldclass,newclass){
	var arr=oldclass.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==newclass){
			return true;
		}
	}
	return false;
}

function getStyle(obj,attr){//行内  外部样式都可以获取到  
	if(obj.currentStyle){
		return obj.currentStyle[attr];  //只有ie支持  
	}else{
		return getComputedStyle(obj,null)[attr];  //谷歌  火狐 获取方式
	}    //只能获取   不能设置  
}
//加引号的是字符串  如果是变量在括号里面一定不能加引号 
function $(selector,content){
	if(typeof selector=="string"){
		content=content||document;
		if(selector.charAt(0)=="#"){
			return document.getElementById(selector.substr(1));
		}else if(selector.charAt(0)=="."){
			return getClass(selector.substr(1),content);
		}else if(/^[a-zA-Z][A-Za-z1-6]*$/.test(selector)){
			return content.getElementsByTagName(selector);
		}else if(/^<[a-zA-Z][A-Za-z1-6]{1,10}>$/.test(selector)){//新建立一个标签
			return document.createElement(selector.slice(1,-1));
		}
	}else if(typeof selector=="function"){
		on(window,"load",selector);
	}
}

//去除字符串的空格  但是没有改变原字符串  返回的是新的字符串
function space(str,type){
	type=type||"lr";
     if(type=="a"){
     	return str.replace(/\s*/g,"");
     }if(type=="l"){
     	return str.replace(/^\s*/g,"");
     }if(type=="r"){
     	return str.replace(/\s*$/g,"");
     }if(type=="lr"){
     	return str.replace(/^\s*|\s*$/g,"");
     }
}


function getChilds(obj,type){
	var childs=obj.childNodes;
	var arr=[];
	type=type||"a";
	if(type=="b"){//不要文本
		for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1){
			arr.push(childs[i]);
		}
	}
	return arr;
	}else{
		for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1||(childs[i].nodeType==3&&space(childs[i].nodeValue)!="")){
			arr.push(childs[i]);
		}
	}
	return arr;
	}
}

function getChildFirst(obj,type){
	return getChilds(obj,type)[0];
}

function getChildLast(obj,type){
	var m=getChilds(obj,type);
	return m[m.length-1];
}

function getChildNum(obj,type,num){
	var m=getChilds(obj,type);
	return m[num-1];
}
	
//nextSibling
	function getNext(obj){
		var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		while(next.nodeType==8||(next.nodeType==3&&space(next.nodeValue)=="")){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}

	function getPrevious(obj){
		var previous=obj.previousSibling;
		if(previous==null){
			return false;
		}
		while(previous.nodeType==8||(previous.nodeType==3&&space(previous.nodeValue)=="")){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
		return previous;
	}

//obj   要插入的对象   
// aftObj   在这个对象后面插入
	function insertAfter(obj,aftObj){
		var next=getNext(aftObj);
		if(next==false){
			aftObj.parentNode.appendChild(obj);
		}else{
			aftObj.parentNode.insertBefore(obj,next);
		}
	}

	function c(a){
		console.log(a);
	}



	function on(obj,event,fn){
		if(obj.addEventListener){
			obj.addEventListener(event,fn,false);
		}else{
			obj.attachEvent("on"+event,fn);
		}
	}


	function off(obj,event,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(event,fn,false);
		}else{
			obj.detachEvent("on"+event,fn);
		}
	}


	function mouseWheel(obj,downcallback,upcallback){
		obj=obj||document;
		if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);
			addEventListener("DOMMouseScroll",scrollFn,false)
		}else if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn)
		}

		function scrollFn(e){
		var ev=e||window.event;
		var val=ev.wheelDelta||ev.detail;
		if(val==120||val==-3){//up
			upcallback&&upcallback();
		}else if(val==-120||val==3){
			downcallback&&downcallback();
		}
		if(ev.preventDefault){
			ev.preventDefault();
		}else{
			ev.returnValue=false;
		}
	}
	}