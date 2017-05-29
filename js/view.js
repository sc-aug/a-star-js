var View = {
  genMazeTable: function(size) {
    //var live = "world" + size + "live";
    //var die = "world" + size + "die";
    var board = document.getElementById("maze-wrap");
    var tbl = document.createElement("table");
    //tbl.setAttribute("id", "maze");
    var row = document.createElement("tr");
    // creating all cells
    for (var i = 0; i < size; i++) {
      // creates a table row
      row = document.createElement("tr");
      for (var j = 0; j < size; j++) {
        var cell = document.createElement("td");
        cell.id = "id_"+i+"_"+j;
        //cell.setAttribute("id", ("id_"+i+"_"+j));
        //cell.setAttribute("class", die);
        row.appendChild(cell);
      }
      // add the row to the end of the table body
      tbl.appendChild(row);
    }
    board.appendChild(tbl);
    // sets the border attribute of tbl to 2;
  },

  removeTable: function(id) {
    var tbl = document.getElementById("maze-wrap");
    if(tbl) tbl.parentNode.removeChild(tbl);
  },

  block: function(i, j) {
    var cell = document.getElementById("id_" + i + "_" + j);
    cell.setAttribute("class", ("block"));
  },

  unblock: function(i, j) {
    var cell = document.getElementById("id_" + i + "_" + j);
    cell.setAttribute("class", ("unblock"));
  },
  
  // two point start & dest
  pin: function(start, dest) {
    var st = document.getElementById("id_" + start[0] + "_" + start[1]);
    var ds = document.getElementById("id_" + dest[0] + "_" + dest[1]);
    st.setAttribute("class", ("pin"));
    ds.setAttribute("class", ("pin"));
  },

  dyePath: function(i,j) {
    var cell = document.getElementById("id_" + i + "_" + j);
    cell.setAttribute("class", ("path"));
  },

  foc: function(i, j) {
    var cell = document.getElementById("id_" + i + "_" + j);
    cell.setAttribute("class", ("focus"));
  }

};
