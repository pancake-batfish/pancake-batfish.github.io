var bubbles = [];
var nozzle;

function setup() {
  createCanvas(640, 360);
  nozzle = new Nozzle(width/2, height);
}

function draw() {
  background(225, 229, 237);
  makeBubble(nozzle);

  nozzle.display();
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
  }
  clearBubbles();
}

function makeBubble(nozzle) {
  if (random() < .3) {
    bubbles.push(new Bubble(nozzle));
  }
}

function clearBubbles() {
  for (var i = bubbles.length-1; i >= 0; i--) {
    if (bubbles[i].pos.x > width || bubbles[i].pos.x < 0) {
      bubbles.splice(i, 1);
    }
    if (bubbles[i].pos.y > height || bubbles[i].pos.y < 0) {
      bubbles.splice(i, 1);
    }
  }
}
