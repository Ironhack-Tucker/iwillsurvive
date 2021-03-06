var Player = function(top, left, playerNumber){
  this.top = top;   // || 11;
  this.left = left; // || 15;
  this.direction = "S";
  this.size = 0;
  this.symbol = 0;
  this.playerNumber = playerNumber;
};

Player.prototype.moveForward = function() {
  switch(this.direction) {
    case 'N': this.top--; break;
    case 'E': this.left++; break;
    case 'S': this.top++; break;
    case 'W': this.left--; break;
  }
};

Player.prototype.moveUp = function() {
  if (this.direction == "N")  this.moveForward();
  else                        this.direction="N";
};

Player.prototype.moveDown = function() {
  if (this.direction == "S")  this.moveForward();
  else                        this.direction="S";
};

Player.prototype.moveLeft = function() {
  if (this.direction == "W")  this.moveForward();
  else                        this.direction="W";
};

Player.prototype.moveRight = function() {
  if (this.direction == "E")  this.moveForward();
  else                        this.direction="E";
};

Player.prototype.move = function(moveOption) {
  if (document.getElementById("start").innerHTML == "Stop"){
    preCoordY = this.top;
    preCoordX = this.left;
    preDirection = this.direction;

    switch (moveOption) {
      case "F": this.moveUp(); break;
      case "B": this.moveDown(); break;
      case "R": this.moveRight(); break;
      case "L": this.moveLeft(); break;
      default:
    }

    if (this.top == preCoordY && this.left == preCoordX) {
      this.render(preCoordY, preCoordX, preDirection);
    } else {
      var tile = game.board.getItemAtPosition(this.top, this.left);
      switch (tile) {
        case "*":
        case this.playerNumber:
          this.playSound("walk");
            // Clean previous position
          game.board.map[preCoordY][preCoordX] = "*";
          game.board.map[this.top][this.left] = this.playerNumber;
            // Render
          this.render(preCoordY, preCoordX, preDirection);
            // Update paths
            //game.updatePaths();
            // Update map
          break;
        case "Z":
            // Death
          game.stopGame("DEAD");
          break;
        default:
            //Stay
          this.top = preCoordY;
          this.left = preCoordX;
          this.direction = preDirection;
      }
    }
  }
};

Player.prototype.render = function(preCoordY, preCoordX, preDirection){
  var top;
  var left;
  var that = this;
  var classDirection;
  var classPreDirection;

      if (this.playerNumber===0) {
        switch (that.direction) {
          case "N": classDirection = 'player1-up'; break;
          case "S": classDirection = 'player1-down'; break;
          case "E": classDirection = 'player1-right'; break;
          case "W": classDirection = 'player1-left'; break;
        }
        switch (preDirection) {
          case "N": classPreDirection = 'player1-up'; break;
          case "S": classPreDirection = 'player1-down'; break;
          case "E": classPreDirection = 'player1-right'; break;
          case "W": classPreDirection = 'player1-left'; break;
        }
      } else {
        switch (that.direction) {
          case "N": classDirection = 'player2-up'; break;
          case "S": classDirection = 'player2-down'; break;
          case "E": classDirection = 'player2-right'; break;
          case "W": classDirection = 'player2-left'; break;
        }
        switch (preDirection) {
          case "N": classPreDirection = 'player2-up'; break;
          case "S": classPreDirection = 'player2-down'; break;
          case "E": classPreDirection = 'player2-right'; break;
          case "W": classPreDirection = 'player2-left'; break;
        }
      }

      if (this.playerNumber === 0) {
        $("#player1").removeClass(classPreDirection).addClass(classDirection);
        $("#player1").css({left: this.left*game.board.tileSize, top:this.top*game.board.tileSize});
      } else {
        $("#player2").removeClass(classPreDirection).addClass(classDirection);
        $("#player2").css({left: this.left*game.board.tileSize, top:this.top*game.board.tileSize});
      }
      console.log(game.board.map.toString());
};

Player.prototype.playSound = function(sound) {
  var audio = document.getElementById(sound);
  if (audio.paused) audio.play();
};

// No usefull functions at this stage
// Player.prototype.shoot = function(){};
// Player.prototype.init = function(){};
// Player.prototype.checkCollides = function(){};
// Player.prototype.updatePosition = function(){};
