//CONSTANTES
const HARD_MODE = 6;
const EASY_MODE = 3;
const NONE = "none";
const BLOCK = "block";
const BODY_BACKGROUND_COLOR = document.body.style.backgroundColor;
const TEXT_CORRECT = "Correct!";
const TEXT_TRY_AGAIN = "Try again";
const TEXT_NEW_COLORS = "New colors";
const TEXT_PLAY_AGAIN = "Play again?";

//COMPONENTES
const _h1 = document.querySelector("h1");
const _squares = document.querySelectorAll(".square");
const _colorDisplay = document.querySelector("#colorDisplay");
const _message = document.querySelector("#message");
const _button = document.querySelector("#reset");
const _hard = document.querySelector("#hard");
const _easy = document.querySelector("#easy");

//VARIABLES
let colors = [];
let pickedColor;
let mode;

//FUNCIONES
function getRandomColor() {
  let color = "rgb(";
  let intensity;

  for(let i = 1; i <= 3; i++) {
    intensity = Math.floor(Math.random() * (255 - 1)) + 1;
    color += intensity;
    i < 3 ? color += ", " : color += ")";
  }

  return color;
}

function generateArrayRandomColors(length) {
  let randomColors = [];

  for(let i = 0; i < length; i++) {
    randomColors.push(getRandomColor());
  }

  return randomColors;
}

function changeDisplay(component, displayMode) {
	component.style.display = displayMode;
}

function changeColor(component, color) {
	component.style.backgroundColor = color;
}

function changeText(component, text) {
  component.textContent = text;
}

function setSquare(square, color) {
  if(color) {
    changeDisplay(square, BLOCK);
    changeColor(square, color);
  } else {
    changeDisplay(square, NONE);
  }
}

function changeSquaresColor(color) {
  _squares.forEach(square => changeColor(square, color));
}

function setSquares() {
  _squares.forEach((square, i) => setSquare(square, colors[i]));
}

function pickColor() {
  return colors[Math.floor(Math.random() * (colors.length - 1)) + 1];
}

function setGameComponents() {
  //Set the current mode
  _hard.classList.contains("selected") ? mode = 6 : mode = 3;

  //Set the array of colors
  colors = generateArrayRandomColors(mode);
  setSquares();

  //Pick one
  pickedColor = pickColor();
  changeText(_colorDisplay, pickedColor);

  //Set the initial layout
  changeColor(_h1, BODY_BACKGROUND_COLOR);
  changeText(_button, TEXT_NEW_COLORS);
  changeText(_message, "");
}

function compareColors(square) {
  let clickedColor = square.style.backgroundColor;

  //Compare colors
  if(clickedColor === pickedColor) {
    changeText(_message, TEXT_CORRECT);
    changeColor(_h1, clickedColor);
    changeSquaresColor(clickedColor);
    changeText(_button, TEXT_PLAY_AGAIN);
  } else {
    changeText(_message, TEXT_TRY_AGAIN);
    changeColor(square, BODY_BACKGROUND_COLOR);
  }
}

function changeSelectedButton() {
  _easy.classList.toggle("selected");
  _hard.classList.toggle("selected");
}

function changeMode(newMode) {
  //Change the mode only if the new one is different to the current one
  if(mode !== newMode) {
    changeSelectedButton();
    setGameComponents();
  }
}

function setEvents() {
  _squares.forEach(square => square.addEventListener("click", function() { compareColors(this); }));
  _button.addEventListener("click", setGameComponents);
  _hard.addEventListener("click", () => changeMode(HARD_MODE));
  _easy.addEventListener("click", () => changeMode(EASY_MODE));
}

function playGame() {
  setGameComponents();
  setEvents();
}

//INICIAR JUEGO
playGame();