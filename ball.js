const Config = require('./config')
const Utils = require('./utils')

class Ball {

  constructor(x, y, id, team, interactive) {
    let greenCircle = this.circleTexture(0x00FF00)
    let graphic

    graphic = greenCircle

    let sprite = new PIXI.Sprite(graphic)
    sprite.anchor.set(0.5)
    let position = Utils.tileToPixelPosition(x, y)
    sprite.x = position[0]
    sprite.y = position[1]

    let textStyle = new PIXI.TextStyle({
      fontSize: 13,
      fill: '#ffffff'
    })
    let idText = new PIXI.Text(id, textStyle)
    idText.y = -7
    idText.x = -3
    sprite.addChild(idText)

    this.sprite = sprite
  }

  circleTexture (hexColor) {
    let graphic = new PIXI.Graphics()
    graphic.beginFill(hexColor)
      return graphic
      .drawCircle(0, 0, (Config.TILE_SIZE / 4) - 5)
      .generateCanvasTexture()
  }
}

export default Ball
