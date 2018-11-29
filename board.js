document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 500;
  canvas.width = 800;

  // BOARD DIMENSIONS
  let x = canvas.width / 2;
  let y = canvas.height / 2;

  // DIRECTIONAL VELOCITY OF BALL
  let dxBall = 5;
  let dyBall = 2;

  const ballRad = 15;

  const paddleHeight = 100;
  const paddleWidth = 15;
  let paddleLeftY = (canvas.height - paddleHeight);
  let paddleRightY = (canvas.height - paddleHeight);

  // KEY PRESSES
  let leftPressed = false;
  let rightPressed = false;

  const renderPaddles = () => {
    // LEFT PADDLE
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, paddleLeftY, paddleWidth, paddleHeight);
    // RIGHT PADDLE
    ctx.fillStyle = "lightblue";
    ctx.fillRect(canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);
  };

  const renderBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  };

  const playGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBall();
    renderPaddles();

    if (x + dxBall > canvas.width - ballRad || x + dxBall < ballRad) {
      dxBall = -dxBall;
    }
\
    if (y + dyBall > canvas.height - ballRad || y + dyBall < ballRad) {
      dyBall = -dyBall;
    }

    x += dxBall;
    y += dyBall;

    if (leftPressed && paddleLeftY > 0) {
      paddleLeftY -= 7;
    } else if (paddleLeftY < canvas.height - paddleHeight){
      paddleLeftY += 7;
    }

    if (rightPressed && paddleRightY > 0) {
      paddleRightY -= 7;
    } else if (paddleRightY < canvas.height - paddleHeight){
      paddleRightY += 7;
    }

    requestAnimationFrame(playGame);
  };

  const paddleKeyDown = (e) => {
    if (e.keyCode === 90) {
      leftPressed = true;
    } else if (e.keyCode === 77) {
      debugger
      rightPressed = true;
    }
  };

  const paddleKeyUp = (e) => {
    if (e.keyCode === 90) {
      leftPressed = false;
    } else if (e.keyCode === 77) {
      rightPressed = false;
    }
  };

  //PADDLE KEYS
  document.addEventListener("keydown", paddleKeyDown);
  document.addEventListener("keyup", paddleKeyUp);

  requestAnimationFrame(playGame);
});
