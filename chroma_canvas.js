document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 800;
  canvas.width = 500;

  // BOARD DIMENSIONS
  let x = canvas.width / 2;
  let y = canvas.height / 2;

  // DIRECTIONAL VELOCITY OF BALL
  let dxBall = 5;
  let dyBall = 2;

  const ballRad = 15;

  const randColor = () => Math.round(Math.random() * 255);

  let ballOneColors = {
    red: randColor(),
    green: randColor(),
    blue: randColor()
  };
  let ballTwoColors = {
    red: randColor(),
    green: randColor(),
    blue: randColor()
  };

  const renderBall = (dir, colors) => {

    let ballR = colors.red;
    let ballG = colors.green;
    let ballB = colors.blue;

    colors.red = colors.red + 5 <= 255 ? colors.red += 5 : colors.red = 0;
    colors.green = colors.green + 5 <= 255 ? colors.green += 5 : colors.green = 0;
    colors.blue = colors.blue + 5 <= 255 ? colors.blue += 5 : colors.blue = 0;

    let ballColor = `rgb(${ballR},${ballG},${ballB})`;

    ctx.beginPath();
    ctx.arc(x + dir, y, ballRad, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  };

  const playGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBall(0, ballOneColors);
    renderBall(50, ballTwoColors);

    if (x + dxBall > canvas.width - ballRad || x + dxBall < ballRad) {
      dxBall = -dxBall;
    }

    if (y + dyBall > canvas.height - ballRad || y + dyBall < ballRad) {
      dyBall = -dyBall;
    }

    x += dxBall;
    y += dyBall;


    requestAnimationFrame(playGame);
  };

  requestAnimationFrame(playGame);
});
