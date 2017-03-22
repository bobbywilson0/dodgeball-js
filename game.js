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

var tokenContainer = new PIXI.Container()
let players = {
  'blueTeam': {},
  'redTeam': {}
}
var balls = {}

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
var highlightContainer = new PIXI.Container()

stage
  .on('click', function (event) {
    highlightContainer.removeChild(this.targetHighlight)
    this.data = event.data
    var position = this.data.getLocalPosition(this)
    let playerOnTile = gameState.getPlayerId(position.x, position.y)
    if ((this.selected === undefined || this.selected === false) && playerOnTile != undefined) {
      this.selected = true
      this.currentPlayer = gameState.getPlayerId(position.x, position.y)
      let newPosition = this.data.getLocalPosition(this)
      this.sourceHighlight = highlightSourceTile(newPosition.x, newPosition.y)
      highlightContainer.addChild(this.sourceHighlight)
    } else if (this.selected === true) {
      let newPosition = this.data.getLocalPosition(this)
      let ptt = Utils.pixelToTilePosition(newPosition.x, newPosition.y)
      gameState.movePlayer(this.currentPlayer, ptt[0], ptt[1])
      let newPos = Utils.tileToPixelPosition(ptt[0], ptt[1])
      let sprite = players[gameState.getCurrentPlayer()][this.currentPlayer].sprite
      sprite.x = newPos[0]
      sprite.y = newPos[1]
      this.currentPlayer = null
      highlightContainer.removeChild(this.sourceHighlight)
      this.selected = false
    }
  })
  .on('mousemove', function() {
    if (this.selected === true && this.currentPlayer != undefined) {
      let newPosition = this.data.getLocalPosition(this)
      if (this.targetHighlight) {
        highlightContainer.removeChild(this.targetHighlight)
      }
      this.targetHighlight = highlightTargetTile(newPosition.x, newPosition.y)
      highlightContainer.addChild(this.targetHighlight)
    }
  })

  function highlightTargetTile (x, y) {
    let highlightGraphic = new PIXI.Graphics()
    highlightGraphic.beginFill(0xCCCCCC)
    highlightGraphic.lineStyle(2, 0x000000)
    let tilePosition = Utils.pixelToTilePosition(x, y)
    highlightGraphic.drawRect(
      tilePosition[0] * Config.TILE_SIZE,
      tilePosition[1] * Config.TILE_SIZE,
      Config.TILE_SIZE,
      Config.TILE_SIZE
    )
    return highlightGraphic
  }

 function highlightSourceTile (x, y) {
   let highlightGraphic = new PIXI.Graphics()
   highlightGraphic.beginFill(0x999999)
   highlightGraphic.lineStyle(2, 0x000000)
   let tilePosition = Utils.pixelToTilePosition(x, y)
   highlightGraphic.drawRect(
     tilePosition[0] * Config.TILE_SIZE,
     tilePosition[1] * Config.TILE_SIZE,
     Config.TILE_SIZE,
     Config.TILE_SIZE
   )
   return highlightGraphic
 }

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
    tokenContainer.addChild(player.sprite)
    players['blueTeam'][id] = player
  })

  _.forEach(gameState.state.redTeam, function(p, id) {
    var player = new Player(p.x, p.y, id, 'red', true)
    tokenContainer.addChild(player.sprite)
    players['redTeam'][id] = player
  })

  _.forEach(gameState.state.balls, function(p, id) {
    var ball = new Player(p.x, p.y, id, 'green', false)
    tokenContainer.addChild(ball.sprite)
    balls[id] = ball
  })

  stage.addChild(highlightContainer)
  stage.addChild(tokenContainer)
}

setup()
animate()
