import { randomNum } from './colors.js';

class Target {
  constructor() {
    this.target = document.getElementById("target-color");
    this.setColor();
  }

  setColor() {
    let targetR = randomNum(255);
    let targetG = randomNum(255);
    let targetB = randomNum(255);
    const targetColor = `rgb(${targetR},${targetG},${targetB})`;
    this.target.style.backgroundColor = targetColor;
    return [targetR, targetG, targetB];
  }
}

export default Target;
