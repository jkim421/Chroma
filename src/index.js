import Target from './target.js';
import Swatch from './swatch.js';
import Game from './game.js';
import { shuffle } from 'lodash';
import { startGame } from './game.js';
import { setMute } from './music.js';

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const startBtn = document.getElementById("start-btn");

  const player = document.getElementById("music-player");
  const mute = document.getElementById("mute-btn");

  const restart = document.getElementById("restart-btn");
  const submit = document.getElementById("submit-btn");

  setMute(mute, player);

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

  submit.addEventListener("click", () => {
    game.processAnswer(restart, submit);
  });
});
