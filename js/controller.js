var Controller = {
  
  initMaze: function(size, index, start, dest) {
    // gen table
    View.removeTable();
    View.genMazeTable(size);
    // init maze data
    Model.initMaze(index);
    // init start & dest
    Controller.initPin(start, dest);
    // init heu distance
    Model.initHeuDist();
    // View update
    Controller.refreshBlocks();
    Controller.refreshPin();
  },

  initPin: function(start, dest) {
    var x = Number(start.firstChild.value);
    var y = Number(start.lastChild.value);
    Model.visited(x,y);
    Model.setStartPos(x,y);
    x = Number(dest.firstChild.value);
    y = Number(dest.lastChild.value);
    Model.visited(x,y);
    Model.setDestPos(x,y);
  },

  checkCoord: function(elem) { // args: elem is <div>
    var x = elem.firstChild.value;
    var y = elem.lastChild.value;
    return Util.isValid(x) && Util.isValid(y);
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

  addRandNode: function() {
    var xyPairs = Util.genRandNode();
    Model.addRandNode(xyPairs);
  }

};

var PathController = {

  maze: null,
  size: null,
  heu: null,
  st: null,
  ds: null,
  queue: null,

  initData: function() {
    this.maze = Model.getMaze();
    this.size = Model.getMazeSize();
    this.heu = Model.getHeuDist();
    this.st = Model.getStartPos();
    this.ds = Model.getDestPos();
    this.queue = new PriorityQueue();
    this.queue.push(this.st, this.heu[this.st[0]][this.st[1]]);
  },

  findPathLoop() {
    if (! this.queue.empty()) {
      var element = this.queue.pop();
      if (element[1] == 1) {
        clearInterval(intv);
        enablePanel();
        return;
      }
      PathController.updateQueue(element[0], this.queue, this.maze, this.heu, this.size);
    } else {
      clearInterval(intv);
      enablePanel();
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
          PathController.markNode(tmp);
          console.log("mark " + tmp);
      }
    }
  },

  markNode: function(pos) {
    Model.visited(pos[0], pos[1]);
    View.dyePath(pos[0], pos[1]);
  },

}
