let Utils = require('./utils')
let Config = require('./config')

class GameBoard {
  constructor(stage, gameState, players, balls) {
    this.tokenContainer = new PIXI.Container()
    this.highlightContainer = new PIXI.Container()
    this.stage = stage
    this.players = players
    this.balls = balls

    this.drawBoard(Config.BOARD_WIDTH, Config.BOARD_HEIGHT, Config.TILE_SIZE)
    stage.addChild(this.highlightContainer)
    stage.addChild(this.tokenContainer)

    this.eventData = null
    this.selected = undefined
    this.currentPlayer = null

    stage.on('click', (event) => {
      this.highlightContainer.removeChild(this.targetHighlight)
      this.eventData = event.data
      let position = this.eventData.getLocalPosition(stage)
      let playerOnTile = gameState.getPlayerId(position.x, position.y)
      if ((this.selected === undefined || this.selected === false) && playerOnTile != undefined) {
        this.selected = true
        this.currentPlayer = gameState.getPlayerId(position.x, position.y)
        let newPosition = this.eventData.getLocalPosition(stage)
        this.sourceHighlight = this.highlightSourceTile(newPosition.x, newPosition.y)
        this.highlightContainer.addChild(this.sourceHighlight)
      } else if (this.selected === true) {
        let newPosition = this.eventData.getLocalPosition(stage)
        let ptt = Utils.pixelToTilePosition(newPosition.x, newPosition.y)
        gameState.movePlayer(this.currentPlayer, ptt[0], ptt[1])
        let newPos = Utils.tileToPixelPosition(ptt[0], ptt[1])
        let sprite = this.players[gameState.getCurrentPlayer()][this.currentPlayer].sprite
        sprite.x = newPos[0]
        sprite.y = newPos[1]
        this.currentPlayer = null
        this.highlightContainer.removeChild(this.sourceHighlight)
        this.selected = false
      }
    })

    stage.on('mousemove', () => {
      if (this.selected === true && this.currentPlayer != undefined) {
        let newPosition = this.eventData.getLocalPosition(stage)
        if (this.targetHighlight) {
          this.highlightContainer.removeChild(this.targetHighlight)
        }
        this.targetHighlight = this.highlightTargetTile(newPosition.x, newPosition.y)
        this.highlightContainer.addChild(this.targetHighlight)
      }
    })
  }

  highlightTargetTile (x, y) {
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

  highlightSourceTile (x, y) {
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

  drawBoard () {
    let boardGraphics = new PIXI.Graphics()
    boardGraphics.beginFill(0xFFFFFF)
    boardGraphics.lineStyle(2, 0x333333)

    for (let i = 0; i < Config.BOARD_WIDTH; ++i) {
      for (let j = 0; j < Config.BOARD_HEIGHT; ++j) {
        boardGraphics.drawRect(
          i * Config.TILE_SIZE,
          j * Config.TILE_SIZE,
          Config.TILE_SIZE,
          Config.TILE_SIZE
        )
      }
    }
    this.stage.addChild(boardGraphics)
  }

  addToken (player) {
    this.tokenContainer.addChild(player)
  }
}

export default GameBoard