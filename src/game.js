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
  moveScore,
  resetScore,
  resetStrikes,
  showMatch } from './layout.js';
import { shuffle, sample } from 'lodash';

class Game {
  constructor(target, swatchEles) {
    this.target = target;
    this.swatchEles = swatchEles;
    this.solutionColors = [];

    this.submission = [];
    this.submissionColors = [];
    this.swatches = [];
    this.startRender = this.startRender.bind(this);
    this.scoreCount = 0;
    this.strikeCount = 0;
    this.guessing = false;

    this.mixer = document.getElementById("color-mixer");

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
      this.renderBoard(this.target, this.swatchEles);}, 1500);
  }

  startGame(title, startBtn, startRender) {
    startBtn.addEventListener("click", function handler(e) {
      e.currentTarget.removeEventListener("click", handler);
      startRender(title, startBtn, this.target, this.swatches);
    });
  }

  updateMixer() {
    if (this.submission.length === 2) {
      if (this.mixer.style.backgroundColor === this.submissionColors[0]) {
        this.mixer.style.backgroundColor = this.submissionColors[1];
      } else {
        this.mixer.style.backgroundColor = this.submissionColors[0];
      }
    }
  }

  updateSelections(swatchEle) {
    if (this.submission.length > 2) {
      const oldSwatch = this.submission[0];
      oldSwatch.ele.classList.toggle("selected-swatch");
      this.submission = this.submission.slice(1);
      this.submissionColors = this.submissionColors.slice(1);
    }
  }

  addSelection(swatch, swatchEle) {
    swatchEle.addEventListener("click", (e) => {
      if (this.submission[1] !== swatch) {
        this.submission.push(swatch);
        this.submissionColors.push(swatch.ele.style.backgroundColor);
        this.updateSelections(swatchEle);
        e.target.classList.toggle("selected-swatch");
      }
    });
  }

  resetSelection() {
    this.submission = [];
    this.submissionColors = [];
    this.solutionColors = [];
    this.swatches.forEach ( swatch => {
      swatch.ele.classList.remove(
        "selected-swatch",
        "solution-swatch",
        "other-swatch",
        "hidden-swatch");
    });
  }

  handleClick(e, restart, submit) {
    if (e.currentTarget.innerHTML === "submit guess") {
      this.processAnswer(restart, submit);
    } else {
      this.processAnswer();
    }
  }

  processAnswer() {
    if (this.guessing === true && this.submission.length === 2) {
      this.guessing = false;
      toggleText(this.submit);
      setTimeout(() => toggleText(this.restart), 750);

      this.mixer.style.backgroundColor = this.target.ele.style.backgroundColor;
      this.submissionColors = this.solutionColors;

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
    if (this.strikeCount === 3) {
      this.scoreCount = 0;
      this.strikeCount = 0;
      this.score.innerHTML = `score: ${this.scoreCount}`;
      showText(this.strikes);
      resetStrikes();
      resetScore(this.score);
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

        this.resetSelection();

        this.wrongIcon.classList.add("hidden-text");
        this.rightIcon.classList.add("hidden-text");

        let newColors = getEasyColors();
        let newTargetColor = this.target.setEasyColor(newColors[0], newColors[1]);
        newColors = _.shuffle(newColors);

        for (let i=0; i < this.swatches.length; i++) {
          this.swatches[i].setColor(newColors[i]);
          let color = this.swatches[i].ele.style.backgroundColor;
          if (newColors[i][3]) {
            this.swatches[i].solution = true;
            this.solutionColors.push(color);
          } else {
            this.swatches[i].solution = false;
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
      let newSwatch = new Swatch(swatches[i].id);
      newSwatch.setColor(allColors[i]);
      setBorder(newSwatch.ele);
      this.addSelection(newSwatch, newSwatch.ele);
      if (allColors[i][3]) {
        newSwatch.solution = true;
      }
      this.swatches.push(newSwatch);
    }
    return this.swatches;
  }
}

export default Game;
