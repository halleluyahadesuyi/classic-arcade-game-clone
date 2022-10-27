// Enemies the player must avoid
var Enemy = function(xCoordinate, yCoordinate, enemySpeed) {
    // Variables applied to each of the instances
    this.x = xCoordinate,
    this.y = yCoordinate,
    this.speed = enemySpeed;

    // The image/sprite for the enemy bugs in the game
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        this.x += this.speed * dt
    }
    else {
        this.x = 0
    }

    // Conditional statement for when enemy hits the player
    if (player.x < this.x + 85 &&
        player.x + 85 > this.x &&
        player.y < this.y + 62 &&
        player.y + 62 > this.y) {
        player.enemyContactReset();
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class which requires an update(), render() and
// a handleInput() method.
var Player = function(xCoordinate, yCoordinate) {
    this.x = xCoordinate,
    this.y = yCoordinate,

  // The image/sprite for the player
    this.sprite = 'images/char-pink-girl.png';
 };


 // Player update() method, 
//  for player character not to leave game interface
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


// Player render() method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};


// Player handleInput() method
Player.prototype.handleInput = function(key) {
    // Player moves to the left when left arrow key is pressed
    if (key == 'left' && this.x > 0) {
        // width (505) divided by number of tiles (5)
        this.x -= (505/5)
    };

    // Player moves to the right when right arrow key is pressed
    if (key == 'right' && this.x < 405) {
        // width (505) divided by number of tiles (5)
        this.x += (505/5)
    };

    // Player moves up when the up arrow key is pressed
    if (key == 'up' && this.y > 0) {
        // height (606) divided by number of tiles (7, i.e 6 plus the one at the base)
        // approximately 86
        this.y -= 86;
    };

    // Player moves down when the down arrow key is pressed
    if (key == 'down' && this.y < 405) {
        // height (606) divided by number of tiles (7, i.e 6 plus the one at the base)
        // approximately 86
        this.y += 86;
    };

    // The player character goes back to its initial position
    // when it reaches the water
    if (this.y < 0) {
        window.alert("You won! Press OK if you want to play again!");
        player.waterContactReset();
    };
};


Player.prototype.enemyContactReset= function() {
    // Original position of player, or position to
    // return to after hitting an enemy
    this.x = 300
    this.y = 400
};


Player.prototype.waterContactReset = function() {
    // Original position of player, or position to
    // return to after reaching the water area
    this.x = 300
    this.y = 400
};


Player.prototype.startAgain = function() {
    // Original position of player, or position to
    // return to after reaching the water area
    this.x = 300
    this.y = 400
};


// Instantiatiation of objects

// Place all enemy objects in an array called allEnemies
var enemyOne = new Enemy(0, 62,  135);
var enemyTwo = new Enemy(0, 145, 250);
var enemyThree = new Enemy(0, 230, 200);
var allEnemies = [enemyOne, enemyTwo, enemyThree];

// Place the player object in a variable called player
var player = new Player(300, 400)


// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
