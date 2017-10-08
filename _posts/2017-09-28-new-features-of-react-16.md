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
>本文翻译自[React16的官方博文](https://reactjs.org/blog/2017/09/26/react-v16.0.html) <i class="fa fa-external-link" aria-hidden="true"></i>。

我们很高兴地宣布：React v16.0发布啦！在该版本中对一些长期存在的特性请求进行了更改，包括`fragments`，`error boundaries`，`portals`，~~对于`custom DOM attributes`的支持，提升了`server-side rendering`，以及`reduced file size`~~对于自定义DOM属性的支持，提升了服务端渲染性能，以及减少了React文件包的大小。

### render的新返回类型：片段（fragments）与字符串（strings）
现在组件的 `render` 方法能够返回由元素组成的数组。和其他数组一样，为了避免对key的警告，需要为每个元素添加一个key值：
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

`render` 方法也同时支持返回字符串啦：
```javascript
render() {
  return 'Look ma, no spans!';
}
```
`render` 方法能够返回的所有类型见[React官方文档——render条目](https://reactjs.org/docs/react-component.html#render)<i class="fa fa-external-link" aria-hidden="true"></i>。

### 更棒的错误处理机制
之前，在渲染期间的运行报错可能会让React处于一个分裂的状态：生成隐秘的错误信息同时要求恢复刷新页面。为了解决这个问题，React 16使用了一种更为弹性化的错误处理策略。默认地，如果某个错误在一个组件渲染或生命周期方法内抛出，那么整个组件树将会从根部被卸载。这样就能防止无用的数据显示出来。然而，该种方法的用户体验并不理想。

这时我们就需要用到 `error boundary`（暂且译成错误边界），而不是每当报错时卸载整个应用。错误边界是一种特殊的组件，它能抓取子树内的错误，并在其位置处显示一个回退的UI。可以把错误边界理解成像try-catch一样的语句，只不过它是用于React组件的。

想要了解更多信息，点击[React官方博文——error handing in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)<i class="fa fa-external-link" aria-hidden="true"></i>。

### Portals
Portals提供了一种较好的方法，把子节点渲染到某个DOM节点中，该节点存在于父组件DOM层次结构之外。
```javascript
render() {
  // React*不会*创建一个新的div，它将把子节点渲染到`domNode`内。
  // 不管`domNode`在DOM中的位置如何，它都是有效的DOM节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  );
}
```

### 更棒的服务器端渲染
React 16完全重写了服务器的渲染方式，变得更加快速高效。它同时还支持流媒体，这样你就能够更快捷地向客户端发送数据。另外，多亏有了[新的打包策略](https://reactjs.org/blog/2017/09/26/react-v16.0.html#reduced-file-size)<i class="fa fa-external-link" aria-hidden="true"></i>来编译 `process.env` 检查，你不必再为了取得更好的服务器渲染效果而打包React了。

小组的核心成员 *Sasha Aickin* 写了一篇很赞的文章来描述[React 16在服务器端的渲染优化](https://medium.com/@aickin/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67)<i class="fa fa-external-link" aria-hidden="true"></i>。 *Sasha* ：React16的服务器渲染速度比React15快约3倍。“当与带有 `process.env` 编译的React15相比时，React16在Node4下大约有2.4倍的优化提升，在Node6下大约有3倍的优化表现，在最新的Node8.4下最多能达到3.8倍的提升。如果在不编译的情况下，对于最新版本的Node，React16在服务器端渲染上有巨大提升。

另外，React 16能更好地将HTML在服务器端渲染，一旦它传到客户端就进行“<u>注水</u>”（原文是<u>hydrating</u> ，这里可以理解成把单纯的数据加工成具有样式的较为美观的页面）。从服务器得到的结果不再需要通过初始渲染来进行准确的匹配，而是尽可能多地重复使用已存在的DOM。所以再也不需要校验了！一般来说，我们不建议在客户端和服务器上渲染不同的内容，但在某些情况下是可以这么做的（如，时间戳）。

想要了解更多内容，点击[React官方文档——ReactDOMServer](https://reactjs.org/docs/react-dom-server.html)<i class="fa fa-external-link" aria-hidden="true"></i>。

### 支持自定义DOM属性
现在，React能够把无法识别的HTML和SVG属性传递给DOM，而不是忽略他们（详见[React官方博文——DOM Attributes in React 16](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)<i class="fa fa-external-link" aria-hidden="true"></i>）。这样做能有额外的好处：允许我们摆脱大多数React的属性白名单，从而减少文件大小。

### 减少文件大小
尽管新增了上述功能，但实际上，React 16反而比15.6.1版本体积更小！
* `react`包的大小从20.7kb下降到5.3kb（gzip压缩后大小从6.9kb下降到2.2kb）。
* `react-dom`包的大小从141kb下降到103.7kb（gzip压缩后大小从42.9kb下降到103.7kb）。
* `react`+`react-dom`包总大小从161.7kb下降到109kb（gzip压缩后大小从49.8kb下降到34.8kb）。

这和前一版本相比，大小减少了32%（gzip压缩处理后的大小减少了30%）。

前后版本的文件大小差异有部分原因是打包方式的改变。React现在开始使用[Rollup](https://rollupjs.org/)<i class="fa fa-external-link" aria-hidden="true"></i>为每种不同目标格式创建扁平化的捆绑包，从而在大小和运行表现上都能胜出（和之前的版本相比）。扁平化的打包格式也意味着无论是使用Webpack，Browserify，预创建的UMD bundles，还是任何其他系统，也不管你如何传输app，React对捆绑包体积大小的影响基本一致。

### MIT许可协议
React 16使用MIT协议，同时我们也发布了使用MIT协议的React 15.6.2，让不便于马上升级的使用者使用。详情见[Facebook博文——Relicensing React, Jest, Flow, and Immutable.js](https://code.facebook.com/posts/300798627056246/relicensing-react-jest-flow-and-immutable-js/)<i class="fa fa-external-link" aria-hidden="true"></i>。

### 新的核心架构
React 16是第一个建立在新的核心架构（代号为“Fiber”）之上的React版本。你能在[Facebook博客](https://code.facebook.com/posts/1716776591680069/react-16-a-look-inside-an-api-compatible-rewrite-of-our-frontend-ui-library/)<i class="fa fa-external-link" aria-hidden="true"></i>上了解关于这个项目的一切。（剧透一下：我们重写了React！）

Fiber主要负责处理React 16中的新特性，如**error boundaries**和**fragments**。在接下来将要发布的版本中，你能如愿看到更多的新特性，因为我们要开始解锁React的潜力了。

我们工作过程中最让人兴奋的一块内容就是**异步渲染**（async rendering）——这是一种