import { randomNum } from './colors.js';

class Target {
  constructor() {
    this.target = document.getElementById("target-color");
  }

  setEasyColor(rgbOne, rgbTwo) {
    let targetR = Math.round((rgbOne[0] + rgbTwo[0])/2);
    let targetG = Math.round((rgbOne[1] + rgbTwo[1])/2);
    let targetB = Math.round((rgbOne[2] + rgbTwo[2])/2);
    const targetColor = `rgb(${targetR},${targetG},${targetB})`;
    this.target.style.backgroundColor = targetColor;
    return [targetR, targetG, targetB];
  }

  setHardColor(rgbOne, rgbTwo, rgbThree) {
    let targetR = Math.round((rgbOne[0] + rgbTwo[0] + rgbThree[0])/3);
    let targetG = Math.round((rgbOne[1] + rgbTwo[1] + rgbThree[1])/3);
    let targetB = Math.round((rgbOne[2] + rgbTwo[2]) + rgbThree[2]/3);
    const targetColor = `rgb(${targetR},${targetG},${targetB})`;
    this.target.style.backgroundColor = targetColor;
    return [targetR, targetG, targetB];
  }
}

export default Target;
