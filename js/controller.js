var Controller = {
  
  initMaze: function(size, index) {
    View.genMazeTable(size);
    Model.initMaze(index);
    Model.initHeuDist();
    Controller.refreshBlocks();
  },

  refreshBlocks: function() {
    var mat = Model.getMaze();
    var size = Model.getMazeSize();

    // blocks
    for (var i = 0; i < size; i ++) {
      for (var j = 0; j < size; j ++) {
        if (mat[i][j]) View.block(i, j);
        else View.unblock(i, j);
      }
    }
  },

  refreshStartDest: function() {
    var st = Model.getStartPos();
    var ds = Model.getDestPos();
    View.twoPoint(st, ds);
  },

  clean: function() {
    Model.clean();
    Controller.refreshBlocks();
  },

  // for manual generate Btn
  oneGenerate: function() {
    model.propogate();
    model.flipSwicher();
    controller.refresh();
  },

  addRandNode: function() {
    var xyPairs = util.genRandNode();
    model.addRandNode(xyPairs);
  },

  // mouse click function
  flipCellState: function(tdid) {
    var mat = model.getCurMatrix();
    var cord = tdid.split("_");
    var i = cord[1], j = cord[2];
    var state = mat[i][j];
    mat[i][j] = !state;
    if (mat[i][j]) {
      view.live(i,j);
    } else {
      view.die(i,j);
    }
  },

  focusCell: function(tdid) {
    var mat = model.getCurMatrix();
    var cord = tdid.split("_");
    var i = cord[1], j = cord[2];
    var state = mat[i][j];
    view.foc(i,j);
  },

  unFocusCell: function(tdid) {
    var mat = model.getCurMatrix();
    var cord = tdid.split("_");
    var i = cord[1], j = cord[2];
    if (mat[i][j]) {
      view.live(i,j);
    } else {
      view.die(i,j);
    }
  }

}