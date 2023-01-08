/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */

/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let mapImage = new Image();
mapImage.src = "img/map.png";

let playerDownImage = new Image();
playerDownImage.src = "img/walk_d.png";

let playerUpImage = new Image();
playerUpImage.src = "img/walk_u.png";

let playerLeftImage = new Image();
playerLeftImage.src = "img/walk_l.png";

let playerRightImage = new Image();
playerRightImage.src = "img/walk_r.png";

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  lastKey: "",
};

/******************* END OF Declare game specific data and functions *****************/

/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame() {
  /* We need to initialise the game objects outside of the Game class */
  /* This function does this initialisation.                          */
  /* Specifically, this function will:                                */
  /* 1. initialise the canvas and associated variables                */
  /* 2. create the various game gameObjects,                   */
  /* 3. store the gameObjects in an array                      */
  /* 4. create a new Game to display the gameObjects           */
  /* 5. start the Game                                                */

  /* Create the various gameObjects for this game. */
  /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

  gameObjects[0] = new StaticImage(mapImage, { x: -710, y: -700 });
  gameObjects[1] = new Player(
    playerDownImage,
    canvas.width / 2 - 140 / 6 / 2,
    canvas.height / 2 - 35 / 2,
    140,
    35,
    6,
    {
      up: playerUpImage,
      down: playerDownImage,
      left: playerLeftImage,
      right: playerRightImage,
    }
  );
  gameObjects[2] = new Enemy(
    48 * 50 + -710,
    48 * 50 + -700,
    140,
    35,
    m1_en1_wp,
    6,
    playerDownImage,
    {
      up: playerUpImage,
      down: playerDownImage,
      left: playerLeftImage,
      right: playerRightImage,
    }
  );
  gameObjects[3] = new Enemy(
    48 * 50 + -710,
    48 * 50 + -700,
    140,
    35,
    m1_en2_wp,
    6,
    playerDownImage,
    {
      up: playerUpImage,
      down: playerDownImage,
      left: playerLeftImage,
      right: playerRightImage,
    }
  );

  /* END OF game specific code. */

  /* Always create a game that uses the gameObject array */
  let game = new TrapMapCanvasGame(collisions, keys);

  /* Always play the game */
  game.start();

  /* If they are needed, then include any game-specific mouse and keyboard listners */

  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      "deviceorientation",
      function (e) {
        const { alpha, beta, gamma } = e;
        console.log({ alpha, beta, gamma });
      },
      true
    );
  }

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        keys.w.pressed = true;
        keys.lastKey = "w";
        break;
      case "s":
        keys.s.pressed = true;
        keys.lastKey = "s";
        break;
      case "a":
        keys.a.pressed = true;
        keys.lastKey = "a";
        break;
      case "d":
        keys.d.pressed = true;
        keys.lastKey = "d";
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "w":
        keys.w.pressed = false;

        break;
      case "s":
        keys.s.pressed = false;

        break;
      case "a":
        keys.a.pressed = false;

        break;
      case "d":
        keys.d.pressed = false;

        break;
    }
  });
}
