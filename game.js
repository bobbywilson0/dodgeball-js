var PIXI = require('pixi.js')
var Config = require('./config.js')
var Player = require('./player.js')
var GameState = require('./game-state.js')

const BOARD_HEIGHT = Config.BOARD_HEIGHT
const BOARD_WIDTH = Config.BOARD_WIDTH
const TILE_SIZE = Config.TILE_SIZE

var renderer = PIXI.autoDetectRenderer(
    BOARD_WIDTH * TILE_SIZE,
    BOARD_HEIGHT * TILE_SIZE,
    { antialias: true }
)

var gameState = new GameState()

document.body.appendChild(renderer.view)

var gameState = {
  blueTeam: [
    { x: 0, y: 0 },
    { x: 0, y: 2 },
    { x: 0, y: 4 },
    { x: 0, y: 6 }
  ],
  redTeam: [
    { x: 6, y: 0 },
    { x: 6, y: 2 },
    { x: 6, y: 4 },
    { x: 6, y: 6 }
  ],
  balls: [
    { x: 3, y: 0 },
    { x: 3, y: 2 },
    { x: 3, y: 4 },
    { x: 3, y: 6 }
  ]
}

var stage = new PIXI.Container()
stage.interactive = true

var blueTeam = new PIXI.Container()
var redTeam = new PIXI.Container()
var balls = new PIXI.Container()
//var highlightContainer = new PIXI.Container()

function drawBoard () {
  var boardGraphics = new PIXI.Graphics()
  boardGraphics.beginFill(0xFFFFFF)
  boardGraphics.lineStyle(2, 0x333333)

  for (var i = 0; i < BOARD_WIDTH; ++i) {
    for (var j = 0; j < BOARD_HEIGHT; ++j) {
      boardGraphics.drawRect(
        i * TILE_SIZE,
        j * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      )
    }
  }
  stage.addChild(boardGraphics)
}

function animate () {
  renderer.render(stage)
  window.requestAnimationFrame(animate)
}


function setup () {
  drawBoard(BOARD_WIDTH, BOARD_HEIGHT, TILE_SIZE)

  gameState.blueTeam.forEach(function(p, id) {
    var player = new Player(p.x, p.y, id, 'blue', true)
    blueTeam.addChild(player)
  })

  gameState.redTeam.forEach(function(p, id) {
    var player = new Player(p.x, p.y, id, 'red', true)
    redTeam.addChild(player)
  })

  gameState.balls.forEach(function(p, id) {
    var ball = new Player(p.x, p.y, id, 'green', false)
    balls.addChild(ball)
  })

  stage.addChild(balls)
  stage.addChild(redTeam)
  stage.addChild(blueTeam)
}

setup()
animate()
