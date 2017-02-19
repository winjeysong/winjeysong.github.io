
//customise
$(document).ready(function(){
  var a_inner=$("div#foo").find("li");
  a_inner.on("click",function(){
    console.log($(this).find('a').html());
    $(this).addClass("active").siblings().removeClass("active");
  });
});
