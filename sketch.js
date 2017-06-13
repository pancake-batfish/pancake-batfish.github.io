var bubble;
var nozzle;

function setup() {
  createCanvas(640, 360);
  nozzle = new Nozzle(width/2, height);
  bubble = new Bubble(320, 180);
  // for (var i = 0; i < 10; i++) {
  //   particles[i] = new Particle(200+20*i, 50, i);
  // }
}


function draw() {
  background(225, 229, 237);

  nozzle.display();
  bubble.update();
  bubble.display();
}
