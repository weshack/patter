var patch;
var h = 640;
var gridSize = 15;
var w = h / gridSize;

var bg, colors, grid = [];

var cellsClicked;

var setup = function () {
  // start Pure Data

  $.get('../patter-synth.pd', function(mainStr) {
    $.get('../synth.pd', function(patchStr) {

      // Loading the patch and abstraction
      Pd.registerAbstraction('synth', patchStr);
      // Pd.send(patch.patchId + '-diameter', [20])
      patch = Pd.loadPatch(mainStr);
      Pd.start();
    })
  });

  bg = color(48, 76, 69);
  def = color(88, 140, 126)
  // start graphics
  colors = [color(242, 227, 148), color(242, 174, 114), color(217, 100, 89), color(140, 70, 70)];

  for (var i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (var j = 0; j < gridSize; j++) {
      grid[i][j] = {clicked:false, color: def};
    }
  }
  createCanvas(h, h);
  stroke(0);
  fill(150);
  smooth();
  cellsClicked = 0;
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


var randomColor = function () {
  var c1 = colors[Math.floor(Math.random()*colors.length)];
  var c2 = colors[Math.floor(Math.random()*colors.length)];
  return lerpColor(c1, c2, Math.random());
};

var assignColorToPairs = function (pairs, color) {
  pairs.forEach(function (pair) {
    var cell = grid[pair[0]][pair[1]];
    if(cell.color != def) {
      grid[pair[0]][pair[1]].color = lerpColor(cell.color, color, 0.5);
    } else {
      grid[pair[0]][pair[1]].color = color;
    }
  });
};

var mousePressed = function () {
  adjX = Math.floor(mouseX/w);
  adjY = Math.floor(mouseY/w);


  grid[adjX][adjY].clicked = true;
  drawShape4(adjX,adjY);
  drawShape5(adjX,adjY);

  cellsClicked++;
  Pd.send('n',[cellsClicked]);
  console.log("clicked");
};

/*
  |*|*|*|
  |*|*|*|
  |*|*|*|
*/

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

/*
  |*|*|*|
  |*| |*|
  |*|*|*|
*/

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

/*
  |*| |*|
  | | | |
  |*| |*|
*/

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

/*
  | |*| |
  |*| |*|
  | |*| |
*/

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

/*
  |*| |*|
  | |*| |
  |*| |*|
*/

function drawShape4(x,y) {
  isShape4 = true;
  var cellsToCheck1 = [
  [x-1, y-1],
  [x-1, y+1],
  [x+1, y-1],
  [x+1, y+1]];

  var cellsToCheck2 = [
  [x+2, y],
  [x+1, y+1],
  [x, y+1],
  [x+2, y+2]];

  var cellsToCheck3 = [
  [x-2, y-2],
  [x-1, y-1],
  [x, y-2],
  [x-2, y]];

  var cellsToCheck4 = [
  [x-2, y],
  [x-1, y+1],
  [x, y+2],
  [x-2, y+2]];

  var cellsToCheck5 = [
  [x+2, y-2],
  [x, y-2],
  [x+1, y-1],
  [x+2, y]];

  var tempx,tempy;
  var checkCells = [cellsToCheck1,cellsToCheck2,cellsToCheck3,cellsToCheck4,cellsToCheck5];
  var tempx,tempy;
  for (var i = 0; i < checkCells.length; i++) {
    for (var j = 0; j < checkCells[i].length; j++) {
      tempx = checkCells[i][j][0];
      tempy = checkCells[i][j][1];
      if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) isShape4 = false;
    }
    if (isShape4) {
      assignColorToPairs([[x, y], [checkCells[i][0][0],checkCells[i][0][1]], [checkCells[i][1][0],checkCells[i][1][1]],
                        [checkCells[i][2][0],checkCells[i][2][1]], [checkCells[i][3][0],checkCells[i][3][1]]], randomColor());
      break;
    }
    isShape4 = true;
  }
}

/*
  | |*| |
  |*|*|*|
  | |*| |
*/

function drawShape5(x, y) {
  var isShape5 = true;
  var cellsToCheck1 = [
  [x, y+1],
  [x, y-1],
  [x+1, y],
  [x-1, y]];

  var cellsToCheck2 = [
  [x+1, y-1],
  [x+1, y],
  [x+1, y+1],
  [x+2, y]];

  var cellsToCheck3 = [
  [x, y-1],
  [x+1, y],
  [x+1, y+1],
  [x+2, y]];

  var cellsToCheck4 = [
  [x-1, y-1],
  [x-1, y],
  [x-1, y+1],
  [x-2, y]];

  var cellsToCheck5 = [
  [x-1, y-1],
  [x, y],
  [x+1, y+1],
  [x, y-2]];

  var checkCells = [cellsToCheck1,cellsToCheck2,cellsToCheck3,cellsToCheck4,cellsToCheck5];
  var tempx,tempy;
  for (var i = 0; i < checkCells.length; i++) {
    for (var j = 0; j < checkCells[i].length; j++) {
      tempx = checkCells[i][j][0];
      tempy = checkCells[i][j][1];
      if(!(grid[x][y].clicked && grid[tempx][tempy].clicked)) isShape5 = false;
    }
    if (isShape5) {
      assignColorToPairs([[x, y], [checkCells[i][0][0],checkCells[i][0][1]], [checkCells[i][1][0],checkCells[i][1][1]],
                        [checkCells[i][2][0],checkCells[i][2][1]], [checkCells[i][3][0],checkCells[i][3][1]]], randomColor());
      break;
    }
    isShape5 = true;
  }
}
