---
layout: post
title: Ajax概要 | Brief on Ajax
date: 2016-08-02
categories: blog

tags: [Ajax,Javascript,XML,XMLHttpRequest]
description: 自己整理的有关Ajax的内容。
---
#### [Ajax简介](#ID1)

#### Ajax简介 {#ID1}
Ajax的全称为*Asynchronous Javascript and XML*(异步的javascript和xml)，它不是一种编程语言，是一种在无需重新加载整个页面的情况下能够更新部分网页的技术。
1. 在Ajax出现之前，网页处理是同步的，例如在填写表单时，一旦提交后服务器告知出现错误，又会重新载入页面，导致重新填写。
2. 在使用Ajax后，网页处理是异步的，例如在填写表单时，每填写一个字段，都会将数据发送到服务器一次，服务器作出处理与响应，如果有错误或重复，会把响应结果的提示信息返回页面到某一个字段后面，而不会每次都刷新页面。
![Ajax异步示意图](http://og67h2vwk.bkt.clouddn.com/Ajax%E2%80%94%E2%80%94%E5%BC%82%E6%AD%A5%E7%A4%BA%E6%84%8F%E5%9B%BE.jpg?e=1487520603&token=yLFs8gfOSC1YShmmAJlDztT133UePymJZqtS0u5R:eVW6fTpihpCMgQHJ3-QjXhxCfxQ)

**Ajax三步骤：**
1. 运用HTML和CSS实现页面，表达信息
2. 运用`XMLHttpRequest`对象和web服务器进行数据的异步交换
3. 运用JavaScript操作DOM，实现动态局部刷新
***
#### `XMLHttpRequest`对象
**实例化XMR对象：** 考虑到兼容性问题。
```javascript
var request;
if(window.XMLHttpRequest){
    request=new XMLHttpRequest();  //IE7+,Firefox,Chrome,Opera,Safari...但是不兼容IE6以下的版本
}
else{
    request=new ActiveXObject("Microsoft.XMLHTTP");  //IE6,IE5
}
```

**XHR发送请求：** 使用到的方法
```
open(method,url,async)
```
其中<br>`method`为请求的方法，`get`或`post`（不区分大小写）
<br>`url`为请求地址，相对地址或绝对地址都可以
<br>`async`为请求同步还是异步，默认为`true（异步）`可不填写；若要设置同步，设置为`false`即可

将请求发送到服务器，用以下方法：
```
send(string)
//使用get请求时，send可以不含参
//使用post请求时，send需要含参，发送信息，不然没有意义
```

示例：
```
使用get请求时：
request.open("get","get.php",true);
request.send();


使用post请求时：
request.open("post","post.php",true);
request.setRequestHeader("Content-type","application/x-www-form-urlencoded");  //设置HTTP的头信息，该方法一定要写在open和send之间，否则会抛出异常
request.send("name=王二狗&sex=男");
```

**XHR取得响应：**
* responseText：获得字符串形式的响应数据
* responseXML：获得XML形式的响应数据
* status和statusText：以数字和文本形式返回HTTP状态码
* getAllResponseHeader()：获取所有的响应报头
* getResponseHeader()：查询响应中的某个字段的值

**readyState属性：** 监听该属性，以便查看请求和响应的进程，具体见图
![readyState属性](http://og67h2vwk.bkt.clouddn.com/XHR_readyState.jpg?attname=&e=1484476848&token=yLFs8gfOSC1YShmmAJlDztT133UePymJZqtS0u5R:cHwfrLOyMPWRz3KeSePjh6VQTUk)

**建立请求->发送请求->监听服务器状态：**
```
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
#### HTTP简介
* HTTP是计算机通过网络进行通信的规则，能让浏览器向服务器发送请求信息和服务
* HTTP是一种无状态（*不建立持久的连接*）的协议：服务端不保留连接的相关信息，“没有记忆”

**HTTP请求：** 
* 一个完整的HTTP请求过程，通常有以下几个步骤
1. 建立TCP连接
2. Web浏览器向Web服务器发送请求命令
3. Web浏览器发送请求头信息
4. Web服务器应答
5. Web服务器发送应答头信息
6. Web服务器向浏览器发送数据
7. Web服务器关闭TCP连接

* 一个HTTP请求一般由四部分组成
1. HTTP请求的方法或动作，比如是GET还是POST请求
2. 正在请求的URL，知道请求地址
3. 请求头，包含一些**客户端环境信息，身份验证信息**等
4. 请求体，也就是请求正文，请求正文中可以包含客户提交的查询字符串信息，表单信息等

* GET请求：
1. 一般用于**信息获取或查询**，不推荐用GET请求来修改信息
2. 使用URL传递参数，任何人都是可见的
3. 对所发送信息的数量也有限制，一般在2000个字符

* POST请求：
1. 一般用于**修改**服务器上的资源，一般用来从表单发送一些数据，对其他人是不可见的
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
***

#### 简单示例(Ajax+PHP)
用到PHP。PHP是一种创建动态交互性站点的服务器端脚本语言，他的一些功能如下：
![PHP功能](http://og67h2vwk.bkt.clouddn.com/PHP%E5%8A%9F%E8%83%BD.jpg?attname=&e=1484477572&token=yLFs8gfOSC1YShmmAJlDztT133UePymJZqtS0u5R:DZiC3PXyl-d3KPVM9TGmor_bfNE)

* PHP脚本以`<?php`开头，以`?>`结尾
* PHP文件的默认文件扩展名是`.php`
* PHP语句以分号结尾

要用到的后台测试工具（监听所有http请求）：
>fiddler工具，可看网站中的“ Fiddler工具使用" (http://www.imooc.com/learn/37)课程，后台测试接口工具
<br>Content-Type:application/x-www-form-urlencoded的正确设置。。
<br>fiddler可用于调试服务器代码（无需客户端代码）。
<br>Fiddler是一个http协议调试代理工具，它能够记录并检查所有你的电脑和互联网之间的http通讯，设置断点，查看所有的“进出”Fiddler的数据（指cookie,html,js,css等文件，这些都可以让你胡乱修改的意思）。 Fiddler 要比其他的网络调试器要更加简单，因为它不仅仅暴露http通讯还提供了一个用户友好的格式。
<br>fiddler可以监听电脑上所有的HTTP请求(GET和POST等)监听他们传入的值和返回的值。后台测试接口工具。
<br>使用：右边栏有compose都标签页。输入刚才地址后excuse他。双击左栏的记录。用post请求的时候要用到contentType：application/x-www-form-urlencodeed,告诉服务器是一个post请求，并且是写在url里面。
在右下栏的requestbody写上请求正文。
<br>Content-Type:application/x-www-form-urlencoded

>具体源码可见source code/Ajax

一般过程是：
1. 创建静态页面
2. 写XHR代码，发送Ajax请求


***

#### JSON
>该部分见JSON.md
***
#### 用jQuery实现Ajax
jQuery将XHR封装成一个ajax方法，使代码更简洁，兼容性更好。
**jQuery.ajax([settings])**
* type:类型，”post”或”get”
* url:发送请求的地址
* data:是一个对象，连同请求发送到服务器的数据
* dataType:预期服务器返回的数据类型。如果不指定，jQuery将自动根据HTTP包MIME信息来智能判断，一般我们采用json格式，可以设置为”json”。
* success:是一个方法，请求成功后的回调函数。传入返回后的数据，以及包含成功代码的字符串。
* error:是一个方法，请求失败时调用此函数。传入XMLHttpRequest对象。

>jQuery改写的示例见source code/Ajax中与jQuery相关的PHP及html文档、
***

#### 跨域
跨域的说明示意如下：
![跨域](http://og67h2vwk.bkt.clouddn.com/%E8%B7%A8%E5%9F%9F%E8%AF%B4%E6%98%8E.jpg?attname=&e=1484753035&token=yLFs8gfOSC1YShmmAJlDztT133UePymJZqtS0u5R:ZN-6FkR41clH8nFHs-kB5_Kb3h4)

出于安全方面的考虑，JS不允许跨域调用其他页面的对象。
<br>更进一步地说，跨域就是因为**JS同源策略的限制，a.com域名下的JS无法操作b.com或是c.a.com域名下的对象**。

**处理跨域问题的方法：**
1. **代理**(后端范畴)
![代理](http://og67h2vwk.bkt.clouddn.com/%E8%B7%A8%E5%9F%9F%E8%A7%A3%E5%86%B3%E4%B9%8B%E4%BB%A3%E7%90%86.jpg?attname=&e=1484753603&token=yLFs8gfOSC1YShmmAJlDztT133UePymJZqtS0u5R:S2-UZJAqyGzb6gHgt7AUGkfvWmg)

2. **JSONP：** 解决主流浏览器的跨域数据访问的问题
<br>主要利用的是\<script>标签可以写入跨域的请求，但只能用于`GET`请求
>具体可见source code/Ajax中和JSONP有关的PHP及html文档。

3. **XHR2：** 只需在JSONP的基础上对服务端做一个小的修改，即将JSONP部分去除，加上两行：
    ```
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST,GET');
    ```

    * HTML5提供的XMLHttpRequest Level2已经实现了跨域访问及其他的一些新功能
    * IE10以下都不支持

ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加\<script>标签来调用服务器提供的js脚本。