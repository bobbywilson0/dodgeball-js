let Utils = require('./utils')

class GameState {
  constructor(tiles) {
    this.state = tiles
  }

  getCurrentPlayer () {
    return this.state.turn
  }

  movePlayer (unitId, x, y) {
    if (unitId != undefined) {
      let activeTeam = this.state[this.state.turn]
      let unit = this.state.units[unitId]
      if (unit.unit === activeTeam) {
        unit.x = x
        unit.y = y
      }
    }
  }

  getUnitId (x, y) {
    let unitId
    _.each(this.state.units, function(v, k) {
      let ptt = Utils.pixelToTilePosition(x, y)
      if (v.x === ptt[0] && v.y === ptt[1]) {
        unitId = k
      }
    })
    return unitId
  }
}

export default GameState

