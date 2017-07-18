function Nozzle(x, y) {
  this.pos = createVector(x, y);
  this.xRadius = 25;
  this.yRadius = 6;
  this.rColor = 94 + random(-90, 90);
  this.bubbleColor = color(this.rColor, 144, 224, 50);

  this.update = function() {
    if (mouseIsPressed == true) {
      // var mouse = createVector(mouseX, mouseY)
      if (mouseX + this.xRadius < width && mouseX - this.xRadius > 0) {
        this.pos.x = mouseX;
      }
    }
  }
  this.display = function() {
    rectMode(RADIUS);
    noStroke();
    fill(135, 100);
    rect(this.pos.x, this.pos.y, this.xRadius, this.yRadius);
  }





}
