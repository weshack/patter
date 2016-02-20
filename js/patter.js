var patch;
var h = 640;
var rows = columns = 15;
var w;

var colors = ["black", "blue", "green", "red", "yellow"];

var emptyGrid = new Array(15).fill(new Array(15).fill({clicked : false, color : colors[0]}));

var setup = function () {
  // start Pure Data
  $.get('patter-synth.pd', function(patchStr) {
    patch = Pd.loadPatch(patchStr);
    Pd.start();
  });
  w = 640/rows;

  // start graphics
  createCanvas(h, h);
  stroke(0);
  fill(150);
};

// Drawer function that continuously loops
var draw = function () {
  background(255);
  // rect(50,50,75,100);
  ellipse(mouseX, mouseY, 20, 20);

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      stroke(0);
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
