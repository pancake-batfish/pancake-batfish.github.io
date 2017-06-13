function Nozzle(x, y) {
  this.pos = createVector(x, y);
  this.xRadius = 25;
  this.yRadius = 6;


  this.display = function() {
    rectMode(RADIUS);
    noStroke();
    fill(135, 50);
    rect(this.pos.x, this.pos.y, this.xRadius, this.yRadius);
  }
}
