class Door {
  constructor(){
    this.open = false;
    this.bell = new p5.Oscillator([500], ['sine']);
  }
  switchState(){
    if(this.open == false){
      this.open = true;
    }else{
      this.open = false;
    }
    this.bell.start();
    this.bell.amp(0, 0.5);
  }
}
  