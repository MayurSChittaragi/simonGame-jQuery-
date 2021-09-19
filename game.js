// alert("Hello");

// $("h1").css("color", "red");
var started = false;
var level = 0;

$(document).keydown(function () { 
	if(started == false){
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
		
	}

	
});

var buttonColors = ['red', 'blue', 'green', 'yellow'];
var userClickedPattern = [];
var gamePattern = [];

function playSound(name){
	var audio = new Audio("sounds/" + name +".mp3");
	audio.play();
}

function animatePress(currentColor){
	var current = $("#"+currentColor);
	current.addClass("pressed");
	setTimeout(function () {
		current.removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel){
	if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
		console.log("success");
		if(userClickedPattern.length === gamePattern.length){
			setTimeout( function () {
				nextSequence();
			}, 1000);
		}
		
	}
	else{
		console.log("wrong");
		var audio = new Audio("sounds/wrong.mp3");
		audio.play();
		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		$("h1").text("Game Over, Press any key to Restart!");
		startOver();
	}
}

function nextSequence(){
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$("#"+randomChosenColor).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
	
	level = level + 1;
	$("#level-title").text("Level "+level);
}

$(".btn").click(function () { 
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
});

function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}

