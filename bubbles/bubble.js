function Bubble(nozzle) {
  var x = random(nozzle.pos.x - nozzle.xRadius, nozzle.pos.x + nozzle.xRadius);
  var y = nozzle.pos.y - nozzle.yRadius;
  var drift = random(-0.4, .4);
  var bubbleColor = nozzle.bubbleColor;
  // var bubbleColor = color(94, 144, 224, 50);

  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(drift, -1);
  this.diameter = random(2,18);
  this.volume = Math.pow(this.diameter/2, 3);

  this.applyForce = function(force) {
    var f = force.copy();
    f.mult(.00002 * this.volume);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    noStroke();
    fill(bubbleColor);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }


}
