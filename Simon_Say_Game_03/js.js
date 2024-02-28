let gameSeq = [];
let userSeq = [];
// let highScore = 0;
let highScore = localStorage.getItem("simon-say");
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h4 = document.querySelector("h4");
let body = document.querySelector("body");
let yourScore = document.querySelector(".your-score");
let highScoreElement = document.querySelector(".high-score");
let gameStartBtn = document.getElementById("startButton");

if (highScore === null) {
  highScoreElement.innerText = 0;
} else {
  highScoreElement.innerText = highScore;
}

function startGame() {
  if (!started) {
    console.log("Game is started");
    started = true;
    levelUp();
  }
  gameStartBtn.disabled = true;
  startButton.innerText = "Game Started";
}

gameStartBtn.addEventListener("click", startGame);
body.addEventListener("keypress", startGame);

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("user");
  setTimeout(function () {
    btn.classList.remove("user");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h4.innerHTML = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);

  gameSeq.push(randColor);

  console.log("Game", gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      yourScore.innerText = level;
      setTimeout(levelUp, 1000);
    }
  } else {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "#131f21";
    }, 200);

    h4.innerHTML = `Game Over! Your Score is : <b>${yourScore.innerText}</b><br> Press <b>any key</b> or <b>start button</b>  to start`;
    if (level > highScore) {
      highScore = level - 1;
      localStorage.setItem("simon-say", highScore);
      highScoreElement.innerText = highScore;
    }
    yourScore.innerText = 0;
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log("User", userSeq);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  level = 0;
  started = false;
  gameSeq = [];
  userSeq = [];
  gameStartBtn.disabled = false;
  startButton.innerText = "Start Game";
}
