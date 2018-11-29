import { setTarget } from './target.js';
import Swatch from './swatch.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 800;
  canvas.width = 500;

  setTarget();
  let swatchCollection = Array.from(document.getElementsByClassName("color-swatches"));
  let colorSwatches = swatchCollection.map( swatch => new Swatch(swatch.id));
});
