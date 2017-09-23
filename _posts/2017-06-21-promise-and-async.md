---
layout: post
title: Promise与异步实现
date: 2017-06-21
categories: front-end
excerpt: 一般的异步操作主要是通过回调函数来实现，但是用回调表达程序异步和管理并发存在缺陷。Promise的出现可以很好地避免这些问题。
tags: [ASYNC,JAVASCRIPT]
description:  Promise要点记录
---
# 关于Promise
Promise对象用于表示一个异步操作的最终完成（或失败）及其结果值，ES6中原生支持了Promise，这里总结一下它的各个方法。
### `new Promise()`构造函数
该构造函数接受两个回调函数：`resolve()`和`reject()`，语法如下，
```javascript
new Promise(function(resolve, reject){...});
//或用箭头函数
new Promise((resolve, reject) => {...})
```
这里的`resolve()`用于完成Promise（也可能拒绝，根据传入参数而定），而`reject()`用于拒绝Promise。如果`resolve()`接受的**是一个非Promise或非thenable的立即值**，那么该Promise就会用这个值完成，即直接返回该值；而如果`resolve()`接受的是一个**Promise或thenable的值**，该值的最终决议值或状态就会被Promise取得。

### `then()`和`catch()`
每个Promise实例都有`then()`方法和`catch()`方法，它们可以为Promise注册完成和拒绝函数。在Promise决议后，立即调用（异步调用）这两个方法之一。

* `then()`方法：它接受一个或两个参数，第一个参数用于完成回调，第二个参数用于拒绝回调。如果任一参数被省略或传入非函数作为参数，就会将其替换成默认回调。默认的完成回调负责消息传递，默认的拒绝回调则重新抛出其之前接收到的错误原因；
* `catch()`方法：它只接受一个拒绝回调函数作为参数，且会自动替换默认完成回调，即`catch(rejected)`等价于`then(null, rejected)`。

它们会创建并返回一个新的Promise，该Promise可以用于实现Promise链式控制流程。如果在完成或拒绝的回调中抛出异常，则返回的Promise是被拒绝的。如果任一回调返回**非Promise或非thenable的立即值**，该值会被用作返回Promise的完成值；如果完成函数返回一个**Promise或thenable的值**，该值会被展开，并作为返回Promise的决议值。

### `Promise.resolve()`和`Promise.reject()`
这两个方法是创建已完成或已拒绝Promise的简单写法。如下的reject写法是等价的：
```javascript
let p1 = new Promise((resolve, reject) => reject("error!"));
//等同于
let p1 = Promise.reject("error!");
```
对于resolve来说，简化写法和上面的reject相同，但遇到`Promise.resolve()`展开thenable值时，返回的Promise采用传入的这个thenable的最终决议值，可能是完成，也可能是拒绝。
```javascript
let fulfilled = {
    then: suc => {
        suc(para);
    }
};

let rejected = {
    then: (suc, err) => {
        err("error!");
    }
};

let p1 = Promise.resolve(fulfilled);  //完成的Promise
let p2 = Promise.resolve(rejected);  //拒绝的Promise
```
另外，**如果把一个真正的Promise传入，那么`Promise.resolve()`不会发生额外操作**，而是直接返回这个Promise值。

### `Promise.all()`
由于在Promise链的执行过程中，当前只会有一个异步操作正在运行,即后一个步骤肯定会在前一个步骤结束后才会执行。那么要怎样才能同时（并行）执行两个或更多的步骤呢？答案是使用`Promise.all([...])`，它能保证两个或更多的并行任务**都完成**才能继续下面的步骤，而这些任务谁先完成谁后完成并不重要。如果有任何Promise被拒绝，返回的主Promise就会被立即拒绝。这种机制一般被叫做**门：所有人到齐了门才会开**。

`Promise.all()`的参数是一个数组，一般来说是由Promise实例组成（也可能是thenable或立即值），完成值也是一个数组。看一个例子，代码如下：
```javascript
let p1 = Promise.resolve(66);
let p2 = Promise.resolve("It's cool!");
let p3 = Promise.reject("error");

Promise.all([p1, p2])
.then( info => console.log(info) ); 
//[66, "It's cool!"]
//Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: undefined}

Promise.all([p1, p2, p3])
.catch( info => console.log(info) );
//"error"
//Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: undefined}
```
若`Promise.all()`传入空数组，主Promise就会立即完成：
```javascript
Promise.all([]);
//Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: Array(0)}
```

### `Promise.race()`
`Promise.race()`同样接受单个数组作为其参数，该数组由一个或多个Promise、thenable或立即值组成。与`Promise.all()`不同的是，`Promise.race()`只响应第一个完成的Promise，即只有第一个决议的Promise（完成或拒绝皆可）被接受，并且决议的结果成为返回Promise的决议，最终的完成值是单个消息。这种机制一般被叫做**门闩：第一个到达者打开门闩通过。**
>注意：不要在`Promise.race()`中传入空数组，这样会导致Promise永不决议。

来看一个例子：
```javascript
let p1 = Promise.resolve(66);
let p2 = Promise.resolve("It's cool!");
let p3 = Promise.reject("error");

Promise.race([p1, p2, p3])
.then( info => console.log(info) );
//66
//Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: undefined}
```
