import Target from './target.js';
import Swatch from './swatch.js';
import Game from './game.js';
import { shuffle } from 'lodash';
import { startGame } from './game.js';
import { setMute } from './music.js';

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const startBtn = document.getElementById("start-btn");

  const restart = document.getElementById("restart-btn");
  const submit = document.getElementById("submit-btn");
  const mixer = document.getElementById("color-mixer");

  setMute();

  let target = new Target;
  let swatchEles = Array.from(
    document.getElementsByClassName("color-swatches"));
  let game = new Game(target, swatchEles);

  game.startGame(
    title,
    startBtn,
    game.startRender);

  restart.addEventListener("click", () => {
    game.restartGame();
  });

  submit.addEventListener("click", (e) => {
    game.handleClick(e, restart, submit);
  });
});
