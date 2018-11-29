let targetR = Math.round(Math.random()*255);
let targetG = Math.round(Math.random()*255);
let targetB = Math.round(Math.random()*255);

const targetColor = `rgb(${targetR},${targetG},${targetB})`;

export const setTarget = () => {
  document.getElementById("target-color").style.backgroundColor = targetColor;
};
