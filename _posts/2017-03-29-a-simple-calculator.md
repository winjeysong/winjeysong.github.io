---
layout: post
title: 手写一个简易的JS计算器
date: 2017-03-29
categories: javascript
excerpt: 用前端知识写一个简易的计算器，能处理简单的四则混合运算和带括号的运算（在小屏幕移动端，该插件预览不佳，可尝试横屏）。
tags: [JAVASCRIPT,HTML,CSS]
description: 
---
# 简易计算器
用前端知识写一个简易的计算器，在codepen的插件中进行预览。
### 最终效果
<p data-height="902" data-theme-id="light" data-slug-hash="XMxbGO" data-default-tab="result" data-user="winjeysong" data-embed-version="2" data-pen-title="mycalculator" class="codepen">See the Pen <a href="http://codepen.io/winjeysong/pen/XMxbGO/">mycalculator</a> by W.S. (<a href="http://codepen.io/winjeysong">@winjeysong</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### 缺陷
该计算器能实现的计算功能非常基础，且有以下缺陷：
1. 浮点数的计算不精确
2. 不能对结果进行再计算
3. 取余操作应判断操作数是否为整数
4. 最好能对符号的输入做限制，两个操作符号之间不能连续