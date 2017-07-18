function Cloud() {
  this.bats = [];

  this.run = function() {
    for (var i = 0; i < this.bats.length; i++) {
      this.bats[i].run(this.bats); //passing the entire list of bats to each bat
    }
  }

  this.addBat = function(b) {
    this.bats.push(b);
  }
}
