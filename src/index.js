import Target from './target.js';
import Swatch from './swatch.js';
import Game from './game.js';
import { shuffle } from 'lodash';
import { startGame } from './game.js';
import { setMute } from './music.js';

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const startBtn = document.getElementById("start-btn");
  const mixer = document.getElementById("color-mixer");

  const mute = document.getElementById("mute-btn");
  const player = document.getElementById("music-player");

  const restart = document.getElementById("restart-btn");
  const submit = document.getElementById("submit-btn");
  const score = document.getElementById("score-display");
  const strikes = document.getElementById("strikes");

  setMute(mute, player);

  let game = new Game;
  let target = new Target;
  let swatchEles = Array.from(
    document.getElementsByClassName("color-swatches"));

  game.startGame(
    title,
    startBtn,
    target,
    swatchEles,
    mixer,
    game.startRender,
    restart,
    submit,
    score,
    strikes);

  restart.addEventListener("click", () => {
    game.restartGame(target, swatchEles, mixer, restart);
  });

  submit.addEventListener("click", () => {
    game.processAnswer(restart);
  });
});
