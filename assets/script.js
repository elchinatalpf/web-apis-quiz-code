// this is still a test. timer will go negative forever
var timerRight = document.querySelector("#timer");
var buttonStart = document.querySelector(".start-button-box");

var questions = [];

var seconds;

timerRight = setInterval (() => {
    seconds--;
    timerRight.textContent = " " + seconds;
}, 1000);
clearInterval();

function startGame () {
    seconds = 180;
    buttonStart.disable = true;
    console.log(seconds);
    //here goes the functions that start the game
    userQuestions();
    userAnswers();
}

//here goes all the question to the user
function userQuestions () {
    console.log(seconds);
}
  
// here is validated the user's answers
function userAnswers () {
    console.log(seconds);
}


buttonStart.addEventListener("click", startGame); 


// setInterval will go inside the timerQuiz function.
// function timerQuiz {

// }
// ## User Story

// ```
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// ```

// ## Acceptance Criteria

// ```
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score