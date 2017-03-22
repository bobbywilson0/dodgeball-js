var PIXI = require('pixi.js')
var _ = require('lodash')
var Config = require('./config')
import Player from './player'
import GameState from './game-state'
import GameBoard from './game-board'

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

let gameState = new GameState(tiles)
let players = {
  'blueTeam': {},
  'redTeam': {}
}
let balls = {}

let gameBoard = new GameBoard(stage, gameState, players, balls)


function animate () {
  renderer.render(stage)
  window.requestAnimationFrame(animate)
}

function setup () {
  _.forEach(gameState.state.blueTeam, function(p, id) {
    var player = new Player(p.x, p.y, id, 'blue', true)
    gameBoard.addToken(player.sprite)
    players['blueTeam'][id] = player
  })

  _.forEach(gameState.state.redTeam, function(p, id) {
    var player = new Player(p.x, p.y, id, 'red', true)
    gameBoard.addToken(player.sprite)
    players['redTeam'][id] = player
  })

  _.forEach(gameState.state.balls, function(p, id) {
    var ball = new Player(p.x, p.y, id, 'green', false)
    gameBoard.addToken(ball.sprite)
    balls[id] = ball
  })
}

setup()
animate()
