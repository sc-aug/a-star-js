var Model = {
  maze: [[]], // maze 0 or 1
  heu_dist: [[]], // heuristic distance
  SIZE: 40,
  start: [],
  dest: [],

  initMaze: function(index) {
    Model.maze = [[]];
    var m = mazeTemplate[index];
    for (var i = 0; i < m.length; i ++) {
      Model.maze[i] = [];
      for (var j = 0; j < m[0].length; j ++) {
        Model.maze[i][j] = m[i][j];
      }
    }
  },

  initHeuDist: function() {
    Model.heuDist = [[]];
    var n = Model.SIZE;
    var destR = Model.dest[0], destC = Model.dest[1];
    for (var i = 0; i < n; i ++) {
      Model.heuDist[i] = [];
      for (var j = 0; j < n; j ++) {
        Model.heuDist[i][j] = Math.abs(i-destR) + Math.abs(j-destC);
      }
    }
  },

  visited: function(i,j) {
    Model.maze[i][j] = 1;
  },

  addRandNode: function(pairs) {
    var maze = Model.getMaze();
    for (var i = 0; i < pairs.length; i ++) {
      var r = pairs[i][0];
      var c = pairs[i][1];
      maze[r][c] = 1;
    }
  },

  setMazeSize: function(s) {
    model.SIZE = Number(s);
  },

  getMazeSize: function() {
    return Model.SIZE;
  },

  clean: function() {
    Model.initMaze(0);
  },

  getMaze: function() {
    return Model.maze;
  },

  getHeuDist: function() {
    return Model.heuDist;
  },

  setStartPos: function(x, y) {
    Model.start = [x,y];
  },

  getStartPos: function() {
    return Model.start;
  },

  setDestPos: function(x, y) {
    Model.dest = [x,y];
  },

  getDestPos: function() {
    return Model.dest;
  }

}
