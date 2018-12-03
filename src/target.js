class Target {
  constructor() {
    this.ele = document.getElementById("target-color");
  }

  // setEasyColor(rgbOne, rgbTwo) {
  //   let targetR = Math.round((rgbOne[0] + rgbTwo[0])/2);
  //   let targetG = Math.round((rgbOne[1] + rgbTwo[1])/2);
  //   let targetB = Math.round((rgbOne[2] + rgbTwo[2])/2);
  //   const targetColor = `rgb(${targetR},${targetG},${targetB})`;
  //   this.target.style.backgroundColor = targetColor;
  //   return [targetR, targetG, targetB];
  // }

  setEasyColor(rgbOne, rgbTwo) {
    let targetR = Math.round(Math.sqrt(((rgbOne[0]**2 + rgbTwo[0]**2)/2)));
    let targetG = Math.round(Math.sqrt(((rgbOne[1]**2 + rgbTwo[1]**2)/2)));
    let targetB = Math.round(Math.sqrt(((rgbOne[2]**2 + rgbTwo[2]**2)/2)));
    const targetColor = `rgba(${targetR},${targetG},${targetB}, 0.8)`;
    this.ele.style.backgroundColor = targetColor;
    return [targetR, targetG, targetB];
  }

  setHardColor(rgbOne, rgbTwo, rgbThree) {
    let targetR = Math.round((rgbOne[0] + rgbTwo[0] + rgbThree[0])/3);
    let targetG = Math.round((rgbOne[1] + rgbTwo[1] + rgbThree[1])/3);
    let targetB = Math.round((rgbOne[2] + rgbTwo[2]) + rgbThree[2]/3);
    const targetColor = `rgba(${targetR},${targetG},${targetB}, 0.8)`;
    this.ele.style.backgroundColor = targetColor;
    return [targetR, targetG, targetB];
  }
}

export default Target;
