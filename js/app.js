function handleMazeSizeSelector(Obj) {
  ;
}

function handleMazeTempSelector(Obj) {
  Controller.initMaze(Object.target.value);
}

function handleAddRandBtn() {
  Controller.addRandNode();
  Controller.refreshBlocks();
}

function handleFindPathBtn() {
  PathController.findPath();
}

function handleCleanBtn() {
  Controller.clean();
  Controller.refreshBlocks();
}

function init() {
  // Maze Size
  var mazeSizeSelector = document.getElementById("mazeSizeSelector");
  mazeSizeSelector.onchange = handleMazeSizeSelector;

  // Maze
  var mazeTempSelector = document.getElementById("mazeTempSelector");
  mazeTempSelector.onchange = handleMazeTempSelector;

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
  Controller.initMaze(mazeSizeSelector.value, mazeTempSelector.value);
}

window.onload = init;

