
class Graphic{
  constructor(type, x, y, graphicWidth, levHeight){
    this.type = type;
    this.x = x;
    this.y = y;
    this.h = levHeight;
    this.w = graphicWidth;
  }
  show(){
    //console.log(this.type);
    if(this.type == ObjectTypes.ELEVATOR){
      fill(150);
      rect(this.x,this.y,this.w,this.h);
      //console.log("elevator");
    }
    if(this.type == ObjectTypes.PASSENGER){
      fill(200);
      ellipse(this.x,this.y + this.h/2,this.h/4,this.h);
      //console.log("passenger");
    }
  }
  move(speed){
    this.y -= speed * levHeight;
    //console.log("y: " + this.y);
  }
}