import each from "lodash-es/each";
import Player from "./player";
import * as Utils from "./utils";

class GameState {
  public state: any[any];

  constructor(tiles) {
    this.state = tiles;
  }

  public getCurrentTeam() {
    return this.state.turn;
  }

  public moveUnit(unit, x, y) {
    if (unit) {
      unit.x = x;
      unit.y = y;
    }
  }

  public getBall(x, y) {
    let unit;
    each(this.getUnitsAt(x, y), (u, id) => {
      if (u.type === "ball") {
        unit = u;
      }
    });
    return unit;
  }

  public getPlayer(x, y) {
    let unit: undefined | Player;
    each(this.getUnitsAt(x, y), (u, id) => {
      if (u.type === "player") {
        unit = u;
      }
    });
    return unit;
  }

  public getUnitsAt(x, y) {
    const units = {};
    each(this.state.units, (unit, id) => {
      const ptt = Utils.pixelToTilePosition(x, y);
      if (unit.x === ptt.x && unit.y === ptt.y) {
        units[id] = unit;
      }
    });
    return units;
  }
}

export default GameState;
