var PLAY = 1;
var END = 2;
var LEVEL1 = 3;
var LEVEL2 = 4;
var gameState = PLAY;

var play, playImg, edges;
var bg, bg1, ironMan, ironManImg, corvus, corvusImg;
var b, shoot, bulletImg, bulletGroup, b2Img, b2Group;
var bg2, capitanA, cA, Ebony, EbonyImg;

function preload(){

    playImg = loadImage("Play.png");
    bg1 = loadImage("Titan.jpg");
    ironManImg = loadImage("Iron Man.png");
    corvusImg = loadImage("Corvus Glaive.png");
    bulletImg = loadImage("bullet.png");
    b2Img = loadImage("bullet2.png");
    bg2 = loadImage("Nidavellir.jpg");
    cA = loadImage("Capitan America.png");
    EbonyImg = loadImage("Ebony Maw.png");

}

function setup(){
    createCanvas(1000,500);

    play = createSprite(500,400);
    play.addImage(playImg);
    play.scale = 0.7;

    bg = createSprite(500,250);
    bg.addImage(bg1);
    bg.scale = 7.5;
    bg.velocityX = -3;
    bg.visible = false;

    ironMan = createSprite(870,250);
    ironMan.addImage(ironManImg);
    ironMan.scale = 1;
    ironMan.visible = false;

    corvus = createSprite(100,250);
    corvus.addImage(corvusImg);
    corvus.velocityY = -5;
    corvus.scale = 1.2;
    corvus.visible = false;

    bulletGroup = new Group();
    b2Group = new Group();

    capitanA = createSprite(170,250);
    capitanA.addImage(cA);
    capitanA.scale = 1.1;
    capitanA.visible = false;

    Ebony = createSprite(870,250);
    Ebony.addImage(EbonyImg);
    EbonyImg.scale = 1.2;
    Ebony.visible = false;

}

function draw() {
    background("beige");

    edges = createEdgeSprites();

    drawSprites();

    if(gameState === PLAY){

        fill(0,0,0);
        textSize(45);
        textStyle("bold");
        text("Avengers Run",350,50);
        text("_______________",310,50);

        fill(0,0,193);
        textSize(25);
        text("The year is 2030 and Thanos has taken over the Earth.",190,100);
        text("Now the time has come for the Earth's greatest warriors",140,150);
        text("before he destroys Earth and all mankind.",265,200);
        text("a few of the members from Thanos' team.",265,250);
        text("on the Avengers Symbol below to start. All the Best.",210,300);

        fill(178,34,34);
        text("The Avengers had been forced to go into hiding for the last 10 years.",110,125);
        text("to rise again and defeat Thanos once and for all",230,175);
        text("But first we must help all the Avengers defeat", 230,225);
        text("Are you up for the challenge? if you are click",260,275);

        if (mousePressedOver(play)) {
            gameState = LEVEL1;
        }
        
    }else if (gameState === LEVEL1) {

        bg.visible = true;
        ironMan.visible = true;
        corvus.visible = true;

        corvus.bounceOff(edges);
        
        if (bg.x < 0){
            bg.x = bg.width/2;
        }
    
        if (keyDown("Up")) {
            ironMan.y = ironMan.y -7;
        }
        
        if (keyDown("Down")) {
            ironMan.y = ironMan.y +7;
        }
        
        if(keyDown("Space")){
            bullet();
        }

        if (bulletGroup.isTouching(corvus)) {
            corvus.scale = corvus.scale -0.1;
            bulletGroup.destroyEach();
        }

        if(b2Group.isTouching(ironMan)){
            ironMan.scale = ironMan.scale -0.1;
            b2Group.destroyEach();
        }

        if(ironMan.scale <= 0.5){
            ironMan.destroy();
            corvus.destroy();
            bulletGroup.destroyEach();
            b2Group.destroyEach();
            bg.velocityX = 0;
            gameState = END;
        }

        if(corvus.scale <= 0.5){
            ironMan.destroy();
            corvus.destroy();
            bulletGroup.destroyEach();
            b2Group.destroyEach();
            gameState = LEVEL2;
        }
        
        staff();

    }else if (gameState === END) {
        fill(0,0,0);
        textSize(25);
        textStyle("bold");
        text("Game Over",500,250);

    }else if (gameState === LEVEL2) {
        bg.visible = true;
        capitanA.visible = true;
        Ebony.visible = true;

        bg.addImage(bg2);

        if (bg.x < 300){
            bg.x = bg.width/2;
        }

        if (keyDown("Up")) {
            capitanA.y = capitanA.y -7;
        }
        
        if (keyDown("Down")) {
            capitanA.y = capitanA.y +7;
        }
    }
}

function bullet(){

    b = createSprite(830,180,5,5);
    b.velocityX = -12;
    b.y = ironMan.y -65;
    b.depth = corvus.depth;
    bulletGroup.add(b);
    b.addImage(bulletImg);
    b.scale = 0.1;
    return b;

}

function staff(){

    if (frameCount %100 === 0) {

        b2 = createSprite(50,45,15,15);
        b2.addImage(b2Img);
        b2.scale = 0.1;
        b2.velocityX = 9;
        b2.y = corvus.y -85;
        b2Group.add(b2);
    }



}