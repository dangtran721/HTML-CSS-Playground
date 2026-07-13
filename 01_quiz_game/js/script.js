const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-screen-btn");
const quizContainerTitle = document.querySelector(".quiz-container-title");
const answerContainer = document.querySelector(".answer-container");
const progressBarFill = document.querySelector(".progress-fill");
const currentQuestion = document.querySelector(".current-question");
const score = document.querySelector(".score");

let currentQuizId = 0;
let currentScore = 0;

const questionStorage = [
  {
    question: "Question 1",
    answer: [
      { text: "test1", correct: true },
      { text: "test2", correct: false },
      { text: "test3", correct: false },
      { text: "test4", correct: false },
    ],
  },
  {
    question: "Question 2",
    answer: [
      { text: "test1", correct: true },
      { text: "test2", correct: false },
      { text: "test3", correct: false },
      { text: "test4", correct: false },
    ],
  },
  {
    question: "Question 3",
    answer: [
      { text: "test1", correct: true },
      { text: "test2", correct: false },
      { text: "test3", correct: false },
      { text: "test4", correct: false },
    ],
  },
  {
    question: "Question 4",
    answer: [
      { text: "test1", correct: true },
      { text: "test2", correct: false },
      { text: "test3", correct: false },
      { text: "test4", correct: false },
    ],
  },
  {
    question: "Question 5",
    answer: [
      { text: "test1", correct: true },
      { text: "test2", correct: false },
      { text: "test3", correct: false },
      { text: "test4", correct: false },
    ],
  },
  {
    question: "Question 6",
    answer: [
      { text: "test1", correct: true },
      { text: "test2", correct: false },
      { text: "test3", correct: false },
      { text: "test4", correct: false },
    ],
  },
];

const newStorage = suffer(questionStorage);
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
  answerContainer.innerHTML = "";

  answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer.text;
    button.dataset.correct = answer.correct;

    answerContainer.appendChild(button);
  });
}

function showQuiz() {
  const currentQuiz = newStorage[currentQuizId];

  quizContainerTitle.textContent = currentQuiz.question;

  renderAnswer(currentQuiz.answer);
  progressBarController();
  quizInfoController();
}
function correctAnswerAction(btn) {
  btn.target.classList.add("correct");
  currentScore++;
}

function progressBarController() {
  const percent = ((currentQuizId + 1) / totalQuestion) * 100;

  progressBarFill.style.width = `${percent}%`;
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

answerContainer.addEventListener("click", (btn) => {
  if (btn.target.tagName !== "BUTTON") {
    return;
  }

  const isAnswerCorrect = btn.target.dataset.correct === "true";

  isAnswerCorrect
    ? correctAnswerAction(btn)
    : btn.target.classList.add("wrong");

  if (currentQuizId + 1 >= 5) {
    setTimeout(() => {
      showScreen(".quiz-results");
    }, 1000);
  }

  setTimeout(() => {
    currentQuizId++;
    showQuiz();
  }, 1000);
});
