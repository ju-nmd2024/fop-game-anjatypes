function setup() {
  createCanvas(800, 600);
}

// CHARACTER VARIABLES
let x = 350;
let y = 290;
let w = 100;
let h = 50;
let d = 5;

// GAME VARIABLES
let submarineLanding = false;
let gameState = "start";
let velocityY = 0;
let gravity = 0.05;
let groundY = 920;

// TITLE GRAPHICS
let gameTitle1 = "Ocean Floor";
let gameTitle2 = "Oddessey";
let instruction = "click anywhere to begin!";
let instruction2 = "Use the spacebar to control the submarine's thrust,";
let instruction3 = "but don't land too hard or you will CRASH!";

function submarine(x, y) {
  push();
  scale(0.8);
  // periscope
  noStroke();
  fill(214, 57, 17);
  rect(x + 15, y - 180, w / 5, h + 20, d * 8);
  rect(x - 10, y - 180, w - 60, h - 30, d);
  fill(242, 132, 104);
  rect(x - 2, y - 180, w - 95, h - 30);

  // vent
  fill(222, 185, 67);
  rect(x - 25, y - 125, w - 10, h + 40, d * 4);

  // wings
  fill(245, 217, 127);
  stroke(245, 217, 127);
  strokeWeight(15);
  strokeJoin(ROUND);
  triangle(x + 90, y - 65, x + 125, y - 85, x + 120, y - 40);
  triangle(x + 90, y + 65, x + 125, y + 85, x + 120, y + 40);

  // propellers
  noStroke();
  fill(214, 57, 17);
  rect(x + 140, y - 10, w - 70, h - 30);

  // top blade
  push();
  translate(x + 170, y - 25);
  rotate(0.2);
  ellipse(0, 0, w / 5, h);
  fill(242, 132, 104);
  ellipse(0, 0, w - 95, h - 15);
  pop();

  // bottom blade
  push();
  translate(x + 170, y + 20);
  rotate(-0.2);
  ellipse(0, 0, w / 5, h);
  fill(242, 132, 104);
  ellipse(0, 0, w - 95, h - 15);
  pop();

  // body
  fill(250, 209, 75);
  ellipse(x, y, w * 3, h + 130);

  // windows
  stroke(204, 164, 29);
  strokeWeight(6);
  fill(203, 237, 245);
  circle(x - 90, y - 5, d * 11);
  circle(x - 15, y - 5, d * 11);
  circle(x + 60, y - 5, d * 11);

  // window highlight
  stroke(240, 250, 252);
  strokeWeight(8);
  line(x - 100, y + 8, x - 80, y - 18);
  line(x - 25, y + 8, x - 5, y - 18);
  line(x + 50, y + 8, x + 70, y - 18);
  pop();
}

function environment() {
  background(181, 229, 245);

  push();
  noStroke();
  fill(209, 163, 88);
  beginShape();
  vertex(360, 600);
  bezierVertex(360, 585, 550, 485, 800, 600);
  endShape();

  fill(245, 197, 120);
  beginShape();
  vertex(0, 600);
  bezierVertex(0, 580, 350, 480, 700, 600);
  endShape();

  // algae
  fill(110, 148, 93);
  ellipse(120, 500, 10, 150);
  ellipse(710, 500, 10, 150);
  ellipse(80, 490, 10, 200);

  fill(147, 191, 128);
  ellipse(150, 510, 10, 150);
  ellipse(135, 535, 10, 150);
  ellipse(650, 515, 10, 100);
  ellipse(615, 500, 10, 150);

  fill(250, 157, 190);
  arc(225, 555, 80, 80, PI, 0, CHORD);
  fill(173, 101, 126);
  circle(195, 545, d * 2);
  circle(215, 540, d * 3);
  circle(235, 545, d * 2);
  circle(238, 530, d * 3);
  circle(253, 543, d + 6);
  circle(215, 525, d + 3);
  pop();
}

function startScreen() {
  background(114, 187, 212);
  noStroke();
  fill(181, 229, 245);
  rect(30, 30, 740, 540);

  // title graphics
  fill(252, 234, 177);
  rect(135, 105, 530, 115, 90);
  rect(170, 190, 455, 110, 90);

  fill(255, 227, 140);
  rect(150, 110, 515, 110, 90);
  rect(180, 195, 450, 110, 90);

  // title text
  stroke(252, 234, 177);
  strokeWeight(8);
  fill(255, 192, 0);
  textSize(85);
  text(gameTitle1, 170, 190);
  text(gameTitle2, 210, 275);

  // instructions
  noStroke();
  fill(24, 144, 184);
  textSize(28);
  text(instruction, 250, 520);

  textSize(18);
  fill(24, 144, 184);
  text(instruction2, 60, 355);
  text(instruction3, 65, 380);

  // submarine
  push();
  scale(0.8);
  rotate(0.2);
  translate(810, 340);
  submarine(0, 0);
  pop();
}

function gameScreen() {
  environment();
  submarine(x + 200, y - 300);
}

function winScreen() {
  environment();
  stroke(8, 69, 112);
  strokeWeight(8);
  fill(250, 150, 20);
  textSize(80);
  text("YOU WON!", 200, 300);

  noStroke();
  fill(8, 69, 112);
  textSize(20);
  text("click anywhere to play again", 280, 350);
}

function failScreen() {
  environment();
  stroke(8, 69, 112);
  strokeWeight(8);
  fill(250, 150, 20);
  textSize(80);
  text("YOU SANK!", 200, 300);

  noStroke();
  fill(8, 69, 112);
  textSize(20);
  text("click anywhere to play again", 280, 350);
}

function draw() {
  clear();

  if (gameState === "start") {
    startScreen();
  } else if (gameState === "play") {
    gameScreen();
    verticalSubmarine();
  } else if (gameState === "win") {
    winScreen();
  } else if (gameState === "fail") {
    failScreen();
  }
}

function verticalSubmarine() {
  // velocity and gravity effect
  if (!submarineLanding) {
    velocityY = velocityY + gravity;
  }

  // spacebar controls thrust
  if (keyIsDown(32) && !submarineLanding) {
    velocityY = velocityY - 0.15;
  }

  // submarine position
  y = y + velocityY;

  // check landing conditions for submarine
  if (y > groundY && !submarineLanding) {
    y = groundY;
    submarineLanding = true;

    // check for landing or crash
    if (velocityY <= 2) {
      gameState = "win";
    } else {
      gameState = "fail";
    }
  }
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "play"; // start game
  } else if (gameState === "win" || gameState === "fail") {
    resetGame(); // reset game
  }
}

function resetGame() {
  x = 350;
  y = 290;
  velocityY = 0;
  submarineLanding = false;
  gameState = "start";
}
