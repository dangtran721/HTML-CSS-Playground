const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-screen-btn");
const quizContainerTitle = document.querySelector(".quiz-container-title");
const answerContainer = document.querySelector(".answer-container");

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

function showScreen(selector) {
  screens.forEach((el) => {
    el.classList.add("hidden");
  });

  document.querySelector(selector).classList.remove("hidden");
}

showScreen(".start-screen");

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

const newStorage = suffer(questionStorage);

function showQuiz() {
  const currentQuizId = Math.floor(Math.random() * newStorage.length);
  const currentQuiz = newStorage[currentQuizId];

  quizContainerTitle.textContent = currentQuiz.question;

  renderAnswer(currentQuiz.answer);
}

startBtn.addEventListener("click", () => {
  showScreen(".quiz-container");
  showQuiz();
});

answerContainer.addEventListener("click", (btn) => {
  if (btn.target.tagName !== "BUTTON") {
    return;
  }
  const isAnswerCorrect = btn.target.dataset.correct === "true";

  isAnswerCorrect ? console.log("A") : console.log("B");
});
