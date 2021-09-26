var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound("./sounds/" + randomChosenColour + ".mp3");
    animatePress(randomChosenColour);
}
$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound("./sounds/" + userChosenColour + ".mp3");
    animatePress(this.id);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).on('keypress', function(e) {
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success')
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){nextSequence();},1000)
        }
    } else {
        console.log('wrong');
        playSound("./sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}