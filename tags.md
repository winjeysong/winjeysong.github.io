---
layout: index-page
title: "Tags"
description: "All about the origin."  
header-img: ""  
---



<p style="font-family: 'STSong', serif;font-weight:200;font-size:25px">Choose the tag you like to find the relative post.</p>
<p style="font-family: 'STSong', serif;font-size:25px;border-bottom:1px solid #000;margin-top:-20px">请选择标签以检索内容。</p>
<hr/>
<div id='tag_cloud'>
{% for tag in site.tags %}
<a href="#{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}">{{"#"}}{{ tag[0] }}</a>
{% endfor %}
</div>

<ul class="listing">
{% for tag in site.tags %}
  <li class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</li>
{% for post in tag[1] %}
  <li class="listing-item">
  <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
  <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
{% endfor %}
</ul>

