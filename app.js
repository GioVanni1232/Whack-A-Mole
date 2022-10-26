const moles = document.querySelectorAll(".moles div");
const moleImage = document.querySelector("img");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const exit = document.querySelector(".exit");
const gameScore = document.querySelector(".score");
const gameError = document.querySelector(".game-starts");
const root = document.querySelector("html");
const cursor = document.createElement("div");
cursor.className = "cursor";

window.addEventListener("click", (e) => {
  root.appendChild(cursor);

  setTimeout(() => {
    root.removeChild(cursor);
  }, 50);
});

let gameStarts = false;
let moleAppear;
let score = 0;

let coordinates = [
  {
    x: 60,
    y: 10,
  },
  {
    x: 360,
    y: 10,
  },
  {
    x: 660,
    y: 10,
  },
  {
    x: 60,
    y: 260,
  },
  {
    x: 360,
    y: 260,
  },
  {
    x: 660,
    y: 260,
  },
];

root.addEventListener("mousemove", (e) => {
  const X = e.clientX;
  const Y = e.clientY;

  cursor.style.transform = `translate(${X}px, ${Y}px)`;
});

gameScore.textContent = score;
start.addEventListener("click", (e) => {
  if (gameStarts) {
    gameError.classList.add("started");
    setTimeout(() => {
      gameError.classList.remove("started");
    }, 1500);
    return;
  }
  start.textContent = "Start";
  startGame();
  gameStarts = true;
});

pause.addEventListener("click", (e) => {
  gameStarts = false;
  start.textContent = "Resume";
  clearInterval(moleAppear);
});

exit.addEventListener("click", (e) => {
  window.location.reload();
});

moleImage.addEventListener("click", (e) => {
  score++;
  gameScore.textContent = score;
  moleImage.style.display = `none`;
});

function getRandom() {
  let index = Math.floor(Math.random() * 6);
  return index;
}

function randomSpeed() {
  return Math.floor(Math.random() * 1000);
}

function startGame() {
  moleAppear = setInterval(() => {
    let current = coordinates[getRandom()];
    moleImage.style.display = `block`;

    moleImage.style.transform = `translate(${current.x}px, ${current.y}px)`;
    setTimeout(() => {
      moleImage.style.transform = `translate(${current.x}px, ${
        current.y + 100
      }px)`;
      moleImage.style.display = `none`;
    }, randomSpeed());
  }, 1000);
}
