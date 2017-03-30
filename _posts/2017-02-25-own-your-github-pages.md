---
layout: post
title: 如何用GitHub Pages+Jekyll搭建个人站点
date: 2017-02-25
categories: github-pages
excerpt: 以往的个人站点一般都是由各大门户网站提供，对于日常写博客来说，功能也足够使用。但是想要拥有更多的自定义样式和功能，不得不寻求其他的方法。而用GitHub Pages搭建个人站无疑是一种很棒的方式。
tags: [GITHUB,GITHUB PAGES,JEKYLL]
description: 使用github pages及jekyll实现博客搭建
---
# WHY GitHub Pages
之前在关于<i class="fa fa-link" aria-hidden="true"></i>[代码高亮](2017/02/20/syntax-highlight/)的内容下已经提到过GitHub的静态页面。而在这一篇里，我将把自己整个搭建过程较为完整地记录下来，因为网上这方面的教程也很多，一般性的搭建步骤几乎人人都会涉及到，所以我会**着重记录我自己过程中经历的一些坑**，如果能帮到有相同问题的小伙伴，那也是相当开心。

所以我们为什么要用GitHub Pages来搭建个人站呢？
<br>相对于 *WorldPress* 来说，用GitHub Pages不用考虑服务器的内容，它直接将静态页面的代码内容托管在GitHub的个人库下，这对于轻量级的个人博客使用者来讲，更易于管理和配置。

### 安装Git环境
Git是一个分布式的版本控制软件，和SVN不同。（GitHub就是一个有Git功能的托管网站。）为了能在本地使用Git功能，需要[下载Git环境](https://git-scm.com/downloads)<i class="fa fa-external-link" aria-hidden="true"></i>，根据自己操作系统选择下载，各操作系统的详细安装说明见[这里](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)<i class="fa fa-external-link" aria-hidden="true"></i>。这方面自己看文档就能解决，不再赘述。
<br>更多关于Git的使用说明中文文档见[这里](https://git-scm.com/book/zh/v2)<i class="fa fa-external-link" aria-hidden="true"></i>。

安装完后在终端内设置自己的Git用户名及邮箱
```terminal
$ git config --global user.name "your_name"
$ git config --global user.email "your_email@example.com"
```
### SSH加密配置
这一步是为了将本地仓库和GitHub的个人仓库进行连接并加密传输。默认已拥有自己的GitHub账号，没有的小伙伴还不赶紧去[注册](https://github.com)<i class="fa fa-external-link" aria-hidden="true"></i>。
#### 生成SSH密钥
继续在终端内输入：
```terminal
$ ssh-keygen -t rsa -C "your_email@example.com" //引号里的内容为你注册GitHub时的邮箱
```
输入后终端提示，最后会生成一个公钥文件`id_rsa.pub`和一个私钥文件`id_rsa`
```terminal
Generating public/private rsa key pair. //即正在生成公钥、私钥密钥对
Enter a file in which to save the key (/Users/you/.ssh/id_rsa):  //直接回车，将密钥对生成在默认的用户个人目录下
```
生成密钥后，需要输入安全码。输入，或直接两次回车跳过
```terminal
Enter passphrase (empty for no passphrase):  
Enter same passphrase again:
```
#### 添加SSH密钥到GitHub
1. 登陆GitHub
2. 点击右上角头像，打开下拉菜单，点击“**Settings**”
<img src="http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-25%2016.40.43.png" width="30%" alt="Settings" />
3. 在打开的页面内，找到“**SSH and GPG keys**”，然后点击“**New SSH key**”
![SSH keys](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-25%2016.41.54.png)
4. 打开上一步生成的公钥文件`id_rsa.pub`，并复制所有内容至“**Key**”文本框内，点击“**Add SSH key**”
![Add SSH key](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-25%2016.42.34.png)

### 配置Jekyll环境
这一小节下简单讲讲在Windows OS（我使用的是WIN10）及Mac OS配置时的步骤，及我自己碰到的一些问题。而在具体配置前，先简单谈谈什么是 *Jekyll*。
#### 什么是Jekyll
<blockquote><p>来自Jekyll官网的简介：Jekyll 是一个简单的博客形态的静态站点生产机器。它有一个模版目录，其中包含原始文本格式的文档，通过一个转换器（如 Markdown）和我们的 Liquid 渲染器转化成一个完整的可发布的静态网站，你可以发布在任何你喜爱的服务器上。Jekyll 也可以运行在 GitHub Page 上，也就是说，你可以使用 GitHub 的服务来搭建你的项目页面、博客或者网站，而且是完全免费的。</p></blockquote>
并且，*Jekyll* 能通过命令创建一个本地服务器来运行页面，这样我们就能实时观察所做的修改，而不必每次都将更改push到GitHub才能看到变化——效率及其低下。所以说，*Jekyll* 是我们搭建个人站的重点内容，配置好它，我们的搭建工作才能顺风顺水。
#### Windows OS下配置Jekyll
根据[Jekyll文档](http://jekyllrb.com/docs/windows/#installation/)<i class="fa fa-external-link" aria-hidden="true"></i>描述，Windows并不是 *Jekyll* 官方支持的平台，但是也可以通过合适的方法使其运行在Windows平台上。
##### 1.安装Ruby环境
1. 直接打开浏览器[下载RubyInstaller](https://rubyinstaller.org/downloads/)<i class="fa fa-external-link" aria-hidden="true"></i>，选择对应自己系统的版本
2. 下载完成后，打开安装文件，在进行到下图的步骤时，勾选“**Add Ruby executables to your PATH**”：
![勾选Add Ruby executables to your PATH](http://olx9mvmqe.bkt.clouddn.com/Ruby%E7%A4%BA%E6%84%8F%E5%9B%BE.png)
3. 接下来一路到底即可

##### 2.安装RubyGems
1.根据其官网介绍，*RubyGems* 是一个Ruby的包管理器，废话不多，直接[下载](https://rubygems.org/pages/download/)<i class="fa fa-external-link" aria-hidden="true"></i>里面的**ZIP**包。
<br>
2.将上一步下载的ZIP文件解压缩至某一目录下，如：**d:/directory**
<br>
3.打开终端（命令行），并定位到该目录下
```terminal
cd d:/directory
```
4.使用命令完成安装（可能需要管理员权限）
```terminal
ruby setup.rb
```

##### 3.安装Jekyll
1.在终端内继续输入以下命令，安装 *jekyll* 和 *jekyll-paginate*（默认下载最新版本，但不要尝试安装早期版本，因为可能与Windows不兼容）
```terminal
$ gem install jekyll
$ gem install jekyll-paginate
```
2.等待安装完成，可能该镜像不是特别稳定，最好使用SS或VPN。或者也可以把外国的RubyGems镜像替换成国内的，如果要进行替换，请确保RubyGems的版本在2.6.x及以上
```terminal
$ gem -v  //查看当前版本
$ gem update jekyll  //升级
```
3.如果选择替换镜像请继续操作，**已安装成功跳过这一步**
```terminal
$ gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
$ gem sources -l  //这一步是为了确保镜像只有一个
```
若终端输出：
```terminal
https://gems.ruby-china.org
```
则表示替换成功

##### 4.创建静态页面
1.安装完 *Jekyll* 的 *Gem* 包之后，通过一个最简单的模版来创建一个静态页面，并在本地运行。先定位到目标目录下，如：**d:/myblog**
```terminal
cd d:/myblog
```
2.在当前目录下创建一个本地仓库，里面是博客模版：
```terminal
$ jekyll new . --force
```
3.运行本地服务器：
```terminal
$ jekyll serve
```
这样就可以创建一个简单的博客模版了，并且已经可以打开：*http://localhost:4000*，在地址栏里输入试试吧。

##### 5.过程中的坑
1.问题一，错误提示如下：
```terminal
Dependency Error: Yikes! It looks like you don't have tzinfo or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- tzinfo' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll | Error: tzinfo
```
**解决方法：**安装`TZinfo`和`TZinfo::Data`
```terminal
$ gem install tzinfo
$ gem install tzinfo-Data
```
2.问题二，错误提示如下：
```terminal
Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `gems: [jekyll-paginate]` in your configuration file.
```
**解决方法：**在本地仓库的目录下找到`_config.yml`配置文件，添加一行配置：
```yml
gems: [jekyll-paginate]
```
3.问题三，错误提示如下：
```terminal
Pagination: Pagination is enabled, but I couldn't find an index.html page to use as the pagination template. Skipping pagination.
```
开始以为是`_config.yml`文件配置有误，仔细检查后并未发现错误;
<br>找出`index.html`代码，发现是**yaml文件头**(关于文件头的内容，后文会详细提及)的有误。本来应该是形如：
```yml
---
layout: default
title: hello world
---
```
结果因为我的 *vs code* 扩展插件有 *html&css&js formatter*，把 *yaml* 文件头也给 *formatter* 了：
```yml
--- layout: default title:hello world ---
```
导致其无效。只要改回来就可以了。

#### Mac OS下配置Jekyll
##### 1.更新Ruby环境
1.在Mac系统下较常使用 *Homebrew* 作为包管理器，点[这里](https://brew.sh/index_zh-cn.html)<i class="fa fa-external-link" aria-hidden="true"></i>看相关内容（很幸运，有中文文档），不想进链接看内容？那就直接打开终端，输入以下命令，并等待安装完成
```terminal
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2.安装完 *Homebrew* 后，继续在终端内输入以下命令，即可安装最新版本的 *Ruby* 环境(Mac系统本身自带Ruby环境，只是可能版本较老)
```terminal
$ brew install ruby
```

##### 2.更新RubyGems
Mac下本身也自带了RubyGems，直接升级：
```terminal
$ gem update --system
```

##### 3.后续步骤
再后面的步骤都跟WIN下相同，参照WIN条目下第3点开始的<i class="fa fa-link" aria-hidden="true"></i>[配置](#3安装jekyll)即可。

#### 静态页面的美化
完成了上面的步骤，*Jekyll* 的环境已经搭建完成。但是之前为了<i class="fa fa-link" aria-hidden="true"></i>[测试](#4创建静态页面)而在本地服务器（**localhost:4000**）上运行的模版页面实在是太简陋了，怎么办呢？
<br/>
如果有HTML，CSS及JS基础，再搭配上各种开源项目，可以自行动手，写出仅属于自己的独一无二样式风格的个人站。但是对这些标记语言，脚本语言等不是很了解的小伙伴，也没关系，有更简单的方法：克隆别人已经制作好的主题。就先从简单的写起。
##### 克隆Jekyll主题
1. 打开[这个网站](http://jekyllthemes.org/)<i class="fa fa-external-link" aria-hidden="true"></i>
2. 挑选一个自己喜欢的主题，点击
3. 进入类似下图的页面，点击“**Download**”
![主题下载](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-26%2014.39.20.png)
4. 进入到托管该主题的GitHub页面（可能有些会直接下载一个压缩包，没关系，直接跳到第9个步骤），点击右上角的“**Fork**”，页面跳转到自己的GibHub仓库，这样就把原作者仓库里的主题以分支的形式保存到自己的仓库里了
![fork主题](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-26%2014.57.55.png)
5. 在该项目仓库里，点击“Settings”
![设置项目仓库](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-26%2015.38.52.png)
6. 将仓库重命名为：**username.github.io**，其中**username**为你的**GitHub用户名**,改完点击“**Rename**”
![仓库重命名](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-26%2015.47.57.png)
7. 接下来就可以在浏览器输入 *username.github.io* 来浏览你的博客骨架了
8. 网页端写博文或修改代码十分不方便，直接[下载 *GitHub Desktop* ](https://desktop.github.com/)<i class="fa fa-external-link" aria-hidden="true"></i>。安装完桌面客户端后，在网页端点击绿色按钮“**Clone or download**”,再点“**Open in Desktop**”，这样选择好本地目录，就可以通过桌面客户端将仓库克隆到本地了（**注意：不要重命名仓库**）。<br>如果对Git操作比较熟，可以直接在终端内“$ git clone->add->commit->push”，更多具体内容及详细说明可看<i class="fa fa-link" aria-hidden="true">[Git条目](#安装git环境)下提到的中文文档
![克隆仓库至本地](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-26%2016.10.06.png)
9. （操作完前8个步骤的小伙伴直接跳过后面的步骤）**直接下载主题仓库的压缩包的方式来创建博客骨架**：将下载的包解压后重命名为：**username.github.io**，其中**username**为你的**GitHub用户名**
10. 看第8个步骤，下载 *GitHub Desktop*  。完成安装后打开，点击左上角的加号，如下图，点击“**Add**”标签，再点“**Choose**”选择上一步解压并重命名的目录，最后点击“**Create & Add Repository**”创建新仓库
![添加仓库](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-26%2016.35.59.png)
11. 新仓库添加完成后，点击右上角的“**Publish**”发布新仓库，如下图。等待发布完成（最多三五分钟），就可以在浏览器输入 *username.github.io* 来浏览你的博客骨架了
![发布仓库](http://olx9mvmqe.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-02-26%2016.45.32.png)

##### 打造属于自己的主题
要写出属于自己的主题，除了用到基础的HTML、CSS、JS（以及jQuery、Bootstrap等各种库或插件）外，还需要了解Jekyll的模版语言——[Liquid](https://liquid.bootcss.com/)<i class="fa fa-external-link" aria-hidden="true"></i>。