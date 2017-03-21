---
layout: post
title: Jekyll下实现代码高亮
date: 2017-02-20
categories: github-pages
excerpt: 用GitHub的静态页面来写个人博客是一种很便捷的方式，不需要管理服务端，只需关注博客内容。静态页面本身基于Jekyll，在博客内容中想要使代码像在各编辑器内一样高亮，就需要借助相关插件。
tags: [GITHUB,HIGHLIGHT,JEKYLL,ROUGE]
description: 使用Rouge实现代码高亮。
---
# Rouge代码高亮
Jekyll下能使用的高亮插件（*Pygments*，*Highlight.js*等）很多，这里我只选了自己在使用的[Rouge](https://github.com/jneen/rouge)<i class="fa fa-external-link" aria-hidden="true"></i>进行介绍。
### 引入配置文件
在*_config.yml*中增加两行配置，使Markdown的解析器为*Kramdown*，高亮插件为*Rouge*。
```yaml
markdown: kramdown
highlighter: rouge
```
### 引入高亮样式
在终端下使用命令：
```
rougify style monokai.sublime > rouge.css
```
会在当前项目的根目录下生成一个*rouge.css*文件，将该文件引入项目文件的`head`标签下即可。
### 自定义高亮样式
由于每个人的个人站点风格不同，所以需要对自己的高亮样式风格作微调。以下是我调整后的样式代码，小伙伴也可以直接复制引入到自己的高亮样式中，进行相应修改，来打造匹配自己博客风格的样式。
```css
  .highlight table td { padding: 5px; }
  .highlight table pre { margin: 0; }
  .highlight .gh {
    color: #999999;
  }
  .highlight .sr {
    color: #f6aa11;
  }
  .highlight .go {
    color: #888888;
  }
  .highlight .gp {
    color: #555555;
  }
  .highlight .gs {
  }
  .highlight .gu {
    color: #aaaaaa;
  }
  .highlight .nb {
    color: #f6aa11;
  }
  .highlight .cm {
    color: #75715e;
  }
  .highlight .cp {
    color: #75715e;
  }
  .highlight .c1 {
    color: #888;
    font-style:italic;
  }
  .highlight .cs {
    color: #75715e;
  }
  .highlight .c, .highlight .cd {
    color: #75715e;
  }
  .highlight .err {
    color: #960050;
  }
  .highlight .gr {
    color: #960050;
  }
  .highlight .gt {
    color: #960050;
  }
  .highlight .gd {
    color: #49483e;
  }
  .highlight .gi {
    color: #49483e;
  }
  .highlight .ge {
    color: #49483e;
  }
  .highlight .kc {
    color: #66d9ef;
  }
  .highlight .kd {
    color: #66d9ef;
  }
  .highlight .kr {
    color: #66d9ef;
  }
  .highlight .no {
    color: #66d9ef;
  }
  .highlight .kt {
    color: #66d9ef;
  }
  .highlight .mf {
    color: #ae81ff;
  }
  .highlight .mh {
    color: #ae81ff;
  }
  .highlight .il {
    color: #ae81ff;
  }
  .highlight .mi {
    color: #ae81ff;
  }
  .highlight .mo {
    color: #ae81ff;
  }
  .highlight .m, .highlight .mb, .highlight .mx {
    color: #ae81ff;
  }
  .highlight .sc {
    color: #ae81ff;
  }
  .highlight .se {
    color: #ae81ff;
  }
  .highlight .ss {
    color: #ae81ff;
  }
  .highlight .sd {
    color: #e6db74;
  }
  .highlight .s2 {
    color: #e6db74;
  }
  .highlight .sb {
    color: #e6db74;
  }
  .highlight .sh {
    color: #e6db74;
  }
  .highlight .si {
    color: #e6db74;
  }
  .highlight .sx {
    color: #e6db74;
  }
  .highlight .s1 {
    color: #e6db74;
  }
  .highlight .s {
    color: #e6db74;
  }
  .highlight .na {
    color: #a6e22e;
  }
  .highlight .nc {
    color: #a6e22e;
  }
  .highlight .nd {
    color: #a6e22e;
  }
  .highlight .ne {
    color: #a6e22e;
  }
  .highlight .nf {
    color: #a6e22e;
  }
  .highlight .vc {
    color: #ffffff;
  }
  .highlight .nn {
    color: #ffffff;
  }
  .highlight .nl {
    color: #ffffff;
  }
  .highlight .ni {
    color: #ffffff;
  }
  .highlight .bp {
    color: #ffffff;
  }
  .highlight .vg {
    color: #ffffff;
  }
  .highlight .vi {
    color: #ffffff;
  }
  .highlight .nv {
    color: #ffffff;
  }
  .highlight .w {
    color: #ffffff;
  }
  .highlight {
    color: #ffffff;
  }
  .highlight .n, .highlight .py, .highlight .nx {
    color: #ffffff;
  }
  .highlight .ow {
    color: #f92672;
  }
  .highlight .nt {
    color: #f92672;
  }
  .highlight .k, .highlight .kv {
    color: #f92672;
  }
  .highlight .kn {
    color: #f92672;
  }
  .highlight .kp {
    color: #f92672;
  }
  .highlight .o {
    color: #f92672;
  }
```