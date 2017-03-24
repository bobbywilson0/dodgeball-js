let Utils = require('./utils')

class GameState {
  constructor(tiles) {
    this.state = tiles
  }

  getCurrentTeam () {
    return this.state.turn
  }

  moveUnit (unit, x, y) {
    if (unit) {
      unit.x = x
      unit.y = y
    }
  }

  getBall (x, y) {
    let _unit
    _.each(this.getUnitsAt(x, y), (unit, id) => {
      if (unit.type === 'ball') {
        _unit = unit
      }
    })
    return _unit
  }

  getPlayer(x, y) {
    let _unit
    _.each(this.getUnitsAt(x, y), (unit, id) => {
      if (unit.type === 'player') {
        _unit = unit
      }
    })
    return _unit
  }

  getUnitsAt (x, y) {
    let units = {}
    _.each(this.state.units, function(unit, id) {
      let ptt = Utils.pixelToTilePosition(x, y)
      if (unit.x === ptt.x && unit.y === ptt.y) {
        units[id] = unit
      }
    })
    return units
  }
}

export default GameState

