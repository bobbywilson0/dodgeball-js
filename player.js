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
    this.sprite = sprite
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
