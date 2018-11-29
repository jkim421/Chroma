export const randomNum = num => Math.round(Math.random() * num);

const getSolutionColors = (target, range) => {
  let dRed, dBlue, dGreen, colorOne, colorTwo;
  let remainder = range;

  dRed = randomNum(target[0]);
  dBlue = randomNum(target[1]);
  dGreen = randomNum(target[2]);

  colorOne = [dRed, dBlue, dGreen, true];
  colorTwo = [target[0]-dRed, target[1]-dBlue, target[2]-dGreen, true];

  return [colorOne, colorTwo];
};

const makeOtherColor = (target, range) => {
  let remainder = range;
  return target.map( value => {
    let delta = randomNum(remainder);
    remainder -= delta;
    return (value + delta) % 255;
  });
};
const getOtherColors = (target, range) => {
  let colors = [];
  for (let i = 0; i < 4; i++) {
    colors.push( makeOtherColor(target, range));
  }
  return colors;
};

export const getAllColors = (target, range) => {
  const solution = getSolutionColors(target, range);
  const other = getOtherColors(target, range);
  return solution.concat(other);
};
