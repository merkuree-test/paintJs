const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";
const INTIALL_LINE_WIDTH = 2.5;

const CANVAS_SIZE = 700;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWth = INTIALL_LINE_WIDTH;

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke(); 
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClick (event) {
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeSize (event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick () {
  if (!filling) {
    filling = true;
    mode.innerText = "Paint";
  } else {
    filling = false;
    mode.innerText = "Fill";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick () {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM (event) {
  event.preventDefault();
}

function saveImageFile () {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "download.jpg";
  link.click();
}

if(canvas) {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", onMouseUp);  
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  Array.from(colors).forEach((color) => color.addEventListener("click",handleColorClick)); 
}

if (range) {
  range.addEventListener("input", handleRangeSize);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImageFile);
}