var bubbles = [];
var nozzle1;
var nozzle2;
var current;
var anticurrent;


function setup() {
  createCanvas(600, 400);
  // createCanvas(windowWidth, windowHeight);
  // createCanvas(displayWidth, displayHeight);
  nozzle1 = new Nozzle(width/3, height);
  nozzle2 = new Nozzle(2 * width/3, height);
  current = createVector(1, 0);
  anticurrent = createVector(-0.5, 0);
}

function draw() {
  background(225, 229, 237);
  makeBubble(nozzle1);
  makeBubble(nozzle2);

  nozzle1.update();
  nozzle1.display();
  nozzle2.display();
  for (var i = 0; i < bubbles.length; i++) {
    if (keyIsPressed && inBounds(bubbles[i])) {
      bubbles[i].applyForce(current);
    }
    bubbles[i].update();
    bubbles[i].display();
  }
  clearBubbles();
}

function inBounds(bubble) {
  var lower_bound = height/3;
  var upper_bound = 2 * height/3;
  if (bubble.pos.y < upper_bound && bubble.pos.y > lower_bound) {
    return true;
  }
}

// function keyPressed() {
//    if (keyCode === RIGHT_ARROW) {
//      for (var i=0; i < bubbles.length; i++) {
//        bubbles[i].applyForce(current);
//      }
//    }
// }

function makeBubble(nozzle) {
  if (random() < .4) {
    bubbles.push(new Bubble(nozzle));
  }
}

function clearBubbles() {
  for (var i = bubbles.length-1; i >= 0; i--) {
    console.log(bubbles[i]);
    if (bubbles[i].pos.x > width || bubbles[i].pos.x < 0) {
      bubbles.splice(i, 1);
    }
    if (bubbles[i].pos.y > height || bubbles[i].pos.y < 0) {
      bubbles.splice(i, 1);
    }
  }
}
