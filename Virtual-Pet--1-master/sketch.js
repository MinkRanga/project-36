//Create variables here
var dogImage, happydogImage, milkImage;
var database, foodS, foodStock, feed, lastFed, fedTime, addFood, foodObj;

function preload(){
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
  milkImage = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(900, 500);
  foodObj = new Food();
  dog = createSprite(250,250,30,30);
  dog.scale=0.5;
  dog.addImage("dogImg", dogImage);

  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = craeteButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime = databse.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  testSixe(15);
  if(lastFed>=12){
    text("Last Feed : ", lastFed%12 + "PM", 350, 30);
  }else if(lastFed==0){
    text("last Feed : 12AM", 350, 30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }


  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dogImg", happydogImage)
  }
  
  drawSprites();

  //add styles here
  textSize(15);
  stroke(1);
  text("press UP_arrow to feed the dog",250,20);
}

function readStock(data){
  foodS= data.val();
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}




