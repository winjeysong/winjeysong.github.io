---
layout: post
title: 手写一个简易的JS计算器
date: 2017-03-29
categories: front-end
excerpt: 前端知识不仅能做页面与交互，还能实现一些小功能。在网上看到一个js计算器，就想自己也写一个简易的计算器——能处理简单的四则混合运算和带括号的运算。
tags: [JAVASCRIPT,HTML,CSS,FREECODECAMP]
description: 
---
# 简易计算器
用前端知识写一个简易的计算器，~~在codepen的插件中进行预览（在小屏幕移动端，该插件预览不佳，可尝试横屏）。~~之前在codepen上写，预览挂掉了，改到RunJS上，最终预览效果如下，若要进行实时预览的编辑，可在RunJS打开[编辑页面](http://runjs.cn/code/g9dvpagt)<i class="fa fa-external-link" aria-hidden="true"></i>。
### 最终效果
<iframe style="width: 100%; height: 850px" src="http://sandbox.runjs.cn/show/g9dvpagt" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 源码

```html
<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title>mycalculator</title>
  <link rel='stylesheet prefetch' href='http://og67w4lxu.bkt.clouddn.com/buttons.css'>
	<link href="https://fonts.googleapis.com/css?family=Raleway|Space+Mono" rel="stylesheet">
</head>

<body>
<div class="calculator">
  <p>My Calcullator</p>
  <input type="textbox" class="textbox">
  <div class="btns">
    <button class="button button-small button-border button-rounded " value="(" >(</button>
    <button class="button button-small button-border button-rounded " value=")">)</button>
    <button class="button  button-small button-border button-rounded " value="%">%</button>
    <button class="button  button-small button-border button-rounded " value="/">/</button>
    <button class="button  button-small button-border button-rounded " value="7">7</button>
    <button class="button  button-small button-border button-rounded " value="8">8</button>
    <button class="button  button-small button-border button-rounded " value="9">9</button>
    <button class="button  button-small button-border button-rounded " value="*">*</button>
    <button class="button  button-small button-border button-rounded " value="4">4</button>
    <button class="button  button-small button-border button-rounded " value="5">5</button>
    <button class="button  button-small button-border button-rounded " value="6">6</button>
    <button class="button  button-small button-border button-rounded " value="-">-</button>
    <button class="button  button-small button-border button-rounded " value="1">1</button>
    <button class="button  button-small button-border button-rounded " value="2">2</button>
    <button class="button  button-small button-border button-rounded " value="3">3</button>
    <button class="button  button-small button-border button-rounded " value="+">+</button>
    <button class="button  button-small button-border button-rounded " value="0">0</button>
    <button class="button  button-small button-border button-rounded " value=".">.</button>
    <button class="button button-small button-border button-rounded button-highlight" value="AC">AC</button>
    <button class="button  button-small button-border button-rounded button-highlight" value="CE">CE</button>
    <button class="button  button-small button-border button-rounded button-primary" value="=" id="equalTo">=</button>
  </div>
</div>

<footer>
  <p>©️ 2017 <a href="http://winjeysong.com/" target="_blank">winjeysong</a>.</p>
  <p>with <a href="https://www.bootcss.com/p/buttons/">Bootcss Buttons</a> & <a href="https://fonts.google.com/">Google Fonts</a>.</p>
</footer>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
</body>
</html>
```

```css
html,body{
  margin: 0;
  padding: 0;
  background-color: #eee;
}

.calculator{
  width: 316px;
  margin: 100px auto;
  padding: 15px 15px 20px 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #DEDEDE;
  border-right: 1px solid #DEDEDE;
  border-bottom: 1px solid #DEDEDE;
  -moz-transition: all 0.7s ease;
  -webkit-transition: all 0.7s ease;
  transition: all 0.7s ease;
}

.calculator p{
  font-family: 'Space Mono', monospace;
  text-align: center;
  font-size: 18px;
}

.calculator .textbox{
  text-align: right;
  width: 294px;
  height: 25px;
  margin-left: 8px;
  background-color: #FFF;
  border: 2px solid #9C9C9C;
  border-radius: 3px;
}

.calculator .btns{
  margin-left: 8px; 
}

.btns .button{
  font-family: 'Space Mono', monospace;
  margin: 15px 9px 0 0;
  width: 0px;
  height: 35px;
  text-indent: -20px;
}

#equalTo{
  padding: 0 147px;
  font-weight:bold;
  text-indent: -3px;
}

footer{
  font-family: 'Raleway', sans-serif;
  color:#CECECE;
  background-color: #888;
  height: 100px;
  text-align: center;
  padding: 60px
}

footer a{
  color: #EEE;
  text-decoration: none;
}

footer a:hover{
  text-decoration: underline;
  color: #CECECE;
}
```

```javascript
var res = "";
var flag = false;  //用于标记是否按下“=”键
$(document).ready(function(){
  $(".calculator>p").mouseover(function(){
    $(".textbox").val("look at winjeysong")
  });
  $(".calculator>p").mouseout(function(){
    $(".textbox").val("")
  });
  $("button").click(function(){
    var inputKey = $(this).attr("value");
    if (inputKey === "AC"){
      res = "";
      $(".textbox").val(res);
    }
    else if (inputKey === "CE"){
      res = res.slice(0,-1);
      $(".textbox").val(res);
    }
    else if (inputKey == parseInt(inputKey) || inputKey === "/" || inputKey === "*" || inputKey === "-" || inputKey === "+" || inputKey === "%" || inputKey === "." || inputKey === "(" || inputKey === ")"){
      if (flag === false){
        res += inputKey;
        $(".textbox").val(res);
      }
      else{
        res = inputKey;
        $(".textbox").val(res);
        flag = false;
      } 
    }
    else if (inputKey === "="){
      $(".textbox").val(eval(res));
      flag = true;
    }
  });
});
```

### 缺陷
该计算器能实现的计算功能非常基础，且有以下缺陷（待改进，希望自己不偷懒T T）：
1. 浮点数的计算不精确
2. 不能对结果进行再计算
3. 取余操作应判断操作数是否为整数
4. 最好能对符号的输入做限制，两个操作符号之间不能连续