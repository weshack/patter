var patch;
var h = 640;
var gridSize = 15;
var w = h / gridSize;

var colors, grid = [];

var setup = function () {
  // start Pure Data
  $.get('patter-synth.pd', function(patchStr) {
    patch = Pd.loadPatch(patchStr);
    Pd.start();
  });

  // start graphics
  colors = [color(0,0,255), color(0,255,0), color(255,0,0)];

  for (var i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (var j = 0; j < gridSize; j++) {
      grid[i][j] = {clicked:false, color: color(0,0,0)};
    }
  }
  createCanvas(h, h);
  stroke(0);
  fill(150);
};

// Drawer function that continuously loops
var draw = function () {
  background(color(255,255,255));

  stroke(200);
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      fill(grid[i][j].clicked ? grid[i][j].color : 255);
      rect(i*w, j*w, w-1, w-1);
    }
  }
};

var mousePressed = function () {

};

var checkGrid = function (grid) {
  console.log(grid);
  return;
};
