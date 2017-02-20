---
layout: index-page
title: "Details"
description: ""
header-img: ""
---

<p style="font-family: 'STSong', serif;font-weight:200;font-size:25px">Here is the list of posts sorted by date.</p>
<p style="font-family: 'STSong', serif;font-size:25px;border-bottom:1px solid #000;margin-top:-20px">您看到的是按时序排列的内容。</p>
<ul class="listing">
{% for post in site.posts %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator">{{ y }}</li>
  {% endif %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>