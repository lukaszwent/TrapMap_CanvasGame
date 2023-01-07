class TrapMapCanvasGame extends CanvasGame {
  constructor(collisions, keys) {
    super();
    this.keys = keys;
    console.log(collisions);
    this.collisionsMap = parseCollisionsArray(collisions);
    this.boundaries = [];

    this.collisionsMap.forEach((element, i) => {
      element.forEach((innerElement, j) => {
        if (innerElement === 105) {
          this.boundaries.push(
            new Boundary({ x: j * 48 + -710, y: i * 48 + -700 })
          );
        }
      });
    });

    console.log(this.boundaries);

    gameObjects[2] = new Enemy(
      48 * 50 + -710,
      48 * 50 + -700,
      48,
      48,
      m1_en1_wp
    );

    gameObjects[3] = new Enemy(
      48 * 50 + -710,
      48 * 50 + -700,
      48,
      48,
      m1_en2_wp
    );

    this.movables = [
      gameObjects[0],
      ...this.boundaries,
      gameObjects[2],
      gameObjects[3],
    ];
  }

  checkBlockCollisions(block1, block2) {
    return (
      block1.x + block1.playerWidth >= block2.position.x &&
      block1.x <= block2.position.x + block2.width &&
      block1.y <= block2.position.y + block2.height &&
      block1.y + block1.height >= block2.position.y
    );
  }

  collisionDetection() {
    let moving = true;
    if (this.boundaries) {
      this.boundaries.forEach((boundary) => {
        boundary.draw();
      });

      gameObjects[1].moving = false;

      if (this.keys.w.pressed && this.keys.lastKey === "w") {
        gameObjects[1].moving = true;
        gameObjects[1].image = gameObjects[1].sprites.up;
        for (let i = 0; i < this.boundaries.length; i++) {
          const boundary = this.boundaries[i];

          if (
            this.checkBlockCollisions(gameObjects[1], {
              ...boundary,
              position: { x: boundary.position.x, y: boundary.position.y + 1 },
            })
          ) {
            moving = false;
            console.log("Collision");
            break;
          }
        }
        if (moving) {
          /*
          gameObjects[0].y += 1;
          this.boundaries.forEach((boundary) => {
            boundary.position.y += 1;
          });
          */
          this.movables.forEach((movable) => {
            movable.position.y += 1;
          });
        }
      } else if (this.keys.s.pressed && this.keys.lastKey === "s") {
        gameObjects[1].moving = true;
        gameObjects[1].image = gameObjects[1].sprites.down;
        for (let i = 0; i < this.boundaries.length; i++) {
          const boundary = this.boundaries[i];

          if (
            this.checkBlockCollisions(gameObjects[1], {
              ...boundary,
              position: { x: boundary.position.x, y: boundary.position.y - 1 },
            })
          ) {
            moving = false;
            console.log("Collision");
            break;
          }
        }
        if (moving) {
          /*
          gameObjects[0].y -= 1;
          this.boundaries.forEach((boundary) => {
            boundary.position.y -= 1;
          });*/
          this.movables.forEach((movable) => {
            movable.position.y -= 1;
          });
        }
      } else if (this.keys.a.pressed && this.keys.lastKey === "a") {
        gameObjects[1].moving = true;
        gameObjects[1].image = gameObjects[1].sprites.left;
        for (let i = 0; i < this.boundaries.length; i++) {
          const boundary = this.boundaries[i];

          if (
            this.checkBlockCollisions(gameObjects[1], {
              ...boundary,
              position: { x: boundary.position.x + 1, y: boundary.position.y },
            })
          ) {
            moving = false;
            console.log("Collision");
            break;
          }
        }
        if (moving) {
          /*
          gameObjects[0].x += 1;
          this.boundaries.forEach((boundary) => {
            boundary.position.x += 1;
          });*/
          this.movables.forEach((movable) => {
            movable.position.x += 1;
          });
        }
      } else if (this.keys.d.pressed && this.keys.lastKey === "d") {
        gameObjects[1].moving = true;
        gameObjects[1].image = gameObjects[1].sprites.right;
        for (let i = 0; i < this.boundaries.length; i++) {
          const boundary = this.boundaries[i];

          if (
            this.checkBlockCollisions(gameObjects[1], {
              ...boundary,
              position: { x: boundary.position.x - 1, y: boundary.position.y },
            })
          ) {
            moving = false;
            console.log("Collision");
            break;
          }
        }
        if (moving) {
          /*
          gameObjects[0].x -= 1;
          this.boundaries.forEach((boundary) => {
            boundary.position.x -= 1;
          });*/
          this.movables.forEach((movable) => {
            movable.position.x -= 1;
          });
        }
      }
    }
  }
}
