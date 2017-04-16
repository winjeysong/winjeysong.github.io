---
layout: post
title: Sass／SCSS的实战演练
date: 2017-01-11
categories: front-end
excerpt: 终于把SCSS语法学得七七八八了，是时候用个小Demo来实践一下了。这个Demo来自于百度前端学园的一个初级任务，需要仿写Bootstrap的栅格 (Grid) 。栅格功能的CSS代码中正好有很多重复书写的部分，极度适合用SCSS来简化代码。
tags: [CSS,SCSS,SASS]
description: Sass的学习过程记录
---
# 用SCSS仿写Bootstrap Grid
可以通过查看Bootstrap的官方文档或CSS源码来理解栅格 (Grid) 的原理。
所要实现的具体要求看[这里](http://ife.baidu.com/2016/task/detail?taskId=8)<i class="fa fa-external-link" aria-hidden="true"></i>

### 最终效果
使用Codepen进行[预览](https://codepen.io/winjeysong/full/MmYNMY/)<i class="fa fa-external-link" aria-hidden="true"></i>。通过调整窗口大小来检验最终效果是否符合要求。

### SCSS代码
HTML和编译后的CSS代码均可在Codepen中直接查看。SCSS代码可以从[这里](https://raw.githubusercontent.com/winjeysong/ife2016/master/task/task_1_8_1/style.scss)<i class="fa fa-external-link" aria-hidden="true"></i>查看，或者直接看下面。
```scss
/* A simulation of bootstrap for ife task 1-8.
 * winjeysong
 * 2017.4
 */

/*variable*/
$pkg-padding: 10px;
$content-height: 50px;
$line-height: $content-height;
$content-border: 1px solid #999;
$content-bg-color: #EEE;

/*prefix for border-box*/
@mixin border-box {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

/*clear floats with pseudo-elements*/
@mixin clear-float {
    clear: both;
    content: "";
    display: table;
}

/*style of .package*/
@mixin pkg-style {
    float: left;
    padding: $pkg-padding;
    @include border-box;
}

/*style of .content*/
@mixin content-style {
    height: $content-height;
    line-height: $line-height;
    border: $content-border;
    background-color: $content-bg-color;
    text-align: center;
}

/*grid*/
@mixin add-grid($size) {
    @for $i from 1 through 12 {
        .#{$size}-#{$i} {
            width: 100% / 12 * $i;
        }
        .#{$size}-#{$i} > .content:after{
            content: $i+"栏";
        }
    }
}


/*css*/
* {
    margin: 0;
    padding: 0;
}

.main {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
}

.main:before,.main:after {
    @include clear-float;
}

.package {
    @include pkg-style;
}

.content {
    @include content-style;
}

@media (min-width: 769px) {
    @include add-grid(md);
}

@media (max-width: 768px) {
    @include add-grid(sm);
}

```

重新阅读一遍代码，其中重要的部分就是栅格的生成部分。直接命名一个`add-grid`的混合器，含有一个参数`$size`，混合器内有一个从1到12的变量`$i`。
<br/>这样，在用`@include`时就可以编译生成各种尺寸的栅格，比如`@include add-grid(md)`的效果就是编译生成从`.md-1`到`.md-12`的样式，并且因为代码`.#{$size}-#{$i} > .content:after{content: $i+"栏";}`生成的样式，还会有相应内容提示当前栏数。