class Motor{
  constructor(){
    this.state = Directions.STOPPED;
  }
  setState(state){
    this.state = state;
  }
}