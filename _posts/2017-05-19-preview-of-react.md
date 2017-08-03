---
layout: post
title: React基础理论
date: 2017-05-19
categories: front-end
excerpt: 本文主要是对React的基础、重要的理论部分进行梳理，为实践做好准备。
tags: [WEBPACK,JAVASCRIPT,REACT]
description: webpack基础知识记录
---
# React概述
React是Facebook推出的一个JS库，主要用来创建用户界面，即MVC中的V这一层。引用《React全栈》中的总结，React主要有三大特点让其非常受欢迎：
1. **组件（ *Component* ）**：React的一切都是基于组件的，组件让代码的复用、测试及分离都变得异常方便，且各个组件都有自身的状态（ *state* ），当状态变更时，整个组件都会被重新渲染；
2. **JSX**：在React的`render`方法中，能把HTML元素直接写到JS中的写法，这样的写法就叫做**JSX**。其实质上是把HTML编译成了JS。
3. **虚拟文档对象模型（ *Virtual DOM* ）**：在React开发中，不需要直接去操作DOM节点，每个组件都是用Virtual DOM渲染的，它和DOM的一大区别就是它采用了更高效的渲染方式——组件的DOM结构映射到Virtual DOM上，当需要重新渲染组件时，React在Virtual DOM上实现了一个Diff算法，通过这个算法寻找需要变更的节点，再把里面的修改更新到实际需要修改的DOM节点上，这样就避免了渲染整个DOM带来的巨大消耗。

### JSX
React是基于组件的，组件自然而然和模板相连，为了让逻辑和模板能够互相联系，就出现了JSX这种写法。
<br>
JSX编译器吧类似HTML的写法转换成原生的JS方法，并且会将传入的属性转化为对应的对象。它能把标签类型的写法转换成ReactElement。如下：
```javascript
//JS中直接写HTML
let ele = <div title = "mytitle">mytitle</div>  

//JSX编译转化后
let ele = React.creatElement("div", {title: "mytitle"}, "mytitle")  
```
#### 渲染方式
React既可以渲染HTML类型的标签，也可以渲染React的组件。
<br>
**HTML类型**的标签，用小驼峰的方式书写，且注意当要写标签的类名时，需要写成`className`而不能直接写成`class`，因为`class`是JS中的保留字。
```javascript
import React from "react";

let divElement = <div className = "foo" />  //标签内容为空的时候可以直接这么写
//上面的语句等同于：
let divElement = React.creatElement("div", {className: "foo"});
```
**React组件**的标签直接用大驼峰书写：
```javascript
import React from "react";
class Headline extends React.component {
  render(){
    return <h1>Hello React</h1>;
  }
}
let headline = <Headline />;  //等同于: let headline = React.creatElement("Headline");
```
**用大小驼峰的写法是为了区分一个标签元素到底是HTML标签还是React组件标签。**

#### 组件JSX内部
很多情况下都要向组件的JSX内部传入JS表达式，那么就要用到花括号`{}`，花括号里面的代码会直接按照JS代码进行处理。例子来自《React全栈》。
```javascript
const MyComponent;
let isLoggedIn = true;
let app = <MyComponent name = {isLoggedIn ? "Viking" : "please login"}/>
```
子组件表达式如下：
```javascript
const MyComponent, LoginForm, Nav;
let isLoggedIn = true;
let app = <MyComponent>{isLoggedIn? <Nav /> : <LoginForm />}</MyComponent>
```
当省略一个属性的值时，JSX会默认其值为`true`。
```javascript
let myBtn = <input type = "button" disabled />
//等同于
let myBtn = <input type = "button" disabled = {true} />
```





