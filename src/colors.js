export const randomNum = num => Math.round(Math.random() * num);

export const getSwatchColor = (target, range) => {
  let remainder = range;
  return target.map( value => {
    let delta = randomNum(remainder);
    remainder -= delta;
    return (value + delta) % 255;
  });
};
