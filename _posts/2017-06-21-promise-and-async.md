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
ES6中原生支持了两种Promise模式，能让我们更方便地构建异步代码。
### Promise.all([...])
由于在Promise链的执行过程中，当前只会有一个异步操作正在运行,即后一个步骤肯定会在前一个步骤结束后才会执行。
