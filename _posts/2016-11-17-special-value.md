---
layout: post
title: 基本数据类型中特殊值（NaN，null，undefined）的整理
date: 2016-11-17
categories: front-end
excerpt: JavaScript中有一些比较特别的值（NaN，null，undefined等），如果不理顺，就会很容易造成错误。所以很有必要对他们进行一个整理。
tags: [JAVASCRIPT,DATA TYPE]
description: 自己整理的有关一些容易弄错的特殊值。
---
# 特殊值相关整理
JavaScript中有一些比较特别的值（`NaN`，`null`，`undefined`等），如果不理顺，就会很容易造成错误。所以很有必要对他们进行一个整理，以便日后时不时地查找。

### NaN(Not a Number)
NaN是`Number`类型中一个特殊的数值，它表示本来要返回数值的操作数未返回数值的情况。

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
##### 1.NaN与`Boolean()`
对`NaN`使用转型函数`Boolean()`时，
```javascript
console.log(Boolean(NaN));  //false
```

##### 2.NaN与`Number()`及`undefined`
对`undefined`使用转型函数`Number()`时，
```javascript
console.log(Number(undefined));  //NaN
 ```

##### 3.NaN与`Number()`
对**不是只**包含数字（包括不同进制的数值及浮点数）的字符串使用转型函数`Number()`时，
```javascript
console.log(Number("hello world666!"));  //NaN
console.log(Number(0x3f));               //63
```

##### 4.NaN与`parseInt()`及`""`
对空字符串`""`使用转型函数`parseInt()`时，
```javascript
console.log(parseInt(""));  //NaN
```

##### 5.NaN与逻辑操作符
对`NaN`进行逻辑操作
```javascript
console.log(! NaN);       //true
console.log(NaN && 123);  //NaN，与运算，第一个数为NaN必返回NaN
console.log(NaN || NaN);  //NaN，或运算，两个数均为NaN才会返回NaN
```

##### 6.NaN与四则运算及`Infinity`
四则运算（**只要有操作数为NaN，返回NaN**），以下结果均为`NaN`
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

##### 7.NaN的关系比较
7.任何数与`NaN`进行关系比较，结果都是`NaN`
```javascript
console.log(NaN < 1);  //NaN
console.log(NaN > 1);  //NaN
```

### undefined
作为基本数据类型之一，`undefined`这种类型只有一个值，就是它本身。

#### undefined特点
在用`var`声明变量之后，未对变量赋值，或将其赋值为`undefined`，变量的值都为`undefined`：
```javascript
var val;
var _val;
console.log(val, _val);  //undefined undefined
```

#### 出现undefined的地方
##### 1.undefined与`typeof`
在使用`typeof`操作符检测数据类型的时候，会出现令人困惑的情况：
```javascript
var val;
console.log(typeof val);   //"undefined"
console.log(typeof _val);  //"undefined"
```
`val`是已声明但未赋初值的变量，而`_val`是没有声明的变量，在对这两种变量使用`typeof`操作符之后，都返回了`undefined`。

##### 2.undefined与`Boolean()`
在对`undefined`使用转型函数`Boolean()`时，
```javascript
console.log(Boolean(undefined));  //false
```

##### 3.undefined与`Number()`
这种情况和<i class="fa fa-link" aria-hidden="true"></i>[前面的情况](#2nan与number及undefined)相同。

##### 4.undefined与`String()`
对于值为`undefined`的变量，使用转型函数`String()`：
```javascript
var val;
console.log(String(val));  //"undefined"
```
**⚠注意：** `undefined` 没有 `toString()` 方法。

##### 5.undefined与逻辑操作符
对`undefined`进行逻辑操作
```javascript
console.log(! undefined);             //true
console.log(undefined && 123);       //undefined，与运算，第一个数为undefined必返回undefined
console.log(undefined || undefined)  //undefined，或运算，两个数均为undefined才返回undefined
```

##### 6.undefined与null
```javascript
console.log(undefined == null);  //true
```

### null
`null`和`undefined`类似（实际上，`undefined`值是派生自`null`值的，所以在测试两者的相等时会出现上面的<i class="fa fa-link" aria-hidden="true"></i>[这种情况](#6undefined与null)），也是基本数据类型之一，且`null`类型也只有它本身一个值。

#### null特点
`null`其实表示的是一个空对象指针，所以在对其使用`typeof`操作符时，会返回`"object"`：
```javascript
console.log(typeof null);  //"object"
```

#### 出现null的地方
##### 1.null与`Boolean()`
对`null`使用转型函数`Boolean()`时，
```javascript
console.log(Boolean(null));  //false
```

##### 2.null与`Number()`
对`null`使用转型函数`Number()`时，
```javascript
console.log(Number(null));  //0;
```

##### 3.null与`String()`
对`null`使用转型函数`String()`时，
```javascript
console.log(String(null));  //"null"
```

##### 4.null与逻辑操作符
对`null`进行逻辑操作：
```javascript
console.log(! null);         //true
console.log(null && 123);   //null，与运算，第一个数为null必返回null
console.log(null || null);  //null，或运算，两个数均为null才返回null
```