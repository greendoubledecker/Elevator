class Button{
  constructor(level){
    this.level = level;
    this.up = false;
    this.down = false;
    this
  }
  pressUpButton(){
    if(this.up == false){
      this.up = true;
    }else{
      this.up = false;
    }
  }
  pressDownButton(){
    if(this.down == false){
      this.down = true;
    }else{
      this.down = false;
    }
  }
}