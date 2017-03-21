var PIXI = require('pixi.js')
const TILE_SIZE = 70
const BOARD_WIDTH = 7
const BOARD_HEIGHT = 6
var renderer = PIXI.autoDetectRenderer(
    BOARD_WIDTH * TILE_SIZE,
    BOARD_HEIGHT * TILE_SIZE,
    { antialias: true }
)

document.body.appendChild(renderer.view)

var stage = new PIXI.Container()
stage.interactive = true

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

var redCircle = redCircleTexture()
var blueCircle = blueCircleTexture()

function drawToken (x, y, graphic) {
  var sprite = new PIXI.Sprite(graphic)
  sprite.anchor.set(0.5)
  var position = tileToPixelPosition(x, y)
  sprite.x = position[0]
  sprite.y = position[1]
  sprite.interactive = true

  var highlight
  stage.addChild(sprite)
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
      stage.removeChild(highlight)

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

       stage.removeChild(highlight)
       highlight = highlightTile(newPosition.x, newPosition.y)
       stage.addChild(highlight)
       stage.addChild(this)
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

drawBoard(6, 6, TILE_SIZE)
drawToken(1, 1, redCircle)
drawToken(2, 2, blueCircle)
animate()
