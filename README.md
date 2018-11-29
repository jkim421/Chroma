# Chroma
### Summary
Chroma is a dynamically animated color blending puzzle game.

### How It's Played
In each round of Chroma, the player is presented with a target color and six color swatches. The goal of each round is to correctly select the colors swatches that will blend together to create the target color. If the player correcty guesses the blending set of swatches, they receive a point. With each incorrect blending the player receives a strike. If a player receives two strikes in a single round, they lose the game. They also lose the game when they receive three strikes total. As the player's score increases, the rounds will progressively become more difficult as the contrast between colors decreases and the number of swatches involved in the correct combination increases.

### MVPs
1. Game board with interactive panels for color display, selection, and blending
2. Random target color selection and generation of color swatches that can combine to match and near-match the target color
3. Feedback for correct guesses and incorrect guesses and tracking of player score and strikes
4. Transitions between rounds and resetting of game state after a complete game
6. Animations for the blending of colors and transitions between rounds

### Wireframe
![Chrome](https://i.imgur.com/XHr6APd.png)

### Implementation
Chroma will be build using JavaScript, HTML, and CSS. 

### Timeline

Day 1:
* Build game board and click detection for swatches
* Implement color selection function that generates target color and color swatches

Day 2:
* Create game logic for correct matches and misses
* Enable swatch clicks to fill and blend colors on blending palette

Day 3:
* Create animations for round transitions

Day 4:
* Build game start and end transitions and menus
* Allow for entry, tracking, and display of high scores
