var trex, trex_running,trex_colisao;
var ground, groundImage;
var InvisibleGround;
var nuvem,nuvemimage;
var obstaculo1,ostaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameover,gameoverimg;
var restart,restartimg;
var jumpsound,diesound,checksound;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemimage=loadImage("cloud.png");
  obstaculo1=loadImage("obstacle1.png"); 
  obstaculo2=loadImage("obstacle2.png");
  obstaculo3=loadImage("obstacle3.png");
  obstaculo4=loadImage("obstacle4.png");
  obstaculo5=loadImage("obstacle5.png");
  obstaculo6=loadImage("obstacle6.png"); 
  trex_colisao=loadAnimation("trex_collided.png"); 
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png"); 
  jumpsound=loadSound("jump.mp3");
  diesound=loadSound("die.mp3");
  checksound=loadSound("checkPoint.mp3");                                     
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  InvisibleGround = createSprite(width/2,height-10,width, 10);
  InvisibleGround.visible = false;

  trex = createSprite(50, height-40, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colisao",trex_colisao);
  trex.scale = 0.5;

  edges = createEdgeSprites();

  ground = createSprite(width/2,height-20,width, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2; 

  cactosg = new Group();
  nuvemg = new Group();

  //var test =Math.round(random(1,100));
 // console.log(test);

 trex.setCollider("circle",0,0,50);
 //trex.debug=true;
 gameover=createSprite(width/2,height/2);
 gameover.addImage(gameoverimg);
gameover.scale=0.5;
restart=createSprite(width/2,height/2+40);
restart.addImage(restartimg);
restart.scale=0.5;
gameover.visible=false;
restart.visible=false;

}


function draw() {
  background("white");
text ("score: "+score,width-100,50);
  if(gameState=== PLAY){
    ground.velocityX = -4;
    score = score +Math.round(getFrameRate()/60);

    if(score>0&&score%100===0){
    checksound.play();
    }
    

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (touches.length>0||keyDown("space") ) {
     if(trex.y>=height-40){

      trex.velocityY = -10;
      jumpsound.play();
      touches=[];

  }
    }
    trex.velocityY = trex.velocityY + 0.5;
    criarnuvem();
    criarobstaculo();

  if(cactosg.isTouching(trex)){
    
    gameState = END;
    diesound.play();
  }
  }
else if(gameState===END){
  gameover.visible=true;
  restart.visible=true;
ground.velocityX=0;
trex.velocityY=0;
cactosg.setVelocityXEach(0);
nuvemg.setVelocityXEach(0);
trex.changeAnimation("colisao",trex_colisao);
cactosg.setLifetimeEach(-1);
nuvemg.setLifetimeEach(-1);
if(mousePressedOver(restart)||touches.length>0){
  reset ();
  touches=[];
}
}
  trex.collide(InvisibleGround);
  drawSprites();
}
function reset(){
gameState=PLAY;
gameover.visible=false;
restart.visible=false;
cactosg.destroyEach();
nuvemg.destroyEach();
trex.changeAnimation("running",trex_running);
score=0;
}
function criarobstaculo(){
if(frameCount%60===0){
var obstaculo= createSprite(width+10,height-35,10,40);
obstaculo.velocityX= -(6+score/100);
var sorteio= Math.round(random(1,6));
switch(sorteio){
  case 1 :obstaculo.addImage(obstaculo1);
  break;
  case 2 :obstaculo.addImage(obstaculo2);
  break;
  case 3 :obstaculo.addImage(obstaculo3);
  break;
  case 4 :obstaculo.addImage(obstaculo4);
  break;
  case 5 :obstaculo.addImage(obstaculo5);
  break;
  case 6 :obstaculo.addImage(obstaculo6);
  break;
  default:break;

}
obstaculo.scale=0.5;
obstaculo.lifetime=width+10;
cactosg.add(obstaculo);
}
}
function criarnuvem(){
if(frameCount%60===0){
nuvem= createSprite(width+10,height-100,10,10);
nuvem.y=Math.round(random(height-150,height-100));
nuvem.velocityX=-3;
nuvem.addImage("nuvem",nuvemimage);
nuvem.scale=0.5;
nuvem.depth=trex.depth;
trex.depth=trex.depth+1;
nuvem.lifetime=width+10;
nuvemg.add(nuvem);
}

}