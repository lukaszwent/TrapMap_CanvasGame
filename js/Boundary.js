class Boundary {
  constructor(position) {
    //super(null);
    this.position = position;
    this.width = 48;
    this.height = 48;
  }
  draw() {
    ctx.fillStyle = "rgba(255,0,0,0.2)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
