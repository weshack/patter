var patch;
var h = 640;
var gridSize = 15;
var w = h / gridSize;

var bg, colors, grid = [];

var setup = function () {
  // start Pure Data
  $.get('patter-synth.pd', function(patchStr) {
    patch = Pd.loadPatch(patchStr);
    Pd.start();
  });

  bg = color(48, 76, 69);
  // start graphics
  colors = [color(242, 227, 148), color(242, 174, 114), color(217, 100, 89), color(140, 70, 70)];

  for (var i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (var j = 0; j < gridSize; j++) {
      grid[i][j] = {clicked:false, color: color(88, 140, 126)};
    }
  }
  createCanvas(h, h);
  stroke(0);
  fill(150);
  smooth();
};

// Drawer function that continuously loops
var draw = function () {
  background(bg);

  stroke(bg);
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      fill(grid[i][j].clicked ? grid[i][j].color : 255);
      rect(i*w, j*w, w-1, w-1);
    }
  }
};

var mousePressed = function () {
  var cell = grid[Math.floor(mouseX/w)][Math.floor(mouseY/w)];
  cell.clicked = true;
};

var checkGrid = function (grid) {
  console.log(grid);
  return;
};

function isShape0(x,y) {
  var cellsToCheck = [
  [x-1, y-1],
  [x-1, y],
  [x-1, y+1]
  [x, y-1],
  [x, y+1],
  [x+1, y-1],
  [x+1, y],
  [x+1, y+1]];
  var tempx,tempy;
  for (var i = 0; i < cellsToCheck.length; i++) {
    tempx = cellsToCheck[i][0];
    tempy = cellsToCheck[i][1];
    if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) return false;
  }
  return true;
}

function isShape1(x,y) {
  var cellsToCheck = [
  [x, y+1],
  [x, y+2],
  [x+1, y],
  [x+1, y+2],
  [x+2, y],
  [x+2, y+1],
  [x+2, y+2]];
  var tempx,tempy;
  for (var i = 0; i < cellsToCheck.length; i++) {
    tempx = cellsToCheck[i][0];
    tempy = cellsToCheck[i][1];
    if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) return false;
  }
  return true;
}

function isShape2(x,y) {
  var cellsToCheck = [
  [x, y+2],
  [x+2, y],
  [x+2, y+2]];
  var tempx,tempy;
  for (var i = 0; i < cellsToCheck.length; i++) {
    tempx = cellsToCheck[i][0];
    tempy = cellsToCheck[i][1];
    if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) return false;
  }
  return true;
}

function isShape3(x,y) {
  var cellsToCheck = [
  [x, y-1],
  [x, y+1],
  [x+2, y]];
  var tempx,tempy;
  for (var i = 0; i < cellsToCheck.length; i++) {
    tempx = cellsToCheck[i][0];
    tempy = cellsToCheck[i][1];
    if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) return false;
  }
  return true;
}

function isShape4(x,y) {
  var cellsToCheck = [
  [x-1, y-1],
  [x-1, y+1],
  [x+1, y-1],
  [x+1, y+1]];
  var tempx,tempy;
  for (var i = 0; i < cellsToCheck.length; i++) {
    tempx = cellsToCheck[i][0];
    tempy = cellsToCheck[i][1];
    if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) return false;
  }
  return true;
}

function isShape5(x, y) {
  var cellsToCheck = [
  [x, y+1],
  [x, y-1],
  [x+1, y],
  [x-1, y]];
  var tempx,tempy;
  for (var i = 0; i < cellsToCheck.length; i++) {
    tempx = cellsToCheck[i][0];
    tempy = cellsToCheck[i][1];
    if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) return false;
  }
  return true;
}

var drawColor = function (x, y) {
  if (isShape0(x,y)) {
    //
  }
  else if (isShape1(x,y)) {
    //
  }
  else if (isShape2(x,y)) {
    //
  }
  else if (isShape3(x,y)) {
    //
  }
  else if (isShape4(x,y)) {
    //
  }
  else if (isShape5(x,y)) {
    //
  }
  else {
    //
  }
}
