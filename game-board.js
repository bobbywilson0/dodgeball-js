let Utils = require('./utils')
let Config = require('./config')
require('gsap/TweenLite')
require('gsap/EasePack')

class GameBoard {
  constructor(stage, gameState, players, balls) {
    this.tokenContainer = new PIXI.Container()
    this.highlightContainer = new PIXI.Container()
    this.stage = stage
    this.players = players
    this.balls = balls
    this.gameState = gameState

    this.drawBoard(Config.BOARD_WIDTH, Config.BOARD_HEIGHT, Config.TILE_SIZE)
    stage.addChild(this.highlightContainer)
    stage.addChild(this.tokenContainer)

    this.eventData = null
    this.selected = undefined
    this.currentPlayer = null

    stage.on('click', (event) => this.handleClickEvent(event))
    stage.on('touchend', (event) => this.handleClickEvent(event))
    stage.on('mousemove', () => this.handleMouseMove())
  }

  handleClickEvent (event) {
    this.highlightContainer.removeChild(this.targetHighlight)
    this.eventData = event.data
    let p = this.eventData.getLocalPosition(this.stage)
    let playerId = this.gameState.getPlayerId(p.x, p.y)
    if ((this.selected === undefined || this.selected === false) && playerId != undefined) {
      this.selected = true
      let position = this.eventData.getLocalPosition(this.stage)
      this.currentPlayerId = this.gameState.getPlayerId(position.x, position.y)
      this.sourceHighlight = this.highlightSourceTile(position.x, position.y)
      this.highlightContainer.addChild(this.sourceHighlight)
    } else if (this.selected === true) {
      let position = this.eventData.getLocalPosition(this.stage)
      let ptt = Utils.pixelToTilePosition(position.x, position.y)
      
      if (ptt[0] === this.gameState.state.units[this.currentPlayerId].x && ptt[1] === this.gameState.state.units[this.currentPlayerId].y) {
        let ballId = this.gameState.getBallId(position.x, position.y)
        let ball = this.balls[ballId]
        if (ball) {
          this.tokenContainer.removeChild(ball)
          let player = this.players[this.gameState.getCurrentTeam()][this.currentPlayerId]
          player.pickupBall(ball)
        }
      } else {
        this.gameState.movePlayer(this.currentPlayerId, ptt[0], ptt[1])
        let newPos = Utils.tileToPixelPosition(ptt[0], ptt[1])
        let player = this.players[this.gameState.getCurrentTeam()][this.currentPlayerId]
        player.moveTo(newPos[0], newPos[1])
      }
      this.currentPlayerId = null
      this.highlightContainer.removeChild(this.sourceHighlight)
      this.selected = false
    }
  }

  handleMouseMove () {
      if (this.selected === true && this.currentPlayerId != undefined) {
        let newPosition = this.eventData.getLocalPosition(this.stage)
        if (this.targetHighlight) {
          this.highlightContainer.removeChild(this.targetHighlight)
        }
        this.targetHighlight = this.highlightTargetTile(newPosition.x, newPosition.y)
        this.highlightContainer.addChild(this.targetHighlight)
      }
    }

  highlightTargetTile (x, y) {
    let highlightGraphic = new PIXI.Graphics()
    highlightGraphic.beginFill(0xCCCCCC)
    highlightGraphic.lineStyle(3, 0x000000, 0)
    let tilePosition = Utils.pixelToTilePosition(x, y)
    highlightGraphic.drawRect(
      tilePosition[0] * Config.TILE_SIZE + 1,
      tilePosition[1] * Config.TILE_SIZE + 1,
      Config.TILE_SIZE - 2,
      Config.TILE_SIZE - 2
    )
    return highlightGraphic
  }

  highlightSourceTile (x, y) {
    let highlightGraphic = new PIXI.Graphics()
    highlightGraphic.beginFill(0x999999)
    highlightGraphic.lineStyle(3, 0x000000, 0)
    let tilePosition = Utils.pixelToTilePosition(x, y)
    highlightGraphic.drawRect(
      tilePosition[0] * Config.TILE_SIZE + 1,
      tilePosition[1] * Config.TILE_SIZE + 1,
      Config.TILE_SIZE - 2,
      Config.TILE_SIZE - 2,
    )
    return highlightGraphic
  }

  drawBoard () {
    let boardGraphics = new PIXI.Graphics()
    boardGraphics.beginFill(0xFFFFFF)

    for (let i = 0; i < Config.BOARD_WIDTH; ++i) {
      for (let j = 0; j < Config.BOARD_HEIGHT; ++j) {
        if (i <= 1) {
          boardGraphics.lineStyle(3, 0xccccff)
        } else if (i >= 5) {
          boardGraphics.lineStyle(3, 0xffcccc)
        } else {
          boardGraphics.lineStyle(3, 0xcccccc)
        }

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
