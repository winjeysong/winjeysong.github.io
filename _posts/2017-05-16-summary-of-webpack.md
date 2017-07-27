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