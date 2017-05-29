function initMazeProcess() {
  var mazeSizeSelector = document.getElementById("mazeSizeSelector");
  var mazeTempSelector = document.getElementById("mazeTempSelector");
  var start = document.getElementById("start");
  var dest = document.getElementById("dest");
  Controller.initMaze(mazeSizeSelector.value, mazeTempSelector.value, start, dest);
}


function handleMazeSizeSelector(Obj) {
  ;
}

function handleMazeTempSelector(Obj) {
  initMazeProcess();
}

function handleStartCoordinates() {
  if (Controller.checkCoord(this)) {
    initMazeProcess();
  } else {
    window.alert("wrong input.");
  }
}

function handleDestCoordinates() {
  if (Controller.checkCoord(this)) {
    initMazeProcess();
  } else {
    window.alert("wrong input.");
  }
}

function handleAddRandBtn() {
  initMazeProcess();
  Controller.addRandNode();
  Controller.refreshBlocks();
  Controller.refreshPin();
}

function handleFindPathBtn() {
  PathController.findPath();
}

function handleCleanBtn() {
  initMazeProcess();
}

function init() {
  // Maze Size
  var mazeSizeSelector = document.getElementById("mazeSizeSelector");
  mazeSizeSelector.onchange = handleMazeSizeSelector;

  // Maze
  var mazeTempSelector = document.getElementById("mazeTempSelector");
  mazeTempSelector.onchange = handleMazeTempSelector;

  // Coordinates
  var startCoordinates = document.getElementById("start");
  var destCoordinates = document.getElementById("dest");
  startCoordinates.onchange = handleStartCoordinates;
  destCoordinates.onchange = handleDestCoordinates;

  // Add Random Blocks Button
  var addRandBtn = document.getElementById("addRandBtn");
  addRandBtn.onclick = handleAddRandBtn;

  // Find Path Button
  var findPathBtn = document.getElementById("findPathBtn");
  findPathBtn.onclick = handleFindPathBtn;

  // Clean Maze
  var cleanBtn = document.getElementById("cleanBtn");
  cleanBtn.onclick = handleCleanBtn;

  // create world
  initMazeProcess();
}

window.onload = init;

