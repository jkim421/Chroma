const randomNum = num => Math.round(Math.random() * num);

const makeColor = () => {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    rgb.push(randomNum(255));
  }
  return rgb;
};

export const getEasyColors = () => {
  let colors = [];
  for (let i = 0; i < 6; i++) {
    let swatch = makeColor();
    if (i < 2) {
      swatch.push(true);
    }
    colors.push(swatch);
  }
  return colors;
};

export const getHardColors = () => {
  let colors = [];
  for (let i = 0; i < 6; i++) {
    let swatch = makeColor();
    if (i < 3) {
      swatch.push(true);
    }
    colors.push(swatch);
  }
  return colors;
};
