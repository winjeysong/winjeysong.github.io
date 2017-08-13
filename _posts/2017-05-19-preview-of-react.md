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
>**注意：**下列用到的工具的版本：React@15.6.1，webpack@3.4.1，不同版本下的一些配置或语法可能会有不同。

### JSX
React是基于组件的，组件自然而然和模板相连，为了让逻辑和模板能够互相联系，就出现了JSX这种写法。
<br>
JSX编译器吧类似HTML的写法转换成原生的JS方法，并且会将传入的属性转化为对应的对象。它能把标签类型的写法转换成ReactElement。如下：
```javascript
//JS中直接写HTML
let ele = <div title = "mytitle">mytitle</div>  

//JSX编译转化后
let ele = React.creatElement("div", {title: "mytitle"}, "mytitle")  
```
#### 渲染方式
React既可以渲染HTML类型的标签，也可以渲染React的组件。
<br>
**HTML类型**的标签，用小驼峰的方式书写，且注意当要写标签的类名时，需要写成`className`而不能直接写成`class`，因为`class`是JS中的保留字。
```javascript
import React from "react";

let divElement = <div className = "foo" />  //标签内容为空的时候可以直接这么写
//上面的语句等同于：
let divElement = React.creatElement("div", {className: "foo"});
```
**React组件**的标签直接用大驼峰书写：
```javascript
import React from "react";
class Headline extends React.component {
  render(){
    return <h1>Hello React</h1>;
  }
}
let headline = <Headline />;  //等同于: let headline = React.creatElement("Headline");
```
**用大小驼峰的写法是为了区分一个标签元素到底是HTML标签还是React组件标签。**

#### JSX内部
##### 1.JS表达式
很多情况下都要向组件的JSX内部传入JS表达式，那么就要用到花括号`{}`，花括号里面的代码会直接按照JS代码进行处理。例子来自《React全栈》。
```javascript
const MyComponent;
let isLoggedIn = true;
let app = <MyComponent name = {isLoggedIn ? "Viking" : "please login"}/>
```
子组件表达式如下：
```javascript
const MyComponent, LoginForm, Nav;
let isLoggedIn = true;
let app = <MyComponent>{isLoggedIn? <Nav /> : <LoginForm />}</MyComponent>
```
当省略一个属性的值时，JSX会默认其值为`true`。
```javascript
let myBtn = <input type = "button" disabled />
//等同于
let myBtn = <input type = "button" disabled = {true} />
```
##### 2.注释
在JSX中使用注释，写法仍和JS相同，但是要用花括号包裹起来：
```javascript
let component = {
  <div>
    {/*这里是注释部分*/}
    <Headline />
  </div>
}
```

#### 属性扩散
当组件有很多属性时，可以这么写：
```javascript
const profile;
let name = "Viking", age = "10", gender = "Male";
let component = <Profile name = {name} age = {age} gender = {gender} />
```
而当属性更多时，这样写就显得有些繁杂，所以可以用一种更简单的方式：
```javascript
const Profile;
let props = {
  name: "Viking",
  age: 10;
  gender: "Male"
};
let component = <Profile {...props} />;
//用到了ES6中的展开操作符（...），这样就简化了前面的写法
```
**需要注意的是，后面的属性会覆盖前面的属性。**比如：
```javascript
const Profile;
let props = {
  name: "Viking",
  age: 10;
  gender: "Male"
};
let component = <Profile {...props} name = "Viking2" />;  
console.log(component.props.name);  //Viking2
```

#### JSX的编译
对JSX进行编译的一种方式是在HTML中引入Facebook提供的工具**JSXTransformer**，但是这种方法是通过浏览器进行编译处理的，会影响到整个页面的效率。
<br>
所以更好的方法是使用**React + webpack + Babel**来搭建一个完整的开发环境，在下一个小节具体说明。

### 搭建React开发环境
<i class="fa fa-link" aria-hidden="true"></i>[前文](/2017/05/16/summary-of-webpack)已经讲过关于webpack的配置，再次确认是否已经安装好了**webpack**和**webpack-dev-server**，如果没有，在终端内输入命令进行全局安装。
```terminal
$ npm install webpack webpack-dev-server -g
```
完成后创建一个项目目录**proj**，定位到该目录下，并生成一个**package.json**的文件：
```terminal
$ mkdir proj
$ cd proj
$ npm init --yes
```
>**webpack-dev-server**是一个基于Express框架的Node.js服务器，提供了一个客户端的运行环境，方便开发者进行开发与调试，它的默认本地端口为8080，所以可以通过http://localhost:8080来访问。

#### 配置Babel
Babel除了能把ES6标准的代码编译成通用版本的代码之外，还可以支持React的一些特性，如JSX语法。
<br>
这里需要安装**babel-core**和**babel-loader**两个包，在proj目录下：
```terminal
$ npm install babel-core babel-loader --save-dev
```
再安装ES6和React语法支持：
```terminal
$ npm install babel-preset-es2015 babel-preset-react --save-dev
```
完成后在**proj**目录下新建一个`.babelrc`的空文件，用来配置Babel的规则。打开该文件，并编辑输入以下内容：
```json
{
  "presets": ["es2015", "react"]
}
```
该配置指定了编译JS时要用到的两个Babel插件。

#### 配置ESLint
**ESLint**用来规范代码的书写，可自由配置规则，又有第三方的插件，且同时支持ES6和JSX语法。
<br>
要用到ESlint，需要添加**eslint-loader**：
```terminal
$ npm install eslint eslint-loader --save-dev
```
这里直接使用第三方配置的规则——**eslint-config-airbnb**（还包括三个插件：import, react, jsx-ally），输入以下命令：
```terminal
$ npm install eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y --save-dev
$ npm install eslint-config-airbnb --save-dev
```
完成后像Babel一样继续配置，在目录**proj**下新建一个`.eslintrc`文件，输入内容：
```json
{
  "extends": "airbnb",  //继承airbnb的规则
  "rules": {  //自定义的规则
    "comma-dangle": ["error", "never"],  //数组或对象的最后一项后面不用加逗号
    "quotes": ["error", "double"],  //个人习惯使用双引号，所以将规则改成双引号
    "indent": ["error", 4],  //个人习惯缩紧空格符为4
    "react/jsx-indent": ["error", 4]
  },
  "plugins": [
      "eslint-plugin-react",
      "eslint-plugin-jsx-a11y",
      "eslint-plugin-import"
  ],
  "env": {
    "browser": true  //引入浏览器全局变量
  }
}
```

#### 通过webpack结合Babel和ESLint
配置好Babel和ESLint之后，通过webpack将它们结合起来。在这之前，先安装一个webpack插件——**html-webpack-plugin**，它的作用是自动生成HTML页面，并引入正确的JS文件依赖，输入以下命令安装它：
```terminal
$ npm install html-webpack-plugin --save-dev
```
然后在proj目录下新建一个**app**文件夹和一个**webpack.config.js**文件,该配置文件的内容如下：
```javascript
var path = require("path");
var webpack = require("webpack");
var HtmlwebpackPlugin = require("html-webpack-plugin");

/************************** 常用路径 ****************************/
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, "app");
var BUILD_PATH = path.resolve(ROOT_PATH, "build");
/************************** 常用路径 ****************************/

module.exports = {
    //入口文件
    entry: {
        app: path.resolve(APP_PATH, "app.jsx")
    },
    output: {
        path: BUILD_PATH,
        filename: "bundle.js"
    },
    //开启dev source map
    devtool: "eval-source-map",
    //开启webpack dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },

    module: {
        rules: [
            //添加eslint-loader并设置为pre
            {
                test: /\.jsx?$/,
                enforce: "pre",
                loader: ["eslint-loader"],
                include: APP_PATH
            },
            //添加babel-loader
            {
                test: /\.jsx?$/,
                loader: ["babel-loader"],
                include: APP_PATH
            }
        ]
    },
    //配置plugin
    plugins: [
        new HtmlwebpackPlugin({  //用来生成html页面
            title: "my first react app"
        })
    ],
    //将jsx扩展名添加入resolve，这样就可以在import中添加jsx扩展名的脚本
    resolve: {
        extensions: [".js", ".jsx"]
    },
}
```
为了能简化npm中与webpack相关的命令，在**package.json**文件里添加如下代码：
```json
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server --hot"
}
```

#### 生成页面
先把React库安装到项目目录proj下：
```terminal
$ npm install react react-dom --save
```
然后在app目录下新建一个**app.jsx**的文件（它在webpack.config.js的配置中已被作为入口文件），并按照配置好的ESlint规范进行修改，最终如下：
```javascript
import React from "react";
import ReactDOM from "react-dom";

function App() {
    return (
        <div className="container">
            <h1>Hello React!</h1>
        </div>
    );
}

const app = document.createElement("div");
document.body.appendChild(app);
ReactDOM.render(<App />, app);
```

#### 组件热替换(HMR)
每次修改完一个页面之后，页面都会重新刷新，所以现在有一种热替换（ *Hot Module Replacement* ）的方式，能够在更新代码后只更新局部组件。要实现这一功能，只需安装一个Babel的preset：
```terminal
$ npm install babel-preset-react-hmre --save-dev
```
该preset包括一个**react-transform-hmr**和一个**react-transform-catch-errors**。

**至此，一个通用的React开发环境就配置好了，它支持ES6和JSX语法，使用ESlint来规范代码的书写规则，有组件热替换的功能。**

### 组件
React的一切都是基于组件的，接下来就通过一个简单的示例来熟悉关于组件的各个概念。直接将上一小节配置好的React环境拷贝一份，重命名为**componentdemo**。
>下面的示例在ESLint和webpack配置上和上一小节略有不同，详细配置请看[我的Github](https://github.com/winjeysong/React/tree/master/componentdemo)<i class="fa fa-external-link" aria-hidden="true"></i>。

#### 属性`props`及属性验证`propTypes`
把**app.jsx**文件进行修改：
```javascript
import React from "react";
import { render } from "react-dom";
import Profile from "./profile";  //引入profile.jsx中的Profile类

const props = {  //属性传入
    name: "song",
    age: 24
};
const app = document.createElement("div");

document.body.appendChild(app);
render(<Profile {...props} />, app);  
//用到了前文提到的属性扩散的简写方式
```
添加**profile.jsx**文件：
```javascript
import React, { PropTypes } from "react";

const propTypes = {  //属性验证
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
};

class Profile extends React.Component {
    render() {
        return (
            <div className="profile-component">
                {/*属性访问*/}
                <h1>My name is {this.props.name}.</h1>
                <h2>I&#39;m {this.props.age} years old.</h2>
            </div>
        );
    }
}

Profile.propTypes = propTypes; // 将验证赋值给这个组件的propTypes属性

export default Profile;
```
关键点都已在代码中注释，不再赘述。完成后的页面见下图。
![页面示例1](http://olx9mvmqe.bkt.clouddn.com/react_component_demo.png)
#### 状态`state`
组件本身就是状态化的，可以在构造函数`constructor`中通过`this.state`直接定义它的值，每当`state`的值发生改变时，都会通过`this.setState`方法让组件调用`render`方法，然后重新渲染页面。
为了体验状态这一特性，新增一个**点赞**功能，每点击一次，赞数就加一。在**profile.jsx**中增加代码：
```javascript
import React, { PropTypes } from "react";

const propTypes = {  //属性验证
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
};

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  //添加点赞的状态
            liked: 0
        };
        this.likedCallback = this.likedCallback.bind(this);  //手动绑定自定义回调函数到实例上
    }

    likedCallback() {  //给onClick单击事件添加的回调函数
        let liked = this.state.liked;
        liked += 1;
        this.setState({
            liked
        });
    }

    render() {
        return (
            <div className="profile-component">
                {/*属性访问*/}
                <h1>My name is {this.props.name}.</h1>
                <h2>I&#39;m {this.props.age} years old.</h2>
                <button onClick={this.likedCallback}>Like Me</button>
                <h2>total amount of likes：{this.state.liked}</h2>
            </div>
        );
    }
}

Profile.propTypes = propTypes; // 将验证赋值给这个组件的propTypes属性

export default Profile;
```
完成后页面如下：
![页面示例2](http://olx9mvmqe.bkt.clouddn.com/react_component_demo_2.png)

#### 多组件组合
由于每个页面需要实现的功能很多，那么就需要用到各种不同的组件。很自然地，一个组件可以包含多个其他组件，所以在上面代码的基础上增加一个爱好列表的组件，名称为**hobby.jsx**：
```javascript
import React, { PropTypes } from "react";

const propTypes = {  //hobby属性应该为string类型
    hobby: PropTypes.string.isRequired
};

class Hobby extends React.Component {
    render() {
        return <li>{this.props.hobby}</li>;  //Hobby组件里生成li列表元素，并且含有hobby属性
    }
}

Hobby.propTypes = propTypes;  //将验证赋值给这个组件的propTypes属性

export default Hobby;
```
这样只要把Hobby组件看成一个自定义的HTML标签就好，然后把它引入到**profile.jsx**文件中，并对它做一些小修改（无变化的部分已省略），注意注释部分：
```javascript
//...
import Hobby from "./hobby";

//...
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            liked: 0,
            hobbies: ["mystic movie", "electronic music", "photographing"]  //增加hobby
        };
        this.likedCallback = this.likedCallback.bind(this);
    }

    //...
    render() {
        return (
            <div className="profile-component">
                {/*属性访问*/}
                <h1>My name is {this.props.name}.</h1>
                <h2>I&#39;m {this.props.age} years old.</h2>
                <button onClick={this.likedCallback}>Like Me</button>
                <h2>total amount of likes: {this.state.liked}</h2>
                <h2>My hobbies:</h2>
                <ul>
                    {this.state.hobbies.map(hobby => <Hobby index={hobby.index} hobby={hobby} />)}
                    {/*遍历hobbies并将值传入到Hobby组件中，注意给每个循环组件添加一个唯一的不同于数组的index值*/}
                </ul>
            </div>
        );
    }
}

//...
```
完成后的效果如下图：
![页面示例3](http://olx9mvmqe.bkt.clouddn.com/react_component_demo_3.png)

#### 无状态的函数式组件
对于没有内部`state`且不需要生命周期函数的简单组件，可以直接写成一个纯函数的形式，称为**无状态的函数式组件**（ *stateless functional component* ）。像上面写到的Hobby组件，它就可以写成无状态的函数式组件，修改**hobby.jsx**中Hobby组件的写法（省略其他代码）：
```javascript
function Hobby(props) {
    return <li>{props.hobby}</li>;
}
```
在实际项目中，大部分组件都是无状态的函数式组件，所以最好都采用这种写法，它传入的参数为属性`props`。

#### 状态的设计原则
上面提到了无状态的函数式组件，那么什么时候应该设计有状态`state`的组件呢？在设计组件的过程中应该遵循的原则是——**尽量让组件都是无状态的**。使用思维导图更清晰明了地表达这一准则：
![思维导图](http://olx9mvmqe.bkt.clouddn.com/component_state.png)
结合上面的图，无状态组件需要关心的就是接收属性并渲染数据，而状态组件作为其父组件，主要用来进行事件处理、修改状态及逻辑控制。

那么在状态`state`中的数据是什么样子的呢？以`state`最小化为准则，直接使用轻量化的JSON格式。下面几种数据不应该包含到`state`中：
* 可以计算得出的数据；
* 组件，因为组件可以直接在render方法中渲染；
* 属性`props`中的数据，这些数据是组件数据的来源，不需要保存在state中。

#### 组件的生命周期
组件的生命周期大致包括下面三个步骤：<br>
1.组件初始化；<br>
2.组件属性更新；<br>
3.组件卸载。

为了更加清晰地表述每个步骤下的具体过程，特意做了一个示意图：
![生命周期示意图](http://olx9mvmqe.bkt.clouddn.com/component_life_cycle.png)
##### 组件初始化
组件生命周期的第一步，进行组件的初始化，对重要过程进行阐述（以下内容来自《React全栈》，存在二次编辑）：
* `getDefaultProps`只会在装载之前调用一次，在组件中赋值的数据会被设置到`this.props`中。
* `getInitialState`只会在装载之前调用一次，**它的返回值会被设置到`this.state`中**。需要注意的是，在ES6的写法中，只需写在constructor中即可。
* `componentWillMount`，在`render`之前被调用，可以做一些渲染前的准备工作。
* `render`是组件**必要**的方法，当这个方法被调用时会返回一个**ReactElement**对象。当给定条件相同时，它的返回结果应该也是相同的，即其不应该有任何修改组件状态的代码或是和浏览器交互的情况。
* `componentDidMount`只会在装载完成之后调用一次，在`render`之后调用，开始获取组件的DOM结构，如果想让组件加载完后继续其他操作（如加载Ajax请求等），可以在该方法中添加代码。

##### 组件属性更新
当组件属性状态更新时，会触发下列方法：
* `componentWillReceiveProps(obj newProps)`会在组件接收到新的属性时触发，当`newProps`和`this.props`不同时，`this.setState`会重新渲染页面。
* `shouldComponentUpdate`会返回一个布尔值，若为`true`则继续下一个过程
* `componentWillUpdate`，在`render`之前被调用，可以做一些渲染前的准备工作。
* `render`同前
* `componentDidUpdate`在组件重新渲染之后立即被调用，和前面`componentDidMount`的作用类似。

##### 组件卸载
* `componentWillUnmount`能在组件被卸载和销毁前被调用，主要做清理工作。

#### DOM操作
绝大多数情况下，不需要通过操作DOM来更新页面。但是在某些情况下，如填写表单的时候，就需要访问DOM结构。那么可以用到`refs`来获取到DOM结构，只需在前面代码的基础上，修改**profile.jsx**文件（省略相同代码），要点都在注释中：
```javascript
//...

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  //添加点赞的状态
            liked: 0,
            hobbies: ["mystic movie", "electronic music", "photographing"]
        };
        this.likedCallback = this.likedCallback.bind(this);
        this.addHobbyCallback = this.addHobbyCallback.bind(this);  //新增，在构造函数中绑定回调函数this
    }

//...
    /************新增*************/
    addHobbyCallback() {  
        const hobbyAdd = this.hobbyInput;  
        const hobbyVal = hobbyAdd.value;
        //回调函数中引用到了ref属性的值

        if (hobbyVal) {
            let hobbies = this.state.hobbies;
            hobbies = [...hobbies, hobbyVal];
            this.setState({
                hobbies
            }, () => {
                hobbyAdd.value = "";
            });
        }
    }
    /************新增*************/

    render() {
        return (
            <div className="profile-component">
                {/*...*/}
                {/*新增*/}
                <input
                    type="text"
                    ref={
                        (input) => { this.hobbyInput = input; }  //注意ref属性
                    }
                />
                <button onClick={this.addHobbyCallback}>Add my hobby</button>
                {/*新增*/}
            </div>
        );
    }
}

//...
```
最终效果为点击按钮，就可以添加输入的内容到页面中：
![页面示例4](http://olx9mvmqe.bkt.clouddn.com/component_ref_clip.gif)