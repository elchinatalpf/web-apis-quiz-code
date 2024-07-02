var timer = document.getElementById("timer");
var startBtn = document.querySelector(".start-button");
var questionsQuiz = document.querySelector(".questionsdiv");
var questionsSection = document.querySelector(".questions-section");
var titleEl = document.querySelector("#title");
var listEl = document.querySelector("#list");
var afterQuiz = document.querySelector(".after-quiz");
var finalScore = document.querySelector("#user-results");
var errMsg = document.querySelector("#error-message");
var inputInitials = document.querySelector("#inputInitials");
var submitEl = document.querySelector(".submit");
var responseDiv = document.querySelector("#response");
var highscoresPage = document.querySelector(".highscores-page");
var userInitials = document.querySelector("#user-initials");
// var timerRight = document.getElementById("quiz-timer");
// var buttonStart = document.querySelector(".start-button-box");
var score = document.getElementById("view-score");

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

var timerCount;
var secondsLeft = 90;
var questionIndex = 0;
var timeInterval;
var correctCount = 0;

function setTime() {
    timeInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time " + secondsLeft;
        if (secondsLeft <= 0) {
            quizFinish();
        }
    }, 1000);
}

function startGame() {
    questionsQuiz.style.display = 'none';
    questionsSection.classList.remove('d-none');
    setTime()
    displayQuestions();
}

function displayQuestions() {
    if(questionIndex >= questions.length) {
        quizFinish();
        return;
    }
    console.log("Displaying question", questionIndex);

    questionsSection.innerHTML = "";
    var titulo = document.createElement("h3")
    titulo.textContent = questions[questionIndex].q;
    var div = document.createElement("div")

    questions[questionIndex].a.forEach((answer, index) => {
        var option = document.createElement("button");
        option.textContent = `${index + 1}. ${answer.text}`;
        option.setAttribute('value', answer.isCorrect);
        option.addEventListener('click', userAnswers);
        option.classList.add('btn', 'btn-poutline-primary', 'm-2');
        option.style.margin = "5px";
        option.style.borderColor = "lightblue";
        option.style.borderStyle = "solid";
        option.style.borderRadius = "5px";
        div.appendChild(option);
    }); 
    questionsSection.appendChild(titulo);
    questionsSection.appendChild(div);
}

function userAnswers(event) {
    correctAnswers(event.target.value === "true");
    questionIndex++;
    displayQuestions(); 
}

function quizFinish() {
    clearInterval(timeInterval);
    questionsSection.classList.add('d-none');
    afterQuiz.classList.remove('d-none');
    finalScore.textContent = "Your final score is: " + correctCount;
}

function correctAnswers(isCorrect) {
    if (isCorrect) {
        correctCount++;
    } else {
        secondsLeft = Math.max(0, secondsLeft - 5);
    }
}

function saveScore(event) {
    event.ppreventDefault();
    const initialInputValue = inputInitials.value.trim();
    if (initialInputValue === "") {
        errMsg.textContent = "Initial's field can't be empty!";
        return;
    }
    errMsg.textContent = "";
    localStorage.setItem("initials", initialInputValue);
    localStorage.setItem("highscore", correctCount);
    displayHighScores();
}

function displayHighScores() {
    const storedScore = localStorage.getItem("highscore");
    const storedInitials = localStorage.getItem("initials");

    if (!storedScore || !storedInitials) return;

    afterQuiz.classList.add('d-none');
    highscoresPage.classList.remove('d-none');
    userInitials.value = `${storedInitials}: ${storedScore}`;
}

function init() {
    location.reload();
}

function clearHighscores() {
    userInitials.value = "";
    localStorage.removeItem("highscore");
    localStorage.removeItem("initials");

}

startBtn.addEventListener("click", startGame);
submitEl.addEventListener("click", saveScore);

questionsSection.classList.add('d-none');
afterQuiz.classList.add('d-none');
highscoresPage.classList.add('d-none');