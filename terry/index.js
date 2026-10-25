
// LOVE.EXE ♡
// Made by Olivia for Terry

let highestZ = 20;
let quizFinished = false;
let heartFinished = false;
let heartScore = 0;
let currentQuestion = 0;

// OPEN AND CLOSE WINDOWS

function openWindow(id) {
  const windowElement = document.getElementById(id);

  if (!windowElement) return;

  windowElement.classList.remove("hidden");
  windowElement.style.zIndex = ++highestZ;

  if (id === "letter") {
    updateLetter();
  }
}

function closeWindow(id) {
  document.getElementById(id).classList.add("hidden");
}

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => {
    openWindow(button.dataset.open);
  });
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    closeWindow(button.dataset.close);
  });
});

// DRAGGABLE WINDOWS

document.querySelectorAll(".window").forEach(win => {
  const bar = win.querySelector(".titlebar");

  bar.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;

    // Keep windows fixed on smaller screens
    if (window.innerWidth <= 600) return;

    win.style.zIndex = ++highestZ;

    const rect = win.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    win.style.transform = "none";
    win.style.left = rect.left + "px";
    win.style.top = rect.top + "px";

    function move(e) {
      const x = Math.max(
        0,
        Math.min(window.innerWidth - 100, e.clientX - offsetX)
      );

      const y = Math.max(
        0,
        Math.min(window.innerHeight - 80, e.clientY - offsetY)
      );

      win.style.left = x + "px";
      win.style.top = y + "px";
    }

    function stop() {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", stop);
    }

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", stop);
  });

  win.addEventListener("pointerdown", () => {
    win.style.zIndex = ++highestZ;
  });
});

// PHOTO ALBUM

const photoNotes = [
  "This is where our story began. I'm so glad it was you.",
  "Every adventure feels better when I'm with you.",
  "Sometimes the smallest moments become my favorites.",
  "I want to keep making memories with you, forever."
];

document.querySelectorAll("[data-photo]").forEach(photo => {
  photo.addEventListener("click", () => {
    const index = Number(photo.dataset.photo);

    document.getElementById("photo-note").textContent =
      photoNotes[index];
  });
});

// LOVE QUIZ

const questions = [
  {
    question: "When did we officially become a couple?",
    options: ["March 9", "April 27", "May 16", "May 27"],
    answer: 1
  },
  {
    question: "When was our first kiss?",
    options: ["April 27", "May 27", "May 16", "June 26"],
    answer: 2
  },
  {
    question: "What are we celebrating today?",
    options: [
      "100 days",
      "Our first month",
      "Six months",
      "One year"
    ],
    answer: 2
  }
];

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    quizFinished = true;

    document.getElementById("quiz-area")
      .classList.add("hidden");

    document.getElementById("quiz-complete")
      .classList.remove("hidden");

    updateLetter();
    return;
  }

  const q = questions[currentQuestion];

  document.getElementById("question-number").textContent =
    "QUESTION " + (currentQuestion + 1) +
    " / " + questions.length;

  document.getElementById("question-text").textContent =
    q.question;

  document.getElementById("quiz-feedback").textContent = "";

  const optionsContainer =
    document.getElementById("quiz-options");

  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    optionsContainer.appendChild(button);
  });
}

function checkAnswer(index) {
  const q = questions[currentQuestion];
  const feedback = document.getElementById("quiz-feedback");

  if (index === q.answer) {
    feedback.textContent = "Correct! ♡";
    feedback.style.color = "#5d9a72";

    document.querySelectorAll(".quiz-option")
      .forEach(button => button.disabled = true);

    setTimeout(() => {
      currentQuestion++;
      loadQuestion();
    }, 650);
  } else {
    feedback.textContent = "Oops! Try again ♡";
    feedback.style.color = "#d0808b";
  }
}

loadQuestion();

// HEART COLLECTOR GAME

const heart = document.getElementById("moving-heart");
const gameArea = document.getElementById("game-area");

function moveHeart() {
  const maxX = gameArea.clientWidth - heart.offsetWidth - 10;
  const maxY = gameArea.clientHeight - heart.offsetHeight - 10;

  const x = Math.random() * Math.max(0, maxX);
  const y = Math.random() * Math.max(0, maxY);

  heart.style.left = x + "px";
  heart.style.top = y + "px";
}

heart.addEventListener("click", () => {
  if (heartFinished) return;

  heartScore++;

  document.getElementById("heart-score").textContent =
    heartScore;

  const messages = [
    "A little love for you ♡",
    "You're my favorite!",
    "Sending you kisses!",
    "You make me happy!",
    "Halfway there!",
    "More love!",
    "You're so special!",
    "Almost there!",
    "One more!",
    "You caught my heart!"
  ];

  document.getElementById("heart-message").textContent =
    messages[heartScore - 1];

  if (heartScore >= 10) {
    heartFinished = true;

    heart.style.display = "none";

    document.getElementById("heart-complete")
      .classList.remove("hidden");

    document.getElementById("letter-button").disabled = false;

    updateLetter();
  } else {
    moveHeart();
  }
});

// SECRET LETTER

function updateLetter() {
  const unlocked = quizFinished && heartFinished;

  document.getElementById("letter-locked")
    .classList.toggle("hidden", unlocked);

  document.getElementById("letter-unlocked")
    .classList.toggle("hidden", !unlocked);
}

document.getElementById("final-button")
  .addEventListener("click", () => {
    document.getElementById("final-surprise")
      .classList.remove("hidden");

    document.getElementById("final-surprise")
      .scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
  });

// START THE WEBSITE

openWindow("welcome");
