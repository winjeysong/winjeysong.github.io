---
layout: post
title: 9月26日发布的React16新特性（已翻译）
date: 2017-09-28
categories: front-end
excerpt: Facebook于9月26日发布了React16，这些新特性虽然不会立马用上，但是本着与时俱进的精神，边读边把它翻译下来，以备不时之需。
tags: [REACT,JAVASCRIPT]
description: React16新特性。
---
# React v16.0
>本文翻译自[React16的官方博文](https://reactjs.org/blog/2017/09/26/react-v16.0.html)<i class="fa fa-external-link" aria-hidden="true">。

我们很高兴地宣布：React v16.0发布啦！在该版本中对一些长期存在的特性请求进行了更改，包括`fragments`，`error boundaries`，`portals`，~~对于`custom DOM attributes`的支持，提升了`server-side rendering`，以及`reduced file size`~~对于自定义DOM属性的支持，提升了服务端渲染性能，以及减少了React文件包的大小。

### render的新返回类型：片段（fragments）与字符串（strings）
现在组件的`render`方法能够返回由元素组成的数组。和其他数组一样，为了避免对key的警告，需要为每个元素添加一个key值：
```javascript
render() {
  // 无需再将列表项包裹在一个额外的父元素中啦!
  return [
    // 不要忘了添加key :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

将来，我们可能会给JSX增加一种片段语法，使其不再需要添加key。

`render`方法也同时支持返回字符串啦：
```javascript
render() {
  return 'Look ma, no spans!';
}
```
`render`方法能够返回的所有类型见[React官方文档——render条目](https://reactjs.org/docs/react-component.html#render)<i class="fa fa-external-link" aria-hidden="true">。

### 更棒的错误处理机制
之前，在渲染期间的运行报错可能会让React处于一个分裂的状态：生成隐秘的错误信息同时要求恢复刷新页面。