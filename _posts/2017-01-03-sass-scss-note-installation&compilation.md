---
layout: post
title: Sass／SCSS——更高效的CSS生产方式（安装与编译）
date: 2017-01-03
categories: front-end
excerpt: 我们在写CSS的时候，肯定经常会碰到重复使用某属性或重复写一大段选择器的情况。那么能不能让这些重复性的东西只写一次，提升代码书写的愉悦感呢？只要掌握了Sass（SCSS），快速组织代码并编译为CSS文件，高效愉快不是梦。
tags: [CSS,SCSS,SASS]
description: Sass的学习过程记录
---
# 什么是Sass／SCSS
Sass（Syntactically Awesome Stylesheets)是CSS的扩展语言解析器，把CSS的生产方式变得像编程语言一样，写法更简洁，更易读，更有逻辑性。一旦接触，就不想再回去用冗长的CSS写样式了！
[Sass官方文档](http://www.sasschina.com)<i class="fa fa-external-link" aria-hidden="true"></i>对其特性与优势的简介，简单做一个概括：
* 是CSS的扩展语言解析器，完全兼容CSS语法
* 功能丰富，比其他CSS扩展语言具有更多的功能和特性
* 拥有广泛的社区资源（开发者+开源项目）
* 稳定、成熟，无数前端项目都用Sass构建

**这么好的东西还有什么理由拒绝呢？**

### 安装步骤
#### 安装Ruby及RubyGems
**Window系统**点<i class="fa fa-link" aria-hidden="true"></i>[这里](/2017/02/25/own-your-github-pages/#1安装ruby环境)，根据步骤1. 2. 操作
<br>
**Mac系统**点<i class="fa fa-link" aria-hidden="true"></i>[这里](/2017/02/25/own-your-github-pages/#1更新ruby环境)，根据步骤1. 2. 操作

#### 安装Sass
打开终端或命令行，输入
```terminal
$ gem install sass
```
输入后，出现以下提示：
```
Successfully installed sass-3.4.23
Parsing documentation for sass-3.4.23
Done installing documentation for sass after 3 seconds
1 gem installed
```
说明安装成功。为了保险起见，再输入以下命令检查当前安装的版本：
```terminal
$ sass -v
```
当返回类似`Sass 3.4.23 (Selective Steve)`的信息时，可以保证安装已经成功。

如果需要帮助可以用帮助命令：
```terminal
$ sass -h
```

### 文件编译
Sass文件有两种后缀名，一种是`.sass`，还有一种是`.scss`。*SCSS* 是 *Sass 3* 新加入的语法，SCSS的写法与CSS几乎相同，十分好上手，所以直接学习SCSS的语法。
那么如何来编译Sass文件，使其生成CSS文件呢？见下。

#### 1.单文件编译
由`style.scss`文件编译生成`style.css`文件
```terminal
$ sass style.scss style.css
```

#### 2.单文件监听
当所监听的`style.scss`文件作出更改操作后，`style.css`也会自动编译并进行相应更改
```terminal
$ sass --watch style.scss:style.css
```

#### 3.文件夹监听
监听SCSS文件所在的`sassDir`目录及CSS文件所在的`cssDir`目录
```terminal
$ sass --watch sassDir:cssDir
```
#### 4.常用配置：--style
使用方法如下：
```terminal
$ sass --style compressed style.sass style.css
// 或结合监听命令
$ sass --watch style.sass:style.css --style compressed  
```
该配置可以生成不同代码风格的CSS文件，分别为`nested`、`expanded`、`compact`、`compressed`：
```css
/*--style nested
 *带缩紧，类似java的风格大括号风格
 */
#content {
  font-size: 14px;
  color: red;}
  #content p {
    font-size: 12px;
    display:inline-block; }

#nav {
  font-size: 16px;
  color: white; }

/*--style expanded
 *常用的css风格
 */
#content {
  font-size: 14px;
  color: red;
}
#content p {
  font-size: 12px;
  display:inline-block; 
}

#nav {
  font-size: 16px;
  color: white; 
}

/*--style compact
 *较精简的风格，同一个选择器下的属性均在一行内
 */
#content { font-size: 14px; color: red;}
#content p { font-size: 12px; display:inline-block; }

#nav { font-size: 16px; color: white; }

/*--style compressed
 *压缩的css代码
 */
#content{font-size:14px;color:red;}#content p{font-size:12px;display:inline-block;}#nav{font-size:16px;color:white;}
```

### 继续学习语法
请点击下方NEXT POST。