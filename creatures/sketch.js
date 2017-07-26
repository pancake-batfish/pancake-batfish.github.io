var cloud;

var cohesionSlider;
var separationSlider;
var alignmentSlider;

function setup() {
  var canvas = createCanvas(600, 350);
  canvas.parent('canvas');

  cohesionSlider = createSlider(0, 5, 1, 0.1).parent('cohesion');
  separationSlider = createSlider(0, 5, 1, 0.1).parent('separation');
  alignmentSlider = createSlider(0, 5, 1, 0.1).parent('alignment');


  cloud = new Cloud();

  for (var i = 0; i < 43; i++) {
    var b = new Bat();
    cloud.addBat(b);
  }
}

function draw() {
  background(0);
  cloud.run();


  // var target = createVector(mouseX, mouseY);
  //
  //
  // for (var i = 0; i < bats.length; i++) {
  //   bats[i].arrive(target);
  //   bats[i].update();
  //   bats[i].display();
  // }
}
