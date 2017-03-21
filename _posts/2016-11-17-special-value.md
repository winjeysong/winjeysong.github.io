---
layout: post
title: 基本数据类型中特殊值（NaN，null，undefined）的整理
date: 2016-11-17
categories: front-end
excerpt: JavaScript中有一些比较特别的值（NaN，null，undefined等），如果不理顺，就会很容易造成错误。所以很有必要对他们进行一个整理。
tags: [JAVASCRIPT,NaN]
description: 自己整理的有关一些容易弄错的特殊值。
---
# 特殊值相关整理
JavaScript中有一些比较特别的值（`NaN`，`null`，`undefined`等），如果不理顺，就会很容易造成错误。所以很有必要对他们进行一个整理。
### `NaN`(Not a Number)
NaN是一个特殊的数值，它表示本来要返回数值的操作数未返回数值的情况。
#### NaN特点
1.任何涉及NaN的操作都会返回NaN<br>
2.NaN不等于任何值（NaN也不等于本身）
```javascript
console.log(NaN == NaN);  //false
```
#### `isNaN()`函数
用来检测参数是否为**NaN**。该函数在接收参数后，会将某些不是数值的值转换为数值（如，`String`数值或`Boolean`值），而无论如何都无法转换为数值的值会使该函数返回`true`。

另外，该方法也可用于`Object`。在对`Object`使用该函数时，会先调用`valueOf()`方法，若不能返回数值，则会对返回值继续调用`toString()`方法。
#### 出现NaN的地方
1.对`NaN`使用转型函数`Boolean()`时，
```javascript
console.log(Boolean(NaN));  //false
```
2.对`undefined`使用转型函数`Number()`时，
```javascript
console.log(Number(undefined));  //NaN
 ```
3.对**不是只**包含数字（包括不同进制的数值及浮点数）的字符串使用转型函数`Number()`时，
```javascript
console.log(Number("hello world666!"));  //NaN
console.log(Number(0x3f));               //63
```
4.对空字符串`""`使用转型函数`parseInt()`时，
```javascript
console.log(parseInt(""));  //NaN
```
5.对`NaN`进行逻辑操作
```javascript
console.log(! NaN);       //true
console.log(NaN && 123);  //NaN，与运算，第一个数为NaN必返回NaN
console.log(NaN || NaN);  //NaN，或运算，两个数均为NaN才会返回NaN
```
6.四则运算（**只要有操作数为NaN，返回NaN**），以下结果均为`NaN`
```javascript
//乘法
console.log(Infinity * 0);         
//除法   
console.log(Infinity / Infinity);     
console.log(0 / 0);          
//加法         
console.log(Infinity + (-Infinity));  
//减法
console.log(Infinity - Infinity);     
console.log(-Infinity - (-Infinity));  
```
7.任何数与`NaN`进行关系比较，结果都是`NaN`
```javascript
console.log(NaN < 1);  //NaN
console.log(NaN > 1);  //NaN
```

### --不定时更新。--