---
layout: post
title: 使用webpack打包模块
date: 2017-05-16
categories: front-end
excerpt: webpack是一款前端模块的打包工具，同时也是React官方推荐，作为它的项目打包工具来使用。所以在学习React之前对webpack的一些基础知识进行梳理，能有助于后面更好地运用webpack来打包React模块。
tags: [WEBPACK,JAVASCRIPT,REACT]
description: webpack基础知识记录
---
# webpack概述
随着前端项目越来越复杂，项目的模块化就显得更加重要，而模块打包( *module bundler* )就是比较重要的一环。React官方也推荐使用webpack来打包模块，主要是因为其功能强大，配置灵活方便，它还具有酷炫的代码拆分功能，能够将规模较大的Web项目代码拆分为多个块，每个块包含一个或多个模块，这样它们就能够被按需地异步加载。

### 安装过程
#### 1.安装Node.js环境
在[Node.js官网](https://nodejs.org/en/download/)<i class="fa fa-external-link" aria-hidden="true"></i>下载对应自己系统的安装包，并进行安装，该包会将**Node.js环境**和**npm包管理工具**一并安装。安装完成后在终端内输入：
```terminal
$ node -v
$ npm -v
```
如果出现版本号，则说明安装成功。
#### 2.使用npm安装webpack
在终端内输入以下命令，下载最新稳定版本的webpack，并安装在全局。
```terminal
$ npm install webpack -g
```
安装完成后检查是否安装，如果出现版本号则说明已安装成功。
```terminal
$ webpack -v
```

### 初步认识
先通过一个简单的示例来熟悉webpack到底是如何进行打包工作的（示例来自*《React全栈》张轩，杨寒星著*），该示例包含两个模块：hello.js和index.js。新建一个**文件夹demo1**并创建下面三个文件，注意关键字`module.exports`和`require`，前者是被依赖的模块进行导出，后者用来导入依赖模块。
<br>
**hello.js模块：**
```javascript
module.exports = "Hello world!";
```
**index.js模块：**
```javascript
var text = require("./hello");
document.write(text);
```
**index.html页面：**
```html
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>helloworld</title>
  </head>
  <body>
    <script src="./bundle.js"></script>
  </body>
</html>
```
创建完成后，打开**index.html**页面，发现并没有内容。若要让**hello.js**中的内容在页面上显示出来，就要用到webpack进行模块打包，先将目录定位到**demo1文件夹**下，然后使用`webpack`命令即可。
```terminal
$ cd .../demo1
$ webpack index.js bundle.js
```
`webpack`命令会将**index.js**作为入口文件，输出打包文件**bundle.js**，可以看到在**demo1目录**下新生成了一个**bundle.js**文件。最终文件结构如下图：
![文件结构](http://ol8wwjflh.bkt.clouddn.com/1.png)
现在再打开**index.html**，发现页面已经显示了内容：“Hello world!”。
![显示内容](http://ol8wwjflh.bkt.clouddn.com/2.png)

### 使用loader
webpack本身只能处理JS模块，若要处理其他类型的模块，就要用到loader。loader是webpack中一个比较重要的功能，它能进行代码的转换：接收原代码并返回新的代码。
<br>
如果想要将CSS文件作为依赖，则要引入两个loader：**style-loader**和**css-loader**。先创建一个**新目录demo2**并定位到该目录下，输入以下命令：
```terminal
$ cd .../demo2
$ npm install style-loader css-loader
```
这样就会在当前目录下创建一个**node_modules目录**，作为**style-loader**和**css-loader**的安装目录。安装完两个loader之后，再创建以下文件：
<br>
**index.css:**
```css
div {
    background-color: #888;
    width: 90%;
    height: 200px;
}
```
**index.js:**
```javascript
require("style-loader!css-loader!./index.css");
document.body.appendChild(document.createElement("div"));
document.getElementsByTagName("div")[0].innerHTML="打包成功！"
```
**index.html:**
```html
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>cssbundle</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
在**index.js**中，代码`style-loader!css-loader!`用来指定特定的loader，让它们对**index.css**进行处理。
<br>
完成以上操作后，执行webpack命令：
```terminal
$ webpack index.js bundle.js
```
打开**index.html**之后就可以看到效果：
![显示内容](http://ol8wwjflh.bkt.clouddn.com/3.png)

### 配置文件
每次打包都要指定入口文件和输出文件，且每次使用loader时还需要指定，造成很多重复性工作，而使用配置文件就能避免这些让人烦恼的东西。
<br>
配置文件的默认名为**webpack.config.js**，一个最简单的配置文件包括以下内容：
* entry：项目的入口文件
* output：输出结果的字段描述，如
<br>
`path`：输出目录;<br>
`filename`：输出文件名;<br>
`publicPath`：输出目录所对应的外部路径（线上）。
* module：`module.loader`是对模块中使用的loader进行的配置，它是一个数组对象，数组的每一项指定一个规则。
<br>
`test`：用正则表达式匹配被依赖模块的名称;<br>
`loaders`：若某一**被依赖模块**的名称匹配`test`中的正则表达式，则对**依赖模块**依次使用`loaders`中的loader进行代码转换。

还是用demo2中的例子，最终的**webpack.config.js**配置文件如下：
```javascript
var path = require("path");
module.exports = {
  entry: path.join(__dirname, "index"),
  output: {
    path: __dirname,
    filename: "bundle.js"
    //publicPath: 由于示例不作线上打包，所以不用配置该项
  },
  module: {
    loaders: [
      {
        test: /\.css$/,  //匹配css文件
        loaders: ["style-loader", "css-loader"]  //对目录下的css文件使用这两个loader
      }
    ]
  }
}
```
为了方便阅读，重新贴出demo2的代码，并作出修改：**index.js**中不用再写`style-loader!css-loader!`了。
**index.css:**
```css
div {
    background-color: #888;
    width: 90%;
    height: 200px;
}
```
**index.js:**
```javascript
require("./index.css");  //修改处
document.body.appendChild(document.createElement("div"));
document.getElementsByTagName("div")[0].innerHTML="打包成功！"
```
**index.html:**
```html
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>cssbundle</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
先在目录下安装**style-loader**和**css-loader**
```terminal
$ npm install style-loader css-loader
```
再使用webpack命令打包，由于已经有配置文件，所以只需输入：
```terminal
$ webpack
```
这样webpack会默认从**webpack.config.js**文件中读取配置，完成打包，十分方便。最终目录列表如下：
![目录列表](http://ol8wwjflh.bkt.clouddn.com/4.png)