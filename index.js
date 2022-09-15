// alert("Let's Begin!");
// -------------------------------------------------------------

// Create an array of colors
let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
let started = false;

// Create a new variable called level and start at level 0.
let level = 0;

// -------------------------------------------------------------
// Functions

// Add Sound to User Click
const playSound = (name) => {
  audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

// Add Animations to User Click
function animatePress(currentColor) {
  // adding class to changes the background color to grey
  $("." + currentColor).addClass("pressed");

  // removing class to changes the background color to grey
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// -------------------------------------------------------------
// Start The Game

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).on("keypress", function (e) {
  // console.log(e.key);
  if (e.key === "a") {
    if (!started) {
      // console.log(started);

      // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 1".
      $("#level-title").text("level " + level);
      nextSequence();
      started = true;
      // console.log(started);
    }
  } else {
    !started;
  }
});

// -------------------------------------------------------------
// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.

$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(`User pick = ${userChosenColor}`);
  console.log(`User array = ${userClickedPattern}`);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(`userClickedPattern ${userClickedPattern.length - 1}`);
});

// -------------------------------------------------------------
// Check the User's Answer Against the Game Sequence

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log(gamePattern);
    // console.log("success");
    // console.log(userClickedPattern.length);
    // console.log(gamePattern.length);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
    $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press 'A' Key to Restart!");
    startOver();
  }
};

// -------------------------------------------------------------
// Showing the user which button is automatically play

function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // Increase the level by 1 every time nextSequence() is called.
  level++;

  // Update the h1 with this change in the value of level.
  $("#level-title").text("level " + level);

  // Create a function to pick random number
  let randomNumber = Math.floor(Math.random() * 4);

  // Pick one of buttonColor array index
  let randomChosenColor = buttonColors[randomNumber];
  console.log("Computer pick = " + randomChosenColor);

  // Push the color into an empty (gamePattern) array
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  // Show the sequence to the user with animations and sound
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}
//   nextSequence();

// -------------------------------------------------------------
// Restart the Game

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
}

// -------------------------------------------------------------
// BACA TENTANG DATA STRUCTURE & ALGORITHM
// YouTube & WikiPedia
