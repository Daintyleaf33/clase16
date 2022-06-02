var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var nube,nubeImage,cloudGroup;
var cactus,obstacles,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var score = 0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  nubeImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  //crear sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
 
 
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible=false;

  cloudGroup = createGroup();
  obstacles = createGroup();
}

function draw() {
  background("black");
text("puntaje : " + score,525,25);
  
if (gameState === PLAY){
  ground.velocityX = -4;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  score = score + Math.round(frameCount/60);
  if (keyDown("space") && trex.y >= 130) { 
    trex.velocityY = -8.5;
    }
  trex.velocityY = trex.velocityY + 0.8;

  spawnClouds();
obstaculos();
  if (obstacles.isTouching(trex)){
    gameState = END;
    
  }
 
}
else if (gameState === END) {
   ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     }
  //hacer que el trex salte al presionar la barra espaciadora
  

  

  
  

  trex.collided(invisibleGround);
  drawSprites();
}
// funcion nubes
function spawnClouds(){
   //escribe aquí el código para aparecer las nubes 
   if (frameCount % 60 === 0) {
   nube = createSprite(620,100,40,10); 
   nube.y = Math.round(random(50,175));
   nube.addImage(nubeImage);
   nube.scale = 0.08;
   nube.velocityX = -2;
nube.lifetime = 310;
trex.depth = nube.depth;
nube.depth = nube.depth-1;
 
}
nubes.add(nube);
}

function obstaculos(){
if (frameCount % 80 === 0) {
  cactus = createSprite(570,160);
  cactus.velocityX = -3;
  cactus.scale = 0.45;

  var rand = Math.round(random(1,6));
  switch (rand) {
    case 1:cactus.addImage(obstacle1);
    break;
    case 2:cactus.addImage(obstacle2);
    break;
    case 3:cactus.addImage(obstacle3);
    break;
    case 4:cactus.addImage(obstacle4);
    break;
    case 5:cactus.addImage(obstacle5);
    break;
    case 6:cactus.addImage(obstacle6);
      break;
  
    default:
      break;
  }
}
obstacles.add(cactus);
}
