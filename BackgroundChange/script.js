const colors = ["red", "green", "yellow", "orange", "blue", "pink"];

function onColorBoxClick(e) {
  const classList = e?.target?.classList;
  if (classList.contains("color-box")) {
    const selectedBgDiv = document.getElementsByClassName("selected-bg")[0];
    const colorName = e?.target?.dataset?.val;
    selectedBgDiv.style.backgroundColor = colorName;
  }
}

function createColorBox(colorName) {
  const divElement = document.createElement("div");
  divElement.textContent = colorName
  divElement.setAttribute("data-val", colorName);
  divElement.style.backgroundColor = colorName;
  divElement.classList.add("color-box");
  return divElement;
}

document.addEventListener("DOMContentLoaded", () => {
  const colorsList = document.getElementsByClassName("colors-list")[0];
  colorsList.addEventListener("click", onColorBoxClick);
  colors.forEach((color) => colorsList.appendChild(createColorBox(color)));
});
