// this is still a test. timer will go negative forever
var timerRight = document.getElementById("timer");
var buttonStart = document.querySelector(".start-button-box");
var score = document.getElementById("view-score");
var btnSubmit = document.getElementById("btnSub");
var timerCount;
var seconds;
// btnSubmit.style.display = "block"; // this is to display the submit button

var questions = [
{
    q: "Inside which HTML element do we put the JavaScript?",
    a: [{ text: "<scripting>", isCorrect: false },
    { text: "<js>", isCorrect: false },
    { text: "<javascript>", isCorrect: false },
    { text: "<script>", isCorrect: true }
    ]
},
{
    q: "Where is the correct place to insert a JavaScript?",
    a: [{ text: "The <body> section", isCorrect: true },
    { text: "The <head> section", isCorrect: false },
    { text: "Both the <head> and the <body> section are correct", isCorrect: false }
    ]
},
{
    q: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    a: [{ text: "<script href='xxx.js'>", isCorrect: false },
    { text: "<script src='xxx.js'>", isCorrect: true },
    { text: "<script name='xxx.js'>", isCorrect: false }
    ]
},
{
    q: "The external JavaScript file must contain the <script> tag.",
    a: [{ text: "False", isCorrect: true },
    { text: "True", isCorrect: false }
    ]
},
{
    q: "How do you create a function in JavaScript?",
    a: [{ text: "function myFunction()", isCorrect: true },
    { text: "function:myFunction()", isCorrect: false },
    { text: "function = myFunction()", isCorrect: false }
]
},
{
    q: "How can you add a comment in a JavaScript?",
    a: [{ text: "'This is a comment'", isCorrect: false },
    { text: "//This is a comment", isCorrect: true },
    { text: "<!--This is a comment-->", isCorrect: false }
]
},
{
    q: "What is the correct way to write a JavaScript array?",
    a: [{ text: "var colors = ['red', 'green', 'blue']", isCorrect: true },
    { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", isCorrect: false },
    { text: "var colors = (1:'red', 2:'green', 3:'blue')", isCorrect: false },
    { text: "var colors = 'red', 'green','red'", isCorrect: false }
]
}
];
console.log(questions);


timerCount = setInterval (function() {
    seconds--;
    timerRight.textContent = "" + seconds;
    if (seconds === 0) {
        clearInterval(timerRight);
    }
}, 1000);

function startGame () {
    seconds = 180;
    buttonStart.disable = true;
    console.log(seconds);
    //here goes the functions that start the game
    userQuestions();
    userAnswers();
    console.log(timerCount);
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