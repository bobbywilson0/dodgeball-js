var PIXI = require('pixi.js')
var _ = require('lodash')
var Config = require('./config')
var Utils = require('./utils')
import Player from './player'
import GameState from './game-state'

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
//
var tiles = {
  turn: 'blueTeam',
  blueTeam: {
    '1': { x: 0, y: 0 },
    '2': { x: 0, y: 2 },
    '3': { x: 0, y: 4 },
    '4': { x: 0, y: 6 }
  },
  redTeam: {
    '1':{ x: 6, y: 0 },
    '2':{ x: 6, y: 2 },
    '3':{ x: 6, y: 4 },
    '4':{ x: 6, y: 6 }
  },
  balls: {
    '1': { x: 3, y: 0 },
    '2': { x: 3, y: 2 },
    '3': { x: 3, y: 4 },
    '4': { x: 3, y: 6 }
  }
}

var gameState = new GameState(tiles)
var currentPlayer

stage
  .on('mousedown', function (event) {
    this.data = event.data
    this.dragging = true
    var position = this.data.getLocalPosition(this)
    currentPlayer = gameState.getPlayerId(position.x, position.y)
  })
  .on('mouseup', function() {
    var newPosition = this.data.getLocalPosition(this)
    var ptt = Utils.pixelToTilePosition(newPosition.x, newPosition.y)
    gameState.movePlayer(currentPlayer, ptt[0], ptt[1])
    currentPlayer = null
  })

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

  _.forEach(gameState.state.blueTeam, function(p, id) {
    var player = new Player(p.x, p.y, id, 'blue', true)
    blueTeam.addChild(player)
  })

  _.forEach(gameState.state.redTeam, function(p, id) {
    var player = new Player(p.x, p.y, id, 'red', true)
    redTeam.addChild(player)
  })

  _.forEach(gameState.state.balls, function(p, id) {
    var ball = new Player(p.x, p.y, id, 'green', false)
    balls.addChild(ball)
  })

  stage.addChild(balls)
  stage.addChild(redTeam)
  stage.addChild(blueTeam)
}

setup()
animate()
