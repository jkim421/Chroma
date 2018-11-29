class Swatch {
  constructor(swatchId, rgb) {
    this.solution = false;
    this.swatch = document.getElementById(swatchId);
    this.clickAction();
  }

  setColor(colorArr) {
    let rgb;
    rgb = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    this.swatch.style.backgroundColor = rgb;
  }

  clickAction() {
    this.swatch.addEventListener("click", () => console.log(this.swatch.id));
  }

}

export default Swatch;
