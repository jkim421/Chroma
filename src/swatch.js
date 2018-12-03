class Swatch {
  constructor(swatchId, rgb) {
    this.solution = false;
    this.ele = document.getElementById(swatchId);
    this.clickAction();
  }

  setColor(colorArr) {
    let rgb;
    rgb = `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, 0.8)`;
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
