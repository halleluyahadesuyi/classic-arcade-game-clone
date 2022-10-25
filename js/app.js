// Creating a new Player object
// Creating several new Enemy objects and placing them in an array called allEnemies
let player = new Player()
let allEnemies = []

// Enemies our player must avoid
var Enemy = function(xCoordinate, yCoordinate, gameSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = xCoordinate,
    this.y = yCoordinate,
    this.speed = gameSpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        this.x += this.gameSpeed * dt
    }
    else {
        this.xCoordinate = 0
    }

    // Conditional statement for when enemy hits the player
    if (player.xCoordinate < this.xCoordinate + 80 &&
        player.xCoordinate + 80 > this.xCoordinate &&
        player.yCoordinate < this.yCoordinate + 60 &&
        player.yCoordinate + 60 > this.yCoordinate) {
        player.enemyContactReset();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// The player class
var Player = function(xCoordinate, yCoordinate) {
    this.x = xCoordinate,
    this.y = yCoordinate,
  // The image/sprite for the player
    this.sprite = 'images/char-pink-girl.png';
 };

 // update() method
Player.prototype.update = function() {
    // set boundaries for x-axis
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    }
    // set boundaries for y-axis
    else if (this.y > 400) {
        this.y = 400;
    }
};

// render() method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

// handleInput() method
Player.prototype.handleInput = function(key) {
    // Player moves to the left when left arrow or "a" key is pressed
    if ((key == 'left' || key == 'a') && this.x > 0) {
        // width (505) divided by number of tiles (5)
        this.x -= (505/5)
    };

    // Player moves to the right when right arrow or "d" key is pressed
    if ((key == 'right' || key == 'd') && this.x < 405) {
        // width (505) divided by number of tiles (5)
        this.x += (505/5)
    };

    // Player moves up when the up arrow or "w" key i pressed
    if ((key == 'up' || key == 'w') && this.y > 0) {
        // height (606) divided by number of tiles (7, i.e 6 plus the one at the base)
        // approximately 86
        this.y -= 86;
    };

    // The player moves downwards with the down arrow or "s" key.
    // 86 derives by the division of the 606 (height) to the 
    // number of tiles, i.e. 6+1=7.
    if ((key == 'down' || key == 's') && this.y < 405) {
        this.y += 86;
        audio.src = 'sounds/OldSchool2.wav';
        audio.play();
    };

    // The game resets when the player presses the Esc key
    // http://www.javascripter.net/faq/keycodes.htm
    if (key == 'esc') {
        player.restart();
    };

    // When the player reaches the water, the character spirit goes 
    // to its starting position, i.e. (x, y) = (200, 400)
    if (this.y < 0) {
        player.reachWaterReset();
    };
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
