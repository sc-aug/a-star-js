var util = {
  genRandNode: function(worldSize) {
    var xyList = [[]];
    var worldSize = model.getWorldSize();

    for (var i = 0; i < worldSize; i ++) {
      r = Math.floor(Math.random() * worldSize);
      c = Math.floor(Math.random() * worldSize);
      xyList[i] = [];
      xyList[i][0] = r;
      xyList[i][1] = c;
    }
    return xyList;
  }
};

function PriorityQueue() {
  this.data = [];
}

PriorityQueue.prototype.push = function(element, priority) {
  for (var i = this.data.length-1; i >= 0 && priority > this.data[i][1]; i--);
  this.data.splice(i+1, 0, [element, priority]);
}

PriorityQueue.prototype.pop = function() {
  return this.data.pop();
}

PriorityQueue.prototype.size = function() {
  return this.data.length;
}

PriorityQueue.prototype.empty = function() {
  return this.data.length == 0;
}