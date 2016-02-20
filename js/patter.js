var patch;
var h = 640;
var rows = 15;
var columns = 15;
var w;

var colors = ["white", "blue", "green", "red", "yellow"];

var grid = new Array(columns).fill(new Array(rows).fill({clicked : false, clr : colors[0]}));

var setup = function () {
  // start Pure Data
  $.get('patter-synth.pd', function(patchStr) {
    patch = Pd.loadPatch(patchStr);
    Pd.start();
  });
  w = h/rows;

  // start graphics
  createCanvas(h,h);
  stroke(0);
  fill(150);
};

// Drawer function that continuously loops
var draw = function () {
  ellipse(mouseX, mouseY, 20, 20);

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      fill(grid[i][j].clr);
      stroke(0);
      rect(i*w, j*w, w-1, w-1);
    }
  }
};

var mousePressed = function () {
  grid[Math.floor(mouseX/w)][Math.floor(mouseY/w)] = {clicked : true, clr : colors[2]};
};

var checkGrid = function (grid) {
  console.log(grid);
  return;
};
