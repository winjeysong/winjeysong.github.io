//customise

$(function(){
    $("#foo>ul>li>a:gt(0)").each(function(){
      var reg = /(http:\/\/)(.*)\/([^\/]*)\//g;
      var match0 = $(this).text().toLowerCase();
      var loc = String(window.location);
      if(reg.exec(loc)[3] == match0){
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");  
      }  
  });
});

