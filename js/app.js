'use strict';

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if(this.x >= 550) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 400);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.score = 0;
    this.hearts = 3;
    this.reset();
};

Player.prototype.update = function() {
    // Prevent player from going outside of the boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching the top and receive 500 points if they do
    if(this.y < 0) {
        this.score += 500;
        this.reset();
    }

    // Check to see if the player accumulated more than 2,000 points & if so player wins the game
    if (this.score > 2000) {
        alert("Congratulations! You win! \nYour Final Score: " + this.score + "\nPress OK to play the game again.");
        this.hearts = 3;
        this.score = 0;
        this.reset();
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= 50;
            break;
        case 'up':
            this.y -= 50;
            break;
        case 'right':
            this.x += 50;
            break;
        case 'down':
            this.y += 50;
            break;
    }
};

// Check collision with enemies
Player.prototype.checkCollision = function() {
    let numEnemies = allEnemies.length;
    for (var i = 0; i < numEnemies;  i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
            console.log('You have been hit!');
            // take a heart away if player hits and enemy
            -- this.hearts;
            // if no hearts left, the game is over
            if(this.hearts === 0) {
                alert("Game Over! \nYour Final Score: " + this.score + "\nPress OK to play the game again.");
                this.hearts = 3;
                this.score = 0;
            }
            this.reset();
        }
    }
                
}

// Reset the player when it loses life or reaches goals.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

let allEnemies = [];

function enemyCreator() {
    let enemyPosition = [60, 140, 220];
    enemyPosition.forEach(function(y) {
        let enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 400));
        allEnemies.push(enemy);
    });
}

enemyCreator();

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
