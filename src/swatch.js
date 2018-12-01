class Swatch {
  constructor(swatchId, rgb) {
    this.solution = false;
    this.ele = document.getElementById(swatchId);
    this.clickAction();
  }

  setColor(colorArr) {
    let rgb;
    rgb = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    this.ele.style.backgroundColor = rgb;
  }

  clickAction() {
    let colorMixer = document.getElementById("color-mixer");
    this.ele.addEventListener("click", (e) => {
      colorMixer.style.backgroundColor = this.ele.style.backgroundColor;
    });
  }
}

export default Swatch;
