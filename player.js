const Config = require('./config')
const Utils = require('./utils')

class Player {

  constructor(x, y, id, team, interactive) {
    let redCircle = this.rectangleTexture(0xFF0000)
    let blueCircle = this.rectangleTexture(0x0000FF)
    let graphic

    this.ball = undefined

    if (team === 'blue') {
      graphic = blueCircle
    } else if (team === 'red') {
      graphic = redCircle
    }

    let sprite = new PIXI.Sprite(graphic)
    let head = new PIXI.Sprite(this.headTexture())
    head.anchor.set(0.5, 1.2)
    sprite.anchor.set(0.5)
    let position = Utils.tileToPixelPosition(x, y)
    sprite.x = position.x
    sprite.y = position.y
    sprite.interactive = interactive
    sprite.buttonMode = interactive
    sprite.addChild(head)

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

  headTexture () {
    let skinTones = [0x8d5524, 0xc68642, 0xe0ac69, 0xf1c27d, 0xffdbac]
    let graphic = new PIXI.Graphics()
    let randomSkinTone = skinTones[Math.floor(Math.random() * skinTones.length)]
    graphic.beginFill(randomSkinTone)
      return graphic
      .drawCircle(0, 0, 18)
      .generateCanvasTexture()
  }

  moveTo (x, y) {
    TweenLite.to(this.sprite, 0.5, {x: x, y: y, ease: Back.easeOut.config(1.7)})
  }

  pickupBall (ball) {
    ball.sprite.x = -10 
    ball.sprite.y = 0
    this.ball = ball
    this.sprite.addChild(ball.sprite)    
  }

  throwBallAt (player) {
    let ball = this.ball
    let pixelPosition = Utils.tileToPixelPosition(player.x, player.y)
    TweenLite.fromTo(
      ball.sprite, 
      0.5, 
      { x: this.sprite.x, y: this.sprite.y }, 
      { x: pixelPosition.x, y: pixelPosition.y, ease: Power4.easeOut }
    )
    this.ball = undefined
    this.sprite.removeChild(ball.sprite)
    let r = Math.floor(Math.random() * 2)
    console.log(r)
    if ( r === 1) {
      console.log('hit')
    } else {
      console.log('miss')
    }
    return ball
  }
}

export default Player
