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
