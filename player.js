const Config = require('./config')
const Utils = require('./utils')

class Player {

  constructor(x, y, id, team, interactive) {
    let redCircle = this.circleTexture(0xFF0000)
    let blueCircle = this.circleTexture(0x0000FF)
    let greenCircle = this.circleTexture(0x00FF00)

    let graphic

    if (team === 'blue') {
      graphic = blueCircle
    } else if (team === 'red') {
      graphic = redCircle
    } else if (team === 'green') {
      graphic = greenCircle
    }

    let sprite = new PIXI.Sprite(graphic)
      sprite.anchor.set(0.5)
      let position = Utils.tileToPixelPosition(x, y)
      sprite.x = position[0]
      sprite.y = position[1]
      sprite.interactive = interactive
      sprite.buttonMode = interactive

      let highlight

      sprite
        .on('mousedown', function (event) {
          this.data = event.data
          this.dragging = true
        })
        .on('mouseupoutside', function () {

        })
        .on('mouseup', function () {
          let newPosition = this.data.getLocalPosition(this.parent)
          let ptt = Utils.pixelToTilePosition(newPosition.x, newPosition.y)
          let ttp = Utils.tileToPixelPosition(ptt[0], ptt[1])
          //highlightContainer.removeChild(highlight)

          this.position.x = ttp[0]
          this.position.y = ttp[1]
          this.dragging = false
          this.data = null
        })
        .on('mousemove', function () {
          if (this.dragging) {
            let newPosition = this.data.getLocalPosition(this.parent)
            this.position.x = newPosition.x
            this.position.y = newPosition.y

            //highlightContainer.removeChild(highlight)
            //highlight = highlightTile(newPosition.x, newPosition.y)
            //highlightContainer.addChild(highlight)
          }
        })

    return sprite
  }

  highlightTile (x, y) {
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

  circleTexture (hexColor) {
    let graphic = new PIXI.Graphics()
    graphic.beginFill(hexColor)
      return graphic
      .drawCircle(0, 0, (Config.TILE_SIZE / 2) - 5)
      .generateCanvasTexture()
  }
}

export default Player
