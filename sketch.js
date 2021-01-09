//Create variables here
var dog, happyDog, foodS, database, foodStock;
var dogImg, happyDogImg;
var count = 20;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250, 300);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('Food')
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
    count = count - 1;
  }

  if (keyWentUp(UP_ARROW) && count > 0){
    dog.addImage(dogImg);
  }

  if (keyCode === "r"){
    database.ref("Food").update({Food:20})
  }

  drawSprites();

  //add styles here
  textSize(20);
  fill("white");
  text("Press UP_ARROW to feed Drago milk?", 100, 50);
  text("Food Remaining: " + foodS, 150, 200);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x=0;
  }else {
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}


