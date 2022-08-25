var bg;
var manimg, zombieoneimg, zombietwoimg, bulletimg;
var man, zombieone, zombietwo, bullet;
var zombieoneGroup, zombietwoGroup, bulletGroup;
var score = 0;
var lives = 3;
var gameState = "play";
var music;

function preload(){
  manimg = loadImage("man.png");
  zombieoneimg = loadImage("zombieone.png");
  zombietwoimg = loadImage("zombietwo.png");
  bg = loadImage("background.jpeg");
  bulletimg = loadImage("bullet.png");
  music = loadSound("spooky.wav");
}

function setup(){
  createCanvas(900,800);
  man = createSprite(60,600,100,100);
  man.addImage(manimg);
  man.scale = 0.4;
  man.setCollider("rectangle",0,0,100,100);

  zombieoneGroup = new Group();
  zombietwoGroup = new Group();
  bulletGroup = new Group();

  music.loop();

}

function draw(){
  background(bg);
  drawSprites();
if(gameState == "play"){
  spawnZombieone();
  spawnZombietwo();

  if(keyDown(RIGHT_ARROW)){
    if(man.position.x < 150){
      man.position.x += 5;
    }
  }

  if(keyDown(LEFT_ARROW)){
    if(man.position.x > 0){
      man.position.x -= 5;
    }
  }

  if(keyDown("space")){
    shoot();
  }

  if(bulletGroup.isTouching(zombieoneGroup)){
    zombieoneGroup.destroyEach();
    bulletGroup.destroyEach();
    score += 2;
  }

  if(bulletGroup.isTouching(zombietwoGroup)){
    zombietwoGroup.destroyEach();
    bulletGroup.destroyEach();
    score += 1;
  }

  if(zombieoneGroup.isTouching(man)){
    zombieoneGroup.destroyEach();
    lives -= 1;
    
  }
  if(zombietwoGroup.isTouching(man)){
    zombietwoGroup.destroyEach();
    lives -= 1;
    
  }

   if(lives == 0){
    man.destroy();
    zombieoneGroup.destroyEach();
    zombietwoGroup.destroyEach();
    gameState = "end";
  }
}

  if(gameState == "end"){
    textSize(50);
    fill("white");
    text("Game Over",300,400);
  }
  textSize(20);
  fill("white");
  text("Score:"+score,780,30);
  text("Lives:"+lives,780,60);


}

function spawnZombieone(){
  if(frameCount % 300 == 0){
    zombieone = createSprite(600,600,100,100);
    zombieone.addImage(zombieoneimg);
    zombieone.scale = 0.3;
    zombieone.velocityX = -2;
    zombieoneGroup.add(zombieone);
  }
}

function spawnZombietwo(){
  if(frameCount % 250 == 0){
    zombietwo = createSprite(600,600,100,100);
    zombietwo.addImage(zombietwoimg);
    zombietwo.scale = 0.3;
    zombietwo.velocityX = -2;
    zombietwoGroup.add(zombietwo);
  }
}

function shoot(){
  bullet = createSprite(man.x+20,550,50,50);
  bullet.addImage(bulletimg);
  bullet.scale = 0.08;
  bullet.velocityX = 7;
  bulletGroup.add(bullet);
}