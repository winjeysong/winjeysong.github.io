---
layout: post
title: 重拾jQuery
date: 2017-06-03
categories: jquery
excerpt: jQuery是一个非常受欢迎的JS库，能通过教少量的代码完成目标功能。同时它还能够兼容市面上主流的浏览器，不用再写恼人的兼容性代码。所以我觉得很有必要再重温一遍jQuery。
tags: [JQUERY,JAVASCRIPT]
description: 
---
# 缘由
去年在大致学完javascript之后，又跟着视频大致过了一遍jQuery，感觉自己掌握了，但到用的时候还是朦朦胧胧，这种感觉很不扎实，所以趁空余时间再重新细细看一遍jQuery的内容。关于jQuery的历史，优势，引入等不再赘述。


### 一、jQuery选择器
jQ的选择器完全是来自于CSS选择器，在书写方式上与CSS几乎相同。
#### 1.1 优势
jQuery选择器支持CSS1到CSS3的选择器，**兼容性又比CSS选择器更好**；从写法上来说，**获取元素的操作也更为简洁**；而且有**更完善的处理机制**，使用原生javascript获取元素时，如果该元素本身并不存在，会导致浏览器报错；而若使用jQuery选择器来操作元素，无论该元素是否存在，都不会引起报错。

**注：**因为这个机制的存在，所以当检查某元素在网页上是否存在时，不能使用以下方法：
```javascript
if ($("ele")){
        ...  //do something
}
```
而应该判断所获取的元素的长度是否为零：
```js
if ($("ele").length > 0){
        ...  //do something
}
```
#### 1.2 常用jQuery选择器
##### 1.2.1 基本选择器
待写
