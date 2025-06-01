

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const carWidth = 30, carHeight = 60;
let carX = canvas.width / 2 - carWidth / 2;
const carY = canvas.height - carHeight - 10;
let speed = 5;

const obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && carX > 0) carX -= 20;
  if (e.key === "ArrowRight" && carX < canvas.width - carWidth) carX += 20;
});

function spawnObstacle() {
  const width = 40;
  const x = Math.floor(Math.random() * (canvas.width - width));
  obstacles.push({ x, y: -80, width, height: 80 });
}
setInterval(spawnObstacle, 1500);

function drawCar() {
  ctx.fillStyle = "blue";
  ctx.fillRect(carX, carY, carWidth, carHeight);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    obs.y += speed;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

    
    if (
      obs.x < carX + carWidth &&
      obs.x + obs.width > carX &&
      obs.y < carY + carHeight &&
      obs.y + obs.height > carY
    ) {
    if (
    obs.x < carX + carWidth &&
    obs.x + obs.width > carX &&
    obs.y < carY + carHeight &&
    obs.y + obs.height > carY
    ) {
    gameOver = true;
    restartBtn.style.display = "block";  
    }
    }
  });
}


function gameLoop() {
  if (gameOver) {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", 80, 250);
  return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawObstacles();

  score++;
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(gameLoop);
}

gameLoop();
restartBtn.addEventListener("click", () => {
  
  carX = canvas.width / 2 - carWidth / 2;
  score = 0;
  obstacles.length = 0;
  gameOver = false;
  restartBtn.style.display = "none";
  gameLoop(); 
});
