---
layout: post
title: 解决node-sass安装后编译报错的问题
date: 2017-12-04
categories: npm
excerpt: 之前学了Sass，所以习惯使用SCSS来写样式。在前端自动化工具对其进行编译时会用到node-sass这个node package，从网络上检索到的各种问题来看，在安装它的时候很多人都碰到了不同坑，这里我就讲讲自己碰到的一个坑。
tags: [NODE,NPM,NODE-SASS,SASS]
description: 解决node-sass编译报错问题。
---
# 前情
初学 React 的时候，也使用过 Sass 写样式，当时安装 `node-sass`, `sass-loader` 并对 webpack 配置之后，并没有遇到问题。最近在尝试使用 `dva` + `antd` 写demo。`dva` 搭配使用一个叫 `roadhog` 的 cli 工具，要开启对 Sass 的支持只需要在其配置文件 `.roadhogrc` 中配置：
```javascript
{
    //...其他配置
    "sass": "true",
}
```
然后用 npm 安装 `node-sass` 和 `sass-loader` 两个包就可以了。但是事情并没有那么简单。

### 问题描述
在组件中直接 `import` SCSS 文件，然后开启 dev server 预览，发现直接报错：
![node-sass报错](http://ol8wwjflh.bkt.clouddn.com/20171204-node-sass-issue.png)

### 抓重点
仔细读一遍报错信息，并划重点：
>Module build failed: Error: **Missing binding** /Users/winjeysong/Documents/feedback_page/node_modules/node-sass**/vendor/darwin-x64-48/binding.node**

这样我就知道是丢失了一个 `.../darwin-x64-48/binding.node` 的文件导致的报错，那么问题就变得明了：找到这个文件，下载，拖入 `/vendor` 目录下就可以了。

### 解决过程
#### 1.检索相关问题
碰到问题，一般会先百度或者谷歌，但是这样针对性不够，不妨直接去 Github 找到 [node-sass 的仓库](https://github.com/sass/node-sass)<i class="fa fa-external-link" aria-hidden="true"></i>，看看里面有没有类似的 issue。一搜关键字，没想到还真有跟我几乎同样的问题 [#2148](https://github.com/sass/node-sass/issues/2148)<i class="fa fa-external-link" aria-hidden="true"></i> ：
![类似的node-sass问题](http://ol8wwjflh.bkt.clouddn.com/20171204-node-sass-issue-2.png)

#### 2.验证
在该 issue 下 [@saper](https://github.com/saper) 给出了两种解决方法，并且题主 [@boochamoocha](https://github.com/boochamoocha) 也进行了验证，并说明了哪种方法可行，如下图。
![解决方法](http://ol8wwjflh.bkt.clouddn.com/20171204-node-sass-issue-3.png)
这也验证了我之前的推测是正确的，只要把相应 binary（二进制）文件放到 `/vendor` 下就可以了。

#### 3.实施
这一步我总共尝试了三次，全部记录如下：
1. 在 node-sass 仓库的 `README` 中检索关键字“**binary**”，发现了一个 **Rebuilding binaries** 条目：
![尝试一](http://ol8wwjflh.bkt.clouddn.com/20171204-node-sass-issue-4.png)
这个条目主要是告诉我们怎么重新生成一个 binary 文件（根据不同OS）。我照着图中的步骤执行命令，在 `/node-sass/vendor` 目录下生成了一个 binary 文件，我把该文件移动到项目中的 `/node_modules/node-sass/vendor` 目录下，还是报错，和之前错误一样。遂尝试第二种方法；
2. 一番摸索之后，在 node-sass 仓库的 [Releases 页面](https://github.com/sass/node-sass/releases)<i class="fa fa-external-link" aria-hidden="true"></i> 下找到了各种版本的 `binding.node` 文件，这下总能完美解决了吧？然而又被打脸了，这个页面的内容下载巨慢无比（速度基本是0），挂全局SS还是毫无起色。似乎是因为 Github Release 中的下载项都放在亚马逊的云平台上，而国内访问不能。这种方法也只能放弃了。
3. 又花了很多时间，东摸西找，在 [@sass](https://github.com/sass) 的所有仓库中找到了一个名为 [node-sass-binaries 的仓库](https://github.com/sass/node-sass-binaries)<i class="fa fa-external-link" aria-hidden="true"></i>，找到里面包含有 `darwin-x64-48`（根据 <i class="fa fa-link" aria-hidden="true"></i>[前面](#抓重点)的提示）的文件，下载，由于仓库是直接托管在 Github 的，所以终于能下载了：
![尝试三](http://ol8wwjflh.bkt.clouddn.com/20171204-node-sass-issue-5.png)
随后在项目的 `/vendor` 目录下新建一个名为 `/darwin-x64-48` 的目录，并把下载的文件重命名为 `binding.node`。重新开启 dev server，发现已经能编译SCSS文件了。