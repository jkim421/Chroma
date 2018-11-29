class Swatch {
  constructor(swatchId, rgb) {
    this.swatch = document.getElementById(swatchId);
    this.clickAction();
  }

  setColor(colorArr) {
    debugger
    let rgb;
    rgb = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    debugger
    this.swatch.style.backgroundColor = rgb;
  }

  clickAction() {
    this.swatch.addEventListener("click", () => console.log(this.swatch.id));
  }

}

export default Swatch;
