class Enemy extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  //TODO dodać płynność przechodzenie (przez tą 1 sekunde przesuwa się o 1 px do przodu a nie od razu o 48px)
  constructor(x, y, width, height, wp) {
    super(
      null
    ); /* as this class extends from GameObject, you must always call super() */
    this.width = width;
    this.height = height;

    this.waypoints = parseCollisionsArray(wp);

    this.wpArray = [];
    this.waypoints.forEach((element, i) => {
      element.forEach((innerElement, j) => {
        if (innerElement === 96) {
          this.wpArray.push(
            new Boundary({ x: j * 48 + -710, y: i * 48 + -700 })
          );
        }
      });
    });
    this.position = {
      x: this.wpArray[0].position.x,
      y: this.wpArray[0].position.y,
    };

    this.currentPos = {
      x: this.wpArray[0].position.x,
      y: this.wpArray[0].position.y,
    };
    //console.log(this.wpArray);

    this.delay = 0;
    this.direction = "RIGHT";

    this.step = 48;
    this.lastPoint = this.wpArray[0];
  }

  setDirection() {
    //let minVal = Math.abs(this.wpArray[0].position.x + this.wpArray[0].position.y - this.position.x - this.position.y)
    let newPoint = 0;
    this.wpArray.forEach((wp, i) => {
      if (
        this.currentPos.x === wp.position.x &&
        this.currentPos.y === wp.position.y
      ) {
        let minvalX = 10000;
        let minvalY = 10000;
        console.log("POINT HITTED");
        this.wpArray.forEach((el, index) => {
          if (i !== index) {
            let valX = Math.abs(el.position.x - wp.position.x);
            let valY = Math.abs(el.position.y - wp.position.y);

            if (this.direction === "LEFT" || this.direction === "RIGHT") {
              if (minvalY > valY && valY !== 0 && this.lastPoint !== el) {
                minvalY = valY;
                newPoint = el;
                console.log(el);
              }
            } else {
              if (minvalX > valX && valX !== 0 && this.lastPoint !== el) {
                minvalX = valX;
                newPoint = el;
                console.log(el);
              }
            }
          }
        });

        if (this.direction === "LEFT" || this.direction === "RIGHT") {
          if (
            newPoint.position.y < wp.position.y &&
            this.direction !== "DOWN"
          ) {
            this.direction = "UP";
          } else if (
            newPoint.position.y >= wp.position.y &&
            this.direction !== "UP"
          ) {
            this.direction = "DOWN";
          }
        } else {
          if (
            newPoint.position.x > wp.position.x &&
            this.direction !== "LEFT"
          ) {
            this.direction = "RIGHT";
          } else if (
            newPoint.position.x < wp.position.x &&
            this.direction !== "RIGHT"
          ) {
            this.direction = "LEFT";
          }
        }
        /*
        console.log(newPoint.position.x, wp.position.x);
        console.log(newPoint.position.y, wp.position.y);
        if (newPoint.position.x > wp.position.x && this.direction !== "LEFT") {
          this.direction = "RIGHT";
        } else if (
          newPoint.position.x < wp.position.x &&
          this.direction !== "RIGHT"
        ) {
          this.direction = "LEFT";
        } else if (
          newPoint.position.y < wp.position.y &&
          this.direction !== "DOWN"
        ) {
          this.direction = "UP";
        } else if (
          newPoint.position.y >= wp.position.y &&
          this.direction !== "UP"
        ) {
          this.direction = "DOWN";
        }
*/
        this.lastPoint = newPoint;
        return;
      }
    });
  }

  move() {}

  render() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.delay++;

    if (this.delay % 150 === 0) {
      if (this.direction === "DOWN") {
        this.position.y += this.step;
        this.currentPos.y += this.step;
      } else if (this.direction === "UP") {
        this.position.y -= this.step;
        this.currentPos.y -= this.step;
      } else if (this.direction === "LEFT") {
        this.position.x -= this.step;
        this.currentPos.x -= this.step;
      } else if (this.direction === "RIGHT") {
        this.position.x += this.step;
        this.currentPos.x += this.step;
      }

      this.setDirection();
    }
  }
}
