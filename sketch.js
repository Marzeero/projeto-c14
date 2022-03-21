var PLAY = 1;
var WIN = 2;
var END = 0;

var gamestate = PLAY;
var ballonGroup;
var arrowGroup;
var bow , arrow,  background;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;


var score=0;

function preload(){
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  red_balloonImage = loadImage("red_balloon0.png");

}



function setup() {
  createCanvas(400, 400);
  
  //criando fundo
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // criando arco para atirar flecha
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0;


   ballonGroup = new Group();
   arrowGroup = new Group();


}

function draw() {
 background(0);

  // movendo chão
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //movendo flecha
  bow.y = World.mouseY
  
  
  if(gamestate === PLAY) {
    if (keyWentDown("space")) {
      createArrow();  
    }


    
    if(arrowGroup.isTouching(ballonGroup)){
       ballonGroup.destroyEach();
       arrowGroup.destroyEach();
       score = score + 1;

      //Tentei usar ballonGroup.destroy(), lifeTime e não deu certo '-'
    }

    spawnBallon();
}

  if(gamestate === END) {
    scene.velocityX = 0;
    ballonGroup.setVelocityXEach(0);

  }


  drawSprites();
  text("Pontuação: "+ score, 300,50);
}


// Criando flechas para arco
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
}

 function spawnBallon() {

  if(frameCount % 70 === 0) {

    var rand = Math.round(random(1,3))

    var ballon = createSprite(-10,Math.round(random(20, 370)), 10, 10);

    switch(rand){
      case 1:
    ballon.addImage(red_balloonImage);
    break;
      case 2:
    ballon.addImage(green_balloonImage);
    break;
      case 3:
    ballon.addImage(blue_balloonImage);
    break;


    default:
      break;
  }


  ballon.velocityX = 3;
  ballon.lifetime = 150;
  ballon.scale = 0.1;
  ballonGroup.add(ballon);

 }


}
