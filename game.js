var PIXI = require('pixi.js')
const TILE_SIZE = 70
const BOARD_WIDTH = 7
const BOARD_HEIGHT = 7
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
var highlightContainer = new PIXI.Container()

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

function redCircleTexture () {
  var graphic = new PIXI.Graphics()
  graphic.beginFill(0xFF0000)
  return graphic
    .drawCircle(0, 0, (TILE_SIZE / 2) - 5)
    .generateCanvasTexture()
}

function blueCircleTexture () {
  var graphic = new PIXI.Graphics()
  graphic.beginFill(0x0000FF)
  return graphic
    .drawCircle(0, 0, (TILE_SIZE / 2) - 5)
    .generateCanvasTexture()
}

function greenCircleTexture () {
  var graphic = new PIXI.Graphics()
  graphic.beginFill(0x00FF00)
  return graphic
    .drawCircle(0, 0, (TILE_SIZE / 2) - 5)
    .generateCanvasTexture()
}

var redCircle = redCircleTexture()
var blueCircle = blueCircleTexture()
var greenCircle = greenCircleTexture()

function drawToken (x, y, token, interactive) {
  var graphic
  if (token === 'blue') {
    graphic = blueCircle
  } else if (token === 'red') {
    graphic = redCircle
  } else if (token === 'green') {
    graphic = greenCircle
  }

  var sprite = new PIXI.Sprite(graphic)
  sprite.anchor.set(0.5)
  var position = tileToPixelPosition(x, y)
  sprite.x = position[0]
  sprite.y = position[1]
  sprite.interactive = interactive
  sprite.buttonMode = interactive

  var highlight

  if (token === 'blue') {
    blueTeam.addChild(sprite)
  } else if (token === 'red') {
    redTeam.addChild(sprite)
  } else if (token === 'green') {
    balls.addChild(sprite)
  }

  sprite
    .on('mousedown', function (event) {
      this.data = event.data
      this.dragging = true
    })
    .on('mouseupoutside', function () {

    })
    .on('mouseup', function () {
      var newPosition = this.data.getLocalPosition(this.parent)
      var ptt = pixelToTilePosition(newPosition.x, newPosition.y)
      var ttp = tileToPixelPosition(ptt[0], ptt[1])
      highlightContainer.removeChild(highlight)

      this.position.x = ttp[0]
      this.position.y = ttp[1]
      this.dragging = false
      this.data = null
    })
   .on('mousemove', function () {
     if (this.dragging) {
       var newPosition = this.data.getLocalPosition(this.parent)
       this.position.x = newPosition.x
       this.position.y = newPosition.y

       highlightContainer.removeChild(highlight)
       highlight = highlightTile(newPosition.x, newPosition.y)
       highlightContainer.addChild(highlight)
     }
   })
}

function highlightTile (x, y) {
  var highlightGraphic = new PIXI.Graphics()
  highlightGraphic.beginFill(0xCCCCCC)
  highlightGraphic.lineStyle(2, 0x000000)
  var tilePosition = pixelToTilePosition(x, y)
  highlightGraphic.drawRect(
    tilePosition[0] * TILE_SIZE,
    tilePosition[1] * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  )
  return highlightGraphic
}

function tileToPixelPosition (x, y) {
  return [
    (x * TILE_SIZE) + (TILE_SIZE / 2),
    (y * TILE_SIZE) + (TILE_SIZE / 2)
  ]
}

function pixelToTilePosition (x, y) {
  return [Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)]
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

  for (var k = 0; k < blueTokens.length; k++) {
    drawToken(blueTokens[k][0], blueTokens[k][1], 'blue', true)
  }

  for (var l = 0; l < redTokens.length; l++) {
    drawToken(redTokens[l][0], redTokens[l][1], 'red', true)
  }

  for (var m = 0; m < greenTokens.length; m++) {
    drawToken(greenTokens[m][0], greenTokens[m][1], 'green', false)
  }
  stage.addChild(highlightContainer)
  stage.addChild(balls)
  stage.addChild(redTeam)
  stage.addChild(blueTeam)
}

setup()
animate()
