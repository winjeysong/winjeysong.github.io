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

#### JSX内部
##### 1.JS表达式
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
##### 2.注释
在JSX中使用注释，写法仍和JS相同，但是要用花括号包裹起来：
```javascript
let component = {
  <div>
    {/*这里是注释部分*/}
    <Headline />
  </div>
}
```

#### 属性扩散
当组件有很多属性时，可以这么写：
```javascript
const profile;
let name = "Viking", age = "10", gender = "Male";
let component = <Profile name = {name} age = {age} gender = {gender} />
```
而当属性更多时，这样写就显得有些繁杂，所以可以用一种更简单的方式：
```javascript
const Profile;
let props = {
  name: "Viking",
  age: 10;
  gender: "Male"
};
let component = <Profile {...props} />;
//用到了ES6中的展开操作符（...），这样就简化了前面的写法
```
**需要注意的是，后面的属性会覆盖前面的属性。**比如：
```javascript
const Profile;
let props = {
  name: "Viking",
  age: 10;
  gender: "Male"
};
let component = <Profile {...props} name = "Viking2" />;  
console.log(component.props.name);  //Viking2
```

#### JSX的编译
对JSX进行编译的一种方式是在HTML中引入Facebook提供的工具**JSXTransformer**，但是这种方法是通过浏览器进行编译处理的，会影响到整个页面的效率。
<br>
所以更好的方法是使用**React + webpack + Babel**来搭建一个完整的开发环境，在下一个小节具体说明。

### 搭建React开发环境
<i class="fa fa-link" aria-hidden="true"></i>[前文](/2017/05/16/summary-of-webpack)已经讲过关于webpack的配置，再次确认是否已经安装好了**webpack**和**webpack-dev-server**（它是一个基于Express框架的Node.js服务器，提供了一个客户端的运行环境，方便开发者进行开发与调试）。如果没有，在终端内输入命令进行全局安装：
```terminal
$ npm install webpack webpack-dev-server -g
```
完成后创建一个项目目录**proj**，定位到该目录下，并生成一个**package.json**的文件：
```terminal
$ mkdir proj
$ cd proj
$ npm init --yes
```
#### 配置Babel
Babel除了能把ES6标准的代码编译成通用版本的代码之外，还可以支持React的一些特性，如JSX语法。
<br>
这里需要安装**babel-core**和**babel-loader**两个包，在proj目录下：
```terminal
$ npm install babel-core babel-loader --save-dev
```
再安装ES6和React语法支持：
```terminal
$ npm install babel-preset-es2015 babel-preset-react --save-dev
```
完成后在**proj**目录下新建一个`.babelrc`的空文件，用来配置Babel的规则。打开该文件，并编辑输入以下内容：
```json
{
  "presets": ["es2015", "react"]
}
```
该配置指定了编译JS时要用到的两个Babel插件。

#### 配置ESLint
**ESLint**用来规范代码的书写，可自由配置规则，又有第三方的插件，且同时支持ES6和JSX语法。
<br>
要用到ESlint，需要添加**eslint-loader**：
```terminal
$ npm install eslint eslint-loader --save-dev
```
这里直接使用第三方配置的规则——**eslint-config-airbnb**（还包括三个插件：import, react, jsx-ally），输入以下命令：
```terminal
$ npm install eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y --save-dev
$ npm install eslint-config-airbnb --save-dev
```
完成后像Babel一样继续配置，在目录**proj**下新建一个`.eslintrc`文件，输入内容：
```json
{
  "extends": "airbnb",  //直接继承airbnb的规则
  "rules": {  //自定义的规则
    "comma-dangle": ["error", "never"]  //该项更改了原来的规则，使对象或数组的最后一项之后不用再加逗号
  }
}
```

#### 通过webpack结合Babel和ESLint
配置好Babel和ESLint之后，通过webpack将它们结合起来。在这之前，先安装一个webpack插件——**html-webpack-plugin**，它的作用是自动生成HTML页面，并引入正确的JS文件依赖，输入以下命令安装它：
```terminal
$ npm install html-webpack-plugin --save-dev
```
然后在proj目录下新建一个**app**文件夹和一个**webpack.config.js**文件