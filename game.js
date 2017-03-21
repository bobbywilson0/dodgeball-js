var PIXI = require('pixi.js')
var Config = require('./config.js')
var Player = require('./player.js')

const BOARD_HEIGHT = Config.BOARD_HEIGHT
const BOARD_WIDTH = Config.BOARD_WIDTH
const TILE_SIZE = Config.TILE_SIZE

var renderer = PIXI.autoDetectRenderer(
    BOARD_WIDTH * TILE_SIZE,
    BOARD_HEIGHT * TILE_SIZE,
    { antialias: true }
)

document.body.appendChild(renderer.view)

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

var blueTokens = [[0, 0], [0, 2], [0, 4], [0, 6]]
var redTokens = [
  [BOARD_WIDTH - 1, 0],
  [BOARD_WIDTH - 1, 2],
  [BOARD_WIDTH - 1, 4],
  [BOARD_WIDTH - 1, 6]
]
var greenTokens = [
  [3, 0],
  [3, 2],
  [3, 4],
  [3, 6]
]

function setup () {
  drawBoard(BOARD_WIDTH, BOARD_HEIGHT, TILE_SIZE)
  var player
  for (var k = 0; k < blueTokens.length; k++) {
    player = new Player(blueTokens[k][0], blueTokens[k][1], 'blue', true)
    blueTeam.addChild(player)
  }

  for (var l = 0; l < redTokens.length; l++) {
    player = new Player(redTokens[l][0], redTokens[l][1], 'red', true)
    redTeam.addChild(player)
  }

  for (var m = 0; m < greenTokens.length; m++) {
    var ball = new Player(greenTokens[m][0], greenTokens[m][1], 'green', false)
    balls.addChild(ball)
  }
  //stage.addChild(highlightContainer)
  stage.addChild(balls)
  stage.addChild(redTeam)
  stage.addChild(blueTeam)
}

setup()
animate()
