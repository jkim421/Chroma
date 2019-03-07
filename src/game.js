import Target from './swatch.js';
import Swatch from './swatch.js';
import {
  defaultSubmission,
  defaultSubmissionColors,
  defaultSwatches } from './default_objects';
import { getEasyColors, getHardColors } from './colors.js';
import {
  setBorder,
  removeBorder,
  hideText,
  showText,
  toggleText,
  moveTitle,
  moveScore,
  resetScore,
  resetStrikes,
  showMatch } from './layout.js';
import { shuffle, sample, merge } from 'lodash';

class Game {
  constructor(target, swatchEles) {
    this.target = target;
    this.swatchEles = swatchEles;
    this.solutionColors = [];

    this.submission = [];
    this.submissionColors = _.merge(defaultSubmissionColors);
    this.swatches = [];
    this.startRender = this.startRender.bind(this);
    this.scoreCount = 0;
    this.strikeCount = 0;
    this.guessing = false;
    this.active = true;

    this.mixer = document.getElementById("color-mixer");
    this.mixer1 = document.getElementById("mixer1");
    this.mixer2 = document.getElementById("mixer2");
    this.currentMixer = this.mixer1;
    this.prevMixer = this.mixer2;

    this.restart = document.getElementById("restart-btn");
    this.submit = document.getElementById("submit-btn");

    this.score = document.getElementById("score-display");
    this.strikes = document.getElementById("strikes");

    this.rightIcon = document.getElementById("right-icon");
    this.wrongIcon = document.getElementById("wrong-icon");
  }

  startRender(title, startBtn) {
    this.guessing = true;
    moveTitle(title);
    hideText(startBtn);
    setTimeout(() => {
      this.renderBoard(this.target, this.swatchEles);}, 1750);
  }

  startGame(title, startBtn, startRender) {
    startBtn.addEventListener("click", function handler(e) {
      e.currentTarget.removeEventListener("click", handler);
      startRender(title, startBtn, this.target, this.swatches);
    });
  }

  setInitialMixer(color) {
    this.currentMixer.style.background = color;
    this.currentMixer.style.opacity = "1";
    // this.flipMixer();
    this.submissionColors["left"] = color;
  }

  assignMixer() {
    if (this.currentMixer === this.mixer1) {
      this.currentMixer = this.mixer2;
      this.prevMixer = this.mixer1;
    } else {
      this.currentMixer = this.mixer1;
      this.prevMixer = this.mixer2;
    }
  }

  flipMixer() {
    // this.currentMixer.style.visibility = "visible";
    this.currentMixer.style.opacity = "1";
    // this.prevMixer.style.visibility = "hidden";
    this.prevMixer.style.opacity = "0";
  }

  resetMixer(type) {
    // this.currentMixer.style.visibility = "hidden";
    this.currentMixer.style.opacity = "0";
    // this.prevMixer.style.visibility = "hidden";
    this.prevMixer.style.opacity = "0";
    if (type === "game") {
      setTimeout( () => {
        this.currentMixer.style.background = "none";
        this.prevMixer.style.background = "none";
        this.currentMixer = this.mixer1;
        this.active = true;
      }, 1000);
    } else {
      this.currentMixer.style.opacity = "0";
      this.prevMixer.style.opacity = "0";
      setTimeout( () => {
        this.currentMixer.style.background = "none";
        this.prevMixer.style.background = "none";
        this.active = true;
      }, 1000);
    }
  }

  setMixerColor() {
    const left = this.submissionColors["left"];
    const right = this.submissionColors["right"];
    const newBackground = `linear-gradient(to right, ${left} 30%, ${right} 70%)`;
    this.flipMixer();
    this.currentMixer.style.background = newBackground;
  }

  setMixerRoundEnd() {
    const submission = this.submissionColors;

    if (this.solutionColors.includes(submission["left"])) {
      submission["right"] = this.solutionColors.find( color => {
       return color !== submission["left"];
      });
    } else if (this.solutionColors.includes(submission["right"])) {
      submission["left"] = this.solutionColors.find( color => {
       return color !== submission["right"];
      });
    } else {
      submission["left"] = this.solutionColors[0];
      submission["right"] = this.solutionColors[1];
    }

    const left = submission["left"];
    const right = submission["right"];

    const newBackground = `linear-gradient(to right, ${left} 30%, ${right} 70%)`;
    this.assignMixer();
    this.flipMixer();
    this.currentMixer.style.background = newBackground;
  }

  updateMixer(swatchEle) {
    let mixer;
    let colors = [];

    const newColor = swatchEle.style.backgroundColor;
    const sides = Object.keys(this.submissionColors);

    this.assignMixer();

    if (this.submission.length === 1) {
      this.setInitialMixer(newColor);
    } else {
      if (this.submissionColors["right"] === null) {
        this.submissionColors["right"] = newColor;
        this.setMixerColor();
      } else {
        colors.push(this.submission[0].ele.style.backgroundColor);
        colors.push(this.submission[1].ele.style.backgroundColor);
        const newSide = sides.filter( side => {
          return !colors.includes(this.submissionColors[side]);
        })[0];
        this.submissionColors[newSide] = newColor;
        this.setMixerColor();
      }
    }
  }

  updateSubmission(swatchEle) {
    const submission = Object.values(this.submission);
    if (submission.length > 2) {
      const oldSwatch = this.submission[0];
      oldSwatch.ele.classList.toggle("selected-swatch");
      this.submission = this.submission.slice(1);
    }
  }

  addSelection(swatch, swatchEle) {
    swatchEle.addEventListener("click", (e) => {
      if (this.active && this.submission[1] !== swatch) {
        this.submission.push(swatch);
        this.updateSubmission(swatchEle);
        this.updateMixer(swatchEle);
        e.target.classList.toggle("selected-swatch");
      }
    });
  }

  resetSelection() {
    this.submission = [];
    this.submissionColors = {
      left: null,
      right: null,
    };
    this.solutionColors = [];
    this.swatches.forEach ( swatch => {
      swatch.ele.classList.remove(
        "selected-swatch",
        "solution-swatch",
        "other-swatch",
        "hidden-swatch");
    });
  }

  processAnswer() {
    if (this.guessing === true && this.submission.length === 2) {
      this.active = false;
      this.guessing = false;
      toggleText(this.submit);
      setTimeout(() => toggleText(this.restart), 750);
      this.setMixerRoundEnd();
      if (this.submission.length === 2) {
        this.swatches.forEach( swatch => {
          showMatch(swatch);
        });
        if (this.submission.some( swatch => swatch.solution === false )) {
          this.wrongIcon.classList.remove("hidden-text");
          this.updateStrikes();
        } else {
          this.updateScore();
          this.rightIcon.classList.remove("hidden-text");
        }
      }
    }
  }

  updateStrikes() {
    this.strikeCount += 1;
    let currentStrike = document.getElementById(`strike${this.strikeCount}`);
    currentStrike.classList.add("active-strike");
    if (this.strikeCount === 3) {
      this.endGame();
    }
  }

  updateScore() {
    this.scoreCount += 1;
    this.score.innerHTML = `score: ${this.scoreCount}`;
  }

  endGame() {
    moveScore(this.score);

    this.wrongIcon.classList.add("hidden-text");
    this.rightIcon.classList.add("hidden-text");

    hideText(this.strikes);

    this.restart.innerHTML = "new game";
  }

  restartGame() {
    this.active = false;
    if (this.strikeCount === 3) {
      this.scoreCount = 0;
      this.strikeCount = 0;
      this.score.innerHTML = `score: ${this.scoreCount}`;
      showText(this.strikes);
      resetStrikes();
      resetScore(this.score);
      this.resetMixer("game");
      this.restartGame();
    } else {
      if (this.guessing === false) {
        this.guessing = true;
        toggleText(this.restart);
        setTimeout(() => {
          if (this.restart.innerHTML === "new game") {
            this.restart.innerHTML = "next round";
          }
        }, 750);
        setTimeout(() => toggleText(this.submit), 750);

        this.resetMixer("round");
        this.resetSelection();
        this.wrongIcon.classList.add("hidden-text");
        this.rightIcon.classList.add("hidden-text");

        let newColors = getEasyColors();
        let newTargetColor = this.target.setEasyColor(newColors[0], newColors[1]);
        newColors = _.shuffle(newColors);

        for (let i=0; i < this.swatches.length; i++) {
          let swatch = this.swatches[i];
          swatch.setColor(newColors[i]);
          let color = swatch.ele.style.backgroundColor;
          if (newColors[i][3]) {
            swatch.solution = true;
            this.solutionColors.push(color);
          } else {
            swatch.solution = false;
          }
        }
      }
    }
  }

  renderBoard(target, swatches) {
    let allColors = getEasyColors();
    let targetColor = target.setEasyColor(allColors[0], allColors[1]);

    allColors = _.shuffle(allColors);
    setBorder(target.ele);
    setBorder(this.mixer);
    showText(this.submit);
    showText(this.score);
    showText(this.strikes);

    for (let i=0; i < swatches.length; i++) {
      let newSwatch = new Swatch(swatches[i].id, i);
      newSwatch.setColor(allColors[i]);
      let color = newSwatch.ele.style.backgroundColor;
      setBorder(newSwatch.ele);
      this.addSelection(newSwatch, newSwatch.ele);
      if (allColors[i][3]) {
        newSwatch.solution = true;
        this.solutionColors.push(color);
      }
      this.swatches.push(newSwatch);
    }
    return this.swatches;
  }

  createSwatches() {

  }
}

export default Game;
