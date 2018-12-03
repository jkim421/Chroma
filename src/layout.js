export const setBorder = (ele) => {
  ele.classList.add("visible-colorable");
};

export const removeBorder = (ele) => {
  ele.style.borderColor = "transparent";
};

export const moveTitle = (title) => {
  title.setAttribute("style", "font-size: 20px; top: 20px; left: 20px");
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
