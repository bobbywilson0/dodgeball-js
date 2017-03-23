const Config = require('./config')
const Utils = require('./utils')

class Player {

  constructor(x, y, id, team, interactive) {
    let redCircle = this.rectangleTexture(0xFF0000)
    let blueCircle = this.rectangleTexture(0x0000FF)
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
  
  rectangleTexture (hexColor) {
    let graphic = new PIXI.Graphics()
    graphic.beginFill(hexColor)
      return graphic
      .drawRect(0, 0, 20, 50)
      .generateCanvasTexture()
  }

  
  circleTexture (hexColor) {
    let graphic = new PIXI.Graphics()
    graphic.beginFill(hexColor)
      return graphic
      .drawCircle(0, 0, (Config.TILE_SIZE / 4) - 5)
      .generateCanvasTexture()
  }
}

export default Player
