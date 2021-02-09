var hypnoticBall, database;
var position;
var bg,bgImg,ballImage1;

function setup(){
  
  database = firebase.database();
  console.log(database);
  createCanvas(1000,500)


  bgImg = loadImage("Hot Air Ballon-01.png");


  ballImage1=loadImage("Hot Air Ballon-02.png")
  ballImage2=loadImage("Hot Air Ballon-03.png")
  hypnoticBall = createSprite(100,250,10,10);
  //hypnoticBall.shapeColor = "red";
  hypnoticBall.addImage(ballImage2)
  hypnoticBall.scale=0.5;

  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background(bgImg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
      hypnoticBall.addImage(ballImage2);
      hypnoticBall.scale=hypnoticBall.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
     hypnoticBall.addImage(ballImage1);
      hypnoticBall.scale=hypnoticBall.scale+0.01;
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}