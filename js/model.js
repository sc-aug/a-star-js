var Model = {
  maze: [[]], // maze 0 or 1
  heu_dist: [[]], // heuristic distance
  SIZE: 40,
  start: {r: 0, c: 0},
  dest:{r: 39, c: 39},

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
    var destR = Model.dest.r, destC = Model.dest.c;
    for (var i = 0; i < n; i ++) {
      Model.heuDist[i] = [];
      for (var j = 0; j < n; j ++) {
        Model.heuDist[i][j] = Math.abs(i-destR) + Math.abs(j-destC);
      }
    }
  },

  addRandNode: function(pairs) {
    var mat = model.getCurMatrix();
    for (var i = 0; i < pairs.length; i ++) {
      var r = pairs[i][0];
      var c = pairs[i][1];
      mat[r][c] = true;
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

  /* Compute the next generation */
  propogate: function() {
    var matCur =  model.getCurMatrix();
    var matNext = model.getNextMatrix();
    var size = model.getWorldSize();
    var cnt;
    for (var i = 0; i < size; i ++) {
      for (var j = 0; j < size; j ++) {
        cnt = this.cntNeighbor(matCur, i, j);
        if (matCur[i][j]) {
          matNext[i][j] = (cnt < 2 || cnt > 3) ? false : true;
        } else {
          matNext[i][j] = (cnt == 3) ? true : false;
        }
      }
    }
  },

  cntNeighbor: function(mat, i, j) {
    var sum = 0;
    var rp, rq;
    for (var p = i-1; p <= i+1; p ++) {
      for (var q = j-1; q <= j+1; q ++) {
        rp = model.getPosition(p);
        rq = model.getPosition(q);
        if (mat[rp][rq]) sum ++;
      }
    }
    //console.log(i,j,sum);
    return sum - mat[i][j];
  },

  getPosition: function(i) {
    var size = model.getWorldSize();
    while (i < 0) { i += size; }
    while (i >= size) { i -= size; }
    return i;
  },

  getMaze: function() {
    return Model.maze;
  },

  getHeuDist: function() {
    return Model.heuDist;
  },

  getStartPos: function() {
    return Model.start;
  },

  getDestPos: function() {
    return Model.dest;
  }

}
