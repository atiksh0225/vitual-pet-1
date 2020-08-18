//Create variables here
var dog, goodDog, happyDog, database, foodS ,foodStock;

function preload()
{
  //load images here
  goodDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);
  
  imageMode(CENTER);
  //image(goodDog, 100, 250, 0.5, 0.5);
  //image(happyDog, 400, 250, 200, 200);

  dog = createSprite(250, 250, 20, 20);
  dog.scale = 0.25;
  dog.addImage(goodDog);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
background (46, 139, 87)

  if(keyWentDown (UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happyDog);
  }
  
  if(keyWentUp (UP_ARROW)) {
    dog.addImage(goodDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  textFont('Georgia');
  stroke(4);
  text("foodStock : " + foodS, 370, 20);

}

function readStock(data) {

 foodS = data.val();

}

function writeStock(x) {
 
 if(x <= 0) {
    x = 0
 }else {
   x = x-1
 }
 
  database.ref('/').update({
   Food:x
 })
}



