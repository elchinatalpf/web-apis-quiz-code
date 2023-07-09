var x = 1;
console.log(x);

// this is still a test. timer will go negative forever
const timerRight = document.getElementById("timer");
const buttomStart = document.getElementById("buttom-start");
let seconds = 60;

timerRight = setInterval (() => {
    seconds--;
    timerRight.textContent = "timer " + seconds;
}, 1000);
clearInterval();



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