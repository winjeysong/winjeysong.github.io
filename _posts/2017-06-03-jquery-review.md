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
去年在大致学完javascript之后，又跟着视频大致过了一遍jQuery，感觉自己掌握了，但到用的时候还是朦朦胧胧，这种感觉很不扎实，所以趁空余时间再重新细细看一遍jQuery的内容。关于jQuery的历史，优势，引入等不再赘述。


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
以下为经常性用到的选择器，较少用到的不再罗列。
##### 1.2.1 基本选择器
* id选择器：根据id匹配元素 `$("#id")`
* 类选择器：根据class匹配元素 `$(".class")`
* 元素选择器：根据html元素匹配元素 `$("html")`
* 通配符选择器（\*）：匹配所有元素 `$("*")`

##### 1.2.2 关系选择器
* 后代选择器：选择祖先元素ancestor下的所有后代元素descendant `$("ancestor descendant")`
* 子代选择器：选择父辈元素parent下的子代元素child `$("parent > child")`

示例：
```html
<div>
    <p>示例<span>一</span></p>
    <span>示例一</span>
</div>
```
>**注意：** 区分后代和子代的差别。后代选择器 `$("div span")` 会同时选取到 `<span>一</span>` 以及 `<span>示例一</span>` ；而子代选择器 `$("div > span")` 只会选取到 `<span>示例一</span>` 。


##### 1.2.3 “伪类”选择器
* 首/末项选择器：仅选取ele元素的第一项或最后一项 `$("ele:first")`, `$("ele:last")`
* 奇/偶项选择器：选取所有ele元素索引为奇数的项或偶数的项，**索引从0开始** `$("ele:odd")`, `$("ele:even")`
* 索引选择器：选取索引值大于( *greater than* )、小于( *lower than* )index的所有ele元素，和等于( *equal to* )index的**单个**ele元素，**索引从0开始** `$("ele:gt(index)")`, `$("ele:lt(index)")`, `$("ele:eq(index)")`
* 动画选择器：选取正在进行动画操作的所有ele元素 `$("ele:animated")`
* 内容选择器：选取含有文本内容“content”的所有ele元素 `$("ele:contains(content)")`
* 可见/不可见选择器：选取所有可见或不可见的ele元素 `$("ele:visible")`, `$("ele:hidden")`
>**注意：**不可见选择器 ( :hidden ) 对 `visibility:hidden` 和 `opacity: 0` 的元素不起作用。

##### 1.2.4 属性选择器
* 选取所有拥有属性attr的ele元素 `$("ele[attr]")`
* 选取所有属性attr的值为val的ele元素 `$("ele[attr=val]")`

##### 1.2.5 子元素选择器
* 选取**每个**ele父元素下的第index个元素，**index值从1开始** `$("ele:nth-child(index)")`
  <br>`:nth-child(index)`的用法较多，比较灵活，其他用法如下：<br>
  1. `:nth-child(even/odd)`选取每个父元素下的偶数/奇数项，注意是从1开始
  2. `:nth-child(2n+1)`选取每个父元素下索引为（2n+1）的元素，注意是从1开始
* 选取**每个**ele父元素下的首/末元素 `$("ele:first-child")`, `$("ele:last-child")`
>**注意：**不要和1.2.3中索引从0开始的选择器混淆。

#### 1.3 注意事项
当选择器中含有特殊符号（".", "#", "(", "["等）时，需要加上转义字符才能正常获取，比如：
```html
<div class="box(s)" id="#box[1]"></div>
```
那么要获取这个div时可以这么写：
```javascript
$(".box\\(s\\)")
//或
$("#\\#box\\[1\\]")
```



