---
layout: post
title: 如何实现Github和Coding仓库的同时更新
date: 2017-04-01
categories: git
excerpt: Coding是国内一个类似Github的代码托管网站，同样具有Git的分布式版本控制功能。考虑到Github在国内访问的不稳定性，可以将需要管理的项目同时放到Github和Coding上。最终想要实现的想法为，本地仓库发生更改后能同时更新到Github和Coding的仓库内。
tags: [CODING,GITHUB,GIT]
description: 
---
# 缘由
因为在Github上托管的静态页面访问加载速度较为缓慢，故想在Coding上再建一个静态页面的项目，方便国内国外访问的分流，使访问的稳定性更高。（此为契机，本文只讲两托管网站仓库的同步更新。Coding静态页面自定义域名及国内外的DNS分流，设置比较简单，搜索一下有很多内容，而且设置过程中我也没碰到问题，就不再赘述）

[Coding](https://coding.net)是国内一个类似Github的代码托管网站，同样有git的分布式版本控制功能。考虑到Github在国内访问的不稳定性，可以将需要管理的项目同时放到Github和Coding上。最终想要实现的想法为，本地仓库发生更改后能同时更新到Github和Coding的仓库内。

### 导入Github项目至Coding
将Github上的项目直接导入Coding，以Github下项目仓库 *user_name/repo_name* 为例
1. 复制该仓库的SSH密钥
![copy ssh](http://olx9mvmqe.bkt.clouddn.com/copy-ssh.png)
2. 在Coding上新建一个项目仓库，输入完项目名称 *user_name/repo_name* （仓库名可以和GitHub上的不同），然后点击导入仓库，并选择版本控制仓库的类型为Git，然后将刚才复制的SSH密钥粘贴到下图的文本框内，等待导入完成。
![import repo](http://olx9mvmqe.bkt.clouddn.com/import-ssh.png)

### 同时更新到Github和Coding
1.在已有的本地仓库（没有可以从Github下载）内找到隐藏的`.git`文件夹，打开
<br>2.再打开`config`文件
<br>3.添加如下设置：
```
[remote "origin"]
        url = git@git.coding.net:user_name/user_name.coding.me.git
        url = git@github.com:user_name/user_name.github.io.git
```
4.更改仓库内容后，在终端内输入：
```terminal
cd .../repo_name  #定位至仓库目录
git push
```

这样即可做到对两个托管仓库进行同时更新。