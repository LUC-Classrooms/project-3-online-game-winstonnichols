/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:Winston Nichols
 *
 * Use this template to get started creating a simple 2D game for the web using P5.js.
 */
var gameState = "splash";
var player1;
var timer;
var testBox;
var dropTimer;
var presents = new Array(0); // empty array
var score = 0;




function setup() {
  createCanvas(600, 400);
  player1 = new Player(width/2, height * 4/5);
  testBox = new Box(width/2, height/3);
  timer = new Timer(30000); // 30 second timer
  dropTimer = new Timer(1000); // 1 second timer for dropping presents
}




function draw() {
  background(200);
  switch(gameState) {
    case "splash":
      splash();
      break;
    case "play":
      play();
      break;
    case "gameOver":
      gameOver();
      break;
    default:
      console.log("no switch found");
  }
}






function splash() {
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 - 20);
  testBox.display();
  testBox.spin();
  //testBox.move();
}


function play() {
  background(0, 200, 0);
  fill(0, 0, 200);
  textAlign(CENTER);
  textSize(16);
  player1.display();
  
  if(timer.isFinished()){
    gameState = "gameOver";
  }
  if(dropTimer.isFinished()){
    let p = new Box(random(width), -40);
    presents.push(p);
    dropTimer.start();
  }
 
  for(let i = 0; i < presents.length; i++){
    presents[i].display();
    presents[i].move();
    presents[i].spin();
    
    if(presents[i].y > height){
      presents.splice(i, 1); // remove from array
      score --;
    }
    
    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if(d < 50){
      presents.splice(i, 1);
      score ++;
    }

  } // end of for() loop
  
  text("Elapsed Time: " + timer.elapsedTime, width/2, height - 20);
  text("Score: " + score, 30, 40);
}



function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
  text("Your Final Score: " + score, width/2, height * 2/3);
}


function mousePressed() {
  console.log("click!");
  if (gameState == "splash") {
    gameState = "play";
    timer.start();
    dropTimer.start();
    score = 0; // resets score
  } else if (gameState == "play") {
  //  gameState = "gameOver"; // Corrected assignment
  } else if (gameState == "gameOver") {
    gameState = "splash";
  }
  console.log(gameState);
}






function keyPressed() {
  switch(keyCode){
     case UP_ARROW:
       console.log("up");
       player1.y -= 30; // move up 30px
       player1.angle = 0; // no rotation
       if(player1.y < 0) {
         player1.y = height; // wrap to bottom
       }
       break;
     case DOWN_ARROW:
       console.log("down");
       player1.y += 30; // move down 30px
       player1.angle = PI ; // point down (rotate 180 deg.)
       if(player1.y > height) {
         player1.y = 0; // wrap to top
       }
       break;
     case LEFT_ARROW:
       console.log("left");
       player1.x -= 30;
       player1.angle = PI + HALF_PI;
       if(player1.x < 0)
       {
         player1.x = width;
       }
       break;
     case RIGHT_ARROW:
       console.log("right");
       player1.x += 30;
       player1.angle = HALF_PI;
       if(player1.x > width){
         player1.x = 0;
       }
       break;
     default:
       console.log("use the arrow keys to move");
   }
 }

