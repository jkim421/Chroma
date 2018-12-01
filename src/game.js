import Target from './swatch.js';
import Swatch from './swatch.js';
import { getEasyColors, getHardColors } from './colors.js';
import { setBorder, removeBorder, hideText, showText, moveTitle } from './layout.js';
import { shuffle, sample } from 'lodash';

class Game {
  constructor() {
    this.submission = [];
    this.swatches = [];
    this.timeoutFunc = null;
    this.startRender = this.startRender.bind(this);
  }

  startRender(title, startBtn, target, swatches, mixer, e) {
    moveTitle(title);
    hideText(startBtn);
    setTimeout(() => {
      this.renderBoard(target, swatches, mixer);}, 2000);
  }

  startGame(title, startBtn, target, swatches, mixer, startRender) {
    startBtn.addEventListener("click", function handler(e) {
      e.currentTarget.removeEventListener("click", handler);
      startRender(title, startBtn, target, swatches, mixer);
    });
  }

  // startGame(title, startBtn, target, swatches, mixer) {
  //   startBtn.addEventListener("click", (e) => {
  //     moveTitle(title);
  //     hideText(startBtn);
  //     setTimeout(() => this.renderBoard(target, swatches, mixer), 2000);
  //   }, {once: true});
  // }

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
  }

  restartGame(target, swatches, mixer) {
    mixer.style.backgroundColor = "transparent";

    this.resetSelection();

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

  renderBoard(target, swatches, mixer) {
    let allColors = getEasyColors();
    let targetColor = target.setEasyColor(allColors[0], allColors[1]);

    allColors = _.shuffle(allColors);
    setBorder(target.ele);
    setBorder(mixer);

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
