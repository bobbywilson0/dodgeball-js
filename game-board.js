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
    this.actionCount = 0

    this.drawBoard(Config.BOARD_WIDTH, Config.BOARD_HEIGHT, Config.TILE_SIZE)
    stage.addChild(this.highlightContainer)
    stage.addChild(this.tokenContainer)

    this.eventData = undefined
    this.selectedPlayer = undefined

    stage.on('click', (event) => this.handleClickEvent(event))
    stage.on('touchend', (event) => this.handleClickEvent(event))
    stage.on('mousemove', () => this.handleMouseMove())
  }

  handleClickEvent (event) {
    if (this.actionCount > 1) {
      this.actionCount = 0
      this.selectedPlayer = undefined
      this.eventData = undefined
      this.switchTurns()
    } 
    
    this.highlightContainer.removeChild(this.targetHighlight)
    let position = event.data.getLocalPosition(this.stage)
    let player = this.gameState.getPlayer(position.x, position.y)
    if (!this.selectedPlayer && player && player.team === this.gameState.state.turn) {
      this.selectPlayer(position.x, position.y)
    } else if (this.selectedPlayer) {
      let tilePosition = Utils.pixelToTilePosition(position.x, position.y)
      if (player && player != this.selectedPlayer) {
        if(player.team == this.gameState.state.turn) {
          console.log("can't move on top of another player")
        } else if (this.selectedPlayer.hasBall) {
          this.actionCount += 1
          let pPlayer = this.players[player.id]
          let outcome = this.selectedPlayerObject().throwBallAt(pPlayer)
          let ball = outcome.ball
          let unit = this.gameState.state.units[ball.id]
          unit.x = player.x
          unit.y = player.y
          this.tokenContainer.addChild(ball.sprite)
          if (outcome.hit) {
            let player = this.gameState.state.units[pPlayer.id]
            player.out = true
            player.x = pPlayer.x
            player.y = pPlayer.y
          }
        }
      } else if (tilePosition.x === this.selectedPlayer.x && tilePosition.y === this.selectedPlayer.y) {
        this.pickupBall(position.x, position.y)
      } else {
        this.movePlayer(tilePosition.x, tilePosition.y)
      }
      this.selectedPlayer = undefined
      this.highlightContainer.removeChild(this.sourceHighlight)
    }
  }

  selectPlayer(x, y) {
    this.selectedPlayer = this.gameState.getPlayer(x, y)
    this.sourceHighlight = this.highlightSourceTile(x, y)
    this.highlightContainer.addChild(this.sourceHighlight)
  }

  movePlayer(x, y) {
    this.actionCount += 1
    this.gameState.moveUnit(this.selectedPlayer, x, y)
    if (this.selectedPlayer.hasBall) {
      let ball = this.gameState.getBall(x, y) 
      this.gameState.moveUnit(ball, x, y)
    }
    let player = this.players[this.selectedPlayer.id]
    player.moveTo(x, y)
  }

  pickupBall(x, y) {
    this.actionCount += 1
    let ball = this.gameState.getBall(x, y)
    let currentBall = this.balls[ball.id]
    if (currentBall) {
      this.tokenContainer.removeChild(currentBall)
      let player = this.players[this.selectedPlayer.id]
      player.pickupBall(currentBall)
      this.selectedPlayer['hasBall'] = true
    }
  }

  handleMouseMove () {
    if (this.selected && this.selectedPlayer) {
      let newPosition = this.eventData.getLocalPosition(this.stage)
      if (this.targetHighlight) {
        this.highlightContainer.removeChild(this.targetHighlight)
      }
      this.targetHighlight = this.highlightTargetTile(newPosition.x, newPosition.y)
      this.highlightContainer.addChild(this.targetHighlight)
    }
  }

  switchTurns() {
    if (this.gameState.state.turn == 'red') {
      this.gameState.state.turn = 'blue'
    } else {
      this.gameState.state.turn = 'red'
    }
  }

  selectedPlayerObject() {
    return this.players[this.selectedPlayer.id]
  }

  highlightTargetTile (x, y) {
    let highlightGraphic = new PIXI.Graphics()
    highlightGraphic.beginFill(0xCCCCCC)
    highlightGraphic.lineStyle(3, 0x000000, 0)
    let tilePosition = Utils.pixelToTilePosition(x, y)
    highlightGraphic.drawRect(
      tilePosition.x * Config.TILE_SIZE + 1,
      tilePosition.y * Config.TILE_SIZE + 1,
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
      tilePosition.x * Config.TILE_SIZE + 1,
      tilePosition.y * Config.TILE_SIZE + 1,
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
