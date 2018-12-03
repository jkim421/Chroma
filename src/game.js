import Target from './swatch.js';
import Swatch from './swatch.js';
import { getEasyColors, getHardColors } from './colors.js';
import {
  setBorder,
  removeBorder,
  hideText,
  showText,
  toggleText,
  moveTitle,
  showMatch } from './layout.js';
import { shuffle, sample } from 'lodash';

class Game {
  constructor() {
    this.submission = [];
    this.swatches = [];
    this.startRender = this.startRender.bind(this);
    this.strikes = 0;
    this.playing = true;
  }

  startRender(title, startBtn, target, swatches, mixer, restart, submit, score, strikes) {
    moveTitle(title);
    hideText(startBtn);
    setTimeout(() => {
      this.renderBoard(target, swatches, mixer, restart, submit, score, strikes);}, 2000);
  }

  startGame(title, startBtn, target, swatches, mixer, startRender, restart, submit, score, strikes) {
    startBtn.addEventListener("click", function handler(e) {
      e.currentTarget.removeEventListener("click", handler);
      startRender(title, startBtn, target, swatches, mixer, restart, submit, score, strikes);
    });
  }

  updateSelections(swatchEle) {
    if (this.submission.length > 2) {
      const oldSwatch = this.submission[0];
      oldSwatch.ele.classList.toggle("selected-swatch");
      this.submission = this.submission.slice(1);
    }
  }

  addSelection(swatch, ele) {
    const swatchEle = ele;
    swatchEle.addEventListener("click", (e) => {
      this.submission.push(swatch);
      this.updateSelections(swatchEle);
      e.target.classList.toggle("selected-swatch");
    });
  }

  resetSelection() {
    this.submission.forEach( swatch => swatch.ele.classList.remove("selected-swatch"));
    this.submission = [];
    this.swatches.forEach ( swatch => {
      swatch.ele.classList.remove("solution-swatch");
      swatch.ele.classList.remove("other-swatch");
      swatch.ele.classList.remove("hidden-swatch");
    })
  }

  processAnswer(restart) {
    toggleText(restart);
    if (this.submission.length === 2) {
      this.swatches.forEach( swatch => {
        showMatch(swatch);
      });
      if (this.submission.some( swatch => swatch.solution === false )) {
        this.updateStrikes();
      } else {
        this.updateScore();
      }
    }
  }

  updateStrikes() {
    this.strikes += 1;
    let currentStrike = document.getElementById(`strike${this.strikes}`);
    currentStrike.classList.add("active-strike");
  }

  updateScore() {
    let score = document.getElementById("score-count");
    let newScore = parseInt(score.innerHTML) + 1;
    score.innerHTML = `${newScore}`;
  }

  restartGame(target, swatches, mixer, restart) {
    toggleText(restart);
    this.resetSelection();
    mixer.style.backgroundColor = "transparent";

    let newColors = getEasyColors();
    let newTargetColor = target.setEasyColor(newColors[0], newColors[1]);
    newColors = _.shuffle(newColors);

    for (let i=0; i < this.swatches.length; i++) {
      this.swatches[i].setColor(newColors[i]);
      if (newColors[i][3]) {
        this.swatches[i].solution = true;
      } else {
        this.swatches[i].solution = false;
      }
    }

    console.log(this.swatches);
  }

  renderBoard(target, swatches, mixer, restart, submit, score, strikes) {
    let allColors = getEasyColors();
    let targetColor = target.setEasyColor(allColors[0], allColors[1]);

    allColors = _.shuffle(allColors);
    setBorder(target.ele);
    setBorder(mixer);
    showText(submit);
    showText(score);
    showText(strikes);

    for (let i=0; i < swatches.length; i++) {
      let newSwatch = new Swatch(swatches[i].id);
      newSwatch.setColor(allColors[i]);
      setBorder(newSwatch.ele);
      this.addSelection(newSwatch, newSwatch.ele);
      if (allColors[i][3]) {
        newSwatch.solution = true;
      }
      this.swatches.push(newSwatch);
    }

    console.log(this.swatches);
    return this.swatches;
  }
}

export default Game;
