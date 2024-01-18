/**
 * 【功能描述】
 * 在一个标签元素的周围，弹出很小的提示。
 * 这中提示可以精准聚焦表达位置，并且相对含蓄
 * 
 * 【使用方法】
 * 1、在网页中引用
 * <script src="js/mini-pop-prompt.js"></script>
 * 
 * 2、调用函数添加提示
 * 通过标签id进行提示 MiniPoPPrompt(text,id=null,type=0,time=2,direction=0)
 * 通过标签对象进行提示  MiniPoPPrompt(text,element=null,type=0,time=2,direction=0)
 * 
 * 3、参数定义
 * text 提示内容
 * element 目标元素 当目标元素为null时  提示出现在页面顶端
 * type 类型 0绿色描述  1黄色提醒  2红色警告 
 * time 停留时间
 * direction 方向0上1右2下3左
 * 
 * 例子：
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

var MiniPoPPromptcss = `
.m-p-p-bg {
    position: absolute;
    padding: 5px;
    overflow: hidden;
    font-size: 14px;
    border-radius: 3px;
    z-index:9999;
    overflow: hidden;
}
.m-p-p-bg.c0{
  background-color: #8bc34ae6;
  color: #fff;
}
.m-p-p-bg.c1{
  background-color: #ffc107e6;
  color: #fff;
}
.m-p-p-bg.c2{
  background-color: #ff5722e6;
  color: #fff;
}
.m-p-p-bg.d0{
    transform:translate(-50%,-100%);
}
.m-p-p-bg.d1{
    transform:translate(0%,-50%);
}
.m-p-p-bg.d2{
  transform:translate(-50%,0%);
}
.m-p-p-bg.d3{
  transform:translate(-100%,-50%);
}

@keyframes height-animation-d0 {
  0% {
    height: 0px;
    padding: 0px 5px 0px 5px;
  }
  10% {
    height: 20px;
    padding: 5px 5px 5px 5px;
  }
  90% {
    height: 20px;
    padding: 5px 5px 5px 5px;
  }
  100% {
    height: 0px;
    padding: 0px 5px 0px 5px;
  }
}

@keyframes height-animation-d1 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes height-animation-d2 {
  0% {
    height: 0px;
    padding: 0px 5px 0px 5px; ;
  }
  10% {
    height: 20px;
    padding: 5px 5px 5px 5px;
  }
  90% {
    height: 20px;
    padding: 5px 5px 5px 5px;
  }
  100% {
    height: 0px;
    padding: 0px 5px 0px 5px;
  }
}

@keyframes height-animation-d3 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
  
}

`;


/***
 * 注册样式
 */
var styleTag = document.querySelector('style');
if (!styleTag) {
    styleTag = document.createElement('style');
    document.head.appendChild(styleTag);
}
styleTag.innerHTML = MiniPoPPromptcss;



/***
 * 添加提示函数
 * text 提示内容
 * element 目标元素 当目标元素为null时  提示出现在页面顶端
 * type 类型 0绿色描述  1黄色提醒  2红色警告 
 * time 停留时间
 * direction 方向0上1右2下3左
 * 
 */
function MiniPoPPrompt(text,element=null,type=0,time=2,direction=0){
    if(!(element instanceof Object)){
      element = document.getElementById(element+"")
    }
    var rect 
    var mdiv=document.createElement("div")
    var xy
    if (element) {
      rect = element.getBoundingClientRect();
      xy = getElementPosition(element)
      mdiv.style.left = xy.x+"px"
      mdiv.setAttribute("class","m-p-p-bg d"+direction+" c"+type+"")
    }else{
      xy = {x:0,y:0,p:document.body}
      rect = {width:window.innerWidth,height:0}
      direction = 2
      mdiv.style.position="fixed"
      mdiv.style.textAlign="center"
      direction=2
      mdiv.setAttribute("class","m-p-p-bg d"+2+" c"+type+"")
    }
    mdiv.innerText=text;

    if(direction==0){
        mdiv.style.minWidth = rect.width-10+"px"
        mdiv.style.left = xy.x+rect.width/2+"px"
        mdiv.style.top = xy.y+"px"
    }else if(direction==1){
        mdiv.style.left = xy.x+rect.width+"px"
        mdiv.style.top = xy.y+rect.height/2+"px"
    }else if(direction==2){
        mdiv.style.minWidth = rect.width-10+"px"
        mdiv.style.left = xy.x+rect.width/2+"px"
        mdiv.style.top = xy.y+rect.height+"px"
    }else if(direction==3){
        mdiv.style.left = xy.x+"px"
        mdiv.style.top = xy.y+rect.height/2+"px"
        mdiv.style.maxWidth = xy.x-10+"px"

    }
    mdiv.style.animation="height-animation-d"+direction+" "+time+"s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards";
    xy.p.appendChild(mdiv)
    setTimeout(function(){
        mdiv.parentNode.removeChild(mdiv)
    },time*1000)
}
/**
 * 获取元件坐标和尺寸
 * @param {} element 
 * @returns 
 */
function getElementPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
    var parent = element
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        parent = element
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition ,p:parent};
}