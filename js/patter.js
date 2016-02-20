var patch;

var setup = function () {
  // start Pure Data
  $.get('patter-synth.pd', function(patchStr) {
    patch = Pd.loadPatch(patchStr);
    Pd.start();
  });

  // start graphics
  createCanvas(640, 480);
  stroke(0);
  fill(150);
};

// Drawer function that continuously loops
var draw = function () {
  background(255);
  rect(50,50,75,100);
  ellipse(mouseX, mouseY, 80, 80);
};

var checkGrid = function (grid) {
  console.log(grid);
  return;
};
