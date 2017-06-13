function Nozzle(x, yLower) {
  //yLower is middle of lower edge
  var y = yLower - 3;
  this.pos = createVector(x, y);



  this.display = function() {
    rectMode(CENTER);
    // noStroke();
    fill(135, 50);
    rect(this.pos.x, this.pos.y, 40, 6);
  }
}
