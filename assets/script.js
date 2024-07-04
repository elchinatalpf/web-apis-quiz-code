// All Selectors
var viewScoreLink = document.getElementById('view-score');
var timer = document.getElementById("timer");
var startBtn = document.querySelector(".start-button");
var questionsQuiz = document.querySelector(".questionsdiv");
var questionsSection = document.querySelector(".questions-section");
var titleEl = document.querySelector("#title");
var listEl = document.querySelector("#list");
var responseDiv = document.querySelector("#response");
var afterQuiz = document.querySelector(".after-quiz");
var finalScore = document.querySelector("#user-results");
var errMsg = document.querySelector("#error-message");
var inputInitials = document.querySelector("#inputInitials");
var submitEl = document.querySelector(".submit");
var highscoresPage = document.querySelector(".highscores-page");
var score = document.getElementById("view-score");
var highscoresList = document.getElementById('highscores-list');
// Questions array of objects.
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
// Vars for timer and count
var timerCount;
var secondsLeft = 90;
var questionIndex = 0;
var timeInterval;
var correctCount = 0;
// function for timer
function setTime() {
    timeInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time " + secondsLeft;
        if (secondsLeft <= 0) {
            quizFinish();
        }
    }, 1000);
}
// Being the game on click, sets the time and displays the questions
function startGame() {
    questionsQuiz.style.display = 'none';
    questionsSection.classList.remove('d-none');
    setTime()
    displayQuestions();
}
// Display all questions
function displayQuestions() {
    if(questionIndex >= questions.length) {
        quizFinish();
        return;
    }

    titleEl.textContent = questions[questionIndex].q;
    listEl.innerHTML = "";
    responseDiv.textContent = "";

    questions[questionIndex].a.forEach((answer, index) => {
        var option = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = `${index + 1}. ${answer.text}`;
        button.setAttribute('data-correct', answer.isCorrect);
        button.addEventListener('click', userAnswers);
        button.classList.add('question-button');
        option.appendChild(button);
        listEl.appendChild(option);
    }); 
    questionsSection.appendChild(titleEl);
    questionsSection.appendChild(listEl);
    questionsSection.appendChild(responseDiv);
}
// User's answer with logic to keep going or finish.
function userAnswers(event) {
    var selectedBtn = event.target;
    var correct = selectedBtn.getAttribute('data-correct') === 'true';
    correctAnswers(correct);
    setTimeout(function() {
        questionIndex++;
        responseDiv.textContent = "";
        if (questionIndex < questions.length) {
            displayQuestions(); 
        } else {
            quizFinish();
        }
    }, 650);
}
// Finish the quiz and timer
function quizFinish() {
    clearInterval(timeInterval);
    questionsSection.classList.add('d-none');
    afterQuiz.classList.remove('d-none');
    finalScore.textContent = "Your final score is: " + correctCount;
}
// Logic for correct answers
function correctAnswers(isCorrect) {
    if (isCorrect) {
        correctCount++;
        responseDiv.textContent = "Correct!";
        responseDiv.style.color = "green";
    } else {
        secondsLeft = Math.max(0, secondsLeft - 5);
        responseDiv.textContent = "Wrong!";
        responseDiv.style.color = "red";
    }
}
// Save the user's score
function saveScore(event) {
    event.preventDefault();
    const initialInputValue = inputInitials.value.trim();
    if (initialInputValue === "") {
        errMsg.textContent = "Initial's field can't be empty!";
        return;
    }
    errMsg.textContent = "";
    var scores = JSON.parse(localStorage.getItem("highscores")) || [];
    var newScore = {
        initials: initialInputValue,
        score: correctCount
    };
    scores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(scores));
    displayHighScores();
}
// Show All High Scores
function displayHighScores() {
    highscoresList.innerHTML = "";
    var scores = JSON.parse(localStorage.getItem("highscores")) || [];
    if (scores.length === 0) {
        highscoresList.innerHTML = '<p>No high scores available yet.</p>';
    } else {
        var scoresList = document.createElement('ul');
        scores.forEach(function(score, index) {
            var scoreItem = document.createElement('li');
            scoreItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
            scoresList.appendChild(scoreItem);
        });
        highscoresList.appendChild(scoresList);
    }
    questionsQuiz.style.display = 'none';
    questionsSection.classList.add('d-none');
    afterQuiz.classList.add('d-none');
    highscoresPage.classList.remove('d-none');
}
// Initialize the quiz
function init() {
    questionsQuiz.style.display = 'block';
    questionsSection.classList.add('d-none');
    afterQuiz.classList.add('d-none');
    highscoresPage.classList.add('d-none');
    secondsLeft = 90;
    questionIndex = 0;
    correctCount = 0;
    timer.textContent = "Timer: " + secondsLeft;
}
// Clear the scores
function clearHighscores() {
    highscoresList.innerHTML = "";
    localStorage.removeItem("highscores");
}

// Event Listener for buttons start and submit
viewScoreLink.addEventListener('click', displayHighScores);
startBtn.addEventListener("click", startGame);
submitEl.addEventListener("click", saveScore);

questionsSection.classList.add('d-none');
afterQuiz.classList.add('d-none');
highscoresPage.classList.add('d-none');

init();