let gameSeq = [];
let userSeq = [];
let highScore = 0;
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let body = document.querySelector("body");

body.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
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
  h2.innerHTML = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);

  gameSeq.push(randColor);

  console.log("Game", gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  // console.log("curr level : ", level);

  // // let idx = level - 1;
  // console.log("idx -> ", idx);
  // console.log("user idx - ", userSeq[idx], "game idx - ", gameSeq[idx]);
  // console.log(
  //   "user length : ",
  //   userSeq.length,
  //   "game length : ",
  //   gameSeq.length
  // );

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      // levelUp();
      setTimeout(levelUp, 1000);
    }
    // console.log("Same Value");
  } else {
    // console.log("game over");
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);

    h2.innerHTML = `Game Over! Your Score was <b>${level}<b><br> Press any key to start`;
    let span = document.querySelector("span");
    if (level > highScore) {
      highScore = level;
      span.innerText = highScore;
    }
    reset();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log("User", userSeq);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  // console.log(btn);
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = [];
}
