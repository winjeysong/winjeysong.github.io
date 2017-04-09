---
layout: post
title: Sass／SCSS——更高效的CSS生产方式（语法及说明）
date: 2017-01-04
categories: front-end
excerpt: 知道了工具的原理，接下来就应该去学习怎么用好这个工具。既然之前已经安装好了Sass并了解了如何编译Sass，那么就开始快速吸收它的语法吧，因为它真的简单容易好上手。
tags: [CSS,SCSS,SASS]
description: Sass的学习过程记录
---
# Sass(SCSS)语法学习
Sass(SCSS)的语法主要包括以下几个部分：
* 变量的声明赋值与引用
* 更简明的嵌套结构
* 外部导入Sass文件
* 强大的混合器
* 选择器的继承

**⚠注意：** 下文编译后的CSS文件样式默认为`expanded`。(生产用最好选择压缩的`compressed`)

### 变量的使用
在Sass中引入变量，把重复性的属性值直接定义为一个变量，在需要的的时候引用即可。最好为变量起一个**明了**的名字，这样可以使被定义属性值更具**可读性**，方便后续的代码查阅与修改。

#### 变量声明与赋值
很简单，只需要如下操作，即可将属性值赋值给一个变量。**只要是CSS属性值，就可以赋值给Sass的变量。**
```scss
$title-color: #39F;
```

#### 变量引用
##### 常规引用
仅仅声明赋值变量是没有实际作用的，还需要对变量进行引用：
```scss
$title-color: #39F;
$title-size: 30px;
h1 {
  color: $title-color;
  font-size: $title-size;
  border: 1px solid $title-color;
}
```
在`h1`选择器下，`color`引用了变量`$title-color`，得到其值——`#39F`。其他变量的引用同理。编译后的CSS如下：
```css
/*编译后*/
h1 {
  color: #39F;
  font-size: 30px;
  border: 1px solid #39F;
}
```

##### 引用其他变量
当然，变量值还可以引用其他的变量，如下示例：
```scss
$title-color: #39F;
$title-border: 1px solid $title-color;
h1 {
  color: $title-color;
  border: $title-border;
}
```
这里的`border`先引用了`$title-border`，得到其值——`1px solid $title-color`，该值又引用了`$title-color`，得到值`#39F`。编译后的CSS如下：
```css
/*编译后*/
h1 {
  color: #39F;
  border: 1px solid #39F;
}
```

#### “块级作用域”
Sass有类似**块级作用域**的语法，我这里就不规范地将其称为“块级作用域”。即，定义在“块”（用大括号`{ }`包裹的部分）之间的变量只能在该“块”内使用。
```sass
$title-color: #39F;
h1 {
  $width: 300px;
  width: $width;
  color: $title-color;
}
```
这里的变量`$width`只能在`h1`下引用，而`title-color`的引用不受限制。
```css
/*编译后*/
h1 {
  width: 300px;
  color: #39F;
}
```

### 选择器嵌套
选择器可嵌套的功能，能够使重复写CSS选择器的日子不复存在，节省不必要的重复代码。机械性的工作，让编译器来完成就好了。
#### 后代选择器
最常用的后代选择器嵌套方式如下：
```scss
#main-body {
  background-color: #E3E3E3;
  article{
    background-color: #FFF;
    h1{
      color: #404040;
    }
    p{
      font-size: 14px;
      color: #444;
    }
  }
  footer{
    background-color: 2D2D2D;
  }
}
```
编译后的CSS文件如下：
```css
/*编译后*/
#main-body {
  background-color: #E3E3E3;
}

#main-body article {
  background-color: #FFF;
}

#main-body article h1 {
  color: #404040;
}

#main-body article p {
  font-size: 14px;
  color: #444;
}

#main-body footer {
  background-color: #2D2D2D;
}
```

#### 用`&`替代父选择器
使用伪类选择器时，需要用到`&`（因为原先写在Sass文件里的嵌套结构，会默认在编译后的CSS文件中的前后代选择器之间增加一个空格，对伪类选择器不再适用），如下：
```scss
#main-body a {
  color: #444;
  &:hover {
    color: #39F;
  }
}
```
编译后，`&`的位置被父选择器`#main-body a`取代，从而：
```css
/*编译后*/
#main-body a {
  color: #444;
}

#main-body a:hover{
  color: #39F;
}
```

#### 群组选择器
如果用CSS来写群组选择器，需要在当前选择器前加上祖先选择器，且是每个都要加，像这样：
```css
#main-body nav, #main-body article, #main-body footer {
  margin: 0;
  padding: 10px;
}
```
这样重复的书写让人很不愉悦，有了Sass，只要像这样：
```scss
#main-body {
  nav, article, footer {
    margin: 0;
    padding: 10px;
  }
}
```
当然对于重复的子选择器，也可以这样写：
```scss
/*也可以这样*/
nav, article, footer{
  p {
    color: #444;
  }
}
```
编译后：
```css
/*编译后*/
nav p {
  color: #444;
}

article p {
  color: #444;
}

footer p {
  color: #444;
}
```

#### 其他选择器
CSS中还有子选择器`>`以及同辈相邻选择器`+`和同辈全选择器`~`，具体示例及说明如下：
```scss
article {
  margin-top: 15px;
  > h1 {
    color: #2D2D2D;
  }
  + footer {
    background: #EEE;
  }
  ~ article {
    margin: 8px;
  }
  dl > {
    dt {
      color: #2D2D2D;
    }
    dd {
      color: #444;
    }
  }
}
```
可以看出，这些选择器的结合符号（`>`, `+`, `~`）不仅可以跟在里层选择器的前面，还可以跟在外层选择器的后面。解析后：
```css
/*编译后*/
article {
  margin: 15px;
}

article > h1 {
  color: #2D2D2D;
}

article + footer {
  background: #EEE;
}

article ~ article {
  margin: 8px;
}

article dl > dt {
  color: #2D2D2D;
}

article dl > dd {
  color: #444;
}
```

### 属性嵌套
属性的嵌套和选择器的嵌套类似，极大地减少重复代码的书写，像下面这样：
```scss
.content {
  border: 1px solid #EEE {
    bottom: 2px;
  }
}
```
编译后：
```css
/*编译后*/
.content {
  border: 1px solid #EEE;
  border-bottom: 2px
}
```
只要是中间有“`-`”的属性（如`border-bottom`）都可以被这样嵌套式书写。

### 混合器`@mixin`的使用
混合器主要是用来复用大段重复的样式代码。使用标识符`@mixin`来定义重复样式，然后使用`@include`来引用该样式。
至于如何合理使用，而不滥用混合器，引用官方的说法：
>判断一组属性是否应该组合成一个混合器，一条经验法则就是你能否为这个混合器想出一个好的名字。如果你能找到一个很好的短名字来描述这些属性修饰的样式，那么往往能够构造一个合适的混合器。

简而言之就是，**能不能把某段重复的样式所表现的效果概括成词**，如果能，那么就可以用一个简单明了的名称把这段重复的样式构造成混合器。

#### 混合器常规使用
混合器中不仅可以包含属性，也可以包含选择器。像这样：
```scss
@mixin shadow-card {
  background-color: #EEE;
  article {
    -moz-box-shadow: 1px 1px 10px #DEDEDE;
    -webkit-box-shadow: 1px 1px 10px #DEDEDE;
    box-shadow: 1px 1px 10px #DEDEDE
  }
}

.content {
  color: #444;
  @include shadow-card;
}
```
编译后的CSS：
```css
/*编译后*/
.content {
  color: #444;
  background-color: #EEE;
}

.content article {
  -moz-box-shadow: 1px 1px 10px #DEDEDE;
  -webkit-box-shadow: 1px 1px 10px #DEDEDE;
  box-shadow: 1px 1px 10px #DEDEDE;
}
```

#### 带参数的混合器
混合器也可以带参数，用法和js的函数功能`function`十分相似。可以像这样使用：
```scss
/*定义含参的混合器*/
@mixin shadow-card-clr-change($bg-clr, $sd-clr) {
  background-color: $bg-clr;
  article {
    -moz-box-shadow: 1px 1px 10px $sd-clr;
    -webkit-box-shadow: 1px 1px 10px $sd-clr;
    box-shadow: 1px 1px 10px $sd-clr;
  }
}

/*传入参数*/
.content {
  color: #444;
  @include shadow-card-clr-change(#69C, #39F);
}
```
编译后：
```css
/*编译后*/
.content {
  color: #444;
  background-color: #69C;
}

.content article {
  -moz-box-shadow: 1px 1px 10px #39F;
  -webkit-box-shadow: 1px 1px 10px #39F;
  box-shadow: 1px 1px 10px #39F;
}
```
这样就可以很方便地定制样式。另外还可以给参数赋默认值（CSS属性值或对其他参数的引用），如下：
```scss
@mixin shadow-card-clr-change(
    $bg-clr, 
    $sd-clr,
    $ar-bg-clr: $bg-clr
  ) 
{
  background-color: $bg-clr;
  article {
    background-color: $ar-bg-clr;
    -moz-box-shadow: 1px 1px 10px $sd-clr;
    -webkit-box-shadow: 1px 1px 10px $sd-clr;
    box-shadow: 1px 1px 10px $sd-clr;
  }
}

.content {
  color: #444;
  @include shadow-card-clr-change(#69C, #39F);
}
```
这里由于变量`$ar-bg-clr`引用了变量`$bg-clr`的值，所以在传参时可以不传入它的值`@include shadow-card-clr-change(#69C, #39F)`。编译后：
```css
/*编译后*/
.content {
  color: #444;
  background-color: #69C;
}

.content article {
  background-color: #69C;
  -moz-box-shadow: 1px 1px 10px #39F;
  -webkit-box-shadow: 1px 1px 10px #39F;
  box-shadow: 1px 1px 10px #39F;
}
```

### 继承`@extend`
#### 常规用法
选择器A可以继承另一个选择器B的所有样式，且跟选择器B相关的组合选择器也会被继承。
何时使用**继承**也非常有讲究，不要跟**混合器**混用。继承是基于**类**的，从而考虑到它的使用应该使代码更具语义化。继承最好是应用到如下情况：一个类属于另一个类。可以看下面的示例。
```scss
.highlight {
  color: #FC0;
}

.xtrem-highlight {
  @extend .highlight;
  font-weight: bold;
}
```
正如开头所说，任何跟`.highlight`相关的样式也会被`.xtrem-highlight`所继承：
```css
.highlight a {
  color: #39F;
}
/*它也会被继承到.xtrem-highlight a*/
```
**⚠注意：**继承对于重复样式的作用原理和**变量**及**混合器**不同的地方在于，它不是对样式（或变量）的简单替换，而是对被继承类的补充。就如上面的`.highlight`选择器都会被`.highlight .xtrem-highlight`所替代，相关样式也会应用到被定义的类中。

#### 复杂选择器的继承
看下面这种情况：
```scss
.content.highlight {
  color: #FC0;
}

.xtrem-highlight {
  @extend .content.highlight;
  font-weight: bold;
}
```
那么`.xtrem-highlight`只会继承含有`.content.highlight`的选择器，如`h1.content.highlight`，而不会继承仅仅含有`.content`或`highlight`的选择器。

还有另外一种情况：
```scss
.highlight {
  color: #FC0;
}

#main-body .xtrem-highlight {
  @extend .highlight;
  font-weight: bold;
}
```
那么只有`#main-body .xtrem-highlight`才能继承`.highlight`。

### 小结
本文是根据官方文档再结合自己的实践所作出的总结。因为代码要多debug才能更快掌握，光看文档记住的东西是很难消化的，过一段时间就会遗忘。怎么把看过的东西变成自己的，非常重要。