const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-screen-btn");
const quizContainerTitle = document.querySelector(".quiz-container-title");
const answerContainerBtn = document.querySelector(".answer-container");
const progressBarFill = document.querySelector(".progress-fill");
const currentQuestion = document.querySelector(".current-question");
const score = document.querySelector(".score");
const finalScore = document.querySelector(".final-score");
const restartQuizBtn = document.querySelector(".quiz-result-btn button");

let currentQuizId = 0;
let currentScore = 0;
let isBtnDisable = false;
let btnCorrect;

const questionStorage = [
  {
    question: "Which language is used to style web pages?",
    answer: [
      { text: "CSS", correct: true },
      { text: "HTML", correct: false },
      { text: "Java", correct: false },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answer: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<url>", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    answer: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Management", correct: false },
      { text: "Document Order Method", correct: false },
      { text: "Digital Object Model", correct: false },
    ],
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    answer: [
      { text: "const", correct: true },
      { text: "let", correct: false },
      { text: "var", correct: false },
      { text: "constant", correct: false },
    ],
  },
  {
    question: "Which method selects the first matching element?",
    answer: [
      { text: "querySelector()", correct: true },
      { text: "querySelectorAll()", correct: false },
      { text: "getElements()", correct: false },
      { text: "findElement()", correct: false },
    ],
  },
  {
    question: "Which property changes the text inside an element?",
    answer: [
      { text: "textContent", correct: true },
      { text: "innerStyle", correct: false },
      { text: "value", correct: false },
      { text: "className", correct: false },
    ],
  },
  {
    question: "Which CSS property changes text color?",
    answer: [
      { text: "color", correct: true },
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Which CSS layout arranges items in one dimension?",
    answer: [
      { text: "Flexbox", correct: true },
      { text: "Grid", correct: false },
      { text: "Float", correct: false },
      { text: "Position", correct: false },
    ],
  },
  {
    question: "How do you write a JavaScript comment?",
    answer: [
      { text: "// Comment", correct: true },
      { text: "<!-- Comment -->", correct: false },
      { text: "# Comment", correct: false },
      { text: "** Comment **", correct: false },
    ],
  },
  {
    question: "Which operator checks strict equality?",
    answer: [
      { text: "===", correct: true },
      { text: "==", correct: false },
      { text: "=", correct: false },
      { text: "!=", correct: false },
    ],
  },
  {
    question: "Which array method adds an item to the end?",
    answer: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question: "Which event occurs when a button is clicked?",
    answer: [
      { text: "click", correct: true },
      { text: "hover", correct: false },
      { text: "change", correct: false },
      { text: "load", correct: false },
    ],
  },
  {
    question: "Which CSS property creates rounded corners?",
    answer: [
      { text: "border-radius", correct: true },
      { text: "border-round", correct: false },
      { text: "corner-radius", correct: false },
      { text: "radius", correct: false },
    ],
  },
  {
    question: "Which HTML tag creates a button?",
    answer: [
      { text: "<button>", correct: true },
      { text: "<input>", correct: false },
      { text: "<click>", correct: false },
      { text: "<btn>", correct: false },
    ],
  },
  {
    question: "Which method converts JSON text into an object?",
    answer: [
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.convert()", correct: false },
      { text: "JSON.object()", correct: false },
    ],
  },
  {
    question: "Which CSS property changes the background color?",
    answer: [
      { text: "background-color", correct: true },
      { text: "color", correct: false },
      { text: "background-image", correct: false },
      { text: "fill", correct: false },
    ],
  },
  {
    question: "Which function displays a message in the browser console?",
    answer: [
      { text: "console.log()", correct: true },
      { text: "alert()", correct: false },
      { text: "print()", correct: false },
      { text: "console.show()", correct: false },
    ],
  },
  {
    question: "Which keyword creates a function?",
    answer: [
      { text: "function", correct: true },
      { text: "func", correct: false },
      { text: "method", correct: false },
      { text: "define", correct: false },
    ],
  },
  {
    question: "Which property is used to hide an element with CSS?",
    answer: [
      { text: "display: none", correct: true },
      { text: "visibility: hidden", correct: false },
      { text: "opacity: 0", correct: false },
      { text: "hidden: true", correct: false },
    ],
  },
  {
    question: "Which JavaScript method creates a new button element?",
    answer: [
      { text: "document.createElement()", correct: true },
      { text: "document.newElement()", correct: false },
      { text: "document.addElement()", correct: false },
      { text: "document.makeElement()", correct: false },
    ],
  },
];

let newStorage = suffer(questionStorage);
const totalQuestion = newStorage.length;

function showScreen(selector) {
  screens.forEach((el) => {
    el.classList.add("hidden");
  });

  document.querySelector(selector).classList.remove("hidden");
}

function suffer(questionStorage) {
  const questions = [...questionStorage];

  questions.sort(() => Math.random() - 0.5);
  return questions;
}

function renderAnswer(answers) {
  answerContainerBtn.innerHTML = "";

  answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer.text;
    button.dataset.correct = answer.correct;

    if (answer.correct) {
      btnCorrect = button;
    }
    answerContainerBtn.appendChild(button);
  });
}

function showQuiz() {
  const currentQuiz = newStorage[currentQuizId];

  quizContainerTitle.textContent = currentQuiz.question;

  renderAnswer(currentQuiz.answer);
  progressBarController();
  quizInfoController();
}

function progressBarController() {
  const percent = ((currentQuizId + 1) / totalQuestion) * 100;

  progressBarFill.style.width = `${percent}%`;
}

function answerCorrectAction(btn) {
  btn.target.classList.add("correct");
  currentScore++;
}

function quizInfoController() {
  currentQuestion.textContent = currentQuizId + 1;

  score.textContent = currentScore;
}
showScreen(".start-screen");

startBtn.addEventListener("click", () => {
  showScreen(".quiz-container");
  showQuiz();
});

answerContainerBtn.addEventListener("click", (btn) => {
  if (btn.target.tagName !== "BUTTON" || isBtnDisable) {
    return;
  }
  isBtnDisable = true;
  const isAnswerCorrect = btn.target.dataset.correct === "true";

  isAnswerCorrect
    ? answerCorrectAction(btn)
    : btn.target.classList.add("wrong");

  btnCorrect.classList.add("correct");

  if (currentQuizId + 1 >= 5) {
    setTimeout(() => {
      showScreen(".quiz-results");
      finalScore.textContent = currentScore;
    }, 1000);
    return;
  }

  setTimeout(() => {
    currentQuizId++;
    showQuiz();
    isBtnDisable = false;
  }, 1000);
});

restartQuizBtn.addEventListener("click", () => {
  newStorage = suffer(questionStorage);
  currentQuizId = 0;
  currentScore = 0;
  isBtnDisable = false;

  progressBarFill.style.width = "0%";

  showScreen(".start-screen");
});
