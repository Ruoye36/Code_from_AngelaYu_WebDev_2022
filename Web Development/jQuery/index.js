$("h1").css("font-size","5rem");
//or to put the js links in <head>:
//$(document).ready(function(){ $("h1").css("color","red"); });
$("h2").addClass("big-title margin-50");

$("a").click(function(){$("a").attr("href","https://www.yahoo.com/")});
//$("a").attr("href","https://www.yahoo.com/");
$("button").click(function(){
  $("h1").css("color","green");
})

//event listener method 1
$(document).mouseover(function(event){
  $("h1").text("Mouse over me!");
  //console.log(event.key+" key is pressed.")
})
//event listener method 2
$(document).on("mouseover",function(event){
  $("h1").text("Mouse over me again!")
})
/*

*/
$(document).on("keydown",function(){
  $("h1").slideUp().slideDown().animate({"opacity":"0.3", "margin":"10px"});
})
