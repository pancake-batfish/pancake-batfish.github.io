function Bat() {
  var x = random(0, width);
  var y = random(0, height);
  this.pos = createVector(x, y);
  this.vel = createVector(random(-1, 1), random(-1, 1));
  this.acc = createVector(0, 0);
  this.maxspeed = 3;
  this.maxforce = 0.2;

  this.r = 6;
  this.angle = 0;
  this.speed = .08;

  this.run = function(bats) {
    this.flock(bats);
    this.update();
    this.borders();
    this.render();
  };

  this.flock = function(bats) {
    var sep = this.separate(bats);
    var ali = this.align(bats);
    var coh = this.cohesion(bats);

    //weight these forces based on sliders
    sep.mult(separationSlider.value());
    ali.mult(alignmentSlider.value());
    coh.mult(cohesionSlider.value());

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  };

  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);

    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    // this.applyForce(steering);
    return steer;
  };

  // this.arrive = function(target) {
  //   var desired = p5.Vector.sub(target, this.pos);
  //   // desired.setMag(this.maxspeed);
  //
  //   var d = desired.mag();
  //   if (d < 100) {
  //     var m = map(d, 0, 100, 0, this.maxspeed);
  //     desired.setMag(m);
  //   } else {
  //     desired.setMag(this.maxspeed);
  //   }
  //
  //   var steering = p5.Vector.sub(desired, this.vel);
  //   steering.limit(this.maxforce);
  //   this.applyForce(steering);
  //
  // };

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    //wingbeats
    this.angle += this.speed;
  };

  this.render = function() {
    var theta = this.vel.heading() - PI/2;
    fill(90);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    // scale(2, 2);
    rotate(theta);

    //an unsuccessful attempt to round the point
    // beginShape();
    // vertex(-(this.r)/3, -this.r * 2);
    // curveVertex(-(this.r)/3, -this.r * 2);
    // curveVertex(-this.r, this.r * 2);
    // curveVertex(this.r, this.r * 2);
    // curveVertex((this.r)/3, -this.r * 2);
    // endShape(CLOSE);

    //smooth fish-like shape
    beginShape();
    vertex(0, -this.r * 2);
    curveVertex(0, -this.r * 2);
    curveVertex(-this.r, this.r * 2);
    curveVertex(this.r, this.r * 2);
    endShape(CLOSE);

    //wings...or maybe fins?
    noStroke();
    var w = 4; //diameter of wing-beads
    var scalar = 4;
    var y1 = sin(this.angle) * scalar;
    var y2 = sin(this.angle + 0.4) * scalar;
    var y3 = sin(this.angle + 0.8) * scalar;

    fill(255, 102, 0);
    // fill(255);
    push();
      translate(-this.r - w/2, this.r * 2);
      ellipse(0, y1-1, w, w);
      ellipse(-w, y2, w, w);
      ellipse(-2 * w, y3, w, w);
    pop();

    push();
      translate(this.r + w/2, this.r * 2);
      ellipse(0, y1-1, w, w);
      ellipse(w, y2, w, w);
      ellipse(2 * w, y3, w, w);
    pop();

    pop();
  };

  this.borders = function() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  };

  //separation: check for nearby bats and steer away
  this.separate = function(bats) {
    var desiredseparation = 35.0;
    var steer = createVector(0, 0);
    var count = 0;

    //for every bat in the system, check if it's too close
    for (var i = 0; i < bats.length; i++) {
      var d = p5.Vector.dist(this.pos, bats[i].pos);

      if ((d > 0) && (d < desiredseparation)) {
        //calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.pos, bats[i].pos);
        diff.normalize();
        diff.div(d); //weight by distance
        steer.add(diff);
        count++; //keep track of how many
      }
    }
    //take average
    if (count > 0) {
      steer.div(count);
    }

    //as long as the vector is greater than zero
    if (steer.mag() > 0) {
      //implement steering = desired - velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  //alignment: from every nearby bat, calculate the average velocity
  this.align = function(bats) {
    var neighbordist = 60;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < bats.length; i++) {
      var d = p5.Vector.dist(this.pos, bats[i].pos);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(bats[i].vel);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  //cohesion: steer towards average location of all nearby bats
  this.cohesion = function(bats) {
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < bats.length; i++) {
      var d = p5.Vector.dist(this.pos, bats[i].pos);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(bats[i].pos);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); //steer toward average location
    } else {
      return createVector(0, 0);
    }
  }
}
