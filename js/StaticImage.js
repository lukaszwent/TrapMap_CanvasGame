class StaticImage extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor(image, position, velocity) {
    super(
      null
    ); /* as this class extends from GameObject, you must always call super() */

    /* These variables depend on the object */
    this.image = image;
    this.position = position;
  }
  /*
  changePosition() {
    if (keys.w.pressed) {
      this.y += 1;
    }
    if (keys.s.pressed) {
      this.y -= 1;
    }
    if (keys.a.pressed) {
      this.x += 1;
    }
    if (keys.d.pressed) {
      this.x -= 1;
    }
  }
  */

  render() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
    //this.changePosition();
  }
}
