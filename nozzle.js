function Nozzle(x, y) {
  this.pos = createVector(x, y);
  this.xRadius = 25;
  this.yRadius = 6;

  this.update = function() {
    if (mouseIsPressed == true) {
      // var mouse = createVector(mouseX, mouseY)
      this.pos.x = mouseX;
    }
  }
  this.display = function() {
    rectMode(RADIUS);
    noStroke();
    fill(135, 100);
    rect(this.pos.x, this.pos.y, this.xRadius, this.yRadius);
  }

}
