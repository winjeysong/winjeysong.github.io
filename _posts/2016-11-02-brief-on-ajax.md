---
layout: post
title: 个人整理的Ajax概要 | A Brief on Ajax
date: 2016-11-02
categories: front-end
excerpt: 什么是Ajax？Ajax的全称为Asynchronous Javascript and XML(异步的javascript和xml)，它不是一种编程语言，是一种在无需重新加载整个页面的情况下能够更新部分网页的技术。
tags: [AJAX,JAVASCRIPT,JQUERY,JSON]
description: 自己整理的有关Ajax的内容。
---
# Ajax
Ajax的全称为*Asynchronous Javascript and XML*(异步的javascript和xml)，它不是一种编程语言，是一种在无需重新加载整个页面的情况下能够更新部分网页的技术。

### Ajax简介 
* 在Ajax出现之前，网页处理是同步的，例如在填写表单时，一旦提交后服务器告知出现错误，又会重新载入页面，导致重新填写。
* 在使用Ajax后，网页处理是异步的，例如在填写表单时，每填写一个字段，都会将数据发送到服务器一次，服务器作出处理与响应，如果有错误或重复，会把响应结果的提示信息返回页面到某一个字段后面，而不会每次都刷新页面。

#### 使用Ajax的三步骤
1. 运用HTML和CSS实现页面，表达信息
2. 运用`XMLHttpRequest`对象和web服务器进行数据的异步交换
3. 运用JavaScript操作DOM，实现动态局部刷新

#### XHR对象
##### 实例化XHR对象
需要考虑到兼容性问题:
```javascript
var request;
if(window.XMLHttpRequest){
    request=new XMLHttpRequest();  //IE7+,Firefox,Chrome,Opera,Safari...但是不兼容IE6以下的版本
}
else{
    request=new ActiveXObject("Microsoft.XMLHTTP");  //IE6,IE5
}
```

##### XHR发送请求
使用到的方法:`open()`与`send()`。
```javascript
open(method,url,async)
```
其中<br>`method`为请求的方法，`get`或`post`（不区分大小写）
<br>`url`为请求地址，相对地址或绝对地址都可以
<br>`async`为请求同步还是异步，默认为`true（异步）`可不填写；若要设置同步，设置为`false`即可

将请求发送到服务器，用以下方法：
```javascript
send(string)
//使用get请求时，send可以不含参
//使用post请求时，send需要含参，发送信息，不然没有意义
```

示例：
```javascript
//使用get请求：
request.open("get","get.php",true);
request.send();


//使用post请求：
request.open("post","post.php",true);
request.setRequestHeader("Content-type","application/x-www-form-urlencoded");  //设置HTTP的头信息，该方法一定要写在open和send之间，否则会抛出异常
request.send("name=老王&sex=男");
```

##### XHR取得响应：
* responseText：获得字符串形式的响应数据
* responseXML：获得XML形式的响应数据
* status和statusText：以数字和文本形式返回HTTP状态码
* getAllResponseHeader()：获取所有的响应报头
* getResponseHeader()：查询响应中的某个字段的值

##### readyState属性
* 0：请求未初始化，open还未调用
* 1:服务器连接已建立，open已经调用
* 2:请求已接收，即已收到头信息
* 3:请求处理中，即接收到响应主体
* 4:请求已完成，且相应已就绪，即响应完成
<br>通过监听该属性，来查看请求和响应的进程。

##### 整体过程
**建立请求->发送请求->监听服务器状态：**
```javascript
var request=new XMLHttpRequest();
request.open("get","get.php",true);
request.send();
request.onreadystatechange=function(){
    if(request.readyState===4&&request.status==200){
        //do something
        request.responseText();
    }
}
```
***
### HTTP简介
* HTTP是计算机通过网络进行通信的规则，能让浏览器向服务器发送请求信息和服务
* HTTP是一种无状态（*不建立持久的连接*）的协议：服务端不保留连接的相关信息，即“没有记忆”

#### HTTP请求的过程
1. 建立TCP连接
2. Web浏览器向Web服务器发送请求命令
3. Web浏览器发送请求头信息
4. Web服务器应答
5. Web服务器发送应答头信息
6. Web服务器向浏览器发送数据
7. Web服务器关闭TCP连接

#### HTTP请求的组成
1. HTTP请求的方法或动作，比如`GET`还是`POST`请求
2. 正在请求的URL，知道请求地址
3. 请求头，包含一些**客户端环境信息，身份验证信息**等
4. 请求体，也就是请求正文，请求正文中可以包含客户提交的查询字符串信息，表单信息等

* `GET`请求：
1. 一般用于**信息获取或查询**，不推荐用`GET`请求来修改信息
2. 使用URL传递参数，任何人都是可见的
3. 对所发送信息的数量也有限制，一般在2000个字符

* `POST`请求：
1. 一般用于**修改**服务器上的资源，或从表单发送一些数据，对其他人是不可见的
2. 对所发送信息的数量无限制

* 一个HTTP响应一般由三部分组成：
1. 一个**数字和文字组成的状态码**，用来显示请求是成功还是失败
2. 响应头，它和请求头一样包含许多有用的信息，例如：**服务器类型、日期时间、内容类型和长度**等
3. 响应体，也就是响应正文

* HTTP状态码由3位数字构成，其中首位数字定义了状态码的类型：
<br>**1XX：** 信息类，表示收到Web浏览器请求，正在进一步处理中
<br>**2XX：** 成功，表示用户请求被正确接收、理解和处理，例如：200 OK
<br>**3XX：** 重定向，表示请求没有成功，客户必须采取进一步动作
<br>**4XX：** 客户端错误，表示客户端提交的请求有错误，例如：404 NOT Found（表示请求中所引用的文档不存在）
<br>**5XX：** 服务器错误，表示服务器不能完成对请求的处理，例如：500

#### 什么是跨域
形如一个这样的域名：`http://www.xxx.com:80/scripts/jquery.js`
，是由协议`http://`，子域名`www`，主域名`xxx.com`，端口号`80`，请求资源地址`scripts/jquery.js`所构成的。
<br>出于安全方面的考虑，JS不允许跨域调用其他页面的对象。更进一步地说，跨域就是因为**JS同源策略的限制，a.com域名下的JS无法操作b.com或是c.a.com域名下的对象**。

##### 处理跨域问题的方法 
1. **代理**(后端范畴)
2. **JSONP：** 解决主流浏览器的跨域数据访问的问题
<br>主要利用的是\<script>标签可以写入跨域的请求，但只能用于`GET`请求
3. **XHR2：** 只需在JSONP的基础上对服务端做一个小的修改，即将JSONP部分去除，加上两行：
    ```php
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST,GET');
    ```
    * HTML5提供的XMLHttpRequest Level2已经实现了跨域访问及其他的一些新功能
    * IE10以下都不支持
<br>总结：jax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加\<script>标签来调用服务器提供的js脚本。

***

### 具体实现
可以用原生Ajax+PHP（可以用JSON传数据，用JSONP来跨域），或采用jQuery封装的`ajax`方法+PHP来模拟实现。
<br>重点看jQuery方法，因为实现方式更简洁且兼顾兼容性。使用方法如下：
```javascript
$.ajax({ 
	type: //请求类型，"GET"或"POST"
	url: //发送请求的地址
    data: //是一个对象，和请求一起被发送到服务器
	dataType: //希望服务器返回的数据类型，如不指定，jQuery将自动根据HTTP包MIME信息判断，一般都用"json"
	success:  //是一个方法，请求成功后的回调函数。传入返回后的数据，以及包含成功代码的字符串
	error: //是一个方法，请求失败时调用此函数，传入XHR对象。
});
```

>需要用到[Fiddler](http://www.telerik.com/fiddler)<i class="fa fa-external-link" aria-hidden="true"></i>这一后台测试工具。


以上就是我到目前为止整理的关于Ajax的内容。
