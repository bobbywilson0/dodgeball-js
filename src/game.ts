import * as _ from "lodash";
import * as PIXI from "pixi.js";
import Ball from "./ball";
import * as Config from "./config";
import GameBoard from "./game-board";
import GameState from "./game-state";
import Player from "./player";

const BOARD_HEIGHT = Config.BOARD_HEIGHT;
const BOARD_WIDTH = Config.BOARD_WIDTH;
const TILE_SIZE = Config.TILE_SIZE;
const GAME_WIDTH = BOARD_WIDTH * TILE_SIZE;
const GAME_HEIGHT = BOARD_HEIGHT * TILE_SIZE;

const renderer = PIXI.autoDetectRenderer(
    BOARD_WIDTH * TILE_SIZE,
    BOARD_HEIGHT * TILE_SIZE,
    { antialias: true,
      autoResize: true,
      resolution: window.devicePixelRatio,
    },
);
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";

const stage = new PIXI.Container();
stage.interactive = true;

function resize() {
  const xRatio = window.innerWidth / GAME_WIDTH;
  stage.scale.y = xRatio;
  stage.scale.x = xRatio;
  renderer.resize(window.innerWidth, window.innerHeight);
}

const tiles = {
  turn: "blue",
  units: {
    1: { id: "1", x: 0, y: 0, type: "player", team: "blue", hasBall: false },
    2: { id: "2", x: 0, y: 2, type: "player", team: "blue", hasBall: false },
    3: { id: "3", x: 0, y: 4, type: "player", team: "blue", hasBall: false },
    4: { id: "4", x: 0, y: 6, type: "player", team: "blue", hasBall: false },
    5: { id: "5", x: 6, y: 0, type: "player", team: "red", hasBall: false },
    6: { id: "6", x: 6, y: 2, type: "player", team: "red", hasBall: false },
    7: { id: "7", x: 6, y: 4, type: "player", team: "red", hasBall: false },
    8: { id: "8", x: 6, y: 6, type: "player", team: "red", hasBall: false },
    9: { id: "9", x: 3, y: 0, type: "ball" },
    10: { id: "10", x: 3, y: 2, type: "ball" },
    11: { id: "11", x: 3, y: 4, type: "ball" },
    12: { id: "12", x: 3, y: 6, type: "ball" },
  },
};

const gameState = new GameState(tiles);
const players = {
};
const balls = {};

const gameBoard = new GameBoard(stage, gameState, players, balls);

function animate() {
  renderer.render(stage);
  window.requestAnimationFrame(animate);
}

function setup() {
  _.forEach(gameState.state.units, (p, id) => {
    if (p.team === "blue") {
      const player = new Player(p.x, p.y, id, "blue", true);
      players[id] = player;
      gameBoard.addToken(player.sprite);
    } else if (p.team === "red") {
      const player = new Player(p.x, p.y, id, "red", true);
      players[id] = player;
      gameBoard.addToken(player.sprite);
    } else {
      const ball = new Ball(p.x, p.y, id);
      balls[id] = ball;
      gameBoard.addToken(ball.sprite);
    }
  });
}

resize();
document.body.appendChild(renderer.view);
setup();
animate();
