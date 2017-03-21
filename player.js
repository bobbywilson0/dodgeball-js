var config = require('./config.js')

const TILE_SIZE = config.TILE_SIZE

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

function tileToPixelPosition(x, y) {
  return [
    (x * TILE_SIZE) + (TILE_SIZE / 2),
    (y * TILE_SIZE) + (TILE_SIZE / 2)
  ]
}

function pixelToTilePosition (x, y) {
  return [Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)]
}

function circleTexture (hexColor) {
  var graphic = new PIXI.Graphics()
  graphic.beginFill(hexColor)
    return graphic
    .drawCircle(0, 0, (TILE_SIZE / 2) - 5)
    .generateCanvasTexture()
}

var redCircle = circleTexture(0xFF0000)
var blueCircle = circleTexture(0x0000FF)
var greenCircle = circleTexture(0x00FF00)

function Player (x, y, id, team, interactive) {
  var team = team
  var id = id
  var graphic
    if (team === 'blue') {
      graphic = blueCircle
    } else if (team === 'red') {
      graphic = redCircle
    } else if (team === 'green') {
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
        //highlightContainer.removeChild(highlight)

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

          //highlightContainer.removeChild(highlight)
          //highlight = highlightTile(newPosition.x, newPosition.y)
          //highlightContainer.addChild(highlight)
        }
      })

  return sprite
}

module.exports = Player
