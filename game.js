 var buttonColours = ["red", "blue", "green", "yellow"];

 var userClickedPattern = [];

 var gamePattern = [];

 var started = false;
 var level = 0;

 $(document).keypress(function () {
   if(!started){
      $("#level-title").text("level "+ level);
      nextSequence();
      started = true;
   }
 });

 $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);


 });


 function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      // alert("yes this was the right choice");
      // nextSequence();
      //console.log("right");
      if(userClickedPattern.length === gamePattern.length){

         setTimeout(function(){
            nextSequence();
         }, 1000);

      }
   }

   else{
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
         },200);
      console.log("wrong");
      startOver();
      $("#level-title").text("Game Over, Press Any Key to Restart");
   }


 }

 function nextSequence(){

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


 }

 function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
 }

 function animatePress(currentColour){
   $("." + currentColour).addClass("pressed");
   setTimeout(function(){
      $("." +  currentColour).removeClass("pressed");
      },100);
 }

 

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
}
