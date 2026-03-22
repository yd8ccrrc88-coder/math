let current;
let timer = 90;
let score = 0;
let interval;

function loadProblem() {
  current = weightedRandom();
  document.getElementById("problem-img").src = current.img;
  timer = 90;
  document.getElementById("timer").innerText = timer;
  clearCanvas();
  startTimer();
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = timer;
    if (timer <= 0) {
      submitAnswer(0);
    }
  }, 1000);
}

function submitAnswer(choice) {
  clearInterval(interval);

  if (choice === current.answer) {
    score++;
    current.weight = Math.max(1, current.weight - 0.2);
  } else {
    current.weight += 1;
  }

  document.getElementById("score").innerText = score;
  loadProblem();
}

function weightedRandom() {
  let total = problems.reduce((sum, p) => sum + p.weight, 0);
  let r = Math.random() * total;
  for (let p of problems) {
    r -= p.weight;
    if (r <= 0) return p;
  }
}
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = document.querySelector("img").clientWidth;
  canvas.height = document.querySelector("img").clientHeight;
}
window.onload = resizeCanvas;
window.onresize = resizeCanvas;

let drawing = false;

canvas.addEventListener("pointerdown", () => drawing = true);
canvas.addEventListener("pointerup", () => drawing = false);
canvas.addEventListener("pointermove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
