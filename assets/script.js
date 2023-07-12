// this is still a test. timer will go negative forever
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

var timerRight = document.getElementById("quiz-timer");
var buttonStart = document.querySelector(".start-button-box");
var score = document.getElementById("view-score");
var btnSubmit = document.getElementById("btnSub");
var questionQuiz = document.querySelector(".questionsDiv");
console.log(questionQuiz);
var timerCount;
var secondsLeft = 90;
var questionIndex = 0;
var timeInterval;

// timerRight.addEventListener("click", 
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
    //hide button, comenzar timer, mostrar preguntas,  
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

        // adjuntar
        div.append(respuestas);
    }

    questionQuiz.append(titulo, div)

}

// here is validated the user's answers
function userAnswers(event) {
    console.log(event.target.value);

    // piense en el questionIndex como subir el number por uno

    // piense en un condicional que verifica si hay mas preguntas. Si hay mas corra la funcion render(). si no corra quiz finish
}

function quizFinish() {
    clearInterval(timeInterval);
}
// start the quiz
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