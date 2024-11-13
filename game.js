function setup() {
  createCanvas(800, 600);
}

let x = 350;
let y = 290;
let w = 100;
let h = 50;
let d = 5;

function submarine(x, y) {
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

let gameTitle1 = "Ocean Floor";
let gameTitle2 = "Oddessey";
let instruction = "Click here to begin!";

function startScreen() {
  background(114, 187, 212);
  noStroke();
  fill(181, 229, 245);
  rect(x - 320, y - 260, w + 640, h + 490);

  // title graphics
  fill(252, 234, 177);
  rect(x - 215, y - 185, w + 430, h + 65, d * 18);
  rect(x - 180, y - 100, w + 355, h + 60, d * 18);

  fill(255, 227, 140);
  rect(x - 200, y - 180, w + 415, h + 60, d * 18);
  rect(x - 170, y - 95, w + 350, h + 60, d * 18);

  // title text
  stroke(252, 234, 177);
  strokeWeight(8);
  fill(255, 192, 0);
  textSize(85);
  text(gameTitle1, x - 180, y - 100);
  text(gameTitle2, x - 140, y - 15);

  // start button
  push();
  stroke(214, 113, 88);
  strokeWeight(5);
  fill(214, 57, 17);
  rect(x - 200, y + 150, w + 30, h, d);

  stroke(82, 62, 2);
  strokeWeight(3);
  fill(255, 192, 0);
  textFont("Times New Roman");
  textSize(32);
  text("START", x - 183, y + 185);
  pop();

  noStroke();
  fill(24, 144, 184);
  textSize(28);
  text(instruction, x - 250, y + 120);

  // submarine
  scale(0.8);
  rotate(0.2);
  translate(x + 460, y + 50);
  submarine(0, 0);
}

let isLanding = false;
let targetX = 400;
let targetY = 500;
let speed = 3;

function gameScreen() {
  environment();
  /*
  line 186 - 188 is code adapted from 
  https://chatgpt.com/share/6734e54c-0514-8007-9514-279d5e18582f
  */
  submarine(x + 200, y - 300);
  if (x - targetX < 10 && y - targetY < 10 && !isLanding) {
    isLanding = true;
  }
  if (keyIsDown(32)) {
    y = y - 1;
  } else {
    y = y + speed;
  }
  if (y > 920) {
    y = 920;
  }
}

function winScreen() {
  environment();
}

function draw() {
  // startScreen();
  gameScreen();

  // winScreen();
}
