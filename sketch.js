let buttons = [];
let doorOpenDuration = 700;
let elevator;
let elevGraphic;
let elevRatio = 1.5;
let elevSpeed = 0.002;
let elevWidth;
let levHeight;
let numLevs = 15;
let passengerGraphics = [];
let passengers = [];
let passengerSpawnRate = 100;
let pressedDownButtons = [];
let pressedUpButtons = [];

const ObjectTypes = {
  ELEVATOR: 0,
  PASSENGER: 1,
};
const Directions = {
  UP: 0,
  DOWN: 1,
  STOPPED: 2,
};
function setup() {
  elevWidth = 1000 / numLevs / elevRatio;
  elevSpeed *= numLevs;
  //passengerSpawnRate *= numLevs;
  createCanvas(elevWidth * 5, windowHeight);
  levHeight = height / numLevs;
  elevator = new Elevator(numLevs, elevSpeed, doorOpenDuration);
  elevGraphic = new Graphic(
    ObjectTypes.ELEVATOR,
    width - elevWidth,
    height - levHeight,
    elevWidth,
    levHeight
  );
  elevGraphic.show();
  for (let i = 0; i < numLevs; i++) {
    let button = new Button(i);
    buttons.push(button);
  }
}

function draw() {
  background(100);
  // console.log("spawnRate:" + passengerSpawnRate);
  // console.log(frameCount % passengerSpawnRate);
  if (frameCount % passengerSpawnRate == 0) {
    let passenger = new Passenger(elevWidth * 3, numLevs);
    passengers.push(passenger);
    if (passenger.targetLevel < passenger.level) {
      if (buttons[passenger.level].up == false) {
        buttons[passenger.level].pressUpButton();
      }
      pressedUpButtons.push(passenger);
      //console.log("Ups: " + pressedUpButtons);
    } else {
      if (buttons[passenger.level].up == false) {
        buttons[passenger.level].pressDownButton();
      }
      pressedDownButtons.push(passenger);
      //console.log("Downs: " + pressedDownButtons);
    }
    //console.log("passenger floor:" + passenger.level);
    passengerGraphics.push(
      new Graphic(
        ObjectTypes.PASSENGER,
        random(0, elevWidth * 3),
        passengers[passengers.length - 1].level * levHeight,
        elevWidth,
        levHeight
      )
    );
  }
  for (let graphic of passengerGraphics) {
    graphic.show();
  }
  for (let i = height; i > 0; i -= levHeight) {
    line(0, i, width - elevWidth, i);
  }
  if (elevator.level >= numLevs - 1 || elevator.motor.state == Directions.DOWN) {
    elevator.lower();
    elevGraphic.move(-elevSpeed);
    for (let passenger of pressedDownButtons) {
     // console.log("passenger level: " + (numLevs - passenger.level) + " elevSpeed: " + elevSpeed + " elevator level: " + (elevator.level + 1));
      if (
        elevator.level + 1 >= numLevs - passenger.level - elevSpeed &&
        elevator.level + 1 <= numLevs - passenger.level + elevSpeed
      ) {
        elevator.stop();
        buttons[round(elevator.level)].pressDownButton();
        passenger.checkPickup(Directions.DOWN);
      }
    }
  }
  if (elevator.level <= 0 || elevator.motor.state == Directions.UP) {
    elevator.raise();
    elevGraphic.move(elevSpeed);
    for (let passenger of pressedUpButtons) {
     // console.log("passenger level: " + (numLevs - passenger.level) + " elevSpeed: " + elevSpeed + " elevator level: " + (elevator.level + 1));
      if (
        elevator.level + 1 >= numLevs - passenger.level - elevSpeed &&
        elevator.level + 1 <= numLevs - passenger.level + elevSpeed
      ) {
        elevator.stop();
        buttons[round(elevator.level)].pressUpButton();
        passenger.checkPickup(Directions.UP);
      }
    }
  }
  for(let i = 0; i < passengers.length - 1; i++){
    if(passengers[i].pickedUp == true){
      passengers.splice(i, 1);
      passengerGraphics.splice(i, 1);
    }
  }
  //console.log("level: " + elevator.level);
  elevGraphic.show();
}
