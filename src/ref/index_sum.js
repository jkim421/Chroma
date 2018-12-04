import Target from './target.js';
import Swatch from './swatch.js';
import { getAllColors } from './colors.js';
import { shuffle } from 'lodash';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 800;
  canvas.width = 500;


  let target = new Target;
  let targetColor = target.setColor();

  const colorRange = 300;

  let swatchEles = Array.from(
    document.getElementsByClassName("color-swatches"));

  let allColors = getAllColors(targetColor, colorRange);
  allColors = _.shuffle(allColors);

  let colorSwatches = [];

  for (let i=0; i < swatchEles.length; i++) {
    let newSwatch = new Swatch(swatchEles[i].id);
    newSwatch.setColor(allColors[i]);
    if (allColors[i][3]) {
      newSwatch.solution = true;
    }
    colorSwatches.push(newSwatch);
  }
});
