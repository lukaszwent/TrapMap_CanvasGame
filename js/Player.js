class Player extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor(image, x, y, width, height, frames, sprites) {
    super(
      null
    ); /* as this class extends from GameObject, you must always call super() */

    /* These variables depend on the object */
    this.image = image;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.frames = { max: frames, val: 0, elapsed: 0 };
    this.playerWidth = width / frames;
    this.playerHeight = height;
    this.moving = false;
    this.sprites = sprites;
  }

  render() {
    ctx.drawImage(
      this.image,
      this.frames.val * this.playerWidth,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.x,
      this.y,
      this.image.width / this.frames.max,
      this.image.height
    );

    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}
