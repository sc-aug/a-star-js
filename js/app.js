function initMazeProcess() {
  var mazeSizeSelector = document.getElementById("mazeSizeSelector");
  var mazeTempSelector = document.getElementById("mazeTempSelector");
  var start = document.getElementById("start");
  var dest = document.getElementById("dest");
  Controller.initMaze(mazeSizeSelector.value, mazeTempSelector.value, start, dest);
  initMouseFunc();
}


function handleMazeSizeSelector(Obj) {
  ;
}

function handleMazeTempSelector(Obj) {
  initMazeProcess();
  clean = true;
}

function handleStartCoordinates() {
  if (Controller.checkCoord(this)) {
    initMazeProcess();
    clean = true;
  } else {
    window.alert("wrong input.");
  }
}

function handleDestCoordinates() {
  if (Controller.checkCoord(this)) {
    initMazeProcess();
    clean = true;
  } else {
    window.alert("wrong input.");
  }
}

function handleAddRandBtn() {
  initMazeProcess();
  Controller.addRandNode();
  Controller.refreshBlocks();
  Controller.refreshPin();
  clean = true;
}

function handleFindPathBtn() {
  cleanMaze();
  disablePanel();
  PathController.initData();
  intv = setInterval(function() { PathController.findPathLoop();}, 50);
  clean = false;
}

function handleCleanBtn() {
  cleanMaze()
}

function cleanMaze() {
  if (! clean) {
    initMazeProcess();
    clean = true;
  }
}

function handleOneStepBtn() {
  cleanMaze();
  PathController.findPathLoop();
}

function handleCellOnclick(Obj) {
  Controller.flipBlockState(Obj.target.id);
}

function initMouseFunc() {
  // MOUSE
  var size = Model.getMazeSize();
  var tableCells = getTableCellsObj();
  for (var i = 0; i < size; i ++) {
    for (var j = 0; j < size; j ++) {
      tableCells[i][j].onclick = handleCellOnclick;
    }
  }
}

function getTableCellsObj() {
  var tbl = [[]];
  var size = Model.getMazeSize();
  for (var i = 0; i < size; i ++) tbl[i] = [];
  for (var i = 0; i < size; i ++) {
    for (var j = 0; j < size; j ++) {
      tbl[i][j] = document.getElementById("id_"+i+"_"+j);
    }
  }
  return tbl;
}

function disablePanel() {
  var mazeSizeSelector = document.getElementById("mazeSizeSelector");
  // Maze
  var mazeTempSelector = document.getElementById("mazeTempSelector");
  // Coordinates
  var startCoordinates = document.getElementById("start");
  var destCoordinates = document.getElementById("dest");
  // Add Random Blocks Button
  var addRandBtn = document.getElementById("addRandBtn");
  // Find Path Button
  var findPathBtn = document.getElementById("findPathBtn");
  // Clean Maze
  var cleanBtn = document.getElementById("cleanBtn");

  mazeSizeSelector.disabled = true;
  mazeTempSelector.disabled = true;
  addRandBtn.disabled = true;
  findPathBtn.disabled = true;
  cleanBtn.disabled = true;
  startCoordinates.children[0].disabled = true;
  startCoordinates.children[1].disabled = true;
  destCoordinates.children[0].disabled = true;
  destCoordinates.children[1].disabled = true;
}

function enablePanel() {
  var mazeSizeSelector = document.getElementById("mazeSizeSelector");
  // Maze
  var mazeTempSelector = document.getElementById("mazeTempSelector");
  // Coordinates
  var startCoordinates = document.getElementById("start");
  var destCoordinates = document.getElementById("dest");
  // Add Random Blocks Button
  var addRandBtn = document.getElementById("addRandBtn");
  // Find Path Button
  var findPathBtn = document.getElementById("findPathBtn");
  // Clean Maze
  var cleanBtn = document.getElementById("cleanBtn");

  mazeSizeSelector.disabled = false;
  mazeTempSelector.disabled = false;
  addRandBtn.disabled = false;
  findPathBtn.disabled = false;
  cleanBtn.disabled = false;
  startCoordinates.children[0].disabled = false;
  startCoordinates.children[1].disabled = false;
  destCoordinates.children[0].disabled = false;
  destCoordinates.children[1].disabled = false;
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

  // var oneStepBtn = document.getElementById("oneStepBtn");
  // oneStepBtn.onclick = handleOneStepBtn;

  // create world
  initMazeProcess();
}

var intv = null;
var clean = true;

window.onload = init;

