# Chroma
### Summary
Chroma is a dynamic color blending perception game.

[Live Link](https://jkim421.github.io/Chroma)

<img src="https://i.imgur.com/h6BDhwm.png" alt="example" width="380"/>

### How To Play
In each round of Chroma, six color swatches are randomly generated. Then, a target color is chosen that is the squared average of the RGB values of two of the color swatches (for more on why a squared average is used, see [this video](https://www.youtube.com/watch?v=LKnqECcg6Gw)). The goal of each round is to correctly guess the two color swatches that were used to generated the target color. The player can use the mixer palette to toggle between any two color swatches. When the player toggles between the two solution colors, the target color will appear for a instant in the transition between the colors. The player gains a point with each correct submission and a strike for each incorrect guess, and the game ends when the player receives three strikes.

## Technologies
Chroma is built entirely using HTML, CSS, and vanilla JavaScript DOM manipulation.

## Color Selection

Six RGB values are randomly generated for the six color swatches on the board. The first two randomly generated colors are marked as the componenets of the target color. Then, in the Target class, the target color is generated from the squared average of those two RGB values.

``` javascript
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
```

``` javascript
class Target {
  constructor() {
    this.ele = document.getElementById("target-color");
  }

  setEasyColor(rgbOne, rgbTwo) {
    let targetR = Math.round(Math.sqrt(((rgbOne[0]**2 + rgbTwo[0]**2)/2)));
    let targetG = Math.round(Math.sqrt(((rgbOne[1]**2 + rgbTwo[1]**2)/2)));
    let targetB = Math.round(Math.sqrt(((rgbOne[2]**2 + rgbTwo[2]**2)/2)));
    const targetColor = `rgba(${targetR},${targetG},${targetB}, 0.8)`;
    this.ele.style.backgroundColor = targetColor;
    return [targetR, targetG, targetB];
  }
}
```

## Animations for Menu Text

CSS animations are used to provide the rotating color animations on menu text.

``` javascript
#title1 {
  animation: 15s infinite alternate-reverse linear title1;
}

@keyframes title1 {
  0%{color: red}
  16%{color: orange}
  33%{color: yellow}
  50%{color: green}
  66%{color: blue}
  83%{color: indigo}
  100%{color: violet}
}
```

## Roadmap
* Add persisting high scores
* Cap how similar colors can be by forcing variation in randomly generated 
