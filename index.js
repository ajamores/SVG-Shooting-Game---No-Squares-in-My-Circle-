/**
 * Author: Armand Amores
 * Student Id: 000315902
 * Date: 23/03/2023
 * File contains creation of svg elements and dynamically produces 
 * and removes them. Also contains logic for animation such as the movement of lasers
 * and enemy squares. 
 * Please note that the laser movement is not perfect and multiple attemtpts were done
 * to try and figure out..also issues with scaling screen... unable to scale contents within the screen
 * due do dimensions of canvas being set upon document load... not too sure how to fix
 *
 */

// use svgNS to create elements
const svgNS = "http://www.w3.org/2000/svg";
//grab canvas from dom
const canvas = document.querySelector("#canvas");
//grab canvas dimensions
const canvasWidth = canvas.getAttribute("width");
const canvasHeight = canvas.getAttribute("height");

//declare + initialize variables for center position of canvas
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;
//used for score tracking
let scoreText = document.querySelector("#score");
var scoreNumber = 0;
scoreText.innerHTML += scoreNumber
//display end state of game and option to start
let gameOverText = document.querySelector("#gameover");
let startText = document.querySelector("#start");



//create player, which is the ball in the center of the canvas
let ball = document.createElementNS(svgNS, "circle");
//set dimensions of circle
ball.setAttribute("class", "player ") 
//attributes used to center onto middle of canvas
ball.setAttribute("cx", centerX);
ball.setAttribute("cy", centerY);
ball.setAttribute("r", 30);
ball.setAttribute("fill", "blue");
canvas.appendChild(ball);


/**
* Creates laser on the center of screen and with the help of velocityX and Y
* we facilatate the movement of the laser 
*
* @param {x} x
* @param {y} yellow
* @param {velocityX} x
* @param {velocityY} y
*/
function fireLaser(x, y, velocityX, velocityY) {
  laser = document.createElementNS(svgNS, "circle");
  //basic attributes of laser(another circle)
  laser.setAttribute("class", "laser")
  laser.setAttribute("cx", x);
  laser.setAttribute("cy", y);
  laser.setAttribute("r", 10);
  laser.setAttribute("fill", "red");

  //custom attributes
  laser.setAttribute("velocityX", velocityX);
  laser.setAttribute("velocityY", velocityY);
  canvas.appendChild(laser);
  
}

/**
* Sets the new position of the lasers to enable movement towards mouse click
*/
function updateLaser() {
    // get all lasers
    const lasers = document.querySelectorAll(".laser");
  
    // loop through each laser
    lasers.forEach(laser => {
      const cx = parseInt(laser.getAttribute("cx"));
      const cy = parseInt(laser.getAttribute("cy"));
      const r = parseInt(laser.getAttribute("r"));
      const velocityX = parseInt(laser.getAttribute("velocityX"));
      const velocityY = parseInt(laser.getAttribute("velocityY"));
  
      // update laser position
      laser.setAttribute("cx", cx + velocityX);
      laser.setAttribute("cy", cy + velocityY);
  
      // check if laser is out of bounds
      if (cx - r < 0 || cx + r > canvasWidth || cy - r < 0 || cy + r > canvasHeight) {
        // remove laser from DOM
        canvas.removeChild(laser);
      }
    });
  }
  

/**
* Calls listed functions every frame to enable animated movement
*/
function animate() {
    //calls a function in return... what function do we want to call... animate
    requestAnimationFrame(animate);
    console.log("animation frame go")
    updateLaser();  //enables lasers movement
    moveEnemySquare();  //enable squares movement
}

//Listens for mouse clicks and calls for creation of laser, and then fed velocity
//to help laser move... uses trigonimetry to help move lasers in direction of mouse click
//Please note that direction of laser is not perfect and needs more work
canvas.addEventListener("click", (event) => {
    console.log("clicked");
    console.log(event);

    //leared about how projectiles with trigonmatry work and tried to implment it with function atan2
    //atan2 grabs that angle that a right angle triangle forms. We get a right angle from the player ball
    //and the mouse click event. 
    const angle = Math.atan2(event.clientY - centerY, event.clientX -centerX );
    //once angle figured out we need to find the ratio relative to the longest side(hypotenuse)
    //hence the use of Cos. Also multipled by 5 for speed
    const velocityX = Math.cos(angle) * 5;
    //Sin produces the ratio of how big y side(height of triangle) is to hypotenuse 
    const velocityY = Math.sin(angle) * 5;

    //trying other ways to make laser movement
    // const eventX = event.clientX;
    // const eventY = event.clientY;
    // const deltaX = eventX - centerX;
    // const deltaY = eventY - centerY;

    //creates laser
    fireLaser(centerX, centerY, velocityX, velocityY);
    
});

//calls animation function 
animate();



/**
* Adds squares to screen at random position outisde of canvas
*/
function addEnemySquare() {
    // Randomly set x to either positive or negative to help generate square outide of canvas
    const x = Math.random() < 0.5 ? 5 : -5;
  
    square = document.createElementNS(svgNS, "rect");
  //attributes for square set 
    square.setAttribute("class", "square");
    square.setAttribute("x", x > 0 ? 0 : canvasWidth); //so that square does not generate right beside player ball 
    square.setAttribute("y", Math.random() * canvasHeight);
    square.setAttribute("width", 50);
    square.setAttribute("height", 50);
    square.setAttribute("fill", "yellow");
    square.setAttribute("stroke", "navy");
    square.setAttribute("stroke-width", 3);
  
    canvas.appendChild(square);
  
    // console.log(square.getAttribute("x"));
    // console.log(square.getAttribute("y"));
  }
  
// listens for space bar press.... note that design is not the best as multiple presses creates 
// multiple instances of set interval
var game; // game flag
window.addEventListener("keydown", (event) => {
    //49 code for spacebar... use of .key incase some browers do not support keyCode
    if(event.keyCode === 49 || event.key === " "){
        start = setInterval(addEnemySquare, 1500); //starts animation of squares producing and moving
        gameOverText.innerHTML = " "; //removes when starts
        startText.innerHTML= " "; // removes instruction
        game = true; //game on 

    }
});

/**
* contains logic of movement of squares
*/
function moveEnemySquare() {
    //call all squares 
    const squares = document.querySelectorAll(".square")

     // grab ball(player) attributes
     const ballCx = parseInt(ball.getAttribute("cx"));
     const ballCy = parseInt(ball.getAttribute("cy"));
     const r = parseInt(ball.getAttribute("r"));
    

    //loop through each square 
    squares.forEach(square => {
        const x = parseInt(square.getAttribute("x"));
        const y = parseInt(square.getAttribute("y"));
        const width = parseInt(square.getAttribute("width"));
        const height = parseInt(square.getAttribute("height"));

        //get squares to move towards ball... reverse movement of lasers
        const angle = Math.atan2(canvasHeight/2 - y,  canvasWidth / 2 - x );
        const velocityX = Math.cos(angle) * 3;
        const velocityY = Math.sin(angle) * 3;
        //update square positions
        square.setAttribute("x", x + velocityX);
        square.setAttribute("y", y + velocityY);

       

        //collision detection for player ball
        //checks if ball outer limits on x side is greater than square x with square x's width... same logic done for y 
        if(ballCx+r >= x && ballCx <= x+width && ballCy >= y && ballCy <= y+height){ 
            console.log("remove from screen");
            removeAllSquares();
            clearInterval(start);
            gameOverText.innerHTML = "Game Over! Score: " + scoreNumber;
            resetScore();
            startText.innerHTML = "Press Space Bar To Start!";
            game = false // game flag reset
            
        }

        //Collision detection for lasers
        //Because there can be multiple lasers on the canvas we must loop through each of them
        const lasers = document.querySelectorAll(".laser")

        lasers.forEach(laser => {
            const laserCx = parseInt(laser.getAttribute("cx"));
            const laserCy = parseInt(laser.getAttribute("cy"));
            const laserR = parseInt(laser.getAttribute("r"));
            
            //same logic for ball and sqaure detection 
            if(laserCx+r >= x && laserCx <= x+width && laserCy >= y && laserCy <= y+height) {
                console.log("LASER HIT");
                canvas.removeChild(square);
                canvas.removeChild(laser);
                increaseScore();
                console.log("Score Number: " + scoreNumber);
                

            }
        })

    })

}

/**
* When square hits player ball, all squares to be removed with this function
*/
function removeAllSquares() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
      canvas.removeChild(square);
    });
  }
  

/**
* increase score per laser hit
*/
function increaseScore() {
    scoreNumber += 10;
    scoreText.innerHTML = "Score: "+ scoreNumber;
    
}

/**
* resets score when game over presented
*/
function resetScore() {
    scoreNumber = 0;
    scoreText.innerHTML = "Score: "+ scoreNumber;
}


/**
* add more squares
*/
function addEnemy() {
  if(game){
    addEnemySquare();
  }else {
    console.log("Game not started");
  }
}














