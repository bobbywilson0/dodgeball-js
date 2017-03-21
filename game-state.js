let Utils = require('./utils')

class GameState {
  constructor(tiles) {
    this.state = tiles
  }

  movePlayer (playerId, x, y) {
    let activeTeam = this.state[this.state.turn]
    activeTeam[playerId].x = x
    activeTeam[playerId].y = y
  }

  getPlayerId (x, y) {
    let activeTeam = this.state[this.state.turn]
    let state = this.state
    let playerId
    _.each(activeTeam, function(v, k) {
      let ptt = Utils.pixelToTilePosition(x, y)
      if (v.x === ptt[0] && v.y === ptt[1]) {
        playerId = k
      }
    })
    return playerId
  }
}

export default GameState

