import Target from './target.js';
import Swatch from './swatch.js';
import { randomNum, getSwatchColor } from './colors.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 800;
  canvas.width = 500;


  let target = new Target;
  let targetColor = target.setColor();

  const colorRange = 300;

  let swatchCollection = Array.from(document.getElementsByClassName("color-swatches"));

  let colorSwatches = swatchCollection.map( swatch => {
    let swatchColor = getSwatchColor(targetColor, colorRange);
    let newSwatch = new Swatch(swatch.id);
    debugger
    newSwatch.setColor(swatchColor);
  });


});
