import each from "lodash-es/each";
import Ball from "./ball";
import Player from "./player";
import * as Utils from "./utils";

interface IUnit {
  x: number;
  y: number;
}

class GameState {
  public state: any[any];

  constructor(tiles) {
    this.state = tiles;
  }

  public getCurrentTeam(): string {
    return this.state.turn;
  }

  public moveUnit(unit: IUnit, x: number, y: number): IUnit {
    if (unit) {
      unit.x = x;
      unit.y = y;
    }
    return unit;
  }

  public getBall(x: number, y: number): undefined | Ball {
    let unit: undefined | Ball;
    each(this.getUnitsAt(x, y), (u, id) => {
      if (u.type === "ball") {
        unit = u;
      }
    });
    return unit;
  }

  public getPlayer(x, y): undefined | Player {
    let unit: undefined | Player;
    each(this.getUnitsAt(x, y), (u, id) => {
      if (u.type === "player") {
        unit = u;
      }
    });
    return unit;
  }

  public getUnitsAt(x, y): any {
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
