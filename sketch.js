var bubbles = [];
var nozzle1;
var nozzle2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  nozzle1 = new Nozzle(width/3, height);
  nozzle2 = new Nozzle(2 * width/3, height);
}

function draw() {
  background(225, 229, 237);
  makeBubble(nozzle1);
  makeBubble(nozzle2);

  nozzle1.display();
  nozzle2.display();
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
  }
  clearBubbles();
}

function makeBubble(nozzle) {
  if (random() < .4) {
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
