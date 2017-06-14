function Bubble(nozzle) {
  var x = random(nozzle.pos.x - nozzle.xRadius, nozzle.pos.x + nozzle.xRadius);
  var y = nozzle.pos.y;
  var drift = random(-0.4, .4);

  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(drift, -1);
  this.diameter = random(2,18);
  // this.mass = m;

  // this.applyForce = function(force) {
  //   var f = force.copy();
  //   f.div(this.mass);
  //   this.acc.add(f);
  // }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    noStroke();
    fill(94, 144, 224, 50);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }


}
