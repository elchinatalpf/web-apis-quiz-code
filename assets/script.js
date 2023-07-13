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

var timerRight = document.getElementById("quiz-timer");
var buttonStart = document.querySelector(".start-button-box");
var score = document.getElementById("view-score");
var questionQuiz = document.querySelector(".questionsDiv");
var timerCount;
var secondsLeft = 90;
var questionIndex = 0;
var timeInterval;
var correctCount = 0;

function setTime() {
    timeInterval = setInterval(function () {
        secondsLeft--;
        timerRight.textContent = "Time " + secondsLeft;
        if (secondsLeft === 0) {
            quizFinish();
        }
    }, 1000);
}

function startGame() {
    //hide button, start timer, show questions.  
    setTime()
    render();
}

function render() {
    questionQuiz.innerHTML = "";
    var titulo = document.createElement("h3")
    titulo.textContent = questions[questionIndex].q;
    var div = document.createElement("div")

    for (var i = 0; i < questions[questionIndex].a.length; i++) {
        // quiero crear botones para las respuestas de opcion
        // crear
        var respuestas = document.createElement("button");
        // aggrear contenido, estilo, eventListener, attributes
        respuestas.textContent = questions[questionIndex].a[i].text;
        respuestas.setAttribute('value', questions[questionIndex].a[i].isCorrect)
        respuestas.addEventListener('click', userAnswers)
        respuestas.style.margin = "5px";
        respuestas.style.borderColor = "lightblue";
        respuestas.style.borderStyle = "solid";
        respuestas.style.borderRadius = "5px";
        // adjuntar
        div.append(respuestas);
    }
    questionQuiz.append(titulo, div)
}

// here is validated the user's answers
function userAnswers(event) {
    correctAnswers(event.target.value);
    questionIndex++;

    if (questionIndex < questions.length) {
        render(); 
        // add check answer.
        // viewScore();
    } else {
        quizFinish();
    }
}

function quizFinish() {
    clearInterval(timeInterval);
    var message = document.createElement("h4");
    message.textContent = ("Game Over. Check your score in the top left!"); // add btn here to redirect to the scores.
    questionQuiz.appendChild(message);

    localStorage.setItem("highscore", JSON.stringify(correctCount));
    var viewScoreButton = document.getElementById("view-score");
    viewScoreButton.textContent = "View Score";
    viewScoreButton.addEventListener("click", viewScore);
}

function correctAnswers(value) {
    if (value === "true") {
        console.log(value);
        correctCount++;
    } else {
        secondsLeft -= 10;
    }
}

//     // this need to be fixed. maybe redirecting to another HTML to re-format the page and add user scores. and a btn to come back to begiging. I think that will also need a js for that new html.
function viewScore() {
    var highscore = JSON.parse(localStorage.getItem("highscore"));
    // var initials = document.getElementById("#userScores");
    // var divUserScores = document.createElement("div");
    // divUserScores.innerHTML = "<input type='text' id='initialsInput' placeholder='ABC'>  <button>Submit</button>";
    // var inputUser = document.createElement("input");
    // inputUser.setAttribute("type", "text");
    // inputUser.setAttribute("id", "initialsInput");
    // inputUser.setAttribute("placeholder", "Enter initials");
    // divUserScores.appendChild(inputUser);
    // var btnSubmit = document.createElement("button");
    // btnSubmit.textContent = "Submit";
    // btnSubmit.addEventListener("click", btnSubmit);
    // initials.appendChild(divUserScores);
    alert("Your score is " + highscore);
}

buttonStart.addEventListener("click", startGame);

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