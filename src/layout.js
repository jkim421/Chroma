export const setBorder = (ele) => {
  ele.classList.add("visible-colorable");
};

export const removeBorder = (ele) => {
  ele.style.borderColor = "transparent";
};

export const moveTitle = (title) => {
  // title.setAttribute("style", "font-size: 20px; top: 20px; left: 20px");
  title.setAttribute("style", "font-size: 26px; top: 20px; left: 170px");
};

export const moveScore = (score) => {
  score.setAttribute("style", "font-size: 50px; top: 285px; right: 160px;");
};

export const resetScore = (score) => {
  score.setAttribute("style", "");
};

export const hideText = (ele) => {
  ele.classList.add("hidden-text");
};

export const showText = (ele) => {
  ele.classList.remove("hidden-text");
};

export const toggleText = (ele) => {
  ele.classList.toggle("hidden-text");
};

export const showMatch = (swatch) => {
  swatch.ele.classList.remove("selected-swatch");
  if (swatch.solution) {
    swatch.ele.classList.add("solution-swatch");
  } else {
    swatch.ele.classList.add("other-swatch");
    swatch.ele.classList.add("hidden-swatch");
  }
};

export const resetStrikes = () => {
  const strikes = Array.from(document.getElementsByClassName("strikes"));
  strikes.forEach( strike => {
    strike.classList.remove("active-strike");
  });
};
