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
