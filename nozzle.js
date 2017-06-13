function Attractor(x, y) {
  this.pos = createVector(x, y);
  this.mass = 20;
  this.G = 1;

  this.calculateAttraction = function(p) {
    //calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    //distance between objects
    var distance = force.mag();
    // //limiting distance to eliminate "extreme" results
    distance = constrain(distance, 5, 25);
    //normalize Vector to get direction and not magnitude
    force.normalize();
    //calculate gravitational magnitude
    var strength = (this.G * this.mass * p.mass) / (distance * distance);
    //Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }

  //method to display
  this.display = function() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);

    ellipse(this.pos.x, this.pos.y, this.mass*2, this.mass*2)
  }
}
