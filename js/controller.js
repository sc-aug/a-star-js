var Controller = {
  
  initMaze: function(size, index) {
    View.genMazeTable(size);
    Model.initMaze(index);
    Model.initHeuDist();
    Controller.refreshBlocks();
    Controller.refreshPin();
  },

  oneStep: function(pos) {
    Model.visited(pos[0], pos[1]);
    View.dyePath(pos[0], pos[1]);
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

  refreshPin: function() {
    var st = Model.getStartPos();
    var ds = Model.getDestPos();
    View.pin(st, ds);
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
    var xyPairs = Util.genRandNode();
    Model.addRandNode(xyPairs);
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

};

var PathController = {

  findPath: function() {
    var maze = Model.getMaze();
    var size = Model.getMazeSize();
    var heu = Model.getHeuDist();
    var st = Model.getStartPos();
    var ds = Model.getDestPos();
    var queue = new PriorityQueue();
    queue.push(st, heu[st[0]][st[1]]);
    while (! queue.empty()) {
      var element = queue.pop();
      if (element[1] == 1) break;
      PathController.updateQueue(element[0], queue, maze, heu, size);
    }
  },

  updateQueue: function(cell, queue, maze, heu, size) {
    var tran = [[0,-1], [0, 1], [-1, 0], [1, 0]];
    var tmp = [], tr = [];
    for (var i = 0; i < 4; i ++) {
      tr = tran[i];
      tmp = [ tr[0]+cell[0], tr[1]+cell[1] ];
      // valid index
      if (tmp[0]>=0 && tmp[0]<size && tmp[1]>=0 && tmp[1]<size 
        // not block
        && maze[tmp[0]][tmp[1]] == 0) {
          queue.push(tmp, heu[tmp[0]][tmp[1]]);
          Controller.oneStep(tmp);
      }
    }

  }

}
