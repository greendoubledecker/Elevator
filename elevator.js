class Elevator {
  constructor(numLevs, speed, openDoorDuration) {
    this.level = 0;
    this.door = new Door();
    this.motor = new Motor();
    this.buttons = [];
    for (let level = 0; level < numLevs; level++) {
      this.buttons.push(new Button(level));
    }
    this.dir = Directions.UP;
    this.speed = speed;
    this.openDoorDuration = openDoorDuration;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async openDoor() {
    console.log("Door opened at floor " + (this.level + 1));//"Door: " + this.door
    this.door.switchState();
    if (this.dir == Directions.UP) {
      //this.buttons[this.level].pressUpButton();
    }
    if (this.dir == Directions.DOWN) {
      //this.buttons[this.level].pressDownButton();
    }
    await this.sleep(this.openDoorDuration);
    this.door.switchState();
  }
  raise() {
    this.motor.setState(Directions.UP);
    this.level += this.speed;
    this.dir = Directions.UP;
  }
  lower() {
    this.motor.setState(Directions.DOWN);
    this.level -= this.speed;
    this.dir = Directions.DOWN;
  }
  async stop() {
    this.motor.setState(Directions.STOPPED);
    await this.openDoor();
    this.motor.setState(this.dir);
  }
  pressUpButton(level){
    this.buttons[level].pressUpButton();
  }
  pressDownButton(level){
    this.buttons[level].pressDownButton();
  }
}
