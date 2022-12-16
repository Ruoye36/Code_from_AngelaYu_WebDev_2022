//alert("game");
const buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).on("keydown",function(){
  if(started===false)
    {
      nextSequence();
      started=true;
    }
})

//$("h1").click(nextSequence);
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomChosenColor=buttonColors[Math.floor(Math.random()*4)];
  gamePattern.push(randomChosenColor);
  console.log("gamePattern:"+gamePattern);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  //console.log(randomChosenColor);
}


$(".btn").click(function(){  //midn that 'this' is not to be put in the parameter list
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern: "+userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

})


function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(nextSequence,1000);
    }
  }
  else
  {
    playSound("wrong");
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    $("#level-title").text("Game over. Press any key to restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
