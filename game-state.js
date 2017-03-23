let Utils = require('./utils')

class GameState {
  constructor(tiles) {
    this.state = tiles
  }

  getCurrentTeam () {
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

  getBallId(x, y) {
    let _id
    _.each(this.getUnitsAt(x, y), (unit, id) => {
      if (unit.type === 'ball') {
        _id = id
      }
    })
    return _id
  }

  getPlayerId(x, y) {
    let _id
    _.each(this.getUnitsAt(x, y), (unit, id) => {
      if (unit.type === 'player') {
        _id = id
      }
    })
    return _id
  }

  getUnitsAt (x, y) {
    let units = {}
    _.each(this.state.units, function(unit, id) {
      let ptt = Utils.pixelToTilePosition(x, y)
      if (unit.x === ptt[0] && unit.y === ptt[1]) {
        units[id] = unit
      }
    })
    return units
  }
}

export default GameState

