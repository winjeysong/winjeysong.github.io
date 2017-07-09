//customise

$(function(){
    $("#foo>ul>li>a:gt(0)").each(function(){
      var reg = /(http:\/\/)(.*)\/([^\/]*)\//g;  //匹配链接最后/.../斜杠里的内容
      var match0 = $(this).text().toLowerCase();
      var loc = String(window.location);
      if(reg.exec(loc)[3] == match0){  //如果链接最后斜杠里的内容和a标签里的内容相同，则添加active类，高亮当前正在浏览的页
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");  
      }  
  });
});

