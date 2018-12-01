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
  ele.classList.toggle("hidden-text");
};

export const showText = (ele) => {
  ele.classList.toggle("hidden-text");
};
