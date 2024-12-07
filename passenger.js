class Passenger{
  constructor(x, levCount){
    this.x = x;
    this.level = floor(random(0, levCount));
    this.targetLevel = floor(random(0, levCount));
    while(this.targetLevel == this.level){
      this.targetLevel = floor(random(0, levCount));
    }
    this.pickedUp = false;
  }
  checkButton(){
    if(this.level > this.targetLevel){
      return false;
    }else{
      return true;
    }
  }
  checkPickup(elevDir){
    if(this.level > this.targetLevel && elevDir == Directions.UP){
      this.pickedUp = true;
    }else if(this.level < this.targetLevel && elevDir == Directions.DOWN){
      this.pickedUp = true;
    }
  }
}
