var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boyImg
var road, invisibleGround, roadImage

var hole, holeImg, holeGroup

var gameOver, gameOverImg

function preload(){
 boyImg = loadImage("boy-running.png");

 roadImage = loadImage("road.jpg");

 holeImg = loadImage("hole.png");

 gameOverImg = loadImage("game-over.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);

 boy = createSprite(50,height-70,20,50);
 boy.addImage("boy",boyImg);
 boy.scale = 0.2
 boy.setCollider('rectangle',-100,0,400,300)

 road = createSprite(width/2,height,width,2)
 road.addImage("road",roadImage);
 road.x = width/2
 road.y = road.y - 750
 road.scale = 5

 invisibleGround = createSprite(width/2,height-10,width,125);  
 invisibleGround.shapeColor = "#f4cbaa";
 invisibleGround.visible = false

 gameOver = createSprite(10,10,200,200);
 gameOver.addImage(gameOverImg)
 gameOver.scale = 0.5
 gameOver.visible = false

 score = 0;

 holeGroup = new Group();
}

function draw() {
 background(roadImage);
 textSize(20);
 fill("black");
 text("Score: "+ score,30,50);

 boy.debug = true


    score = score + Math.round(getFrameRate()/60);
    

 if (gameState===PLAY){

    console.log(boy.y)
    if(keyDown("SPACE") && boy.y >= 682){
        boy.velocityY = -10;
        touches = [];
    }

    boy.velocityY = boy.velocityY + 0.8;
    boy.collide(invisibleGround);

    spawnHoles();
  
    if(holeGroup.isTouching(boy)){
        gameState = END;
    }
}
if (gameState === END){
    boy.velocityY = 0;
    hole.velocityX = 0;
    
    gameOver.visible = true
}
 

 drawSprites();
}

function spawnHoles(){
    if (frameCount % 60 === 0){
        var hole = createSprite(width+20,height-300,40,10);
        hole.y = Math.round(random(640,900));
        hole.addImage("hole",holeImg);
        hole.scale = 0.2
        hole.velocityX = -3;
        hole.setCollider('circle',0,0,60)
        hole.debug = true;
        hole.lifetime = 1000;

        boy.depth = hole.depth
        hole.depth = gameOver.depth;
        gameOver.depth = gameOver.depth+1
        holeGroup.add(hole);
    }
}